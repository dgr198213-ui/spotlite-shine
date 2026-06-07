// Featured artists section component
import { Link } from "@tanstack/react-router";
import { ArrowRight, Star } from "lucide-react";
import { featuredArtists } from "./featured-data";

export function FeaturedSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="flex items-end justify-between">
        <h2 className="font-display text-4xl md:text-5xl">Artistas destacados</h2>
        <Link
          to="/explorar"
          className="hidden items-center gap-1 text-sm text-muted-foreground hover:text-foreground md:inline-flex"
        >
          Ver todos <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {featuredArtists.map((a) => (
          <Link
            key={a.name}
            to="/explorar"
            className="group block overflow-hidden rounded-2xl border border-border gradient-card shadow-card transition-all hover:-translate-y-1 hover:shadow-gold"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={a.img}
                alt={a.name}
                loading="lazy"
                width={800}
                height={1000}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-lg">{a.name}</h3>
                <span className="text-sm text-gold">{a.price}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {a.role} · {a.city}
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                <span className="text-foreground">{a.rating}</span> · {a.reviews} reseñas
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
