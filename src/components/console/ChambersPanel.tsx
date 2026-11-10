"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  LOADERS,
  LOADER_COLORS,
  VERSIONS,
  type Chamber,
  type Loader,
} from "@/lib/data";
import type { Launcher } from "@/lib/useLauncher";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

function ChamberCard({
  chamber,
  launcher,
}: {
  chamber: Chamber;
  launcher: Launcher;
}) {
  const {
    activeId,
    setActiveId,
    phase,
    release,
    deleteChamber,
    renameChamber,
    patchChamber,
  } = launcher;
  const active = chamber.id === activeId;
  const color = LOADER_COLORS[chamber.loader];
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(chamber.name);

  const commit = () => {
    setEditing(false);
    if (draft.trim() && draft.trim() !== chamber.name) {
      renameChamber(chamber.id, draft);
    } else {
      setDraft(chamber.name);
    }
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.18 } }}
      transition={{ type: "spring", stiffness: 320, damping: 30 }}
      onClick={() => !editing && setActiveId(chamber.id)}
      className={cn(
        "group relative cursor-pointer overflow-hidden border p-3.5 transition-colors duration-200",
        active
          ? "border-magma/70 bg-gradient-to-br from-[#1a1109] to-[#0a0c11]"
          : "border-line bg-gradient-to-br from-panel to-forge hover:border-linestrong",
      )}
      style={{
        clipPath:
          "polygon(0 0, calc(100% - 13px) 0, 100% 13px, 100% 100%, 13px 100%, 0 calc(100% - 13px))",
        boxShadow: active
          ? "0 0 0 1px rgba(95,207,74,.18), 0 14px 34px rgba(95,207,74,.14)"
          : "0 8px 22px rgba(0,0,0,.32)",
      }}
    >
      {active ? (
        <span
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg,transparent,#FFC94A,#5FCF4A,transparent)",
          }}
          aria-hidden="true"
        />
      ) : null}

      <div className="flex items-start justify-between gap-2">
        <span className="flex items-center gap-2">
          <span
            className="grid size-6 place-items-center border"
            style={{
              borderColor: `${color}66`,
              background: `${color}14`,
              color,
            }}
          >
            <Icon name="chamber" className="size-3.5" />
          </span>
          <span
            className="pill"
            style={{ borderColor: `${color}55`, color }}
          >
            {chamber.loader}
          </span>
        </span>

        <span className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
          <button
            type="button"
            aria-label={`Rename ${chamber.name}`}
            onClick={(event) => {
              event.stopPropagation();
              setDraft(chamber.name);
              setEditing(true);
            }}
            className="grid size-6 place-items-center text-steel transition-colors hover:text-volt"
          >
            <Icon name="pencil" className="size-3.5" />
          </button>
          <button
            type="button"
            aria-label={`Delete ${chamber.name}`}
            onClick={(event) => {
              event.stopPropagation();
              deleteChamber(chamber.id);
            }}
            className="grid size-6 place-items-center text-steel transition-colors hover:text-ember"
          >
            <Icon name="trash" className="size-3.5" />
          </button>
        </span>
      </div>

      {editing ? (
        <input
          autoFocus
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onClick={(event) => event.stopPropagation()}
          onBlur={commit}
          onKeyDown={(event) => {
            if (event.key === "Enter") commit();
            if (event.key === "Escape") {
              setDraft(chamber.name);
              setEditing(false);
            }
          }}
          maxLength={22}
          aria-label="Chamber name"
          className="field mt-2.5 py-1 font-display text-[15px]"
        />
      ) : (
        <h5 className="mt-2.5 truncate font-display text-[17px] font-semibold text-bone">
          {chamber.name}
        </h5>
      )}

      <p className="tabular mt-0.5 font-mono text-[10.5px] text-steel">
        {chamber.version} · {chamber.mods} mods
      </p>

      <div className="mt-3">
        <div className="mb-1 flex items-center justify-between font-mono text-[9.5px] text-steel">
          <span>{chamber.ram} GB allocated</span>
          <span className="tabular">{chamber.sizeGb} GB on disk</span>
        </div>
        <input
          type="range"
          min={1}
          max={16}
          step={1}
          value={chamber.ram}
          aria-label={`Memory for ${chamber.name}`}
          onClick={(event) => event.stopPropagation()}
          onChange={(event) =>
            patchChamber(chamber.id, { ram: Number(event.target.value) })
          }
          className="slider h-4"
          style={
            {
              "--fill": `${((chamber.ram - 1) / 15) * 100}%`,
            } as React.CSSProperties
          }
        />
      </div>

      <div className="mt-2 flex items-center justify-between gap-2 border-t border-line/70 pt-2.5">
        <span className="font-mono text-[9.5px] tracking-[0.1em] text-steel uppercase">
          {chamber.played}
        </span>
        {active ? (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              release();
            }}
            disabled={phase !== "idle"}
            className={cn(
              "btn btn-sm",
              phase === "running" ? "btn-danger" : "btn-primary",
            )}
          >
            {phase === "running" ? "Running" : "Release"}
            <Icon
              name={phase === "running" ? "spark" : "release"}
              className="size-3"
            />
          </button>
        ) : (
          <span className="font-mono text-[9.5px] tracking-[0.16em] text-steel/70 uppercase">
            Idle
          </span>
        )}
      </div>
    </motion.article>
  );
}

export function ChambersPanel({ launcher }: { launcher: Launcher }) {
  const { chambers, createChamber } = launcher;
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [version, setVersion] = useState<string>(VERSIONS[2]);
  const [loader, setLoader] = useState<Loader>("Fabric");
  const [error, setError] = useState<string | null>(null);

  const submit = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Give the chamber a name.");
      return;
    }
    if (
      chambers.some(
        (chamber) => chamber.name.toLowerCase() === trimmed.toLowerCase(),
      )
    ) {
      setError("A chamber with that name already exists.");
      return;
    }
    createChamber({ name: trimmed, version, loader });
    setName("");
    setError(null);
    setCreating(false);
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="font-mono text-[10px] tracking-[0.16em] text-steel uppercase">
          {chambers.length} chamber{chambers.length === 1 ? "" : "s"} · click to
          select
        </p>
        <button
          type="button"
          onClick={() => {
            setCreating((value) => !value);
            setError(null);
          }}
          className="btn btn-ghost btn-sm"
          aria-expanded={creating}
        >
          <Icon name={creating ? "close" : "plus"} className="size-3" />
          {creating ? "Cancel" : "New chamber"}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {creating ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mb-3 border border-magma/40 bg-magma/[0.06] p-3">
              <div className="grid gap-2.5 sm:grid-cols-[1.4fr_1fr_1fr_auto]">
                <label className="block">
                  <span className="kicker mb-1 block">Name</span>
                  <input
                    autoFocus
                    value={name}
                    maxLength={22}
                    placeholder="Basalt"
                    onChange={(event) => {
                      setName(event.target.value);
                      setError(null);
                    }}
                    onKeyDown={(event) => event.key === "Enter" && submit()}
                    className="field"
                    aria-label="New chamber name"
                  />
                </label>
                <label className="block">
                  <span className="kicker mb-1 block">Version</span>
                  <select
                    className="field"
                    value={version}
                    onChange={(event) => setVersion(event.target.value)}
                    aria-label="New chamber version"
                  >
                    {VERSIONS.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="kicker mb-1 block">Loader</span>
                  <select
                    className="field"
                    value={loader}
                    onChange={(event) => setLoader(event.target.value as Loader)}
                    aria-label="New chamber loader"
                  >
                    {LOADERS.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={submit}
                    className="btn btn-primary btn-sm w-full sm:w-auto"
                  >
                    <Icon name="check" className="size-3" />
                    Seal
                  </button>
                </div>
              </div>
              {error ? (
                <p className="mt-2 flex items-center gap-1.5 font-mono text-[10.5px] text-ember">
                  <Icon name="close" className="size-3" />
                  {error}
                </p>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {chambers.length === 0 ? (
        <div className="grid place-items-center border border-dashed border-line px-6 py-14 text-center">
          <Icon name="chamber" className="size-8 text-linestrong" />
          <p className="mt-3 font-display text-[16px] text-bone">
            No chambers sealed
          </p>
          <p className="mt-1 max-w-xs text-[12.5px] text-steel">
            Every world needs its own chamber. Create one to mount mods and
            release the game.
          </p>
          <button
            type="button"
            onClick={() => setCreating(true)}
            className="btn btn-primary btn-sm mt-4"
          >
            <Icon name="plus" className="size-3" />
            New chamber
          </button>
        </div>
      ) : (
        <motion.div layout className="grid gap-2.5 sm:grid-cols-2">
          <AnimatePresence initial={false} mode="popLayout">
            {chambers.map((chamber) => (
              <ChamberCard key={chamber.id} chamber={chamber} launcher={launcher} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}