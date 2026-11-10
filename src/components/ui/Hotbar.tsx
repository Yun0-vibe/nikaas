import { cn } from "@/lib/utils";

type Item =
  | "pickaxe"
  | "sword"
  | "grass"
  | "diamond"
  | "apple"
  | "torch"
  | "potion"
  | "bread"
  | "pearl";

const ITEMS: Item[] = [
  "pickaxe",
  "sword",
  "grass",
  "diamond",
  "apple",
  "torch",
  "potion",
  "bread",
  "pearl",
];

function Glyph({ item }: { item: Item }) {
  const common = {
    viewBox: "0 0 16 16",
    className: "size-[18px] sm:size-[20px]",
    shapeRendering: "crispEdges" as const,
    "aria-hidden": true,
  };

  switch (item) {
    case "pickaxe":
      return (
        <svg {...common}>
          <rect x="9" y="2" width="5" height="2" fill="#c9ced4" />
          <rect x="7" y="4" width="5" height="2" fill="#9aa0a8" />
          <rect x="8" y="5" width="2" height="2" fill="#b8bdc4" />
          <rect x="3" y="9" width="2" height="2" fill="#8b5a35" />
          <rect x="4" y="8" width="2" height="2" fill="#9a663b" />
          <rect x="5" y="6" width="2" height="2" fill="#8b5a35" />
          <rect x="6" y="5" width="2" height="2" fill="#7c4e2c" />
          <rect x="2" y="10" width="2" height="3" fill="#6d4527" />
        </svg>
      );
    case "sword":
      return (
        <svg {...common}>
          <rect x="10" y="2" width="2" height="2" fill="#d7dbe0" />
          <rect x="9" y="3" width="2" height="2" fill="#b8bdc4" />
          <rect x="8" y="4" width="2" height="2" fill="#9aa0a8" />
          <rect x="7" y="5" width="2" height="2" fill="#b8bdc4" />
          <rect x="6" y="6" width="2" height="2" fill="#9aa0a8" />
          <rect x="4" y="7" width="4" height="2" fill="#6d4527" />
          <rect x="3" y="9" width="2" height="2" fill="#4a2f1a" />
          <rect x="2" y="10" width="2" height="2" fill="#8b5a35" />
        </svg>
      );
    case "grass":
      return (
        <svg {...common}>
          <rect x="2" y="3" width="12" height="3" fill="#7cc355" />
          <rect x="2" y="6" width="12" height="2" fill="#6cae3c" />
          <rect x="2" y="8" width="12" height="5" fill="#8b5a35" />
          <rect x="4" y="3" width="2" height="2" fill="#a9dc7b" />
          <rect x="10" y="9" width="2" height="2" fill="#6d4527" />
        </svg>
      );
    case "diamond":
      return (
        <svg {...common}>
          <path d="M8 2l5 6-5 6-5-6z" fill="#4aedd9" />
          <path d="M8 4l3 4-3 4-3-4z" fill="#a9fff5" opacity=".7" />
          <rect x="7" y="5" width="2" height="2" fill="#ffffff" />
        </svg>
      );
    case "apple":
      return (
        <svg {...common}>
          <rect x="8" y="2" width="2" height="3" fill="#6d4527" />
          <rect x="10" y="3" width="2" height="1" fill="#7cc355" />
          <rect x="4" y="5" width="8" height="8" fill="#e03a2e" />
          <rect x="3" y="6" width="2" height="5" fill="#e03a2e" />
          <rect x="11" y="6" width="2" height="5" fill="#b22b21" />
          <rect x="5" y="6" width="2" height="2" fill="#ff7b6b" />
        </svg>
      );
    case "torch":
      return (
        <svg {...common}>
          <rect x="7" y="6" width="2" height="8" fill="#8b5a35" />
          <rect x="7" y="8" width="2" height="2" fill="#6d4527" />
          <rect x="6" y="2" width="4" height="4" fill="#ffb020" />
          <rect x="7" y="3" width="2" height="2" fill="#ffe7a3" />
        </svg>
      );
    case "potion":
      return (
        <svg {...common}>
          <rect x="7" y="2" width="2" height="3" fill="#6d4527" />
          <rect x="6" y="4" width="4" height="2" fill="#b8bdc4" />
          <rect x="5" y="6" width="6" height="7" fill="#a855f7" />
          <rect x="6" y="10" width="4" height="3" fill="#d8b4fe" />
          <rect x="6" y="7" width="2" height="2" fill="#e9d5ff" />
        </svg>
      );
    case "bread":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="10" height="6" fill="#c98b4b" />
          <rect x="2" y="6" width="2" height="4" fill="#b0763c" />
          <rect x="12" y="6" width="2" height="4" fill="#b0763c" />
          <rect x="5" y="4" width="2" height="2" fill="#d8a86a" />
          <rect x="9" y="7" width="2" height="2" fill="#8b5a35" />
        </svg>
      );
    case "pearl":
      return (
        <svg {...common}>
          <rect x="5" y="3" width="6" height="10" fill="#2fb8ad" />
          <rect x="3" y="5" width="10" height="6" fill="#2fb8ad" />
          <rect x="6" y="5" width="3" height="3" fill="#8ef0e6" />
          <rect x="9" y="9" width="2" height="2" fill="#1d7d76" />
        </svg>
      );
  }
}

export function Hotbar({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex flex-col items-center gap-1.5", className)}
      aria-hidden="true"
    >
      <div className="h-1.5 w-[72%] border border-black/80 bg-[#0d0d0f] p-px">
        <div
          className="h-full bg-gradient-to-r from-[#5aa82f] via-[#7cc355] to-[#a9dc7b]"
          style={{ width: "72%" }}
        />
      </div>
      <div className="flex gap-[2px] border-2 border-[#2b2b2b] bg-black/70 p-[3px] shadow-[0_14px_34px_rgba(0,0,0,.6)]">
        {ITEMS.map((item, index) => (
          <span
            key={item}
            className={cn(
              "relative grid size-[30px] place-items-center border-2 sm:size-[34px]",
              index === 3
                ? "border-white/90 bg-[#3a3a3a]/90 shadow-[0_0_14px_rgba(255,255,255,.22)]"
                : "border-[#4a4a4a]/80 bg-[#2a2a2a]/80",
            )}
          >
            <Glyph item={item} />
            {index === 3 ? (
              <span className="absolute right-0.5 bottom-0 font-pixel text-[7px] leading-none text-white/85">
                12
              </span>
            ) : null}
          </span>
        ))}
      </div>
    </div>
  );
}
