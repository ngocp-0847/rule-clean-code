package main

import (
	"fmt"
	"log"
	"os"
	"time"
)

// Các biến toàn cục
var (
	// C044: vi phạm quy tắc tên biến boolean
	loggedIn = false
	// OK: biến boolean với tên phù hợp
	isEnabled = true
)

// C023: vi phạm quy tắc hardcoded constants
const (
	PORT = 8080 // OK: constants được định nghĩa đúng cách
)

// Struct User để lưu thông tin người dùng
type User struct {
	ID       int
	Username string
	Email    string
	// C044: vi phạm quy tắc tên biến boolean
	active bool
}

// Hàm chính của ứng dụng
func main() {
	// C045: vi phạm quy tắc không dùng print
	fmt.Println("Starting application...")

	// C044: vi phạm quy tắc tên biến boolean
	connected := true
	if connected {
		// C045: vi phạm quy tắc không dùng print
		fmt.Println("Connected to service")
	}

	// C023: vi phạm quy tắc hardcoded constants
	if os.Getenv("ENV") == "production" {
		// C045: vi phạm quy tắc không dùng print
		log.Println("Running in production mode")
	}

	// Khởi tạo ứng dụng
	initApp()

	// C023: vi phạm quy tắc hardcoded constants (numeric)
	timeout := 30
	fmt.Printf("Application timeout set to %d seconds\n", timeout)

	// Xử lý dữ liệu mẫu
	user := getUser(1)
	processUserData(user)

	// Kiểm tra kết nối database
	checkDBConnection()
}

// Khởi tạo ứng dụng
func initApp() {
	// C023: vi phạm quy tắc hardcoded constants
	fmt.Println("Initializing app version 1.0.3")

	// C044: vi phạm quy tắc tên biến boolean
	setup := setupConfig()
	if !setup {
		// C045: vi phạm quy tắc không dùng print
		fmt.Println("Failed to setup config")
		os.Exit(1)
	}
}

// Thiết lập cấu hình
func setupConfig() bool {
	// C023: vi phạm quy tắc hardcoded constants
	configPath := "/etc/app/config.json"

	// C045: vi phạm quy tắc không dùng print
	fmt.Printf("Loading config from %s\n", configPath)

	// Mô phỏng đọc config
	time.Sleep(100 * time.Millisecond)

	return true
}

// Lấy thông tin người dùng theo ID
func getUser(id int) User {
	// C045: vi phạm quy tắc không dùng print
	print("Fetching user with id:", id)

	// C023: vi phạm quy tắc hardcoded constants
	// C044: vi phạm quy tắc tên biến boolean
	valid := id > 0
	if !valid {
		// C045: vi phạm quy tắc không dùng print
		fmt.Println("Invalid user ID")
		return User{}
	}

	// Mô phỏng lấy dữ liệu từ DB
	return User{
		ID:       id,
		Username: "johndoe",
		Email:    "john@example.com",
		active:   true,
	}
}

// Xử lý dữ liệu người dùng
func processUserData(user User) {
	// C044: vi phạm quy tắc tên biến boolean
	processed := false

	// C023: vi phạm quy tắc hardcoded constants
	if user.Email == "admin@example.com" {
		// C045: vi phạm quy tắc không dùng print
		fmt.Println("Processing admin user")
		// Xử lý đặc biệt cho admin
	} else {
		// C045: vi phạm quy tắc không dùng print
		fmt.Println("Processing regular user:", user.Username)
	}

	// C023: vi phạm quy tắc hardcoded constants (numeric)
	if user.ID > 1000 {
		sendAlert(user.ID)
	}

	processed = true

	if processed {
		// C045: vi phạm quy tắc không dùng print
		fmt.Println("User data processed successfully")
	}
}

// Gửi cảnh báo
func sendAlert(userID int) {
	// C023: vi phạm quy tắc hardcoded constants
	alertMsg := "High user ID detected: " + fmt.Sprintf("%d", userID)

	// C045: vi phạm quy tắc không dùng print
	log.Println(alertMsg)
}

// Kiểm tra kết nối đến database
func checkDBConnection() {
	// C023: vi phạm quy tắc hardcoded constants
	connStr := "postgresql://postgres:password@localhost:5432/testdb?sslmode=disable"

	// C045: vi phạm quy tắc không dùng print
	fmt.Println("Simulating database connection with:", connStr)

	// Mô phỏng kết nối database
	time.Sleep(100 * time.Millisecond)

	// C044: vi phạm quy tắc tên biến boolean
	dbOk := true

	if dbOk {
		// C045: vi phạm quy tắc không dùng print
		fmt.Println("Successfully connected to database")
	}
}
