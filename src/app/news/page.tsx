import type { Metadata } from "next";
import Link from "next/link";
import { SITE, SITE_URL } from "@/lib/site";
import { RELEASES, KNOWN_ISSUES, type ChangeTag } from "@/lib/news";
import { Reveal } from "@/components/ui/Reveal";
import { VoxelBlock } from "@/components/ui/VoxelBlock";
import { Icon } from "@/components/console/Icon";

const NEWS_TITLE = "News & update log";
const NEWS_DESCRIPTION =
  "Build notes for the Nikaas Minecraft launcher: new features, fixes, the store preview and known issues — from the first private alpha to 0.9.4.";

export const metadata: Metadata = {
  title: NEWS_TITLE,
  description: NEWS_DESCRIPTION,
  alternates: { canonical: "/news" },
  openGraph: {
    type: "article",
    siteName: SITE.name,
    title: `${NEWS_TITLE} · ${SITE.name}`,
    description: NEWS_DESCRIPTION,
    url: "/news",
    locale: "en_US",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${NEWS_TITLE} · ${SITE.name}`,
    description: NEWS_DESCRIPTION,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/news#webpage`,
      url: `${SITE_URL}/news`,
      name: `${NEWS_TITLE} · ${SITE.name}`,
      description: NEWS_DESCRIPTION,
      inLanguage: "en",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      dateModified: RELEASES[0]?.date,
      about: { "@id": `${SITE_URL}/#software` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/news#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "News",
          item: `${SITE_URL}/news`,
        },
      ],
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/news#releases`,
      name: "Nikaas build notes",
      itemListElement: RELEASES.map((release, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${release.version} — ${release.title}`,
        url: `${SITE_URL}/news#v${release.version.replace(/\./g, "-")}`,
      })),
    },
  ],
};

const TAG_TONE: Record<ChangeTag, { fg: string; bg: string; bd: string }> = {
  Added: { fg: "#86E85A", bg: "rgba(134,232,90,.10)", bd: "rgba(134,232,90,.32)" },
  Changed: { fg: "#FFC94A", bg: "rgba(255,201,74,.10)", bd: "rgba(255,201,74,.32)" },
  Fixed: { fg: "#45E3CF", bg: "rgba(69,227,207,.10)", bd: "rgba(69,227,207,.32)" },
  Store: { fg: "#6FD64E", bg: "rgba(111,214,78,.10)", bd: "rgba(111,214,78,.32)" },
  Site: { fg: "#F3FFE8", bg: "rgba(243,255,232,.08)", bd: "rgba(243,255,232,.26)" },
};

const DATE = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

function formatDate(value: string) {
  return DATE.format(new Date(`${value}T00:00:00Z`));
}

const STATS = [
  { label: "Builds logged", value: String(RELEASES.length).padStart(2, "0") },
  { label: "Latest build", value: RELEASES[0]?.version ?? "—" },
  { label: "Channel", value: "Internal" },
  { label: "Platforms", value: "Windows 10/11" },
];

export default function NewsPage() {
  const latest = RELEASES[0];

  return (
    <article className="relative pb-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="relative overflow-hidden pt-[calc(var(--header-h)+52px)] pb-10 sm:pb-14">
        <div className="container-forge">
          <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
            <Reveal>
              <p className="eyebrow">
                <VoxelBlock kind="grass" className="w-3.5 shrink-0" />
                News · update log
              </p>
              <h1 className="mt-4 text-[clamp(34px,5.6vw,60px)] text-bone">
                Every build,
                <br />
                <span className="accent-text">written down.</span>
              </h1>
              <p className="lede mt-5 max-w-xl">
                Nikaas is in a private alpha. This is the full trail of what
                changed in each build — features added, bugs closed, and the
                store preview that arrived with the new grass theme.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link href="/#download" className="btn btn-primary btn-sm">
                  Get the current build
                  <span className="btn-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
                <Link href="/#tour" className="btn btn-ghost btn-sm">
                  <Icon name="deck" className="size-3.5" />
                  See the screens
                </Link>
              </div>
            </Reveal>

            {latest ? (
              <Reveal delay={0.08}>
                <div className="panel-forge seam-top relative overflow-hidden p-5">
                  <div className="flex items-center justify-between">
                    <span className="kicker">Latest build</span>
                    <span className="flex items-center gap-1.5 font-pixel text-[8px] tracking-[0.08em] text-grass uppercase">
                      <span className="pulse-dot" />
                      in testing
                    </span>
                  </div>
                  <p className="mt-3 font-pixel text-[38px] leading-none text-whitehot">
                    {latest.version}
                  </p>
                  <p className="mt-3 text-[13px] text-bone">{latest.title}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-line/80 pt-3 font-mono text-[10px] tracking-[0.1em] text-steel uppercase">
                    <time dateTime={latest.date}>{formatDate(latest.date)}</time>
                    <span>{latest.label}</span>
                  </div>
                </div>
              </Reveal>
            ) : null}
          </div>

          <Reveal delay={0.12}>
            <div className="mt-10 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="bg-forge px-4 py-3.5">
                  <p className="kicker">{stat.label}</p>
                  <p className="mt-1.5 font-pixel text-[13px] text-bone">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-forge pb-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div>
            <div className="flex items-end justify-between gap-4 border-b border-line pb-3">
              <h2 className="text-[22px] text-bone">Build notes</h2>
              <span className="font-mono text-[10px] tracking-[0.16em] text-steel uppercase">
                Newest first
              </span>
            </div>

            <div className="relative mt-6">
              <span
                aria-hidden="true"
                className="absolute top-3 bottom-3 left-[7px] w-px bg-gradient-to-b from-magma via-line to-transparent"
              />

              <ol className="space-y-4">
                {RELEASES.map((release, index) => {
                  const isLatest = index === 0;

                  return (
                    <li
                      key={release.version}
                      id={`v${release.version.replace(/\./g, "-")}`}
                      className="relative scroll-mt-28 pl-7 sm:pl-9"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute top-5 left-0 grid size-4 place-items-center border"
                        style={{
                          borderColor: isLatest ? "#5FCF4A" : "#364C3F",
                          background: isLatest ? "#5FCF4A" : "#0B110D",
                          boxShadow: isLatest
                            ? "0 0 16px rgba(95,207,74,.65)"
                            : "none",
                        }}
                      >
                        {!isLatest ? (
                          <span className="size-1.5 bg-steel/60" />
                        ) : null}
                      </span>

                      <Reveal y={18}>
                        <article
                          className={`panel-flat p-5 transition-colors duration-300 hover:border-linestrong sm:p-6 ${
                            isLatest
                              ? "border-magma/35 shadow-[0_0_46px_rgba(95,207,74,.10)]"
                              : ""
                          }`}
                        >
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                            <span className="font-pixel text-[14px] text-whitehot">
                              {release.version}
                            </span>
                            <time
                              dateTime={release.date}
                              className="font-mono text-[10.5px] tracking-[0.08em] text-steel uppercase"
                            >
                              {formatDate(release.date)}
                            </time>
                            <span className="pill">{release.label}</span>
                            {isLatest ? (
                              <span
                                className="ml-auto flex items-center gap-1.5 border px-2 py-1 font-pixel text-[7.5px] uppercase"
                                style={{
                                  color: "#07120a",
                                  background: "#86E85A",
                                  borderColor: "#1d4f22",
                                  boxShadow:
                                    "inset 1px 1px 0 rgba(255,255,255,.45), inset -1px -1px 0 rgba(0,0,0,.3)",
                                }}
                              >
                                Latest
                              </span>
                            ) : null}
                          </div>

                          <h3 className="mt-3 text-[19px] text-bone">
                            {release.title}
                          </h3>
                          <p className="mt-2 text-[12.5px] leading-relaxed text-steel">
                            {release.summary}
                          </p>

                          <ul className="mt-4 grid gap-2 border-t border-line/70 pt-4">
                            {release.changes.map((change) => {
                              const tone = TAG_TONE[change.tag];

                              return (
                                <li
                                  key={change.text}
                                  className="flex items-start gap-2.5"
                                >
                                  <span
                                    className="mt-px flex-none border px-1.5 py-0.5 font-pixel text-[7.5px] tracking-[0.06em] uppercase"
                                    style={{
                                      color: tone.fg,
                                      background: tone.bg,
                                      borderColor: tone.bd,
                                    }}
                                  >
                                    {change.tag}
                                  </span>
                                  <span className="text-[12.5px] leading-relaxed text-[#b4c4b8]">
                                    {change.text}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </article>
                      </Reveal>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>

          <aside className="lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:self-start">
            <Reveal delay={0.1}>
              <div className="panel-flat p-5">
                <div className="flex items-center justify-between border-b border-line pb-3">
                  <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-bone uppercase">
                    <Icon name="shield" className="size-3.5 text-volt" />
                    Known issues
                  </span>
                  <span className="pill border-volt/35 text-volt">0.9.x</span>
                </div>
                <ul className="mt-3 space-y-3">
                  {KNOWN_ISSUES.map((issue) => (
                    <li key={issue} className="flex gap-2.5">
                      <span
                        className="mt-0.5 grid size-4 flex-none place-items-center border border-volt/35 bg-volt/10 font-pixel text-[8px] text-volt"
                        aria-hidden="true"
                      >
                        !
                      </span>
                      <span className="text-[11.5px] leading-relaxed text-steel">
                        {issue}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="panel-flat mt-3 p-5">
                <span className="kicker">Build channel</span>
                <p className="mt-2 text-[11.5px] leading-relaxed text-steel">
                  Alpha builds are handed out directly, not downloaded from this
                  page. The download button on the main site opens the current
                  internal build request.
                </p>
                <Link
                  href="/#store"
                  className="mt-4 flex items-center justify-between border border-line bg-white/[0.03] px-3 py-2.5 text-[11px] text-bone transition-colors hover:border-magma/60 hover:text-whitehot"
                >
                  Browse the store preview
                  <Icon name="arrow" className="size-3.5 text-grass" />
                </Link>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <section className="container-forge pb-14">
        <Reveal>
          <div className="panel-forge seam-top flex flex-col items-start justify-between gap-5 p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <p className="kicker">Next up</p>
              <h2 className="mt-2 text-[24px] text-bone">
                The first stable build is still being assembled.
              </h2>
              <p className="mt-2 max-w-lg text-[12.5px] leading-relaxed text-steel">
                Alpha notes land here first. Until then, the screens tour and the
                store preview show exactly what the launcher looks like today.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/#tour" className="btn btn-primary btn-sm">
                Screens
                <Icon name="arrow" className="size-3.5" />
              </Link>
              <Link href="/#download" className="btn btn-ghost btn-sm">
                Waitlist
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </article>
  );
}
