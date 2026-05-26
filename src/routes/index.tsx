import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Music, Drama, Wand2, Mic2, Sparkles as SparklesIcon, Disc3, Palette, Camera, ArrowRight, Star, CheckCircle2, Check, Clock, Crown } from "lucide-react";
import heroImg from "@/assets/hero-stage.jpg";
import artist1 from "@/assets/artist-1.jpg";
import artist2 from "@/assets/artist-2.jpg";
import artist3 from "@/assets/artist-3.jpg";
import logo from "@/assets/logo.png";

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
      <section className="relative overflow-hidden">
        <video
          src="/hero-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 [mask-image:linear-gradient(to_bottom,black_60%,transparent)]"
        />
        <div className="pointer-events-none absolute inset-0 bg-background/40 backdrop-blur-[2px]" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-24 md:pt-24 md:pb-32">
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

      {/* Vídeos showcase */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-xs uppercase tracking-wider text-muted-foreground backdrop-blur">
            <SparklesIcon className="h-3.5 w-3.5 text-gold" /> En directo
          </span>
          <h2 className="mt-5 font-display text-4xl md:text-5xl">Así se ven los escenarios en Spot&Shows</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Una muestra del tipo de vídeos que los artistas podrán publicar en sus perfiles con el plan Standard.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {["/showcase-1.mp4", "/showcase-2.mp4"].map((src) => (
            <div key={src} className="group relative overflow-hidden rounded-2xl border border-border gradient-card shadow-card">
              <video
                src={src}
                autoPlay
                loop
                muted
                playsInline
                controls
                className="aspect-video h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Planes */}
      <section id="planes" className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-card/50 px-4 py-1.5 text-xs uppercase tracking-wider text-gold backdrop-blur">
            <SparklesIcon className="h-3.5 w-3.5" /> Lanzamiento Beta
          </span>
          <h2 className="mt-5 font-display text-4xl md:text-5xl">Planes para artistas</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Somos solo intermediarios: publicamos eventos gratuitos y cobramos una suscripción a los artistas. Sin comisiones por contrato.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: SparklesIcon,
              name: "Spot&Shows Free",
              badge: "Beta · Disponible",
              price: "0€",
              desc: "Empieza con nosotros durante el lanzamiento",
              popular: true,
              features: ["1 fotografía de presentación", "Descripción y biografía", "Precio orientativo", "Exigencias técnicas", "Visible para organizadores"],
              cta: "Crear cuenta gratis",
            },
            {
              icon: Star,
              name: "Spot&Shows Standard",
              badge: "Próximamente",
              price: "6€",
              desc: "Para destacar de verdad",
              comingSoon: true,
              features: ["1 vídeo de hasta 8 s", "Galería ampliada", "Promoción en nuestra web", "Promoción en redes sociales", "Destacado en búsquedas"],
              cta: "Disponible pronto",
            },
            {
              icon: Crown,
              name: "Spot&Shows Pro",
              badge: "Próximamente",
              price: "—",
              desc: "Para artistas profesionales",
              comingSoon: true,
              features: ["Vídeos ilimitados", "Galería completa", "Badge verificado", "Multi-proyecto", "Soporte prioritario"],
              cta: "Disponible pronto",
            },
          ].map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.name}
                className={`relative flex flex-col rounded-2xl border p-7 transition-all ${
                  p.popular
                    ? "border-gold/50 gradient-card shadow-glow hover:-translate-y-1"
                    : "border-border bg-card/30 opacity-80"
                }`}
              >
                <span
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    p.popular ? "gradient-gold text-gold-foreground" : "border border-border bg-background text-muted-foreground"
                  }`}
                >
                  {p.comingSoon && <Clock className="mr-1 inline h-3 w-3" />}
                  {p.badge}
                </span>
                <div className="flex items-center gap-2">
                  <img src={logo} alt="" className="h-7 w-auto" />
                  <Icon className={`h-5 w-5 ${p.comingSoon ? "text-muted-foreground" : "text-gold"}`} />
                </div>
                <h3 className="mt-4 font-display text-2xl">{p.name}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
                <div className="mt-4 font-display text-5xl">{p.price}<span className="text-sm text-muted-foreground">{p.price !== "—" ? "/mes" : ""}</span></div>
                <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${p.comingSoon ? "text-muted-foreground" : "text-gold"}`} />
                      <span className={p.comingSoon ? "text-muted-foreground" : ""}>{f}</span>
                    </li>
                  ))}
                </ul>
                {p.comingSoon ? (
                  <Button variant="outline" disabled className="mt-7 w-full rounded-full">{p.cta}</Button>
                ) : (
                  <Button asChild variant="gold" className="mt-7 w-full rounded-full">
                    <Link to="/registro">{p.cta}</Link>
                  </Button>
                )}
              </div>
            );
          })}
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          <Link to="/precios" className="underline-offset-4 hover:underline">Ver detalles completos de los planes →</Link>
        </p>
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
