module.exports = {
  env: {
    es2021: true,
    jest: true,
  },
  extends: ['airbnb', 'prettier'],
  parserOptions: {
    ecmaVersion: 2022,
  },
  rules: {
    'import/prefer-default-export': 'off',
    'import/extensions': ['off'],
    'class-methods-use-this': 'off',
    'no-alert': 'off',
    'no-console': 'off',
  },
};
