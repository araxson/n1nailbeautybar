import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Optimize images
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Experimental features for better performance
  experimental: {
    // Enable optimized package imports
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  // TypeScript configuration
  typescript: {
    // Don't run TypeScript during build (we'll do it separately)
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    // Don't run ESLint during build (we'll do it separately)
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
