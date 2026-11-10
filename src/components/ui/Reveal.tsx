"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { VoxelBlock } from "@/components/ui/VoxelBlock";

export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "0px 0px -70px 0px", amount: 0.15 }}
      transition={{
        duration: 0.72,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lede,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal
      className={
        align === "center"
          ? "mx-auto max-w-2xl text-center"
          : "max-w-2xl"
      }
    >
      <p className="eyebrow">
        <VoxelBlock kind="grass" className="w-3.5 shrink-0" />
        {eyebrow}
      </p>
      <h2 className="mt-4 text-[clamp(28px,4.4vw,46px)] text-bone">{title}</h2>
      {lede ? <p className="lede mt-4">{lede}</p> : null}
    </Reveal>
  );
}