import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Inline CSS into the HTML instead of render-blocking <link> stylesheets —
    // removes a critical-path round trip that delays first render on mobile.
    inlineCss: true,
  },
};

export default nextConfig;
