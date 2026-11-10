import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nikaas — Minecraft Java Edition Launcher",
    short_name: SITE.short,
    description: SITE.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    lang: "en",
    categories: ["games", "utilities"],
    background_color: "#070C09",
    theme_color: "#070C09",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}