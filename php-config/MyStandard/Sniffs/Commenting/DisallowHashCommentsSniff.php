<?php

namespace MyStandard\Sniffs\Commenting;

use PHP_CodeSniffer\Sniffs\Sniff;
use PHP_CodeSniffer\Files\File;

/**
 * This sniff prohibits the use of Perl style hash comments.
 */
final class DisallowHashCommentsSniff implements Sniff
{

    /**
     * Returns the token types that this sniff is interested in.
     *
     * @return array<int|string>
     */
    public function register()
    {
        return [T_COMMENT];
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
        if ($tokens[$stackPtr]['content'][0] === '#') {
            $error = 'Hash comments are prohibited; found %s';
            $data  = [trim($tokens[$stackPtr]['content'])];
            $phpcsFile->addError($error, $stackPtr, 'Found', $data);
            
            // Provide a fix suggestion by converting to // style comment
            $fix = $phpcsFile->addFixableError('Hash comments should be converted to // style', $stackPtr, 'ConvertToSlash', []);
            if ($fix === true) {
                $content = $tokens[$stackPtr]['content'];
                $newContent = '// ' . substr($content, 1);
                $phpcsFile->fixer->replaceToken($stackPtr, $newContent);
            }
        }
    }
}