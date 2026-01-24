import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@lobehub/fluent-emoji'],

  // パフォーマンス最適化
  reactStrictMode: true,
  poweredByHeader: false, // X-Powered-By ヘッダーを削除

  // 画像最適化
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
