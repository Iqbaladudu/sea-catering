import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize for better build performance
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  // Improve image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Build optimizations
  generateBuildId: async () => {
    return process.env.BUILD_ID || 'development'
  },

  // Runtime configuration
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Headers for better security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

export default withPayload(nextConfig, {
  devBundleServerPackages: false,
  bundleAnalyzer: process.env.ANALYZE === 'true',
})
