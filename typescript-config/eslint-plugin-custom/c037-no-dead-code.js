/**
 * Custom ESLint rule for: C037 – Không để code chết (code không bao giờ được gọi)
 * Rule ID: custom/c037
 * Mục tiêu: Phát hiện đoạn code unreachable/dead sau return/throw/break
 */

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Không để code chết (code không bao giờ được gọi)",
      recommended: true
    },
    schema: [],
    messages: {
      deadCode: "Code không bao giờ được thực thi (dead code). Hãy xóa hoặc kiểm tra lại logic."
    }
  },
  create(context) {
    return {
      BlockStatement(node) {
        let unreachable = false;
        for (const stmt of node.body) {
          if (unreachable) {
            context.report({
              node: stmt,
              messageId: "deadCode"
            });
          }

          if (
            stmt.type === "ReturnStatement" ||
            stmt.type === "ThrowStatement" ||
            stmt.type === "ContinueStatement" ||
            stmt.type === "BreakStatement"
          ) {
            unreachable = true;
          }
        }
      }
    };
  }
};
