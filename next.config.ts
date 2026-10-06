import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server for the Docker image (Dockerfile).
  output: "standalone",
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // The app's sign-up screen links to these short Slovenian paths.
      { source: "/pogoji", destination: "/sl/pogoji", permanent: true },
      { source: "/zasebnost", destination: "/sl/zasebnost", permanent: true },
      { source: "/terms-of-use", destination: "/terms", permanent: true },
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
