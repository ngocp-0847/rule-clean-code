#!/bin/bash

# Script to install Git hooks
# Usage: ./install-hooks.sh [git-repo-path]

# Set colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

# Determine the Git repository path
if [ -n "$1" ]; then
    REPO_PATH="$1"
else
    # If no path is provided, use the current directory
    REPO_PATH="$(pwd)"
fi

# Check if the specified path is a Git repository
if [ ! -d "$REPO_PATH/.git" ]; then
    echo -e "${RED}Error: $REPO_PATH is not a Git repository.${NC}"
    exit 1
fi

# Source directory containing hooks
HOOKS_SOURCE_DIR="$(dirname "$0")/git-hooks"

# Destination directory for hooks
HOOKS_DEST_DIR="$REPO_PATH/.git/hooks"

# Check if the hooks source directory exists
if [ ! -d "$HOOKS_SOURCE_DIR" ]; then
    echo -e "${RED}Error: Hooks source directory not found: $HOOKS_SOURCE_DIR${NC}"
    exit 1
fi

# Install the hooks
echo -e "${YELLOW}Installing Git hooks to $HOOKS_DEST_DIR...${NC}"

# Create hooks directory if it doesn't exist
mkdir -p "$HOOKS_DEST_DIR"

# Copy each hook and make it executable
for hook in "$HOOKS_SOURCE_DIR"/*; do
    if [ -f "$hook" ]; then
        hook_name=$(basename "$hook")
        cp "$hook" "$HOOKS_DEST_DIR/$hook_name"
        chmod +x "$HOOKS_DEST_DIR/$hook_name"
        echo -e "${GREEN}Installed hook: $hook_name${NC}"
    fi
done

echo -e "${GREEN}Git hooks installation complete!${NC}"
exit 0
