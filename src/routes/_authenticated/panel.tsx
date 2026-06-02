import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Eye, Video, MessageCircle, Star, Pencil } from "lucide-react";

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

  return (
    <div className="min-h-dvh bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 pt-12 pb-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-primary">Panel</p>
            <h1 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
              ¡Hola, <span className="text-gradient-gold">{profile?.display_name ?? "Artista"}</span>!
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Aquí tienes un resumen de tu actividad reciente.
            </p>
          </div>
          <Button asChild variant="gold">
            <Link to="/perfil">
              <Pencil className="mr-2 h-4 w-4" /> Editar perfil
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-4">
          <Stat icon={Eye} label="Vistas del perfil" value="0" hint="+0% esta semana" />
          <Stat icon={Video} label="Vídeos subidos" value="0" hint="Plan Free: 1" />
          <Stat icon={MessageCircle} label="Mensajes" value="0" hint="Sin leer" />
          <Stat
            icon={Star}
            label="Reseñas"
            value={String(profile?.reviews_count ?? 0)}
            hint={profile?.rating ? `${profile.rating} ★` : "Aún sin reseñas"}
          />
        </div>

        <section className="mt-14 grid gap-8 md:grid-cols-2">
          <Panel title="Completa tu perfil">
            <p className="text-sm text-muted-foreground">
              Tu perfil está {profile?.is_published ? "publicado" : "sin publicar"}. Añade foto,
              biografía y categoría para empezar a recibir solicitudes.
            </p>
            <Button asChild variant="gold" className="mt-5">
              <Link to="/perfil">Completar ahora</Link>
            </Button>
          </Panel>
          <Panel title="Tu plan actual">
            <p className="font-display text-2xl capitalize">{profile?.plan ?? "free"}</p>
            <p className="mt-2 text-sm text-muted-foreground">¿Listo para más visibilidad?</p>
            <Button asChild variant="outline" className="mt-5">
              <Link to="/precios">Ver planes</Link>
            </Button>
          </Panel>
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
    <div className="rounded-xl border border-border bg-card p-6 shadow-card">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <p className="mt-4 font-display text-3xl">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-8 shadow-card">
      <h2 className="font-display text-xl">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}
