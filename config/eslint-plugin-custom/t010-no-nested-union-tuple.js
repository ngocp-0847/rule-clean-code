module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Avoid deeply nested union or tuple types",
      recommended: false
    },
    schema: [],
    messages: {
      nestedUnion: "Avoid nested union types",
      nestedTuple: "Avoid nested tuple types"
    }
  },
  create(context) {
    function checkNestedTypes(node) {
      if (node.type === 'TSUnionType') {
        const nested = node.types.some(t => t.type === 'TSUnionType' || t.type === 'TSTupleType');
        if (nested) {
          context.report({
            node,
            messageId: "nestedUnion"
          });
        }
      }

      if (node.type === 'TSTupleType') {
        const nested = node.elementTypes.some(t => t.type === 'TSTupleType' || t.type === 'TSUnionType');
        if (nested) {
          context.report({
            node,
            messageId: "nestedTuple"
          });
        }
      }
    }

    return {
      TSUnionType: checkNestedTypes,
      TSTupleType: checkNestedTypes
    };
  }
};
