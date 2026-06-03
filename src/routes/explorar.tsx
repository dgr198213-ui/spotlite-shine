import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Star, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/explorar")({
  head: () => ({
    meta: [
      { title: "Explorar artistas — Escénika" },
      {
        name: "description",
        content: "Descubre cantantes, DJs, magos y más artistas para tu próximo evento.",
      },
    ],
  }),
  component: ExplorePage,
});

const CATEGORIES = [
  { value: "all", label: "Todos" },
  { value: "musica", label: "Música" },
  { value: "teatro", label: "Teatro" },
  { value: "magia", label: "Magia" },
  { value: "comedia", label: "Comedia" },
  { value: "danza", label: "Danza" },
  { value: "dj", label: "DJ" },
  { value: "circo", label: "Circo" },
  { value: "arte", label: "Arte" },
  { value: "foto_video", label: "Foto/Vídeo" },
];

function ExplorePage() {
  const [cat, setCat] = useState<string>("all");
  const [q, setQ] = useState("");

  const { data: artists = [], isLoading } = useQuery({
    queryKey: ["artists", cat, q],
    queryFn: async () => {
      let query = supabase
        .from("profiles")
        .select(
          "id, slug, display_name, category, city, avatar_url, cover_url, price_from, rating, reviews_count",
        )
        .eq("is_published", true)
        .order("rating", { ascending: false });
      if (cat !== "all") query = query.eq("category", cat as any);
      if (q.trim()) query = query.ilike("display_name", `%${q.trim()}%`);
      const { data, error } = await query.limit(60);
      if (error) throw error;
      return data ?? [];
    },
  });

  return (
    <div className="min-h-dvh bg-background">
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-6 pt-12 pb-24">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">Descubre</p>
        <h1 className="mt-3 font-display text-5xl tracking-tight md:text-6xl">Explorar artistas</h1>
        <p className="mt-4 text-muted-foreground">
          Filtra por categoría y encuentra el talento perfecto para tu evento.
        </p>

        <div className="mt-8 relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nombre…"
            className="h-12 rounded-lg border-border bg-card pl-11"
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() => setCat(c.value)}
              className={`rounded-full border px-4 py-2 text-sm transition-all ${
                cat === c.value
                  ? "border-primary/50 gradient-gold text-gold-foreground shadow-gold"
                  : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <p className="mt-16 text-center text-sm text-muted-foreground">Cargando artistas…</p>
        ) : artists.length === 0 ? (
          <div className="mt-16 rounded-xl border border-border bg-card p-12 text-center shadow-card">
            <p className="font-display text-2xl">Aún no hay artistas en esta categoría</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Sé el primero en aparecer aquí. Crea tu perfil y publícalo.
            </p>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {artists.map((a) => (
              <article
                key={a.id}
                className="group overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-gold"
              >
                <div className="aspect-[4/5] overflow-hidden bg-muted">
                  {a.cover_url || a.avatar_url ? (
                    <img
                      src={a.cover_url ?? a.avatar_url ?? ""}
                      alt={a.display_name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-display text-6xl text-primary/20">
                      {a.display_name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-display text-xl">{a.display_name}</h3>
                    {a.price_from && (
                      <span className="text-sm font-medium text-primary">Desde {a.price_from}€</span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {a.category ?? "—"} {a.city ? `· ${a.city}` : ""}
                  </p>
                  {(a.reviews_count ?? 0) > 0 && (
                    <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                      <Star className="h-3.5 w-3.5 fill-primary text-primary" />{" "}
                      <span className="text-foreground">{a.rating}</span> · {a.reviews_count}{" "}
                      reseñas
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
      <SiteFooter />
    </div>
  );
}
