# PHP CodeSniffer Custom Standards

This project contains custom coding standards for PHP projects based on PHP_CodeSniffer.

## Installation in Ubuntu 22.04

### Prerequisites

- PHP 8.1 or higher
- Composer

### Step 1: Install PHP and Required Dependencies

```bash
sudo apt update
sudo apt install -y php php-xml php-curl composer
```

### Step 2: Install PHP_CodeSniffer Globally

```bash
composer global require "squizlabs/php_codesniffer=*"
```

### Step 3: Add Composer's bin Directory to PATH

Add the following line to your `~/.bashrc` file:

```bash
export PATH="$PATH:$HOME/.config/composer/vendor/bin"
```

Then apply the changes:

```bash
source ~/.bashrc
```

### Step 4: Register Custom Standards

```bash
phpcs --config-set installed_paths /path/to/rule-clean-code/php-config
```

Replace `/path/to/rule-clean-code` with the actual path to your project.

### Step 5: Verify Installation

```bash
phpcs -i
```

You should see `php-config` and `MyStandard` in the list of installed coding standards.

## Usage

### Basic Usage

```bash
phpcs --standard=php-config /path/to/your/php/files
```

### Using the Wrapper Scripts

```bash
# Check coding standards
./check-code.sh /path/to/your/php/files

# Fix coding standards violations automatically
./fix-code.sh /path/to/your/php/files
```

## Current Custom Sniffs

### DisallowHashCommentsSniff

This sniff prohibits the use of Perl-style hash comments (`# comment`) in PHP code. Use standard PHP comments (`// comment` or `/* comment */`) instead.

## Adding New Sniffs

1. Create a new PHP file in the `MyStandard/Sniffs/` directory, organized by category
2. Implement the Sniff interface
3. Register the sniff in the ruleset.xml file

## Integration with CI/CD

### Using the Makefile

We provide a Makefile to simplify running PHP_CodeSniffer in development and CI environments:

```bash
# Check coding standards
make check

# Automatically fix coding standards violations
make fix

# Check a specific file or directory
make check TARGET=path/to/file.php

# Run in CI mode (generates XML report)
make ci

# Show all available commands
make help
```

### Using Git Hooks

We provide a pre-commit hook that automatically checks your PHP files before committing:

```bash
# Install the Git hooks
./install-hooks.sh /path/to/your/git/repo
```

### GitHub Actions

We provide a pre-configured GitHub Actions workflow:

```yaml
name: PHP_CodeSniffer

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  phpcs:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup PHP
      uses: shivammathur/setup-php@v2
      with:
        php-version: '8.1'
        tools: composer, phpcs
        
    - name: Install dependencies
      run: composer install --prefer-dist --no-progress
      
    - name: Register standards
      run: phpcs --config-set installed_paths ${{ github.workspace }}/php-config
      
    - name: Run phpcs
      run: phpcs --standard=php-config --report=checkstyle -q /path/to/check | cs2pr
```

## Laravel Integration

To integrate with Laravel projects, you can add this to your composer.json:

```json
"scripts": {
    "phpcs": "phpcs --standard=php-config app/ tests/"
}
```

Then run with:

```bash
composer phpcs
```
