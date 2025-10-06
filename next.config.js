/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize memory usage
  experimental: {
    // Reduce memory usage during development
    memoryBasedWorkersCount: true,
    // Optimize bundle splitting
    optimizePackageImports: ['react', 'react-dom'],
  },
  // Reduce bundle size
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Reduce memory usage in development
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
  },
};

module.exports = nextConfig;


