module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'global-require': 'off',
    'import/no-dynamic-require': 'off',
    'no-console': 'off',
    'no-param-reassign': 'off',
    'no-restricted-syntax': 'off',
    'no-return-assign': 'off',
  },
};
