# Dead Code Detection (Commented Code) Sniff

## Description
This sniff (rule C013) detects code that has been commented out, which is considered "dead code". Instead of commenting out old code, best practice is to remove it completely and rely on version control to retrieve old versions if needed.

## Examples

### Invalid (Violates the rule)

```php
// $oldValue = getValue();
// if ($oldValue > 50) {
//     doSomething($oldValue);
// }

/* 
function oldImplementation($param) {
    // Logic here
    return $result;
}
*/
```

### Valid (Follows the rule)

```php
// This is a descriptive comment, not code
// TODO: Implement feature X
// NOTE: Be careful with this logic

/**
 * @param int $param Description
 * @return int Result description 
 */
```

## Configuration
This sniff does not have any configurable properties.

## Detection Logic
The sniff detects commented out code by looking for PHP code patterns such as:
- Variable names ($var)
- Function calls (funcName())
- Control structures (if, for, foreach, etc.)
- PHP tags (<?php, ?>)
- Class and function definitions
- Language constructs (echo, print, etc.)
- Return statements and assignments

## Reasoning
Keeping commented out code in a codebase creates several problems:
1. It clutters the code, making it harder to read
2. It creates confusion about what code is actually used
3. It makes maintenance more difficult
4. It can lead to dead code being accidentally uncommented and causing bugs
5. It indicates uncertainty in the development process

Use version control to track changes instead of keeping obsolete code in comments.
