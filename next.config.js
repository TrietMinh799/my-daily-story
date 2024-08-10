/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['@mdxeditor/editor', 'react-diff-view'],
    reactStrictMode: true,
    webpack: (config) => {
        config.experiments = { ...config.experiments, topLevelAwait: true };
        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.stockcake.com'
            },
            {
                protocol: 'https',
                hostname: "images.unsplash.com"
            },
            {
                protocol: 'https',
                hostname: 'picsum.photos'
            }
        ]
    }
};

module.exports = nextConfig;
