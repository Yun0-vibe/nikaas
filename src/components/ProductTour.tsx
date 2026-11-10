"use client";

import { useState, type ReactElement } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { SEED_ACCOUNTS, SEED_CHAMBERS, STORE_ITEMS } from "@/lib/data";
import { Icon, type IconName } from "@/components/console/Icon";
import { ForgeMark } from "@/components/ui/ForgeMark";
import { StoreArt } from "@/components/ui/StoreArt";
import { Reveal, SectionHead } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type TabId = "chambers" | "console" | "store" | "accounts";

const TABS: Array<{ id: TabId; label: string; note: string }> = [
  {
    id: "chambers",
    label: "Chambers",
    note: "Every world keeps its own mods, saves and settings. Pick one, press Release.",
  },
  {
    id: "console",
    label: "Console",
    note: "The Exhaust feed streams downloads, files and errors while the chamber installs.",
  },
  {
    id: "store",
    label: "Store",
    note: "The in-launcher store mirrors the web preview: browse packs, worlds, shaders and cosmetics.",
  },
  {
    id: "accounts",
    label: "Accounts",
    note: "Microsoft sign-in for online servers, offline profiles for local worlds, both saved.",
  },
];

const SIDEBAR: Array<{ label: string; icon: IconName; tab?: TabId }> = [
  { label: "Home", icon: "deck", tab: "console" },
  { label: "Chambers", icon: "chamber", tab: "chambers" },
  { label: "Store", icon: "catalog", tab: "store" },
  { label: "Accounts", icon: "user", tab: "accounts" },
  { label: "Settings", icon: "settings" },
];

function Sidebar({ active }: { active: TabId }) {
  return (
    <aside className="flex flex-col gap-1 border-r-2 border-black/40 bg-[#0b120e] p-2 sm:p-2.5">
      <div className="mb-2 flex items-center gap-2 px-1 sm:px-1.5">
        <ForgeMark className="size-5 flex-none" />
        <span className="hidden font-display text-[10px] font-bold tracking-[0.16em] text-bone sm:block">
          NIKAAS
        </span>
      </div>
      {SIDEBAR.map((item) => (
        <div
          key={item.label}
          className={cn(
            "flex items-center gap-2 px-1.5 py-1.5 font-mono text-[9px] tracking-[0.06em] uppercase sm:text-[9.5px]",
            item.tab === active
              ? "border border-grass/40 bg-grass/10 text-grass"
              : "border border-transparent text-steel",
          )}
        >
          <Icon name={item.icon} className="size-3.5 flex-none" />
          <span className="hidden sm:block">{item.label}</span>
        </div>
      ))}
      <div className="mt-auto hidden items-center gap-2 border-t border-line/70 px-1.5 pt-2 sm:flex">
        <span className="grid size-6 place-items-center border border-line bg-black/30 font-pixel text-[8px] text-bone">
          S
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[9px] text-bone">Steve</span>
          <span className="block font-mono text-[7.5px] text-steel">
            OFFLINE
          </span>
        </span>
      </div>
    </aside>
  );
}

function ShotHeader({
  title,
  meta,
  action,
}: {
  title: string;
  meta: string;
  action?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="min-w-0">
        <p className="truncate font-display text-[14px] font-semibold text-bone">
          {title}
        </p>
        <p className="font-mono text-[8px] tracking-[0.14em] text-steel uppercase">
          {meta}
        </p>
      </div>
      {action ? (
        <span className="btn btn-primary btn-sm scale-90">{action}</span>
      ) : null}
    </div>
  );
}

function ChambersScreen() {
  return (
    <div className="flex h-full flex-col gap-3">
      <ShotHeader title="Chambers" meta="4 worlds · 1 running" action="New" />
      <div className="grid flex-1 gap-2.5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-1.5">
          {SEED_CHAMBERS.slice(0, 3).map((chamber, index) => (
            <div
              key={chamber.id}
              className={cn(
                "flex items-center gap-2 border-2 p-1.5 sm:p-2",
                index === 0
                  ? "border-grass/60 bg-grass/[0.08]"
                  : "border-line bg-black/20",
              )}
            >
              <div className="h-10 w-14 flex-none overflow-hidden border border-black/50">
                <StoreArt
                  seed={index + 2}
                  from={index === 0 ? "#1E3B24" : index === 1 ? "#3A2114" : "#182C3E"}
                  to="#0A0F0B"
                  accent={index === 0 ? "#6FD64E" : index === 1 ? "#FF5C3D" : "#45E3CF"}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-medium text-bone">
                  {chamber.name}
                </p>
                <p className="font-mono text-[8px] text-steel">
                  {chamber.version} · {chamber.loader} · {chamber.mods} mods
                </p>
              </div>
              {index === 0 ? (
                <span className="hidden font-pixel text-[6.5px] text-grass sm:block">
                  READY
                </span>
              ) : null}
            </div>
          ))}
        </div>

        <div className="border-2 border-line bg-black/25 p-2.5">
          <div className="flex items-start gap-2.5">
            <div className="h-16 w-20 flex-none overflow-hidden border border-black/50">
              <StoreArt seed={7} from="#213A1E" to="#070F0A" accent="#FFC94A" />
            </div>
            <div className="min-w-0">
              <p className="font-display text-[16px] leading-none font-semibold text-bone">
                Atlas
              </p>
              <p className="mt-1 font-mono text-[8px] text-steel">
                NEOFORGE · 1.21.1
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1">
                <span className="pill">412 mods</span>
                <span className="pill">8 GB</span>
              </div>
            </div>
          </div>

          <div className="mt-2.5 grid grid-cols-2 gap-px border border-line bg-line font-mono">
            {[
              ["PLAYED", "2h ago"],
              ["SIZE", "14.2 GB"],
              ["LAST BUILD", "ok"],
              ["SHADERS", "Lumen"],
            ].map(([key, value]) => (
              <div key={key} className="bg-[#0c130f] px-2 py-1.5">
                <p className="text-[7px] tracking-[0.12em] text-steel">{key}</p>
                <p className="text-[9px] text-bone">{value}</p>
              </div>
            ))}
          </div>

          <div className="btn btn-primary mt-2.5 w-full py-2 text-[9px]">
            Release
            <Icon name="release" className="size-3" />
          </div>
          <div className="btn btn-ghost mt-1.5 w-full py-1.5 text-[8px]">
            Open folder
          </div>
        </div>
      </div>
    </div>
  );
}

const LOG_LINES: Array<[string, string, string]> = [
  ["06:41:02", "#86E85A", "Minecraft 1.21.1 verified"],
  ["06:41:04", "#45E3CF", "Resolving NeoForge 21.1.172"],
  ["06:41:09", "#F3FFE8", "Downloading 412 mods · 318/412"],
  ["06:41:17", "#FFC94A", "Missing dependency · architectury"],
  ["06:41:18", "#86E85A", "Architectury pulled from catalog"],
  ["06:41:24", "#45E3CF", "Assembling chamber Atlas"],
  ["06:41:29", "#6FD64E", "Ready — press Release"],
];

function ConsoleScreen() {
  return (
    <div className="flex h-full flex-col gap-2.5">
      <ShotHeader title="Home · Exhaust" meta="Live feed · Atlas" action="Release" />
      <div className="grid flex-1 gap-2.5 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="border-2 border-line bg-[#050a07] p-2.5 font-mono">
          <div className="mb-1.5 flex items-center justify-between text-[7.5px] tracking-[0.14em] text-steel uppercase">
            <span className="flex items-center gap-1.5">
              <span className="pulse-dot" />
              LIVE
            </span>
            <span>1.21.1 / NEOFORGE</span>
          </div>
          <div className="space-y-1">
            {LOG_LINES.map(([time, color, line]) => (
              <p key={time} className="flex gap-1.5 text-[8.5px] leading-relaxed">
                <span className="flex-none text-steel/60">{time}</span>
                <span className="min-w-0 truncate" style={{ color }}>
                  {line}
                </span>
              </p>
            ))}
          </div>
          <div className="mt-2 space-y-1.5 border-t border-line/70 pt-2">
            {[
              ["NeoForge 21.1.172", 78],
              ["Sodium 0.6.13", 100],
              ["Atlas config pack", 46],
            ].map(([label, pct]) => (
              <div key={label as string}>
                <div className="flex justify-between text-[7.5px] text-steel">
                  <span>{label}</span>
                  <span className="tabular">{pct}%</span>
                </div>
                <div className="mt-0.5 h-1.5 border border-black/60 bg-[#0b120e]">
                  <div
                    className="h-full bg-gradient-to-r from-grass to-volt"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-px border border-line bg-line font-mono">
            {[
              ["PRESSURE", "94%"],
              ["RAM", "8 GB"],
              ["FPS TARGET", "165"],
              ["MODS", "412"],
            ].map(([key, value]) => (
              <div key={key} className="bg-[#0c130f] px-2 py-2">
                <p className="text-[7px] tracking-[0.1em] text-steel">{key}</p>
                <p className="text-[11px] text-bone">{value}</p>
              </div>
            ))}
          </div>
          <div className="border-2 border-line bg-black/25 p-2.5">
            <p className="font-mono text-[7.5px] tracking-[0.12em] text-steel uppercase">
              Memory 8 / 12 GB
            </p>
            <div className="mt-1.5 h-2 border border-black/60 bg-[#0b120e]">
              <div
                className="h-full"
                style={{
                  width: "67%",
                  background: "linear-gradient(90deg,#45E3CF,#5FCF4A,#FFC94A)",
                }}
              />
            </div>
            <p className="mt-2 text-[8px] leading-relaxed text-steel">
              Auto-tuned for 412 mods. Change it per chamber.
            </p>
          </div>
          <div className="btn btn-primary mt-auto w-full py-2 text-[9px]">
            Release
            <Icon name="release" className="size-3" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StoreScreen() {
  return (
    <div className="flex h-full flex-col gap-2.5">
      <ShotHeader title="Store" meta="Preview · checkout at launch" />
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="chip" data-active="true">
          All
        </span>
        <span className="chip">Modpacks</span>
        <span className="chip">Worlds</span>
        <span className="chip">Shaders</span>
        <span className="ml-auto flex items-center gap-1.5 border border-line bg-black/30 px-2 py-1 font-mono text-[8px] text-steel">
          <Icon name="search" className="size-2.5" />
          Search store…
        </span>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-4">
        {STORE_ITEMS.slice(0, 4).map((item, index) => (
          <div
            key={item.id}
            className="flex flex-col border-2 border-line bg-black/25"
          >
            <div className="h-16 overflow-hidden border-b-2 border-black/40 sm:h-20">
              <StoreArt
                seed={index + 4}
                from={item.art.from}
                to={item.art.to}
                accent={item.art.accent}
              />
            </div>
            <div className="flex flex-1 flex-col p-1.5">
              <p className="truncate text-[9px] font-medium text-bone">
                {item.name}
              </p>
              <p className="font-mono text-[7px] text-steel uppercase">
                {item.category}
              </p>
              <p className="mt-auto pt-1 font-mono text-[8px] text-volt">
                {item.price === 0 ? "Free" : `$${item.price.toFixed(2)}`}
              </p>
            </div>
          </div>
        ))}
      </div>
      <p className="border border-volt/25 bg-volt/[0.06] px-2 py-1.5 font-mono text-[8px] text-volt">
        Browsing is open. Checkout unlocks with the launcher at release.
      </p>
    </div>
  );
}

function AccountsScreen() {
  return (
    <div className="flex h-full flex-col gap-2.5">
      <ShotHeader title="Accounts" meta="2 saved · 1 online" />
      <div className="grid gap-2 sm:grid-cols-2">
        {SEED_ACCOUNTS.map((account, index) => (
          <div
            key={account.id}
            className={cn(
              "border-2 p-2.5",
              index === 1
                ? "border-grass/55 bg-grass/[0.07]"
                : "border-line bg-black/25",
            )}
          >
            <div className="flex items-center gap-2">
              <span
                className="grid size-9 place-items-center font-pixel text-[12px]"
                style={{
                  background:
                    account.kind === "Microsoft"
                      ? "linear-gradient(135deg,#FFC94A,#5FCF4A)"
                      : "#1c2a21",
                  color: account.kind === "Microsoft" ? "#07120a" : "#EAF2E7",
                }}
              >
                {account.name.slice(0, 1)}
              </span>
              <div className="min-w-0">
                <p className="truncate text-[11px] text-bone">{account.name}</p>
                <p className="font-mono text-[8px] text-steel">
                  {account.kind} · {account.detail}
                </p>
              </div>
            </div>
            <div className="mt-2 flex gap-1">
              <span className="pill">{index === 1 ? "active" : "saved"}</span>
              <span className="pill">skins on</span>
            </div>
          </div>
        ))}
      </div>
      <div className="border-2 border-dashed border-line bg-black/20 p-2.5">
        <p className="font-mono text-[8px] tracking-[0.12em] text-steel uppercase">
          Microsoft sign-in · device code
        </p>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="border border-line bg-[#050a07] px-2 py-1 font-mono text-[13px] tracking-[0.2em] text-volt">
            K7Q2-9M4X
          </span>
          <span className="font-mono text-[8px] text-steel">
            waiting for approval…
          </span>
        </div>
      </div>
      <div className="btn btn-ghost mt-auto w-full py-2 text-[9px]">
        <Icon name="plus" className="size-3" />
        Add account
      </div>
    </div>
  );
}

const SCREENS: Record<TabId, () => ReactElement> = {
  chambers: ChambersScreen,
  console: ConsoleScreen,
  store: StoreScreen,
  accounts: AccountsScreen,
};

export function ProductTour() {
  const [active, setActive] = useState<TabId>("chambers");
  const reduced = useReducedMotion();
  const Screen = SCREENS[active];
  const note = TABS.find((tab) => tab.id === active)?.note ?? "";

  return (
    <section id="tour" className="relative py-20 sm:py-24">
      <div className="container-forge">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            eyebrow="01 · Inside the launcher"
            title="See every screen before you install."
            lede="No mystery meat. These are the real layouts the launcher ships with — chambers, the live Exhaust console, the store and accounts."
          />
          <Reveal delay={0.08}>
            <a href="#anatomy" className="btn btn-ghost btn-sm">
              Try the console
              <Icon name="arrow" className="size-3" />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-8">
          <div
            role="tablist"
            aria-label="Launcher screens"
            className="flex flex-wrap gap-1.5"
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`shot-tab-${tab.id}`}
                aria-selected={active === tab.id}
                aria-controls="shot-panel"
                onClick={() => setActive(tab.id)}
                className="chip"
                data-active={active === tab.id}
              >
                {tab.label}
              </button>
            ))}
            <span className="ml-auto hidden items-center gap-2 self-center font-mono text-[9px] tracking-[0.14em] text-steel uppercase sm:flex">
              <span className="pulse-dot" />
              Launcher UI · live render
            </span>
          </div>

          <div
            className="relative mt-4"
            aria-live="polite"
          >
            <div
              className="pointer-events-none absolute -inset-5 opacity-70 blur-3xl"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 20%, rgba(95,207,74,.18), transparent 68%)",
              }}
              aria-hidden="true"
            />
            <div
              id="shot-panel"
              role="tabpanel"
              aria-labelledby={`shot-tab-${active}`}
              className="relative overflow-hidden border-2 border-linestrong/70 bg-[#0a110d] shadow-[0_30px_80px_rgba(0,0,0,.65)]"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 18px 100%, 0 calc(100% - 18px))",
              }}
            >
              <div className="flex items-center justify-between border-b-2 border-black/50 bg-[#121c15] px-3 py-2">
                <div className="flex min-w-0 items-center gap-2">
                  <ForgeMark className="size-4 flex-none" />
                  <span className="font-display text-[9px] font-bold tracking-[0.18em] text-bone">
                    NIKAAS
                  </span>
                  <span className="truncate font-mono text-[8.5px] text-steel">
                    / {TABS.find((tab) => tab.id === active)?.label}
                  </span>
                </div>
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="size-2.5 border border-line bg-[#1b2a21]" />
                  <span className="size-2.5 border border-line bg-[#1b2a21]" />
                  <span className="size-2.5 border border-line bg-ember/70" />
                </div>
              </div>

              <div
                className="pointer-events-none grid min-h-[420px] grid-cols-[52px_1fr] sm:grid-cols-[172px_1fr]"
                aria-hidden="true"
              >
                <Sidebar active={active} />
                <div className="bg-[#0c130f] p-2.5 sm:p-4">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={active}
                      initial={reduced ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduced ? undefined : { opacity: 0, y: -6 }}
                      transition={{ duration: 0.22 }}
                      className="h-full"
                    >
                      <Screen />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-3 font-mono text-[10px] leading-relaxed text-steel">
            <span className="text-grass">↳</span> {note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
