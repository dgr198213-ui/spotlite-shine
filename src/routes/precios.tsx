import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Check, Sparkles, Star, Crown } from "lucide-react";

export const Route = createFileRoute("/precios")({
  head: () => ({
    meta: [
      { title: "Precios — Spotlite" },
      { name: "description", content: "Planes Spark, Spotlight y Headliner. Sin comisiones por contrato. Cobra directamente, fija tus condiciones." },
    ],
  }),
  component: PricingPage,
});

const plans = [
  {
    icon: Sparkles,
    name: "Spark",
    price: 9,
    desc: "Empieza tu camino",
    features: ["Perfil básico profesional", "1 vídeo de presentación", "3 fotos de galería", "Chat directo con clientes", "Sin comisiones"],
    cta: "Empezar",
  },
  {
    icon: Star,
    name: "Spotlight",
    price: 19,
    desc: "Todo lo de Spark, más:",
    popular: true,
    features: ["Perfil destacado", "3 vídeos", "10 fotos", "Calendario de disponibilidad", "Prioridad en búsquedas", "Estadísticas avanzadas"],
    cta: "Elegir Spotlight",
  },
  {
    icon: Crown,
    name: "Headliner",
    price: 39,
    desc: "Todo lo de Spotlight, más:",
    features: ["Vídeos ilimitados", "30 fotos", "Badge exclusivo", "Gestión de múltiples proyectos", "Soporte prioritario", "Personalización avanzada"],
    cta: "Elegir Headliner",
  },
];

function PricingPage() {
  return (
    <div className="min-h-dvh gradient-hero">
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-24">
        <div className="text-center">
          <h1 className="font-display text-5xl md:text-6xl">Planes para artistas</h1>
          <p className="mt-4 text-muted-foreground">Sin comisiones por contrato. Tú cobras directamente.</p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {plans.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.name}
                className={`relative rounded-2xl border p-7 transition-all hover:-translate-y-1 ${
                  p.popular
                    ? "border-gold/50 gradient-card shadow-glow"
                    : "border-border gradient-card shadow-card"
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full gradient-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-foreground">
                    Más popular
                  </span>
                )}
                <Icon className="h-7 w-7 text-gold" />
                <h3 className="mt-4 font-display text-2xl">{p.name}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-5xl">{p.price}€</span>
                  <span className="text-sm text-muted-foreground">/mes</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {f}
                    </li>
                  ))}
                </ul>
                <Button asChild variant={p.popular ? "gold" : "outline"} className="mt-7 w-full rounded-full">
                  <Link to="/registro">{p.cta}</Link>
                </Button>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          ¿Tienes dudas? <Link to="/" className="text-gold hover:underline">Contáctanos</Link>
        </p>
      </section>
      <SiteFooter />
    </div>
  );
}
