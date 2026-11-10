"use client";

import { LOADER_COLORS } from "@/lib/data";
import type { Launcher } from "@/lib/useLauncher";
import { formatUptime } from "@/lib/utils";
import { Icon } from "./Icon";

export function DeckPanel({ launcher }: { launcher: Launcher }) {
  const { chambers, activeChamber, activeAccount, log, phase, uptime, release, stop } =
    launcher;

  const totalMods = chambers.reduce((sum, chamber) => sum + chamber.mods, 0);
  const totalSize = chambers.reduce((sum, chamber) => sum + chamber.sizeGb, 0);
  const load = activeChamber
    ? Math.min(
        1,
        (activeChamber.mods / 620) * 0.7 + (activeChamber.ram / 16) * 0.3,
      )
    : 0;

  const ring = 2 * Math.PI * 40;
  const recent = [...log].slice(-3).reverse();

  const stats = [
    { label: "Chambers", value: String(chambers.length), color: "#5FCF4A" },
    { label: "Mods mounted", value: String(totalMods), color: "#86E85A" },
    { label: "On disk", value: `${totalSize.toFixed(1)} GB`, color: "#45E3CF" },
    { label: "Account", value: activeAccount?.name ?? "—", color: "#FFC94A" },
  ];

  return (
    <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
      <div className="relative overflow-hidden border border-line bg-gradient-to-br from-panel to-forge p-3.5">
        <div
          className="pointer-events-none absolute -top-14 -right-14 size-40 rounded-full blur-3xl"
          style={{ background: "rgba(95,207,74,.2)" }}
        />
        <div className="flex items-center justify-between">
          <span className="kicker">Live pressure</span>
          <span className="flex items-center gap-1.5 font-mono text-[9.5px] tracking-[0.14em] text-steel uppercase">
            <span
              className="dot"
              style={{ color: phase === "idle" ? "#4C5563" : "#86E85A" }}
            />
            {phase === "idle" ? "idle" : phase === "running" ? "in game" : "releasing"}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-4">
          <div className="relative size-[102px] flex-none">
            <svg viewBox="0 0 100 100" className="size-full -rotate-90">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#1b212b"
                strokeWidth="7"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="url(#pressureRing)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={`${ring * load} ${ring}`}
                style={{ transition: "stroke-dasharray .5s ease" }}
              />
              <defs>
                <linearGradient id="pressureRing" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#F3FFE8" />
                  <stop offset="0.5" stopColor="#5FCF4A" />
                  <stop offset="1" stopColor="#FFC94A" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 grid place-content-center text-center">
              <span className="tabular font-display text-[22px] leading-none font-bold text-whitehot">
                {Math.round(load * 100)}%
              </span>
              <span className="mt-1 font-mono text-[8px] tracking-[0.2em] text-steel">
                LOAD
              </span>
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-[19px] font-semibold text-bone">
              {activeChamber?.name ?? "No chamber"}
            </p>
            <p className="tabular font-mono text-[10px] text-steel">
              {activeChamber
                ? `${activeChamber.loader} ${activeChamber.version} · ${activeChamber.ram} GB`
                : "create one to begin"}
            </p>
            <button
              type="button"
              onClick={phase === "idle" ? release : stop}
              disabled={!activeChamber}
              className={`btn btn-sm mt-2.5 w-full ${
                phase === "idle" ? "btn-primary" : "btn-danger"
              }`}
            >
              <Icon
                name={phase === "idle" ? "release" : "stop"}
                className="size-3"
              />
              {phase === "idle"
                ? "Release"
                : phase === "running"
                  ? `Stop · ${formatUptime(uptime)}`
                  : "Close vent"}
            </button>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-1.5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border border-line/80 bg-white/[0.02] px-2 py-1.5"
            >
              <span className="block font-mono text-[8.5px] tracking-[0.16em] text-steel uppercase">
                {stat.label}
              </span>
              <span
                className="tabular block truncate font-display text-[14px] font-semibold"
                style={{ color: stat.color }}
              >
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="border border-line bg-white/[0.015] p-3">
          <span className="kicker mb-2 block">Storage by chamber</span>
          <div className="space-y-2">
            {chambers.length === 0 ? (
              <p className="text-[11px] text-steel">No chambers sealed yet.</p>
            ) : null}
            {chambers.map((chamber) => {
              const share = totalSize > 0 ? chamber.sizeGb / totalSize : 0;
              const color = LOADER_COLORS[chamber.loader];
              return (
                <div key={chamber.id}>
                  <div className="mb-1 flex items-center justify-between font-mono text-[10px]">
                    <span className="flex items-center gap-1.5 text-bone">
                      <span className="size-1.5 rotate-45" style={{ background: color }} />
                      {chamber.name}
                    </span>
                    <span className="tabular text-steel">
                      {chamber.sizeGb.toFixed(1)} GB
                    </span>
                  </div>
                  <div className="h-1.5 bg-[#171c24]">
                    <div
                      className="h-full transition-[width] duration-500"
                      style={{
                        width: `${Math.max(3, share * 100)}%`,
                        background: `linear-gradient(90deg,${color}88,${color})`,
                        boxShadow: `0 0 10px ${color}55`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="border border-line bg-white/[0.015] p-3">
          <span className="kicker mb-2 block">Recent exhaust</span>
          <div className="space-y-1 font-mono text-[10.5px]">
            {recent.map((line) => (
              <p key={line.id} className="flex gap-2">
                <span className="tabular shrink-0 text-[#4E5765]">{line.t}</span>
                <span className="truncate text-steel">{line.text}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}