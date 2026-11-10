"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FAQ } from "@/lib/data";
import { Reveal, SectionHead } from "@/components/ui/Reveal";
import { Icon } from "@/components/console/Icon";
import { cn } from "@/lib/utils";

export function FaqSection() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(FAQ[0].q);

  const items = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return FAQ;
    return FAQ.filter((item) =>
      `${item.q} ${item.a}`.toLowerCase().includes(needle),
    );
  }, [query]);

  return (
    <section id="faq" className="relative py-20 sm:py-28">
      <div className="container-forge grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:self-start">
          <SectionHead
            eyebrow="10 · FAQ"
            title="Questions, vented."
            lede="The short answers. If something is still unclear, the console preview shows how the launcher thinks."
          />

          <Reveal delay={0.1}>
            <a
              href="#anatomy"
              className="mt-6 flex items-center justify-between gap-4 border border-line bg-white/[0.02] p-4 transition-colors hover:border-magma/50 hover:bg-magma/[0.05]"
            >
              <span>
                <span className="block text-[12.5px] text-bone">
                  Still unclear?
                </span>
                <span className="mt-0.5 block font-mono text-[10px] text-steel">
                  Run a release in the console preview
                </span>
              </span>
              <Icon name="arrow" className="size-4 text-volt" />
            </a>
          </Reveal>
        </div>

        <div>
          <label className="relative mb-3 block">
            <Icon
              name="search"
              className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-steel"
            />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search the FAQ…"
              className="field pl-9"
              aria-label="Search FAQ"
            />
          </label>

          <div className="space-y-1.5">
            <AnimatePresence initial={false}>
              {items.map((item) => {
                const isOpen = open === item.q;
                return (
                  <motion.div
                    key={item.q}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={cn(
                      "border transition-colors duration-200",
                      isOpen
                        ? "border-magma/45 bg-magma/[0.045]"
                        : "border-line bg-white/[0.012] hover:border-linestrong",
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : item.q)}
                      aria-expanded={isOpen}
                      className="flex w-full items-start justify-between gap-4 px-4 py-3.5 text-left"
                    >
                      <span
                        className={cn(
                          "text-[13px] leading-snug transition-colors",
                          isOpen ? "text-whitehot" : "text-bone",
                        )}
                      >
                        {item.q}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.2 }}
                        className={cn(
                          "mt-0.5 grid size-5 flex-none place-items-center border font-mono text-[13px] leading-none",
                          isOpen
                            ? "border-magma/60 text-magma"
                            : "border-line text-steel",
                        )}
                        aria-hidden="true"
                      >
                        +
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="px-4 pb-4 text-[12px] leading-relaxed text-[#a9b2be]">
                            {item.a}
                          </p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {items.length === 0 ? (
              <div className="grid place-items-center border border-dashed border-line px-6 py-12 text-center">
                <Icon name="search" className="size-6 text-linestrong" />
                <p className="mt-2.5 text-[12.5px] text-bone">
                  No answers match “{query}”
                </p>
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="btn btn-ghost btn-sm mt-3"
                >
                  Clear search
                </button>
              </div>
            ) : null}
          </div>

          <p className="mt-4 font-mono text-[9.5px] tracking-[0.12em] text-steel/60 uppercase">
            {items.length} of {FAQ.length} answers
          </p>
        </div>
      </div>
    </section>
  );
}