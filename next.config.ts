import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dashly has its own room; the old case-outline URL points there
  async redirects() {
    return [{ source: "/work/dashly", destination: "/dashly", permanent: true }];
  },
};

export default nextConfig;
