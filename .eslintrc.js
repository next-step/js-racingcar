module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:cypress/recommended', 'airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['prettier'],
  rules: {
    'no-new': 0,
    'no-alert': 0,
    'no-plusplus': 0,
    'import/extensions': 0,
    'import/prefer-default-export': 0,
  },
};

