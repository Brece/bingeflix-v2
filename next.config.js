/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    images: {
      layoutRaw: true,
    }
  },
  images: {
    domains: ['image.tmdb.org'],
  }
}

module.exports = nextConfig
