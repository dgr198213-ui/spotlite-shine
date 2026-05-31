import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SubscriptionManager } from "@/components/subscription-manager";
import { Button } from "@/components/ui/button";
import { Video, MessageCircle, Star, Pencil, Image, CheckCircle, AlertCircle, Crown } from "lucide-react";

export const Route = createFileRoute("/_authenticated/panel")({
  head: () => ({ meta: [{ title: "Mi panel — Escénika" }] }),
  component: DashboardPage,
});

function DashboardPage() {
  const { user } = useAuth();

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user!.id)
        .single();
      if (error) throw error;
      return data;
    },
  });

  const { data: mediaStats } = useQuery({
    queryKey: ["media-stats", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("media")
        .select("type")
        .eq("user_id", user!.id);
      if (error) throw error;
      const images = data?.filter((m) => m.type === "image").length ?? 0;
      const videos = data?.filter((m) => m.type === "video").length ?? 0;
      return { images, videos };
    },
  });

  const { data: messageStats } = useQuery({
    queryKey: ["message-stats", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("is_read")
        .eq("recipient_id", user!.id);
      if (error) throw error;
      const unread = data?.filter((m) => !m.is_read).length ?? 0;
      return { total: data?.length ?? 0, unread };
    },
  });

  const planLabel: Record<string, string> = {
    spark: "Spark (Gratis)",
    spotlight: "Spotlight",
    headliner: "Headliner",
  };

  const planColor: Record<string, string> = {
    spark: "text-muted-foreground",
    spotlight: "text-gold",
    headliner: "text-gold",
  };

  const currentPlan = profile?.plan ?? "spark";

  return (
    <div className="min-h-dvh gradient-hero">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 pt-12 pb-20">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Panel de control</p>
            <h1 className="font-display text-4xl md:text-5xl">
              ¡Hola,{" "}
              <span className="text-gradient-gold">{profile?.display_name ?? "Artista"}</span>! 👋
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Aquí tienes un resumen de tu actividad en Escénika.
            </p>
          </div>
          <Button asChild variant="gold" className="rounded-full">
            <Link to="/perfil">
              <Pencil className="mr-1 h-4 w-4" /> Editar perfil
            </Link>
          </Button>
        </div>

        {/* Alerta perfil no publicado */}
        {profile && !profile.is_published && (
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
            <div>
              <p className="font-medium text-amber-300">Tu perfil no está publicado</p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Los organizadores no pueden encontrarte. Completa tu perfil y activa la visibilidad.
              </p>
              <Button asChild variant="outline" size="sm" className="mt-3 rounded-full">
                <Link to="/perfil">Publicar perfil</Link>
              </Button>
            </div>
          </div>
        )}

        {profile && profile.is_published && (
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-green-500/30 bg-green-500/10 p-4">
            <CheckCircle className="h-5 w-5 shrink-0 text-green-400" />
            <p className="text-sm text-green-300">
              Tu perfil está <strong>publicado</strong> y visible para los organizadores.
            </p>
          </div>
        )}

        {/* Estadísticas reales */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-4">
          <Stat
            icon={Image}
            label="Fotos subidas"
            value={String(mediaStats?.images ?? 0)}
            hint={`Plan ${planLabel[currentPlan]}`}
          />
          <Stat
            icon={Video}
            label="Vídeos subidos"
            value={String(mediaStats?.videos ?? 0)}
            hint={currentPlan === "spark" ? "No disponible en Spark" : `Plan ${planLabel[currentPlan]}`}
          />
          <Stat
            icon={MessageCircle}
            label="Mensajes"
            value={String(messageStats?.total ?? 0)}
            hint={(messageStats?.unread ?? 0) > 0 ? `${messageStats!.unread} sin leer` : "Todo leído"}
          />
          <Stat
            icon={Star}
            label="Reseñas"
            value={String(profile?.reviews_count ?? 0)}
            hint={profile?.rating ? `${profile.rating} ★ de media` : "Aún sin reseñas"}
          />
        </div>

        {/* Secciones principales */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Panel title="Tu perfil público">
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Nombre artístico</span>
                <span className="font-medium text-foreground">{profile?.display_name || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span>Categoría</span>
                <span className="font-medium text-foreground capitalize">{profile?.category || "Sin definir"}</span>
              </div>
              <div className="flex justify-between">
                <span>Ciudad</span>
                <span className="font-medium text-foreground">{profile?.city || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span>Precio desde</span>
                <span className="font-medium text-gold">
                  {profile?.price_from ? `${profile.price_from}€` : "No indicado"}
                </span>
              </div>
            </div>
            <Button asChild variant="gold" className="mt-5 w-full rounded-full">
              <Link to="/perfil">Editar perfil</Link>
            </Button>
          </Panel>

          <Panel title="Tu plan actual">
            <div className="flex items-center gap-3">
              <Crown className={`h-6 w-6 ${planColor[currentPlan]}`} />
              <div>
                <p className={`font-display text-2xl ${planColor[currentPlan]}`}>
                  {planLabel[currentPlan]}
                </p>
                <p className="text-sm text-muted-foreground">
                  {currentPlan === "spark"
                    ? "Plan gratuito — sin comisiones"
                    : currentPlan === "spotlight"
                      ? "6€/mes — más visibilidad"
                      : "19€/mes — máxima visibilidad"}
                </p>
              </div>
            </div>
            {currentPlan === "spark" && (
              <p className="mt-3 text-xs text-muted-foreground">
                Actualiza para subir vídeos, más fotos y aparecer primero en las búsquedas.
              </p>
            )}
            <Button
              asChild
              variant={currentPlan === "spark" ? "gold" : "outline"}
              className="mt-5 w-full rounded-full"
            >
              <Link to="/precios">
                {currentPlan === "spark" ? "Mejorar plan" : "Ver planes"}
              </Link>
            </Button>
          </Panel>
        </div>

        {/* Gestión de suscripción — solo si tiene plan de pago */}
        {currentPlan !== "spark" && (
          <section className="mt-8">
            <h2 className="mb-4 font-display text-2xl">Gestión de suscripción</h2>
            <SubscriptionManager />
          </section>
        )}

        {/* Accesos rápidos */}
        <section className="mt-10">
          <h2 className="mb-4 font-display text-2xl">Accesos rápidos</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <QuickLink to="/perfil" icon={Pencil} title="Editar perfil" desc="Actualiza tu bio, fotos y precio" />
            <QuickLink to="/explorar" icon={Crown} title="Ver el explorador" desc="Así te ven los organizadores" />
            <QuickLink to="/precios" icon={Crown} title="Ver planes" desc="Compara Spark, Spotlight y Headliner" />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function QuickLink({
  to,
  icon: Icon,
  title,
  desc,
}: {
  to: string;
  icon: React.ElementType;
  title: string;
  desc: string;
}) {
  return (
    <Link
      to={to}
      className="flex items-start gap-3 rounded-xl border border-border gradient-card p-4 shadow-card transition-all hover:-translate-y-0.5 hover:border-gold/30 hover:shadow-gold"
    >
      <div className="mt-0.5 rounded-lg bg-gold/10 p-2">
        <Icon className="h-4 w-4 text-gold" />
      </div>
      <div>
        <p className="font-medium">{title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>
      </div>
    </Link>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-2xl border border-border gradient-card p-5 shadow-card">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
        <Icon className="h-4 w-4 text-gold" />
      </div>
      <p className="mt-3 font-display text-3xl">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border gradient-card p-6 shadow-card">
      <h2 className="font-display text-xl">{title}</h2>
      <div className="mt-3">{children}</div>
    </div>
  );
}
