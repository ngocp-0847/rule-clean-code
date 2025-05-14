/**
 * Custom ESLint rule for: C065 – Không bắt lỗi rồi im lặng (bắt lỗi nhưng không log hoặc xử lý)
 * Rule ID: custom/c065
 * Mục tiêu: Bắt lỗi nhưng không log/throw lại có thể khiến bug bị ẩn
 */

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Không bắt lỗi rồi im lặng (bắt lỗi nhưng không log hoặc xử lý)",
      recommended: true
    },
    schema: [],
    messages: {
      silentCatch: "Đã bắt lỗi nhưng không log hoặc throw lại. Điều này có thể che giấu lỗi."
    }
  },
  create(context) {
    return {
      CatchClause(node) {
        const body = node.body && node.body.body;
        if (!Array.isArray(body) || body.length === 0) {
          return; // để C054 lo phần catch rỗng
        }

        const hasLogOrThrow = body.some(stmt =>
          stmt.type === "ThrowStatement" ||
          (
            stmt.type === "ExpressionStatement" &&
            stmt.expression.type === "CallExpression" &&
            stmt.expression.callee &&
            (
              stmt.expression.callee.name === "console" || // console.xxx(...)
              stmt.expression.callee.type === "MemberExpression" &&
              stmt.expression.callee.object.name === "console"
            )
          )
        );

        if (!hasLogOrThrow) {
          context.report({
            node,
            messageId: "silentCatch"
          });
        }
      }
    };
  }
};
