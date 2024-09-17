/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['uploadthing.com', 'your-fal-ai-domain.com', 'img.clerk.com'],
  },
}

export default nextConfig;