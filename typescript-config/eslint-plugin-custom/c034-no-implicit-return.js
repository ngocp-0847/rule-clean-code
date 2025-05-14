/**
 * Custom ESLint rule for: C034 – Không sử dụng return ẩn (implicit return trong arrow function)
 * Rule ID: custom/c034
 * Mục tiêu: Hạn chế sử dụng arrow function với implicit return gây khó đọc, nên dùng return rõ ràng
 */

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Không sử dụng return ẩn (implicit return trong arrow function)",
      recommended: false
    },
    schema: [],
    messages: {
      implicitReturn: "Không nên dùng return ẩn. Hãy dùng return rõ ràng với { braces }."
    }
  },
  create(context) {
    return {
      ArrowFunctionExpression(node) {
        if (node.body && node.body.type !== "BlockStatement") {
          context.report({
            node,
            messageId: "implicitReturn",
            data: {
              braces: "{ ... }"
            }
          });
        }
      }
    };
  }
};
