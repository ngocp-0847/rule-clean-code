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
phpcs --config-set installed_paths /path/to/rule-clean-code/php-config/MyStandard
```

Replace `/path/to/rule-clean-code` with the actual path to your project.

### Step 5: Verify Installation

```bash
phpcs -i
```

You should see `MyStandard` in the list of installed coding standards.

### Setup PHPStan

PHPStan is a static analysis tool that can find bugs and errors in your code without running it.

#### Step 1: Install PHPStan

```bash
composer require --dev phpstan/phpstan
```

#### Step 2: Create Configuration File

Create a file named `phpstan.neon` in your project root:

```bash
touch phpstan.neon
```

#### Step 3: Configure PHPStan

Add the following content to your `phpstan.neon` file:

```yaml
parameters:
    level: max  # Level 0-9 or max (strictest)
    paths:
        - src
        - app
        - tests

    # Ignore files/folders if needed
    excludePaths:
        - tests/Fixtures/*
        - bootstrap/*

    inferPrivatePropertyTypeFromConstructor: true
    
    # Recommended: Enable bleeding edge features
includes:
    - vendor/phpstan/phpstan/conf/bleedingEdge.neon
```

#### Step 4: Run PHPStan

```bash
./vendor/bin/phpstan analyse
```

Or specify a directory:

```bash
./vendor/bin/phpstan analyse src
```

#### Common PHPStan Options

- `--level=n`: Set analysis level (0-9, where 9 is strictest)
- `--configuration=file.neon`: Custom configuration file path
- `--memory-limit=1G`: Set memory limit for analysis
- `--error-format=table|raw|checkstyle|json|github`: Output format
- `--no-progress`: Hide progress bar

#### Integrating with Makefile

Our project's Makefile already includes PHPStan integration. You can run:

```bash
make analyse
```


## Usage

### Basic Usage

```bash
phpcs --standard=MyStandard /path/to/your/php/files
```

## Current Custom Sniffs

### DisallowHashCommentsSniff

This sniff prohibits the use of Perl-style hash comments (`# comment`) in PHP code. Use standard PHP comments (`// comment` or `/* comment */`) instead.

### NoHardcodedConstantsSniff

This sniff prohibits hardcoded constants scattered throughout the logic (Rule C023). All constants should be defined in a dedicated constants file or class and referenced by name.

### LogErrorsInCatchSniff

This sniff ensures that all catch blocks log the error cause (Rule C028). Silent catch blocks can hide important error information and make debugging difficult. Proper error handling requires either logging or re-throwing the caught exception.

## Adding New Sniffs

1. Create a new PHP file in the `MyStandard/Sniffs/` directory, organized by category
2. Implement the Sniff interface
3. Register the sniff in the ruleset.xml file

## Integration with CI/CD

### Using the Makefile

We provide a Makefile to simplify running PHP_CodeSniffer and PHPStan in development and CI environments:

```bash
# Check coding standards with PHPCS
make check

# Automatically fix coding standards violations with PHPCBF
make fix

# Run PHPStan analysis
make analyse

# Run both PHPCS and PHPStan
make all

# Check a specific file or directory
make check TARGET=path/to/file.php
make analyse TARGET=path/to/directory/

# Use custom PHPStan binary or configuration
make analyse PHPSTAN=/custom/path/phpstan PHPSTAN_CONFIG=/custom/path/phpstan.neon

# Run in CI mode (generates XML report)
make ci

# Show all available commands
make help
```


### Using Git Hooks

We provide pre-commit hooks that automatically check your PHP files before committing, running both PHPCS and PHPStan:

```bash
# Install the Git hooks
./install-hooks.sh /path/to/your/git/repo
```

#### Example Pre-commit Hook

Here's what our pre-commit hook does:

```bash
#!/bin/bash
# Pre-commit hook to run PHP_CodeSniffer and PHPStan on staged PHP files

# Path to the project root
PROJECT_ROOT=$(git rev-parse --show-toplevel)

# Get staged PHP files
STAGED_PHP_FILES=$(git diff --cached --name-only --diff-filter=ACMR | grep "\.php$")

if [ -z "$STAGED_PHP_FILES" ]; then
    echo "No PHP files staged for commit. Skipping code checks."
    exit 0
fi

echo "Running code quality checks on staged PHP files..."

# Check coding standards with PHPCS
echo "Running PHP_CodeSniffer..."
phpcs_errors=0
echo "$STAGED_PHP_FILES" | while read file; do
    if [ -f "$PROJECT_ROOT/$file" ]; then
        phpcs --standard=MyStandard "$PROJECT_ROOT/$file"
        if [ $? -ne 0 ]; then
            phpcs_errors=1
        fi
    fi
done

# Run PHPStan analysis
echo "Running PHPStan..."
phpstan_errors=0
if [ -f "$PROJECT_ROOT/phpstan.neon" ] && [ -f "$PROJECT_ROOT/vendor/bin/phpstan" ]; then
    cd "$PROJECT_ROOT"
    echo "$STAGED_PHP_FILES" | xargs vendor/bin/phpstan analyse --configuration=phpstan.neon
    if [ $? -ne 0 ]; then
        phpstan_errors=1
    fi
fi

# If errors were found, abort the commit
if [ $phpcs_errors -ne 0 ] || [ $phpstan_errors -ne 0 ]; then
    echo "Code quality issues found. Please fix the issues before committing."
    exit 1
fi

echo "All code quality checks passed!"
exit 0
```

You can customize this hook to fit your project's needs, such as changing the standard used or adding other quality checks.

### GitHub Actions

We provide pre-configured GitHub Actions workflows for both PHP_CodeSniffer and PHPStan:

#### Combined Workflow

This workflow runs both PHPCS and PHPStan in a single job:

```yaml
name: PHP Code Quality

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  code-quality:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup PHP
      uses: shivammathur/setup-php@v2
      with:
        php-version: '8.1'
        tools: composer, phpcs
        extensions: dom, curl, libxml, mbstring, zip, pdo, mysql, pdo_mysql, bcmath, intl, gd, exif, iconv
        coverage: none
        
    - name: Install dependencies
      run: composer install --prefer-dist --no-progress
      
    - name: Register PHPCS standards
      run: phpcs --config-set installed_paths ${{ github.workspace }}/php-config/MyStandard
      
    - name: Run PHPCS
      run: phpcs --standard=MyStandard --report=checkstyle -q src tests | cs2pr
      
    - name: Run PHPStan
      run: vendor/bin/phpstan analyse --configuration=phpstan.neon --no-progress --error-format=github
```

#### Using with Makefile

You can also utilize the Makefile directly in GitHub Actions:

```yaml
name: PHP Code Quality with Makefile

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  code-quality:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup PHP
      uses: shivammathur/setup-php@v2
      with:
        php-version: '8.1'
        tools: composer, phpcs
        
    - name: Install dependencies
      run: composer install --prefer-dist --no-progress
      
    - name: Register custom standards
      run: phpcs --config-set installed_paths ${{ github.workspace }}/php-config/MyStandard
      
    - name: Run code quality checks
      run: cd ${{ github.workspace }}/php-config && make all TARGET=../src
```

## Laravel Integration

Có thể dùng tools này để fix issue : https://github.com/PHP-CS-Fixer/PHP-CS-Fixer

To integrate with Laravel projects, you can add this to your composer.json:

```json
"scripts": {
    "phpcs": "phpcs --standard=MyStandard app/ tests/",
    "phpstan": "phpstan analyse --configuration=phpstan.neon",
    "analyse": "composer phpcs && composer phpstan"
}
```

Then run with:

```bash
composer phpcs    # Run only PHPCS
composer phpstan  # Run only PHPStan
composer analyse  # Run both
```

## Comprehensive Code Quality Checking

For a complete code quality check, we recommend using both PHP_CodeSniffer and PHPStan together. They complement each other:

* **PHP_CodeSniffer** checks coding style, formatting, and certain code patterns.
* **PHPStan** performs static analysis to find bugs, type errors, and architectural issues.

### Benefits of Combined Approach

1. **Style & Structure**: PHPCS ensures consistent code style and follows PSR standards
2. **Bug Prevention**: PHPStan catches potential bugs and logic errors before they reach production
3. **Architectural Enforcement**: Custom PHPStan rules help enforce clean code architectures
4. **Type Safety**: PHPStan ensures type consistency throughout your codebase
5. **Documentation**: Both tools encourage better documentation practices

### Setup in a New Project

1. Install both tools:
```bash
composer require --dev squizlabs/php_codesniffer phpstan/phpstan
```

2. Create configuration files:
```bash
# PHPCS configuration
cat > phpcs.xml << 'EOL'
<?xml version="1.0"?>
<ruleset name="Custom Standard">
    <description>Custom coding standard</description>
    <file>src</file>
    <file>tests</file>
    <arg name="colors"/>
    <arg value="p"/>
    <rule ref="PSR12"/>
    <!-- Add custom rules here -->
</ruleset>
EOL

# PHPStan configuration
cat > phpstan.neon << 'EOL'
parameters:
    level: 5
    paths:
        - src
        - tests
    inferPrivatePropertyTypeFromConstructor: true
EOL
```

3. Add commands to composer.json:
```json
"scripts": {
    "check": [
        "@phpcs",
        "@phpstan"
    ],
    "phpcs": "phpcs",
    "phpcbf": "phpcbf",
    "phpstan": "phpstan analyse"
}
```

4. Run the checks:
```bash
composer check
```
