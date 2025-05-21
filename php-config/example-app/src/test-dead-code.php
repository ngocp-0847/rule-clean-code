<?php
// filepath: /home/phan.ngoc@sun-asterisk.com/Documents/projects/rule-clean-code/php-config/example-app/test-dead-code.php

/**
 * This is a test file for dead code detection
 */
class DeadCodeExample
{
    public function validFunction()
    {
        $a = 10;
        $b = 20;
        $result = $a + $b;
        
        return $a;

        $d = $a + 5;
        // This is a normal comment
        return $result;
    }
    
    public function functionWithDeadCode()
    {
        $value = 100;
        
        // $oldValue = $value;
        // if ($oldValue > 50) {
        //     $value = $oldValue * 2;
        // }
        
        /*
        // This was the old implementation
        foreach ($array as $item) {
            $value += $item->getValue();
        }
        */
        
        /**
         * We used to do it this way:
         * $result = process($value);
         * return $result->format();
         */
        
        return $value;
    }
    
    /**
     * @param int $param The input parameter
     * @return int The calculated result
     * This is a proper PHPDoc comment, not dead code
     */
    public function docCommentedFunction($param)
    {
        return $param * 2;
    }
    
    // TODO: Implement this in the future
    // NOTE: This needs review before implementation
}
