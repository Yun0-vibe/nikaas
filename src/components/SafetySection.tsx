"use client";

import { Reveal, SectionHead } from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/console/Icon";

const REPORT = [
  { label: "Asset hashes verified", value: "1,284", ok: true },
  { label: "Libraries resolved", value: "96", ok: true },
  { label: "Passwords seen by launcher", value: "0", ok: true },
  { label: "Files written outside Nikaas", value: "0", ok: true },
  { label: "Admin rights requested", value: "no", ok: true },
];

const POINTS: Array<{ icon: IconName; title: string; body: string }> = [
  {
    icon: "microsoft",
    title: "Device-code sign-in",
    body: "Microsoft gives you a short code on their own page. The launcher never sees your password — it only keeps a refresh token locally.",
  },
  {
    icon: "folder",
    title: "Separate storage",
    body: "Game files live under Nikaas on a drive with room. Your existing .minecraft install is not touched.",
  },
  {
    icon: "shield",
    title: "No admin rituals",
    body: "No kernel driver, no system-wide installer, no service. Run the .exe, keep it anywhere.",
  },
  {
    icon: "exhaust",
    title: "Errors stay readable",
    body: "Crashes and download failures land in the exhaust and a local crash.log — no telemetry relay required to diagnose.",
  },
];

export function SafetySection() {
  return (
    <section id="safety" className="relative py-20 sm:py-28">
      <div className="container-forge">
        <SectionHead
          eyebrow="07 · Safety"
          title="Nothing leaves the vent."
          lede="A Minecraft launcher needs your game files and a session token. It should not need your password, your admin rights, or a copy of your world. Here is exactly what Nikaas touches."
        />

        <div className="mt-9 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <div className="panel-forge seam-top relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-line px-4 py-3">
                <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-bone uppercase">
                  <Icon name="shield" className="size-3.5 text-acid" />
                  Integrity report
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.16em] text-acid uppercase">
                  <span className="dot" style={{ color: "#86E85A" }} />
                  local only
                </span>
              </div>

              <div className="grid grid-cols-2 gap-px bg-line">
                <div className="col-span-2 bg-forge p-5 sm:col-span-2">
                  <p className="kicker">Credentials stored in plain text</p>
                  <p className="mt-1 font-display text-[54px] leading-none font-bold text-acid">
                    0
                  </p>
                  <p className="mt-2 max-w-md text-[11.5px] leading-relaxed text-steel">
                    Offline profiles store a nickname. Microsoft sessions store a
                    refresh token in <code>%LOCALAPPDATA%</code>, never the password.
                  </p>
                </div>

                {REPORT.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-3 bg-forge px-4 py-3"
                  >
                    <span className="text-[11px] text-steel">{row.label}</span>
                    <span className="flex items-center gap-1.5 font-mono text-[10.5px] text-bone">
                      {row.value}
                      <span
                        className="grid size-4 place-items-center rounded-full"
                        style={{
                          color: "#86E85A",
                          background: "rgba(121,224,165,.14)",
                        }}
                      >
                        <Icon name="check" className="size-2.5" strokeWidth={2.4} />
                      </span>
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 border-t border-line px-4 py-2.5 font-mono text-[9.5px] text-steel/70">
                <Icon name="spark" className="size-3 text-volt" />
                Illustrative report from the launcher&apos;s integrity checks.
              </div>
            </div>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2">
            {POINTS.map((point, index) => (
              <Reveal key={point.title} delay={index * 0.06}>
                <article className="panel-flat h-full p-4">
                  <span className="grid size-8 place-items-center border border-linestrong/70 bg-white/[0.03] text-volt">
                    <Icon name={point.icon} className="size-4" />
                  </span>
                  <h3 className="mt-3 text-[13.5px] font-medium text-bone">
                    {point.title}
                  </h3>
                  <p className="mt-1.5 text-[11.5px] leading-relaxed text-steel">
                    {point.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}