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
      // Renamed 2026-10-08: the real pet can be adopted or bought.
      { source: "/after-adoption", destination: "/when-it-comes-home", permanent: true },
      { source: "/sl/po-posvojitvi", destination: "/sl/ko-pride-domov", permanent: true },
      // Breed register preview URLs (PR #9, never deployed) → animal register (M5-R11, 2026-10-10).
      { source: "/breeds", destination: "/animals/dogs", permanent: true },
      { source: "/breeds/:breed", destination: "/animals/dogs/:breed", permanent: true },
      { source: "/sl/pasme", destination: "/sl/zivali/psi", permanent: true },
      { source: "/sl/pasme/:breed", destination: "/sl/zivali/psi/:breed", permanent: true },
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
