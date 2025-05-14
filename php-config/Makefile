# Makefile for PHP CodeSniffer integration
# Used for development and CI/CD pipelines

# Default PHP binary
PHP = php

# Define default paths
PHP_CONFIG_PATH = $(shell pwd)
CONFIG_FILE = $(PHP_CONFIG_PATH)/phpcs.xml
DEFAULT_TARGET = .

# Define colors for output
GREEN = \033[0;32m
RED = \033[0;31m
YELLOW = \033[0;33m
NC = \033[0m # No Color

.PHONY: help check fix ci validate report-xml report-json setup setup-ci all

# Default target
all: check

# Show help information
help:
	@echo "$(GREEN)PHP CodeSniffer Makefile$(NC)"
	@echo "$(YELLOW)Available commands:$(NC)"
	@echo "  $(GREEN)make help$(NC)       - Show this help message"
	@echo "  $(GREEN)make check$(NC)      - Run phpcs to check coding standards (without fixing)"
	@echo "  $(GREEN)make fix$(NC)        - Run phpcbf to automatically fix coding standards violations"
	@echo "  $(GREEN)make ci$(NC)         - Run in CI mode (stricter, with XML report)"
	@echo "  $(GREEN)make validate$(NC)   - Validate PHP syntax without running phpcs"
	@echo "  $(GREEN)make report-xml$(NC) - Generate XML report"
	@echo "  $(GREEN)make report-json$(NC) - Generate JSON report"
	@echo "  $(GREEN)make setup$(NC)      - Set up PHP_CodeSniffer with custom standards"
	@echo "  $(GREEN)make setup-ci$(NC)   - Set up PHP_CodeSniffer for CI environment"
	@echo ""
	@echo "$(YELLOW)Usage examples:$(NC)"
	@echo "  $(GREEN)make check TARGET=path/to/file.php$(NC)    - Check specific file"
	@echo "  $(GREEN)make fix TARGET=path/to/directory$(NC)     - Fix all files in directory"

# Run PHP CodeSniffer to check coding standards
check:
	@echo "$(YELLOW)Checking coding standards...$(NC)"
	@phpcs --standard=$(CONFIG_FILE) $(TARGET:-=./$(DEFAULT_TARGET))
	@if [ $$? -eq 0 ]; then \
		echo "$(GREEN)No coding standards violations detected.$(NC)"; \
	else \
		echo "$(RED)Coding standards violations detected.$(NC)"; \
		echo "$(YELLOW)Run 'make fix' to automatically fix fixable issues.$(NC)"; \
		exit 1; \
	fi

# Run PHP Code Beautifier and Fixer to fix coding standards
fix:
	@echo "$(YELLOW)Fixing coding standards...$(NC)"
	@phpcbf --standard=$(CONFIG_FILE) $(TARGET:-=./$(DEFAULT_TARGET))
	@if [ $$? -eq 0 ]; then \
		echo "$(GREEN)All fixable coding standards violations have been fixed.$(NC)"; \
	elif [ $$? -eq 1 ]; then \
		echo "$(YELLOW)Some fixable coding standards violations were fixed. Some violations could not be fixed automatically.$(NC)"; \
		echo "$(YELLOW)Run 'make check' to see remaining issues.$(NC)"; \
	else \
		echo "$(RED)Error occurred during fixing process.$(NC)"; \
		exit 1; \
	fi

# Run in CI mode (stricter, with reports)
ci: report-xml
	@echo "$(YELLOW)Running PHP CodeSniffer in CI mode...$(NC)"
	@phpcs --standard=$(CONFIG_FILE) --report=checkstyle --report-file=./phpcs-result.xml $(TARGET:-=./$(DEFAULT_TARGET)) || true
	@echo "$(GREEN)CI check completed. See phpcs-result.xml for results.$(NC)"

# Validate PHP syntax without running phpcs
validate:
	@echo "$(YELLOW)Validating PHP syntax...$(NC)"
	@find $(TARGET:-=./$(DEFAULT_TARGET)) -name "*.php" -print0 | xargs -0 -n1 -P4 php -l
	@echo "$(GREEN)PHP syntax validation completed.$(NC)"

# Generate XML report
report-xml:
	@echo "$(YELLOW)Generating XML report...$(NC)"
	@phpcs --standard=$(CONFIG_FILE) --report=checkstyle --report-file=./phpcs-result.xml $(TARGET:-=./$(DEFAULT_TARGET)) || true
	@echo "$(GREEN)XML report generated: phpcs-result.xml$(NC)"

# Generate JSON report
report-json:
	@echo "$(YELLOW)Generating JSON report...$(NC)"
	@phpcs --standard=$(CONFIG_FILE) --report=json --report-file=./phpcs-result.json $(TARGET:-=./$(DEFAULT_TARGET)) || true
	@echo "$(GREEN)JSON report generated: phpcs-result.json$(NC)"

# Set up PHP_CodeSniffer with custom standards
setup:
	@echo "$(YELLOW)Setting up PHP_CodeSniffer with custom standards...$(NC)"
	@composer global require "squizlabs/php_codesniffer=*"
	@echo 'export PATH="$$PATH:$$HOME/.config/composer/vendor/bin"' >> ~/.bashrc
	@source ~/.bashrc
	@phpcs --config-set installed_paths $(PHP_CONFIG_PATH)
	@echo "$(GREEN)PHP_CodeSniffer setup completed.$(NC)"
	@echo "$(YELLOW)Installed standards:$(NC)"
	@phpcs -i

# Set up PHP_CodeSniffer for CI environment
setup-ci:
	@echo "$(YELLOW)Setting up PHP_CodeSniffer for CI environment...$(NC)"
	@composer require --dev "squizlabs/php_codesniffer=*"
	@vendor/bin/phpcs --config-set installed_paths $(PHP_CONFIG_PATH)
	@echo "$(GREEN)PHP_CodeSniffer CI setup completed.$(NC)"
	@echo "$(YELLOW)Installed standards:$(NC)"
	@vendor/bin/phpcs -i
