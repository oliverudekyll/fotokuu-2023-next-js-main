/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    domains: ['fotokuu.test', 'fotokuu-23-admin.fotokuu.ee'],
  },
  i18n: {
    locales: ['et', 'en'],
    defaultLocale: 'et',
    localeDetection: false,
  },
  async rewrites() {
    return [
      {
        source: '/en/news',
        destination: '/en/uudised',
        locale: false,
      },
      {
        source: '/en/news/:slug*',
        destination: '/en/uudised/:slug*',
        locale: false,
      },
      {
        source: '/en/programme/:slug*',
        destination: '/en/programm/:slug*',
        locale: false,
      },
      {
        source: '/en/partners',
        destination: '/en/partnerid',
        locale: false,
      },
    ]
  },
}

module.exports = nextConfig
