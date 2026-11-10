import { Hero } from "@/components/Hero";
import { ProductTour } from "@/components/ProductTour";
import { ConsoleDemo } from "@/components/console/ConsoleDemo";
import { Features } from "@/components/Features";
import { StorePreview } from "@/components/StorePreview";
import { ChambersSection } from "@/components/ChambersSection";
import { DesignSection } from "@/components/DesignSection";
import { SafetySection } from "@/components/SafetySection";
import { CompareSection } from "@/components/CompareSection";
import { DownloadSection } from "@/components/DownloadSection";
import { FaqSection } from "@/components/FaqSection";
import { FAQ } from "@/lib/data";
import { SITE, SITE_URL } from "@/lib/site";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const SOFTWARE_ID = `${SITE_URL}/#software`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: SITE.name,
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: SITE.name,
      description: SITE.description,
      inLanguage: "en",
      publisher: { "@id": ORG_ID },
    },
    {
      "@type": "SoftwareApplication",
      "@id": SOFTWARE_ID,
      name: SITE.name,
      alternateName: "Nikaas — Minecraft Java Edition launcher",
      applicationCategory: "GameApplication",
      applicationSubCategory: "Minecraft launcher",
      operatingSystem: "Windows 10, Windows 11",
      description: SITE.description,
      url: SITE_URL,
      image: `${SITE_URL}/opengraph-image`,
      inLanguage: "en",
      isAccessibleForFree: true,
      softwareVersion: "1.0.0",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      publisher: { "@id": ORG_ID },
      featureList: [
        "Isolated per-world chamber folders",
        "Vanilla, Fabric, Forge and NeoForge loaders",
        "Built-in Modrinth mod catalog",
        "Browsable store preview with wishlists",
        "Microsoft device-code sign-in and offline profiles",
        "Live install and launch log",
        "Minecraft: Java Edition launcher for Windows",
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      isPartOf: { "@id": WEBSITE_ID },
      mainEntity: FAQ.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
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
      <ProductTour />
      <ConsoleDemo />
      <Features />
      <StorePreview />
      <ChambersSection />
      <DesignSection />
      <SafetySection />
      <CompareSection />
      <DownloadSection />
      <FaqSection />
    </>
  );
}