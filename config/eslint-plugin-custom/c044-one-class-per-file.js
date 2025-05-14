/**
 * Custom ESLint rule for: C044 – Mỗi file chỉ nên có 1 class chính (loại trừ declare)
 * Rule ID: custom/c044
 * Mục tiêu: Mỗi file chỉ nên có 1 class chính, loại trừ declare/interface
 */

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Mỗi file chỉ nên có 1 class chính (loại trừ declare)",
      recommended: false
    },
    schema: [],
    messages: {
      tooMany: "File chứa quá nhiều class ({count}). Nên chỉ có 1 class chính mỗi file."
    }
  },
  create(context) {
    let classCount = 0;

    return {
      ClassDeclaration(node) {
        // Bỏ qua class được đánh dấu declare (TypeScript) hoặc interface
        if (
          node.declare === true ||  // TS: declare class Foo
          (node.parent && node.parent.type === "TSModuleDeclaration") || // trong module
          (node.modifiers && node.modifiers.some(m => m.type === "TSDeclareKeyword"))
        ) {
          return;
        }

        classCount += 1;
      },
      'Program:exit'() {
        if (classCount > 1) {
          context.report({
            loc: { line: 1, column: 0 },
            messageId: "tooMany",
            data: {
              count: classCount
            }
          });
        }
      }
    };
  }
};
