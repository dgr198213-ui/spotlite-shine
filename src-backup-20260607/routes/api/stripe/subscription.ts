import { json } from "@tanstack/start";
import { stripeServer } from "@/integrations/stripe/server";
import { getAuth } from "@/lib/auth-context";

export async function GET({ request }: { request: Request }) {
  try {
    const auth = await getAuth();
    if (!auth.user) {
      return json({ error: "Unauthorized" }, { status: 401 });
    }

    const subscription = await stripeServer.getSubscription(auth.user.id);
    return json({ subscription });
  } catch (error) {
    console.error("Get subscription error:", error);
    return json({ error: "Failed to get subscription" }, { status: 500 });
  }
}

export async function POST({ request }: { request: Request }) {
  try {
    const auth = await getAuth();
    if (!auth.user) {
      return json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as { action: string; subscriptionId?: string };
    const { action, subscriptionId } = body;

    if (action === "cancel" && subscriptionId) {
      await stripeServer.cancelStripeSubscription(subscriptionId);
      return json({ success: true });
    }

    return json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Subscription action error:", error);
    return json({ error: "Failed to process subscription action" }, { status: 500 });
  }
}
