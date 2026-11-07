import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  experimental: {
    turbopackRustReactCompiler: true,
  },
  allowedDevOrigins: ["192.168.10.125"],
};

export default nextConfig;
