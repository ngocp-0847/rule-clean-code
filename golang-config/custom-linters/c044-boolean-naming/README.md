# Boolean Naming Linter (C044)

Linter này kiểm tra quy tắc C044: "Tên biến boolean nên bắt đầu bằng is, has, should".

## Mô tả

Linter này phân tích mã nguồn Go để đảm bảo rằng tất cả các biến kiểu boolean đều có tiền tố hợp lệ như `is`, `has`, `should`, `can`, `will`, v.v. Quy tắc này giúp làm cho mã nguồn dễ đọc hơn và tự tài liệu hơn.

## Ví dụ

```go
// ✅ Hợp lệ
var isValid bool
var hasPermission bool
var shouldContinue bool

// ❌ Không hợp lệ
var valid bool        // Nên đổi thành isValid
var permission bool   // Nên đổi thành hasPermission
var continue bool     // Nên đổi thành shouldContinue
```

## Cách sử dụng

```bash
go run /path/to/rule-clean-code/golang-config/custom-linters/c044-boolean-naming/main.go ./...
```

## Cài đặt

Để sử dụng linter này trong dự án của bạn:

1. Sao chép thư mục này vào dự án của bạn
2. Compile linter (tùy chọn):

```bash
cd /path/to/c044-boolean-naming
go build -o boolean-naming-linter main.go
```

3. Chạy linter:

```bash
./boolean-naming-linter ./...
```

hoặc

```bash
go run main.go ./...
```

## Tích hợp với IDE

### VS Code

Thêm cấu hình sau vào `settings.json`:

```json
{
  "go.lintOnSave": "package",
  "go.lintTool": "golangci-lint",
  "go.lintFlags": [
    "--config=.golangci.yml"
  ]
}
```

Và chạy custom linter như một task độc lập.
