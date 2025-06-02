/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["native"],
  /** @type {import('webpack').Configuration} */
  webpack: (config, context) => {
    if (context.isServer) {
      config.externals = [
        ...config.externals,
        { native: "commonjs native" },
      ];
    }
    return config;
  },
};

export default nextConfig;
