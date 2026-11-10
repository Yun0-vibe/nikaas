"use client";

import { MARQUEE_ITEMS, LOADER_COLORS, type Loader } from "@/lib/data";

export function LoaderMarquee() {
  const group = (hidden: boolean) => (
    <div
      className="flex shrink-0 items-center"
      aria-hidden={hidden || undefined}
    >
      {MARQUEE_ITEMS.map((item, index) => {
        const color = LOADER_COLORS[item as Loader] ?? "#FFB020";
        return (
          <span key={`${item}-${index}`} className="flex items-center">
            <span className="flex items-center gap-2.5 px-6 font-mono text-[11px] tracking-[0.22em] text-steel uppercase transition-colors duration-300 hover:text-bone sm:px-8">
              <span
                className="size-1.5 rotate-45"
                style={{ background: color, boxShadow: `0 0 10px ${color}` }}
              />
              {item}
            </span>
            <span className="h-3 w-px bg-line" />
          </span>
        );
      })}
    </div>
  );

  return (
    <div
      className="marquee relative overflow-hidden border-y border-line bg-gradient-to-r from-forge via-panel/60 to-forge py-4"
      aria-label="Supported loaders and services"
    >
      <div className="marquee-track">
        {group(false)}
        {group(true)}
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg,#06070A 0%,transparent 12%,transparent 88%,#06070A 100%)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}