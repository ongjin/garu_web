import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  turbopack: {},
  webpack(config, { isServer }) {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...config.resolve?.fallback,
          fs: false,
          path: false,
          url: false,
        },
      };
    }
    return config;
  },
};

export default nextConfig;
