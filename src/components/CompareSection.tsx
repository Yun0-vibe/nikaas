"use client";

import { Reveal, SectionHead } from "@/components/ui/Reveal";
import { Icon } from "@/components/console/Icon";

type Cell = "yes" | "no" | "varies";

const COLUMNS = ["Nikaas", "Vanilla launcher", "Common third-party"];

const ROWS: Array<{ feature: string; cells: [Cell, Cell, Cell] }> = [
  { feature: "Isolated per-world folders", cells: ["yes", "no", "varies"] },
  { feature: "One button installs and launches", cells: ["yes", "no", "varies"] },
  { feature: "Live install / download log", cells: ["yes", "no", "varies"] },
  { feature: "Fabric, Forge and NeoForge", cells: ["yes", "no", "yes"] },
  { feature: "Modrinth catalog built in", cells: ["yes", "no", "varies"] },
  { feature: "Game files stored separately", cells: ["yes", "no", "varies"] },
  { feature: "Microsoft device-code sign-in", cells: ["yes", "yes", "varies"] },
  { feature: "Leaves an existing .minecraft alone", cells: ["yes", "yes", "varies"] },
];

function Mark({ state }: { state: Cell }) {
  if (state === "yes") {
    return (
      <span className="inline-flex items-center gap-1.5 font-mono text-[9.5px] tracking-[0.1em] text-acid uppercase">
        <span className="grid size-4 place-items-center rounded-full bg-acid/15">
          <Icon name="check" className="size-2.5" strokeWidth={2.6} />
        </span>
        Yes
      </span>
    );
  }
  if (state === "no") {
    return (
      <span className="inline-flex items-center gap-1.5 font-mono text-[9.5px] tracking-[0.1em] text-steel/70 uppercase">
        <span className="h-px w-4 bg-steel/40" />
        No
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[9.5px] tracking-[0.1em] text-volt/90 uppercase">
      <span className="text-[11px] leading-none">~</span>
      Varies
    </span>
  );
}

export function CompareSection() {
  return (
    <section id="compare" className="relative py-20 sm:py-28">
      <div className="container-forge">
        <SectionHead
          eyebrow="07 · Compare"
          title="What a Minecraft launcher should handle."
          lede="The stock Minecraft launcher starts the game. Nikaas also isolates worlds, manages loaders, runs the catalog and shows you what is happening. Here is the difference in plain terms."
        />

        <Reveal delay={0.08}>
          <div className="mt-8 overflow-x-auto border border-line bg-forge">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line">
                  <th
                    scope="col"
                    className="sticky left-0 z-10 bg-forge px-4 py-3.5 font-mono text-[9.5px] tracking-[0.18em] text-steel uppercase"
                  >
                    Capability
                  </th>
                  {COLUMNS.map((column, index) => (
                    <th
                      key={column}
                      scope="col"
                      className="relative px-4 py-3.5 font-mono text-[9.5px] tracking-[0.18em] uppercase"
                      style={{
                        color: index === 0 ? "#FFE7A3" : "#98A1AE",
                        background:
                          index === 0 ? "rgba(255,106,0,.09)" : undefined,
                      }}
                    >
                      {column}
                      {index === 0 ? (
                        <span className="ml-2 inline-block bg-magma px-1.5 py-0.5 text-[8px] tracking-[0.1em] text-[#1a0a01]">
                          this
                        </span>
                      ) : null}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, rowIndex) => (
                  <tr
                    key={row.feature}
                    className="border-b border-line/70 last:border-b-0"
                  >
                    <th
                      scope="row"
                      className="sticky left-0 z-10 bg-forge px-4 py-3 text-[12px] font-normal text-bone"
                    >
                      <span className="mr-2 font-mono text-[9px] text-steel/50">
                        {String(rowIndex + 1).padStart(2, "0")}
                      </span>
                      {row.feature}
                    </th>
                    {row.cells.map((cell, index) => (
                      <td
                        key={`${row.feature}-${index}`}
                        className="px-4 py-3"
                        style={{
                          background:
                            index === 0 ? "rgba(255,106,0,.04)" : undefined,
                        }}
                      >
                        <Mark state={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <p className="mt-3 flex items-start gap-2 font-mono text-[10px] leading-relaxed text-steel/65">
          <Icon name="spark" className="mt-px size-3 flex-none text-magma" />
          General comparison against the stock launcher and typical third-party
          tools — not a review of any specific product. Behaviour varies by
          version and configuration.
        </p>
      </div>
    </section>
  );
}