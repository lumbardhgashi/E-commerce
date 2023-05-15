/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    webpackDevMiddleware: config => {
      config.watchOptions.poll = 300;
      return config
    },
  },
  // webpackDevMiddleware: config => {
  //   config.watchOptions.poll = 300;
  //   return config
  // },
  reactStrictMode: true,
}

module.exports = nextConfig
