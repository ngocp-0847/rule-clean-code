#!/bin/bash

# PHP CodeSniffer wrapper script
# Usage: ./check-code.sh <directory-or-file>

# If no directory or file is provided, use current directory
TARGET=${1:-.}

# Run PHP_CodeSniffer with our custom standard
phpcs --standard=php-config "$TARGET"

# Exit with the same status as phpcs
exit $?
