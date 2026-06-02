// Hero section component
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { Sparkles as SparklesIcon, ArrowRight, CheckCircle2 } from "lucide-react";
import heroImg from "@/assets/hero-stage.jpg";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <video
        src="/hero-bg-compressed.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 [mask-image:linear-gradient(to_bottom,black_60%,transparent)]"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-background/40 backdrop-blur-[2px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-xs uppercase tracking-wider text-muted-foreground backdrop-blur">
              <SparklesIcon className="h-3.5 w-3.5 text-gold" /> Plataforma para artistas
            </span>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] md:text-7xl">
              Tu escenario.
              <br />
              Tu audiencia.
              <br />
              <span className="text-gradient-gold">Tu momento.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              La plataforma donde artistas conectan con su audiencia y los eventos encuentran talento excepcional. Publica eventos gratis y contrata sin comisiones.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="gold" className="rounded-full px-7">
                <Link to="/registro">
                  Soy Artista: Crear perfil <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="hero" className="rounded-full px-7">
                <Link to="/eventos">Ver Eventos Gratis</Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-gold" /> Sin permanencia
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-gold" /> Sin comisiones
              </span>
            </div>
          </div>
          <div className="relative">
            <div
              className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-gold/20 to-transparent blur-2xl"
              aria-hidden
            />
            <img
              src={heroImg}
              alt="Artista en escenario bajo foco dorado"
              width={1600}
              height={1200}
              className="relative aspect-[4/5] w-full rounded-3xl object-cover shadow-glow"
            />
          </div>
        </div>
      </div>
    </section>
  );
}