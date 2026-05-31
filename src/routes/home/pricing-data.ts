// Pricing plans data for home page
import { SparklesIcon, Star, Crown, Clock, Check } from "lucide-react";
import logo from "@/assets/logo.png";

export interface PlanFeature {
  text: string;
  icon: typeof Check;
}

export interface PlanData {
  icon: typeof SparklesIcon;
  name: string;
  badge: string;
  price: string;
  desc: string;
  popular?: boolean;
  comingSoon?: boolean;
  features: string[];
  cta: string;
}

export const pricingPlans: PlanData[] = [
  {
    icon: SparklesIcon,
    name: "Escénika Free",
    badge: "Beta · Disponible",
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
] as const;

export { logo };