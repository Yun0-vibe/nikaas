"use client";

import { DRIVES, SERVERS } from "@/lib/data";
import type { Launcher } from "@/lib/useLauncher";
import { SliderRow, Switch } from "./Controls";
import { Icon } from "./Icon";

export function SettingsPanel({ launcher }: { launcher: Launcher }) {
  const { activeChamber, patchChamber, settings, setSettings } = launcher;

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="space-y-3 border border-line bg-white/[0.015] p-3">
        <span className="flex items-center gap-1.5 font-mono text-[9.5px] tracking-[0.2em] text-steel uppercase">
          <Icon name="chip" className="size-3 text-magma" />
          Memory
        </span>
        <SliderRow
          label="Allocated to chamber"
          value={activeChamber?.ram ?? 2}
          min={1}
          max={16}
          onChange={(value) =>
            activeChamber && patchChamber(activeChamber.id, { ram: value })
          }
          display={`${activeChamber?.ram ?? 2} GB`}
        />
        <p className="text-[10.5px] leading-snug text-steel/80">
          Command-line args are generated per chamber. Java is picked to match
          the game version.
        </p>
        <Switch
          checked={settings.autoJava}
          onChange={(value) => setSettings({ ...settings, autoJava: value })}
          label="Auto Java runtime"
          hint="Download Mojang's matching JRE per version"
        />
        <Switch
          checked={settings.closeOnStart}
          onChange={(value) => setSettings({ ...settings, closeOnStart: value })}
          label="Close launcher on release"
        />
      </div>

      <div className="space-y-3 border border-line bg-white/[0.015] p-3">
        <span className="flex items-center gap-1.5 font-mono text-[9.5px] tracking-[0.2em] text-steel uppercase">
          <Icon name="server" className="size-3 text-coolant" />
          Connection
        </span>
        <label className="block">
          <span className="mb-1 block font-mono text-[11px] text-steel">
            Direct connect server
          </span>
          <input
            value={settings.serverIp}
            onChange={(event) =>
              setSettings({ ...settings, serverIp: event.target.value })
            }
            placeholder="play.example.net"
            className="field"
            aria-label="Direct connect server"
          />
        </label>
        <div className="flex flex-wrap gap-1.5">
          {SERVERS.slice(0, 3).map((server) => (
            <button
              key={server}
              type="button"
              onClick={() => setSettings({ ...settings, serverIp: server })}
              className="chip normal-case"
              data-active={settings.serverIp === server}
            >
              {server}
            </button>
          ))}
        </div>
        <label className="block">
          <span className="mb-1 block font-mono text-[11px] text-steel">
            Game files location
          </span>
          <select
            className="field"
            value={settings.gameDir}
            onChange={(event) =>
              setSettings({ ...settings, gameDir: event.target.value })
            }
            aria-label="Game files location"
          >
            {DRIVES.map((drive) => (
              <option key={drive} value={drive}>
                {drive}
              </option>
            ))}
          </select>
        </label>
        <p className="flex items-start gap-1.5 text-[10.5px] leading-snug text-steel/80">
          <Icon name="folder" className="mt-px size-3 flex-none text-steel" />
          Your existing .minecraft folder is never moved or edited.
        </p>
      </div>

      <div className="border border-line bg-white/[0.015] p-3 sm:col-span-2">
        <span className="mb-1.5 flex items-center gap-1.5 font-mono text-[9.5px] tracking-[0.2em] text-steel uppercase">
          <Icon name="settings" className="size-3 text-volt" />
          Extra JVM arguments
        </span>
        <textarea
          value={settings.jvmArgs}
          onChange={(event) =>
            setSettings({ ...settings, jvmArgs: event.target.value })
          }
          rows={2}
          spellCheck={false}
          className="field resize-y leading-relaxed"
          aria-label="Extra JVM arguments"
        />
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-[9.5px] text-steel/70">
          <span>{settings.jvmArgs.trim().split(/\s+/).filter(Boolean).length} flags</span>
          <span>memory handled by the slider</span>
          <span className="text-acid">no shell interpolation</span>
        </div>
      </div>
    </div>
  );
}