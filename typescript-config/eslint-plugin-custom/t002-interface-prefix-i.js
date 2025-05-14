module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Interface names should start with 'I'",
      recommended: false
    },
    schema: [],
    messages: {
      invalidName: "Interface name '{{name}}' should start with 'I'"
    }
  },
  create(context) {
    return {
      TSInterfaceDeclaration(node) {
        const name = node.id.name;
        if (!/^I[A-Z]/.test(name)) {
          context.report({
            node: node.id,
            messageId: "invalidName",
            data: { name }
          });
        }
      }
    };
  }
};
