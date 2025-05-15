# NoHardcodedConstants Sniff

This is a custom PHP_CodeSniffer sniff that implements rule C023: "Các constant không hardcode rải rác trong logic" (Constants should not be hardcoded throughout the logic).

## What This Sniff Detects

The sniff detects:

1. **Hardcoded String Constants**: String literals that appear to be:
   - URLs (e.g., "https://example.com")
   - API keys or tokens
   - Configuration-like strings
   - All uppercase strings that look like constants

2. **Magic Numbers**: Numeric values in the code that:
   - Aren't common numbers like 0, 1, 2, -1
   - Aren't used as array indices
   - Aren't part of simple math operations

## How to Use

The sniff is already included in the `MyStandard` ruleset. To check your code:

```bash
# Check a specific file:
phpcs --standard=MyStandard path/to/your/file.php

# Check an entire directory:
phpcs --standard=MyStandard path/to/your/directory/
```

## Configuration

This sniff has a configurable property:

- `suspiciousPatterns`: An array of regex patterns used to detect strings that likely represent constants

## False Positives

The sniff is designed to ignore:

- Constants defined with `define()` or `const`
- Class constants
- Common numbers (0, 1, 2, -1) used in control flow
- Numbers used as array indices
- Numbers used in simple math operations

## Fixing Issues

To fix issues reported by this sniff:

1. Create a dedicated constants file or class for your application
2. Define your constants using `define()` or `const`
3. Replace hardcoded values with references to these constants

Example:

```php
// Before
function getTimeout() {
    return 3600; // Magic number
}

// After
// In a constants file:
define('API_TIMEOUT', 3600);

// In your code:
function getTimeout() {
    return API_TIMEOUT;
}
```
