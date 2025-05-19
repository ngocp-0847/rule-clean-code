package main

import (
	"flag"
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
