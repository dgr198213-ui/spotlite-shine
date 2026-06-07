// Pricing section component
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Sparkles as SparklesIcon, Clock, Check } from "lucide-react";
import { pricingPlans } from "./pricing-data";

export function PricingSection() {
  return (
    <section id="planes" className="mx-auto max-w-6xl px-6 py-20">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-card/50 px-4 py-1.5 text-xs uppercase tracking-wider text-gold backdrop-blur">
          <SparklesIcon className="h-3.5 w-3.5" /> Lanzamiento Beta
        </span>
        <h2 className="mt-5 font-display text-4xl md:text-5xl">Planes para artistas</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Somos solo intermediarios: publicamos eventos gratuitos y cobramos una suscripción a los
          artistas. Sin comisiones por contrato.
        </p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {pricingPlans.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-2xl border p-7 transition-all border-border gradient-card shadow-card hover:-translate-y-1 ${
                p.popular ? "border-gold/50 shadow-glow md:scale-105 z-10" : ""
              }`}
            >
              <span
                className={`absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                  p.popular
                    ? "gradient-gold text-gold-foreground"
                    : "border border-border bg-background text-muted-foreground"
                }`}
              >
                {p.badge}
              </span>
              <div className="flex items-center gap-2">
                <Icon className="h-6 w-6 text-gold" />
              </div>
              <h3 className="mt-4 font-display text-2xl">{p.name}</h3>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-4 font-display text-5xl">
                {p.price}
                <span className="text-sm text-muted-foreground">
                  {p.price !== "—" ? "/mes" : ""}
                </span>
              </div>
              <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${p.comingSoon ? "text-muted-foreground" : "text-gold"}`}
                    />
                    <span className={p.comingSoon ? "text-muted-foreground" : ""}>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                variant={p.popular ? "gold" : "outline"}
                className="mt-7 w-full rounded-full"
              >
                <Link to="/registro">{p.cta}</Link>
              </Button>
            </div>
          );
        })}
      </div>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        <Link to="/precios" className="underline-offset-4 hover:underline">
          Ver detalles completos de los planes →
        </Link>
      </p>
    </section>
  );
}
