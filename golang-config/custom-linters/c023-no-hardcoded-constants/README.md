# No Hardcoded Constants Linter (C023)

Linter này kiểm tra quy tắc C023: "Các constant không hardcode rải rác trong logic"

## Mô tả

Linter này phân tích mã nguồn Go để tìm các string hoặc số được viết cứng (hardcoded) trong code logic, thay vì được định nghĩa như constants. Việc sử dụng constants giúp mã nguồn dễ bảo trì và thay đổi hơn.

## Ví dụ

```go
// ❌ Không hợp lệ - Hardcoded constants trong logic
func ProcessPayment(amount int) error {
    if amount > 1000000 {  // Số hardcoded
        return errors.New("Amount exceeds maximum transaction limit")  // String hardcoded
    }
    return nil
}

// ✅ Hợp lệ - Sử dụng constants
const (
    MaxTransactionLimit = 1000000
    ErrExceedsLimit    = "Amount exceeds maximum transaction limit"
)

func ProcessPayment(amount int) error {
    if amount > MaxTransactionLimit {
        return errors.New(ErrExceedsLimit)
    }
    return nil
}
```

## Cách sử dụng

```bash
go run /path/to/rule-clean-code/golang-config/custom-linters/c023-no-hardcoded-constants/main.go ./...
```

## Cài đặt

Để sử dụng linter này trong dự án của bạn:

1. Sao chép thư mục này vào dự án của bạn
2. Compile linter (tùy chọn):

```bash
cd /path/to/c023-no-hardcoded-constants
go build -o no-hardcoded-constants-linter main.go
```

3. Chạy linter:

```bash
./no-hardcoded-constants-linter ./...
```

hoặc

```bash
go run main.go ./...
```

## Cấu hình

Linter này có các cấu hình mặc định bỏ qua:
- Các string ngắn (dưới 5 ký tự)
- Các số thông dụng (0, 1, 2, 3, 4, 5, 10, 100, 1000)
- Các string đặc biệt như URL, format string, v.v.

## Tích hợp vào CI/CD

Để tích hợp vào CI/CD, bạn có thể thêm linter này vào script `run-custom-linters.sh`.
