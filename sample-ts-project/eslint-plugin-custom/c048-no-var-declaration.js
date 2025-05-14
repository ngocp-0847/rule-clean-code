/**
 * Custom ESLint rule for: C048 – Tránh khai báo biến kiểu `var`, nên dùng `let` hoặc `const`
 * Rule ID: custom/c048
 * Mục tiêu: Không dùng var vì hoisting dễ gây lỗi, nên dùng let/const để rõ scope
 */

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Tránh khai báo biến kiểu `var`, nên dùng `let` hoặc `const`",
      recommended: true
    },
    schema: [],
    messages: {
      noVar: "Không nên dùng `var`. Hãy thay bằng `let` hoặc `const`."
    }
  },
  create(context) {
    return {
      VariableDeclaration(node) {
        if (node.kind === "var") {
          context.report({
            node,
            messageId: "noVar"
          });
        }
      }
    };
  }
};
