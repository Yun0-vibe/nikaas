"use client";

import { useEffect } from "react";
import { useForgeVisuals } from "@/lib/forgeStore";

export function Ambience() {
  const { glow, grid, scanlines } = useForgeVisuals();

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--forge-glow", String(glow));
    root.style.setProperty("--forge-grid", grid ? "1" : "0");
    root.style.setProperty("--forge-scan", scanlines ? "1" : "0");
  }, [glow, grid, scanlines]);

  return (
    <>
      <div className="ambient" aria-hidden="true" />
      <div className="ambient-grid" aria-hidden="true" />
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="animate-drift absolute -top-40 left-[8%] size-[620px] rounded-full opacity-45 blur-[130px]"
          style={{
            background:
              "radial-gradient(circle, rgba(95,207,74,.2), transparent 66%)",
          }}
        />
        <div
          className="animate-drift absolute top-[46%] -right-40 size-[560px] rounded-full opacity-35 blur-[140px]"
          style={{
            animationDelay: "-9s",
            background:
              "radial-gradient(circle, rgba(53,224,240,.16), transparent 68%)",
          }}
        />
      </div>
      <div className="grain" aria-hidden="true" />
    </>
  );
}