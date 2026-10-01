import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/media-to-meaning",
        destination: "/media-to-meaning/index.html",
      },
    ];
  },
};

export default nextConfig;
