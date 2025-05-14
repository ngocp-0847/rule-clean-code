/**
 * @fileoverview Custom ESLint rule to limit function length to 50 lines
 * Rule ID: custom/c002-limit-function-length
 */

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Limit function length to 50 lines",
      category: "Best Practices",
      recommended: false
    },
    schema: [],
    messages: {
      tooLong: "Function '{{name}}' has too many lines ({{lines}}). Limit is 50."
    }
  },
  create(context) {
    return {
      FunctionDeclaration(node) {
        const start = node.loc.start.line;
        const end = node.loc.end.line;
        const length = end - start + 1;

        if (length > 50) {
          const name = node.id ? node.id.name : "<anonymous>";
          context.report({
            node,
            messageId: "tooLong",
            data: {
              name,
              lines: length
            }
          });
        }
      },
      ArrowFunctionExpression(node) {
        if (!node.body.loc) return;
        const start = node.loc.start.line;
        const end = node.loc.end.line;
        const length = end - start + 1;

        if (length > 50) {
          context.report({
            node,
            messageId: "tooLong",
            data: {
              name: "<arrow function>",
              lines: length
            }
          });
        }
      }
    };
  }
};
