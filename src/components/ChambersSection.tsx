"use client";

import { motion } from "motion/react";
import { LOADER_COLORS, type Loader } from "@/lib/data";
import { Reveal, SectionHead } from "@/components/ui/Reveal";
import { Icon } from "@/components/console/Icon";

const SHOWCASE: Array<{
  name: string;
  loader: Loader;
  version: string;
  mods: number;
  ram: number;
  size: string;
  load: number;
}> = [
  {
    name: "Atlas",
    loader: "NeoForge",
    version: "1.21.1",
    mods: 412,
    ram: 8,
    size: "14.2 GB",
    load: 86,
  },
  {
    name: "Ember",
    loader: "Forge",
    version: "1.20.1",
    mods: 218,
    ram: 6,
    size: "9.6 GB",
    load: 58,
  },
  {
    name: "Drift",
    loader: "Fabric",
    version: "1.21.4",
    mods: 64,
    ram: 4,
    size: "3.1 GB",
    load: 27,
  },
];

const GUARANTEES = [
  {
    title: "One folder per world",
    body: "Mods, saves, configs, screenshots and resource packs never mix between chambers.",
  },
  {
    title: "Shared downloads",
    body: "Assets and libraries are linked once and reused, so five chambers don't mean five copies.",
  },
  {
    title: "Room to spare",
    body: "Nikaas picks a drive with free space instead of assuming C: is the only option.",
  },
  {
    title: "Your .minecraft stays yours",
    body: "The existing install is never moved, edited or overwritten — Nikaas keeps its own tree.",
  },
];

export function ChambersSection() {
  return (
    <section id="chambers" className="relative py-20 sm:py-28">
      <div className="container-forge grid items-center gap-10 lg:grid-cols-2">
        <div>
          <SectionHead
            eyebrow="05 · Chambers"
            title="Three Minecraft worlds. Zero cross-talk."
            lede="A chamber is a Minecraft world with its own mods, saves and settings. Keep a heavy 412-mod tech pack next to a clean vanilla world and never untangle a folder again."
          />

          <ul className="mt-7 space-y-px overflow-hidden border border-line bg-line">
            {GUARANTEES.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <li className="flex gap-3.5 bg-forge p-4">
                  <span className="mt-0.5 grid size-6 flex-none place-items-center border border-magma/35 bg-magma/10 font-mono text-[9.5px] text-volt">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-[13.5px] font-medium text-bone">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[11.5px] leading-relaxed text-steel">
                      {item.body}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={0.12}>
          <div className="relative">
            <div
              className="pointer-events-none absolute inset-x-6 top-6 bottom-6 rounded-full blur-3xl"
              style={{ background: "rgba(95,207,74,.12)" }}
              aria-hidden="true"
            />
            <div className="relative border border-line bg-[#080a0f]/90 p-4 sm:p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="flex items-center gap-2 font-mono text-[9.5px] tracking-[0.2em] text-steel uppercase">
                  <Icon name="folder" className="size-3.5 text-volt" />
                  D:\Nikaas\chambers
                </span>
                <span className="font-mono text-[9px] tracking-[0.14em] text-acid uppercase">
                  isolated
                </span>
              </div>

              <div className="space-y-2">
                {SHOWCASE.map((chamber, index) => {
                  const color = LOADER_COLORS[chamber.loader];
                  return (
                    <motion.div
                      key={chamber.name}
                      initial={{ opacity: 0, x: 18 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ delay: 0.12 + index * 0.1, duration: 0.5 }}
                      whileHover={{ x: 4 }}
                      className="group relative border border-line bg-gradient-to-r from-panel to-forge p-3 transition-colors hover:border-linestrong"
                    >
                      <span
                        className="absolute inset-y-0 left-0 w-[3px]"
                        style={{ background: color, boxShadow: `0 0 14px ${color}88` }}
                      />
                      <div className="flex items-center justify-between gap-2 pl-2">
                        <div className="flex items-center gap-2">
                          <span
                            className="grid size-7 place-items-center border"
                            style={{
                              borderColor: `${color}44`,
                              background: `${color}12`,
                              color,
                            }}
                          >
                            <Icon name="chamber" className="size-3.5" />
                          </span>
                          <div>
                            <p className="text-[13px] leading-tight font-medium text-bone">
                              {chamber.name}
                            </p>
                            <p className="font-mono text-[9px] text-steel">
                              {chamber.loader} · {chamber.version} · {chamber.mods} mods
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="tabular font-mono text-[10px] text-volt">
                            {chamber.ram} GB
                          </p>
                          <p className="tabular font-mono text-[9px] text-steel">
                            {chamber.size}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 ml-2 h-1 bg-[#171c24]">
                        <div
                          className="h-full"
                          style={{
                            width: `${chamber.load}%`,
                            background: `linear-gradient(90deg,${color}66,${color})`,
                          }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-2 border border-dashed border-linestrong/60 bg-white/[0.02] px-3 py-2.5">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 font-mono text-[9.5px] tracking-[0.14em] text-steel uppercase">
                    <Icon name="storage" className="size-3.5 text-coolant" />
                    Shared assets & libraries
                  </span>
                  <span className="tabular font-mono text-[9.5px] text-coolant">
                    linked once
                  </span>
                </div>
                <p className="mt-1 font-mono text-[9.5px] text-steel/70">
                  junctions · 1,284 assets · 96 libraries · 0 duplicates
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}