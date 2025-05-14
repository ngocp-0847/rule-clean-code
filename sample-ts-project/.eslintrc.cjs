// 📦 ESLint Configuration
// Configuration for checking Coding Standards – Rule Set v1.0
// Includes plugins: typescript-eslint, sonarjs, unicorn, clean-code

module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module"
  },
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ["custom", 
    '@typescript-eslint',
    'sonarjs',
    'unicorn',
    'clean-code'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:sonarjs/recommended',
    'plugin:unicorn/recommended'
  ],
  rules: {
    // C002 – Limit function length to 50 lines
    "custom/c002": "warn",
    // C013 – Do not leave dead code commented out (Custom Rule)
    "custom/c013": "warn",
    // C018 – Do not throw generic errors, always use specific messages (Custom Rule)
    "custom/c018": "warn",
    // C023 – Do not hardcode constants scattered throughout logic (Custom Rule)
    "custom/c023": "warn",
    // C028 – Every catch block must log the error cause (Custom Rule)
    "custom/c028": "warn",
    // C034 – Separate data fetching and logic processing in service layer (Custom Rule)
    "custom/c034": "warn",
    // C037 – Error handlers must log all relevant input (Custom Rule)
    "custom/c037": "warn",
    // C044 – Boolean variable names should start with `is`, `has`, or `should` (Custom Rule)
    "custom/c044": "warn",
    // C048 – Avoid long/complex regex in main logic (Custom Rule)
    "custom/c048": "warn",
    // C063 – Do not override superclass behavior and skip important logic (Custom Rule)
    "custom/c063": "warn",
    // C068 – Each test case should only validate one logic (Custom Rule)
    "custom/c068": "warn",
    // C076 – Each test should assert only one behavior (Custom Rule)
    "custom/c076": "warn",
    // C077 – Configuration must be validated at startup (Custom Rule)
    "custom/c077": "warn",

    // C003 – Use clear variable names, avoid arbitrary abbreviations
    "no-duplicate-imports": "warn",
    // C006 – Function names should be verbs or verb-noun phrases
    "sonarjs/cognitive-complexity": "warn",
    // C007 – Do not write comments explaining "what the code does"
    "unicorn/no-global-assign": "warn",
    // C014 – Use Dependency Injection instead of `new` in logic
    "clean-code/naming-convention": "warn",
    // C027 – Use guard clauses instead of nested ifs
    "camelcase": "warn",
    "id-length": "warn",
    // C030 – Place data validation logic in a dedicated layer
    "sonarjs/no-duplicate-string": "warn",
    // C035 – Avoid direct access to global state in domain logic
    "clean-code/naming-convention": "warn",
    // C040 – Avoid logic that depends on file/module execution order
    "jest/no-large-snapshots": "warn",
    // C042 – Do not scatter validation logic across multiple classes
    "jest/prefer-called-with": "warn",
    // C049 – Do not duplicate retry logic across places
    "unicorn/error-message": "warn",
    // C059 – Do not process large datasets without logging or resource control
    "no-unused-vars": "warn",
    // C066 – Avoid repeating similar test logic
    "unicorn/no-abusive-eslint-disable": "warn",
    // C070 – Avoid hardcoded repetitive test data
    "unicorn/no-array-callback-reference": "warn",
    // C071 – Do not hardcode configuration values
    "@typescript-eslint/no-magic-numbers": "warn",
    // C074 – Tests should not depend on real-time behavior
    "jest/no-conditional-expect": "warn",

    // T001 – Avoid using `any`, enforce explicit types
    "@typescript-eslint/no-explicit-any": "warn",
    // T002 – Interface names should start with `I` (Custom Rule)
    "custom/t002": "warn",
    // T003 – Avoid using `@ts-ignore` without a justification (Custom Rule)
    "custom/t003": "warn",
    // T004 – Disallow empty types like `type X = {}` (Custom Rule)
    "custom/t004": "warn",
    // T006 – Avoid arbitrary assignment to `this`
    "unicorn/no-this-assignment": "warn",
    // T007 – Avoid declaring functions inside class constructors (Custom Rule)
    "custom/t007": "warn",
    // T008 – Avoid `export default` unless there's a single responsibility
    "import/no-default-export": "warn",
    // T010 – Avoid deeply nested union or tuple types (Custom Rule)
    "custom/t010": "warn"
  }
};