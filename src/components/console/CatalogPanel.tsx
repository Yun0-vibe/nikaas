"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  CATALOG,
  type CatalogCategory,
  type CatalogItem,
} from "@/lib/data";
import type { Launcher } from "@/lib/useLauncher";
import { cn, formatCount } from "@/lib/utils";
import { Icon } from "./Icon";

const CATEGORIES: Array<CatalogCategory | "All"> = [
  "All",
  "Mod",
  "Shader",
  "Resource pack",
];

const CATEGORY_COLOR: Record<CatalogCategory, string> = {
  Mod: "#86E85A",
  Shader: "#45E3CF",
  "Resource pack": "#FFC94A",
};

export function CatalogPanel({ launcher }: { launcher: Launcher }) {
  const { activeChamber, toggleMod } = launcher;
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CatalogCategory | "All">("All");
  const [compatibleOnly, setCompatibleOnly] = useState(true);
  const [sort, setSort] = useState<"downloads" | "name" | "size">("downloads");

  const items = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return CATALOG.filter((item) => {
      if (category !== "All" && item.category !== category) return false;
      if (
        needle &&
        !`${item.name} ${item.author} ${item.summary}`
          .toLowerCase()
          .includes(needle)
      ) {
        return false;
      }
      if (
        compatibleOnly &&
        activeChamber &&
        !(
          item.loaders.includes(activeChamber.loader) &&
          item.versions.includes(activeChamber.version)
        )
      ) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "size") return b.sizeMb - a.sizeMb;
      return b.downloads - a.downloads;
    });
  }, [query, category, compatibleOnly, sort, activeChamber]);

  const installedCount = activeChamber?.installed.length ?? 0;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <label className="relative min-w-0 flex-1">
          <Icon
            name="search"
            className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-steel"
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search mods, shaders, packs…"
            className="field pl-8"
            aria-label="Search catalog"
          />
        </label>
        <select
          className="field w-auto"
          value={sort}
          onChange={(event) =>
            setSort(event.target.value as "downloads" | "name" | "size")
          }
          aria-label="Sort catalog"
        >
          <option value="downloads">Top downloads</option>
          <option value="name">A – Z</option>
          <option value="size">Largest first</option>
        </select>
      </div>

      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className="chip"
              data-active={category === item}
            >
              {item}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setCompatibleOnly((value) => !value)}
          className={cn(
            "flex items-center gap-1.5 font-mono text-[10px] tracking-[0.1em] uppercase transition-colors",
            compatibleOnly ? "text-acid" : "text-steel hover:text-bone",
          )}
          aria-pressed={compatibleOnly}
        >
          <span
            className="grid size-3.5 place-items-center border"
            style={{
              borderColor: compatibleOnly ? "#86E85A" : "#4C5563",
              background: compatibleOnly ? "rgba(121,224,165,.16)" : "transparent",
            }}
          >
            {compatibleOnly ? (
              <Icon name="check" className="size-2.5" strokeWidth={2.4} />
            ) : null}
          </span>
          Matches {activeChamber ? activeChamber.version : "chamber"}
        </button>
      </div>

      <div className="mt-3 flex items-center justify-between font-mono text-[9.5px] tracking-[0.14em] text-steel uppercase">
        <span>{items.length} results</span>
        <span>{installedCount} installed in chamber</span>
      </div>

      <div className="mt-2 max-h-[318px] space-y-1.5 overflow-y-auto pr-1">
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <CatalogRow
              key={item.id}
              item={item}
              launcher={launcher}
              onToggle={() => toggleMod(item.id)}
            />
          ))}
        </AnimatePresence>

        {items.length === 0 ? (
          <div className="grid place-items-center border border-dashed border-line px-4 py-10 text-center">
            <Icon name="search" className="size-6 text-linestrong" />
            <p className="mt-2.5 text-[12.5px] text-bone">Nothing matches yet</p>
            <p className="mt-1 text-[11px] text-steel">
              Try a different search, or turn off version matching.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("All");
                setCompatibleOnly(false);
              }}
              className="btn btn-ghost btn-sm mt-3"
            >
              Clear filters
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function CatalogRow({
  item,
  launcher,
  onToggle,
}: {
  item: CatalogItem;
  launcher: Launcher;
  onToggle: () => void;
}) {
  const { activeChamber } = launcher;
  const color = CATEGORY_COLOR[item.category];
  const installed = activeChamber?.installed.includes(item.id) ?? false;
  const compatible =
    !!activeChamber &&
    item.loaders.includes(activeChamber.loader) &&
    item.versions.includes(activeChamber.version);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="group flex items-center gap-3 border border-line bg-white/[0.015] px-2.5 py-2 transition-colors hover:border-linestrong hover:bg-white/[0.035]"
    >
      <span
        className="grid size-8 flex-none place-items-center border font-display text-[13px] font-semibold"
        style={{
          borderColor: `${color}44`,
          background: `${color}10`,
          color,
        }}
        aria-hidden="true"
      >
        {item.name.slice(0, 1)}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="truncate text-[12.5px] font-medium text-bone">
            {item.name}
          </span>
          <span
            className="hidden font-mono text-[9px] tracking-[0.12em] uppercase sm:inline"
            style={{ color }}
          >
            {item.category}
          </span>
          {item.dependency ? (
            <span
              className="pill hidden md:inline-flex"
              title={`Requires ${item.dependency}`}
              style={{ borderColor: "rgba(255,176,32,.35)", color: "#FFB020" }}
            >
              dep
            </span>
          ) : null}
        </div>
        <div className="truncate font-mono text-[10px] text-steel">
          {item.author} · {formatCount(item.downloads)} downloads ·{" "}
          {item.sizeMb.toFixed(1)} MB
        </div>
      </div>

      {!compatible ? (
        <span className="hidden font-mono text-[9px] tracking-[0.12em] text-steel/70 uppercase sm:block">
          other version
        </span>
      ) : null}

      <button
        type="button"
        onClick={onToggle}
        disabled={!compatible || !activeChamber}
        aria-label={
          installed ? `Remove ${item.name}` : `Install ${item.name}`
        }
        className={cn(
          "btn btn-sm flex-none",
          installed ? "btn-danger" : "btn-ghost",
        )}
        style={{ padding: "6px 10px", fontSize: "9.5px" }}
      >
        <Icon name={installed ? "trash" : "download"} className="size-3" />
        {installed ? "Remove" : "Install"}
      </button>
    </motion.div>
  );
}