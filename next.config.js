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
  typescript: {
    ignoreBuildErrors: true,
  },
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
  webpack: (config, { isServer }) => {
    // Transpile three and three-stdlib modules
    config.module.rules.push({
      test: /\.js$/,
      include: /node_modules\/(three|three-stdlib)/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
    });

    return config;
  },
};

module.exports = config;
