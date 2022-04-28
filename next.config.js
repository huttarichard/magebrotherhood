const withPlugins = require("next-compose-plugins");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const withTM = require("next-transpile-modules")(["three"]);

/**
 * @type {import('next').NextConfig}
 */
const config = {
  reactStrictMode: true,
  poweredByHeader: false,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    domains: ["magebrotherhood.infura-ipfs.io"],
    formats: ["image/avif", "image/webp"],
  },
  optimizeFonts: false,
  async headers() {
    return [
      {
        source: "/models/tokens/:id/model.usdz",
        headers: [
          {
            key: "Content-Type",
            value: "model/vnd.usdz+zip",
          },
        ],
      },
      {
        source: "/models/welcome_mage.reality",
        headers: [
          {
            key: "Content-Type",
            value: "model/vnd.reality",
          },
        ],
      },
      {
        source: "/models/tokens/:id/model.glb",
        headers: [
          {
            key: "Content-Type",
            value: "model/gltf-binary",
          },
        ],
      },
    ];
  },
};

module.exports = withPlugins([withBundleAnalyzer, withTM], config);
