module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: [
    '@typescript-eslint',
    'sonarjs',
    'unicorn'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:sonarjs/recommended',
    'plugin:unicorn/recommended'
  ],
  rules: {
    // Basic TypeScript rules
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        'selector': 'interface',
        'format': ['PascalCase'],
        'prefix': ['I']
      },
      {
        'selector': 'variable',
        'types': ['boolean'],
        'format': ['camelCase'],
        'prefix': ['is', 'has', 'should']
      }
    ],
    
    // SonarJS rules for code complexity
    'sonarjs/cognitive-complexity': ['warn', 10],
    'sonarjs/no-duplicate-string': 'warn',
    
    // Unicorn rules for modern JavaScript practices
    'unicorn/filename-case': 'off',
    'unicorn/prevent-abbreviations': 'warn',
    
    // Custom rule equivalents using standard ESLint
    'max-lines-per-function': ['warn', 50],
    'max-depth': ['warn', 3],
    'no-console': 'warn',
    'no-var': 'error',
    'prefer-const': 'warn',
    'no-throw-literal': 'error'
  }
};