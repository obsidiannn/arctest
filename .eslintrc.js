const { join } = require('path');

module.exports = {
  root: true,
  extends: '@arcblock/eslint-config-ts',
  parserOptions: {
    project: [join(__dirname, 'tsconfig.eslint.json'), join(__dirname, 'tsconfig.json')],
  },
  rules: {
    'prefer-destructuring': ['error', { object: false, array: false }],
    'react/function-component-definition': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-useless-return': 'off',
    'no-console': 'off',
    'no-alert': 'off',
    'no-nested-ternary': 'off',
    'react/jsx-curly-brace-presence': 'off',
    'object-shorthand': 'off',
    'no-useless-escape': 'off',
    '@typescript-eslint/indent': 'off',
    'import/prefer-default-export': 'off',
    'react/require-default-props': 'off',
    'consistent-return': 'off',
  },
};
