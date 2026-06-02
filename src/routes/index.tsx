import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  Music,
  Drama,
  Wand2,
  Mic2,
  Sparkles,
  Disc3,
  Palette,
  Camera,
  ArrowRight,
  Star,
  Check,
  Clock,
  Crown,
} from "lucide-react";
import heroImg from "@/assets/hero-stage.jpg";
import artist1 from "@/assets/artist-1.jpg";
import artist2 from "@/assets/artist-2.jpg";
import artist3 from "@/assets/artist-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Escénika — Tu escenario, tu audiencia, tu momento" },
      {
        name: "description",
        content:
          "Conecta con eventos y consigue tu próximo escenario. Sin comisiones, perfil profesional en 5 minutos.",
      },
    ],
  }),
  component: HomePage,
});

const categories = [
  { icon: Music, label: "Música" },
  { icon: Drama, label: "Teatro" },
  { icon: Wand2, label: "Magia" },
  { icon: Mic2, label: "Comedia" },
  { icon: Sparkles, label: "Danza" },
  { icon: Disc3, label: "DJ" },
  { icon: Palette, label: "Arte" },
  { icon: Camera, label: "Foto/Vídeo" },
];

const featured = [
  {
    name: "Lucía Reverb",
    role: "Cantautora",
    city: "Madrid",
    price: "Desde 350€",
    rating: 4.9,
    reviews: 87,
    img: artist1,
  },
  {
    name: "Carlos Groove",
    role: "DJ",
    city: "Barcelona",
    price: "Desde 480€",
    rating: 4.8,
    reviews: 124,
    img: artist2,
  },
  {
    name: "Ana Mística",
    role: "Maga",
    city: "Valencia",
    price: "Desde 290€",
    rating: 5.0,
    reviews: 56,
    img: artist3,
  },
];

function HomePage() {
  return (
    <div className="min-h-dvh bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-32">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <h1 className="font-display text-5xl leading-[1.1] tracking-tight md:text-7xl">
                Tu escenario.
                <br />
                Tu audiencia.
                <br />
                <span className="text-gradient-gold">Tu momento.</span>
              </h1>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
                La plataforma donde artistas encuentran su público y eventos encuentran talento
                excepcional. Sin comisiones por contrato.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button asChild size="lg" variant="gold">
                  <Link to="/registro">
                    Reclama tu escenario <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/explorar">Descubre talento</Link>
                </Button>
              </div>
              <div className="mt-10 flex items-center gap-8 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" /> Sin permanencia
                </span>
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" /> Sin comisiones
                </span>
              </div>
            </div>
            <div className="relative">
              <img
                src={heroImg}
                alt="Artista en escenario bajo foco"
                width={1600}
                height={1200}
                className="relative aspect-[4/5] w-full rounded-2xl object-cover shadow-card"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="border-y border-border bg-card py-8">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="group flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground"
              >
                <Icon className="h-4 w-4 text-primary transition-transform group-hover:scale-110" />{" "}
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como-funciona" className="mx-auto max-w-6xl px-6 py-24">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">Proceso</p>
          <h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
            Tres pasos hacia tu próximo éxito
          </h2>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {[
            {
              n: "01",
              title: "Regístrate",
              desc: "Crea tu perfil profesional en menos de 5 minutos. Sube tu vídeo, fotos y describe tu propuesta única.",
            },
            {
              n: "02",
              title: "Muestra tu arte",
              desc: "Tu espacio dedicado con vídeo, galería, repertorio, reseñas y calendario de disponibilidad.",
            },
            {
              n: "03",
              title: "Conecta directamente",
              desc: "Recibe solicitudes, negocia y cobra sin comisiones. Tú fijas las condiciones.",
            },
          ].map((step) => (
            <div
              key={step.n}
              className="group rounded-xl border border-border bg-card p-8 shadow-card transition-all hover:-translate-y-1 hover:shadow-gold"
            >
              <span className="font-display text-5xl text-primary/20">{step.n}</span>
              <h3 className="mt-4 font-display text-2xl">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Artistas destacados */}
      <section className="border-t border-border bg-card/50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-primary">Talento</p>
              <h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
                Artistas destacados
              </h2>
            </div>
            <Link
              to="/explorar"
              className="hidden items-center gap-2 text-sm text-muted-foreground hover:text-foreground md:inline-flex"
            >
              Ver todos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {featured.map((a) => (
              <article
                key={a.name}
                className="group overflow-hidden rounded-xl border border-border bg-background shadow-card transition-all hover:-translate-y-1 hover:shadow-gold"
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
                <div className="p-6">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-display text-xl">{a.name}</h3>
                    <span className="text-sm font-medium text-primary">{a.price}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {a.role} · {a.city}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                    <Star className="h-3.5 w-3.5 fill-primary text-primary" />{" "}
                    <span className="text-foreground">{a.rating}</span> · {a.reviews} reseñas
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Vídeos showcase */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">En directo</p>
          <h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
            Así se ven los escenarios en Escénika
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Una muestra del tipo de vídeos que los artistas podrán publicar en sus perfiles con el
            plan Standard.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {["/showcase-1-compressed.mp4", "/showcase-2-compressed.mp4"].map((src) => (
            <div
              key={src}
              className="overflow-hidden rounded-xl border border-border bg-card shadow-card"
            >
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
      <section id="planes" className="border-t border-border bg-card/50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Lanzamiento Beta
            </p>
            <h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
              Planes para artistas
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Somos solo intermediarios: publicamos eventos gratuitos y cobramos una suscripción a
              los artistas. Sin comisiones por contrato.
            </p>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Sparkles,
                name: "Escénika Free",
                badge: "Disponible",
                price: "0€",
                desc: "Empieza con nosotros durante el lanzamiento",
                popular: true,
                features: [
                  "1 fotografía de presentación",
                  "Descripción y biografía",
                  "Precio orientativo",
                  "Exigencias técnicas",
                  "Visible para organizadores",
                ],
                cta: "Crear cuenta gratis",
              },
              {
                icon: Star,
                name: "Escénika Standard",
                badge: "Próximamente",
                price: "6€",
                desc: "Para destacar de verdad",
                comingSoon: true,
                features: [
                  "1 vídeo de hasta 8 s",
                  "Galería ampliada",
                  "Promoción en nuestra web",
                  "Promoción en redes sociales",
                  "Destacado en búsquedas",
                ],
                cta: "Disponible pronto",
              },
              {
                icon: Crown,
                name: "Escénika Pro",
                badge: "Próximamente",
                price: "—",
                desc: "Para artistas profesionales",
                comingSoon: true,
                features: [
                  "Vídeos ilimitados",
                  "Galería completa",
                  "Badge verificado",
                  "Multi-proyecto",
                  "Soporte prioritario",
                ],
                cta: "Disponible pronto",
              },
            ].map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.name}
                  className={`relative flex flex-col rounded-xl border p-8 transition-all ${
                    p.popular
                      ? "border-primary/30 bg-background shadow-gold hover:-translate-y-1"
                      : "border-border bg-background/50 opacity-75"
                  }`}
                >
                  <span
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider ${
                      p.popular
                        ? "gradient-gold text-gold-foreground"
                        : "border border-border bg-background text-muted-foreground"
                    }`}
                  >
                    {p.comingSoon && <Clock className="mr-1 inline h-3 w-3" />}
                    {p.badge}
                  </span>
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`h-6 w-6 ${p.comingSoon ? "text-muted-foreground" : "text-primary"}`}
                    />
                  </div>
                  <h3 className="mt-5 font-display text-2xl">{p.name}</h3>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                  <div className="mt-5 font-display text-5xl">
                    {p.price}
                    <span className="text-base text-muted-foreground">
                      {p.price !== "—" ? "/mes" : ""}
                    </span>
                  </div>
                  <ul className="mt-6 flex-1 space-y-3 text-sm">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <Check
                          className={`mt-0.5 h-4 w-4 shrink-0 ${p.comingSoon ? "text-muted-foreground" : "text-primary"}`}
                        />
                        <span className={p.comingSoon ? "text-muted-foreground" : ""}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  {p.comingSoon ? (
                    <Button variant="outline" disabled className="mt-8 w-full">
                      {p.cta}
                    </Button>
                  ) : (
                    <Button asChild variant="gold" className="mt-8 w-full">
                      <Link to="/registro">{p.cta}</Link>
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
          <p className="mt-10 text-center text-sm text-muted-foreground">
            <Link to="/precios" className="underline-offset-4 hover:underline">
              Ver detalles completos de los planes →
            </Link>
          </p>
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-4xl px-6 py-24">
        <div className="rounded-2xl border border-primary/20 bg-card p-12 text-center shadow-card md:p-16">
          <h2 className="font-display text-4xl tracking-tight md:text-5xl">¿Listo para brillar?</h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Miles de organizadores están buscando artistas como tú. Crea tu perfil hoy y empieza a
            recibir solicitudes.
          </p>
          <Button asChild size="lg" variant="gold" className="mt-10">
            <Link to="/registro">Reclama tu escenario ahora</Link>
          </Button>
          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
            <span>Sin permanencia</span>
            <span>Sin comisiones por contrato</span>
            <span>Cancela cuando quieras</span>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
