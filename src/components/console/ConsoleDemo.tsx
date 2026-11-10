"use client";

import { AnimatePresence, motion } from "motion/react";
import type { ConsoleTab } from "@/lib/useLauncher";
import { useLauncher, type Launcher } from "@/lib/useLauncher";
import { formatUptime } from "@/lib/utils";
import { ForgeMark } from "@/components/ui/ForgeMark";
import { Reveal, SectionHead } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { ControlRail } from "./ControlRail";
import { ExhaustLog } from "./ExhaustLog";
import { DeckPanel } from "./DeckPanel";
import { ChambersPanel } from "./ChambersPanel";
import { CatalogPanel } from "./CatalogPanel";
import { AccountsPanel } from "./AccountsPanel";
import { SettingsPanel } from "./SettingsPanel";
import { Icon, type IconName } from "./Icon";

const TABS: Array<{ id: ConsoleTab; label: string; icon: IconName; kicker: string }> = [
  { id: "deck", label: "Deck", icon: "deck", kicker: "Overview" },
  { id: "chambers", label: "Chambers", icon: "chamber", kicker: "Workspace" },
  { id: "catalog", label: "Catalog", icon: "catalog", kicker: "Modrinth" },
  { id: "accounts", label: "Accounts", icon: "shield", kicker: "Identity" },
  { id: "settings", label: "Settings", icon: "settings", kicker: "Config" },
];

function ConsoleWindow({ launcher }: { launcher: Launcher }) {
  const {
    tab,
    setTab,
    activeChamber,
    activeAccount,
    chambers,
    phase,
    progress,
    uptime,
    statusLabel,
    release,
    stop,
  } = launcher;

  const current = TABS.find((item) => item.id === tab) ?? TABS[0];
  const totalSize = chambers.reduce((sum, chamber) => sum + chamber.sizeGb, 0);

  return (
    <div
      className="relative overflow-hidden border border-linestrong/70 bg-forge/95 shadow-forge"
      style={{
        clipPath:
          "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
      }}
    >
      <div className="flex items-center gap-3 border-b border-line bg-gradient-to-b from-panel2/80 to-panel/60 px-3 py-2.5">
        <span className="flex items-center gap-1.5" aria-hidden="true">
          <i className="block size-2.5 rounded-full bg-ember/80" />
          <i className="block size-2.5 rounded-full bg-volt/80" />
          <i className="block size-2.5 rounded-full bg-acid/80" />
        </span>
        <span className="truncate font-mono text-[9.5px] tracking-[0.22em] text-steel uppercase">
          Nikaas // Control deck
        </span>
        <span className="ml-auto flex items-center gap-2">
          <span
            className={cn(
              "pill",
              phase === "idle"
                ? "text-steel"
                : phase === "running"
                  ? "text-acid"
                  : "text-volt",
            )}
          >
            <span
              className={cn("dot", phase !== "idle" && "animate-pulse")}
              style={{
                color:
                  phase === "idle"
                    ? "#4C5563"
                    : phase === "running"
                      ? "#86E85A"
                      : "#FFB020",
              }}
            />
            {phase === "idle" ? "standby" : phase === "running" ? "in game" : "venting"}
          </span>
          <span className="hidden font-mono text-[9px] tracking-[0.14em] text-steel sm:block">
            v1.0.0
          </span>
        </span>
      </div>

      <div className="flex min-h-[540px]">
        <aside className="hidden w-[176px] flex-none flex-col border-r border-line bg-[#080a0f]/80 md:flex">
          <div className="flex items-center gap-2 border-b border-line/80 px-3 py-3">
            <ForgeMark className="size-6" />
            <span className="font-display text-[11px] font-bold tracking-[0.18em] text-bone">
              NIKAAS
            </span>
          </div>

          <nav className="p-2" aria-label="Console sections">
            {TABS.map((item) => {
              const active = tab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative mb-0.5 flex w-full items-center gap-2.5 px-2.5 py-2 text-left font-mono text-[10.5px] tracking-[0.1em] uppercase transition-colors",
                    active
                      ? "text-whitehot"
                      : "text-steel hover:bg-white/[0.03] hover:text-bone",
                  )}
                >
                  {active ? (
                    <motion.span
                      layoutId="console-nav"
                      className="absolute inset-0 border border-magma/35 bg-magma/10"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  ) : null}
                  <Icon
                    name={item.icon}
                    className={cn(
                      "relative size-3.5",
                      active ? "text-magma" : "text-steel",
                    )}
                  />
                  <span className="relative">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-auto border-t border-line/80 p-2.5">
            <div className="flex items-center gap-2">
              <span
                className="grid size-7 flex-none place-items-center font-display text-[12px] font-bold"
                style={{
                  background: "linear-gradient(135deg,#FFC94A,#5FCF4A)",
                  color: "#07120a",
                  clipPath:
                    "polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 7px 100%, 0 calc(100% - 7px))",
                }}
                aria-hidden="true"
              >
                {(activeAccount?.name ?? "?").slice(0, 1).toUpperCase()}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[11px] text-bone">
                  {activeAccount?.name ?? "No account"}
                </span>
                <span className="block truncate font-mono text-[8.5px] text-steel">
                  {activeAccount?.kind ?? "—"} profile
                </span>
              </span>
            </div>
            <div className="mt-2.5 border border-line/70 bg-black/20 px-2 py-1.5">
              <div className="flex items-center justify-between font-mono text-[8.5px] text-steel">
                <span>STORAGE</span>
                <span className="tabular">{totalSize.toFixed(1)} GB</span>
              </div>
              <div className="mt-1 h-1 bg-[#171c24]">
                <div
                  className="h-full bg-gradient-to-r from-magma to-volt"
                  style={{ width: `${Math.min(100, totalSize * 4)}%` }}
                />
              </div>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex gap-1 overflow-x-auto border-b border-line bg-[#080a0f]/60 p-1.5 no-scrollbar md:hidden">
            {TABS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={cn(
                  "flex flex-none items-center gap-1.5 px-2.5 py-1.5 font-mono text-[9.5px] tracking-[0.1em] uppercase transition-colors",
                  tab === item.id
                    ? "bg-magma/15 text-whitehot"
                    : "text-steel hover:text-bone",
                )}
              >
                <Icon name={item.icon} className="size-3" />
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-end justify-between gap-2 px-3.5 pt-3.5">
            <div>
              <span className="kicker">{current.kicker}</span>
              <h4 className="mt-0.5 font-display text-[20px] font-semibold text-bone">
                {current.label}
              </h4>
            </div>
            <span className="pill">
              {activeChamber
                ? `${activeChamber.name} · ${activeChamber.loader}`
                : "no chamber"}
            </span>
          </div>

          <div className="flex-1 px-3.5 py-3">
            {!activeChamber && tab !== "chambers" ? (
              <div className="grid h-full min-h-[258px] place-items-center border border-dashed border-line px-6 text-center">
                <div>
                  <Icon name="chamber" className="mx-auto size-7 text-linestrong" />
                  <p className="mt-2 text-[13px] text-bone">No chamber selected</p>
                  <p className="mt-1 text-[11px] text-steel">
                    Seal a chamber to unlock this panel.
                  </p>
                  <button
                    type="button"
                    onClick={() => setTab("chambers")}
                    className="btn btn-ghost btn-sm mt-3"
                  >
                    Open chambers
                  </button>
                </div>
              </div>
            ) : (
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  {tab === "deck" ? <DeckPanel launcher={launcher} /> : null}
                  {tab === "chambers" ? <ChambersPanel launcher={launcher} /> : null}
                  {tab === "catalog" ? <CatalogPanel launcher={launcher} /> : null}
                  {tab === "accounts" ? <AccountsPanel launcher={launcher} /> : null}
                  {tab === "settings" ? <SettingsPanel launcher={launcher} /> : null}
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          <div className="px-3.5">
            <ExhaustLog launcher={launcher} />
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-line bg-[#080a0f]/70 px-3.5 py-2.5">
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2 font-mono text-[9.5px]">
                <span className="truncate text-steel">{statusLabel}</span>
                <span className="tabular flex-none text-volt">
                  {phase === "running"
                    ? formatUptime(uptime)
                    : `${Math.round(progress * 100)}%`}
                </span>
              </div>
              <div className="relative mt-1.5 h-1.5 overflow-hidden bg-[#171c24]">
                <motion.div
                  className="absolute inset-y-0 left-0"
                  animate={{ width: `${progress * 100}%` }}
                  transition={{ duration: 0.25 }}
                  style={{
                    background:
                      "linear-gradient(90deg,#45E3CF,#5FCF4A 45%,#FFC94A)",
                    boxShadow: "0 0 12px rgba(95,207,74,.75)",
                  }}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={phase === "idle" ? release : stop}
              disabled={!activeChamber}
              className={cn(
                "btn btn-sm min-w-[132px]",
                phase === "idle" ? "btn-primary" : "btn-danger",
              )}
            >
              <Icon
                name={phase === "idle" ? "release" : phase === "running" ? "stop" : "close"}
                className="size-3.5"
              />
              {phase === "idle"
                ? "Release"
                : phase === "running"
                  ? `Stop · ${formatUptime(uptime)}`
                  : "Close vent"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ConsoleDemo() {
  const launcher = useLauncher();

  return (
    <section id="anatomy" className="relative py-20 sm:py-28">
      <div className="container-forge">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            eyebrow="02 · The console"
            title="A vent, not a clutter drawer."
            lede="Every surface has a job in a modded Minecraft setup. Chambers hold the worlds. The Exhaust holds the truth. Release is the only button that matters."
          />
          <Reveal delay={0.1}>
            <p className="flex items-center gap-2 border border-line bg-white/[0.03] px-3 py-2 font-mono text-[9.5px] tracking-[0.16em] text-steel uppercase">
              <span className="pulse-dot" />
              Interactive preview · it actually runs
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.08} className="mt-8">
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_296px]">
            <div className="min-w-0">
              <ConsoleWindow launcher={launcher} />
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {[
                  {
                    num: "01",
                    title: "Chambers",
                    body: "keep every world's mods, saves and settings separate.",
                  },
                  {
                    num: "02",
                    title: "Exhaust",
                    body: "shows every download and launch as it happens.",
                  },
                  {
                    num: "03",
                    title: "Release",
                    body: "installs what's missing, then starts the game.",
                  },
                ].map((note) => (
                  <div
                    key={note.num}
                    className="flex gap-2.5 border border-line/80 bg-white/[0.015] p-3"
                  >
                    <span className="font-mono text-[10px] text-magma">
                      {note.num}
                    </span>
                    <p className="text-[11.5px] leading-snug text-steel">
                      <b className="font-medium text-bone">{note.title}</b>{" "}
                      {note.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <ControlRail launcher={launcher} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}