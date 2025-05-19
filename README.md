# Clean Code Rules Repository

[![Clean Code Principles](https://img.shields.io/badge/Clean%20Code-Principles-blue)](https://github.com/ryanmcdermott/clean-code-javascript)
[![Multiple Languages](https://img.shields.io/badge/Languages-Multiple-green)](https://github.com/topics/clean-code)

Repository này lưu trữ tập hợp các quy tắc clean code và công cụ kiểm tra mã nguồn cho nhiều ngôn ngữ lập trình. Mục tiêu là cung cấp hướng dẫn và công cụ để duy trì chất lượng code, khả năng đọc hiểu và bảo trì mã nguồn trong dự án phần mềm.

## 📑 Tổng quan

Repository này cung cấp:

- **Quy tắc clean code** cho nhiều ngôn ngữ (Golang, PHP, TypeScript/JavaScript, Python, Java, Ruby)
- **Cấu hình linting** cho các IDE và công cụ phân tích mã nguồn
- **Công cụ kiểm tra tùy chỉnh** để bắt các lỗi phổ biến và đảm bảo tuân thủ quy tắc
- **Git hooks** để tự động kiểm tra code trước khi commit
- **Mẫu CI/CD** để tích hợp kiểm tra mã nguồn vào quy trình phát triển
- **Tài liệu hướng dẫn** chi tiết cho việc cài đặt và sử dụng

## 🌟 Ngôn ngữ được hỗ trợ

Repository này bao gồm quy tắc và công cụ cho các ngôn ngữ sau:

| Ngôn ngữ | Tệp quy tắc | Thư mục cấu hình |
|----------|-------------|------------------|
| Golang | [golang.md](golang.md) | [golang-config/](golang-config/) |
| PHP | [php.md](php.md) | [php-config/](php-config/) |
| TypeScript/JavaScript | [typescript.md](typescript.md) | [typescript-config/](typescript-config/) |
| Python | [python.md](python.md) | [python-config/](python-config/) |
| Java | [java.md](java.md) | - |
| Ruby | [ruby.md](ruby.md) | - |

## 🔍 Cấu trúc quy tắc

Mỗi quy tắc được định danh bằng một mã duy nhất (vd: C001, C023) và bao gồm các thông tin sau:

- **Mã quy tắc (ID)**: Định danh duy nhất
- **Tên/Mô tả**: Mô tả ngắn gọn về quy tắc
- **Nguyên tắc áp dụng**: Clean Code, Error Handling, Systems, Secure Coding, etc.
- **Công cụ kiểm tra**: Công cụ có thể sử dụng để phát hiện vi phạm
- **Mức độ quan trọng**: Đánh giá tầm quan trọng của quy tắc (xem [AI-assessment.md](AI-assessment.md))

## 🛠️ Cài đặt và sử dụng

Để sử dụng các quy tắc và công cụ trong dự án của bạn:

1. **Clone repository này**:
   ```bash
   git clone https://github.com/your-organization/rule-clean-code.git
   ```

2. **Chọn cấu hình cho ngôn ngữ tương ứng**:
   - Đối với Golang: Xem [golang-config/README.md](golang-config/README.md)
   - Đối với PHP: Xem [php-config/README.md](php-config/README.md)
   - Đối với TypeScript: Xem tài liệu trong thư mục [typescript-config/](typescript-config/)

3. **Cài đặt git hooks** (tùy chọn):
   - Mỗi ngôn ngữ có script cài đặt hook tương ứng, ví dụ:
     ```bash
     cd php-config && ./install-hooks.sh
     ```

4. **Tích hợp với CI/CD**:
   - Sử dụng mẫu CI/CD trong thư mục cấu hình tương ứng

## 🌱 Đóng góp

Chúng tôi khuyến khích đóng góp để cải thiện quy tắc và công cụ. Nếu bạn muốn đóng góp:

1. Fork repository này
2. Tạo branch mới (`git checkout -b feature/amazing-rule`)
3. Commit thay đổi của bạn (`git commit -m 'Add some amazing rule'`)
4. Push đến branch (`git push origin feature/amazing-rule`)
5. Mở Pull Request

## 📝 Giấy phép

Copyright © 2024