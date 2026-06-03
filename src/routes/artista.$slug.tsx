import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Mail, ArrowLeft, Crown } from "lucide-react";

export const Route = createFileRoute("/artista/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `Artista — Escénika` },
      { name: "description", content: "Perfil de artista en Escénika." },
    ],
  }),
  component: ArtistPage,
});

function ArtistPage() {
  const { slug } = Route.useParams();

  const { data: artist, isLoading, isError } = useQuery({
    queryKey: ["artist-public", slug],
    queryFn: async () => {
      let { data, error } = await supabase
        .from("profiles")
        .select(
          "id, display_name, category, city, bio, avatar_url, cover_url, price_from, rating, reviews_count, plan, is_published, slug",
        )
        .eq("slug", slug)
        .eq("is_published", true)
        .single();

      if (error || !data) {
        const { data: byId, error: err2 } = await supabase
          .from("profiles")
          .select(
            "id, display_name, category, city, bio, avatar_url, cover_url, price_from, rating, reviews_count, plan, is_published, slug",
          )
          .eq("id", slug)
          .eq("is_published", true)
          .single();
        if (err2) throw err2;
        return byId;
      }
      return data;
    },
  });

  const { data: media } = useQuery({
    queryKey: ["artist-media", artist?.id],
    enabled: !!artist?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("media")
        .select("id, url, type, caption")
        .eq("user_id", artist!.id)
        .order("created_at", { ascending: false })
        .limit(20);
      if (error) throw error;
      return data ?? [];
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-dvh bg-background">
        <SiteHeader />
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-muted-foreground">Cargando perfil…</p>
        </div>
        <SiteFooter />
      </div>
    );
  }

  if (isError || !artist) {
    return (
      <div className="min-h-dvh bg-background">
        <SiteHeader />
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="font-display text-6xl text-gradient-gold">404</p>
          <h1 className="font-display text-2xl">Artista no encontrado</h1>
          <p className="text-sm text-muted-foreground">
            Este perfil no existe o no está publicado.
          </p>
          <Button asChild variant="gold">
            <Link to="/explorar">
              <ArrowLeft className="mr-2 h-4 w-4" /> Volver al explorador
            </Link>
          </Button>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const photos = media?.filter((m) => m.type === "image") ?? [];
  const videos = media?.filter((m) => m.type === "video") ?? [];

  return (
    <div className="min-h-dvh bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-6 pt-10 pb-24">
        {/* Volver */}
        <Link
          to="/explorar"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Volver al explorador
        </Link>

        {/* Cabecera */}
        <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card shadow-card">
          {/* Portada */}
          <div className="aspect-[16/5] overflow-hidden bg-muted">
            {artist.cover_url ? (
              <img
                src={artist.cover_url}
                alt={`Portada de ${artist.display_name}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center font-display text-9xl text-primary/10">
                {artist.display_name.charAt(0)}
              </div>
            )}
          </div>

          {/* Info principal */}
          <div className="flex flex-wrap items-end gap-6 p-6 md:p-8">
            {/* Avatar */}
            <div className="-mt-16 h-24 w-24 shrink-0 overflow-hidden rounded-xl border-4 border-background bg-muted shadow-card">
              {artist.avatar_url ? (
                <img
                  src={artist.avatar_url}
                  alt={artist.display_name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center font-display text-3xl text-primary/30">
                  {artist.display_name.charAt(0)}
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-display text-3xl tracking-tight md:text-4xl">{artist.display_name}</h1>
                {artist.plan === "headliner" && (
                  <span className="flex items-center gap-1 rounded-full border border-primary/40 bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
                    <Crown className="h-3 w-3" /> Headliner
                  </span>
                )}
                {artist.plan === "spotlight" && (
                  <span className="flex items-center gap-1 rounded-full border border-primary/30 bg-primary/5 px-3 py-0.5 text-xs text-primary">
                    Spotlight
                  </span>
                )}
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="capitalize">{artist.category ?? "Artista"}</span>
                {artist.city && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" /> {artist.city}
                  </span>
                )}
                {(artist.reviews_count ?? 0) > 0 && (
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                    {artist.rating} ({artist.reviews_count} reseñas)
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col items-end gap-3">
              {artist.price_from && (
                <p className="font-display text-2xl text-primary">Desde {artist.price_from}€</p>
              )}
              <Button asChild variant="gold">
                <a href={`mailto:hola@escenika.com?subject=Consulta sobre ${encodeURIComponent(artist.display_name)}`}>
                  <Mail className="mr-2 h-4 w-4" /> Contactar
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Biografía */}
        {artist.bio && (
          <section className="mt-10">
            <h2 className="font-display text-2xl">Sobre el artista</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{artist.bio}</p>
          </section>
        )}

        {/* Galería de fotos */}
        {photos.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-2xl">Galería</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {photos.map((p) => (
                <div
                  key={p.id}
                  className="aspect-square overflow-hidden rounded-xl border border-border bg-muted"
                >
                  <img
                    src={p.url}
                    alt={p.caption ?? artist.display_name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Vídeos */}
        {videos.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-2xl">Vídeos</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {videos.map((v) => (
                <div
                  key={v.id}
                  className="overflow-hidden rounded-xl border border-border bg-muted"
                >
                  <video
                    src={v.url}
                    controls
                    className="w-full"
                    preload="metadata"
                  />
                  {v.caption && (
                    <p className="p-4 text-sm text-muted-foreground">{v.caption}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA contratar */}
        <div className="mt-16 rounded-xl border border-primary/20 bg-card p-10 text-center shadow-card">
          <h2 className="font-display text-2xl">¿Te interesa contratar a {artist.display_name}?</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Escríbenos y te ponemos en contacto directamente. Sin comisiones.
          </p>
          <Button asChild variant="gold" className="mt-6">
            <a href={`mailto:hola@escenika.com?subject=Quiero contratar a ${encodeURIComponent(artist.display_name)}`}>
              <Mail className="mr-2 h-4 w-4" /> Solicitar información
            </a>
          </Button>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
