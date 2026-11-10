import { ForgeMark } from "@/components/ui/ForgeMark";
import { Icon } from "@/components/console/Icon";

const EXPLORE = [
  { label: "The console", href: "#anatomy" },
  { label: "Features", href: "#features" },
  { label: "Catalog", href: "#catalog" },
  { label: "Chambers", href: "#chambers" },
];

const PRODUCT = [
  { label: "Design language", href: "#design" },
  { label: "Safety", href: "#safety" },
  { label: "Compare launchers", href: "#compare" },
  { label: "Download", href: "#download" },
];

const SUPPORT = [
  { label: "FAQ", href: "#faq" },
  { label: "System requirements", href: "#download" },
  { label: "Release status", href: "#download" },
];

export function SiteFooter() {
  return (
    <footer className="relative mt-8 border-t border-line bg-[#05060a]/70">
      <div className="container-forge py-12">
        <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <a href="#top" className="group inline-flex items-center gap-2.5">
              <ForgeMark className="size-8 transition-transform duration-500 group-hover:scale-110" />
              <span className="leading-none">
                <span className="block font-display text-[15px] font-bold tracking-[0.2em] text-bone">
                  NIKAAS
                </span>
                <span className="mt-1 block font-mono text-[8.5px] tracking-[0.34em] text-steel">
                  LAUNCHER
                </span>
              </span>
            </a>
            <p className="mt-3 max-w-[240px] text-[12px] leading-relaxed text-steel">
              Heavy modpacks. Clean pressure.
              <br />
              Dark by default, hot under load.
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
                    href={link.href}
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
                    href={link.href}
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
              <li>Minecraft required</li>
            </ul>
            <nav aria-label="Support" className="mt-4">
              <ul className="flex flex-wrap gap-x-4 gap-y-2">
                {SUPPORT.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
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