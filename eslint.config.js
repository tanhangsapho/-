module.exports = {
  root: true,
  ignores: ['**/*.js', '**/*.mjs', '**/*.cjs'],
  files: ['src/**/*.js'],
  env: {
    node: true,
    es2021: true,
  },
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module"
  },
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "off",
    "no-console": "off",
  },
};
