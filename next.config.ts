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
  typedRoutes: true,
  experimental: {
    reactCompiler: false,
    serverActions: { bodySizeLimit: "2mb" },
    optimizePackageImports: ["lucide-react", "sonner"],
  },
};

export default nextConfig;
