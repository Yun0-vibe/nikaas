export type ChangeTag = "Added" | "Changed" | "Fixed" | "Store" | "Site";

export type ReleaseNote = {
  version: string;
  date: string;
  label: string;
  title: string;
  summary: string;
  changes: Array<{ tag: ChangeTag; text: string }>;
};

export const RELEASES: ReleaseNote[] = [
  {
    version: "0.9.4",
    date: "2026-11-09",
    label: "Internal build",
    title: "Store preview and a new grass theme",
    summary:
      "The store is now browsable before checkout exists, and the site moved to a moss-and-grass palette with beveled pixel controls.",
    changes: [
      {
        tag: "Store",
        text: "Browsable store preview: 9 sample listings, categories, search, product pages and wishlists.",
      },
      {
        tag: "Site",
        text: "New screenshot tour covering the launcher's Chambers, Console, Store and Accounts screens.",
      },
      {
        tag: "Site",
        text: "Retheme to moss black, grass green and sun gold with Minecraft-style beveled buttons and chips.",
      },
      {
        tag: "Added",
        text: "This update log, with build notes and known issues.",
      },
    ],
  },
  {
    version: "0.9.3",
    date: "2026-10-27",
    label: "Internal build",
    title: "Per-chamber memory and a safer Release",
    summary:
      "Memory is now tuned per world instead of globally, and Release waits for the config pass before starting the game.",
    changes: [
      {
        tag: "Added",
        text: "Memory slider per chamber, with a suggested value based on the installed mod count.",
      },
      {
        tag: "Changed",
        text: "Release now waits for the config pass to finish before launching.",
      },
      {
        tag: "Fixed",
        text: "Stale loader files left behind when switching between NeoForge builds.",
      },
    ],
  },
  {
    version: "0.9.2",
    date: "2026-10-12",
    label: "Internal build",
    title: "Dependency resolver for the catalog",
    summary:
      "Mods that need a companion mod now pull it automatically, and the catalog remembers the chamber's version and loader.",
    changes: [
      {
        tag: "Added",
        text: "Modrinth dependency pull, including Architectury and Fabric API.",
      },
      {
        tag: "Fixed",
        text: "Duplicate jar when a mod ships more than one compatible file.",
      },
      {
        tag: "Changed",
        text: "Catalog filters remember the last version and loader per chamber.",
      },
    ],
  },
  {
    version: "0.9.1",
    date: "2026-09-30",
    label: "Internal build",
    title: "Microsoft sign-in and offline profiles",
    summary:
      "Both account types are in: Microsoft device-code sign-in for online servers, offline profiles for local worlds.",
    changes: [
      {
        tag: "Added",
        text: "Microsoft device-code sign-in with multiple saved accounts.",
      },
      {
        tag: "Added",
        text: "Offline profiles for single-player and LAN worlds.",
      },
      {
        tag: "Fixed",
        text: "Session refresh during long installs.",
      },
    ],
  },
  {
    version: "0.9.0",
    date: "2026-09-14",
    label: "First private alpha",
    title: "Chambers, loaders and the Exhaust log",
    summary:
      "The first end-to-end build: create a chamber, pick Vanilla, Fabric, Forge or NeoForge, install and press Release.",
    changes: [
      {
        tag: "Added",
        text: "Chambers with isolated mods, saves, configs and screenshots.",
      },
      {
        tag: "Added",
        text: "Vanilla, Fabric, Forge and NeoForge installs.",
      },
      {
        tag: "Added",
        text: "The Exhaust feed: downloads, files and readable errors in one place.",
      },
      {
        tag: "Changed",
        text: "Game storage defaults to the drive with the most free space, not C:.",
      },
    ],
  },
];

export const KNOWN_ISSUES = [
  "No auto-updater in 0.9.x — internal builds are replaced by hand.",
  "Store checkout and downloads stay disabled until the first stable build.",
  "macOS and Linux builds are not planned for the first release.",
  "Very large packs (500+ mods) can take a few extra seconds to assemble on first Release.",
] as const;
