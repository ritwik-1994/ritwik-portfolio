// next.config.js
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: "export",
  images: {
    unoptimized: true
  },
  basePath: isProd ? "/ritwik-portfolio" : "",
  assetPrefix: isProd ? "/ritwik-portfolio/" : "",
  eslint: {
    ignoreDuringBuilds: true, // Temporarily ignore ESLint errors during build
  },
};

module.exports = nextConfig;
