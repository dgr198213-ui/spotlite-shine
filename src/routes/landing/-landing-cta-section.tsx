// Landing page CTA section
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function LandingCtaSection() {
  return (
    <section className="mx-auto max-w-[900px] px-6 pb-20">
      <div className="rounded-3xl border border-gold/30 bg-card/70 p-16 text-center shadow-glow">
        <span className="text-xs font-semibold uppercase tracking-wider text-gold">
          ¿Listo para empezar?
        </span>
        <h2 className="mt-4 font-display text-4xl md:text-5xl">
          Tu escenario
          <br />
          <span className="text-gradient-gold italic">empieza aquí.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-[500px] text-muted-foreground">
          Únete a miles de artistas que ya confían en Escénika para conectar con su audiencia y
          encontrar escenarios reales.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" variant="gold" className="rounded-full px-8">
            <Link to="/registro">Crear perfil de artista</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full px-8">
            <Link to="/eventos">Explorar eventos gratis</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
