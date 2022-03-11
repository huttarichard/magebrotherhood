module.exports = {
  env: {
    browser: true,
    mocha: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      // Allows for the parsing of JSX
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },

  extends: [
    "next",
    "prettier",
    "next/core-web-vitals",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
  ],

  plugins: ["simple-import-sort", "unused-imports"],

  rules: {
    // This is documented as the default, but apparently now needs to be
    // set explicitly
    "prettier/prettier": [
      "error",
      {},
      {
        usePrettierrc: true,
      },
    ],
    "unused-imports/no-unused-imports": "error",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "ethers",
            message: "Please import from '@ethersproject/module' directly to support tree-shaking.",
          },
          {
            name: "@lingui/macro",
            importNames: ["t"],
            message: "Please use <Trans> instead of t.",
          },
        ],
      },
    ],
  },
  overrides: [
    {
      files: ["hardhat.config.js"],
      globals: { task: true },
    },
    {
      files: ["**/*.stories.tsx"],
      rules: {
        "import/no-anonymous-default-export": "off",
      },
    },
  ],
};
