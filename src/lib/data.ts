export const NAV_SECTIONS = [
  { id: "anatomy", label: "Console" },
  { id: "features", label: "Features" },
  { id: "catalog", label: "Catalog" },
  { id: "compare", label: "Compare" },
  { id: "faq", label: "FAQ" },
] as const;

export const MARQUEE_ITEMS = [
  "Vanilla",
  "Fabric",
  "Forge",
  "NeoForge",
  "Modrinth catalog",
  "Microsoft sign-in",
  "Offline profiles",
  "Isolated worlds",
] as const;

export type FeatureIcon =
  | "chamber"
  | "release"
  | "exhaust"
  | "catalog"
  | "shield"
  | "storage";

export type Feature = {
  num: string;
  title: string;
  body: string;
  tag: string;
  icon: FeatureIcon;
  accent: string;
};

export const FEATURES: Feature[] = [
  {
    num: "01",
    title: "Chambers",
    body: "Every modpack lives in its own chamber. Mods, worlds, configs, screenshots and resource packs stay separate — no more dragging folders around before a server night.",
    tag: "One folder per world · No mix-ups",
    icon: "chamber",
    accent: "#FF6A00",
  },
  {
    num: "02",
    title: "Release",
    body: "Nikaas installs the correct game version and loader, sets memory, joins your server and launches. Pick Vanilla, Fabric, Forge or NeoForge and press one button.",
    tag: "Vanilla · Fabric · Forge · NeoForge",
    icon: "release",
    accent: "#FFB020",
  },
  {
    num: "03",
    title: "Exhaust",
    body: "Downloads, files and launch errors stream into one live feed. If something goes wrong, you can see exactly where — without digging through folders or guesswork.",
    tag: "Live progress · Readable errors",
    icon: "exhaust",
    accent: "#35E0F0",
  },
  {
    num: "04",
    title: "Catalog",
    body: "Find mods, shaders and resource packs without leaving the launcher. Filter by your game version and loader, and required dependencies come along for the ride.",
    tag: "Mods · Shaders · Resource packs",
    icon: "catalog",
    accent: "#79E0A5",
  },
  {
    num: "05",
    title: "Accounts",
    body: "Sign in with Microsoft for online servers, or use an offline profile for local worlds. Multiple accounts stay saved and ready to switch.",
    tag: "Microsoft · Offline · Multi-account",
    icon: "shield",
    accent: "#FF3B1F",
  },
  {
    num: "06",
    title: "Storage",
    body: "Game files live in their own Nikaas folder on a drive with room to spare. Your existing .minecraft folder is never moved, edited or overwritten.",
    tag: "Separate storage · Shared downloads",
    icon: "storage",
    accent: "#FFE7A3",
  },
];

export const PALETTE = [
  { hex: "#06070A", name: "Matte obsidian", role: "Background field" },
  { hex: "#10141B", name: "Forge black", role: "Raised surface" },
  { hex: "#FF6A00", name: "Magma orange", role: "Primary action" },
  { hex: "#FFB020", name: "Volt amber", role: "Live / warning" },
  { hex: "#FF3B1F", name: "Ember red", role: "Danger / stop" },
  { hex: "#35E0F0", name: "Coolant cyan", role: "Information" },
  { hex: "#79E0A5", name: "Acid green", role: "Verified / success" },
  { hex: "#98A1AE", name: "Steel gray", role: "Cool neutral" },
] as const;

export const LANGUAGE_ROWS = [
  {
    term: "Chamber",
    meaning: "A world with its own mods, saves and settings.",
  },
  {
    term: "Release",
    meaning:
      "The only launch button. It installs what's missing, then starts the game.",
  },
  {
    term: "Exhaust",
    meaning: "The live feed of downloads, files and errors.",
  },
  {
    term: "Catalog",
    meaning:
      "Mods, shaders and resource packs, installed straight into a chamber.",
  },
] as const;

export const FAQ = [
  {
    q: "When can I download Nikaas?",
    a: "Not yet. The first stable build is still being finished. The signed .exe will be posted in the download section when it's ready.",
  },
  {
    q: "Is Nikaas free?",
    a: "Nikaas will be free to download and use. You still need a Minecraft account to play the game.",
  },
  {
    q: "Is Nikaas open source?",
    a: "No. Nikaas is a closed-source desktop application. You install the signed build and use it — there is no repository to clone, nothing to compile and nothing to configure.",
  },
  {
    q: "Which Minecraft versions and loaders are supported?",
    a: "Modern releases and snapshots, with Vanilla, Fabric, Forge and NeoForge. Choose the loader when you create a chamber; Nikaas installs the matching files on first Release.",
  },
  {
    q: "Do I need a Microsoft account?",
    a: "It's optional. Sign in with Microsoft for online servers and Realms, or use an offline profile for local worlds. Multiple accounts can stay saved in the launcher.",
  },
  {
    q: "Will it touch my existing .minecraft folder?",
    a: "No. Nikaas uses its own game storage and keeps each chamber in a separate folder. Your existing .minecraft install is not moved, edited or overwritten.",
  },
  {
    q: "Can I bring my own worlds and mods?",
    a: "Yes. Each chamber has its own saves and mods folders, so you can copy existing worlds or mod files in. The Catalog also installs mods, shaders and resource packs for you.",
  },
  {
    q: "What are the system requirements?",
    a: "Windows 10 or 11 (64-bit) and an internet connection for installs. Keep enough free disk space for your modpacks; Nikaas picks a drive with room instead of assuming C:.",
  },
] as const;

export const DOWNLOAD_FACTS = [
  "Windows 10 / 11 · 64-bit",
  "Installs the game and loaders for you",
  "Microsoft or offline accounts",
  "Separate storage — your .minecraft stays untouched",
] as const;

export const LOADERS = ["Vanilla", "Fabric", "Forge", "NeoForge"] as const;
export type Loader = (typeof LOADERS)[number];

export const LOADER_COLORS: Record<Loader, string> = {
  Vanilla: "#79E0A5",
  Fabric: "#35E0F0",
  Forge: "#FF3B1F",
  NeoForge: "#FF6A00",
};

export const VERSIONS = [
  "1.21.8",
  "1.21.4",
  "1.21.1",
  "1.20.6",
  "1.20.1",
  "1.19.2",
  "1.18.2",
  "1.16.5",
  "25w31a",
] as const;

export const DRIVES = [
  "D:\\Nikaas",
  "E:\\Nikaas",
  "C:\\Users\\You\\Nikaas",
] as const;

export type Chamber = {
  id: string;
  name: string;
  version: string;
  loader: Loader;
  mods: number;
  ram: number;
  played: string;
  sizeGb: number;
  installed: string[];
};

export const SEED_CHAMBERS: Chamber[] = [
  {
    id: "atlas",
    name: "Atlas",
    version: "1.21.1",
    loader: "NeoForge",
    mods: 412,
    ram: 8,
    played: "2h ago",
    sizeGb: 14.2,
    installed: ["create", "jei", "architectury", "distant-horizons"],
  },
  {
    id: "ember",
    name: "Ember",
    version: "1.20.1",
    loader: "Forge",
    mods: 218,
    ram: 6,
    played: "yesterday",
    sizeGb: 9.6,
    installed: ["create", "jei", "xaero"],
  },
  {
    id: "drift",
    name: "Drift",
    version: "1.21.4",
    loader: "Fabric",
    mods: 64,
    ram: 4,
    played: "3d ago",
    sizeGb: 3.1,
    installed: ["sodium", "lithium", "iris", "fabric-api", "modmenu"],
  },
  {
    id: "cinder",
    name: "Cinder",
    version: "1.21.8",
    loader: "Vanilla",
    mods: 0,
    ram: 2,
    played: "never",
    sizeGb: 0.8,
    installed: [],
  },
];

export type CatalogCategory = "Mod" | "Shader" | "Resource pack";

export type CatalogItem = {
  id: string;
  name: string;
  author: string;
  category: CatalogCategory;
  summary: string;
  downloads: number;
  sizeMb: number;
  loaders: Loader[];
  versions: string[];
  dependency?: string;
};

export const CATALOG: CatalogItem[] = [
  {
    id: "sodium",
    name: "Sodium",
    author: "CaffeineMC",
    category: "Mod",
    summary: "Modern rendering engine and frame-rate optimizer.",
    downloads: 48_200_000,
    sizeMb: 1.2,
    loaders: ["Fabric", "NeoForge"],
    versions: ["1.21.8", "1.21.4", "1.21.1", "1.20.1"],
  },
  {
    id: "lithium",
    name: "Lithium",
    author: "CaffeineMC",
    category: "Mod",
    summary: "Server-side game logic optimization, no behavior changes.",
    downloads: 31_400_000,
    sizeMb: 0.7,
    loaders: ["Fabric", "NeoForge"],
    versions: ["1.21.8", "1.21.4", "1.21.1", "1.20.1"],
  },
  {
    id: "iris",
    name: "Iris Shaders",
    author: "coderbot",
    category: "Mod",
    summary: "Shader pack loader built to run alongside Sodium.",
    downloads: 26_900_000,
    sizeMb: 3.4,
    loaders: ["Fabric", "NeoForge"],
    versions: ["1.21.8", "1.21.4", "1.21.1"],
    dependency: "sodium",
  },
  {
    id: "fabric-api",
    name: "Fabric API",
    author: "FabricMC",
    category: "Mod",
    summary: "Essential hooks for mod interoperability on Fabric.",
    downloads: 92_700_000,
    sizeMb: 2.1,
    loaders: ["Fabric"],
    versions: ["1.21.8", "1.21.4", "1.21.1", "1.20.6", "1.20.1"],
  },
  {
    id: "create",
    name: "Create",
    author: "simibubi",
    category: "Mod",
    summary: "Rotational power, conveyor belts and mechanical contraptions.",
    downloads: 44_100_000,
    sizeMb: 18.6,
    loaders: ["Forge", "NeoForge", "Fabric"],
    versions: ["1.21.1", "1.20.1", "1.19.2", "1.18.2"],
  },
  {
    id: "jei",
    name: "Just Enough Items",
    author: "mezz",
    category: "Mod",
    summary: "Recipe and usage lookup for every item in the game.",
    downloads: 128_000_000,
    sizeMb: 1.4,
    loaders: ["Forge", "NeoForge", "Fabric"],
    versions: ["1.21.8", "1.21.4", "1.21.1", "1.20.1", "1.16.5"],
  },
  {
    id: "architectury",
    name: "Architectury API",
    author: "shedaniel",
    category: "Mod",
    summary: "Cross-loader abstraction layer required by many mods.",
    downloads: 57_300_000,
    sizeMb: 0.9,
    loaders: ["Forge", "NeoForge", "Fabric"],
    versions: ["1.21.4", "1.21.1", "1.20.1"],
  },
  {
    id: "ferritecore",
    name: "FerriteCore",
    author: "malte0811",
    category: "Mod",
    summary: "Cuts memory usage of block states and models.",
    downloads: 39_800_000,
    sizeMb: 0.2,
    loaders: ["Forge", "NeoForge", "Fabric"],
    versions: ["1.21.8", "1.21.4", "1.21.1", "1.20.1"],
  },
  {
    id: "xaero",
    name: "Xaero's Minimap",
    author: "xaero96",
    category: "Mod",
    summary: "Fair, vanilla-style minimap with waypoint support.",
    downloads: 61_500_000,
    sizeMb: 1.8,
    loaders: ["Forge", "NeoForge", "Fabric"],
    versions: ["1.21.8", "1.21.4", "1.21.1", "1.20.1"],
  },
  {
    id: "modmenu",
    name: "Mod Menu",
    author: "Prospector",
    category: "Mod",
    summary: "In-game list of installed mods with config screens.",
    downloads: 42_600_000,
    sizeMb: 0.6,
    loaders: ["Fabric"],
    versions: ["1.21.8", "1.21.4", "1.21.1"],
    dependency: "fabric-api",
  },
  {
    id: "complementary",
    name: "Complementary Shaders",
    author: "EminGT",
    category: "Shader",
    summary: "Balanced lighting, volumetric clouds and colored shadows.",
    downloads: 19_400_000,
    sizeMb: 4.7,
    loaders: ["Fabric", "NeoForge", "Forge"],
    versions: ["1.21.8", "1.21.4", "1.21.1", "1.20.1"],
    dependency: "iris",
  },
  {
    id: "bsl",
    name: "BSL Shaders",
    author: "CaptTatsu",
    category: "Shader",
    summary: "Cinematic light bloom with a customizable look.",
    downloads: 14_800_000,
    sizeMb: 3.2,
    loaders: ["Fabric", "NeoForge", "Forge"],
    versions: ["1.21.4", "1.21.1", "1.20.1", "1.16.5"],
    dependency: "iris",
  },
  {
    id: "fresh-animations",
    name: "Fresh Animations",
    author: "FreshLX",
    category: "Resource pack",
    summary: "Dynamic, expressive entity animations.",
    downloads: 11_200_000,
    sizeMb: 0.9,
    loaders: ["Vanilla", "Fabric", "Forge", "NeoForge"],
    versions: ["1.21.8", "1.21.4", "1.21.1", "1.20.1"],
  },
  {
    id: "distant-horizons",
    name: "Distant Horizons",
    author: "James Seibel",
    category: "Mod",
    summary: "Level-of-detail rendering for far-off terrain.",
    downloads: 9_600_000,
    sizeMb: 6.3,
    loaders: ["Forge", "NeoForge", "Fabric"],
    versions: ["1.21.1", "1.20.1", "1.19.2"],
  },
];

export type Account = {
  id: string;
  name: string;
  kind: "Microsoft" | "Offline";
  detail: string;
};

export const SEED_ACCOUNTS: Account[] = [
  {
    id: "steve",
    name: "Steve",
    kind: "Offline",
    detail: "Local worlds only",
  },
  {
    id: "alex",
    name: "Alex",
    kind: "Microsoft",
    detail: "Online servers · Realms",
  },
];

export const CHAMBER_NAMES = [
  "Atlas",
  "Ember",
  "Drift",
  "Cinder",
  "Basalt",
  "Quarry",
  "Vulcan",
  "Sable",
  "Kiln",
  "Obsidian",
] as const;

export const SERVERS = [
  "mc.hypixel.net",
  "play.cubecraft.net",
  "us.mineplex.com",
  "mc.blockdrop.org",
] as const;