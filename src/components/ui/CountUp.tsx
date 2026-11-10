"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";

export function CountUp({
  to,
  duration = 1.5,
  pad = 0,
  suffix = "",
  className,
}: {
  to: number;
  duration?: number;
  pad?: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const reduced = useReducedMotion();
  const value = useMotionValue(0);
  const text = useTransform(value, (latest) => {
    const rounded = Math.round(latest);
    return `${pad ? String(rounded).padStart(pad, "0") : rounded}${suffix}`;
  });

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      value.set(to);
      return;
    }
    const controls = animate(value, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [inView, reduced, to, duration, value]);

  return (
    <span ref={ref} className={className}>
      <motion.span className="tabular">{text}</motion.span>
    </span>
  );
}