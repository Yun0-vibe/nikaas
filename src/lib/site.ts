const vercelUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

export const SITE_URL = vercelUrl;

export const SITE = {
  name: "Nikaas Launcher",
  short: "NIKAAS",
  tagline: "Heavy modpacks. Clean pressure.",
  description:
    "Nikaas is a Minecraft: Java Edition launcher for Windows. Play heavy modpacks in isolated chambers, install Fabric, Forge or NeoForge, browse Modrinth mods, and launch with one Release button.",
  version: "v1.0.0",
} as const;