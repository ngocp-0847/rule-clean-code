# Hướng dẫn tạo Custom Linters cho Golang

Tài liệu này cung cấp hướng dẫn chi tiết về cách tạo và tích hợp các custom linter cho Golang để kiểm tra các quy tắc clean code không được hỗ trợ bởi các công cụ linting có sẵn.

## Cách tiếp cận

Có hai cách chính để tạo custom linter cho Golang:

1. **Sử dụng Go Analysis Package**: Cách phổ biến nhất, sử dụng gói `golang.org/x/tools/go/analysis` để phân tích AST.
2. **Tích hợp với golangci-lint**: Tạo plugin cho golangci-lint, yêu cầu nhiều công việc hơn nhưng tích hợp tốt hơn.

## Cách 1: Tạo linter với Go Analysis Package

### Cài đặt Dependencies

```bash
go get golang.org/x/tools/go/analysis
go get golang.org/x/tools/go/analysis/singlechecker
```

### Cấu trúc linter cơ bản

```go
package main

import (
	"flag"
	"go/ast"

	"golang.org/x/tools/go/analysis"
	"golang.org/x/tools/go/analysis/singlechecker"
)

var analyzer = &analysis.Analyzer{
	Name: "mylinter",
	Doc:  "Mô tả về linter",
	Run:  run,
}

func run(pass *analysis.Pass) (interface{}, error) {
	// Phân tích code ở đây
	for _, file := range pass.Files {
		ast.Inspect(file, func(n ast.Node) bool {
			// Kiểm tra các node AST và báo cáo vấn đề
			// ví dụ: pass.Reportf(node.Pos(), "Mô tả vấn đề")
			return true
		})
	}
	return nil, nil
}

func main() {
	flag.Parse()
	singlechecker.Main(analyzer)
}
```

### Các bước phân tích AST (Abstract Syntax Tree)

1. **Hiểu về AST**: AST là cấu trúc cây biểu diễn mã nguồn. Mỗi nút trong cây tương ứng với một phần tử cú pháp của ngôn ngữ (biến, hàm, biểu thức, v.v.).
2. **Duyệt AST**: Sử dụng `ast.Inspect` để duyệt qua tất cả các nút trong cây AST.
3. **Type Assertion**: Kiểm tra loại của mỗi nút để tìm ra nút cần phân tích (ví dụ: `*ast.FuncDecl` cho khai báo hàm).
4. **Phân tích và báo cáo**: Kiểm tra các thuộc tính của nút và báo cáo vấn đề nếu cần.

### Ví dụ: Kiểm tra tên biến boolean

```go
if ident, ok := n.(*ast.Ident); ok && ident.Obj != nil && ident.Obj.Kind == ast.Var {
    // Kiểm tra nếu biến có kiểu bool
    if typeExpr, ok := ident.Obj.Decl.(*ast.ValueSpec); ok {
        if typeExpr.Type != nil {
            if t, ok := typeExpr.Type.(*ast.Ident); ok && t.Name == "bool" {
                // Kiểm tra tên biến
                if !strings.HasPrefix(ident.Name, "is") && !strings.HasPrefix(ident.Name, "has") {
                    pass.Reportf(ident.Pos(), "boolean variable '%s' should start with 'is' or 'has'", ident.Name)
                }
            }
        }
    }
}
```

## Cách 2: Tích hợp với golangci-lint (Plugin)

Để tạo một plugin cho golangci-lint:

1. **Tạo một package mới** phù hợp với cấu trúc của golangci-lint
2. **Implement interface** `Linter` và `Analyzer`
3. **Build và đăng ký plugin** với golangci-lint

Chi tiết hơn có thể tìm trong [tài liệu golangci-lint về plugins](https://golangci-lint.run/contributing/new-linters/).

## Các loại nút AST thường gặp

- `*ast.File`: Đại diện cho một file mã nguồn
- `*ast.FuncDecl`: Khai báo hàm
- `*ast.GenDecl`: Khai báo chung (var, const, import, type)
- `*ast.ValueSpec`: Chỉ định giá trị (trong var, const)
- `*ast.Ident`: Định danh (tên biến, hàm)
- `*ast.BasicLit`: Literal cơ bản (chuỗi, số)
- `*ast.BinaryExpr`: Biểu thức nhị phân (a + b, a < b)
- `*ast.IfStmt`: Câu lệnh if
- `*ast.ForStmt`: Vòng lặp for
- `*ast.BlockStmt`: Khối lệnh ({...})

## Ví dụ các linter được triển khai

Thư mục `custom-linters/` chứa các ví dụ về linter đã được triển khai:

- `c044-boolean-naming`: Kiểm tra tên biến boolean
- `c023-no-hardcoded-constants`: Kiểm tra các constant được hardcode

## Các mẹo và lưu ý

1. **Hiệu suất**: Hạn chế tính toán phức tạp trong linter để tránh làm chậm quá trình phân tích.
2. **Tránh False Positives**: Xem xét các trường hợp đặc biệt, bỏ qua file test, code được tạo tự động, v.v.
3. **Sử dụng Type Info**: Nếu cần phân tích kiểu dữ liệu, sử dụng `pass.TypesInfo`.
4. **Viết Test**: Luôn viết test để đảm bảo linter hoạt động chính xác.

## Tài nguyên học tập

- [Go AST Viewer](https://goast.yuroyoro.net/): Công cụ trực quan để xem AST của mã Go
- [Go Parser Docs](https://pkg.go.dev/go/parser): Tài liệu về Go parser
- [Go Analysis Package](https://pkg.go.dev/golang.org/x/tools/go/analysis): Tài liệu về gói analysis
- [Go AST Package](https://pkg.go.dev/go/ast): Tài liệu về gói AST
