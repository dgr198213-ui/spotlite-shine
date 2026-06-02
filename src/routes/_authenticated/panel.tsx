import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Eye, Video, MessageCircle, Star, Pencil } from "lucide-react";

export const Route = createFileRoute("/_authenticated/panel")({
  head: () => ({ meta: [{ title: "Mi panel — Spot&Shows" }] }),
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

<<<<<<< Updated upstream
=======
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
    spark: "Escénika Free",
    spotlight: "Escénika Standard",
    headliner: "Escénika Pro",
  };

  const planColor: Record<string, string> = {
    spark: "text-muted-foreground",
    spotlight: "text-gold",
    headliner: "text-gold",
  };

  const currentPlan = profile?.plan ?? "spark";

>>>>>>> Stashed changes
  return (
    <div className="min-h-dvh gradient-hero">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 pt-12 pb-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Panel</p>
            <h1 className="font-display text-4xl md:text-5xl">
              ¡Hola,{" "}
              <span className="text-gradient-gold">{profile?.display_name ?? "Artista"}</span>! 👋
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Aquí tienes un resumen de tu actividad reciente.
            </p>
          </div>
          <Button asChild variant="gold" className="rounded-full">
            <Link to="/perfil">
              <Pencil className="mr-1 h-4 w-4" /> Editar perfil
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-4">
          <Stat icon={Eye} label="Vistas del perfil" value="0" hint="+0% esta semana" />
          <Stat icon={Video} label="Vídeos subidos" value="0" hint="Plan Spark: 1" />
          <Stat icon={MessageCircle} label="Mensajes" value="0" hint="Sin leer" />
          <Stat
            icon={Star}
            label="Reseñas"
            value={String(profile?.reviews_count ?? 0)}
            hint={profile?.rating ? `${profile.rating} ★` : "Aún sin reseñas"}
          />
        </div>

        <section className="mt-12 grid gap-6 md:grid-cols-2">
          <Panel title="Completa tu perfil">
            <p className="text-sm text-muted-foreground">
              Tu perfil está {profile?.is_published ? "publicado" : "sin publicar"}. Añade foto,
              biografía y categoría para empezar a recibir solicitudes.
            </p>
            <Button asChild variant="gold" className="mt-4 rounded-full">
              <Link to="/perfil">Completar ahora</Link>
            </Button>
          </Panel>
          <Panel title="Tu plan actual">
<<<<<<< Updated upstream
            <p className="font-display text-2xl capitalize">{profile?.plan ?? "spark"}</p>
            <p className="mt-1 text-sm text-muted-foreground">¿Listo para más visibilidad?</p>
            <Button asChild variant="outline" className="mt-4 rounded-full">
              <Link to="/precios">Ver planes</Link>
            </Button>
          </Panel>
=======
            <div className="flex items-center gap-3">
              <Crown className={`h-6 w-6 ${planColor[currentPlan]}`} />
              <div>
                <p className={`font-display text-2xl ${planColor[currentPlan]}`}>
                  {planLabel[currentPlan]}
                </p>
                <p className="text-sm text-muted-foreground">
                  {currentPlan === "spark"
                    ? "0€/mes — sin comisiones"
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
            <QuickLink to="/precios" icon={Crown} title="Ver planes" desc="Compara Free, Standard y Pro" />
          </div>
>>>>>>> Stashed changes
        </section>
      </main>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: any;
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
