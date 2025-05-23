# Simple Makefile for PHP CodeSniffer
# Only includes essential check and fix commands

# --- Configuration ---
# PHPCS and PHPCBF executables (assumes they're in PATH)
PHPCS = phpcs
PHPCBF = phpcbf

# Configuration file path
CONFIG_FILE = $(shell pwd)/example-app/phpcs.xml

# Target to check/fix (defaults to current directory)
# Usage: make check TARGET=path/to/check
# or:    make fix TARGET=path/to/fix
ACTUAL_TARGET = $(or $(TARGET),.)

# Output Colors
GREEN = \033[0;32m
RED = \033[0;31m
YELLOW = \033[0;33m
NC = \033[0m # No Color

# PHPStan executable (defaults to phpstan command in PATH)
# Usage: make analyse PHPSTAN=/path/to/phpstan
PHPSTAN_CMD = $(or $(PHPSTAN),phpstan)

# PHPStan configuration file path (defaults to example-app/phpstan.neon)
# Usage: make analyse PHPSTAN_CONFIG=/path/to/phpstan.neon
PHPSTAN_CONFIG_FILE = $(or $(PHPSTAN_CONFIG),$(shell pwd)/phpstan.neon)

# Define phony targets (not files)
.PHONY: all check fix analyse

# Default target (runs check and analyse)
all: check analyse

# Check coding standards
check:
	@echo "$(YELLOW)Checking coding standards for: $(ACTUAL_TARGET)$(NC)"
	@$(PHPCS) --standard=$(CONFIG_FILE) $(ACTUAL_TARGET)
	@if [ $$? -eq 0 ]; then \
		echo "$(GREEN)No coding standards violations detected.$(NC)"; \
	else \
		echo "$(RED)Coding standards violations detected.$(NC)"; \
		echo "$(YELLOW)Run 'make fix TARGET=$(ACTUAL_TARGET)' to attempt automatic fixes.$(NC)"; \
		exit 1; \
	fi

# Fix coding standards
fix:
	@echo "$(YELLOW)Attempting to fix coding standards for: $(ACTUAL_TARGET)$(NC)"
	@$(PHPCBF) --standard=$(CONFIG_FILE) $(ACTUAL_TARGET)
	@status=$$?; \
	if [ $$status -eq 0 ]; then \
		echo "$(GREEN)PHPCBF: No fixable violations found.$(NC)"; \
	elif [ $$status -eq 1 ]; then \
		echo "$(GREEN)PHPCBF: All fixable violations were successfully fixed.$(NC)"; \
		echo "$(YELLOW)Run 'make check TARGET=$(ACTUAL_TARGET)' to verify any remaining issues.$(NC)"; \
	elif [ $$status -eq 2 ]; then \
		echo "$(YELLOW)PHPCBF: Some fixable violations could not be fixed automatically.$(NC)"; \
		echo "$(YELLOW)Run 'make check TARGET=$(ACTUAL_TARGET)' to see remaining issues.$(NC)"; \
	else \
		echo "$(RED)PHPCBF: An error occurred (exit code $$status).$(NC)"; \
		exit 1; \
	fi

# Analyse code with PHPStan
analyse:
	@echo "$(YELLOW)Analysing code with PHPStan for: $(ACTUAL_TARGET)$(NC)"
	@$(PHPSTAN_CMD) analyse --configuration=$(PHPSTAN_CONFIG_FILE) $(ACTUAL_TARGET)
	@if [ $$? -eq 0 ]; then \
		echo "$(GREEN)No errors found by PHPStan.$(NC)"; \
	else \
		echo "$(RED)PHPStan found code issues.$(NC)"; \
		exit 1; \
	fi
