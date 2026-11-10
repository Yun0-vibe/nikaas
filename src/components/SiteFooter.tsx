"use client";

import { usePathname } from "next/navigation";
import { ForgeMark } from "@/components/ui/ForgeMark";
import { Icon } from "@/components/console/Icon";

const EXPLORE = [
  { label: "Screens", href: "#tour" },
  { label: "The console", href: "#anatomy" },
  { label: "Store preview", href: "#store" },
  { label: "Update log", href: "/news" },
];

const PRODUCT = [
  { label: "Features", href: "#features" },
  { label: "Chambers", href: "#chambers" },
  { label: "Design language", href: "#design" },
  { label: "Download", href: "#download" },
];

const SUPPORT = [
  { label: "FAQ", href: "#faq" },
  { label: "Compare launchers", href: "#compare" },
  { label: "System requirements", href: "#download" },
];

export function SiteFooter() {
  const pathname = usePathname();
  const offHome = pathname !== "/";
  const toHref = (href: string) =>
    offHome && href.startsWith("#") ? `/${href}` : href;

  return (
    <footer className="relative mt-8 border-t border-line bg-[#050a08]/70">
      <div className="container-forge py-12">
        <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <a href="#top" className="group inline-flex items-center gap-2.5">
              <ForgeMark className="size-8 transition-transform duration-500 group-hover:scale-110" />
              <span className="leading-none">
                <span className="block font-display text-[15px] font-bold tracking-[0.2em] text-bone">
                  NIKAAS
                </span>
                <span className="mt-1 block font-pixel text-[7.5px] tracking-[0.16em] text-grass/90">
                  MC LAUNCHER
                </span>
              </span>
            </a>
            <p className="mt-3 max-w-[260px] text-[12px] leading-relaxed text-steel">
              A third-party Minecraft: Java Edition launcher for Windows.
              <br />
              Heavy modpacks. Clean pressure.
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              <span className="pill">v1.0.0</span>
              <span className="pill border-volt/35 text-volt">unreleased</span>
            </div>
          </div>

          <nav aria-label="Explore">
            <h4 className="font-mono text-[9.5px] tracking-[0.22em] text-steel uppercase">
              Explore
            </h4>
            <ul className="mt-3 space-y-2">
              {EXPLORE.map((link) => (
                <li key={link.label}>
                  <a
                    href={toHref(link.href)}
                    className="text-[12.5px] text-[#b6bdc8] transition-colors hover:text-volt"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Product">
            <h4 className="font-mono text-[9.5px] tracking-[0.22em] text-steel uppercase">
              Product
            </h4>
            <ul className="mt-3 space-y-2">
              {PRODUCT.map((link) => (
                <li key={link.label}>
                  <a
                    href={toHref(link.href)}
                    className="text-[12.5px] text-[#b6bdc8] transition-colors hover:text-volt"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4 className="font-mono text-[9.5px] tracking-[0.22em] text-steel uppercase">
              Platform
            </h4>
            <ul className="mt-3 space-y-2 text-[12.5px] text-[#b6bdc8]">
              <li>Windows 10 / 11 · 64-bit</li>
              <li>Signed installer at release</li>
              <li>Microsoft + offline accounts</li>
              <li>Minecraft: Java Edition required</li>
            </ul>
            <nav aria-label="Support" className="mt-4">
              <ul className="flex flex-wrap gap-x-4 gap-y-2">
                {SUPPORT.map((link) => (
                  <li key={link.label}>
                    <a
                      href={toHref(link.href)}
                      className="font-mono text-[10px] text-steel transition-colors hover:text-volt"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] text-steel">
            © 2026 Nikaas Launcher · built for Windows
          </p>
          <p className="max-w-xl font-mono text-[9.5px] leading-relaxed text-steel/60">
            Not affiliated with Mojang Studios or Microsoft. Minecraft is a
            trademark of Mojang AB. The console on this page is an interactive
            preview, not the shipped launcher.
          </p>
          <a
            href="#top"
            className="flex items-center gap-1.5 font-mono text-[9.5px] tracking-[0.14em] text-steel uppercase transition-colors hover:text-volt"
          >
            Top
            <Icon name="chevron" className="size-3 rotate-180" />
          </a>
        </div>
      </div>
    </footer>
  );
}