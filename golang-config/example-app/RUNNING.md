# Hướng dẫn chạy ứng dụng ví dụ

## Cài đặt dependencies

```bash
# Đảm bảo môi trường Go được cài đặt
go version

# Tải dependencies (nếu cần)
go mod tidy
```

## Chạy linters để phát hiện các vi phạm clean code

### 1. Chạy golangci-lint

```bash
cd /home/phan.ngoc@sun-asterisk.com/Documents/projects/rule-clean-code/golang-config
golangci-lint run --config .golangci.yml ./example-app
```

### 2. Chạy custom linter C044 (boolean naming)

```bash
cd /home/phan.ngoc@sun-asterisk.com/Documents/projects/rule-clean-code/golang-config
go run ./custom-linters/c044-boolean-naming/main.go ./example-app/...
```

### 3. Chạy custom linter C023 (no hardcoded constants)

```bash
cd /home/phan.ngoc@sun-asterisk.com/Documents/projects/rule-clean-code/golang-config
go run ./custom-linters/c023-no-hardcoded-constants/main.go ./example-app/...
```

### 4. Chạy custom linter C045 (no print in production)

```bash
cd /home/phan.ngoc@sun-asterisk.com/Documents/projects/rule-clean-code/golang-config
go run ./custom-linters/c045-no-print-in-production/main.go ./example-app/...
```

### 5. Chạy tất cả custom linters cùng một lúc

```bash
cd /home/phan.ngoc@sun-asterisk.com/Documents/projects/rule-clean-code/golang-config
./custom-linters/run-custom-linters.sh ./example-app
```

## Ghi chú

- Tất cả các vi phạm trong ứng dụng này là cố ý để minh họa các lỗi
- Trong một dự án thực tế, bạn nên sửa các vi phạm này theo hướng dẫn trong README.md
- Các lỗi biên dịch và cảnh báo "unused variable" có thể xuất hiện nhưng không ảnh hưởng đến mục đích minh họa
