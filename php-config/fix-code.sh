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
CONFIG_PATH="MyStandard"

# Run PHP Code Beautifier and Fixer with our configuration
phpcbf --standard="$CONFIG_PATH" -v "$TARGET"
