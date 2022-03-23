const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    domains: ["modelviewer.dev"],
    formats: ['image/avif', 'image/webp'],
  },
})

