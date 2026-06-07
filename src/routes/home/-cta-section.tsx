// CTA section component
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <div className="overflow-hidden rounded-3xl border border-gold/30 gradient-card p-10 text-center shadow-glow md:p-16">
        <h2 className="font-display text-4xl md:text-5xl">¿Listo para brillar?</h2>
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
          Ya seas un artista buscando brillar o alguien con un evento que organizar, Escénika es tu
          lugar. Publica eventos gratis o crea tu perfil profesional hoy mismo.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" variant="gold" className="rounded-full px-8">
            <Link to="/registro">Soy Artista: Crear perfil</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full px-8 border-gold/50 text-gold hover:bg-gold/10"
          >
            <Link to="/eventos">Ver Eventos</Link>
          </Button>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <span>✓ Sin permanencia</span>
          <span>✓ Sin comisiones por contrato</span>
          <span>✓ Cancela cuando quieras</span>
        </div>
      </div>
    </section>
  );
}
