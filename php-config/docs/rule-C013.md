# Rule C013: Không comment code chết (dead code)

## Mô tả
Rule này yêu cầu không để lại code đã bị loại bỏ dưới dạng comment trong mã nguồn. Thay vì giữ lại code cũ dưới dạng comment, nên xóa hẳn và sử dụng hệ thống quản lý phiên bản (như Git) để theo dõi lịch sử thay đổi.

## Mức ưu tiên 
**High**

## Lý do
Code dưới dạng comment (hay "dead code"):
1. Làm rối mã nguồn, khiến code khó đọc, khó bảo trì
2. Tạo nhầm lẫn về code nào đang thực sự được sử dụng
3. Tăng khối lượng code mà không mang lại giá trị
4. Có thể dẫn đến lỗi nếu vô tình uncomment lại code cũ
5. Cho thấy sự thiếu quyết đoán trong quá trình phát triển

## Cách kiểm tra
Sử dụng custom sniff `MyStandard.DeadCode.CommentedCode` để phát hiện code bị comment trong mã nguồn PHP.

Sniff này tìm kiếm các dấu hiệu của code PHP trong các comment như:
- Tên biến (`$variable`)
- Gọi hàm (`function()`)
- Cấu trúc điều khiển (`if`, `for`, `foreach`, `while`, etc.)
- PHP tags (`<?php`, `?>`)
- Định nghĩa class và function
- Các câu lệnh PHP (`echo`, `print`, `return`, etc.)

## Ví dụ

### Không đúng

```php
// $oldValue = getValue();
// if ($oldValue > 50) {
//     doSomething($oldValue);
// }

/* 
function oldImplementation($param) {
    // Logic here
    return $result;
}
*/
```

### Đúng

```php
// Đây là comment mô tả, không phải code
// TODO: Triển khai tính năng X
// NOTE: Cẩn thận với logic này

/**
 * @param int $param Mô tả tham số
 * @return int Mô tả kết quả trả về
 */
```

## Cách khắc phục
- Xóa bỏ hoàn toàn code không còn sử dụng thay vì comment lại
- Sử dụng hệ thống quản lý phiên bản (Git) để theo dõi lịch sử thay đổi
- Sử dụng comment mô tả (không phải comment code) để giải thích logic phức tạp
