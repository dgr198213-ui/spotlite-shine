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
      { title: "Explorar artistas — Spot&Shows" },
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
      if (cat !== "all") query = query.eq("category", cat as Database["public"]["Enums"]["artist_category"]);
      if (q.trim()) query = query.ilike("display_name", `%${q.trim()}%`);
      const { data, error } = await query.limit(60);
      if (error) throw error;
      return data ?? [];
    },
  });

  return (
    <div className="min-h-dvh gradient-hero">
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-6 pt-12 pb-20">
        <h1 className="font-display text-5xl md:text-6xl">Explorar artistas</h1>
        <p className="mt-3 text-muted-foreground">
          Filtra por categoría y encuentra el talento perfecto para tu evento.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-[1fr_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por nombre artístico, disciplina o ciudad…"
              className="h-12 rounded-full border-border bg-card/60 pl-11 backdrop-blur"
            />
          </div>
          <Link to="/eventos">
            <Button
              variant="outline"
              className="h-12 rounded-full px-6 border-gold/30 text-gold hover:bg-gold/10"
            >
              Ver eventos publicados
            </Button>
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() => setCat(c.value)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-all ${
                cat === c.value
                  ? "border-gold/50 gradient-gold text-gold-foreground shadow-gold"
                  : "border-border bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <p className="mt-12 text-center text-sm text-muted-foreground">Cargando artistas…</p>
        ) : artists.length === 0 ? (
          <div className="mt-16 rounded-2xl border border-border gradient-card p-10 text-center">
            <p className="font-display text-2xl">Aún no hay artistas en esta categoría</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Sé el primero en aparecer aquí. Crea tu perfil y publícalo.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {artists.map((a) => (
              <article
                key={a.id}
                className="group overflow-hidden rounded-2xl border border-border gradient-card shadow-card transition-all hover:-translate-y-1 hover:shadow-gold"
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
                    <div className="flex h-full w-full items-center justify-center font-display text-5xl text-gold/30">
                      {a.display_name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-display text-lg">{a.display_name}</h3>
                    {a.price_from && (
                      <span className="text-sm text-gold">Desde {a.price_from}€</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {a.category ?? "—"} {a.city ? `· ${a.city}` : ""}
                  </p>
                  {(a.reviews_count ?? 0) > 0 && (
                    <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="h-3.5 w-3.5 fill-gold text-gold" />{" "}
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
