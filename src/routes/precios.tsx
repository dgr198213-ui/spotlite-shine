import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Check, Sparkles, Star, Crown } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/precios")({
  head: () => ({
    meta: [
      { title: "Planes y Precios — Escénika" },
      {
        name: "description",
        content:
          "Elige el plan perfecto para tu carrera artística. Desde gratuito hasta profesional.",
      },
      // Open Graph
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Escénika" },
      { property: "og:title", content: "Escénika — Tu escenario empieza aquí" },
      {
        property: "og:description",
        content: "Elige el plan perfecto para tu carrera artística. Sin comisiones.",
      },
      { property: "og:url", content: "https://spotlite-shine.vercel.app/precios" },
      {
        property: "og:image",
        content: "https://spotlite-shine.vercel.app/assets/og-banner.png",
      },
      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Escénika — Tu escenario empieza aquí" },
      {
        name: "twitter:description",
        content: "Elige el plan perfecto para tu carrera artística. Sin comisiones.",
      },
      {
        name: "twitter:image",
        content: "https://spotlite-shine.vercel.app/assets/og-banner.png",
      },
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
  ctaAction: "register" | "subscribe" | "disabled";
  popular?: boolean;
  planId?: string;
};

const plans: Plan[] = [
  {
    icon: Sparkles,
    name: "Spark",
    badge: "Disponible ahora",
    price: "0€",
    period: "/mes",
    desc: "Perfecto para empezar",
    popular: true,
    ctaAction: "register",
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
    name: "Spotlight",
    badge: "Recomendado",
    price: "6€",
    period: "/mes",
    desc: "Para cuando quieras destacar",
    ctaAction: "subscribe",
    planId: "spotlight",
    features: [
      "1 vídeo de presentación (hasta 8 s)",
      "6 fotografías en galería",
      "Promoción en nuestra web",
      "Promoción en redes sociales",
      "Aparición destacada en búsquedas",
      "Soporte prioritario",
    ],
    cta: "Suscribirse ahora",
  },
  {
    icon: Crown,
    name: "Headliner",
    badge: "Profesional",
    price: "19€",
    period: "/mes",
    desc: "Para artistas profesionales",
    ctaAction: "subscribe",
    planId: "headliner",
    features: [
      "Vídeos ilimitados (sin límite de duración)",
      "100 fotografías en galería",
      "Badge verificado exclusivo",
      "Acceso a eventos premium",
      "Análisis detallado de perfil",
      "Soporte 24/7",
    ],
    cta: "Suscribirse ahora",
  },
];

function PricingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<string | null>(null);

  const handleAction = async (plan: Plan) => {
    if (plan.ctaAction === "register") {
      navigate({ to: "/registro" });
      return;
    }

    if (plan.ctaAction === "disabled") {
      toast.info("Este plan estará disponible pronto");
      return;
    }

    if (!user) {
      navigate({ to: "/registro" });
      return;
    }

    if (plan.ctaAction === "subscribe" && plan.planId) {
      setLoading(plan.planId);
      try {
        // Call the checkout endpoint
        const response = await fetch("/api/stripe/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            planId: plan.planId,
            successUrl: `${window.location.origin}/panel?session_id={CHECKOUT_SESSION_ID}`,
            cancelUrl: `${window.location.origin}/precios`,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Error al crear sesión de checkout");
        }

        const { url } = await response.json();
        if (url) {
          // Redirect to Stripe checkout
          window.location.href = url;
        } else {
          toast.error("No se pudo obtener la URL de checkout");
        }
      } catch (error) {
        console.error("Subscription error:", error);
        toast.error(
          error instanceof Error
            ? error.message
            : "Error al procesar la suscripción. Intenta de nuevo.",
        );
      } finally {
        setLoading(null);
      }
    }
  };

  return (
    <div className="min-h-dvh gradient-hero">
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-24">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-card/50 px-4 py-1.5 text-xs uppercase tracking-wider text-gold backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> Planes para artistas
          </span>
          <h1 className="mt-5 font-display text-5xl md:text-6xl">Elige tu plan</h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Somos solo intermediarios: publicamos eventos gratuitos y cobramos una suscripción
            opcional a los artistas según su plan. Sin comisiones por contrato.
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
                    ? "border-gold/50 gradient-card shadow-glow hover:-translate-y-1 md:scale-105"
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
                    {p.badge}
                  </span>
                )}

                <div className="flex items-center gap-2">
                  <img src={logo} alt="" className="h-7 w-auto" />
                  <Icon className="h-5 w-5 text-gold" />
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
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleAction(p)}
                  disabled={loading === p.planId}
                  variant={p.popular ? "gold" : "outline"}
                  className="mt-7 w-full rounded-full"
                >
                  {loading === p.planId ? "Procesando..." : p.cta}
                </Button>
              </div>
            );
          })}
        </div>

        <div className="mt-16 rounded-2xl border border-border gradient-card p-10">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="font-display text-lg">Sin comisiones</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Tú cobras directamente del cliente. Escénika solo cobra la suscripción opcional.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg">Cancela cuando quieras</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Sin permanencia. Cancela tu suscripción en cualquier momento desde tu panel.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg">Acceso inmediato</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Activa tu plan al instante. Empieza a subir contenido y recibir solicitudes.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            ¿Preguntas? Contáctanos en{" "}
            <a href="mailto:hola@escenika.com" className="text-gold hover:underline">
              hola@escenika.com
            </a>
          </p>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
