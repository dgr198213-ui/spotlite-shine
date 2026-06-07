import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    if (!publishableKey) {
      console.error("VITE_STRIPE_PUBLISHABLE_KEY is not set");
      return Promise.resolve(null);
    }
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

export const STRIPE_PLANS = {
  spark: {
    name: "Spark (Gratis)",
    price: 0,
    priceId: null,
    description: "Plan gratuito para empezar",
    features: [
      "1 fotografía de presentación",
      "Descripción y precio",
      "Exigencias técnicas",
      "Visible en el explorador",
      "Sin comisiones",
    ],
  },
  spotlight: {
    name: "Spotlight",
    price: 6,
    priceId: process.env.VITE_STRIPE_SPOTLIGHT_PRICE_ID || "price_spotlight",
    description: "Plan recomendado para artistas",
    features: [
      "Todo del plan Spark +",
      "1 vídeo de hasta 8 segundos",
      "6 fotografías",
      "Promoción en redes",
      "Prioridad en búsquedas",
      "Soporte prioritario",
    ],
  },
  headliner: {
    name: "Headliner",
    price: 19,
    priceId: process.env.VITE_STRIPE_HEADLINER_PRICE_ID || "price_headliner",
    description: "Plan profesional completo",
    features: [
      "Todo del plan Spotlight +",
      "100 vídeos sin límite de duración",
      "100 fotografías",
      "Acceso a eventos premium",
      "Análisis detallado",
      "Soporte 24/7",
    ],
  },
};
