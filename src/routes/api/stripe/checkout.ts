import { json } from "@tanstack/start";
import { stripeServer } from "@/integrations/stripe/server";
import { getAuth } from "@/lib/auth-context";

// Resolves Stripe Price IDs from multiple possible env var names
function getStripePriceId(plan: string): string | null {
  if (plan === "spotlight") {
    return (
      process.env.NEXT_PUBLIC_STRIPE_SPOTLIGHT_PRICE_ID ||
      process.env.STRIPE_SPOTLIGHT_PRICE_ID ||
      process.env.VITE_STRIPE_SPOTLIGHT_PRICE_ID ||
      null
    );
  }
  if (plan === "headliner") {
    return (
      process.env.NEXT_PUBLIC_STRIPE_HEADLINER_PRICE_ID ||
      process.env.STRIPE_HEADLINER_PRICE_ID ||
      process.env.VITE_STRIPE_HEADLINER_PRICE_ID ||
      null
    );
  }
  return null;
}

export async function POST({ request }: { request: Request }) {
  try {
    // Get user from auth
    const auth = await getAuth();
    if (!auth.user) {
      return json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as {
      planId: string;
      successUrl: string;
      cancelUrl: string;
    };

    const { planId, successUrl, cancelUrl } = body;

    if (!planId || !successUrl || !cancelUrl) {
      return json({ error: "Missing required fields" }, { status: 400 });
    }

    const priceId = getStripePriceId(planId);
    if (!priceId) {
      console.error(`No Stripe Price ID configured for plan: ${planId}. Set STRIPE_SPOTLIGHT_PRICE_ID or STRIPE_HEADLINER_PRICE_ID in Vercel.`);
      return json({ error: "Plan no configurado. Contacta con soporte." }, { status: 400 });
    }

    // Create checkout session
    const { sessionId, url } = await stripeServer.createCheckoutSession(
      auth.user.id,
      priceId,
      successUrl,
      cancelUrl,
    );

    return json({ sessionId, url });
  } catch (error) {
    console.error("Checkout error:", error);
    return json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
