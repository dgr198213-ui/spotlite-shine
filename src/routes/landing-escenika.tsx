import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { 
  Mic, Search, MessageCircle, CreditCard, CheckCircle, Calendar,
  Sparkles, ArrowRight, Star, Music, Drama, Wand2, Mic2, Disc3, Palette
} from "lucide-react";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/landing")({
  head: () => ({
    meta: [
      { title: "Escénika — Tu escenario empieza aquí" },
      { 
        name: "description", 
        content: "Escénika conecta artistas con organizadores de eventos en España. Sin comisiones, contacto directo, miles de talentos verificados." 
      },
    ],
  }),
  component: EscnikaLanding,
});

const features = [
  {
    icon: Mic,
    title: "Perfil multimedia completo",
    desc: "Sube fotos, vídeos de actuaciones reales y tu rider técnico. Muestra tu talento tal como es, sin filtros."
  },
  {
    icon: Search,
    title: "Búsqueda avanzada",
    desc: "Filtra por categoría artística, ciudad, rango de precios y disponibilidad. Encuentra el artista perfecto en minutos."
  },
  {
    icon: MessageCircle,
    title: "Contacto directo",
    desc: "Sin intermediarios. Habla directamente con el artista, acuerda los detalles y cierra la contratación tú mismo."
  },
  {
    icon: CreditCard,
    title: "Sin comisiones ocultas",
    desc: "Los artistas cobran el 100% de lo acordado. Escénika funciona con planes de suscripción transparentes."
  },
  {
    icon: CheckCircle,
    title: "Artistas verificados",
    desc: "Revisamos cada perfil manualmente. Solo perfiles reales con trayectoria demostrable llegan a tu búsqueda."
  },
  {
    icon: Calendar,
    title: "Agenda y disponibilidad",
    desc: "Los artistas gestionan su calendario directamente en la plataforma. Sin sorpresas de última hora."
  }
];

const steps = [
  {
    n: 1,
    title: "Busca y descubre",
    desc: "Explora miles de artistas filtrados por categoría, ciudad y presupuesto. Lee reseñas y ve vídeos reales."
  },
  {
    n: 2,
    title: "Contacta directamente",
    desc: "Escribe al artista, comparte los detalles del evento y acuerda las condiciones sin intermediarios."
  },
  {
    n: 3,
    title: "Disfruta del evento",
    desc: "El artista llega preparado. Tú disfrutas del resultado. El 100% del pago va directo al artista."
  }
];

const plans = [
  {
    name: "✦ Spark",
    price: "Gratis",
    period: "/ siempre",
    desc: "Para empezar a ganar visibilidad online.",
    features: [
      "Perfil básico con bio y categorías",
      "Hasta 3 fotos",
      "Aparece en búsquedas",
      "Contacto directo con organizadores",
      "0% comisión"
    ],
    cta: "Empezar gratis",
    ctaLink: "/registro",
    featured: false
  },
  {
    name: "✦ Spotlight",
    price: "29€",
    period: "/ mes",
    desc: "Para artistas que quieren agenda llena.",
    features: [
      "Todo lo de Spark",
      "Galería ilimitada de fotos",
      "Hasta 5 vídeos de actuación",
      "Prioridad en resultados de búsqueda",
      "Badge de artista verificado",
      "Estadísticas de visitas a tu perfil"
    ],
    cta: "Empezar 14 días gratis",
    ctaLink: "/registro",
    featured: true,
    badge: "⭐ Más popular"
  },
  {
    name: "✦ Headliner",
    price: "79€",
    period: "/ mes",
    desc: "Para profesionales con ambición de headliner.",
    features: [
      "Todo lo de Spotlight",
      "Vídeos y fotos ilimitados",
      "Perfil destacado en homepage",
      "Posición prioritaria en todas las búsquedas",
      "Badge Headliner exclusivo",
      "Acceso anticipado a nuevas funciones",
      "Soporte prioritario"
    ],
    cta: "Contactar ventas",
    ctaLink: "/registro",
    featured: false
  }
];

const testimonials = [
  {
    text: "Llevaba años actuando en bares pequeños. A los dos meses de crear mi perfil en Escénika tenía la agenda completa con bodas y eventos corporativos. Es la plataforma que siempre necesité.",
    name: "Sofía García",
    role: "Cantante de jazz · Madrid",
    initials: "SG"
  },
  {
    text: "Organizo eventos para empresas del Ibex y la calidad de los artistas en Escénika es impresionante. El contacto directo me ahorra semanas de negociación con agencias.",
    name: "Marcos Rodríguez",
    role: "Event Manager · Barcelona",
    initials: "MR"
  },
  {
    text: "El plan Spotlight se pagó solo con la primera actuación que conseguí. Ahora tengo más trabajo del que puedo gestionar. Escénika cambió mi carrera.",
    name: "Alejandro López",
    role: "Pianista · Valencia",
    initials: "AL"
  }
];

const categories = [
  { icon: Music, label: "Música" },
  { icon: Drama, label: "Teatro" },
  { icon: Wand2, label: "Magia" },
  { icon: Mic2, label: "Comedia" },
  { icon: Sparkles, label: "Danza" },
  { icon: Disc3, label: "DJ" },
  { icon: Palette, label: "Arte" }
];

function EscnikaLanding() {
  return (
    <div className="min-h-dvh gradient-hero">
      <SiteHeader />

      {/* Hero Section */}
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
          Conectamos artistas talentosos con organizadores de eventos. Sin intermediarios, sin comisiones, con contacto directo.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" variant="gold" className="rounded-full px-8">
            <Link to="/registro">
              Crear perfil de artista <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full px-8">
            <Link to="/explorar">Buscar artistas →</Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 flex flex-wrap justify-center gap-12 border-t border-border pt-12">
          <div className="text-center">
            <div className="font-display text-4xl font-bold text-gold">2.400+</div>
            <div className="mt-1 text-sm text-muted-foreground">Artistas verificados</div>
          </div>
          <div className="text-center">
            <div className="font-display text-4xl font-bold text-gold">850+</div>
            <div className="mt-1 text-sm text-muted-foreground">Eventos este mes</div>
          </div>
          <div className="text-center">
            <div className="font-display text-4xl font-bold text-gold">0%</div>
            <div className="mt-1 text-sm text-muted-foreground">Comisión para artistas</div>
          </div>
          <div className="text-center">
            <div className="font-display text-4xl font-bold text-gold">47</div>
            <div className="mt-1 text-sm text-muted-foreground">Provincias cubiertas</div>
          </div>
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

      {/* Features Section */}
      <section className="mx-auto max-w-[1180px] px-6 py-20" id="features">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-gold">¿Por qué Escénika?</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">
            La plataforma que artistas<br />y organizadores merecían
          </h2>
          <p className="mx-auto mt-4 max-w-[520px] text-muted-foreground">
            Todo lo que necesitas para conectar talento con oportunidades, en un solo lugar.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="rounded-xl border border-border bg-card/70 p-8 transition-all hover:-translate-y-1 hover:border-gold/40"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gold/15 text-2xl">
                  <Icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it Works Section */}
      <section className="bg-card/40" id="como-funciona">
        <div className="mx-auto max-w-[1180px] px-6 py-20">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-gold">Cómo funciona</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">
              Tres pasos para el<br />evento perfecto
            </h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.n} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full gradient-gold font-display text-2xl font-bold text-gold-foreground shadow-gold">
                  {step.n}
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="mx-auto max-w-[1180px] px-6 py-20" id="planes">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-gold">Planes para Artistas</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">
            Elige el plan que<br />impulsa tu carrera
          </h2>
          <p className="mx-auto mt-4 max-w-[520px] text-muted-foreground">
            Empieza gratis. Escala cuando quieras. Sin comisiones en ningún plan.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-xl border p-8 transition-all ${
                plan.featured 
                  ? "border-gold/50 gradient-card shadow-glow hover:-translate-y-1" 
                  : "border-border bg-card/50 hover:-translate-y-1"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full gradient-gold px-3 py-1 text-xs font-bold text-gold-foreground">
                  {plan.badge}
                </span>
              )}

              <div className="font-display text-xl font-bold">{plan.name}</div>
              <div className="mt-2 font-display text-4xl font-bold text-gold">
                {plan.price}
                <span className="text-base text-muted-foreground">{plan.period}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{plan.desc}</p>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button 
                asChild 
                variant={plan.featured ? "gold" : "outline"} 
                className="mt-8 w-full rounded-full"
              >
                <Link to={plan.ctaLink}>{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mx-auto max-w-[1180px] px-6 py-20">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-gold">Lo dicen los artistas</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">
            Historias reales de<br />artistas que triunfan
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-xl border border-border bg-card/70 p-7">
              <p className="italic leading-relaxed text-foreground">"{t.text}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold to-secondary font-bold text-gold-foreground">
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-[900px] px-6 pb-20">
        <div className="rounded-3xl border border-gold/30 bg-card/70 p-16 text-center shadow-glow">
          <span className="text-xs font-semibold uppercase tracking-wider text-gold">¿Listo para empezar?</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">
            Tu escenario<br />
            <span className="text-gradient-gold italic">empieza aquí.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[500px] text-muted-foreground">
            Únete a miles de artistas y organizadores que ya confían en Escénika para conectar talento con oportunidades reales.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="gold" className="rounded-full px-8">
              <Link to="/registro">Crear perfil de artista — Gratis</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8">
              <Link to="/explorar">Buscar artistas para mi evento</Link>
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}