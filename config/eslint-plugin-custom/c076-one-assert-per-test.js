/**
 * Custom ESLint rule for: C076 – Mỗi test chỉ nên assert 1 hành vi (Single Assert Rule)
 * Rule ID: custom/c076
 * Mục tiêu: Một test case chỉ nên có 1 hành vi kiểm thử chính (1 lệnh expect)
 */

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Mỗi test chỉ nên assert 1 hành vi (Single Assert Rule)",
      recommended: false
    },
    schema: [],
    messages: {
      tooMany: "Test chứa quá nhiều lệnh expect ({count}). Nên chỉ có 1 hành vi kiểm thử chính mỗi test."
    }
  },
  create(context) {
    function isTestFunction(node) {
      return (
        node.type === "CallExpression" &&
        node.callee.type === "Identifier" &&
        ["test", "it"].includes(node.callee.name)
      );
    }

    function countExpectCalls(body) {
      let count = 0;

      function inspect(node) {
        if (
          node.type === "CallExpression" &&
          node.callee.type === "Identifier" &&
          node.callee.name === "expect"
        ) {
          count++;
        }
      }

      const espree = require("eslint").SourceCode;
      const sourceCode = context.getSourceCode();

      const traverse = (node) => {
        inspect(node);
        for (const key in node) {
          const child = node[key];
          if (Array.isArray(child)) {
            child.forEach(traverse);
          } else if (child && typeof child.type === "string") {
            traverse(child);
          }
        }
      };

      traverse(body);
      return count;
    }

    return {
      CallExpression(node) {
        if (
          isTestFunction(node) &&
          node.arguments.length >= 2 &&
          node.arguments[1].type === "FunctionExpression" || node.arguments[1].type === "ArrowFunctionExpression"
        ) {
          const fnBody = node.arguments[1].body;
          const expectCount = countExpectCalls(fnBody);
          if (expectCount > 1) {
            context.report({
              node,
              messageId: "tooMany",
              data: {
                count: expectCount
              }
            });
          }
        }
      }
    };
  }
};
