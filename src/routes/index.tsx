import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Music, Drama, Wand2, Mic2, Sparkles as SparklesIcon, Disc3, Palette, Camera, ArrowRight, Star, CheckCircle2 } from "lucide-react";
import heroImg from "@/assets/hero-stage.jpg";
import artist1 from "@/assets/artist-1.jpg";
import artist2 from "@/assets/artist-2.jpg";
import artist3 from "@/assets/artist-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Spot&Shows — Tu escenario, tu audiencia, tu momento" },
      { name: "description", content: "Conecta con eventos y consigue tu próximo escenario. Sin comisiones, perfil profesional en 5 minutos." },
    ],
  }),
  component: HomePage,
});

const categories = [
  { icon: Music, label: "Música" },
  { icon: Drama, label: "Teatro" },
  { icon: Wand2, label: "Magia" },
  { icon: Mic2, label: "Comedia" },
  { icon: SparklesIcon, label: "Danza" },
  { icon: Disc3, label: "DJ" },
  { icon: Palette, label: "Arte" },
  { icon: Camera, label: "Foto/Vídeo" },
];

const featured = [
  { name: "Lucía Reverb", role: "Cantautora", city: "Madrid", price: "Desde 350€", rating: 4.9, reviews: 87, img: artist1 },
  { name: "Carlos Groove", role: "DJ", city: "Barcelona", price: "Desde 480€", rating: 4.8, reviews: 124, img: artist2 },
  { name: "Ana Mística", role: "Maga", city: "Valencia", price: "Desde 290€", rating: 5.0, reviews: 56, img: artist3 },
];

function HomePage() {
  return (
    <div className="min-h-dvh gradient-hero">
      <SiteHeader />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-xs uppercase tracking-wider text-muted-foreground backdrop-blur">
              <SparklesIcon className="h-3.5 w-3.5 text-gold" /> Plataforma para artistas
            </span>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] md:text-7xl">
              Tu escenario.<br />
              Tu audiencia.<br />
              <span className="text-gradient-gold">Tu momento.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              La plataforma donde artistas encuentran su público y eventos encuentran talento excepcional. Sin comisiones por contrato.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="gold" className="rounded-full px-7">
                <Link to="/registro">Reclama tu escenario <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="hero" className="rounded-full px-7">
                <Link to="/explorar">Descubre talento</Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-gold" /> Sin permanencia</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-gold" /> Sin comisiones</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-gold/20 to-transparent blur-2xl" aria-hidden />
            <img
              src={heroImg}
              alt="Artista en escenario bajo foco dorado"
              width={1600}
              height={1200}
              className="relative aspect-[4/5] w-full rounded-3xl object-cover shadow-glow"
            />
          </div>
        </div>

        {/* Categorías */}
        <div className="mt-20 flex flex-wrap justify-center gap-2.5">
          {categories.map(({ icon: Icon, label }) => (
            <button key={label} className="group flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-2 text-sm text-muted-foreground transition-all hover:border-gold/40 hover:bg-card hover:text-foreground">
              <Icon className="h-4 w-4 text-gold transition-transform group-hover:scale-110" /> {label}
            </button>
          ))}
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como-funciona" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-center font-display text-4xl md:text-5xl">Tres pasos hacia tu próximo éxito</h2>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            { n: 1, title: "Regístrate", desc: "Crea tu perfil profesional en menos de 5 minutos. Sube tu vídeo, fotos y describe tu propuesta única." },
            { n: 2, title: "Muestra tu arte", desc: "Tu espacio dedicado con vídeo, galería, repertorio, reseñas y calendario de disponibilidad." },
            { n: 3, title: "Conecta directamente", desc: "Recibe solicitudes, negocia y cobra sin comisiones. Tú fijas las condiciones." },
          ].map((step) => (
            <div key={step.n} className="rounded-2xl border border-border gradient-card p-7 shadow-card transition-transform hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-gold font-display text-xl font-bold text-gold-foreground shadow-gold">{step.n}</div>
              <h3 className="mt-5 font-display text-xl">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Artistas destacados */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-4xl md:text-5xl">Artistas destacados</h2>
          <Link to="/explorar" className="hidden items-center gap-1 text-sm text-muted-foreground hover:text-foreground md:inline-flex">
            Ver todos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featured.map((a) => (
            <article key={a.name} className="group overflow-hidden rounded-2xl border border-border gradient-card shadow-card transition-all hover:-translate-y-1 hover:shadow-gold">
              <div className="aspect-[4/5] overflow-hidden">
                <img src={a.img} alt={a.name} loading="lazy" width={800} height={1000} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-lg">{a.name}</h3>
                  <span className="text-sm text-gold">{a.price}</span>
                </div>
                <p className="text-sm text-muted-foreground">{a.role} · {a.city}</p>
                <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="h-3.5 w-3.5 fill-gold text-gold" /> <span className="text-foreground">{a.rating}</span> · {a.reviews} reseñas
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="overflow-hidden rounded-3xl border border-gold/30 gradient-card p-10 text-center shadow-glow md:p-16">
          <h2 className="font-display text-4xl md:text-5xl">¿Listo para brillar?</h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Miles de organizadores están buscando artistas como tú. Crea tu perfil hoy y empieza a recibir solicitudes.
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

      <SiteFooter />
    </div>
  );
}
