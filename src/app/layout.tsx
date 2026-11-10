import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SITE, SITE_URL } from "@/lib/site";
import { ToastProvider } from "@/components/ui/Toast";
import { Ambience } from "@/components/ui/Ambience";
import { ScrollProgress, BackToTop } from "@/components/ui/ScrollProgress";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

const grotesk = localFont({
  src: "../../public/fonts/grotesk-latin.woff2",
  variable: "--font-grotesk",
  weight: "500 700",
  display: "swap",
});

const inter = localFont({
  src: "../../public/fonts/inter-latin.woff2",
  variable: "--font-inter",
  weight: "400 700",
  display: "swap",
});

const jetbrains = localFont({
  src: "../../public/fonts/jetbrains-latin.woff2",
  variable: "--font-jetbrains",
  weight: "400 500",
  display: "swap",
});

const silkscreen = localFont({
  src: [
    {
      path: "../../public/fonts/silkscreen-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/silkscreen-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-silkscreen",
  display: "swap",
});

const SITE_TITLE = "Nikaas — Minecraft Java Edition Launcher for Windows";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "Minecraft launcher",
    "Minecraft Java Edition launcher",
    "Minecraft launcher for Windows",
    "Minecraft modpack launcher",
    "third-party Minecraft launcher",
    "Fabric launcher",
    "Forge launcher",
    "NeoForge launcher",
    "Modrinth launcher",
    "mod manager",
    "Minecraft 1.21 launcher",
    "Nikaas",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "games",
  classification: "Minecraft launcher",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: SITE_TITLE,
    description: SITE.description,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#070C09",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${grotesk.variable} ${inter.variable} ${jetbrains.variable} ${silkscreen.variable}`}
    >
      <body className="relative min-h-screen antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:bg-magma focus:px-4 focus:py-2 focus:font-mono focus:text-[11px] focus:tracking-[0.14em] focus:text-[#07120a] focus:uppercase"
        >
          Skip to content
        </a>

        <Ambience />
        <ScrollProgress />

        <ToastProvider>
          <div className="relative z-10 flex min-h-screen flex-col">
            <SiteHeader />
            <main id="main" className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </div>
          <BackToTop />
        </ToastProvider>
      </body>
    </html>
  );
}