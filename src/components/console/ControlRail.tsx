"use client";

import { useForgeVisuals, forgeStore } from "@/lib/forgeStore";
import { LOADERS, VERSIONS, type Loader } from "@/lib/data";
import type { Launcher } from "@/lib/useLauncher";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";
import { RailGroup, SelectRow, SliderRow, Stepper, Switch } from "./Controls";
import { Icon } from "./Icon";

function RailButton({
  children,
  onClick,
  tone = "ghost",
}: {
  children: React.ReactNode;
  onClick: () => void;
  tone?: "ghost" | "danger";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-1 items-center justify-center gap-1.5 border px-2 py-2 font-mono text-[10px] tracking-[0.1em] uppercase transition-colors",
        tone === "danger"
          ? "border-ember/40 text-[#f0bdb0] hover:bg-ember/15"
          : "border-line text-steel hover:border-linestrong hover:bg-white/[0.04] hover:text-bone",
      )}
    >
      {children}
    </button>
  );
}

export function ControlRail({ launcher }: { launcher: Launcher }) {
  const {
    activeChamber,
    patchChamber,
    prefs,
    setPrefs,
    randomize,
    reset,
    logText,
  } = launcher;
  const visuals = useForgeVisuals();
  const { push } = useToast();

  const exportLog = () => {
    const blob = new Blob([logText, "\n"], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `nikaas-exhaust-${(activeChamber?.name ?? "console").toLowerCase()}.log`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    push({
      title: "Exhaust exported",
      message: `${logText.split("\n").length} lines written to a .log file`,
      tone: "ok",
    });
  };

  return (
    <aside className="panel-forge seam-top xl:sticky xl:top-[calc(var(--header-h)+18px)]">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-bone uppercase">
          <Icon name="settings" className="size-3.5 text-magma" />
          Control rail
        </span>
        <span className="font-mono text-[9px] tracking-[0.14em] text-acid uppercase">
          live
        </span>
      </div>

      <RailGroup title="Chamber">
        <SelectRow
          label="Loader"
          value={activeChamber?.loader ?? "Vanilla"}
          options={LOADERS}
          onChange={(value) =>
            activeChamber && patchChamber(activeChamber.id, { loader: value as Loader })
          }
        />
        <SelectRow
          label="Game version"
          value={activeChamber?.version ?? VERSIONS[0]}
          options={VERSIONS}
          onChange={(value) =>
            activeChamber && patchChamber(activeChamber.id, { version: value })
          }
        />
        <SliderRow
          label="Memory"
          value={activeChamber?.ram ?? 2}
          min={1}
          max={16}
          onChange={(value) =>
            activeChamber && patchChamber(activeChamber.id, { ram: value })
          }
          display={`${activeChamber?.ram ?? 2} GB`}
        />
      </RailGroup>

      <RailGroup title="Exhaust">
        <Stepper
          label="Speed"
          value={prefs.speed}
          min={0.5}
          max={4}
          step={0.5}
          onChange={(value) => setPrefs({ ...prefs, speed: value })}
          display={`${prefs.speed}×`}
        />
        <Switch
          checked={prefs.verbose}
          onChange={(value) => setPrefs({ ...prefs, verbose: value })}
          label="Detailed lines"
          hint="Show per-file resolution steps"
        />
        <Switch
          checked={prefs.autoScroll}
          onChange={(value) => setPrefs({ ...prefs, autoScroll: value })}
          label="Auto-scroll"
        />
      </RailGroup>

      <RailGroup title="Forge">
        <SliderRow
          label="Glow"
          value={visuals.glow}
          min={0}
          max={1.6}
          step={0.05}
          onChange={(value) => forgeStore.set({ glow: value })}
          display={`${Math.round(visuals.glow * 100)}%`}
        />
        <SliderRow
          label="Embers"
          value={visuals.embers}
          min={0}
          max={1.4}
          step={0.05}
          onChange={(value) => forgeStore.set({ embers: value })}
          display={`${Math.round(visuals.embers * 100)}%`}
        />
        <Switch
          checked={visuals.grid}
          onChange={(value) => forgeStore.set({ grid: value })}
          label="Grid overlay"
        />
        <Switch
          checked={visuals.scanlines}
          onChange={(value) => forgeStore.set({ scanlines: value })}
          label="Scanlines"
        />
      </RailGroup>

      <RailGroup title="Session">
        <div className="flex gap-1.5">
          <RailButton onClick={randomize}>
            <Icon name="dice" className="size-3" />
            Roll
          </RailButton>
          <RailButton onClick={reset} tone="danger">
            <Icon name="reset" className="size-3" />
            Reset
          </RailButton>
        </div>
        <RailButton onClick={exportLog}>
          <Icon name="download" className="size-3" />
          Export log
        </RailButton>
      </RailGroup>

      <p className="border-t border-line px-4 py-3 text-[10px] leading-relaxed text-steel/75">
        Every control drives the console on the left. Forge sliders change the
        whole page.
      </p>
    </aside>
  );
}