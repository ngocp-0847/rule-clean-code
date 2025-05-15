# Rule C023: No Hardcoded Constants in Logic

## Overview

Constants should not be hardcoded throughout the application logic. They should be defined in a dedicated constants file or class and referenced by name.

## Rule Details

This rule enforces that:

1. String literals that appear to be URLs, API keys, or configuration values should be defined as constants
2. Numeric values (except for common ones like 0, 1, 2, -1) should be defined as constants
3. Version numbers and other formatted strings should be defined as constants

## Examples

### ❌ Incorrect

```php
// Hardcoded URL in logic
function fetchData() {
    return callApi('https://example.com/api/v1');
}

// Hardcoded numeric constants
$timeout = 3600;
$retryCount = 5;

// Hardcoded version or formatted strings
$apiVersion = '1.2.3';
```

### ✅ Correct

```php
// Define constants in a dedicated file or class
define('API_URL', 'https://example.com/api/v1');
const TIMEOUT = 3600;
const RETRY_COUNT = 5;
const API_VERSION = '1.2.3';

// Reference constants by name in your logic
function fetchData() {
    return callApi(API_URL);
}

$timeout = TIMEOUT;
$retryCount = RETRY_COUNT;
$apiVersion = API_VERSION;
```

## Implementation

This rule is implemented as a custom PHP_CodeSniffer sniff:

- Rule ID: C023
- Sniff: `MyStandard.Constants.NoHardcodedConstants`
- Category: Clean Code, Systems

## Benefits

- Improves code maintainability
- Makes it easier to change constant values in one place
- Increases code readability by using descriptive constant names
- Reduces duplication
- Provides a central place to manage configuration values

## Related Rules

- C043: No hardcoded URLs, API keys or secrets in source code
- P015: No hardcoded paths or URLs

## References

- [PHP Constants](https://www.php.net/manual/en/language.constants.php)
- [Magic Numbers](https://en.wikipedia.org/wiki/Magic_number_(programming))