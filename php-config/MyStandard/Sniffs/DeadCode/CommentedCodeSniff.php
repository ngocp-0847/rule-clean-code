<?php
// filepath: /home/phan.ngoc@sun-asterisk.com/Documents/projects/rule-clean-code/php-config/MyStandard/Sniffs/DeadCode/CommentedCodeSniff.php

namespace MyStandard\Sniffs\DeadCode;

use PHP_CodeSniffer\Sniffs\Sniff;
use PHP_CodeSniffer\Files\File;

/**
 * This sniff detects code that has been commented out (dead code).
 */
final class CommentedCodeSniff implements Sniff
{
    /**
     * Returns the token types that this sniff is interested in.
     *
     * @return array<int|string>
     */
    public function register()
    {
        return [T_COMMENT, T_DOC_COMMENT_OPEN_TAG];
    }

    /**
     * A list of patterns that suggest code might be present in a comment.
     *
     * @var array<string>
     */
    private $codeIndicators = [
        // Variables
        '\$[a-zA-Z_\x80-\xff][a-zA-Z0-9_\x80-\xff]*', // PHP variable pattern
        // Function calls
        '[a-zA-Z_\x80-\xff][a-zA-Z0-9_\x80-\xff]*\s*\(',
        // Control structures
        '(if|for|foreach|while|switch|try|catch)\s*\(',
        // PHP language constructs
        '(echo|print|die|exit|return|include|require)\s+',
        // PHP array syntax
        'array\s*\(',
        '\[.+\]\s*=',
        // Object operators
        '->[a-zA-Z_\x80-\xff][a-zA-Z0-9_\x80-\xff]*',
        // Class definitions
        'class\s+[a-zA-Z_\x80-\xff][a-zA-Z0-9_\x80-\xff]*',
        // Function or method definitions
        'function\s+[a-zA-Z_\x80-\xff][a-zA-Z0-9_\x80-\xff]*\s*\(',
        // PHP tags
        '<\?php',
        '\?>',
        // Assignment operators
        '\$[a-zA-Z_\x80-\xff][a-zA-Z0-9_\x80-\xff]*\s*=\s*',
    ];

    /**
     * Processes this sniff, when one of its tokens is encountered.
     *
     * @param \PHP_CodeSniffer\Files\File $phpcsFile The current file being checked.
     * @param int                         $stackPtr  The position of the current token in the
     *                                               stack passed in $tokens.
     *
     * @return int|void
     */
    public function process(File $phpcsFile, $stackPtr)
    {
        $tokens = $phpcsFile->getTokens();
        $token  = $tokens[$stackPtr];

        // Process the comment block or line
        if ($token['code'] === T_DOC_COMMENT_OPEN_TAG) {
            // For doc comment blocks, process all lines as one comment
            $commentEnd = $tokens[$stackPtr]['comment_closer'];
            $comment = $phpcsFile->getTokensAsString($stackPtr, ($commentEnd - $stackPtr + 1));
            
            // Skip PHPDoc comments that are likely not commented out code
            if (preg_match('/@(param|return|throws|var|author|since|version|see|link|deprecated)/i', $comment)) {
                return;
            }
        } else {
            // For normal comments, get the content
            $comment = $token['content'];
        }

        // Normalize comment markers
        $commentText = $this->normalizeComment($comment);
        
        // Skip empty comments or single-line comments with common patterns
        if (empty(trim($commentText)) || $this->isExcludedComment($commentText)) {
            return;
        }

        // Check for code indicators in the comment
        foreach ($this->codeIndicators as $pattern) {
            if (preg_match('/' . $pattern . '/i', $commentText)) {
                $error = 'Commented out code detected; Code should be removed, not commented out';
                $phpcsFile->addError(
                    $error,
                    $stackPtr,
                    'Found'
                );
                return;
            }
        }
    }

    /**
     * Normalize the comment by removing comment markers.
     *
     * @param string $comment The comment text.
     *
     * @return string
     */
    private function normalizeComment($comment)
    {
        // Remove comment markers for easier inspection
        $text = $comment;
        $text = preg_replace('/^\s*\/\*+/', '', $text);  // Start of block comment
        $text = preg_replace('/\*+\/\s*$/', '', $text);  // End of block comment
        $text = preg_replace('/^\s*\*\s/m', '', $text);  // Middle lines of block comments
        $text = preg_replace('/^\s*\/\/\s*/m', '', $text); // Single line comments
        $text = preg_replace('/^#\s*/m', '', $text);     // Hash comments
        
        return $text;
    }

    /**
     * Check if this is a common comment that should be excluded from the dead code check.
     *
     * @param string $comment The normalized comment text.
     *
     * @return bool
     */
    private function isExcludedComment($comment)
    {
        // Simple single-line text comments
        if (mb_strlen(trim($comment)) < 40 && strpos($comment, ';') === false && strpos($comment, '{') === false) {
            return true;
        }

        // Common comment patterns that are not code
        $excludePatterns = [
            '/^TODO:/',
            '/^FIXME:/',
            '/^NOTE:/',
            '/^@copyright/',
            '/^@license/',
            '/^@author/',
            '/^Copyright \(c\)/',
            '/^This file is part of/'
        ];

        foreach ($excludePatterns as $pattern) {
            if (preg_match($pattern, trim($comment))) {
                return true;
            }
        }

        return false;
    }
}
