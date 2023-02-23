/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true
};

module.exports = {
    distDir: 'build'
};

module.exports = nextConfig;

module.exports = {
    // https://github.com/vercel/next.js/issues/21079
    // Remove this workaround whenever the issue is fixed
    images: {
        loader: 'imgix',
        path: ''
    }
};
