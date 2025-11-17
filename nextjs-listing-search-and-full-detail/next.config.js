// @ts-check
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode:false,
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.site.com' ,
        pathname: '/pictures/property/**',
      },
      {
        protocol: 'https',
        hostname: 'www.site.com',
        pathname: '/pictures/property/**',
      },
      {
        protocol: 'https',
        hostname: 'api-xxx.corelogic.com',
        pathname: '/xxx/Media/yyy/Property/PHOTO-jpeg/**',
      },

    ],
    deviceSizes: [640, 768, 1024, 1280, 1600],  // Responsive image sizes
    imageSizes: [16, 32, 48, 64, 96],           // Specific image sizes for icons
    formats: ['image/avif', 'image/webp'],      // Use modern image formats for better performance
    minimumCacheTTL: 60,                        // Cache Time-To-Live for optimized images (60 seconds)
    unoptimized: false,
  },
  }
   
  module.exports = nextConfig