import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PetPrep",
    short_name: "PetPrep",
    description: "Ready for a pet. There for its whole life.",
    start_url: "/",
    display: "standalone",
    background_color: "#F3F5F2",
    theme_color: "#121614",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
