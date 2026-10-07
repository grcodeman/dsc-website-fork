import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF is usually 20-30% smaller than WebP for photos; browsers without
    // AVIF support still get WebP.
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    // Inline CSS into the HTML instead of render-blocking <link> stylesheets —
    // removes a critical-path round trip that delays first render on mobile.
    inlineCss: true,
  },
};

export default nextConfig;
