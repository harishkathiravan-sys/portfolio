import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  const siteUrl = getSiteUrl();

  return {
    name: "Harish Kathiravan | AI Engineer Portfolio",
    short_name: "Harish Portfolio",
    description: "Portfolio showcasing AI engineering, machine learning, computer vision, and full stack projects.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#050816",
    theme_color: "#050816",
    icons: [
      {
        src: new URL("/icon.svg", siteUrl).toString(),
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}