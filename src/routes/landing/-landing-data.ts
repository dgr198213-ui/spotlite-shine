// Landing page data - features, steps, plans, testimonials, categories
import {
  Mic,
  Search,
  MessageCircle,
  CreditCard,
  CheckCircle,
  Calendar,
  Sparkles,
  Music,
  Drama,
  Wand2,
  Mic2,
  Disc3,
  Palette,
} from "lucide-react";

export const features = [
  {
    icon: Mic,
    title: "Perfil multimedia completo",
    desc: "Sube fotos, vídeos de actuaciones reales y tu rider técnico. Muestra tu talento tal como es, sin filtros.",
  },
  {
    icon: Search,
    title: "Búsqueda avanzada",
    desc: "Filtra por categoría artística, ciudad, rango de precios y disponibilidad. Encuentra el artista perfecto en minutos.",
  },
  {
    icon: MessageCircle,
    title: "Contacto directo",
    desc: "Sin intermediarios. Habla directamente con el artista, acuerda los detalles y cierra la contratación tú mismo.",
  },
  {
    icon: CreditCard,
    title: "Sin comisiones ocultas",
    desc: "Los artistas cobran el 100% de lo acordado. TUESDI funciona con planes de suscripción transparentes.",
  },
  {
    icon: CheckCircle,
    title: "Artistas verificados",
    desc: "Revisamos cada perfil manualmente. Solo perfiles reales con trayectoria demostrable llegan a tu búsqueda.",
  },
  {
    icon: Calendar,
    title: "Agenda y disponibilidad",
    desc: "Los artistas gestionan su calendario directamente en la plataforma. Sin sorpresas de última hora.",
  },
] as const;

export const steps = [
  {
    n: 1,
    title: "Crea tu perfil",
    desc: "Regístrate gratis como artista. Sube tus mejores fotos, vídeos y describe tu propuesta artística.",
  },
  {
    n: 2,
    title: "Gana visibilidad",
    desc: "Aparece en nuestro explorador. Los organizadores podrán encontrarte y contactar contigo directamente.",
  },
  {
    n: 3,
    title: "Eventos gratuitos",
    desc: "Publica eventos gratis o recibe solicitudes. Tú gestionas tu agenda y cobras el 100% sin comisiones.",
  },
] as const;

export const plans = [
  {
    name: "✦ TUESDI Free",
    price: "0€",
    period: "/ siempre",
    desc: "Para empezar a ganar visibilidad online.",
    features: [
      "Perfil básico con bio y categorías",
      "1 fotografía de presentación",
      "Aparece en búsquedas",
      "Contacto directo con organizadores",
      "0% comisión",
    ],
    cta: "Empezar gratis",
    ctaLink: "/registro",
    featured: false,
  },
  {
    name: "✦ TUESDI Standard",
    price: "6€",
    period: "/ mes",
    desc: "Para artistas que quieren destacar de verdad.",
    features: [
      "Todo lo de Free",
      "1 vídeo de presentación (8s)",
      "6 fotografías en galería",
      "Prioridad en resultados de búsqueda",
      "Promoción en redes sociales",
      "Soporte prioritario",
    ],
    cta: "Suscribirse",
    ctaLink: "/registro",
    featured: true,
    badge: "⭐ Recomendado",
  },
  {
    name: "✦ TUESDI Pro",
    price: "19€",
    period: "/ mes",
    desc: "Para artistas profesionales con ambición.",
    features: [
      "Todo lo de Standard",
      "Vídeos y fotos ilimitados",
      "Badge verificado exclusivo",
      "Posición prioritaria en búsquedas",
      "Análisis detallado de perfil",
      "Soporte 24/7",
    ],
    cta: "Suscribirse",
    ctaLink: "/registro",
    featured: false,
  },
] as const;

export const testimonials = [
  {
    text: "Llevaba años actuando en bares pequeños. A los dos meses de crear mi perfil en TUESDI tenía la agenda completa con bodas y eventos corporativos. Es la plataforma que siempre necesité.",
    name: "Sofía García",
    role: "Cantante de jazz · Madrid",
    initials: "SG",
  },
  {
    text: "Organizo eventos para empresas del Ibex y la calidad de los artistas en TUESDI es impresionante. El contacto directo me ahorra semanas de negociación con agencias.",
    name: "Marcos Rodríguez",
    role: "Event Manager · Barcelona",
    initials: "MR",
  },
  {
    text: "El plan Spotlight se pagó solo con la primera actuación que conseguí. Ahora tengo más trabajo del que puedo gestionar. TUESDI cambió mi carrera.",
    name: "Alejandro López",
    role: "Pianista · Valencia",
    initials: "AL",
  },
] as const;

export const categories = [
  { icon: Music, label: "Música" },
  { icon: Drama, label: "Teatro" },
  { icon: Wand2, label: "Magia" },
  { icon: Mic2, label: "Comedia" },
  { icon: Sparkles, label: "Danza" },
  { icon: Disc3, label: "DJ" },
  { icon: Palette, label: "Arte" },
] as const;

export const stats = [
  { value: "2.400+", label: "Artistas verificados" },
  { value: "850+", label: "Eventos este mes" },
  { value: "0%", label: "Comisión para artistas" },
  { value: "47", label: "Provincias cubiertas" },
] as const;
