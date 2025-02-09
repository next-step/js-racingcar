import globals from "globals";
import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  eslintConfigPrettier,
  {
    files: ["**/*.js", "**/*.test.js"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...globals.jest },
    },
    rules: {
      eqeqeq: ["error", "always"],
      "no-unused-vars": "error",
      "no-var": "error",
      "no-else-return": "error",
    },
  },
];
