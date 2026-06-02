import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { getUpcomingEvents, getDaysRemaining, type Event } from "@/lib/events-store";
import { Calendar, MapPin, Clock, Plus, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/eventos")({
  head: () => ({
    meta: [
      { title: "Eventos — Escénika" },
      {
        name: "description",
        content:
          "Descubre eventos que buscan artistas. Publica tu evento gratis durante 1 mes.",
      },
    ],
  }),
  component: EventosPage,
});

function EventosPage() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    setEvents(getUpcomingEvents());
  }, []);

  return (
    <div className="min-h-dvh bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="border-b border-border bg-card/50">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-primary">
                Eventos
              </p>
              <h1 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
                Encuentra tu próximo escenario
              </h1>
              <p className="mt-4 max-w-xl text-muted-foreground">
                Los organizadores publican sus eventos aquí. Si te encaja, contacta
                directamente con ellos. Publicación gratuita durante 1 mes.
              </p>
            </div>
            <Button asChild variant="gold" size="lg">
              <Link to="/eventos/nuevo">
                <Plus className="mr-2 h-4 w-4" /> Publicar evento gratis
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        {events.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-card/50 p-12 text-center">
            <Sparkles className="mx-auto h-12 w-12 text-primary/40" />
            <h2 className="mt-6 font-display text-2xl">Aún no hay eventos publicados</h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Sé el primero en publicar un evento y conecta con artistas de toda
              España. Es gratis durante 1 mes.
            </p>
            <Button asChild variant="gold" className="mt-8">
              <Link to="/eventos/nuevo">Publicar mi evento</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-card/50 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-display text-3xl tracking-tight md:text-4xl">
            ¿Organizas un evento?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Publica gratis tu evento durante 1 mes y conecta con artistas verificados.
            Solo necesitas una foto y una descripción.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild variant="gold" size="lg">
              <Link to="/eventos/nuevo">Publicar evento gratis</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/explorar">Buscar artistas</Link>
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function EventCard({ event }: { event: Event }) {
  const { daysUntilEnd, daysUntilExpiry } = getDaysRemaining(event);
  const minDays = Math.min(daysUntilEnd, daysUntilExpiry);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <article className="group overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-gold">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1 text-xs font-medium backdrop-blur-sm">
          <Clock className="h-3 w-3 text-primary" />
          {minDays} días restantes
        </div>
        {event.category && (
          <div className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
            {event.category}
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-display text-xl leading-tight">{event.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {event.description}
        </p>
        <div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span>
              {formatDate(event.startDate)} — {formatDate(event.endDate)}
            </span>
          </div>
          {event.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{event.location}</span>
            </div>
          )}
        </div>
        <div className="mt-4 border-t border-border pt-4">
          <p className="text-xs text-muted-foreground">
            Publicado por <span className="font-medium text-foreground">{event.creatorName}</span>
          </p>
        </div>
      </div>
    </article>
  );
}
