"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { STORE_CATEGORIES, STORE_ITEMS, type StoreItem } from "@/lib/data";
import { StoreArt } from "@/components/ui/StoreArt";
import { SectionHead, Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/console/Icon";
import { cn, formatCount } from "@/lib/utils";

const CATEGORY_LABEL: Record<(typeof STORE_CATEGORIES)[number], string> = {
  All: "All",
  Modpack: "Modpacks",
  World: "Worlds",
  "Shader pack": "Shaders",
  "Resource pack": "Resource packs",
  Cosmetic: "Cosmetics",
};

const prices = (item: StoreItem) =>
  item.price === 0 ? "Free" : `$${item.price.toFixed(2)}`;

function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.3l6.1-.7L12 3z"
        fill="currentColor"
      />
    </svg>
  );
}

function Heart({ filled, className }: { filled: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M12 20s-7-4.4-7-9.2A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7 2.8C19 15.6 12 20 12 20z" />
    </svg>
  );
}

function PriceTag({ item, className }: { item: StoreItem; className?: string }) {
  return (
    <span
      className={cn(
        "border px-2 py-1 font-pixel text-[8px]",
        item.price === 0
          ? "border-grass/45 bg-grass/10 text-grass"
          : "border-volt/45 bg-volt/10 text-volt",
        className,
      )}
    >
      {prices(item)}
    </span>
  );
}

function StoreDialog({
  item,
  wished,
  onToggleWish,
  onClose,
}: {
  item: StoreItem;
  wished: boolean;
  onToggleWish: () => void;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[160] flex items-end justify-center sm:items-center sm:p-5"
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduced ? undefined : { opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="store-dialog-title"
        className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto border-2 border-linestrong bg-[#0a110d] shadow-[0_40px_120px_rgba(0,0,0,.7)]"
        initial={reduced ? false : { y: 26, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        exit={reduced ? undefined : { y: 20, scale: 0.98 }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close item preview"
          className="absolute top-3 right-3 z-20 grid size-9 place-items-center border border-line bg-black/70 text-bone transition-colors hover:border-grass/60 hover:text-grass"
        >
          <Icon name="close" className="size-4" />
        </button>

        <div className="relative h-44 border-b-2 border-black/50 sm:h-56">
          <StoreArt
            seed={item.id.length}
            from={item.art.from}
            to={item.art.to}
            accent={item.art.accent}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(7,12,9,.05), rgba(7,12,9,.88))",
            }}
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-6">
            <div className="min-w-0">
              <p className="font-pixel text-[8px] tracking-[0.06em] text-grass uppercase">
                {item.category} · {item.tag ?? "Nikaas Store"}
              </p>
              <h3
                id="store-dialog-title"
                className="mt-1.5 font-display text-[26px] leading-none font-bold text-bone sm:text-[32px]"
              >
                {item.name}
              </h3>
              <p className="mt-1 font-mono text-[10px] text-steel">
                by {item.creator}
              </p>
            </div>
            <PriceTag item={item} className="flex-none" />
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] text-steel">
            <span className="flex items-center gap-1.5 text-volt">
              <Star className="size-3" />
              {item.rating.toFixed(1)}
              <span className="text-steel">({formatCount(item.reviews)})</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Icon name="download" className="size-3" />
              {formatCount(item.downloads)} downloads
            </span>
            <span>{item.sizeMb} MB</span>
          </div>

          <p className="mt-4 text-[13px] leading-relaxed text-[#b4c4b8]">
            {item.description}
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h4 className="font-mono text-[9px] tracking-[0.18em] text-steel uppercase">
                What&apos;s inside
              </h4>
              <ul className="mt-2 space-y-1.5">
                {item.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2 text-[12px] leading-relaxed text-bone"
                  >
                    <Icon
                      name="check"
                      className="mt-0.5 size-3.5 flex-none text-grass"
                    />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-[9px] tracking-[0.18em] text-steel uppercase">
                Details
              </h4>
              <dl className="mt-2 divide-y divide-line/70 border border-line/70">
                {[
                  ["Loader", item.loader],
                  ["Versions", item.versions.join(" · ")],
                  ["Install size", `${item.sizeMb} MB`],
                  ["Delivery", "Own chamber"],
                ].map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-start justify-between gap-3 px-2.5 py-2"
                  >
                    <dt className="font-mono text-[9px] tracking-[0.08em] text-steel uppercase">
                      {key}
                    </dt>
                    <dd className="text-right font-mono text-[9.5px] text-bone">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-2 border-t border-line pt-4 sm:flex-row sm:items-center">
            <button
              type="button"
              disabled
              className="btn btn-primary w-full sm:w-auto"
              aria-disabled="true"
            >
              <Icon name="release" className="size-3.5" />
              Checkout opens with the launcher
            </button>
            <button
              type="button"
              onClick={onToggleWish}
              aria-pressed={wished}
              className={cn(
                "btn btn-ghost w-full sm:w-auto",
                wished && "border-grass/60 text-grass",
              )}
            >
              <Heart filled={wished} className="size-3.5" />
              {wished ? "On wishlist" : "Add to wishlist"}
            </button>
            <p className="font-mono text-[9px] leading-relaxed text-steel/70 sm:ml-auto sm:text-right">
              Preview only.
              <br className="hidden sm:block" /> No payment is taken.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function StorePreview() {
  const [filter, setFilter] =
    useState<(typeof STORE_CATEGORIES)[number]>("All");
  const [query, setQuery] = useState("");
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const reduced = useReducedMotion();

  const closeDialog = useCallback(() => setSelectedId(null), []);

  const toggleWish = useCallback((id: string) => {
    setWishlist((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const items = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return STORE_ITEMS.filter(
      (item) =>
        (filter === "All" || item.category === filter) &&
        (!needle ||
          `${item.name} ${item.creator} ${item.category} ${item.summary}`
            .toLowerCase()
            .includes(needle)),
    );
  }, [filter, query]);

  const featured = STORE_ITEMS[0];
  const showFeatured = filter === "All" && query.trim() === "";
  const gridItems = showFeatured
    ? items.filter((item) => item.id !== featured.id)
    : items;
  const selected = STORE_ITEMS.find((item) => item.id === selectedId) ?? null;

  return (
    <section id="store" className="relative py-20 sm:py-28">
      <div className="container-forge">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            eyebrow="04 · Store preview"
            title={
              <>
                Browse the store.
                <br />
                <span className="text-grass">Checkout waits for launch.</span>
              </>
            }
            lede="Packs, worlds, shaders and cosmetics with real listings, versions and prices. Until the launcher ships you can open every page and build a wishlist — no payment, no account, no surprises."
          />
          <Reveal delay={0.08}>
            <span className="pill border-grass/35 text-grass">
              <span className="pulse-dot" />
              Preview catalog
            </span>
          </Reveal>
        </div>

        {showFeatured ? (
          <Reveal delay={0.08} className="mt-8">
            <div className="grid overflow-hidden border-2 border-linestrong/70 bg-gradient-to-br from-panel to-forge lg:grid-cols-[1.15fr_1fr]">
              <div className="relative min-h-[240px] overflow-hidden border-b-2 border-black/40 lg:border-r-2 lg:border-b-0">
                <StoreArt
                  seed={12}
                  from={featured.art.from}
                  to={featured.art.to}
                  accent={featured.art.accent}
                  className="absolute inset-0"
                />
                <span className="absolute top-3 left-3 border border-volt/50 bg-black/70 px-2 py-1 font-pixel text-[8px] text-volt">
                  FEATURED PACK
                </span>
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 40%, rgba(7,12,9,.6))",
                  }}
                  aria-hidden="true"
                />
              </div>

              <div className="flex flex-col p-5 sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-pixel text-[8px] tracking-[0.06em] text-grass uppercase">
                    {featured.category} · {featured.loader} ·{" "}
                    {featured.versions[0]}
                  </p>
                  <PriceTag item={featured} />
                </div>
                <h3 className="mt-3 font-display text-[clamp(24px,3.4vw,34px)] leading-none font-bold text-bone">
                  {featured.name}
                </h3>
                <p className="mt-1 font-mono text-[10px] text-steel">
                  by {featured.creator} · {featured.sizeMb} MB
                </p>
                <p className="mt-3 text-[13px] leading-relaxed text-[#b4c4b8]">
                  {featured.summary}
                </p>
                <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                  {featured.highlights.slice(0, 2).map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-1.5 font-mono text-[9.5px] leading-relaxed text-steel"
                    >
                      <Icon
                        name="check"
                        className="mt-0.5 size-3 flex-none text-grass"
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
                  <button
                    type="button"
                    onClick={() => setSelectedId(featured.id)}
                    className="btn btn-primary"
                  >
                    View pack
                    <Icon name="arrow" className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleWish(featured.id)}
                    aria-pressed={wishlist.has(featured.id)}
                    className={cn(
                      "btn btn-ghost",
                      wishlist.has(featured.id) && "border-grass/60 text-grass",
                    )}
                  >
                    <Heart
                      filled={wishlist.has(featured.id)}
                      className="size-3.5"
                    />
                    {wishlist.has(featured.id) ? "Wishlisted" : "Wishlist"}
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        ) : null}

        <div className="mt-6 flex flex-col gap-2.5 lg:flex-row lg:items-center">
          <div className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
            {STORE_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                className="chip flex-none"
                data-active={filter === category}
              >
                {CATEGORY_LABEL[category]}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 lg:ml-auto">
            <label className="relative w-full lg:w-60">
              <Icon
                name="search"
                className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-steel"
              />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search the store…"
                className="field pl-8"
                aria-label="Search the store"
              />
            </label>
            <span
              className={cn(
                "flex flex-none items-center gap-1.5 border px-2.5 py-2 font-mono text-[9.5px] tracking-[0.08em] uppercase",
                wishlist.size > 0
                  ? "border-grass/50 bg-grass/10 text-grass"
                  : "border-line text-steel",
              )}
              aria-live="polite"
            >
              <Heart filled={wishlist.size > 0} className="size-3" />
              {wishlist.size}
            </span>
          </div>
        </div>

        <motion.div
          layout
          className="mt-3 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence initial={false}>
            {gridItems.map((item, index) => (
              <motion.article
                layout
                key={item.id}
                initial={reduced ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="group flex flex-col overflow-hidden border-2 border-line bg-forge/70 transition-colors hover:border-grass/45"
              >
                <button
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className="text-left"
                  aria-label={`View ${item.name}`}
                >
                  <div className="relative aspect-[16/9] overflow-hidden border-b-2 border-black/40">
                    <StoreArt
                      seed={index + 3}
                      from={item.art.from}
                      to={item.art.to}
                      accent={item.art.accent}
                    />
                    <span className="absolute top-2 left-2 border border-black/50 bg-black/65 px-1.5 py-0.5 font-pixel text-[7px] text-bone">
                      {item.category}
                    </span>
                    {item.tag ? (
                      <span className="absolute top-2 right-2 border border-volt/45 bg-black/70 px-1.5 py-0.5 font-pixel text-[7px] text-volt">
                        {item.tag}
                      </span>
                    ) : null}
                  </div>
                  <div className="p-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-1 font-mono text-[9px] text-volt">
                        <Star className="size-2.5" />
                        {item.rating.toFixed(1)}
                        <span className="text-steel/70">
                          ({formatCount(item.reviews)})
                        </span>
                      </span>
                      <span className="font-mono text-[8.5px] text-steel">
                        {formatCount(item.downloads)} dl
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-[16px] leading-tight font-semibold text-bone">
                      {item.name}
                    </h3>
                    <p className="mt-0.5 font-mono text-[9px] text-steel">
                      by {item.creator}
                    </p>
                    <p className="mt-2 line-clamp-2 text-[11.5px] leading-relaxed text-[#a9bcad]">
                      {item.summary}
                    </p>
                  </div>
                </button>
                <div className="mt-auto flex items-center gap-2 border-t border-line/70 p-3">
                  <PriceTag item={item} />
                  <button
                    type="button"
                    onClick={() => setSelectedId(item.id)}
                    className="btn btn-ghost btn-sm ml-auto"
                  >
                    View
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleWish(item.id)}
                    aria-pressed={wishlist.has(item.id)}
                    aria-label={
                      wishlist.has(item.id)
                        ? `Remove ${item.name} from wishlist`
                        : `Add ${item.name} to wishlist`
                    }
                    className={cn(
                      "grid size-8 place-items-center border transition-colors",
                      wishlist.has(item.id)
                        ? "border-grass/55 bg-grass/10 text-grass"
                        : "border-line text-steel hover:border-grass/40 hover:text-grass",
                    )}
                  >
                    <Heart
                      filled={wishlist.has(item.id)}
                      className="size-3.5"
                    />
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {gridItems.length === 0 ? (
          <div className="mt-3 grid place-items-center border-2 border-dashed border-line px-6 py-14 text-center">
            <p className="font-display text-[18px] text-bone">
              Nothing matches that search.
            </p>
            <p className="mt-1 max-w-sm text-[12.5px] text-steel">
              Try a different category, or clear the search to see the whole
              preview catalog.
            </p>
            <button
              type="button"
              onClick={() => {
                setFilter("All");
                setQuery("");
              }}
              className="btn btn-ghost btn-sm mt-4"
            >
              Clear filters
            </button>
          </div>
        ) : null}

        <div className="mt-5 flex flex-col gap-2 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-2 font-mono text-[10px] leading-relaxed text-steel/70">
            <Icon name="spark" className="mt-px size-3 flex-none text-grass" />
            This is a browsable preview. Listings, prices and covers are sample
            data; checkout and downloads open with the launcher.
          </p>
          <a
            href="/news"
            className="flex flex-none items-center gap-1.5 font-mono text-[10px] tracking-[0.12em] text-steel uppercase transition-colors hover:text-grass"
          >
            Update log
            <Icon name="arrow" className="size-3" />
          </a>
        </div>
      </div>

      <AnimatePresence>
        {selected ? (
          <StoreDialog
            item={selected}
            wished={wishlist.has(selected.id)}
            onToggleWish={() => toggleWish(selected.id)}
            onClose={closeDialog}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
