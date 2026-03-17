import type { NextConfig } from "next";

const serverActionAllowedOrigins = (
  process.env.NEXT_SERVER_ACTIONS_ALLOWED_ORIGINS ??
  "192.162.69.149:8086,127.0.0.1:8086,localhost:8086"
)
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "clsjafljnrgolrwbtbmr.supabase.co",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // ex: 5mb, 10mb, 20mb
      allowedOrigins: serverActionAllowedOrigins,
    },
  },
};

export default nextConfig;
