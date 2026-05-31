import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  HeroSection,
  CategoriesSection,
  HowItWorksSection,
  FeaturedSection,
  ShowCaseSection,
  PricingSection,
  CtaSection,
} from "./home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Escénika — Tu escenario, tu audiencia, tu momento" },
      {
        name: "description",
        content:
          "Conecta con eventos y consigue tu próximo escenario. Sin comisiones, perfil profesional en 5 minutos.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-dvh gradient-hero">
      <SiteHeader />
      <main>
        <HeroSection />
        <CategoriesSection />
        <HowItWorksSection />
        <FeaturedSection />
        <ShowCaseSection />
        <PricingSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}