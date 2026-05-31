import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  LandingHeroSection,
  LandingFeaturesSection,
  LandingHowItWorksSection,
  LandingPricingSection,
  LandingTestimonialsSection,
  LandingCtaSection,
} from "./landing";

export const Route = createFileRoute("/landing")({
  head: () => ({
    meta: [
      { title: "Escénika — Tu escenario empieza aquí" },
      { 
        name: "description", 
        content: "Escénika conecta artistas con organizadores de eventos en España. Sin comisiones, contacto directo, miles de talentos verificados." 
      },
    ],
  }),
  component: EscnikaLanding,
});

function EscnikaLanding() {
  return (
    <div className="min-h-dvh gradient-hero">
      <SiteHeader />
      <main>
        <LandingHeroSection />
        <LandingFeaturesSection />
        <LandingHowItWorksSection />
        <LandingPricingSection />
        <LandingTestimonialsSection />
        <LandingCtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}