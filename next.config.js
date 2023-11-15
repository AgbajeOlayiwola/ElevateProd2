/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    productionBrowserSourceMaps: true,
    swcMinify: false,
    images: {
        domains: ['res.cloudinary.com']
    },
    compiler: {
        removeConsole: true
    },
    output: 'standalone',
    // pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
    publicRuntimeConfig: {
        processEnv: Object.fromEntries(
            Object.entries(process.env).filter(([key]) =>
                key.includes('NEXT_PUBLIC_')
            )
        )
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback.fs = false;
            config.resolve.fallback.tls = false;
            config.resolve.fallback.net = false;
            config.resolve.fallback.child_process = false;
        }
        return config;
    },
    future: {
        webpack5: true
    },
    fallback: {
        fs: false,
        tls: false,
        net: false,
        child_process: false
    }
};

module.exports = nextConfig;
