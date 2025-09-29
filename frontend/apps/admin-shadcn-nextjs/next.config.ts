import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 允许接口可以
  allowedDevOrigins: [
    "http://172.16.31.189:3000",
    "http://localhost:3000",
    "http://172.16.31.189:3002",
    "http://localhost:3002",
    "http://localhost:8080",
    "http://172.16.31.189:8080",
  ],

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
        source: "/admin-api/:path*",
        // destination: "http://111.229.110.163:48080/admin-api/:path*",
        // 尝试一下：nestjs地址： https://gitee.com/node-project-summary/nest-admin-ruoyi.git
        destination: "http://localhost:8080/admin-api/:path*",
      },
    ];
  },
};

export default nextConfig;
