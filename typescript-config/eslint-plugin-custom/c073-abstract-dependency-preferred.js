/**
 * Custom ESLint rule for: C073 – Module nên giao tiếp qua abstraction (thay vì gọi class cụ thể)
 * Rule ID: custom/c073
 * Mục tiêu: Hạn chế phụ thuộc trực tiếp vào class cụ thể, nên gọi thông qua interface/abstract
 * Gợi ý: Áp dụng cho kiến trúc hướng interface như Clean Architecture
 */

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Module nên giao tiếp qua abstraction (thay vì gọi class cụ thể)",
      recommended: false
    },
    schema: [],
    messages: {
      concrete: "Gọi class cụ thể '{name}' trực tiếp. Nên giao tiếp thông qua abstraction (interface)."
    }
  },
  create(context) {
    return {
      NewExpression(node) {
        if (
          node.callee &&
          node.callee.type === "Identifier" &&
          /^[A-Z]/.test(node.callee.name) // Tên class bắt đầu bằng chữ hoa
        ) {
          context.report({
            node,
            messageId: "concrete",
            data: {
              name: node.callee.name
            }
          });
        }
      }
    };
  }
};
