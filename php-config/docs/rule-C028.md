# Rule C028: Log Error Causes in Catch Blocks

## Overview

This rule ensures that all exceptions caught in catch blocks are properly logged or handled. Silent catch blocks hide errors and make debugging difficult, leading to mysterious failures in production.

## Rule Details

This rule requires that every catch block either:
- Logs the exception using a logging function
- Re-throws the exception (potentially after wrapping it)

### Violations

Catch blocks that:
- Are completely empty
- Contain code but don't log or re-throw the exception

### Compliance

Catch blocks that:
- Call functions containing keywords like 'log', 'error', 'warning', etc.
- Use a logger object's methods
- Re-throw exceptions with the `throw` keyword

## Examples

### ❌ Incorrect

```php
try {
    // Some code that might throw
    riskyOperation();
} catch (Exception $e) {
    // Empty catch block
}

try {
    riskyOperation();
} catch (Exception $e) {
    // Catch block with code but no logging
    $count++;
    return false;
}
```

### ✅ Correct

```php
try {
    riskyOperation();
} catch (Exception $e) {
    // Log the error
    error_log('Error in riskyOperation: ' . $e->getMessage());
    // Handle the error appropriately
    return false;
}

try {
    riskyOperation();
} catch (Exception $e) {
    // Re-throw with additional context
    throw new CustomException('Failed to complete operation', 0, $e);
}

try {
    riskyOperation();
} catch (Exception $e) {
    // Using a logger object
    $this->logger->error('Operation failed', ['exception' => $e]);
    return false;
}
```

## Implementation

This rule is implemented as a custom PHP_CodeSniffer sniff:

- Rule ID: C028
- Sniff: `MyStandard.ErrorHandling.LogErrorsInCatch`
- Category: Error Handling

## Benefits

- Improves error visibility and debugging
- Prevents silent failures 
- Ensures errors are properly tracked
- Makes troubleshooting easier in production environments

## Related Rules

- C065: Don't catch errors silently (same rule for TypeScript)
- C054: No empty catch blocks (same rule for TypeScript)
- C029: Use custom error classes instead of system errors directly

## References

- [PHP Exception Handling Best Practices](https://phptherightway.com/#exceptions)
- [Effective Exception Handling in PHP](https://www.php.net/manual/en/language.exceptions.php)
