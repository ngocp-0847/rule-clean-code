module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow declaring empty types like `type X = {}`",
      recommended: false
    },
    schema: [],
    messages: {
      emptyType: "Avoid declaring empty type aliases like '{{name}} = {}'"
    }
  },
  create(context) {
    return {
      TSTypeAliasDeclaration(node) {
        if (
          node.typeAnnotation.type === "TSTypeLiteral" &&
          node.typeAnnotation.members.length === 0
        ) {
          context.report({
            node: node.id,
            messageId: "emptyType",
            data: { name: node.id.name }
          });
        }
      }
    };
  }
};
