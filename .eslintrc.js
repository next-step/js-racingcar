module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:cypress/recommended", "airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  rules: {},
};
