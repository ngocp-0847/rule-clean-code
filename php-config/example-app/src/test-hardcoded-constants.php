<?php
// Test file for NoHardcodedConstants rule

// These should be detected as hardcoded constants
$url = 'https://example.com/api/v1';
$version = '1.2.3';
$config = 'api_key_12345';
$timeout = 3600; // Magic number
$rate = 2.5; // Magic number

// This API token should be detected
$token = 'abcd1234EFGH5678';

// These should NOT be detected
define('API_URL', 'https://example.com/api/v1'); // Constants defined with define() are OK
const VERSION = '1.2.3'; // Constants defined with const are OK

// Common numbers in logic should be ignored
$a = 0;
$b = 1;
$c = -1;
$d = 2;

// Array indices should be ignored
$array = [1, 2, 3];
echo $array[0];

// Class with property default values should be ignored
class Test {
    public $url = 'https://example.com'; // This should be detected
    
    // Constants in class are OK
    const API_KEY = 'abcd1234'; 
    
    public function doSomething() {
        // This should be detected as hardcoded in logic
        return 'https://api.example.org/v2';
    }
}
