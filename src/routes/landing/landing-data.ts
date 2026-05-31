// Landing page data - features, steps, plans, testimonials, categories
import {
  Mic, Search, MessageCircle, CreditCard, CheckCircle, Calendar,
  Sparkles, Music, Drama, Wand2, Mic2, Disc3, Palette
} from "lucide-react";

export const features = [
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
] as const;

export const steps = [
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
] as const;

export const plans = [
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
] as const;

export const testimonials = [
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
] as const;

export const categories = [
  { icon: Music, label: "Música" },
  { icon: Drama, label: "Teatro" },
  { icon: Wand2, label: "Magia" },
  { icon: Mic2, label: "Comedia" },
  { icon: Sparkles, label: "Danza" },
  { icon: Disc3, label: "DJ" },
  { icon: Palette, label: "Arte" }
] as const;

export const stats = [
  { value: "2.400+", label: "Artistas verificados" },
  { value: "850+", label: "Eventos este mes" },
  { value: "0%", label: "Comisión para artistas" },
  { value: "47", label: "Provincias cubiertas" }
] as const;