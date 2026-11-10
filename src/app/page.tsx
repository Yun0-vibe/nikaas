import { Hero } from "@/components/Hero";
import { LoaderMarquee } from "@/components/LoaderMarquee";
import { ConsoleDemo } from "@/components/console/ConsoleDemo";
import { Features } from "@/components/Features";
import { CatalogShowcase } from "@/components/CatalogShowcase";
import { ChambersSection } from "@/components/ChambersSection";
import { DesignSection } from "@/components/DesignSection";
import { SafetySection } from "@/components/SafetySection";
import { CompareSection } from "@/components/CompareSection";
import { DownloadSection } from "@/components/DownloadSection";
import { FaqSection } from "@/components/FaqSection";
import { SITE, SITE_URL } from "@/lib/site";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE.name,
  applicationCategory: "GameApplication",
  operatingSystem: "Windows 10, Windows 11",
  description: SITE.description,
  url: SITE_URL,
  softwareVersion: "1.0.0",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Isolated per-world chamber folders",
    "Vanilla, Fabric, Forge and NeoForge loaders",
    "Built-in Modrinth mod catalog",
    "Microsoft device-code sign-in and offline profiles",
    "Live install and launch log",
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Hero />
      <LoaderMarquee />
      <ConsoleDemo />
      <Features />
      <CatalogShowcase />
      <ChambersSection />
      <DesignSection />
      <SafetySection />
      <CompareSection />
      <DownloadSection />
      <FaqSection />
    </>
  );
}