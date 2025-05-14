
# 📘 PHP Specific Coding Rules

## Tổng Quan Rules

| Rule ID | Tên Rule | Mục Tiêu | Tools | Principles |
|---------|----------|----------|-------|------------|
| P001 | Tuân thủ PSR-1: Coding Standard cơ bản | Đảm bảo tính nhất quán và khả năng đọc của code | PHPCS, PHP_CodeSniffer | Clean Code, Standards Compliance |
| P002 | Tuân thủ PSR-2/PSR-12: Coding Style Guide | Đảm bảo style code nhất quán và khả năng đọc cao | PHP_CodeSniffer, PHP-CS-Fixer | Clean Code, Standards Compliance |
| P003 | Tuân thủ PSR-4: Autoloading Standard | Đảm bảo tính nhất quán trong việc tổ chức và load files | Composer autoload, PHP_CodeSniffer | Systems, Clean Code |
| P004 | Tránh sử dụng global variables và super globals trực tiếp | Giảm side effects và tăng tính encapsulation | Static Analyzer, PHPMD | Functions, Clean Code |
| P005 | Không sử dụng PHP short tags | Tăng tính portable và tương thích | PHP_CodeSniffer | Standards Compliance |
| P006 | Tất cả các function phải có PHPDoc | Tăng khả năng đọc và hiểu code | PHP_CodeSniffer, PHPStan | Documentation, Clean Code |
| P007 | Không sử dụng PHP deprecated functions | Đảm bảo code chạy tốt và an toàn với các phiên bản PHP mới | PHPStan, PHP_CodeSniffer | Systems, Error Handling |
| P008 | Sử dụng Dependency Injection thay vì khởi tạo trực tiếp | Giảm coupling, tăng khả năng test và mở rộng | Code review, Static analyzer | Objects and Data Structures, Systems |
| P009 | Xử lý lỗi đúng cách với Exception | Đảm bảo lỗi được xử lý một cách minh bạch và nhất quán | Static analyzer, PHPMD | Error Handling |
| P010 | Strict types khi có thể | Giảm lỗi runtime và tăng tính rõ ràng | PHPStan, Psalm | Clean Code, Error Handling |
| P011 | Tránh sử dụng magic methods khi không cần thiết | Tăng tính rõ ràng và dễ đọc của code | Code review, Static analyzer | Clean Code, Objects and Data Structures |
| P012 | Không lạm dụng traits | Tránh tạo ra "God classes" và khó hiểu composition | Manual review, Static analyzer | Objects and Data Structures, Clean Code |
| P013 | Validate input data trước khi xử lý | Đảm bảo an toàn và ngăn chặn lỗi do dữ liệu không hợp lệ | Input validation libs, Code review | Error Handling, Security |
| P014 | Không kết nối database trực tiếp trong controllers/views | Tách biệt logic và tăng khả năng tái sử dụng | Code review, Architectural review | Systems, Clean Code |
| P015 | Không hardcode đường dẫn hoặc URL | Tăng tính portable và đảm bảo code hoạt động ở môi trường khác nhau | Static analysis, Code review | Systems |
| P016 | Sử dụng prepared statements cho truy vấn SQL | Ngăn chặn SQL injection và tăng hiệu suất | PHPMD, Security scanner | Security, Error Handling |
| P017 | Sanitize output trước khi render | Ngăn chặn XSS và các lỗ hổng hiển thị khác | Security scanner, Static analysis | Security, Error Handling |
| P018 | Không để logic trong constructor quá phức tạp | Đảm bảo object initialization đơn giản và dễ test | PHPMD, Code review | Objects and Data Structures, Clean Code |
| P019 | Tránh sử dụng die() hoặc exit() | Đảm bảo flow control được xử lý đúng cách | PHPMD, PHP_CodeSniffer | Error Handling, Clean Code |
| P020 | Sử dụng interfaces cho các service/repository | Tăng tính mở rộng và dễ test | Architecture review | Objects and Data Structures, Systems |