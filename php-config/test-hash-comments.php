<?php
// This is a proper comment

# This is a hash comment that should trigger the sniff

/**
 * This is a doc block comment
 */
function testFunction() {
    // Another proper comment
    echo "Hello";
    # Another hash comment for testing
}
