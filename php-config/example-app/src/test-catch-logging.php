<?php
// Test file for LogErrorsInCatch rule

// This catch should trigger a violation because it does nothing with the error
function badCatchEmpty() {
    try {
        // Do something that might throw an exception
        throw new \Exception("Test exception");
    } catch (\Exception $e) {
        // Empty catch - this should be flagged as an error
    }
}

// This catch should trigger a violation because it has code but doesn't log the error
function badCatchNoLogging() {
    try {
        // Do something that might throw an exception
        throw new \Exception("Test exception");
    } catch (\Exception $e) {
        // Has code but doesn't log the error
        $x = 1;
        $y = 2;
        $z = $x + $y;
    }
}

// This catch should NOT trigger a violation because it logs the error
function goodCatchWithLogging() {
    try {
        // Do something that might throw an exception
        throw new \Exception("Test exception");
    } catch (\Exception $e) {
        // This properly logs the error
        error_log("An error occurred: " . $e->getMessage());
        // Handle the error...
    }
}

// This catch should NOT trigger a violation because it re-throws the error
function goodCatchWithRethrow() {
    try {
        // Do something that might throw an exception
        throw new \Exception("Test exception");
    } catch (\Exception $e) {
        // This properly re-throws the error after wrapping it
        throw new \RuntimeException("Something went wrong", 0, $e);
    }
}

// This catch should NOT trigger a violation because it logs with a logger object
function goodCatchWithLoggerObject() {
    try {
        // Do something that might throw an exception
        throw new \Exception("Test exception");
    } catch (\Exception $e) {
        // Using a logger object
        $logger->error("An error occurred", ['exception' => $e]);
    }
}

// This catch should NOT trigger a violation because it calls a method with 'log' in the name
function goodCatchWithLogMethod() {
    try {
        // Do something that might throw an exception
        throw new \Exception("Test exception");
    } catch (\Exception $e) {
        // Using a method with 'log' in the name
        $this->logException($e);
    }
}
