/**
 * Custom ESLint plugin: custom rules index
 * Export toàn bộ rule tự định nghĩa dùng cho plugin "custom"
 */
module.exports = {
  rules: {
  "c002": require("./c002-limit-function-length.js"),
  "c013": require("./c013-no-redundant-comment.js"),
  "c018": require("./c018-no-config-inline.js"),
  "c028": require("./c028-limit-function-nesting.js"),
  "c034": require("./c034-no-implicit-return.js"),
  "c037": require("./c037-no-dead-code.js"),
  "c044": require("./c044-one-class-per-file.js"),
  "c048": require("./c048-no-var-declaration.js"),
  "c054": require("./c054-no-empty-catch.js"),
  "c065": require("./c065-no-silent-catch.js"),
  "c073": require("./c073-abstract-dependency-preferred.js"),
  "c076": require("./c076-one-assert-per-test.js"),
  "c077": require("./c077-limit-constructor-logic.js"),
  "t002": require("./t002-interface-prefix-i"),
  "t003": require("./t003-ts-ignore-reason"),
  "t004": require("./t004-no-empty-type"),
  "t007": require("./t007-no-fn-in-constructor"),
  "t010": require("./t010-no-nested-union-tuple"),
  }
};
