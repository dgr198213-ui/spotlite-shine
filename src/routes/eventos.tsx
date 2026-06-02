import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Search, MapPin, Calendar, Clock, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/eventos")({
  head: () => ({
    meta: [
      { title: "Explorar eventos — Escénika" },
      {
        name: "description",
        content: "Encuentra escenarios gratuitos donde mostrar tu talento. Conecta con organizadores de toda España.",
      },
    ],
  }),
  component: EventsExplorePage,
});

function EventsExplorePage() {
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events", q, city],
    queryFn: async () => {
      let query = supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });
      
      if (q.trim()) query = query.ilike("title", `%${q.trim()}%`);
      if (city.trim()) query = query.ilike("location", `%${city.trim()}%`);
      
      const { data, error } = await query.limit(50);
      if (error) throw error;
      return data ?? [];
    },
  });

  return (
    <div className="min-h-dvh gradient-hero">
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-6 pt-12 pb-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-5xl md:text-6xl">Próximos eventos</h1>
            <p className="mt-3 text-muted-foreground">
              Escenarios abiertos y oportunidades para artistas. Publicar es gratuito.
            </p>
          </div>
          <Button variant="gold" className="rounded-full px-6">
            Publicar evento gratis
          </Button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por título de evento…"
              className="h-12 rounded-full border-border bg-card/60 pl-11 backdrop-blur"
            />
          </div>
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Ciudad…"
              className="h-12 rounded-full border-border bg-card/60 pl-11 backdrop-blur"
            />
          </div>
        </div>

        {isLoading ? (
          <p className="mt-12 text-center text-sm text-muted-foreground">Cargando eventos…</p>
        ) : events.length === 0 ? (
          <div className="mt-16 rounded-2xl border border-border gradient-card p-10 text-center">
            <p className="font-display text-2xl">No se han encontrado eventos</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Sé el primero en publicar un evento. Es totalmente gratuito.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((e) => (
              <article
                key={e.id}
                className="group overflow-hidden rounded-2xl border border-border gradient-card shadow-card transition-all hover:-translate-y-1 hover:shadow-gold"
              >
                <div className="aspect-video overflow-hidden bg-muted">
                  {e.image_url ? (
                    <img
                      src={e.image_url}
                      alt={e.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gold/5 font-display text-4xl text-gold/20">
                      Evento
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl">{e.title}</h3>
                  <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gold" />
                      <span>{e.location || "Ubicación por definir"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gold" />
                      <span>{e.date ? new Date(e.date).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "Fecha por definir"}</span>
                    </div>
                    {e.time && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gold" />
                        <span>{e.time}</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-5 border-t border-border pt-4">
                    <Button variant="outline" className="w-full rounded-full text-xs">
                      Ver detalles y contacto
                    </Button>
                  </div>
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
