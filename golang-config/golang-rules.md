# Golang Clean Code Rules

## Công cụ kiểm tra code Golang

Để kiểm tra và đảm bảo mã nguồn Golang tuân thủ các quy tắc clean code, chúng ta sử dụng các công cụ sau:

### 1. golangci-lint

[golangci-lint](https://golangci-lint.run/) là một công cụ linting tổng hợp cho Golang, tích hợp nhiều linters khác nhau để phân tích code tĩnh.

#### Cài đặt:

```bash
# Binary Installation (Linux)
curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s -- -b $(go env GOPATH)/bin v1.55.0

# Hoặc sử dụng Homebrew (macOS)
brew install golangci-lint
```

#### Sử dụng:

```bash
# Chạy với cấu hình mặc định
golangci-lint run

# Chạy với cấu hình tùy chỉnh
golangci-lint run --config=.golangci.yml
```

### 2. Staticcheck

[Staticcheck](https://staticcheck.dev/) là một bộ phân tích mã nguồn Go nâng cao, phát hiện các lỗi code, hiệu suất và tiềm ẩn.

#### Cài đặt:

```bash
go install honnef.co/go/tools/cmd/staticcheck@latest
```

#### Sử dụng:

```bash
staticcheck ./...
```

### 3. go vet

`go vet` là công cụ mặc định của Go để kiểm tra code tĩnh, giúp phát hiện các lỗi tiềm ẩn.

#### Sử dụng:

```bash
go vet ./...
```

### 4. Custom Linters

Ngoài các công cụ có sẵn, chúng tôi đã phát triển các linters tùy chỉnh để kiểm tra các quy tắc đặc biệt:

- **c023-no-hardcoded-constants**: Kiểm tra các constant được hardcode trong code
- **c044-boolean-naming**: Kiểm tra tên biến boolean có bắt đầu bằng is, has, should
- **c045-no-print-in-production**: Kiểm tra các lệnh print trong code production

#### Sử dụng:

```bash
# Chạy tất cả custom linters
bash /path/to/rule-clean-code/golang-config/custom-linters/run-custom-linters.sh /path/to/go-project

# Hoặc chạy từng linter riêng biệt
go run /path/to/rule-clean-code/golang-config/custom-linters/c044-boolean-naming/main.go ./...
```

## Hướng dẫn thiết lập

Chi tiết về cách thiết lập và sử dụng các công cụ này có thể tìm thấy trong các tài liệu:

- [README.md](./README.md): Hướng dẫn cài đặt và sử dụng cơ bản
- [CUSTOM-LINTERS.md](./CUSTOM-LINTERS.md): Hướng dẫn viết custom linters
- [CI-CD-INTEGRATION.md](./CI-CD-INTEGRATION.md): Hướng dẫn tích hợp vào CI/CD

## Các quy tắc được kiểm tra tự động

| Rule ID | Title                                                                | Tools                                |
| ------- | -------------------------------------------------------------------- | ------------------------------------ |
| C003    | Tên biến rõ ràng, không viết tắt tùy tiện                            | `golangci-lint`, `stylecheck`        |
| C006    | Tên hàm phải là động từ/verb-noun                                    | `golangci-lint`, `stylecheck`        |
| C013    | Không comment code chết (dead code)                                  | `golangci-lint`, `unused`            |
| C018    | Không throw generic error, luôn dùng message cụ thể                  | `golangci-lint`, `errorlint`         |
| C022    | Không duplicate tên biến trong cùng một scope                        | `golangci-lint`, `govet`             |
| C023    | Các constant không hardcode rải rác trong logic                      | `custom-linter: c023-no-hardcoded-constants` |
| C044    | Tên biến boolean nên bắt đầu bằng is, has, should                    | `custom-linter: c044-boolean-naming` |
| C045    | Không gọi print hoặc console.log trong production code               | `custom-linter: c045-no-print-in-production` |

## Kiểm tra Rules cho Testing

| Rule ID | Title                                                                | Tools                                |
| ------- | -------------------------------------------------------------------- | ------------------------------------ |
| C064    | Viết unit test cho logic nghiệp vụ                                   | `tarp`, `gocheckit`, `go test`       |
| C066    | Không lặp lại logic test giống nhau                                  | `tarp`, `gocheckit`                  |
| C068    | Mỗi test case chỉ nên kiểm tra một logic                             | `tarp`, `gocheckit`                  |
| C069    | Tên test phải phản ánh điều kiện kiểm tra                            | `tarp`, `gocheckit`                  |
| C070    | Tránh hardcode dữ liệu giống nhau trong nhiều test                   | `tarp`, `gocheckit`                  |
| C074    | Test không nên phụ thuộc vào thời gian thực                          | `tarp`, `gocheckit`                  |
| C075    | Tên test class nên phản ánh module tương ứng                         | `tarp`, `gocheckit`                  |
| C076    | Mỗi test chỉ nên assert một hành vi duy nhất                         | `tarp`, `gocheckit`                  |

## Bảng Quy tắc Đầy đủ

| Rule ID | Title                                                                | Principles                       | Tools                                           |                                                          |
| ------- | -------------------------------------------------------------------- | -------------------------------- | ----------------------------------------------- | -------------------------------------------------------- |
| C003    | Tên biến rõ ràng, không viết tắt tùy tiện                            | Clean Code                       | `golangci-lint`, `Staticcheck`, `go vet`        |                                                          |
| C006    | Tên hàm phải là động từ/verb-noun                                    | Clean Code                       | `golangci-lint`, `Staticcheck`, `go vet`        |                                                          |
| C007    | Không sử dụng comment mô tả "code làm gì"                            | Clean Code                       | Không có quy tắc cụ thể, cần đánh giá thủ công  |                                                          |
| C013    | Không comment code chết (dead code)                                  | Clean Code                       | `golangci-lint`, `Staticcheck`, `go vet`        |                                                          |
| C014    | Dùng Dependency Injection thay vì new trực tiếp trong logic          | Systems                          | Không có quy tắc cụ thể, cần đánh giá kiến trúc |                                                          |
| C017    | Không gán logic xử lý vào constructor                                | Clean Code, Systems              | Không có quy tắc cụ thể, cần đánh giá thủ công  |                                                          |
| C018    | Không throw generic error, luôn dùng message cụ thể                  | Error Handling                   | `golangci-lint`, `Staticcheck`, `go vet`        |                                                          |
| C019    | Không sử dụng log mức error cho lỗi không nghiêm trọng               | Error Handling                   | Không có quy tắc cụ thể, cần đánh giá thủ công  |                                                          |
| C022    | Không duplicate tên biến trong cùng một scope                        | Clean Code                       | `golangci-lint`, `Staticcheck`, `go vet`        |                                                          |
| C023    | Các constant không hardcode rải rác trong logic                      | Clean Code, Systems              | `custom-linter: c023-no-hardcoded-constants`    |                                                          |
| C027    | Dùng guard clause thay vì nested if                                  | Clean Code                       | Không có quy tắc cụ thể, cần đánh giá thủ công  |                                                          |
| C028    | Mọi catch block phải log nguyên nhân lỗi                             | Error Handling                   | Không có quy tắc cụ thể, cần đánh giá thủ công  |                                                          |
| C029    | Dùng custom error class thay vì dùng lỗi hệ thống trực tiếp          | Error Handling                   | Không có quy tắc cụ thể, cần đánh giá thủ công  |                                                          |
| C030    | Logic kiểm tra dữ liệu (validate) phải nằm riêng biệt                | Clean Code, Systems              | Không có quy tắc cụ thể, cần đánh giá kiến trúc |                                                          |
| C032    | Mọi log nên kèm context về environment (dev/stag/prod)               | Emergence, Error Handling        | Không có quy tắc cụ thể, cần đánh giá thủ công  |                                                          |
| C033    | Không push secret/hardcoded token lên repo                           | Secure Coding                    | `detect-secrets`, `secretlint`                  |                                                          |
| C034    | Tách logic xử lý và truy vấn dữ liệu trong service layer             | Systems, Clean Code              | Không có quy tắc cụ thể, cần đánh giá kiến trúc |                                                          |
| C035    | Hạn chế truy cập trực tiếp global state trong logic domain           | Systems                          | Không có quy tắc cụ thể, cần đánh giá kiến trúc |                                                          |
| C037    | Hàm xử lý lỗi phải log đầy đủ thông tin đầu vào liên quan            | Error Handling                   | Không có quy tắc cụ thể, cần đánh giá thủ công  |                                                          |
| C040    | Tránh logic phụ thuộc thứ tự file/module được gọi                    | Systems                          | Không có quy tắc cụ thể, cần đánh giá kiến trúc |                                                          |
| C042    | Không để logic validation nằm rải rác trong nhiều class              | Clean Code                       | Không có quy tắc cụ thể, cần đánh giá kiến trúc |                                                          |
| C043    | Không hardcode URL, API key hoặc secret trong mã nguồn               | Secure Coding, Clean Code        | `detect-secrets`, `secretlint`                  |                                                          |
| C044    | Tên biến boolean nên bắt đầu bằng is, has, should                    | Clean Code                       | `custom-linter: c044-boolean-naming`            |                                                          |
| C045    | Không gọi print hoặc console.log trong production code               | Clean Code                       | `custom-linter: c045-no-print-in-production`    |                                                          |
| C048    | Không sử dụng regex dài và phức tạp trong logic xử lý chính          | Clean Code                       | Không có quy tắc cụ thể, cần đánh giá thủ công  |                                                          |
| C049    | Logic retry không được viết lặp lại nhiều nơi                        | Systems, Emergence               | Không có quy tắc cụ thể, cần đánh giá kiến trúc |                                                          |
| C055    | Nếu có logic parse hoặc transform data, phải tách ra khỏi controller | Clean Code                       | Không có quy tắc cụ thể, cần đánh giá kiến trúc |                                                          |
| C059    | Không xử lý dataset lớn mà không log hoặc kiểm soát tài nguyên       | Performance                      | Không có quy tắc cụ thể, cần đánh giá thủ công  |                                                          |
| C063    | Không ghi đè hành vi mà bỏ qua logic quan trọng ở superclass         | Robustness, Consistency          | Không có quy tắc cụ thể, cần đánh giá thủ công  |                                                          |
| C064    | Viết unit test cho logic nghiệp vụ                                   | Testability, Reliability         | `tarp`, `gocheckit`, `golinters`                |                                                          |
| C066    | Không lặp lại logic test giống nhau                                  | DRY, Maintainability             | `tarp`, `gocheckit`, `golinters`                |                                                          |
| C068    | Mỗi test case chỉ nên kiểm tra một logic                             | Readability, Testability         | `tarp`, `gocheckit`, `golinters`                |                                                          |
| C069    | Tên test phải phản ánh điều kiện kiểm tra                            | Readability, Self-documentation  | `tarp`, `gocheckit`, `golinters`                |                                                          |
| C070    | Tránh hardcode dữ liệu giống nhau trong nhiều test                   | DRY, Maintainability             | `tarp`, `gocheckit`, `golinters`                |                                                          |
| C071    | Cấu hình không nên được viết cứng trong code                         | Configurability, Maintainability | Không có quy tắc cụ thể, cần đánh giá thủ công  |                                                          |
| C074    | Test không nên phụ thuộc vào thời gian thực                          | Determinism, Fast Feedback       | `tarp`, `gocheckit`, `golinters`                |                                                          |
| C075    | Tên test class nên phản ánh module tương ứng                         | Readability, Organization        | `tarp`, `gocheckit`, `golinters`                |                                                          |
| C076    | Mỗi test chỉ nên assert một hành vi duy nhất                         | Clarity, Isolation               | `tarp`, `gocheckit`, `golinters`                |                                                          |
| C077    | Cấu hình bắt buộc phải được kiểm tra hợp lệ khi khởi động            | Fail Fast, Stability             | Không có quy tắc cụ thể, cần đánh giá thủ công  | ([Staticcheck][1], [Megalinter][2], [awesome-go.com][3]) |

[1]: https://staticcheck.dev/?utm_source=chatgpt.com "Staticcheck"
[2]: https://megalinter.io/latest/supported-linters/?utm_source=chatgpt.com "List of the 100+ supported linters embedded in MegaLinter"
[3]: https://awesome-go.com/code-analysis?utm_source=chatgpt.com "Code Analysis - Awesome Go / Golang"
