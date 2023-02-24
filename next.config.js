// @ts-check
const { i18n } = require('./next-i18next.config.js')

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/movies',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
