# Dưới đây là bảng đánh giá **mức độ quan trọng** và **sự cần thiết đối** cho từng rule trong phần.

## Mức độ đánh giá theo thang:

Mức Độ Quan Trọng

* 📌 **Rất Quan Trọng**
* ⚠️ **Quan Trọng**
* 🟡 **Trung Bình**
* ⚪ **Thấp**

Sự Cần Thiết:
* 📌 **Rất cần**
* ⚠️ **Cần**
* 🟡 **Có ích**
* ⚪ **Không cần thiết**


| Rule ID | Rule Title                                              | Mức Độ Quan Trọng | Sự Cần Thiết | Ghi chú                                              |
| ------- | ------------------------------------------------------- | ----------------- | ------------------------------------ | ---------------------------------------------------- |
| C003    | Tên biến rõ ràng, không viết tắt tùy tiện               | 📌 Rất Quan Trọng | 📌 Rất cần                           | Giao tiếp giữa team dev & khách hàng.                |
| C006    | Tên hàm phải là động từ/verb-noun                       | ⚠️ Quan Trọng     | ⚠️ Cần                               | Giúp đọc hiểu nhanh, dễ maintain.                    |
| C007    | Không sử dụng comment mô tả "code làm gì"               | ⚠️ Quan Trọng     | ⚠️ Cần                               | Tránh comment thừa, encourage self-documenting code. |
| C013    | Không comment code chết (dead code)                     | 📌 Rất Quan Trọng | 📌 Rất cần                           | Gây nhiễu khi review, dễ lỗi.                        |
| C014    | Dùng Dependency Injection thay vì `new` trực tiếp       | 📌 Rất Quan Trọng | 📌 Rất cần                           | Tăng testability và maintainability.                 |
| C017    | Không gán logic xử lý vào constructor                   | 📌 Rất Quan Trọng | 📌 Rất cần                           | Gây khó test, sai nguyên lý OOP.                     |
| C018    | Không throw generic error, dùng message cụ thể          | 📌 Rất Quan Trọng | 📌 Rất cần                           | Dễ debug, hỗ trợ khách hàng tốt hơn.                 |
| C019    | Không dùng log mức error cho lỗi nhẹ                    | ⚠️ Quan Trọng     | ⚠️ Cần                               | Giảm nhiễu log, dễ giám sát prod.                    |
| C022    | Không duplicate tên biến trong cùng scope               | ⚠️ Quan Trọng     | ⚠️ Cần                               | Tránh nhầm lẫn trong xử lý bug.                      |
| C023    | Các constant không hardcode trong logic                 | 📌 Rất Quan Trọng | 📌 Rất cần                           | Dễ chỉnh sửa, hỗ trợ config động.                    |
| C027    | Dùng guard clause thay vì nested if                     | ⚠️ Quan Trọng     | ⚠️ Cần                               | Code dễ đọc, ít bug.                                 |
| C028    | Mọi catch block phải log nguyên nhân lỗi                | 📌 Rất Quan Trọng | 📌 Rất cần                           | Dễ điều tra lỗi trong production.                    |
| C029    | Dùng custom error class thay lỗi hệ thống trực tiếp     | ⚠️ Quan Trọng     | ⚠️ Cần                               | Phân loại lỗi rõ ràng, dễ handle.                    |
| C030    | Logic validate phải nằm riêng                           | 📌 Rất Quan Trọng | 📌 Rất cần                           | Dễ mở rộng, kiểm thử đơn giản hơn.                   |
| C032    | Mọi log nên có context env (dev/stag/prod)              | ⚠️ Quan Trọng     | ⚠️ Cần                               | Giúp chẩn đoán log chính xác hơn.                    |
| C033    | Không push secret/token lên repo                        | 📌 Rất Quan Trọng | 📌 Bắt buộc                          | Gắn liền với bảo mật, phải có CI/CD kiểm tra.        |
| C034    | Tách logic xử lý và truy vấn trong service layer        | 📌 Rất Quan Trọng | 📌 Rất cần                           | Tuân thủ clean architecture.                         |
| C035    | Hạn chế truy cập trực tiếp global state                 | ⚠️ Quan Trọng     | ⚠️ Cần                               | Code dễ test, tránh side-effect.                     |
| C037    | Hàm xử lý lỗi phải log đủ input liên quan               | ⚠️ Quan Trọng     | 📌 Rất cần                           | Dễ tracking root cause.                              |
| C040    | Tránh phụ thuộc vào thứ tự gọi file/module              | ⚠️ Quan Trọng     | ⚠️ Cần                               | Tránh bug tiềm ẩn khi deploy hoặc refactor.          |
| C042    | Không để logic validation nằm rải rác                   | 📌 Rất Quan Trọng | 📌 Rất cần                           | Tránh lặp lại và khó bảo trì.                        |
| C043    | Không hardcode URL, API key trong mã                    | 📌 Rất Quan Trọng | 📌 Bắt buộc                          | Vấn đề bảo mật & môi trường.                         |
| C044    | Tên biến boolean bắt đầu bằng is, has...                | 🟡 Trung Bình     | 🟡 Có ích                            | Cải thiện readability.                               |
| C045    | Không gọi print/console.log trong production            | 📌 Rất Quan Trọng | 📌 Rất cần                           | Gây rò rỉ thông tin nếu để quên.                     |
| C048    | Không dùng regex dài phức tạp trong logic chính         | ⚠️ Quan Trọng     | ⚠️ Cần                               | Dễ bug, khó maintain.                                |
| C049    | Logic retry không lặp lại ở nhiều nơi                   | ⚠️ Quan Trọng     | ⚠️ Cần                               | Đảm bảo consistency & retry strategy.                |
| C055    | Tách logic parse/transform khỏi controller              | 📌 Rất Quan Trọng | 📌 Rất cần                           | Tăng tính module hóa, dễ test.                       |
| C059    | Không xử lý dataset lớn mà không log/kiểm soát resource | 📌 Rất Quan Trọng | 📌 Rất cần                           | Tránh crash, OOM trong prod.                         |
| C063    | Không ghi đè mà bỏ logic superclass                     | ⚠️ Quan Trọng     | ⚠️ Cần                               | Tránh bug không ngờ tới.                             |
| C064    | Viết unit test cho logic nghiệp vụ                      | 📌 Rất Quan Trọng | 📌 Bắt buộc                          | Đảm bảo chất lượng sản phẩm outsource.               |
| C066    | Không lặp lại logic test giống nhau                     | ⚠️ Quan Trọng     | ⚠️ Cần                               | Test dễ maintain.                                    |
| C068    | Mỗi test chỉ kiểm tra một logic                         | ⚠️ Quan Trọng     | ⚠️ Cần                               | Dễ trace lỗi khi test fail.                          |
| C069    | Tên test phản ánh điều kiện kiểm tra                    | 🟡 Trung Bình     | 🟡 Có ích                            | Cải thiện readability.                               |
| C070    | Tránh hardcode dữ liệu giống nhau trong test            | ⚠️ Quan Trọng     | ⚠️ Cần                               | Tăng maintainability.                                |
| C071    | Cấu hình không viết cứng trong code                     | 📌 Rất Quan Trọng | 📌 Rất cần                           | Đáp ứng môi trường dev/stag/prod.                    |
| C074    | Test không phụ thuộc thời gian thực                     | ⚠️ Quan Trọng     | ⚠️ Cần                               | Test nhanh & đáng tin cậy.                           |
| C075    | Tên test class phản ánh module                          | 🟡 Trung Bình     | 🟡 Có ích                            | Tăng organization khi quy mô lớn.                    |
| C076    | Mỗi test chỉ assert một hành vi duy nhất                | ⚠️ Quan Trọng     | ⚠️ Cần                               | Test chính xác hơn.                                  |
| C077    | Cấu hình phải kiểm tra hợp lệ khi khởi động             | 📌 Rất Quan Trọng | 📌 Rất cần                           | Tránh crash sau deploy.                              |

---

### 🧠 Tổng kết đề xuất cho công ty outsource:

* Ưu tiên kiểm tra nghiêm ngặt các rule 📌 khi **review code**, **đào tạo dev**, và **CI/CD linting**.
* Rule ⚠️ nên được áp dụng có hệ thống, nhưng có thể linh hoạt trong project nhỏ hoặc thử nghiệm.
* Rule 🟡 nên áp dụng theo phong cách coding của team, không bắt buộc nhưng khuyến khích.
* Rule ⚪ (nếu có) có thể chỉ mang tính cosmetic, không ảnh hưởng lớn đến maintainability.

