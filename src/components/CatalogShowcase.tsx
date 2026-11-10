"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CATALOG, type CatalogCategory } from "@/lib/data";
import { SectionHead, Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/console/Icon";
import { cn, formatCount } from "@/lib/utils";

const FILTERS: Array<CatalogCategory | "All"> = [
  "All",
  "Mod",
  "Shader",
  "Resource pack",
];

const COLOR: Record<CatalogCategory, string> = {
  Mod: "#79E0A5",
  Shader: "#35E0F0",
  "Resource pack": "#FFB020",
};

const STATS = [
  { value: "14", label: "curated entries" },
  { value: "4", label: "loaders matched" },
  { value: "9", label: "game versions" },
  { value: "auto", label: "dependency pull" },
];

export function CatalogShowcase() {
  const [filter, setFilter] = useState<CatalogCategory | "All">("All");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(false);

  const items = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return CATALOG.filter(
      (item) =>
        (filter === "All" || item.category === filter) &&
        (!needle ||
          `${item.name} ${item.author} ${item.summary}`
            .toLowerCase()
            .includes(needle)),
    );
  }, [filter, search]);

  const shown = expanded ? items : items.slice(0, 6);

  return (
    <section id="catalog" className="relative py-20 sm:py-28">
      <div className="container-forge">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            eyebrow="03 · Catalog"
            title="Mods in one click, matched to the chamber."
            lede="Search Modrinth for mods, shaders and resource packs. Every result is checked against the chamber's game version and loader, and required dependencies install with it."
          />
          <Reveal delay={0.1}>
            <a href="#anatomy" className="btn btn-ghost btn-sm">
              Open the console
              <Icon name="arrow" className="size-3" />
            </a>
          </Reveal>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-forge px-4 py-3.5">
              <p className="font-display text-[22px] leading-none font-bold text-volt">
                {stat.value}
              </p>
              <p className="mt-1.5 font-mono text-[9.5px] tracking-[0.14em] text-steel uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <div className="flex flex-wrap gap-1.5">
            {FILTERS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className="chip"
                data-active={filter === item}
              >
                {item}
              </button>
            ))}
          </div>
          <label className="relative ml-auto w-full sm:w-64">
            <Icon
              name="search"
              className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-steel"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Filter the catalog…"
              className="field pl-8"
              aria-label="Filter catalog"
            />
          </label>
        </div>

        <motion.div layout className="mt-3 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence initial={false}>
            {shown.map((item) => {
              const color = COLOR[item.category];
              return (
                <motion.article
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  className="group relative flex flex-col border border-line bg-gradient-to-br from-panel/70 to-forge/80 p-4 transition-colors duration-300 hover:border-linestrong"
                >
                  <span
                    className="absolute inset-x-0 top-0 h-px opacity-60 transition-opacity group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(90deg,transparent,${color}aa,transparent)`,
                    }}
                  />
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="grid size-8 place-items-center border font-display text-[13px] font-semibold"
                        style={{
                          borderColor: `${color}44`,
                          background: `${color}10`,
                          color,
                        }}
                        aria-hidden="true"
                      >
                        {item.name.slice(0, 1)}
                      </span>
                      <div>
                        <h3 className="text-[13.5px] leading-tight font-medium text-bone">
                          {item.name}
                        </h3>
                        <p className="font-mono text-[9.5px] text-steel">
                          {item.author}
                        </p>
                      </div>
                    </div>
                    <span
                      className="font-mono text-[8.5px] tracking-[0.14em] uppercase"
                      style={{ color }}
                    >
                      {item.category}
                    </span>
                  </div>

                  <p className="mt-3 line-clamp-2 text-[11.5px] leading-relaxed text-[#a9b2be]">
                    {item.summary}
                  </p>

                  <div className="mt-auto flex items-center justify-between gap-2 border-t border-line/70 pt-2.5 font-mono text-[9.5px] text-steel">
                    <span className="flex items-center gap-1.5">
                      <Icon name="download" className="size-3" />
                      {formatCount(item.downloads)}
                    </span>
                    <span>{item.sizeMb.toFixed(1)} MB</span>
                    <span className="text-steel/70">
                      {item.loaders.length} loader
                      {item.loaders.length === 1 ? "" : "s"}
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {items.length === 0 ? (
          <div className="mt-3 grid place-items-center border border-dashed border-line px-6 py-12 text-center">
            <p className="text-[13px] text-bone">No catalog entries match</p>
            <button
              type="button"
              onClick={() => {
                setFilter("All");
                setSearch("");
              }}
              className="btn btn-ghost btn-sm mt-3"
            >
              Clear filters
            </button>
          </div>
        ) : null}

        {items.length > 6 ? (
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              className={cn("btn btn-ghost btn-sm")}
            >
              {expanded ? "Show fewer" : `Show all ${items.length}`}
              <Icon
                name="chevron"
                className={cn("size-3 transition-transform", expanded && "rotate-180")}
              />
            </button>
          </div>
        ) : null}

        <p className="mt-5 flex items-start gap-2 font-mono text-[10px] leading-relaxed text-steel/70">
          <Icon name="spark" className="mt-px size-3 flex-none text-magma" />
          Catalog data on this page is a static preview. The launcher queries the
          live Modrinth API, filtered by the selected chamber.
        </p>
      </div>
    </section>
  );
}