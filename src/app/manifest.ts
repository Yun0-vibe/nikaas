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
    background_color: "#06070A",
    theme_color: "#06070A",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}