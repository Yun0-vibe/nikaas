"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Launcher, LogKind } from "@/lib/useLauncher";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

const KIND: Record<LogKind, { color: string; glyph: string }> = {
  info: { color: "#93A79A", glyph: "·" },
  ok: { color: "#86E85A", glyph: "✓" },
  warn: { color: "#FFC94A", glyph: "!" },
  error: { color: "#FF5C3D", glyph: "×" },
  system: { color: "#45E3CF", glyph: "»" },
  live: { color: "#F3FFE8", glyph: "▸" },
};

export function ExhaustLog({ launcher }: { launcher: Launcher }) {
  const { log, prefs, phase } = launcher;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(true);

  const visible = prefs.verbose ? log : log.filter((line) => !line.verbose);

  useEffect(() => {
    if (!prefs.autoScroll || !pinned) return;
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [visible.length, prefs.autoScroll, pinned]);

  return (
    <div className="relative border border-line bg-pitch">
      <div className="flex items-center justify-between gap-3 border-b border-line bg-white/[0.02] px-3 py-2">
        <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-bone uppercase">
          <Icon name="exhaust" className="size-3.5 text-coolant" />
          Exhaust
        </span>
        <span className="flex items-center gap-3">
          <span className="tabular font-mono text-[9.5px] text-steel">
            {visible.length} lines
          </span>
          <span
            className={cn(
              "flex items-center gap-1.5 font-mono text-[9.5px] tracking-[0.18em] uppercase",
              phase === "idle" ? "text-steel" : "text-acid",
            )}
          >
            <span
              className={cn("dot", phase !== "idle" && "animate-pulse")}
              style={{ color: phase === "idle" ? "#4C5563" : "#86E85A" }}
            />
            {phase === "idle" ? "idle" : "live"}
          </span>
        </span>
      </div>

      <div
        ref={scrollRef}
        onScroll={(event) => {
          const node = event.currentTarget;
          setPinned(
            node.scrollHeight - node.scrollTop - node.clientHeight < 28,
          );
        }}
        className="scanlines relative h-[172px] overflow-y-auto px-3 py-2 font-mono text-[11px] leading-[1.85] sm:h-[190px]"
        tabIndex={0}
        role="log"
        aria-label="Exhaust log"
        aria-live="polite"
      >
        {visible.length === 0 ? (
          <p className="py-6 text-center text-[11px] text-steel">
            No lines at this verbosity. Turn on detailed exhaust in the control
            rail.
          </p>
        ) : (
          <AnimatePresence initial={false}>
            {visible.map((line) => {
              const tone = KIND[line.kind];
              return (
                <motion.p
                  key={line.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.22 }}
                  className="flex gap-2 whitespace-pre-wrap break-words"
                >
                  <span className="tabular shrink-0 text-[#4E5765]">{line.t}</span>
                  <span className="shrink-0" style={{ color: tone.color }}>
                    {tone.glyph}
                  </span>
                  <span
                    className={cn(
                      "min-w-0",
                      line.kind === "ok" && "text-[#c6d3cb]",
                      line.kind === "warn" && "text-[#e2cda4]",
                      line.kind === "error" && "text-[#f0bdb0]",
                      line.kind === "system" && "text-[#a9c9d2]",
                      line.kind === "live" && "text-whitehot",
                      line.kind === "info" && "text-[#a7b0bd]",
                    )}
                  >
                    {line.text}
                    {line.kind === "live" && phase === "releasing" ? (
                      <span className="animate-caret ml-1 inline-block h-3 w-1.5 translate-y-px bg-magma" />
                    ) : null}
                  </span>
                </motion.p>
              );
            })}
          </AnimatePresence>
        )}
      </div>

      <AnimatePresence>
        {!pinned ? (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            onClick={() => {
              const node = scrollRef.current;
              if (node) node.scrollTop = node.scrollHeight;
              setPinned(true);
            }}
            className="absolute right-3 bottom-3 flex items-center gap-1.5 border border-magma/60 bg-[#170c04]/95 px-2.5 py-1.5 font-mono text-[9.5px] tracking-[0.16em] text-volt uppercase backdrop-blur-sm transition-colors hover:bg-[#241206]"
          >
            <Icon name="chevron" className="size-3" />
            Jump to live
          </motion.button>
        ) : null}
      </AnimatePresence>
    </div>
  );
}