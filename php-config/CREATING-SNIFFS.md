# Creating Custom Sniffs

This guide explains how to create new custom sniffs for PHP_CodeSniffer.

## Step 1: Plan Your Sniff

Decide what coding standard rule you want to enforce. Every sniff should:

- Have a single responsibility
- Be clearly named
- Include documentation

## Step 2: Create the Sniff File

The file should be named following this pattern:

```
MyStandard/Sniffs/Category/RuleNameSniff.php
```

Where:
- `Category` is a logical grouping (e.g., `Commenting`, `NamingConventions`, `Functions`)
- `RuleName` describes what the sniff does (e.g., `DisallowHashComments`, `CamelCaseMethodName`)

## Step 3: Implement the Sniff Interface

Every sniff must implement the `PHP_CodeSniffer\Sniffs\Sniff` interface, which requires two methods:

1. `register()` - Returns an array of token types the sniff is interested in
2. `process()` - Called when any of the tokens registered are found

Example structure:

```php
<?php

namespace MyStandard\Sniffs\Category;

use PHP_CodeSniffer\Sniffs\Sniff;
use PHP_CodeSniffer\Files\File;

/**
 * This sniff does X.
 */
class RuleNameSniff implements Sniff
{
    /**
     * Returns the token types that this sniff is interested in.
     *
     * @return array<int|string>
     */
    public function register()
    {
        return [/* token types */];
    }

    /**
     * Processes this sniff, when one of its tokens is encountered.
     *
     * @param \PHP_CodeSniffer\Files\File $phpcsFile The current file being checked.
     * @param int                         $stackPtr  The position of the current token.
     *
     * @return void
     */
    public function process(File $phpcsFile, $stackPtr)
    {
        // Implementation
    }
}
```

## Step 4: Register Token Types

In the `register()` method, return an array of token types you want to check. For example:

```php
public function register()
{
    return [
        T_FUNCTION,     // Check functions
        T_CLOSURE,      // Check closures
        T_FN,           // Check arrow functions (PHP 7.4+)
    ];
}
```

See the [PHP token constants](https://www.php.net/manual/en/tokens.php) for available tokens.

## Step 5: Implement the Process Logic

In the `process()` method, you examine the token and surrounding context to detect violations:

```php
public function process(File $phpcsFile, $stackPtr)
{
    $tokens = $phpcsFile->getTokens();
    
    // Analyze the token and its context
    
    // When violation is found, report it
    if ($violation) {
        $error = 'Error message with %s';
        $data  = [$someValue];
        $phpcsFile->addError($error, $stackPtr, 'ErrorCode', $data);
        
        // OR add a warning
        // $phpcsFile->addWarning($warning, $stackPtr, 'WarningCode', $data);
    }
}
```

## Step 6: Add Your Sniff to the Ruleset

Add your sniff to the ruleset.xml file:

```xml
<rule ref="MyStandard.Category.RuleName"/>
```

## Common Token Analysis Tasks

### Working with Token Arrays

The `$tokens` array has one entry per token in the file. Each entry is an array with various properties:

```php
$tokens[$stackPtr]['content']    // The text content of the token
$tokens[$stackPtr]['code']       // The token code (e.g., T_FUNCTION)
$tokens[$stackPtr]['type']       // The token name (e.g., 'T_FUNCTION')
$tokens[$stackPtr]['line']       // The line number
$tokens[$stackPtr]['column']     // The column number
```

### Finding Related Tokens

For structured elements like classes and functions, there are additional properties:

```php
// For function tokens
$tokens[$stackPtr]['scope_opener']  // The position of the opening brace
$tokens[$stackPtr]['scope_closer']  // The position of the closing brace
$tokens[$stackPtr]['parenthesis_opener']  // The position of the opening parenthesis
$tokens[$stackPtr]['parenthesis_closer']  // The position of the closing parenthesis
```

### Finding Tokens Relative to Position

```php
// Get the next token
$nextToken = $phpcsFile->findNext(
    T_WHITESPACE, // Token type to skip (or array of types)
    ($stackPtr + 1), // Start position
    null, // End position (null = end of file)
    true, // Exclude the skip token
    null, // Value to match (null = any value)
    true  // Return false if not found instead of null
);

// Get the previous token
$prevToken = $phpcsFile->findPrevious(
    T_WHITESPACE,
    ($stackPtr - 1),
    null,
    true,
    null,
    true
);
```

## Example: Function Length Sniff

Here's a simplified example of a sniff that checks function length:

```php
<?php

namespace MyStandard\Sniffs\Functions;

use PHP_CodeSniffer\Sniffs\Sniff;
use PHP_CodeSniffer\Files\File;

/**
 * Checks that functions are not too long.
 */
class FunctionLengthSniff implements Sniff
{
    /**
     * The maximum number of lines a function should have.
     *
     * @var int
     */
    public $maxLines = 50;

    /**
     * Returns the token types that this sniff is interested in.
     *
     * @return array<int|string>
     */
    public function register()
    {
        return [T_FUNCTION, T_CLOSURE];
    }

    /**
     * Processes this sniff, when one of its tokens is encountered.
     *
     * @param \PHP_CodeSniffer\Files\File $phpcsFile The current file being checked.
     * @param int                         $stackPtr  The position of the current token.
     *
     * @return void
     */
    public function process(File $phpcsFile, $stackPtr)
    {
        $tokens = $phpcsFile->getTokens();
        
        // Skip if this is not a valid function
        if (!isset($tokens[$stackPtr]['scope_opener'])) {
            return;
        }
        
        $openBrace = $tokens[$stackPtr]['scope_opener'];
        $closeBrace = $tokens[$stackPtr]['scope_closer'];
        
        // Calculate the number of lines
        $lineCount = ($tokens[$closeBrace]['line'] - $tokens[$openBrace]['line']);
        
        // Check if the function is too long
        if ($lineCount > $this->maxLines) {
            $error = 'Function is too long (%d lines). Maximum allowed is %d lines';
            $data = [$lineCount, $this->maxLines];
            $phpcsFile->addError($error, $stackPtr, 'TooLong', $data);
        }
    }
}
```

## Testing Your Sniff

1. Create a test file with code examples that should pass and fail
2. Run PHP_CodeSniffer on the test file
3. Review the results and refine your sniff as needed
