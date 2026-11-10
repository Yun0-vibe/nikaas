"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

export type BlockKind =
  | "grass"
  | "stone"
  | "diamond"
  | "magma"
  | "obsidian"
  | "oak";

const SKINS: Record<
  BlockKind,
  {
    top: string;
    left: string;
    right: string;
    accent: string;
    strip?: { left: string; right: string };
  }
> = {
  grass: {
    top: "#7cc355",
    left: "#8b5a35",
    right: "#6d4527",
    accent: "#a9dc7b",
    strip: { left: "#6cae3c", right: "#5c9633" },
  },
  stone: {
    top: "#a3a9b0",
    left: "#878d95",
    right: "#6b7078",
    accent: "#c2c7cc",
  },
  diamond: {
    top: "#9da3aa",
    left: "#848a92",
    right: "#686e76",
    accent: "#4aedd9",
  },
  magma: {
    top: "#ff8a2a",
    left: "#c94e00",
    right: "#963800",
    accent: "#ffd37a",
  },
  obsidian: {
    top: "#2b2245",
    left: "#1d1732",
    right: "#151024",
    accent: "#7c5cd6",
  },
  oak: {
    top: "#b98f57",
    left: "#9a7243",
    right: "#7c5a33",
    accent: "#d8b57e",
  },
};

export function VoxelBlock({
  kind = "grass",
  className,
}: {
  kind?: BlockKind;
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  const noise = `noise-${id}`;
  const skin = SKINS[kind];
  const showGems = kind === "diamond" || kind === "magma" || kind === "obsidian";

  return (
    <svg
      viewBox="0 0 128 146"
      className={cn("block h-auto w-full", className)}
      aria-hidden="true"
      focusable="false"
      shapeRendering="geometricPrecision"
    >
      <defs>
        <pattern
          id={noise}
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <rect width="10" height="10" fill="transparent" />
          <rect x="0" y="0" width="4" height="4" fill="#ffffff" opacity=".055" />
          <rect x="5" y="5" width="4" height="4" fill="#000000" opacity=".075" />
        </pattern>
      </defs>

      {/* top face */}
      <polygon
        points="64,5 122,34 64,63 6,34"
        fill={skin.top}
        stroke="#0a0c11"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* left face */}
      <polygon
        points="6,34 64,63 64,141 6,112"
        fill={skin.left}
        stroke="#0a0c11"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* right face */}
      <polygon
        points="122,34 64,63 64,141 122,112"
        fill={skin.right}
        stroke="#0a0c11"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {skin.strip ? (
        <>
          <polygon points="6,34 64,63 64,73 6,44" fill={skin.strip.left} />
          <polygon points="122,34 64,63 64,73 122,44" fill={skin.strip.right} />
        </>
      ) : null}

      {kind === "oak" ? (
        <g opacity=".5">
          <polygon points="40,28 64,40 64,42 40,30" fill="#7c5a33" />
          <polygon points="64,40 88,28 88,30 64,42" fill="#7c5a33" />
        </g>
      ) : null}

      {showGems ? (
        <g>
          <polygon points="64,25 74,30 64,35 54,30" fill={skin.accent} />
          <polygon points="64,27 70,30 64,33 58,30" fill="#ffffff" opacity=".55" />
          <polygon points="30,68 40,73 30,78 20,73" fill={skin.accent} />
          <polygon points="96,84 106,89 96,94 86,89" fill={skin.accent} />
          <polygon points="42,104 49,108 42,112 35,108" fill={skin.accent} opacity=".85" />
          <rect x="74" y="112" width="5" height="5" fill={skin.accent} opacity=".7" />
        </g>
      ) : null}

      {kind === "diamond" ? (
        <g fill="#ffffff" opacity=".5">
          <rect x="90" y="60" width="4" height="4" />
          <rect x="20" y="92" width="4" height="4" />
        </g>
      ) : null}

      {kind === "grass" ? (
        <g fill={skin.accent} opacity=".55">
          <rect x="46" y="22" width="6" height="4" />
          <rect x="72" y="34" width="5" height="4" />
          <rect x="88" y="26" width="4" height="4" />
        </g>
      ) : null}

      <polygon
        points="64,5 122,34 64,63 6,34"
        fill={`url(#${noise})`}
        pointerEvents="none"
      />
      <polygon
        points="6,34 64,63 64,141 6,112"
        fill={`url(#${noise})`}
        pointerEvents="none"
      />
      <polygon
        points="122,34 64,63 64,141 122,112"
        fill={`url(#${noise})`}
        pointerEvents="none"
      />

      <path
        d="M64 5v58M6 34l58 29 58-29M64 92v49"
        fill="none"
        stroke="#000000"
        strokeWidth="1"
        opacity=".18"
      />
    </svg>
  );
}
