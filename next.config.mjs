/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      },
    ],
  },
  // Enable Turbopack for faster builds (Next.js 16)
  turbopack: {
    // Additional turbopack config if needed
  },
}

export default nextConfig
