import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Check, Sparkles, Star, Crown, Clock } from "lucide-react";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/precios")({
  head: () => ({
    meta: [
      { title: "Planes — Spot&Shows" },
      { name: "description", content: "Spot&Shows Free (Beta): publica tu perfil de artista gratis durante el lanzamiento. Standard y Pro muy pronto." },
    ],
  }),
  component: PricingPage,
});

type Plan = {
  icon: typeof Sparkles;
  name: string;
  badge?: string;
  price: string;
  period?: string;
  desc: string;
  features: string[];
  cta: string;
  popular?: boolean;
  comingSoon?: boolean;
};

const plans: Plan[] = [
  {
    icon: Sparkles,
    name: "Spot&Shows Free",
    badge: "Beta · Disponible ahora",
    price: "0€",
    period: "/mes",
    desc: "Empieza con nosotros durante el lanzamiento",
    popular: true,
    features: [
      "1 fotografía de presentación",
      "Descripción y biografía artística",
      "Precio orientativo desde",
      "Exigencias técnicas y rider",
      "Ciudad y disciplina principal",
      "Visible para organizadores de eventos",
      "Sin permanencia · sin comisiones",
    ],
    cta: "Crear cuenta gratis",
  },
  {
    icon: Star,
    name: "Spot&Shows Standard",
    badge: "Próximamente",
    price: "6€",
    period: "/mes",
    desc: "Para cuando quieras destacar de verdad",
    comingSoon: true,
    features: [
      "1 vídeo de presentación (hasta 8 s)",
      "Galería ampliada de imágenes",
      "Promoción en nuestra web",
      "Promoción en redes sociales",
      "Aparición destacada en búsquedas",
    ],
    cta: "Disponible pronto",
  },
  {
    icon: Crown,
    name: "Spot&Shows Pro",
    badge: "Próximamente",
    price: "—",
    desc: "Plan avanzado para artistas profesionales",
    comingSoon: true,
    features: [
      "Vídeos ilimitados",
      "Galería completa de fotos",
      "Badge verificado exclusivo",
      "Gestión multi-proyecto",
      "Soporte prioritario",
    ],
    cta: "Disponible pronto",
  },
];

function PricingPage() {
  return (
    <div className="min-h-dvh gradient-hero">
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-24">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-card/50 px-4 py-1.5 text-xs uppercase tracking-wider text-gold backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> Lanzamiento Beta
          </span>
          <h1 className="mt-5 font-display text-5xl md:text-6xl">Planes para artistas</h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Somos solo intermediarios: publicamos eventos gratuitos y cobramos una suscripción a los artistas según su plan. Sin comisiones por contrato.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {plans.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.name}
                className={`relative flex flex-col rounded-2xl border p-7 transition-all ${
                  p.popular
                    ? "border-gold/50 gradient-card shadow-glow hover:-translate-y-1"
                    : p.comingSoon
                    ? "border-border bg-card/30 opacity-80"
                    : "border-border gradient-card shadow-card hover:-translate-y-1"
                }`}
              >
                {p.badge && (
                  <span
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                      p.popular
                        ? "gradient-gold text-gold-foreground"
                        : "border border-border bg-background text-muted-foreground"
                    }`}
                  >
                    {p.comingSoon && <Clock className="mr-1 inline h-3 w-3" />}
                    {p.badge}
                  </span>
                )}

                <div className="flex items-center gap-2">
                  <img src={logo} alt="" className="h-6 w-auto" />
                  <Icon className={`h-5 w-5 ${p.comingSoon ? "text-muted-foreground" : "text-gold"}`} />
                </div>

                <h3 className="mt-4 font-display text-2xl">{p.name}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-5xl">{p.price}</span>
                  {p.period && <span className="text-sm text-muted-foreground">{p.period}</span>}
                </div>

                <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${p.comingSoon ? "text-muted-foreground" : "text-gold"}`} />
                      <span className={p.comingSoon ? "text-muted-foreground" : ""}>{f}</span>
                    </li>
                  ))}
                </ul>

                {p.comingSoon ? (
                  <Button variant="outline" disabled className="mt-7 w-full rounded-full">
                    {p.cta}
                  </Button>
                ) : (
                  <Button asChild variant="gold" className="mt-7 w-full rounded-full">
                    <Link to="/registro">{p.cta}</Link>
                  </Button>
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Estamos en beta. Los planes Standard y Pro se abrirán muy pronto — los artistas Free tendrán prioridad.
        </p>
      </section>
      <SiteFooter />
    </div>
  );
}
