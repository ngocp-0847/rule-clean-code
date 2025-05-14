/**
 * Custom ESLint rule for: C018 – Không hardcode config vào trong code
 * Rule ID: custom/c018
 * Mục tiêu: Phát hiện việc hardcode config như API_KEY, password, localhost, db_url...
 * Dựa trên gợi ý từ SonarQube rules (S2068, S1075) và OWASP
 */

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Không hardcode config vào trong code",
      recommended: false
    },
    schema: [],
    messages: {
      hardcoded: "Phát hiện giá trị cấu hình hardcode '{{value}}' trong code. Nên đưa vào biến môi trường hoặc config file."
    }
  },
  create(context) {
    const suspiciousPatterns = [
      /password/i,
      /secret/i,
      /api[_-]?key/i,
      /auth[_-]?token/i,
      /access[_-]?token/i,
      /localhost/i,
      /127\.0\.0\.1/,
      /http:\/\//i,
      /https:\/\//i,
      /db[_-]?(url|uri|name|conn)/i,
      /conn(ect)?ion[_-]?string/i
    ];

    function reportIfHardcoded(node, value) {
      if (typeof value !== "string") return;
      for (const pattern of suspiciousPatterns) {
        if (pattern.test(value)) {
          context.report({
            node,
            messageId: "hardcoded",
            data: { value }
          });
          break;
        }
      }
    }

    return {
      Literal(node) {
        if (typeof node.value === "string") {
          reportIfHardcoded(node, node.value);
        }
      },
      TemplateLiteral(node) {
        if (
          node.quasis.length === 1 &&
          typeof node.quasis[0].value.raw === "string"
        ) {
          reportIfHardcoded(node, node.quasis[0].value.raw);
        }
      }
    };
  }
};
