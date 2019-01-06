const withTypescript = require('@zeit/next-typescript')
const withOffline = require('next-offline')
const withManifest = require('next-manifest')
const { withPlugins } = require('next-compose-plugins');
const {resolve} = require('path');

const manifest = {
    short_name: "Loans",
    name: "Loansystem",
    icons: [
        {
            src: "/static/images/icons-192.png",
            type: "image/png",
            sizes: "192x192"
          },
          {
            src: "/static/images/icons-512.png",
            type: "image/png",
            sizes: "512x512"
          }
    ],
    start_url: "/",
    display: "standalone",
    scope: "/",
    theme_color: "#9c27b0"
}

const nextConfig = {
    workboxOpts: {
        swDest: 'static/service-worker.js',
        runtimeCaching: [
            {
                urlPattern: /^http?.*/,
                handler: 'networkFirst',
                options: {
                    cacheName: 'http-calls',
                    networkTimeoutSeconds: 15,
                    expiration: {
                        maxEntries: 150,
                        maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
                    },
                    cacheableResponse: {
                        statuses: [0, 200],
                    },
                },
            },
        ],
    },
    generateInDevMode: true,
}

module.exports = withPlugins([
    [withManifest({ manifest })],
    [withOffline],
    [withTypescript]
])
