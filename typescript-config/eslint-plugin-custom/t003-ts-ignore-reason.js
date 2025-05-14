module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Avoid using @ts-ignore without a clear justification",
      recommended: false
    },
    schema: [],
    messages: {
      missingReason: "@ts-ignore must include a justification comment on the same line"
    }
  },
  create(context) {
    return {
      Program() {
        const sourceCode = context.getSourceCode();
        const comments = sourceCode.getAllComments();

        comments.forEach(comment => {
          const value = comment.value.trim();
          if (value === "@ts-ignore") {
            context.report({
              loc: comment.loc,
              messageId: "missingReason"
            });
          }
        });
      }
    };
  }
};
