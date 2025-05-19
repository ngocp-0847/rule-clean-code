package main

import (
	"flag"
	"go/ast"
	"strings"

	"golang.org/x/tools/go/analysis"
	"golang.org/x/tools/go/analysis/singlechecker"
)

var analyzer = &analysis.Analyzer{
	Name: "noprint",
	Doc:  "Checks for print/println/fmt.Print statements in production code",
	Run:  run,
}

// Danh sách các hàm print cần kiểm tra
var printFunctions = map[string]bool{
	"print":    true,
	"println":  true,
	"Print":    true,
	"Printf":   true,
	"Println":  true,
	"Sprint":   true,
	"Sprintf":  true,
	"Sprintln": true,
	"Fprint":   true,
	"Fprintf":  true,
	"Fprintln": true,
	"Log":      true,
	"Logf":     true,
	"Logln":    true,
}

func run(pass *analysis.Pass) (interface{}, error) {
	for _, file := range pass.Files {
		// Bỏ qua các file test và file generated
		fileName := pass.Fset.File(file.Pos()).Name()
		if strings.HasSuffix(fileName, "_test.go") ||
			strings.Contains(fileName, "generated") ||
			strings.Contains(fileName, "vendor/") {
			continue
		}

		ast.Inspect(file, func(n ast.Node) bool {
			// Kiểm tra các lời gọi hàm
			if call, ok := n.(*ast.CallExpr); ok {
				checkPrintCall(pass, call)
			}
			return true
		})
	}
	return nil, nil
}

func checkPrintCall(pass *analysis.Pass, call *ast.CallExpr) {
	switch fun := call.Fun.(type) {
	case *ast.Ident:
		// Các lệnh print/println trực tiếp
		if printFunctions[fun.Name] {
			pass.Reportf(call.Pos(), "function '%s' should not be used in production code", fun.Name)
		}

	case *ast.SelectorExpr:
		// Kiểm tra các lệnh fmt.Print* hoặc log.*
		if pkg, ok := fun.X.(*ast.Ident); ok {
			if pkg.Name == "fmt" && printFunctions[fun.Sel.Name] {
				pass.Reportf(call.Pos(), "fmt.%s should not be used in production code", fun.Sel.Name)
			} else if pkg.Name == "log" && printFunctions[fun.Sel.Name] {
				pass.Reportf(call.Pos(), "log.%s should not be used in production code", fun.Sel.Name)
			}
		}
	}
}

func main() {
	flag.Parse()
	singlechecker.Main(analyzer)
}
