/**
 * Custom ESLint rule for: C028 – Tránh nested function nhiều tầng (tối đa 2 cấp)
 * Rule ID: custom/c028
 * Mục tiêu: Hạn chế function lồng quá 2 cấp để tăng tính dễ đọc và bảo trì
 */

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Tránh nested function nhiều tầng (tối đa 2 cấp)",
      recommended: false
    },
    schema: [],
    messages: {
      tooDeep: "Function lồng quá sâu (cấp {depth}). Chỉ nên tối đa 2 cấp."
    }
  },
  create(context) {
    let functionStack = [];

    function enterFunction(node) {
      functionStack.push(node);
      const depth = functionStack.length;

      if (depth > 2) {
        context.report({
          node,
          messageId: "tooDeep",
          data: {
            depth
          }
        });
      }
    }

    function exitFunction() {
      functionStack.pop();
    }

    return {
      FunctionDeclaration: enterFunction,
      FunctionExpression: enterFunction,
      ArrowFunctionExpression: enterFunction,
      'FunctionDeclaration:exit': exitFunction,
      'FunctionExpression:exit': exitFunction,
      'ArrowFunctionExpression:exit': exitFunction
    };
  }
};
