const withPlugins = require("next-compose-plugins");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const withTM = require("next-transpile-modules")(["three"]);

const config = {
  reactStrictMode: true,
  poweredByHeader: false,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    domains: ["modelviewer.dev", "magebrotherhood.infura-ipfs.io"],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = withPlugins([withBundleAnalyzer, withTM], config);
