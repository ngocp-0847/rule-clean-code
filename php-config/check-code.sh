#!/bin/bash

# PHP CodeSniffer wrapper script
# Usage: ./check-code.sh <directory-or-file>

# Set colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

# If no directory or file is provided, use current directory
TARGET=${1:-.}

# Use the phpcs.xml configuration
CONFIG_PATH="$(dirname "$0")/phpcs.xml"

echo -e "${YELLOW}Checking coding standards in:${NC} $TARGET"

# Run PHP_CodeSniffer with our configuration
phpcs --standard="$CONFIG_PATH" "$TARGET"

# Store the exit status
STATUS=$?

# Check the exit status and provide feedback
if [ $STATUS -eq 0 ]; then
    echo -e "${GREEN}Success: No coding standards violations detected!${NC}"
else
    echo -e "${RED}Violations detected.${NC}"
    echo -e "${YELLOW}You can try to fix automatically with:${NC}"
    echo -e "${YELLOW}./fix-code.sh $TARGET${NC}"
fi

# Exit with the phpcs status
exit $STATUS
