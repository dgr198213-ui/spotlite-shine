import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Check, Sparkles, Star, Crown } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export const Route = createFileRoute("/precios")({
  head: () => ({
    meta: [
      { title: "Planes y Precios — Escénika" },
      {
        name: "description",
        content:
          "Elige el plan perfecto para tu carrera artística. Desde gratuito hasta profesional.",
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
    name: "Free",
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
    name: "Standard",
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
    name: "Pro",
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
    <div className="min-h-dvh bg-background">
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-24">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Planes para artistas
          </p>
          <h1 className="mt-3 font-display text-5xl tracking-tight md:text-6xl">Elige tu plan</h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Somos solo intermediarios: publicamos eventos gratuitos y cobramos una suscripción
            opcional a los artistas según su plan. Sin comisiones por contrato.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {plans.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.name}
                className={`relative flex flex-col rounded-xl border p-8 transition-all ${
                  p.popular
                    ? "border-primary/30 bg-card shadow-gold hover:-translate-y-1 md:scale-105"
                    : "border-border bg-card shadow-card hover:-translate-y-1"
                }`}
              >
                {p.badge && (
                  <span
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider ${
                      p.popular
                        ? "gradient-gold text-gold-foreground"
                        : "border border-border bg-background text-muted-foreground"
                    }`}
                  >
                    {p.badge}
                  </span>
                )}

                <div className="flex items-center gap-3">
                  <Icon className="h-6 w-6 text-primary" />
                </div>

                <h3 className="mt-5 font-display text-2xl">{p.name}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>

                <div className="mt-5 flex items-baseline gap-1">
                  <span className="font-display text-5xl">{p.price}</span>
                  {p.period && <span className="text-sm text-muted-foreground">{p.period}</span>}
                </div>

                <ul className="mt-6 flex-1 space-y-3 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleAction(p)}
                  disabled={loading === p.planId}
                  variant={p.popular ? "gold" : "outline"}
                  className="mt-8 w-full"
                >
                  {loading === p.planId ? "Procesando..." : p.cta}
                </Button>
              </div>
            );
          })}
        </div>

        <div className="mt-20 rounded-xl border border-border bg-card p-10 shadow-card">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="font-display text-xl">Sin comisiones</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Tú cobras directamente del cliente. Escénika solo cobra la suscripción opcional.
              </p>
            </div>
            <div>
              <h3 className="font-display text-xl">Cancela cuando quieras</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Sin permanencia. Cancela tu suscripción en cualquier momento desde tu panel.
              </p>
            </div>
            <div>
              <h3 className="font-display text-xl">Acceso inmediato</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Activa tu plan al instante. Empieza a subir contenido y recibir solicitudes.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            ¿Preguntas? Contáctanos en{" "}
            <a href="mailto:hola@escenika.com" className="text-primary hover:underline">
              hola@escenika.com
            </a>
          </p>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
