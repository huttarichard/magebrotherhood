module.exports = {
  env: {
    browser: true,
    mocha: true,
    node: true,
  },
  extends: ["next", "prettier", "next/core-web-vitals"],
  plugins: ["prettier"],
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
  },
  overrides: [
    {
      files: ["hardhat.config.js"],
      globals: { task: true },
    },
  ],
};
