const colors = require("tailwindcss/colors");
const forms = require("@tailwindcss/forms");
const core = require("@vechaiui/core");

module.exports = {
  mode: "jit",
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  plugins: [core, forms],
  // purge: [
  //   // ...
  //   "./node_modules/@vechaiui/**/*.{js,ts,jsx,tsx}", // path to vechaiui
  // ],
  // darkMode: "class", // or 'media' or 'class'
  // variants: {
  //   extend: {},
  // },
  // theme: {
  //   extend: {},
  // },
};
