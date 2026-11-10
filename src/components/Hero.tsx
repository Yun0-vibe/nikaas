"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { VoxelBlock } from "@/components/ui/VoxelBlock";
import { Hotbar } from "@/components/ui/Hotbar";
import { EmberCanvas } from "@/components/ui/EmberCanvas";
import { Magnetic } from "@/components/ui/Magnetic";
import { CountUp } from "@/components/ui/CountUp";

const HEADLINE = ["Minecraft", "launcher.", "Clean pressure."];

function VoxelStage() {
  const reduced = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 90, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 90, damping: 18, mass: 0.6 });

  const coreX = useTransform(sx, (v) => v * 0.9);
  const coreY = useTransform(sy, (v) => v * 0.9);
  const chipX = useTransform(sx, (v) => v * 1.9);
  const chipY = useTransform(sy, (v) => v * 1.9);

  const [pressure, setPressure] = useState(68);
  const [ready, setReady] = useState(true);

  useEffect(() => {
    if (reduced) return;
    const timer = setInterval(() => {
      setPressure((current) => {
        const next = current + (Math.random() * 12 - 6);
        return Math.round(Math.min(94, Math.max(41, next)));
      });
      setReady((current) => (Math.random() > 0.8 ? !current : current));
    }, 2100);
    return () => clearInterval(timer);
  }, [reduced]);

  return (
    <div
      ref={stageRef}
      className="relative mx-auto aspect-square w-full max-w-[560px] select-none"
      onPointerMove={(event) => {
        if (reduced || event.pointerType !== "mouse") return;
        const rect = stageRef.current?.getBoundingClientRect();
        if (!rect) return;
        px.set(((event.clientX - rect.left) / rect.width - 0.5) * 34);
        py.set(((event.clientY - rect.top) / rect.height - 0.5) * 34);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 overflow-hidden">
        <EmberCanvas count={80} speed={0.8} />
      </div>

      <div
        className="pixel-grid absolute inset-[4%] opacity-60"
        style={{
          maskImage:
            "radial-gradient(circle at 50% 46%, #000 8%, rgba(0,0,0,.55) 46%, transparent 74%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 46%, #000 8%, rgba(0,0,0,.55) 46%, transparent 74%)",
        }}
      />

      <div
        className="absolute inset-[13%] rounded-full opacity-70 blur-[64px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,106,0,.32), rgba(255,59,31,.12) 46%, transparent 70%)",
        }}
      />

      <div
        className="absolute bottom-[15%] left-1/2 h-[190px] w-[86%]"
        style={{
          transform: "translateX(-50%) perspective(560px) rotateX(64deg)",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "38px 38px",
          maskImage:
            "radial-gradient(ellipse at center, #000 14%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, #000 14%, transparent 70%)",
        }}
      />

      <motion.div
        className="absolute inset-0"
        style={reduced ? undefined : { x: chipX, y: chipY }}
      >
        <div className="animate-float absolute top-[17%] right-[2%] z-0 w-[88px] sm:w-[106px]">
          <VoxelBlock
            kind="diamond"
            className="drop-shadow-[0_18px_26px_rgba(0,0,0,.55)]"
          />
        </div>
        <div
          className="animate-float absolute top-[14%] left-[2%] z-0 w-[70px] sm:w-[86px]"
          style={{ animationDelay: "-2.6s" }}
        >
          <VoxelBlock
            kind="magma"
            className="drop-shadow-[0_18px_26px_rgba(0,0,0,.55)]"
          />
        </div>
        <div
          className="animate-float absolute top-[49%] left-[5%] z-0 w-[62px] sm:w-[76px]"
          style={{ animationDelay: "-4.1s" }}
        >
          <VoxelBlock
            kind="stone"
            className="drop-shadow-[0_16px_24px_rgba(0,0,0,.55)]"
          />
        </div>
        <div
          className="animate-float absolute top-[56%] right-[8%] z-0 w-[54px] sm:w-[66px]"
          style={{ animationDelay: "-1.4s" }}
        >
          <VoxelBlock
            kind="obsidian"
            className="drop-shadow-[0_16px_24px_rgba(0,0,0,.55)]"
          />
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-0 z-10"
        style={reduced ? undefined : { x: coreX, y: coreY }}
      >
        <div className="absolute top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="animate-float relative">
            <div
              className="absolute -inset-8 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,140,30,.4), transparent 68%)",
                opacity: 0.5 + pressure / 210,
              }}
            />
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 border border-white/15 bg-black/75 px-2.5 py-1 font-pixel text-[8px] tracking-[0.08em] whitespace-nowrap text-bone shadow-[0_6px_20px_rgba(0,0,0,.55)]">
              ATLAS · 1.21.8
            </div>
            <VoxelBlock
              kind="grass"
              className="relative w-[200px] drop-shadow-[0_34px_46px_rgba(0,0,0,.6)] sm:w-[252px]"
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-0 z-20"
        style={reduced ? undefined : { x: chipX, y: chipY }}
      >
        <Telemetry
          className="top-[5%] left-0"
          dot="#FF6A00"
          pulse
          label={`PRESSURE ${pressure}%`}
        />
        <Telemetry
          className="top-[43%] right-0"
          dot="#35E0F0"
          label="NEOFORGE 21.1"
        />
        <Telemetry
          className="bottom-[21%] left-[1%]"
          dot={ready ? "#79E0A5" : "#FFB020"}
          label={ready ? "1.21.8 READY" : "PATCHING"}
        />
      </motion.div>

      <div className="absolute inset-x-0 bottom-[1.5%] z-30 flex justify-center">
        <Hotbar />
      </div>

      {[
        { top: "25%", left: "44%", size: 5, color: "#FFB020", delay: "0s" },
        { top: "12%", left: "58%", size: 4, color: "#7CC355", delay: "-1.2s" },
        { top: "62%", left: "40%", size: 4, color: "#4AEDD9", delay: "-2.4s" },
        { top: "33%", left: "18%", size: 3, color: "#FF6A00", delay: "-3.1s" },
        { top: "68%", left: "76%", size: 5, color: "#FFB020", delay: "-4.4s" },
      ].map((spark) => (
        <span
          key={`${spark.top}-${spark.left}`}
          className="animate-float absolute z-20"
          style={{
            top: spark.top,
            left: spark.left,
            width: spark.size,
            height: spark.size,
            background: spark.color,
            boxShadow: `0 0 12px ${spark.color}`,
            animationDelay: spark.delay,
            opacity: 0.75,
          }}
        />
      ))}
    </div>
  );
}

function Telemetry({
  className,
  label,
  dot,
  pulse = false,
}: {
  className: string;
  label: string;
  dot: string;
  pulse?: boolean;
}) {
  return (
    <div
      className={`absolute flex items-center gap-2 border border-line bg-[#080b10]/92 px-3 py-2 font-mono text-[9.5px] tracking-[0.16em] text-bone backdrop-blur-sm ${className}`}
      style={{
        clipPath:
          "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
        boxShadow: `0 8px 26px rgba(0,0,0,.5), inset 2px 0 0 ${dot}`,
      }}
    >
      <span
        className={pulse ? "pulse-dot" : "dot"}
        style={pulse ? undefined : { color: dot }}
      />
      <span className="tabular">{label}</span>
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 90]);
  const stageY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -60]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, reduced ? 1 : 0.15]);

  return (
    <section
      ref={ref}
      id="overview"
      className="relative overflow-hidden pt-[calc(var(--header-h)+54px)] pb-16 sm:pb-24"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg,transparent,rgba(255,106,0,.5),transparent)",
        }}
        aria-hidden="true"
      />

      <div className="container-forge grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8">
        <motion.div style={{ y: copyY, opacity: fade }}>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="inline-flex flex-wrap items-center gap-2.5 border border-line bg-white/[0.03] px-3 py-1.5"
          >
            <span className="pulse-dot" />
            <span className="font-pixel text-[9.5px] tracking-[0.08em] text-grass uppercase">
              Minecraft: Java Edition
            </span>
            <span className="h-3 w-px bg-line" aria-hidden="true" />
            <span className="font-mono text-[9.5px] tracking-[0.16em] text-steel uppercase">
              Windows launcher · soon
            </span>
          </motion.p>

          <h1 className="mt-6 text-[clamp(40px,7.6vw,78px)] leading-[0.98] font-bold tracking-[-0.03em]">
            {HEADLINE.map((line, index) => (
              <span key={line} className="block overflow-hidden py-[0.06em]">
                <motion.span
                  className={
                    index === 1
                      ? "block text-grass [text-shadow:0_0_44px_rgba(124,195,85,.34)]"
                      : index === 2
                        ? "block text-magma [text-shadow:0_0_44px_rgba(255,106,0,.45)]"
                        : "block text-bone"
                  }
                  initial={reduced ? false : { y: "108%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 0.95,
                    delay: 0.14 + index * 0.13,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            className="rule-hot mt-5 w-40"
            initial={reduced ? false : { scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: 0 }}
            aria-hidden="true"
          />

          <motion.p
            className="lede mt-6 max-w-xl"
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.42 }}
          >
            A Windows launcher for heavy{" "}
            <strong className="font-semibold text-grass">
              Minecraft: Java Edition
            </strong>{" "}
            modpacks.{" "}
            <strong className="font-semibold text-whitehot">Chambers</strong>{" "}
            isolate every world, the{" "}
            <strong className="font-semibold text-coolant">Exhaust</strong> shows
            every byte, and one{" "}
            <strong className="font-semibold text-volt">Release</strong> turns
            stored pressure into play.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.54 }}
          >
            <Magnetic>
              <a href="#download" className="btn btn-primary btn-lg">
                Get Nikaas
                <span className="btn-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a href="#anatomy" className="btn btn-ghost btn-lg">
                Try the console
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            className="mt-7 flex flex-wrap items-center gap-1.5"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.66 }}
          >
            <span className="mr-1 font-mono text-[9px] tracking-[0.2em] text-steel uppercase">
              Runs on
            </span>
            {[
              { label: "Windows 10 / 11 · x64", active: true },
              { label: "macOS · no build", active: false },
              { label: "Linux · no build", active: false },
            ].map((platform) => (
              <span
                key={platform.label}
                className={
                  platform.active
                    ? "flex items-center gap-1.5 border border-grass/40 bg-grass/[0.08] px-2.5 py-1.5 font-mono text-[9.5px] tracking-[0.1em] text-grass uppercase"
                    : "flex items-center gap-1.5 border border-line px-2.5 py-1.5 font-mono text-[9.5px] tracking-[0.1em] text-steel/60 uppercase"
                }
              >
                <span
                  className="dot"
                  style={{ color: platform.active ? "#7CC355" : "#4C5563" }}
                />
                {platform.label}
              </span>
            ))}
          </motion.div>

          <motion.ul
            className="mt-8 flex flex-wrap items-center gap-x-9 gap-y-4 border-t border-line pt-6"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.78 }}
          >
            {[
              { value: <CountUp to={4} pad={2} />, label: "Loaders" },
              { value: "∞", label: "Chambers" },
              { value: <CountUp to={1} pad={2} />, label: "Release" },
            ].map((stat) => (
              <li key={stat.label} className="flex items-baseline gap-2.5">
                <strong className="font-display text-[26px] leading-none font-bold text-volt">
                  {stat.value}
                </strong>
                <span className="font-pixel text-[9px] tracking-[0.08em] text-steel uppercase">
                  {stat.label}
                </span>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          style={{ y: stageY }}
          initial={reduced ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <VoxelStage />
        </motion.div>
      </div>

      <motion.div
        className="container-forge mt-14 hidden items-center gap-3 lg:flex"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        aria-hidden="true"
      >
        <span className="font-pixel text-[9px] tracking-[0.14em] text-steel uppercase">
          Scroll
        </span>
        <span className="relative h-px w-24 overflow-hidden bg-line">
          <motion.span
            className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-transparent via-magma to-transparent"
            animate={reduced ? undefined : { x: [-32, 96] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
