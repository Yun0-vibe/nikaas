"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { NAV_SECTIONS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ForgeMark } from "@/components/ui/ForgeMark";
import { Magnetic } from "@/components/ui/Magnetic";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("overview");
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const reduced = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 10);
  });

  useEffect(() => {
    const sections = NAV_SECTIONS.map((item) =>
      document.getElementById(item.id),
    ).filter((element): element is HTMLElement => element !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-42% 0px -52% 0px", threshold: [0, 0.05, 0.2] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 900) setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header
      id="top"
      className={cn(
        "fixed inset-x-0 top-0 z-[100] h-[var(--header-h)] transition-all duration-300",
        scrolled
          ? "border-b border-line bg-obsidian/88 shadow-[0_10px_36px_rgba(0,0,0,.55)] backdrop-blur-xl"
          : "border-b border-transparent bg-gradient-to-b from-obsidian/70 to-transparent",
      )}
    >
      <div className="container-forge flex h-full items-center justify-between gap-4">
        <a
          href="#top"
          className="group flex items-center gap-2.5"
          aria-label="Nikaas Launcher — home"
          onClick={() => setOpen(false)}
        >
          <span className="relative">
            <ForgeMark
              animated
              className="size-8 transition-transform duration-500 group-hover:scale-110"
            />
            <span
              className="absolute inset-0 -z-10 rounded-full opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: "rgba(255,106,0,.5)" }}
              aria-hidden="true"
            />
          </span>
          <span className="leading-none">
            <span className="block font-display text-[15px] font-bold tracking-[0.2em] text-bone">
              NIKAAS
            </span>
            <span className="mt-1 block font-mono text-[8.5px] tracking-[0.34em] text-steel">
              LAUNCHER
            </span>
          </span>
        </a>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Primary"
        >
          {NAV_SECTIONS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? "true" : undefined}
              className={cn(
                "relative px-3.5 py-2 font-mono text-[11px] tracking-[0.13em] uppercase transition-colors duration-200",
                active === item.id
                  ? "text-whitehot"
                  : "text-steel hover:text-bone",
              )}
            >
              {active === item.id ? (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-x-2 -bottom-px h-px"
                  style={{
                    background:
                      "linear-gradient(90deg,transparent,#FF6A00,#FFB020,transparent)",
                    boxShadow: "0 0 12px rgba(255,106,0,.9)",
                  }}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 380, damping: 32 }
                  }
                />
              ) : null}
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <Magnetic strength={0.22} className="hidden sm:inline-block">
            <a href="#download" className="btn btn-primary btn-sm">
              Download
              <span className="btn-arrow" aria-hidden="true">
                →
              </span>
            </a>
          </Magnetic>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="grid size-10 place-items-center border border-line bg-white/[0.03] text-bone transition-colors hover:border-magma/60 md:hidden"
          >
            <span className="relative block h-3 w-4.5">
              <motion.span
                className="absolute left-0 block h-px w-full bg-current"
                animate={
                  open ? { top: 6, rotate: 45 } : { top: 1, rotate: 0 }
                }
                transition={{ duration: 0.24 }}
              />
              <motion.span
                className="absolute left-0 block h-px w-full bg-current"
                animate={
                  open ? { top: 6, rotate: -45 } : { top: 10, rotate: 0 }
                }
                transition={{ duration: 0.24 }}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b border-line bg-obsidian/97 backdrop-blur-xl md:hidden"
          >
            <nav
              className="container-forge flex flex-col py-3"
              aria-label="Mobile"
            >
              {NAV_SECTIONS.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + index * 0.045 }}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center justify-between border-b border-line/70 py-3.5 font-display text-[17px] font-medium",
                    active === item.id ? "text-volt" : "text-bone",
                  )}
                >
                  {item.label}
                  <span className="font-mono text-[10px] tracking-[0.2em] text-steel">
                    0{index + 1}
                  </span>
                </motion.a>
              ))}
              <motion.a
                href="#download"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => setOpen(false)}
                className="btn btn-primary mt-4 mb-2 w-full"
              >
                Get Nikaas
                <span className="btn-arrow" aria-hidden="true">
                  →
                </span>
              </motion.a>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}