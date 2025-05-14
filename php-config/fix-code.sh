#!/bin/bash

# PHP CodeSniffer fixer script
# Usage: ./fix-code.sh <directory-or-file>

# Set colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

# If no directory or file is provided, use current directory
TARGET=${1:-.}

echo -e "${YELLOW}Attempting to fix coding standards violations in:${NC} $TARGET"

# Use the phpcs.xml configuration
CONFIG_PATH="$(dirname "$0")/phpcs.xml"

# Run PHP Code Beautifier and Fixer with our configuration
phpcbf --standard="$CONFIG_PATH" -v "$TARGET"

# Store the exit status
STATUS=$?

# Check the exit status and provide feedback
if [ $STATUS -eq 0 ]; then
    echo -e "${GREEN}Success: All fixable coding standards violations have been fixed!${NC}"
elif [ $STATUS -eq 1 ]; then
    echo -e "${YELLOW}Partial Success: Some fixable coding standards violations were fixed.${NC}"
    echo -e "${YELLOW}Some violations require manual fixing.${NC}"
    echo -e "${YELLOW}Running check to show remaining issues...${NC}"
    echo ""
    # Show remaining issues using the same config
    phpcs --standard="$CONFIG_PATH" "$TARGET"
elif [ $STATUS -eq 2 ]; then
    echo -e "${RED}Error: phpcbf encountered an issue and could not complete.${NC}"
    echo -e "${YELLOW}This might be due to syntax errors or configuration issues.${NC}"
elif [ $STATUS -eq 3 ]; then
    echo -e "${RED}Error: No files were found to fix.${NC}"
    echo -e "${YELLOW}Check that the provided path is correct.${NC}"
else
    echo -e "${RED}Unknown error occurred.${NC}"
fi

# Exit with the phpcbf status
exit $STATUS
