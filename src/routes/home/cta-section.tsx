// CTA section component
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <div className="overflow-hidden rounded-3xl border border-gold/30 gradient-card p-10 text-center shadow-glow md:p-16">
        <h2 className="font-display text-4xl md:text-5xl">¿Listo para brillar?</h2>
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
          Miles de organizadores están buscando artistas como tú. Crea tu perfil hoy y empieza a
          recibir solicitudes.
        </p>
        <Button asChild size="lg" variant="gold" className="mt-8 rounded-full px-8">
          <Link to="/registro">Reclama tu escenario ahora</Link>
        </Button>
        <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <span>✓ Sin permanencia</span>
          <span>✓ Sin comisiones por contrato</span>
          <span>✓ Cancela cuando quieras</span>
        </div>
      </div>
    </section>
  );
}