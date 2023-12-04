module.exports = {
  env: {
    es6: true,
    node: true,
    "jest/globals": true,
  },
  extends: ["airbnb-base", "plugin:import/typescript", "plugin:prettier/recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "jest"],
  rules: {
    "import/no-extraneous-dependencies": [
      "error",
      { devDependencies: ["**/selenium.ts", "**/setup.ts"] },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        ts: "never",
      },
    ],
    "no-redeclare": "off",
    "@typescript-eslint/no-redeclare": ["error"],
    "no-useless-constructor": "off",
    "@typescript-eslint/no-useless-constructor": "error",
    strict: ["error", "never"],
    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": "error",
    "no-unused-vars": "off",
    "prettier/prettier": "error",
    "no-console": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        ts: "never",
      },
    ],
  },
};
