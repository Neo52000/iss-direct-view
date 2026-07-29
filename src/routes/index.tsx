import { createFileRoute } from "@tanstack/react-router";
import { HeroLive } from "@/components/HeroLive";
import { StatsBar } from "@/components/StatsBar";
import { FeatureCards } from "@/components/FeatureCards";
import { EmailCapture } from "@/components/EmailCapture";
import { FAQ, faqJsonLd } from "@/components/FAQ";
import { homeFaq } from "@/data/faq";
import { BlogPreview } from "@/components/BlogPreview";
import { KitSection } from "@/components/KitSection";
import { SponsorBanner } from "@/components/AdSlot";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ISS Direct France — Voir l'ISS en direct depuis l'espace" },
      {
        name: "description",
        content:
          "Live ISS, position en temps réel et alertes de passage gratuites au-dessus de votre ville. Tout pour observer la Station Spatiale Internationale, en un seul endroit.",
      },
      { property: "og:title", content: "ISS Direct France — Voir l'ISS en direct" },
      {
        property: "og:description",
        content:
          "Live ISS, position en temps réel et alertes de passage gratuites au-dessus de votre ville. Tout pour observer la Station Spatiale Internationale, en un seul endroit.",
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
      {
        name: "twitter:title",
        content: "ISS Direct France — Voir l'ISS en direct depuis l'espace",
      },
      {
        name: "twitter:description",
        content:
          "Live ISS, position en temps réel et alertes de passage gratuites au-dessus de votre ville. Tout pour observer la Station Spatiale Internationale, en un seul endroit.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(faqJsonLd(homeFaq)),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <HeroLive />
      <StatsBar />
      <FeatureCards />
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SponsorBanner />
      </div>
      <EmailCapture />
      <FAQ items={homeFaq} />
      <BlogPreview />
      <KitSection />
    </>
  );
}
