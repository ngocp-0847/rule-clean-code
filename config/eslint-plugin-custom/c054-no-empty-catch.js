/**
 * Custom ESLint rule for: C054 – Không dùng catch rỗng (không xử lý hoặc log lỗi)
 * Rule ID: custom/c054
 * Mục tiêu: Tránh nuốt lỗi trong catch mà không log hoặc xử lý gì
 */

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Không dùng catch rỗng (không xử lý hoặc log lỗi)",
      recommended: true
    },
    schema: [],
    messages: {
      emptyCatch: "Catch block rỗng không được phép. Nên log hoặc xử lý lỗi rõ ràng."
    }
  },
  create(context) {
    return {
      CatchClause(node) {
        const body = node.body && node.body.body;
        if (Array.isArray(body) && body.length === 0) {
          context.report({
            node,
            messageId: "emptyCatch"
          });
        }
      }
    };
  }
};
