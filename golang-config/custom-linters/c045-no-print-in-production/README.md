# No Print in Production Linter (C045)

Linter này kiểm tra quy tắc C045: "Không gọi print hoặc console.log trong production code"

## Mô tả

Linter này phân tích mã nguồn Go để phát hiện các lời gọi hàm in ra màn hình như `print`, `println`, `fmt.Print*`, và các hàm trong package `log`. Việc sử dụng các hàm này trong mã production có thể gây rò rỉ thông tin nhạy cảm và làm giảm hiệu suất.

## Ví dụ

```go
// ❌ Không hợp lệ - Sử dụng print trong production code
func ProcessPayment(amount int) error {
    fmt.Println("Processing payment:", amount)  // Vi phạm quy tắc
    print("Transaction ID:", generateID())      // Vi phạm quy tắc
    log.Printf("Payment completed: %d", amount) // Vi phạm quy tắc
    return nil
}

// ✅ Hợp lệ - Sử dụng logger có cấu hình đúng
func ProcessPayment(amount int) error {
    logger.Debug("Processing payment", log.Fields{"amount": amount})
    // Xử lý thanh toán...
    logger.Info("Payment completed", log.Fields{"amount": amount, "id": id})
    return nil
}
```

## Cách sử dụng

```bash
go run /path/to/rule-clean-code/golang-config/custom-linters/c045-no-print-in-production/main.go ./...
```

## Cài đặt

Để sử dụng linter này trong dự án của bạn:

1. Sao chép thư mục này vào dự án của bạn
2. Compile linter (tùy chọn):

```bash
cd /path/to/c045-no-print-in-production
go build -o no-print-linter main.go
```

3. Chạy linter:

```bash
./no-print-linter ./...
```

hoặc

```bash
go run main.go ./...
```

## Cấu hình

Linter này mặc định sẽ kiểm tra:
- Các hàm `print`, `println`
- Các hàm trong package `fmt`: `Print`, `Printf`, `Println`, v.v.
- Các hàm trong package `log`: `Log`, `Logf`, `Logln`, v.v.

Linter sẽ bỏ qua:
- Các file test (`*_test.go`)
- Các file được tạo tự động (chứa "generated" trong tên)
- Các file trong thư mục vendor
