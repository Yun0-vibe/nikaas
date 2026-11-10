"use client";

import { useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { DOWNLOAD_FACTS } from "@/lib/data";
import { Reveal, SectionHead } from "@/components/ui/Reveal";
import { useToast } from "@/components/ui/Toast";
import { copyText } from "@/lib/utils";
import { Icon, type IconName } from "@/components/console/Icon";

type SystemInfo = { os: string; arch: string; compatible: boolean };

let cachedSystem: SystemInfo | null = null;

function readSystem(): SystemInfo | null {
  if (typeof navigator === "undefined") return null;
  if (cachedSystem) return cachedSystem;
  const ua = navigator.userAgent;
  const os = /Windows/i.test(ua)
    ? "Windows"
    : /Mac OS X|Macintosh/i.test(ua)
      ? "macOS"
      : /Linux|X11|Android/i.test(ua)
        ? "Linux"
        : "Unknown";
  const arm = /arm64|aarch64/i.test(ua);
  const arch = arm ? "ARM64" : /x64|Win64|WOW64|Intel Mac/i.test(ua) ? "x64" : "Unknown";
  cachedSystem = { os, arch, compatible: os === "Windows" && !arm };
  return cachedSystem;
}

const subscribe = () => () => {};

function useSystemInfo(): SystemInfo | null {
  return useSyncExternalStore(subscribe, readSystem, () => null);
}

const PLATFORMS: Array<{
  name: string;
  detail: string;
  icon: IconName;
  state: "ready" | "soon" | "none";
}> = [
  { name: "Windows", detail: "10 / 11 · x64", icon: "release", state: "soon" },
  { name: "macOS", detail: "no build yet", icon: "folder", state: "none" },
  { name: "Linux", detail: "no build yet", icon: "server", state: "none" },
];

export function DownloadSection() {
  const { push } = useToast();
  const system = useSystemInfo();

  const requirements = DOWNLOAD_FACTS.join("\n");

  return (
    <section id="download" className="relative py-20 sm:py-28">
      <div className="container-forge">
        <Reveal>
          <div className="panel-forge seam-top relative overflow-hidden">
            <div
              className="pointer-events-none absolute -top-24 right-0 size-[420px] rounded-full blur-3xl"
              style={{ background: "rgba(255,106,0,.16)" }}
              aria-hidden="true"
            />
            <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
              <div>
                <p className="eyebrow">
                  <span className="pulse-dot" />
                  08 · Release status
                </p>
                <h2 className="mt-3 text-[clamp(28px,4.6vw,46px)] text-bone">
                  One Minecraft launcher.
                  <br />
                  <span className="text-volt">No setup rituals.</span>
                </h2>
                <p className="lede mt-4 max-w-lg">
                  Nikaas isn&apos;t public yet. When the first stable build is
                  ready, this page will host the signed Windows installer for
                  Minecraft: Java Edition — download it, run it, pick a chamber,
                  hit Release.
                </p>

                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {DOWNLOAD_FACTS.map((fact) => (
                    <li key={fact} className="flex items-start gap-2 text-[12px] text-steel">
                      <Icon
                        name="check"
                        className="mt-0.5 size-3 flex-none text-acid"
                        strokeWidth={2.4}
                      />
                      {fact}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 grid grid-cols-3 gap-2">
                  {PLATFORMS.map((platform) => (
                    <div
                      key={platform.name}
                      className="relative border px-3 py-3"
                      style={{
                        borderColor:
                          platform.state === "soon"
                            ? "rgba(255,106,0,.45)"
                            : "#252A34",
                        background:
                          platform.state === "soon"
                            ? "rgba(255,106,0,.07)"
                            : "rgba(255,255,255,.01)",
                      }}
                    >
                      <span
                        className="flex items-center justify-between font-mono text-[8.5px] tracking-[0.14em] uppercase"
                        style={{
                          color:
                            platform.state === "soon" ? "#FFB020" : "#69727F",
                        }}
                      >
                        {platform.state === "soon" ? "target" : "none"}
                        <span
                          className="dot"
                          style={{
                            color:
                              platform.state === "soon" ? "#FFB020" : "#4C5563",
                          }}
                        />
                      </span>
                      <p className="mt-1.5 text-[13px] font-medium text-bone">
                        {platform.name}
                      </p>
                      <p className="font-mono text-[9.5px] text-steel">
                        {platform.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="relative border border-linestrong/70 bg-[#080a0f]/85 p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="pill border-volt/40 text-volt">Coming soon</span>
                      <p className="mt-3 font-mono text-[10px] tracking-[0.14em] text-steel uppercase">
                        v1.0.0 · Windows x64
                      </p>
                    </div>
                    <Icon name="download" className="size-7 text-linestrong" />
                  </div>

                  <button
                    type="button"
                    disabled
                    className="btn btn-primary btn-lg mt-4 w-full"
                  >
                    Download for Windows
                  </button>
                  <p className="mt-3 text-[11px] leading-relaxed text-steel">
                    The download link goes live with the first stable release.
                    This page will host the signed installer.
                  </p>

                  <div className="mt-4 border border-line bg-black/25 p-3">
                    <span className="kicker mb-1.5 block">Your system</span>
                    {system ? (
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[11px] text-bone">
                          {system.os} · {system.arch}
                        </span>
                        <span
                          className="flex items-center gap-1.5 font-mono text-[9.5px] tracking-[0.1em] uppercase"
                          style={{ color: system.compatible ? "#79E0A5" : "#FFB020" }}
                        >
                          <span
                            className="dot"
                            style={{
                              color: system.compatible ? "#79E0A5" : "#FFB020",
                            }}
                          />
                          {system.compatible ? "compatible" : "windows-only build"}
                        </span>
                      </div>
                    ) : (
                      <div className="h-4 w-40 animate-pulse bg-white/5" />
                    )}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={async () => {
                        const ok = await copyText(requirements);
                        push({
                          title: ok ? "Requirements copied" : "Copy failed",
                          message: "Windows 10 / 11, 64-bit, internet connection",
                          tone: ok ? "ok" : "warn",
                        });
                      }}
                      className="btn btn-ghost btn-sm flex-1"
                    >
                      <Icon name="copy" className="size-3" />
                      Copy requirements
                    </button>
                    <a href="#faq" className="btn btn-ghost btn-sm flex-1">
                      Read the FAQ
                    </a>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-line pt-3 font-mono text-[9px] tracking-[0.12em] text-steel/70 uppercase">
                    <span>Signed build</span>
                    <span>No build tools</span>
                    <span>v1.0.0</span>
                  </div>
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="mt-3 flex items-start gap-2 font-mono text-[10px] leading-relaxed text-steel/65"
                >
                  <Icon name="spark" className="mt-px size-3 flex-none text-magma" />
                  Requires Windows 10 or 11 (64-bit) · Internet connection for
                  installs · Microsoft account optional
                </motion.p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}