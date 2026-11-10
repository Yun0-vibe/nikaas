"use client";

import { motion } from "motion/react";
import { FEATURES } from "@/lib/data";
import { Reveal, SectionHead } from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/console/Icon";

const ICONS: Record<string, IconName> = {
  chamber: "chamber",
  release: "release",
  exhaust: "exhaust",
  catalog: "catalog",
  shield: "shield",
  storage: "storage",
};

export function Features() {
  return (
    <section id="features" className="relative py-20 sm:py-28">
      <div className="container-forge">
        <SectionHead
          eyebrow="03 · The system"
          title="Six parts every modded setup needs."
          lede="A small set of nouns, repeated everywhere. Learn them once and every Minecraft: Java Edition world gets its own clean pressure line."
        />

        <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <Reveal key={feature.num} delay={index * 0.06}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 26 }}
                className="group panel-forge relative flex h-full flex-col overflow-hidden p-5"
              >
                <div
                  className="pointer-events-none absolute -top-20 -right-16 size-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `${feature.accent}24` }}
                />
                <div
                  className="absolute inset-x-0 top-0 h-px opacity-40 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(90deg,transparent,${feature.accent},transparent)`,
                  }}
                />

                <div className="flex items-start justify-between">
                  <span
                    className="grid size-10 place-items-center border transition-colors duration-300"
                    style={{
                      borderColor: `${feature.accent}33`,
                      background: `${feature.accent}0d`,
                      color: feature.accent,
                    }}
                  >
                    <Icon name={ICONS[feature.icon] ?? "chamber"} className="size-5" />
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.18em] text-steel/60">
                    {feature.num}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-[20px] font-semibold text-bone">
                  {feature.title}
                </h3>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed text-[#a9b2be]">
                  {feature.body}
                </p>

                <div className="mt-5 flex items-center gap-2 border-t border-line/80 pt-3">
                  <span
                    className="size-1.5 rotate-45 flex-none"
                    style={{ background: feature.accent }}
                  />
                  <span className="font-mono text-[9.5px] tracking-[0.1em] text-steel uppercase">
                    {feature.tag}
                  </span>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}