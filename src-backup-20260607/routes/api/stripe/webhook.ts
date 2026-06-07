import { json } from "@tanstack/start";
import { stripeServer } from "@/integrations/stripe/server";

export async function POST({ request }: { request: Request }) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return json({ error: "Missing signature" }, { status: 400 });
    }

    // Verify and construct the event
    const event = stripeServer.verifyWebhookSignature(body, signature);

    // Handle the event
    await stripeServer.handleWebhook(event);

    return json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return json({ error: "Webhook handler failed" }, { status: 400 });
  }
}
