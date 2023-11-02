/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.cricketaddictor.com",
        // port: '',
        // pathname: '/account123/**',
      },
    ],
    unoptimized: true,
  },
}

module.exports = nextConfig
