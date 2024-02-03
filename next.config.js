/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: "https",
              hostname: "play.google.com",
            },
            {
              protocol: "https",
              hostname: "betrbeta.com",
            },
            {
              protocol: "https",
              hostname: "source.unsplash.com",
            },
            {
              protocol: "https",
              hostname: "img.mailinblue.com",
            },
        ], 
    },

    webpack: (config) => {
        // load worker files as a urls with `file-loader`
        config.module.rules.unshift({
            test: /pdf\.worker\.(min\.)?js/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[contenthash].[ext]',
                        publicPath: '_next/static/worker',
                        outputPath: 'static/worker',
                    },
                },
            ],
        });

        return config;
    },
    async headers() {
        return [
            {
                source: '/api/:path*',
                headers: [
                    {
                        key: 'Access-Control-Allow-Credentials',
                        value: 'true',
                    },
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*',
                    },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
