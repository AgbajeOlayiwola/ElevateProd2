/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    async headers() {
        return [
            {
                // matching all API routes
                source: '*',
                headers: [
                    { key: 'Access-Control-Allow-Credentials', value: 'true' },
                    { key: 'Access-Control-Allow-Origin', value: '*' }, // replace this your actual origin
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET,DELETE,PATCH,POST,PUT'
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value:
                            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
                    }
                ]
            }
        ];
    }
};
module.exports = {
    distDir: 'build',
    headers: () => [
        {
            source: '/:path*',
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'no-store'
                }
            ]
        }
    ],
    poweredByHeader: false
};

module.exports = nextConfig;

module.exports = {
    // https://github.com/vercel/next.js/issues/21079
    // Remove this workaround whenever the issue is fixed
    // images: {
    //     loader: 'imgix',
    //     path: ''
    // }
};
