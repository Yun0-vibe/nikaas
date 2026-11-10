export const NAV_SECTIONS = [
  { id: "tour", label: "Screens" },
  { id: "anatomy", label: "Console" },
  { id: "store", label: "Store" },
  { id: "faq", label: "FAQ" },
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
    accent: "#5FCF4A",
  },
  {
    num: "02",
    title: "Release",
    body: "Nikaas installs the correct game version and loader, sets memory, joins your server and launches. Pick Vanilla, Fabric, Forge or NeoForge and press one button.",
    tag: "Vanilla · Fabric · Forge · NeoForge",
    icon: "release",
    accent: "#FFC94A",
  },
  {
    num: "03",
    title: "Exhaust",
    body: "Downloads, files and launch errors stream into one live feed. If something goes wrong, you can see exactly where — without digging through folders or guesswork.",
    tag: "Live progress · Readable errors",
    icon: "exhaust",
    accent: "#45E3CF",
  },
  {
    num: "04",
    title: "Catalog",
    body: "Find mods, shaders and resource packs without leaving the launcher. Filter by your game version and loader, and required dependencies come along for the ride.",
    tag: "Mods · Shaders · Resource packs",
    icon: "catalog",
    accent: "#86E85A",
  },
  {
    num: "05",
    title: "Accounts",
    body: "Sign in with Microsoft for online servers, or use an offline profile for local worlds. Multiple accounts stay saved and ready to switch.",
    tag: "Microsoft · Offline · Multi-account",
    icon: "shield",
    accent: "#FF5C3D",
  },
  {
    num: "06",
    title: "Storage",
    body: "Game files live in their own Nikaas folder on a drive with room to spare. Your existing .minecraft folder is never moved, edited or overwritten.",
    tag: "Separate storage · Shared downloads",
    icon: "storage",
    accent: "#F3FFE8",
  },
];

export const PALETTE = [
  { hex: "#070C09", name: "Moss obsidian", role: "Background field" },
  { hex: "#101813", name: "Deep moss", role: "Raised surface" },
  { hex: "#5FCF4A", name: "Grass green", role: "Primary action" },
  { hex: "#FFC94A", name: "Sun gold", role: "Live / warning" },
  { hex: "#FF5C3D", name: "Lava red", role: "Danger / stop" },
  { hex: "#45E3CF", name: "Diamond cyan", role: "Information" },
  { hex: "#86E85A", name: "Acid green", role: "Verified / success" },
  { hex: "#93A79A", name: "Stone gray", role: "Cool neutral" },
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
    q: "What is Nikaas?",
    a: "Nikaas is a third-party Minecraft: Java Edition launcher for Windows. It keeps every modpack in its own chamber, installs Fabric, Forge or NeoForge, and launches the game with one Release button.",
  },
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
  {
    q: "Is Nikaas an official Minecraft launcher?",
    a: "No. Nikaas is an independent, third-party launcher for Minecraft: Java Edition. It is not affiliated with or endorsed by Mojang Studios or Microsoft. A valid Minecraft account is still required to play.",
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
  Vanilla: "#86E85A",
  Fabric: "#45E3CF",
  Forge: "#FF5C3D",
  NeoForge: "#FFA03C",
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

export type StoreCategory =
  | "Modpack"
  | "World"
  | "Shader pack"
  | "Resource pack"
  | "Cosmetic";

export type StoreItem = {
  id: string;
  name: string;
  creator: string;
  category: StoreCategory;
  price: number;
  rating: number;
  reviews: number;
  downloads: number;
  summary: string;
  description: string;
  highlights: string[];
  versions: string[];
  loader: Loader | "Any";
  sizeMb: number;
  tag?: "Featured" | "New" | "Staff pick";
  art: { from: string; to: string; accent: string };
};

export const STORE_ITEMS: StoreItem[] = [
  {
    id: "ashen-reach",
    name: "Ashen Reach",
    creator: "Nikaas Studio",
    category: "Modpack",
    price: 0,
    rating: 4.9,
    reviews: 1840,
    downloads: 41_600,
    summary:
      "A ruined overworld, rebuilt by hand. Create engineering, dungeon runs and a slow-burn story in one chamber.",
    description:
      "Ashen Reach drops you into an overworld that already ended once. Rebuild the rail network, relight the ashen capital and dig into three hand-built dungeon wings. The pack ships with a tuned Create progression, quest book, custom ambience and a shader preset that keeps the ash palette readable at night.",
    highlights: [
      "412 curated mods, no overlapping recipes",
      "Hand-built quest book with 60+ chapters",
      "Custom Create progression from copper to trains",
      "Includes Lumen shader preset, tuned for ash nights",
    ],
    versions: ["1.21.1"],
    loader: "NeoForge",
    sizeMb: 1240,
    tag: "Featured",
    art: { from: "#2B3128", to: "#0C0F0C", accent: "#FFB74A" },
  },
  {
    id: "verdant-depths",
    name: "Verdant Depths",
    creator: "Mossbank",
    category: "Modpack",
    price: 4.99,
    rating: 4.8,
    reviews: 921,
    downloads: 18_300,
    summary:
      "A lush-cave expedition pack with glowing flora, deep pressure and a base that grows with you.",
    description:
      "Verdant Depths turns the underground into the main event. Bioluminescent caves, slow-growing tree roots and a pressure system that rewards building down instead of out. Performance is tuned for mid-range laptops, with Sodium, Lithium and a trimmed shader list.",
    highlights: [
      "218 mods with a lightweight client footprint",
      "Rebuilt cave biomes and glowing flora",
      "Progressive base building with pressure rewards",
      "Runs well on 6 GB of allocated RAM",
    ],
    versions: ["1.20.1"],
    loader: "Forge",
    sizeMb: 860,
    art: { from: "#123B2A", to: "#06120C", accent: "#6FD64E" },
  },
  {
    id: "cinderfall",
    name: "Cinderfall",
    creator: "Hollowworks",
    category: "World",
    price: 2.99,
    rating: 4.7,
    reviews: 604,
    downloads: 12_800,
    summary:
      "A four-hour adventure map across a burning valley, with custom bosses and a hidden fifth ending.",
    description:
      "Cinderfall is a hand-built adventure map for one to three players. Cross the burning valley, restore four beacons and decide what happens to the survivors. No mods required — the pack installs the map, a resource pack and a compatible version into its own chamber.",
    highlights: [
      "4–5 hours of hand-built story",
      "Custom bosses using vanilla mechanics",
      "Hidden fifth ending for completionists",
      "No mods required — vanilla compatible",
    ],
    versions: ["1.21.4"],
    loader: "Vanilla",
    sizeMb: 320,
    art: { from: "#4A1D14", to: "#120604", accent: "#FF5C3D" },
  },
  {
    id: "lumen-shaders",
    name: "Lumen Shaders",
    creator: "Duskline",
    category: "Shader pack",
    price: 3.49,
    rating: 4.9,
    reviews: 2640,
    downloads: 33_400,
    summary:
      "Soft volumetric light, readable nights and a custom ash preset tuned for modded worlds.",
    description:
      "Lumen is a shader pack built to stay readable while you play. Nights keep their shadow detail, cave light doesn't blow out, and the included presets cover survival, screenshots and low-end hardware. Works with Iris on Fabric and NeoForge.",
    highlights: [
      "Three presets: Survival, Cinematic, Low-end",
      "Readable cave and night lighting",
      "Colored shadows and volumetric clouds",
      "Iris-ready, no extra mod needed",
    ],
    versions: ["1.21.8", "1.21.4", "1.21.1", "1.20.1"],
    loader: "Any",
    sizeMb: 12,
    tag: "Staff pick",
    art: { from: "#1B2A4A", to: "#080B14", accent: "#45E3CF" },
  },
  {
    id: "dawnlight-ui",
    name: "Dawnlight UI",
    creator: "Pixelcrush",
    category: "Resource pack",
    price: 0,
    rating: 4.6,
    reviews: 1380,
    downloads: 26_900,
    summary:
      "A clean 16× interface pack: readable containers, pocket-friendly hotbars and quiet tooltips.",
    description:
      "Dawnlight UI reworks the interface without touching blocks or mobs. Containers get clearer slots, tooltips lose the clutter, and hotbar items stay legible against bright terrain. Safe to stack with most world resource packs.",
    highlights: [
      "16× interface-only textures",
      "Clearer containers and tooltips",
      "Works alongside world texture packs",
      "Light and dark variants included",
    ],
    versions: ["1.21.8", "1.21.4", "1.21.1", "1.20.1"],
    loader: "Any",
    sizeMb: 8,
    art: { from: "#3A2C14", to: "#100C05", accent: "#FFC94A" },
  },
  {
    id: "capy-crate",
    name: "Capy Crate",
    creator: "Softpond",
    category: "Cosmetic",
    price: 1.99,
    rating: 4.4,
    reviews: 486,
    downloads: 7_400,
    summary:
      "Capes, hats and backpacks for your character — cosmetic only, visible on Nikaas servers.",
    description:
      "A small crate of character cosmetics: four capes, three hats, two backpacks and a capybara shoulder pet. Nothing affects gameplay, and every item can be toggled per chamber so screenshots stay clean.",
    highlights: [
      "9 cosmetic items, no gameplay effect",
      "Toggle per chamber",
      "Visible in multiplayer on Nikaas",
      "Works with both account types",
    ],
    versions: ["1.21.8", "1.21.4", "1.21.1", "1.20.1"],
    loader: "Any",
    sizeMb: 4,
    art: { from: "#4A3A22", to: "#14100A", accent: "#D8A86A" },
  },
  {
    id: "glacierbound",
    name: "Glacierbound",
    creator: "Northline",
    category: "Modpack",
    price: 5.99,
    rating: 4.8,
    reviews: 742,
    downloads: 14_100,
    summary:
      "A cold-weather survival pack: heat management, ice ships and a world that never fully thaws.",
    description:
      "Glacierbound is a survival pack built around temperature, travel and small settlements. Insulate a base, build an ice ship and follow the thaw line north. Fabric-based, with a hand-picked mod list and a low-memory server preset included.",
    highlights: [
      "164 Fabric mods, tested together",
      "Heat and insulation survival systems",
      "Buildable ice ships and sleds",
      "Server preset included",
    ],
    versions: ["1.21.8"],
    loader: "Fabric",
    sizeMb: 980,
    tag: "New",
    art: { from: "#1C3350", to: "#071019", accent: "#A9E8FF" },
  },
  {
    id: "basalt-beats",
    name: "Basalt Beats",
    creator: "Lowfire",
    category: "Cosmetic",
    price: 1.49,
    rating: 4.5,
    reviews: 312,
    downloads: 4_800,
    summary:
      "A 24-track ambient soundtrack for caves, night builds and long mining sessions.",
    description:
      "Basalt Beats replaces the ambient music pool with 24 original tracks recorded for slow play. The pack ships with separate cave, night and menu playlists, and a volume control that lives in the launcher's audio settings.",
    highlights: [
      "24 original ambient tracks",
      "Separate cave, night and menu playlists",
      "Volume controlled from the launcher",
      "No mods required",
    ],
    versions: ["1.21.8", "1.21.4", "1.21.1", "1.20.1"],
    loader: "Any",
    sizeMb: 96,
    art: { from: "#2B1B3E", to: "#0B0712", accent: "#C48BFF" },
  },
  {
    id: "hollow-crown",
    name: "The Hollow Crown",
    creator: "Hollowworks",
    category: "World",
    price: 0,
    rating: 4.7,
    reviews: 968,
    downloads: 21_500,
    summary:
      "A free, one-hour puzzle world inside a sunken castle. Find the crown, lose the throne.",
    description:
      "A compact puzzle world set in a half-sunken castle. Nine rooms, one crown and no combat — built for a quiet evening. Free to keep, and it installs into its own chamber with the matching version.",
    highlights: [
      "9 hand-built puzzle rooms",
      "No combat, single-player friendly",
      "Free with any Nikaas account",
      "Installs into its own chamber",
    ],
    versions: ["1.21.1"],
    loader: "Vanilla",
    sizeMb: 140,
    art: { from: "#2A2A3E", to: "#0A0A12", accent: "#FFC94A" },
  },
];

export const STORE_CATEGORIES = [
  "All",
  "Modpack",
  "World",
  "Shader pack",
  "Resource pack",
  "Cosmetic",
] as const;
