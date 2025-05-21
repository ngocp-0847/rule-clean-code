<?php
// Test file for real-world example

class SimpleService 
{
    public function process() 
    {
        try {
            // Some process
            $result = $this->doSomething();
            return $result;
        } catch (\Exception $e) {
            // Bad: No logging
            return false;
        }
    }
    
    public function doSomething() 
    {
        try {
            // Another process
            return true;
        } catch (\Exception $e) {
            // Empty catch block - should be flagged
        }
    }
    
    public function goodExceptionHandling() 
    {
        try {
            // Some operation
            return $this->doSomething();
        } catch (\Exception $e) {
            // Good: logs the error
            error_log('An error occurred: ' . $e->getMessage());
            return false;
        }
    }
}
