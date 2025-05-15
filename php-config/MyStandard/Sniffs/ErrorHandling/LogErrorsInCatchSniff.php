<?php

namespace MyStandard\Sniffs\ErrorHandling;

use PHP_CodeSniffer\Sniffs\Sniff;
use PHP_CodeSniffer\Files\File;

/**
 * This sniff ensures that all catch blocks log the error cause (Rule C028).
 * Silent catch blocks can hide important error information and make debugging difficult.
 */
final class LogErrorsInCatchSniff implements Sniff
{
    /**
     * Common logging functions that should be used in catch blocks.
     *
     * @var array
     */
    public $loggingFunctions = [
        'error_log',
        'log',
        'logger',
        'warning',
        'critical',
        'debug',
        'info',
        'exception',
        'error',
        'log_error',
        'logError',
        'write',
        'writeLog',
        'report',
    ];

    /**
     * Returns the token types that this sniff is interested in.
     *
     * @return array<int|string>
     */
    public function register()
    {
        return [T_CATCH];
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
        
        // Check if the catch block has opening and closing braces
        if (!isset($tokens[$stackPtr]['scope_opener']) || !isset($tokens[$stackPtr]['scope_closer'])) {
            // Malformed catch block, skip it
            return;
        }
        
        // Get catch variable (exception variable)
        $exceptionVarPtr = $phpcsFile->findNext(
            [T_VARIABLE],
            $tokens[$stackPtr]['parenthesis_opener'],
            $tokens[$stackPtr]['parenthesis_closer']
        );
        
        $exceptionVar = '';
        if ($exceptionVarPtr !== false) {
            $exceptionVar = $tokens[$exceptionVarPtr]['content'];
        }
        
        // Find the opening and closing braces of the catch block
        $openBrace  = $tokens[$stackPtr]['scope_opener'];
        $closeBrace = $tokens[$stackPtr]['scope_closer'];
        
        // If the catch block is empty, report an error
        if (($closeBrace - $openBrace) === 1) {
            $error = 'Empty catch block found. Catch blocks must log the error cause (Rule C028)';
            $phpcsFile->addError($error, $stackPtr, 'EmptyCatch');
            return;
        }
        
        $hasLogging = false;
        $hasThrowing = false;
        
        // Scan through the catch block to find logging or re-throwing
        for ($i = $openBrace + 1; $i < $closeBrace; $i++) {
            if ($tokens[$i]['code'] === T_THROW) {
                $hasThrowing = true;
                break;
            }
            
            // Check for function calls that might be logging
            if ($tokens[$i]['code'] === T_STRING) {
                $functionName = strtolower($tokens[$i]['content']);
                
                // Check if any logging function is being called
                foreach ($this->loggingFunctions as $loggingFunction) {
                    if (strpos($functionName, $loggingFunction) !== false) {
                        $hasLogging = true;
                        break 2;
                    }
                }
                
                // Check for specific logging patterns (method calls on logger objects)
                $prevToken = $phpcsFile->findPrevious(
                    [T_WHITESPACE],
                    ($i - 1),
                    null,
                    true,
                    null,
                    true
                );
                
                if ($prevToken !== false && $tokens[$prevToken]['code'] === T_OBJECT_OPERATOR) {
                    $objectToken = $phpcsFile->findPrevious(
                        [T_WHITESPACE],
                        ($prevToken - 1),
                        null,
                        true,
                        null,
                        true
                    );
                    
                    if ($objectToken !== false && 
                        $tokens[$objectToken]['code'] === T_VARIABLE && 
                        preg_match('/(log|logger)/i', $tokens[$objectToken]['content'])) {
                        $hasLogging = true;
                        break;
                    }
                }
            }
            
            // Check for string containing 'log' which might indicate logging in a comment
            if ($tokens[$i]['code'] === T_COMMENT) {
                $comment = strtolower($tokens[$i]['content']);
                if (strpos($comment, 'log') !== false && strpos($comment, 'no log') === false && strpos($comment, 'don\'t log') === false) {
                    // Skip if it's a comment about logging, not actual logging
                    continue;
                }
            }
        }
        
        // If there is neither logging nor re-throwing, report an error
        if (!$hasLogging && !$hasThrowing) {
            $error = 'Catch block does not log or re-throw the error. Every catch block must log the error cause (Rule C028)';
            $phpcsFile->addError($error, $stackPtr, 'NoErrorLogging');
        }
    }
}
