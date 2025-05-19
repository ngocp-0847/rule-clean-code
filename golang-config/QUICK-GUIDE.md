# Hướng Dẫn Nhanh: Golang Clean Code Tools

## Cài đặt Công Cụ

```bash
# golangci-lint
curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s -- -b $(go env GOPATH)/bin v1.55.0

# Staticcheck
go install honnef.co/go/tools/cmd/staticcheck@latest

# Custom linters dependencies
go install golang.org/x/tools/go/analysis/singlechecker@latest
```

## Cấu Hình CI/CD

Sao chép từ thư mục `ci-templates/` tương ứng với CI/CD platform đang sử dụng:
- GitHub Actions: `.github/workflows/golang-lint.yml`
- GitLab CI: `.gitlab-ci.yml`
- CircleCI: `.circleci/config.yml`
- Jenkins: `Jenkinsfile`
- Azure DevOps: `azure-pipelines.yml`

## Kiểm Tra Mã Nguồn Golang Locally

```bash
# Cài đặt git hooks (chạy một lần)
bash /path/to/rule-clean-code/golang-config/install-hooks.sh /path/to/go-project

# Chạy golangci-lint 
cd /path/to/go-project
golangci-lint run --config /path/to/rule-clean-code/golang-config/.golangci.yml

# Chạy custom linters
bash /path/to/rule-clean-code/golang-config/custom-linters/run-custom-linters.sh /path/to/go-project

# Hoặc sử dụng Makefile
make lint GO_PROJECT_PATH=/path/to/go-project
make lint-custom GO_PROJECT_PATH=/path/to/go-project
```

## Các Custom Linters và Quy Tắc

| Linter | Quy Tắc | Mô Tả |
|--------|---------|-------|
| c023-no-hardcoded-constants | C023 | Không hardcode constants trong code |
| c044-boolean-naming | C044 | Tên biến boolean phải bắt đầu bằng is, has, should, v.v. |
| c045-no-print-in-production | C045 | Không dùng hàm print() trong production code |

## Chạy Custom Linter Riêng Biệt

```bash
go run /path/to/rule-clean-code/golang-config/custom-linters/c044-boolean-naming/main.go ./...
go run /path/to/rule-clean-code/golang-config/custom-linters/c023-no-hardcoded-constants/main.go ./...
go run /path/to/rule-clean-code/golang-config/custom-linters/c045-no-print-in-production/main.go ./...
```
