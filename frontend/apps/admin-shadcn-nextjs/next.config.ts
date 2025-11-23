import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // serverExternalPackages: ["@mastra/*"],
  /* config options here */
  typescript: {
    // 危险：允许构建通过，即使存在类型错误
    ignoreBuildErrors: true, // 适用于 Turbopack 和传统构建[1](@ref)
  },
  /* config options here */
  async rewrites() {
    return [
      {
        // 若依的后端接口
        // TODO:配置接口nestjs
        source: "/admin-api/:path*",
        destination: "http://localhost:8080/admin-api/:path*",
      },
    ];
  },
};

export default nextConfig;
