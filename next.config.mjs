/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    FAL_KEY: process.env.FAL_KEY,
  },
  images: {
    domains: ['uploadthing.com', 'queue.fal.run', 'img.clerk.com', 'rest.alpha.fal.ai', 'storage.googleapis.com', 'utfs.io'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}

export default nextConfig;