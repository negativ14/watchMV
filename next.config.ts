import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
    ],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  experimental: {
    reactCompiler: false,
    optimizePackageImports: ["lucide-react", "sonner"], 
    typedRoutes: true,
    serverActions: { bodySizeLimit: "2mb" },
  },
};

export default nextConfig;
