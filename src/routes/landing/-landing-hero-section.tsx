// Landing page hero section
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import { categories, stats } from "./landing-data";

export function LandingHeroSection() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 py-20 text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-card/50 px-4 py-1.5 text-xs font-medium text-gold backdrop-blur">
        <Sparkles className="h-3.5 w-3.5" />
        Nueva plataforma de booking artístico en España
      </div>
      
      <h1 className="mt-8 font-display text-5xl leading-[1.08] md:text-7xl">
        Tu escenario<br />
        <span className="text-gradient-gold">empieza aquí.</span>
      </h1>
      
      <p className="mx-auto mt-6 max-w-[580px] text-lg text-muted-foreground">
        Conectamos artistas talentosos con su audiencia. Publica eventos gratis y contrata sin comisiones. Sin intermediarios, contacto directo.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Button asChild size="lg" variant="gold" className="rounded-full px-8">
          <Link to="/registro">
            Crear perfil de artista <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="rounded-full px-8">
          <Link to="/eventos">Ver eventos gratis →</Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="mt-16 flex flex-wrap justify-center gap-12 border-t border-border pt-12">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-display text-4xl font-bold text-gold">{s.value}</div>
            <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Categories */}
      <div className="mt-16 flex flex-wrap justify-center gap-3">
        {categories.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="group flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-2 text-sm text-muted-foreground transition-all hover:border-gold/40 hover:bg-card hover:text-foreground"
          >
            <Icon className="h-4 w-4 text-gold transition-transform group-hover:scale-110" />
            {label}
          </button>
        ))}
      </div>
    </section>
  );
}