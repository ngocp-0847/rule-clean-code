/**
 * Custom ESLint rule for: C077 – Tránh viết logic phức tạp trong constructor
 * Rule ID: custom/c077
 * Mục tiêu: Tránh để nhiều logic xử lý trong constructor, nên tách ra method riêng
 */

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Tránh viết logic phức tạp trong constructor",
      recommended: false
    },
    schema: [],
    messages: {
      tooLong: "Constructor quá phức tạp ({count} dòng). Nên tách logic sang phương thức riêng."
    }
  },
  create(context) {
    return {
      MethodDefinition(node) {
        if (
          node.kind === "constructor" &&
          node.value &&
          node.value.body &&
          node.value.body.body.length > 5 // threshold dòng logic trong constructor
        ) {
          context.report({
            node,
            messageId: "tooLong",
            data: {
              count: node.value.body.body.length
            }
          });
        }
      }
    };
  }
};
