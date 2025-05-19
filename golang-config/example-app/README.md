# Ứng dụng Golang Ví dụ với Các Vi Phạm Quy Tắc Clean Code

Ứng dụng này được tạo ra để biểu diễn cách các linters phát hiện các vi phạm quy tắc clean code trong mã nguồn Golang.

## Các vi phạm quy tắc trong ứng dụng

Ứng dụng này cố ý vi phạm ba quy tắc clean code chính:

### 1. C023: Các constant không hardcode rải rác trong logic

Linter: `c023-no-hardcoded-constants`

Ví dụ vi phạm:
```go
// Vi phạm: Hardcoded string constant
configPath := "/etc/app/config.json"

// Vi phạm: Hardcoded numeric constant
if user.ID > 1000 {
    sendAlert(user.ID)
}

// Vi phạm: Hardcoded connection string
connStr := "postgresql://postgres:password@localhost:5432/testdb?sslmode=disable"
```

### 2. C044: Tên biến boolean nên bắt đầu bằng is, has, should

Linter: `c044-boolean-naming`

Ví dụ vi phạm:
```go
// Vi phạm: Tên biến boolean không bắt đầu bằng is/has/should
loggedIn = false

// Vi phạm: Tên biến boolean không đúng quy ước
connected := true

// Vi phạm: Field boolean trong struct không đúng quy ước
active bool
```

### 3. C045: Không gọi print hoặc console.log trong production code

Linter: `c045-no-print-in-production`

Ví dụ vi phạm:
```go
// Vi phạm: Sử dụng print trong code
fmt.Println("Starting application...")

// Vi phạm: Sử dụng print/log trực tiếp
log.Println("Running in production mode")

// Vi phạm: Sử dụng print trực tiếp
print("Fetching user with id:", id)
```

## Cách chạy linters để phát hiện vi phạm

### Chạy golangci-lint

```bash
cd /home/phan.ngoc@sun-asterisk.com/Documents/projects/rule-clean-code/golang-config/example-app
golangci-lint run --config ../.golangci.yml
```

### Chạy custom linters

```bash
# Chạy tất cả custom linters
cd /home/phan.ngoc@sun-asterisk.com/Documents/projects/rule-clean-code/golang-config
./custom-linters/run-custom-linters.sh ./example-app

# Hoặc chạy từng linter riêng biệt
go run ./custom-linters/c044-boolean-naming/main.go ./example-app/...
go run ./custom-linters/c023-no-hardcoded-constants/main.go ./example-app/...
go run ./custom-linters/c045-no-print-in-production/main.go ./example-app/...
```

### Sử dụng pre-commit hook

```bash
# Cài đặt git hooks
cd /home/phan.ngoc@sun-asterisk.com/Documents/projects/rule-clean-code/golang-config
./install-hooks.sh ./example-app

# Commit thay đổi để kích hoạt pre-commit hook
cd ./example-app
git add .
git commit -m "Test commit"
```

## Cách sửa các vi phạm

### 1. Sửa vi phạm C023 (hardcoded constants)

```go
// Định nghĩa constants thay vì hardcoded strings
const (
    ConfigPath      = "/etc/app/config.json"
    HighUserIDLimit = 1000
    ConnectionString = "postgresql://postgres:password@localhost:5432/testdb?sslmode=disable"
)

// Sử dụng constants
configPath := ConfigPath
if user.ID > HighUserIDLimit {
    sendAlert(user.ID)
}
connStr := ConnectionString
```

### 2. Sửa vi phạm C044 (tên biến boolean)

```go
// Sửa tên biến boolean
var (
    isLoggedIn = false
)

// Sửa tên biến boolean trong hàm
isConnected := true

// Sửa tên field boolean trong struct
type User struct {
    ID       int
    Username string
    Email    string
    isActive bool
}
```

### 3. Sửa vi phạm C045 (print trong production code)

```go
// Sử dụng logger thay vì print trực tiếp
import (
    "github.com/sirupsen/logrus"
)

var logger = logrus.New()

func init() {
    // Cấu hình logger
    logger.SetLevel(logrus.InfoLevel)
}

// Sử dụng logger
logger.Info("Starting application...")
logger.Infof("Loading config from %s", configPath)
logger.Debugf("Fetching user with id: %d", id)
```
