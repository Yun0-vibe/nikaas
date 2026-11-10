"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function RailGroup({
  title,
  children,
  action,
}: {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="border-b border-line/80 px-4 py-4 last:border-b-0">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="font-mono text-[9.5px] tracking-[0.24em] text-steel uppercase">
          {title}
        </span>
        {action}
      </div>
      <div className="space-y-3.5">{children}</div>
    </div>
  );
}

export function Switch({
  checked,
  onChange,
  label,
  hint,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  hint?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="group flex w-full items-center justify-between gap-3 text-left"
    >
      <span className="min-w-0">
        <span
          className={cn(
            "block font-mono text-[11px] tracking-[0.06em] transition-colors",
            checked ? "text-bone" : "text-steel group-hover:text-bone",
          )}
        >
          {label}
        </span>
        {hint ? (
          <span className="mt-0.5 block text-[10.5px] leading-snug text-steel/70">
            {hint}
          </span>
        ) : null}
      </span>
      <span
        className={cn(
          "relative h-5 w-9 flex-none border transition-colors duration-200",
          checked
            ? "border-magma/70 bg-magma/25"
            : "border-line bg-white/[0.04] group-hover:border-linestrong",
        )}
        style={{ borderRadius: 2 }}
      >
        <motion.span
          className="absolute top-1/2 size-3.5 -translate-y-1/2"
          animate={{ left: checked ? 18 : 3 }}
          transition={{ type: "spring", stiffness: 520, damping: 32 }}
          style={{
            background: checked
              ? "linear-gradient(180deg,#F3FFE8,#5FCF4A)"
              : "#4C5563",
            boxShadow: checked ? "0 0 12px rgba(95,207,74,.85)" : "none",
            borderRadius: 1,
          }}
        />
      </span>
    </button>
  );
}

export function SliderRow({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  display,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  display: string;
}) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <span className="mb-1 flex items-baseline justify-between gap-2">
        <span className="font-mono text-[11px] tracking-[0.06em] text-steel">
          {label}
        </span>
        <span className="tabular font-mono text-[11px] text-volt">{display}</span>
      </span>
      <input
        type="range"
        className="slider"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        style={{ "--fill": `${fill}%` } as React.CSSProperties}
        aria-label={label}
      />
    </label>
  );
}

export function SelectRow({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block font-mono text-[11px] tracking-[0.06em] text-steel">
        {label}
      </span>
      <select
        className="field"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export function Stepper({
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  display: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="font-mono text-[11px] tracking-[0.06em] text-steel">
        {label}
      </span>
      <span className="flex items-center border border-line bg-black/30">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, Number((value - step).toFixed(2))))}
          disabled={value <= min}
          aria-label={`Decrease ${label}`}
          className="grid size-7 place-items-center text-steel transition-colors hover:bg-white/5 hover:text-volt disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <svg viewBox="0 0 12 12" className="size-3" aria-hidden="true">
            <path d="M2 6h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
        <span className="tabular w-12 border-x border-line text-center font-mono text-[11px] text-volt">
          {display}
        </span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, Number((value + step).toFixed(2))))}
          disabled={value >= max}
          aria-label={`Increase ${label}`}
          className="grid size-7 place-items-center text-steel transition-colors hover:bg-white/5 hover:text-volt disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <svg viewBox="0 0 12 12" className="size-3" aria-hidden="true">
            <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </span>
    </div>
  );
}