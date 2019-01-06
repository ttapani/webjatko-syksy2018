const withTypescript = require('@zeit/next-typescript')
const withOffline = require('next-offline')

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

module.exports = withTypescript(withOffline(nextConfig))
