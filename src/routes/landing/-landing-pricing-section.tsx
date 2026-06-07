// Landing page pricing section
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { plans } from "./landing-data";

export function LandingPricingSection() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 py-20" id="planes">
      <div className="text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-gold">
          Planes para Artistas
        </span>
        <h2 className="mt-4 font-display text-4xl md:text-5xl">
          Elige el plan que
          <br />
          impulsa tu carrera
        </h2>
        <p className="mx-auto mt-4 max-w-[520px] text-muted-foreground">
          Empieza gratis. Escala cuando quieras. Sin comisiones en ningún plan. Los eventos son
          siempre gratuitos.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex flex-col rounded-xl border p-8 transition-all ${
              plan.featured
                ? "border-gold/50 gradient-card shadow-glow hover:-translate-y-1"
                : "border-border bg-card/50 hover:-translate-y-1"
            }`}
          >
            {plan.badge && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full gradient-gold px-3 py-1 text-xs font-bold text-gold-foreground">
                {plan.badge}
              </span>
            )}

            <div className="font-display text-xl font-bold">{plan.name}</div>
            <div className="mt-2 font-display text-4xl font-bold text-gold">
              {plan.price}
              <span className="text-base text-muted-foreground">{plan.period}</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{plan.desc}</p>

            <ul className="mt-6 flex-1 space-y-3">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground"
                >
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              asChild
              variant={plan.featured ? "gold" : "outline"}
              className="mt-8 w-full rounded-full"
            >
              <Link to={plan.ctaLink}>{plan.cta}</Link>
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
