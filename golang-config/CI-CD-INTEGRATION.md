# Hướng dẫn tích hợp CI/CD cho Golang Clean Code

Tài liệu này hướng dẫn cách tích hợp các quy tắc kiểm tra mã nguồn Golang vào quy trình CI/CD của dự án.

## Các công cụ sử dụng

1. **golangci-lint**: Công cụ linting tổng hợp cho Golang
2. **Custom linters**: Các linter tùy chỉnh cho các quy tắc đặc biệt
3. **Git hooks**: Tự động kiểm tra code trước khi commit
4. **CI/CD platforms**: Tích hợp vào GitHub Actions, GitLab CI, CircleCI, Jenkins, Azure Pipelines

## Tích hợp với các nền tảng CI/CD

### GitHub Actions

1. Tạo thư mục `.github/workflows` trong dự án Golang
2. Tạo file `golang-lint.yml` với nội dung:

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
          only-new-issues: true
          skip-cache: true
          skip-pkg-cache: true
          skip-build-cache: true
      
      - name: Run Custom Linters
        run: |
          # Cài đặt các dependency cho custom linters
          go install golang.org/x/tools/go/analysis/singlechecker@latest
          
          # Chạy custom linters từ repo
          git clone https://github.com/yourusername/rule-clean-code.git /tmp/rule-clean-code
          bash /tmp/rule-clean-code/golang-config/custom-linters/run-custom-linters.sh ${{ github.workspace }}
```

### GitLab CI

Tạo file `.gitlab-ci.yml` trong thư mục gốc của dự án:

```yaml
image: golang:1.21

stages:
  - lint

variables:
  GOLANGCI_LINT_VERSION: v1.55.0

before_script:
  - go version
  - curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s -- -b $(go env GOPATH)/bin $GOLANGCI_LINT_VERSION
  - golangci-lint --version

lint:standard:
  stage: lint
  script:
    - golangci-lint run --timeout=5m
  rules:
    - if: $CI_PIPELINE_SOURCE == 'merge_request_event'
      changes:
        - "**/*.go"

lint:custom:
  stage: lint
  script:
    # Cài đặt dependency cho custom linters
    - go install golang.org/x/tools/go/analysis/singlechecker@latest
    
    # Clone rule-clean-code repo
    - git clone https://github.com/yourusername/rule-clean-code.git /tmp/rule-clean-code
    
    # Chạy custom linters
    - bash /tmp/rule-clean-code/golang-config/custom-linters/run-custom-linters.sh .
  rules:
    - if: $CI_PIPELINE_SOURCE == 'merge_request_event'
      changes:
        - "**/*.go"
```

### CircleCI

Tạo file `.circleci/config.yml` trong thư mục gốc của dự án:

```yaml
version: 2.1

jobs:
  golang-lint:
    docker:
      - image: golangci/golangci-lint:v1.55.0
    steps:
      - checkout
      
      # Cài đặt các dependencies
      - run:
          name: Cài đặt dependencies
          command: |
            go install golang.org/x/tools/go/analysis/singlechecker@latest
      
      # Chạy golangci-lint
      - run:
          name: Chạy golangci-lint
          command: |
            # Sao chép cấu hình từ repo clean-code
            cp /home/circleci/project/rule-clean-code/golang-config/.golangci.yml .
            golangci-lint run ./...
      
      # Chạy custom linters
      - run:
          name: Chạy custom linters
          command: |
            bash /home/circleci/project/rule-clean-code/golang-config/custom-linters/run-custom-linters.sh .

workflows:
  version: 2
  golang-lint:
    jobs:
      - golang-lint
```

### Jenkins

Tạo file `Jenkinsfile` trong thư mục gốc của dự án:

```groovy
pipeline {
    agent {
        docker {
            image 'golangci/golangci-lint:v1.55.0'
        }
    }
    
    stages {
        stage('Setup') {
            steps {
                sh 'go version'
                sh 'golangci-lint --version'
                sh 'go install golang.org/x/tools/go/analysis/singlechecker@latest'
            }
        }
        
        stage('Lint with golangci-lint') {
            steps {
                // Sao chép cấu hình từ repo rule-clean-code (điều chỉnh path phù hợp)
                sh '''
                cp ${WORKSPACE}/rule-clean-code/golang-config/.golangci.yml .
                golangci-lint run ./...
                '''
            }
        }
        
        stage('Run custom linters') {
            steps {
                // Chạy custom linters (điều chỉnh path phù hợp)
                sh '''
                bash ${WORKSPACE}/rule-clean-code/golang-config/custom-linters/run-custom-linters.sh .
                '''
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        success {
            echo 'Lint succeeded!'
        }
        failure {
            echo 'Lint failed!'
        }
    }
}
```

### Azure DevOps

Tạo file `azure-pipelines.yml` trong thư mục gốc của dự án:

```yaml
trigger:
  branches:
    include:
      - main
      - master
      - develop
      - feature/*
      - fix/*
  paths:
    include:
      - '**/*.go'

pool:
  vmImage: 'ubuntu-latest'

steps:
- task: GoTool@0
  inputs:
    version: '1.21'
  displayName: 'Cài đặt Go'

- script: |
    curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s -- -b $(go env GOPATH)/bin v1.55.0
    $(go env GOPATH)/bin/golangci-lint --version
  displayName: 'Cài đặt golangci-lint'

- script: |
    go install golang.org/x/tools/go/analysis/singlechecker@latest
  displayName: 'Cài đặt dependencies cho custom linters'

- script: |
    # Sao chép cấu hình từ rule-clean-code repo (cần điều chỉnh path)
    cp $(Build.SourcesDirectory)/rule-clean-code/golang-config/.golangci.yml .
    $(go env GOPATH)/bin/golangci-lint run ./...
  displayName: 'Chạy golangci-lint'

- script: |
    # Chạy custom linters (cần điều chỉnh path)
    bash $(Build.SourcesDirectory)/rule-clean-code/golang-config/custom-linters/run-custom-linters.sh .
  displayName: 'Chạy custom linters'
```

## Triển khai CI/CD tự động

### Tự động setup với Makefile

Sử dụng Makefile đã được cung cấp trong thư mục `golang-config`:

```bash
# Cài đặt dependencies
make install-deps

# Thiết lập CI cho dự án Golang
make ci-setup GO_PROJECT_PATH=/đường/dẫn/đến/dự/án/go

# Cài đặt pre-commit hook
make pre-commit GO_PROJECT_PATH=/đường/dẫn/đến/dự/án/go

# Chạy linting trên dự án
make lint GO_PROJECT_PATH=/đường/dẫn/đến/dự/án/go

# Chạy custom linters
make lint-custom GO_PROJECT_PATH=/đường/dẫn/đến/dự/án/go
```

### Sử dụng script cài đặt

Ngoài ra, bạn có thể sử dụng script `install-hooks.sh` để cài đặt git hooks:

```bash
# Cài đặt git hooks cho dự án
bash /đường/dẫn/đến/rule-clean-code/golang-config/install-hooks.sh /đường/dẫn/đến/dự/án/go
```

## Kiểm tra kết quả CI/CD

Sau khi thiết lập CI/CD, mỗi khi commit hoặc tạo pull request vào các nhánh chính, quy trình kiểm tra sẽ tự động chạy và báo cáo kết quả.

### Đọc kết quả linting

Kết quả của golangci-lint sẽ có dạng:

```
src/main.go:10:12: variable 'connected' should start with 'is', 'has', or 'should' (booleannames)
src/service.go:25:5: hardcoded string literal 'Connection timeout after' should be defined as a constant (nohardcodedconstants)
```

### Xử lý các vấn đề được phát hiện

1. Xem báo cáo lỗi trong CI/CD
2. Sửa các vấn đề trong mã nguồn
3. Commit lại và kiểm tra lại kết quả

## Tùy chỉnh cấu hình

### Điều chỉnh cấu hình golangci-lint

Chỉnh sửa file `.golangci.yml` để điều chỉnh các linter được bật/tắt:

```yaml
linters:
  disable-all: true
  enable:
    - gofmt
    - govet
    # Thêm hoặc xóa các linter cần thiết
```

### Thêm custom linter mới

1. Tạo thư mục mới trong `custom-linters/`
2. Viết mã nguồn cho linter mới
3. Cập nhật script `run-custom-linters.sh` để thêm linter mới vào danh sách
