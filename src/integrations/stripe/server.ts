import Stripe from "stripe";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-12-15",
});

export const stripeServer = {
  /**
   * Create a checkout session for a subscription
   */
  async createCheckoutSession(
    userId: string,
    priceId: string,
    successUrl: string,
    cancelUrl: string
  ) {
    try {
      // Get or create Stripe customer
      let customerId: string;
      const { data: subscription } = await supabaseAdmin
        .from("subscriptions")
        .select("stripe_customer_id")
        .eq("user_id", userId)
        .single();

      if (subscription?.stripe_customer_id) {
        customerId = subscription.stripe_customer_id;
      } else {
        // Get user email
        const { data: { user } } = await supabaseAdmin.auth.admin.getUserById(userId);
        if (!user?.email) throw new Error("User email not found");

        // Create new customer
        const customer = await stripe.customers.create({
          email: user.email,
          metadata: { userId },
        });
        customerId = customer.id;
      }

      // Create checkout session
      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: { userId },
      });

      return { sessionId: session.id, url: session.url };
    } catch (error) {
      console.error("Error creating checkout session:", error);
      throw error;
    }
  },

  /**
   * Handle Stripe webhook events
   */
  async handleWebhook(event: Stripe.Event) {
    try {
      switch (event.type) {
        case "customer.subscription.created":
        case "customer.subscription.updated": {
          const subscription = event.data.object as Stripe.Subscription;
          await stripeServer.syncSubscription(subscription);
          break;
        }
        case "customer.subscription.deleted": {
          const subscription = event.data.object as Stripe.Subscription;
          await stripeServer.cancelSubscription(subscription);
          break;
        }
        case "invoice.payment_succeeded": {
          const invoice = event.data.object as Stripe.Invoice;
          if (invoice.subscription) {
            const subscription = await stripe.subscriptions.retrieve(
              invoice.subscription as string
            );
            await stripeServer.syncSubscription(subscription);
          }
          break;
        }
        case "invoice.payment_failed": {
          const invoice = event.data.object as Stripe.Invoice;
          if (invoice.subscription) {
            const subscription = await stripe.subscriptions.retrieve(
              invoice.subscription as string
            );
            await stripeServer.updateSubscriptionStatus(
              subscription,
              "past_due"
            );
          }
          break;
        }
      }
    } catch (error) {
      console.error("Error handling webhook:", error);
      throw error;
    }
  },

  /**
   * Sync subscription from Stripe to Supabase
   */
  async syncSubscription(stripeSubscription: Stripe.Subscription) {
    try {
      const userId = stripeSubscription.metadata?.userId;
      if (!userId) throw new Error("User ID not found in subscription metadata");

      const customerId = stripeSubscription.customer as string;
      const priceId = stripeSubscription.items.data[0]?.price.id;

      // Determine plan from price ID
      let plan: "spark" | "spotlight" | "headliner" = "spark";
      if (priceId?.includes("spotlight")) plan = "spotlight";
      else if (priceId?.includes("headliner")) plan = "headliner";

      // Update subscription in Supabase
      const { error } = await supabaseAdmin
        .from("subscriptions")
        .upsert(
          {
            user_id: userId,
            stripe_customer_id: customerId,
            stripe_subscription_id: stripeSubscription.id,
            plan,
            status: stripeSubscription.status,
            current_period_start: new Date(
              stripeSubscription.current_period_start * 1000
            ).toISOString(),
            current_period_end: new Date(
              stripeSubscription.current_period_end * 1000
            ).toISOString(),
            cancel_at: stripeSubscription.cancel_at
              ? new Date(stripeSubscription.cancel_at * 1000).toISOString()
              : null,
          },
          { onConflict: "user_id,plan" }
        );

      if (error) throw error;

      // Update user profile plan
      await supabaseAdmin
        .from("profiles")
        .update({ plan })
        .eq("id", userId);

      console.log(`Subscription synced for user ${userId}: ${plan}`);
    } catch (error) {
      console.error("Error syncing subscription:", error);
      throw error;
    }
  },

  /**
   * Cancel subscription
   */
  async cancelSubscription(stripeSubscription: Stripe.Subscription) {
    try {
      const userId = stripeSubscription.metadata?.userId;
      if (!userId) throw new Error("User ID not found in subscription metadata");

      // Update subscription status
      const { error } = await supabaseAdmin
        .from("subscriptions")
        .update({ status: "canceled" })
        .eq("stripe_subscription_id", stripeSubscription.id);

      if (error) throw error;

      // Reset user plan to spark
      await supabaseAdmin
        .from("profiles")
        .update({ plan: "spark" })
        .eq("id", userId);

      console.log(`Subscription canceled for user ${userId}`);
    } catch (error) {
      console.error("Error canceling subscription:", error);
      throw error;
    }
  },

  /**
   * Update subscription status
   */
  async updateSubscriptionStatus(
    stripeSubscription: Stripe.Subscription,
    status: string
  ) {
    try {
      const { error } = await supabaseAdmin
        .from("subscriptions")
        .update({ status })
        .eq("stripe_subscription_id", stripeSubscription.id);

      if (error) throw error;
    } catch (error) {
      console.error("Error updating subscription status:", error);
      throw error;
    }
  },

  /**
   * Get subscription for user
   */
  async getSubscription(userId: string) {
    try {
      const { data, error } = await supabaseAdmin
        .from("subscriptions")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== "PGRST116") throw error;
      return data;
    } catch (error) {
      console.error("Error getting subscription:", error);
      throw error;
    }
  },

  /**
   * Cancel subscription in Stripe
   */
  async cancelStripeSubscription(subscriptionId: string) {
    try {
      const subscription = await stripe.subscriptions.del(subscriptionId);
      return subscription;
    } catch (error) {
      console.error("Error canceling Stripe subscription:", error);
      throw error;
    }
  },

  /**
   * Verify webhook signature
   */
  verifyWebhookSignature(body: string, signature: string): Stripe.Event {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) throw new Error("Webhook secret not configured");

    try {
      return stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (error) {
      console.error("Webhook signature verification failed:", error);
      throw error;
    }
  },
};
