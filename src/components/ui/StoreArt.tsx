import { useId } from "react";
import { cn } from "@/lib/utils";

function rand(seed: number, n: number) {
  const x = Math.sin(seed * 127.1 + n * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export function StoreArt({
  seed = 1,
  from = "#123B2A",
  to = "#06120C",
  accent = "#6FD64E",
  className,
}: {
  seed?: number;
  from?: string;
  to?: string;
  accent?: string;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const skyId = `sky-${uid}`;
  const glowId = `glow-${uid}`;

  const heights = Array.from({ length: 9 }, (_, i) =>
    Math.round(44 + rand(seed, i + 3) * 24),
  );
  const far =
    "0,110 " +
    heights.map((h, i) => `${(i * 180) / 8},${h - 10}`).join(" ") +
    " 180,110";
  const near =
    "0,110 " +
    heights.map((h, i) => `${(i * 180) / 8},${h + 6}`).join(" ") +
    " 180,110";

  const sunX = 24 + Math.round(rand(seed, 1) * 118);
  const sunY = 14 + Math.round(rand(seed, 2) * 20);

  const stars = Array.from({ length: 16 }, (_, i) => ({
    x: Math.round(rand(seed, 30 + i) * 172) + 3,
    y: Math.round(rand(seed, 60 + i) * 52) + 4,
    size: rand(seed, 90 + i) > 0.74 ? 2 : 1,
  }));

  const ground = Array.from({ length: 18 }, (_, i) => {
    const h = 7 + Math.round(rand(seed, 120 + i) * 16);
    return { x: i * 10, y: 110 - h, h };
  });

  const cubes = Array.from({ length: 3 }, (_, i) => ({
    x: 20 + Math.round(rand(seed, 160 + i) * 130),
    y: 30 + Math.round(rand(seed, 180 + i) * 30),
    size: 5 + Math.round(rand(seed, 200 + i) * 5),
  }));

  return (
    <svg
      viewBox="0 0 180 110"
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={skyId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
        <radialGradient id={glowId} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={accent} stopOpacity="0.55" />
          <stop offset="1" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="180" height="110" fill={`url(#${skyId})`} />

      {stars.map((star, i) => (
        <rect
          key={`s-${i}`}
          x={star.x}
          y={star.y}
          width={star.size}
          height={star.size}
          fill="#F3FFE8"
          opacity={0.32 + rand(seed, 220 + i) * 0.4}
        />
      ))}

      <circle cx={sunX + 7} cy={sunY + 7} r="20" fill={`url(#${glowId})`} />
      <rect x={sunX} y={sunY} width="14" height="14" fill={accent} opacity="0.92" />
      <rect x={sunX + 5} y={sunY + 5} width="4" height="4" fill="#F3FFE8" opacity="0.85" />

      <polygon points={far} fill="#07100B" opacity="0.72" />
      <polygon points={near} fill="#0A160F" opacity="0.92" />

      {ground.map((block, i) => (
        <rect
          key={`g-${i}`}
          x={block.x}
          y={block.y}
          width="10"
          height={block.h}
          fill={i % 3 === 0 ? accent : "#12261A"}
          opacity={i % 3 === 0 ? 0.5 : 0.92}
        />
      ))}
      <rect x="0" y="103" width="180" height="7" fill={accent} opacity="0.22" />

      {cubes.map((cube, i) => (
        <g key={`c-${i}`} opacity="0.85">
          <rect
            x={cube.x}
            y={cube.y}
            width={cube.size}
            height={cube.size}
            fill={accent}
            opacity="0.65"
          />
          <rect
            x={cube.x + 1}
            y={cube.y + 1}
            width={cube.size - 2}
            height={cube.size - 2}
            fill="#0B110D"
            opacity="0.45"
          />
        </g>
      ))}
    </svg>
  );
}
