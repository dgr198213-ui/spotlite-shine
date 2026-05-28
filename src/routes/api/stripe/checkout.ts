import { json } from "@tanstack/start";
import { stripeServer } from "@/integrations/stripe/server";
import { getAuth } from "@/lib/auth-context";

const STRIPE_PLANS: Record<string, string> = {
  spotlight: process.env.STRIPE_SPOTLIGHT_PRICE_ID || "price_spotlight",
  headliner: process.env.STRIPE_HEADLINER_PRICE_ID || "price_headliner",
};

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

    const priceId = STRIPE_PLANS[planId];
    if (!priceId) {
      return json({ error: "Invalid plan" }, { status: 400 });
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
