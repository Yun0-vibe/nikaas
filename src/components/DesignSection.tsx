"use client";

import { LANGUAGE_ROWS, PALETTE } from "@/lib/data";
import { ForgeMark } from "@/components/ui/ForgeMark";
import { Reveal, SectionHead } from "@/components/ui/Reveal";
import { useToast } from "@/components/ui/Toast";
import { copyText } from "@/lib/utils";
import { Icon } from "@/components/console/Icon";

export function DesignSection() {
  const { push } = useToast();

  return (
    <section id="design" className="relative py-20 sm:py-28">
      <div className="container-forge">
        <SectionHead
          eyebrow="06 · Grass & Gold"
          title="Moss. Grass. Sunlight."
          lede="Nikaas stays dark so your world, your mods and your logs are the only things that glow. Pixel bevels, hard edges, one green seam."
        />

        <div className="mt-9 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="panel-forge scanlines relative flex h-full min-h-[330px] flex-col items-center justify-center overflow-hidden p-8 text-center">
              <div
                className="animate-float absolute inset-0 m-auto size-56 rounded-full blur-3xl"
                style={{ background: "rgba(95,207,74,.22)" }}
                aria-hidden="true"
              />
              <div className="relative">
                <ForgeMark
                  animated
                  title="Nikaas mark: a geometric block splitting open with light"
                  className="size-28 drop-shadow-[0_0_28px_rgba(95,207,74,.55)] sm:size-32"
                />
              </div>
              <p className="relative mt-7 max-w-[240px] text-[13px] leading-relaxed text-[#b4c4b8]">
                A solid cube splits down the middle.
                <br />
                The light does the talking.
              </p>
              <span className="relative mt-5 h-px w-16 bg-gradient-to-r from-transparent via-magma to-transparent" />
              <p className="relative mt-4 font-mono text-[9.5px] tracking-[0.2em] text-steel uppercase">
                One seam. That&apos;s the whole mark.
              </p>
            </div>
          </Reveal>

          <div className="space-y-4">
            <Reveal delay={0.06}>
              <div className="panel-flat p-4 sm:p-5">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-display text-[16px] font-semibold text-bone">
                    Made of
                  </h3>
                  <span className="pill">Click to copy</span>
                </div>

                <div className="grid gap-1.5 sm:grid-cols-2">
                  {PALETTE.map((swatch) => (
                    <button
                      key={swatch.hex}
                      type="button"
                      onClick={async () => {
                        const ok = await copyText(swatch.hex);
                        push({
                          title: ok ? `${swatch.hex} copied` : swatch.hex,
                          message: `${swatch.name} · ${swatch.role}`,
                          tone: ok ? "ok" : "info",
                        });
                      }}
                      className="group flex items-center gap-2.5 border border-line/80 bg-black/20 p-2 text-left transition-colors hover:border-linestrong hover:bg-white/[0.04]"
                      aria-label={`Copy ${swatch.hex} — ${swatch.name}`}
                    >
                      <span
                        className="size-9 flex-none border border-white/10 transition-transform duration-300 group-hover:scale-105"
                        style={{
                          background: swatch.hex,
                          boxShadow:
                            swatch.hex === "#5FCF4A"
                              ? "inset 0 0 14px rgba(255,255,255,.28), 0 0 14px rgba(95,207,74,.5)"
                              : `inset 0 0 12px rgba(255,255,255,.08)`,
                        }}
                        aria-hidden="true"
                      />
                      <span className="min-w-0">
                        <span className="flex items-center gap-1.5">
                          <span className="truncate text-[11.5px] text-bone">
                            {swatch.name}
                          </span>
                          <Icon
                            name="copy"
                            className="size-2.5 flex-none text-steel opacity-0 transition-opacity group-hover:opacity-100"
                          />
                        </span>
                        <span className="block font-mono text-[9.5px] text-steel">
                          {swatch.hex} · {swatch.role}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>

                <p className="mt-3 text-[10.5px] leading-relaxed text-steel/80">
                  Glow is reserved for active things: the primary action, a live
                  download, a chamber under load.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="panel-flat p-4 sm:p-5">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-display text-[16px] font-semibold text-bone">
                    The language
                  </h3>
                  <span className="pill">Interface</span>
                </div>
                <dl className="divide-y divide-line/70">
                  {LANGUAGE_ROWS.map((row) => (
                    <div
                      key={row.term}
                      className="grid gap-1 py-2.5 sm:grid-cols-[110px_1fr] sm:gap-3"
                    >
                      <dt className="font-mono text-[10.5px] tracking-[0.12em] text-volt uppercase">
                        {row.term}
                      </dt>
                      <dd className="text-[11.5px] leading-relaxed text-steel">
                        {row.meaning}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
                {[
                  { name: "Display", font: "font-display", sample: "Aa", meta: "Space Grotesk" },
                  { name: "Body", font: "font-body", sample: "Aa", meta: "Inter" },
                  { name: "Pixel", font: "font-pixel", sample: "Aa", meta: "Silkscreen" },
                ].map((type) => (
                  <div key={type.name} className="bg-forge p-3.5">
                    <span className="font-mono text-[9px] tracking-[0.18em] text-steel uppercase">
                      {type.name}
                    </span>
                    <p className={`${type.font} mt-1 text-[30px] leading-none text-bone`}>
                      {type.sample}
                    </p>
                    <p className="mt-2 font-mono text-[9.5px] text-steel/70">
                      {type.meta}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}