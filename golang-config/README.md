# Golang Clean Code Configuration

Tài liệu này cung cấp hướng dẫn cấu hình và sử dụng các công cụ linting cho dự án Golang, đảm bảo tuân thủ các quy tắc clean code.

## Cài đặt Công Cụ

### Cài đặt golangci-lint

Phiên bản khuyến nghị: v1.55.0 trở lên

```bash
# Binary Installation (Linux)
curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s -- -b $(go env GOPATH)/bin v1.55.0

# Hoặc sử dụng Homebrew (macOS)
brew install golangci-lint
```

### Cài đặt Staticcheck

```bash
go install honnef.co/go/tools/cmd/staticcheck@latest
```

## Sử Dụng

### Chạy Lint Trên Local

Chạy golangci-lint với cấu hình dự án:

```bash
cd /đường/dẫn/đến/dự/án/go
golangci-lint run --config /đường/dẫn/đến/rule-clean-code/golang-config/.golangci.yml
```

Hoặc sao chép file `.golangci.yml` vào thư mục gốc của dự án Go:

```bash
cp /đường/dẫn/đến/rule-clean-code/golang-config/.golangci.yml /đường/dẫn/đến/dự/án/go/
cd /đường/dẫn/đến/dự/án/go
golangci-lint run
```

### Tích Hợp Editor

#### VS Code

Cài đặt extension Go và cấu hình golangci-lint:

1. Cài đặt [Go extension](https://marketplace.visualstudio.com/items?itemName=golang.Go)
2. Thêm cấu hình sau vào settings.json:

```json
{
  "go.lintTool": "golangci-lint",
  "go.lintFlags": [
    "--config=.golangci.yml"
  ]
}
```

#### GoLand

1. Vào Settings > Tools > File Watchers
2. Thêm golangci-lint với các thông số phù hợp
3. Chỉ định đường dẫn đến file cấu hình `.golangci.yml`

## Tích Hợp CI/CD

### GitHub Actions

Thêm workflow sau vào thư mục `.github/workflows/go-lint.yml`:

```yaml
name: Golang Linter

on:
  push:
    branches: [ main, master, develop ]
    paths:
      - '**.go'
  pull_request:
    branches: [ main, master, develop ]
    paths:
      - '**.go'

jobs:
  golangci:
    name: Lint Golang Code
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-go@v4
        with:
          go-version: '1.21'
          cache: false
      - name: golangci-lint
        uses: golangci/golangci-lint-action@v3
        with:
          version: v1.55.0
          args: --timeout=5m
          working-directory: .
          # Sao chép file cấu hình nếu bạn muốn sử dụng cấu hình từ repo này
          # Hoặc comment dòng dưới nếu bạn muốn dùng cấu hình từ dự án Go
          only-new-issues: true
          skip-cache: true
          skip-pkg-cache: true
          skip-build-cache: true
      
      # Nếu muốn chạy kiểm tra custom từ repo này
      - name: Copy Config & Run Custom Checks
        run: |
          cp ${{ github.workspace }}/path/to/rule-clean-code/golang-config/.golangci.yml .
          golangci-lint run
```

### GitLab CI

Thêm mẫu sau vào file `.gitlab-ci.yml`:

```yaml
stages:
  - lint

golang-lint:
  stage: lint
  image: golangci/golangci-lint:v1.55.0
  script:
    # Sao chép file cấu hình nếu bạn muốn sử dụng cấu hình từ repo này
    - cp /path/to/rule-clean-code/golang-config/.golangci.yml .
    - golangci-lint run
  rules:
    - if: $CI_PIPELINE_SOURCE == 'merge_request_event'
      changes:
        - "**/*.go"
```

## Cấu Hình Git Hooks

Để tự động kiểm tra code trước khi commit, thêm pre-commit hook:

```bash
#!/bin/bash
# Đặt file này tại .git/hooks/pre-commit hoặc sử dụng husky

# Đường dẫn đến thư mục golang-config
CONFIG_PATH="/đường/dẫn/đến/rule-clean-code/golang-config"

# Chỉ kiểm tra các file .go đã được staged
STAGED_GO_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep "\.go$")

if [[ "$STAGED_GO_FILES" = "" ]]; then
  exit 0
fi

# Chạy golangci-lint trên các file được staged
echo "Running golangci-lint on staged Go files..."
golangci-lint run --config "$CONFIG_PATH/.golangci.yml" $STAGED_GO_FILES

# Nếu có lỗi, ngăn commit
if [ $? -ne 0 ]; then
  echo "❌ golangci-lint failed. Commit bị từ chối."
  exit 1
fi

echo "✅ golangci-lint passed."
exit 0
```

## Custom Rules

Đối với các quy tắc không được hỗ trợ bởi golangci-lint, chúng ta sử dụng custom linter trong thư mục `custom-linters/`. Xem tài liệu [CUSTOM-LINTERS.md](./CUSTOM-LINTERS.md) để biết thêm chi tiết.

## Quy tắc được hỗ trợ

Xem bảng quy tắc đầy đủ trong file [golang.md](./golang.md).
