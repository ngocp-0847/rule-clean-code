/**
 * Custom ESLint rule for: C013 – Không sử dụng comment mô tả 'code làm gì' (comment dư thừa, lặp lại nội dung code)
 * Rule ID: custom/c013
 * Mục tiêu: Loại bỏ comment lặp lại nội dung code, ví dụ: "// Lấy dữ liệu" trước "getData()"
 */

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Không sử dụng comment mô tả 'code làm gì' (comment dư thừa, lặp lại nội dung code)",
      recommended: false
    },
    schema: [],
    messages: {
      redundantComment: "Comment mô tả trùng nội dung với code bên dưới, nên tránh viết lặp lại."
    }
  },
  create(context) {
    return {
      Program() {
        const comments = context.getSourceCode().getAllComments();

        for (let i = 0; i < comments.length; i++) {
          const comment = comments[i];
          const nextToken = context.getSourceCode().getTokenAfter(comment);

          if (!nextToken || !comment.value) continue;

          const commentText = comment.value.trim().toLowerCase();
          const codeText = context.getSourceCode().getText(nextToken).toLowerCase();

          if (
            codeText.includes(commentText) || 
            commentText.includes(codeText.slice(0, 30))
          ) {
            context.report({
              loc: comment.loc,
              messageId: "redundantComment"
            });
          }
        }
      }
    };
  }
};
