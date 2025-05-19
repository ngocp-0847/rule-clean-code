# Custom Linters cho Golang

Tài liệu này hướng dẫn cách tạo và sử dụng các linter tùy chỉnh để kiểm tra các quy tắc không được hỗ trợ bởi các công cụ có sẵn như golangci-lint.

## Cấu trúc thư mục

```
custom-linters/
  ├── c023-no-hardcoded-constants/
  │    ├── main.go
  │    └── README.md
  ├── c030-validate-separate/
  │    ├── main.go
  │    └── README.md
  ├── c044-boolean-naming/
  │    ├── main.go
  │    └── README.md
  └── run-custom-linters.sh
```

## Cách viết Custom Linter

Các custom linter được viết bằng Go sử dụng thư viện [go/ast](https://pkg.go.dev/go/ast) và [go/analysis](https://pkg.go.dev/golang.org/x/tools/go/analysis) để phân tích mã nguồn Go.

### Ví dụ Custom Linter cho quy tắc C044 (Tên biến boolean nên bắt đầu bằng is, has, should)

```go
// custom-linters/c044-boolean-naming/main.go
package main

import (
	"flag"
	"fmt"
	"go/ast"
	"strings"

	"golang.org/x/tools/go/analysis"
	"golang.org/x/tools/go/analysis/singlechecker"
)

var prefixes = []string{"is", "has", "should", "can", "will", "was", "did", "must", "are", "does"}

var analyzer = &analysis.Analyzer{
	Name: "booleannames",
	Doc:  "Checks that boolean variable names start with 'is', 'has', or 'should'",
	Run:  run,
}

func run(pass *analysis.Pass) (interface{}, error) {
	for _, file := range pass.Files {
		ast.Inspect(file, func(n ast.Node) bool {
			// Kiểm tra khai báo biến
			if decl, ok := n.(*ast.GenDecl); ok {
				for _, spec := range decl.Specs {
					if valueSpec, ok := spec.(*ast.ValueSpec); ok {
						checkValueSpec(pass, valueSpec)
					}
				}
			}

			// Kiểm tra biến trong hàm
			if assign, ok := n.(*ast.AssignStmt); ok {
				checkAssignment(pass, assign)
			}

			// Kiểm tra tham số hàm và giá trị trả về
			if funcDecl, ok := n.(*ast.FuncDecl); ok && funcDecl.Type != nil && funcDecl.Type.Results != nil {
				checkFuncResults(pass, funcDecl)
			}

			return true
		})
	}
	return nil, nil
}

func checkValueSpec(pass *analysis.Pass, spec *ast.ValueSpec) {
	// Kiểm tra xem biến có kiểu boolean không
	if spec.Type != nil {
		if ident, ok := spec.Type.(*ast.Ident); ok && ident.Name == "bool" {
			for _, name := range spec.Names {
				checkBooleanName(pass, name)
			}
		}
	} else if len(spec.Values) > 0 {
		// Kiểm tra dựa trên giá trị được gán
		for i, name := range spec.Names {
			if i < len(spec.Values) {
				if lit, ok := spec.Values[i].(*ast.BasicLit); ok && (lit.Value == "true" || lit.Value == "false") {
					checkBooleanName(pass, name)
				}
			}
		}
	}
}

func checkAssignment(pass *analysis.Pass, assign *ast.AssignStmt) {
	if len(assign.Rhs) == 1 {
		if lit, ok := assign.Rhs[0].(*ast.BasicLit); ok && (lit.Value == "true" || lit.Value == "false") {
			for _, lhs := range assign.Lhs {
				if ident, ok := lhs.(*ast.Ident); ok {
					checkBooleanName(pass, ident)
				}
			}
		}
	}
}

func checkFuncResults(pass *analysis.Pass, funcDecl *ast.FuncDecl) {
	for _, field := range funcDecl.Type.Results.List {
		if ident, ok := field.Type.(*ast.Ident); ok && ident.Name == "bool" {
			for _, name := range field.Names {
				checkBooleanName(pass, name)
			}
		}
	}
}

func checkBooleanName(pass *analysis.Pass, ident *ast.Ident) {
	name := ident.Name
	
	// Bỏ qua nếu là biến dấu gạch dưới hoặc biến ngắn trong vòng lặp
	if name == "_" || len(name) <= 2 {
		return
	}
	
	hasValidPrefix := false
	for _, prefix := range prefixes {
		if strings.HasPrefix(strings.ToLower(name), prefix) {
			hasValidPrefix = true
			break
		}
	}
	
	if !hasValidPrefix {
		pass.Reportf(ident.Pos(), "boolean variable '%s' should start with 'is', 'has', 'should', etc.", name)
	}
}

func main() {
	flag.Parse()
	singlechecker.Main(analyzer)
}
```

### Cách chạy Custom Linter

```bash
# Từ thư mục gốc của dự án Go cần kiểm tra
go run /path/to/rule-clean-code/golang-config/custom-linters/c044-boolean-naming/main.go ./...
```

## Script chạy tất cả Custom Linters

<function_calls>
<invoke name="create_file">
<parameter name="content">#!/bin/bash
# Script chạy tất cả custom linters
# Đặt file này tại custom-linters/run-custom-linters.sh

set -e

# Đường dẫn đến thư mục dự án Go cần kiểm tra
if [ -z "$1" ]; then
  echo "Usage: $0 <path-to-go-project>"
  exit 1
fi

PROJECT_PATH="$1"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Mảng chứa đường dẫn đến các custom linter
LINTERS=(
  "$SCRIPT_DIR/c044-boolean-naming"
  "$SCRIPT_DIR/c023-no-hardcoded-constants"
  "$SCRIPT_DIR/c045-no-print-in-production"
  # Thêm các linter khác vào đây
)

# Chạy tất cả các linter
echo "Running custom linters on $PROJECT_PATH"
echo "======================================"

EXIT_CODE=0

for LINTER in "${LINTERS[@]}"; do
  LINTER_NAME=$(basename "$LINTER")
  echo "Running $LINTER_NAME..."
  
  # Chạy linter và lưu exit code
  if ! go run "$LINTER/main.go" "$PROJECT_PATH/..."; then
    EXIT_CODE=1
    echo "❌ $LINTER_NAME failed"
  else
    echo "✅ $LINTER_NAME passed"
  fi
  
  echo "--------------------------------------"
done

if [ $EXIT_CODE -eq 0 ]; then
  echo "All custom linters passed! ✨"
else
  echo "Some custom linters failed! ❌"
fi

exit $EXIT_CODE
