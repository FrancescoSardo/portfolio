import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/projects/gemini-workers",
        destination: "/projects/antigravity-workers",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
