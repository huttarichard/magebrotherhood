const path = require("path");

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", '@react-theming/storybook-addon'],
  typescript: { reactDocgen: 'react-docgen' },
  features: {
    emotionAlias: false,
  },
  core: {
    builder: "webpack5",
  },
  webpackFinal: async (config) => {
    config.resolve.modules.push("src")
    return config;
  },
};
