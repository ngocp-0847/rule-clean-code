# Makefile cho Golang Clean Code
# Sử dụng: make <target>

.PHONY: help install-deps lint lint-custom ci-setup pre-commit

# Biến môi trường
GOPATH := $(shell go env GOPATH)
GOLANGCI_LINT_VERSION := v1.55.0
CONFIG_DIR := $(shell pwd)
SHELL := /bin/bash

help: ## Hiển thị trợ giúp
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

install-deps: ## Cài đặt các công cụ phụ thuộc
	@echo "Cài đặt golangci-lint $(GOLANGCI_LINT_VERSION)..."
	curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s -- -b $(GOPATH)/bin $(GOLANGCI_LINT_VERSION)
	@echo "Cài đặt staticcheck..."
	go install honnef.co/go/tools/cmd/staticcheck@latest
	@echo "✅ Đã cài đặt xong các phụ thuộc!"
	@echo "🔍 Phiên bản golangci-lint: $$(golangci-lint --version)"

lint: ## Chạy golangci-lint trên dự án Go
	@if [ -z "$(GO_PROJECT_PATH)" ]; then \
		echo "❌ Cần chỉ định đường dẫn đến dự án Go: make lint GO_PROJECT_PATH=/đường/dẫn/đến/dự/án/go"; \
		exit 1; \
	fi
	@echo "Chạy golangci-lint trên $(GO_PROJECT_PATH)..."
	cd $(GO_PROJECT_PATH) && golangci-lint run --config $(CONFIG_DIR)/.golangci.yml ./...

lint-custom: ## Chạy custom linters trên dự án Go
	@if [ -z "$(GO_PROJECT_PATH)" ]; then \
		echo "❌ Cần chỉ định đường dẫn đến dự án Go: make lint-custom GO_PROJECT_PATH=/đường/dẫn/đến/dự/án/go"; \
		exit 1; \
	fi
	@echo "Chạy custom linters trên $(GO_PROJECT_PATH)..."
	bash $(CONFIG_DIR)/custom-linters/run-custom-linters.sh $(GO_PROJECT_PATH)

ci-setup: ## Thiết lập CI cho dự án Go (GitHub Actions)
	@if [ -z "$(GO_PROJECT_PATH)" ]; then \
		echo "❌ Cần chỉ định đường dẫn đến dự án Go: make ci-setup GO_PROJECT_PATH=/đường/dẫn/đến/dự/án/go"; \
		exit 1; \
	fi
	
	@mkdir -p $(GO_PROJECT_PATH)/.github/workflows
	
	@echo "Tạo GitHub Actions workflow cho golangci-lint..."
	cp $(CONFIG_DIR)/ci-templates/github-actions.yml $(GO_PROJECT_PATH)/.github/workflows/golang-lint.yml
	
	@echo "Sao chép cấu hình golangci-lint..."
	cp $(CONFIG_DIR)/.golangci.yml $(GO_PROJECT_PATH)/
	
	@echo "✅ Đã thiết lập CI! Các file được tạo:"
	@echo "  - $(GO_PROJECT_PATH)/.github/workflows/golang-lint.yml"
	@echo "  - $(GO_PROJECT_PATH)/.golangci.yml"

pre-commit: ## Cài đặt pre-commit hook cho dự án Go
	@if [ -z "$(GO_PROJECT_PATH)" ]; then \
		echo "❌ Cần chỉ định đường dẫn đến dự án Go: make pre-commit GO_PROJECT_PATH=/đường/dẫn/đến/dự/án/go"; \
		exit 1; \
	fi
	
	@mkdir -p $(GO_PROJECT_PATH)/.git/hooks
	
	@echo "Cài đặt pre-commit hook..."
	cp $(CONFIG_DIR)/git-hooks/pre-commit $(GO_PROJECT_PATH)/.git/hooks/
	chmod +x $(GO_PROJECT_PATH)/.git/hooks/pre-commit
	
	@echo "✅ Đã cài đặt pre-commit hook tại $(GO_PROJECT_PATH)/.git/hooks/pre-commit"
