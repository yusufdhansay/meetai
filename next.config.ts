import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
      return [
        {
          source: "/",
          destination: "/meetings",
          permanent: false,
        },
      ];
  },
};

export default nextConfig;
