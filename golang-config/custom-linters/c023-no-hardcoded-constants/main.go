package main

import (
	"flag"
	"fmt"
	"go/ast"
	"go/token"
	"strings"

	"golang.org/x/tools/go/analysis"
	"golang.org/x/tools/go/analysis/singlechecker"
)

var analyzer = &analysis.Analyzer{
	Name: "nohardcodedconstants",
	Doc:  "Checks that string and numeric literals are not scattered throughout the code",
	Run:  run,
}

// Danh sách các loại ký tự hardcoded cần kiểm tra
var (
	// Độ dài chuỗi tối thiểu để kiểm tra
	minStringLength = 5

	// Bỏ qua các chuỗi thường được dùng trong logging, regex, v.v.
	ignoredStrings = []string{
		"http://", "https://",
		"error", "warning", "info", "debug",
		"%s", "%d", "%v", "%w",
	}

	// Bỏ qua các số thường được dùng
	commonNumbers = map[int]bool{
		-1: true, 0: true, 1: true, 2: true, 3: true, 4: true, 5: true,
		10: true, 100: true, 1000: true,
	}
)

func run(pass *analysis.Pass) (interface{}, error) {
	// Loại bỏ các file test và các file gen
	for _, file := range pass.Files {
		fileName := pass.Fset.File(file.Pos()).Name()
		if strings.HasSuffix(fileName, "_test.go") || strings.Contains(fileName, "generated") {
			continue
		}

		// Kiểm tra các literal bên trong các khai báo const
		inConstBlock := false
		ast.Inspect(file, func(n ast.Node) bool {
			switch x := n.(type) {
			case *ast.GenDecl:
				// Đánh dấu khi bắt đầu và kết thúc khối const
				if x.Tok == token.CONST {
					inConstBlock = true
				} else {
					inConstBlock = false
				}
				return true

			case *ast.BasicLit:
				// Bỏ qua nếu đang ở trong khối const
				if inConstBlock {
					return true
				}

				// Kiểm tra literal
				checkLiteral(pass, x)
				return true

			default:
				return true
			}
		})
	}
	return nil, nil
}

func checkLiteral(pass *analysis.Pass, lit *ast.BasicLit) {
	switch lit.Kind {
	case token.STRING:
		checkStringLiteral(pass, lit)
	case token.INT, token.FLOAT:
		checkNumericLiteral(pass, lit)
	}
}

func checkStringLiteral(pass *analysis.Pass, lit *ast.BasicLit) {
	// Xóa dấu ngoặc kép và kiểm tra độ dài
	val := strings.Trim(lit.Value, "\"'`")
	if len(val) < minStringLength {
		return
	}

	// Bỏ qua các chuỗi đặc biệt
	for _, ignore := range ignoredStrings {
		if strings.Contains(val, ignore) {
			return
		}
	}

	// Kiểm tra nếu chuỗi có vẻ là URL hoặc path
	if strings.HasPrefix(val, "/") || strings.Contains(val, "://") {
		return
	}

	// Báo cáo lỗi nếu là chuỗi hardcoded
	pass.Reportf(lit.Pos(), "hardcoded string literal '%s' should be defined as a constant", val)
}

func checkNumericLiteral(pass *analysis.Pass, lit *ast.BasicLit) {
	// Bỏ qua các số thông dụng
	if lit.Kind == token.INT {
		val := strings.TrimRight(lit.Value, "lLuU")
		if val == "0" || val == "1" || val == "-1" {
			return
		}

		// Chuyển đổi và kiểm tra nếu là số thông dụng
		if num, err := parseInt(val); err == nil {
			if commonNumbers[num] {
				return
			}

			// Báo cáo lỗi nếu là số hardcoded lớn hơn ngưỡng
			if num > 5 && num != 10 && num != 100 && num != 1000 {
				pass.Reportf(lit.Pos(), "hardcoded numeric literal '%s' should be defined as a constant", val)
			}
		}
	}
}

func parseInt(s string) (int, error) {
	// Bỏ qua tiền tố 0x, 0b nếu có
	s = strings.TrimPrefix(s, "0x")
	s = strings.TrimPrefix(s, "0X")
	s = strings.TrimPrefix(s, "0b")
	s = strings.TrimPrefix(s, "0B")

	// Chuyển đổi string thành int
	var val int
	var err error
	if strings.HasPrefix(s, "0") && len(s) > 1 {
		// Số hệ cơ số 8 (octal)
		_, err = fmt.Sscanf(s, "%o", &val)
	} else {
		// Số hệ cơ số 10 (decimal)
		_, err = fmt.Sscanf(s, "%d", &val)
	}
	return val, err
}

func main() {
	flag.Parse()
	singlechecker.Main(analyzer)
}
