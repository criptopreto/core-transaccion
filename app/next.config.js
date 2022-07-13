/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa");
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com"],
  },
  pwa: {
    dest: "public",
    swSrc: "service-worker.js",
  },
  output: "standalone",
};

module.exports = withPWA(nextConfig);
