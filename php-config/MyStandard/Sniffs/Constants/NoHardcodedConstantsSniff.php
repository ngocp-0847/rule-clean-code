<?php

namespace MyStandard\Sniffs\Constants;

use PHP_CodeSniffer\Sniffs\Sniff;
use PHP_CodeSniffer\Files\File;

/**
 * This sniff prohibits hardcoded constants scattered throughout the logic (Rule C023).
 * All constants should be defined in a dedicated constants file or class and referenced by name.
 */
final class NoHardcodedConstantsSniff implements Sniff
{
    /**
     * A list of patterns to look for in strings that might indicate hardcoded constants
     * 
     * @var array
     */
    public $suspiciousPatterns = [
        // URLs and paths
        '~https?://~i',
        '~www\.~i',
        '~/[a-z0-9_-]+/[a-z0-9_-]+~i',
        // Configuration-like values
        '~\b\d+\.\d+\.\d+\b~', // Version numbers
        '~\b[A-Z0-9]{8,}\b~',  // Long uppercase strings (likely tokens/keys)
        // API keys and tokens (simple patterns)
        '~\bapi[_-]?key\b~i',
        '~\btoken\b~i',
        '~\bsecret\b~i',
        // Specific words that might indicate configuration
        '~\bconfiguration\b~i',
        '~\bsettings\b~i',
    ];

    /**
     * Returns the token types that this sniff is interested in.
     *
     * @return array<int|string>
     */
    public function register()
    {
        return [
            T_CONSTANT_ENCAPSED_STRING, // String literals
            T_DNUMBER, // Float numbers
            T_LNUMBER, // Integer numbers
            T_ARRAY, // Array constructor
        ];
    }

    /**
     * Processes this sniff, when one of its tokens is encountered.
     *
     * @param \PHP_CodeSniffer\Files\File $phpcsFile The current file being checked.
     * @param int                         $stackPtr  The position of the current token in the
     *                                               stack passed in $tokens.
     *
     * @return void
     */
    public function process(File $phpcsFile, $stackPtr)
    {
        $tokens = $phpcsFile->getTokens();
        $token = $tokens[$stackPtr];
        
        // Skip if this is in a constant definition
        if ($this->isInConstantDefinition($phpcsFile, $stackPtr)) {
            return;
        }
        
        // Skip if this is in a class property definition with a default value
        if ($this->isInPropertyDefinition($phpcsFile, $stackPtr)) {
            return;
        }
        
        // Check for strings that match suspicious patterns
        if ($token['code'] === T_CONSTANT_ENCAPSED_STRING) {
            $string = trim($token['content'], '\'"');
            
            // Skip empty strings
            if (empty($string)) {
                return;
            }
            
            // Skip very short strings (less than 3 chars) as they're unlikely to be constants
            if (strlen($string) < 3) {
                return;
            }
            
            // Check suspicious patterns
            foreach ($this->suspiciousPatterns as $pattern) {
                if (preg_match($pattern, $string)) {
                    $error = 'Hardcoded constant "%s" found in logic. Constants should be defined in a dedicated constants file or class (Rule C023)';
                    $data = [$string];
                    $phpcsFile->addError($error, $stackPtr, 'HardcodedConstantFound', $data);
                    return;
                }
            }
            
            // Check for all uppercase strings (likely constants)
            if (preg_match('/^[A-Z][A-Z0-9_]{2,}$/', $string)) {
                $error = 'Hardcoded constant-like value "%s" found. Consider defining it as a proper constant (Rule C023)';
                $data = [$string];
                $phpcsFile->addError($error, $stackPtr, 'HardcodedConstantLikeValue', $data);
                return;
            }
        }
        
        // Check for "magic numbers" (hardcoded numeric values)
        if ($token['code'] === T_LNUMBER || $token['code'] === T_DNUMBER) {
            // Skip common numbers like 0, 1, -1, 2 as they're often used in logic
            if (in_array($token['content'], ['0', '1', '-1', '2', '-2'])) {
                return;
            }
            
            // Check if this is part of an array index or simple math operation
            if ($this->isInArrayIndexOrSimpleMath($phpcsFile, $stackPtr)) {
                return;
            }
            
            // If we get here, it's likely a "magic number" that should be a constant
            $error = 'Magic number "%s" found. Consider defining it as a constant (Rule C023)';
            $data = [$token['content']];
            $phpcsFile->addError($error, $stackPtr, 'MagicNumberFound', $data);
        }
    }
    
    /**
     * Check if the token is part of a constant definition.
     *
     * @param \PHP_CodeSniffer\Files\File $phpcsFile The file being scanned.
     * @param int                         $stackPtr  The position of the current token.
     *
     * @return bool
     */
    private function isInConstantDefinition(File $phpcsFile, $stackPtr)
    {
        $tokens = $phpcsFile->getTokens();
        
        // Look backwards for define() or const
        $prevToken = $phpcsFile->findPrevious(
            [T_WHITESPACE],
            ($stackPtr - 1),
            null,
            true,
            null,
            true
        );
        
        // Check for const keyword
        if ($prevToken !== false && $tokens[$prevToken]['code'] === T_CONST) {
            return true;
        }
        
        // Check for define() function
        $functionToken = $phpcsFile->findPrevious(
            [T_STRING],
            ($stackPtr - 1),
            null,
            false,
            'define',
            true
        );
        
        if ($functionToken !== false) {
            return true;
        }
        
        return false;
    }
    
    /**
     * Check if the token is part of a class property definition with default value.
     *
     * @param \PHP_CodeSniffer\Files\File $phpcsFile The file being scanned.
     * @param int                         $stackPtr  The position of the current token.
     *
     * @return bool
     */
    private function isInPropertyDefinition(File $phpcsFile, $stackPtr)
    {
        $tokens = $phpcsFile->getTokens();
        
        // Look backwards for variable and visibility keywords
        $visibility = [T_PUBLIC, T_PROTECTED, T_PRIVATE];
        $propertyPtr = $phpcsFile->findPrevious(
            [T_VARIABLE],
            ($stackPtr - 1),
            null,
            false,
            null,
            true
        );
        
        if ($propertyPtr !== false) {
            $visibilityPtr = $phpcsFile->findPrevious(
                $visibility,
                ($propertyPtr - 1),
                null,
                false,
                null,
                true
            );
            
            if ($visibilityPtr !== false) {
                return true;
            }
        }
        
        return false;
    }
    
    /**
     * Check if the token is part of an array index or simple math operation.
     *
     * @param \PHP_CodeSniffer\Files\File $phpcsFile The file being scanned.
     * @param int                         $stackPtr  The position of the current token.
     *
     * @return bool
     */
    private function isInArrayIndexOrSimpleMath(File $phpcsFile, $stackPtr)
    {
        $tokens = $phpcsFile->getTokens();
        
        // Check if it's an array index
        $prevToken = $phpcsFile->findPrevious(
            [T_WHITESPACE],
            ($stackPtr - 1),
            null,
            true,
            null,
            true
        );
        
        if ($prevToken !== false && $tokens[$prevToken]['code'] === T_OPEN_SQUARE_BRACKET) {
            return true;
        }
        
        // Check if it's a simple math operation (skip)
        $mathOperators = [T_PLUS, T_MINUS, T_MULTIPLY, T_DIVIDE];
        $prevOpToken = $phpcsFile->findPrevious(
            [T_WHITESPACE],
            ($stackPtr - 1),
            null,
            true,
            null,
            true
        );
        
        $nextOpToken = $phpcsFile->findNext(
            [T_WHITESPACE],
            ($stackPtr + 1),
            null,
            true,
            null,
            true
        );
        
        if (($prevOpToken !== false && in_array($tokens[$prevOpToken]['code'], $mathOperators)) ||
            ($nextOpToken !== false && in_array($tokens[$nextOpToken]['code'], $mathOperators))) {
            return true;
        }
        
        return false;
    }
}
