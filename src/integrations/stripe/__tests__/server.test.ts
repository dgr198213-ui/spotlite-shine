import { describe, it, vi, expect, beforeEach } from "vitest";

// Mock Stripe
vi.mock("stripe", () => ({
  default: vi.fn().mockImplementation(() => ({
    customers: {
      create: vi.fn(),
    },
    checkout: {
      sessions: {
        create: vi.fn(),
      },
    },
    subscriptions: {
      retrieve: vi.fn(),
      del: vi.fn(),
    },
    webhooks: {
      constructEvent: vi.fn(),
    },
  })),
}));

// Mock supabaseAdmin
const mockSupabaseAdmin = {
  from: vi.fn().mockReturnThis(),
  select: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  single: vi.fn(),
  upsert: vi.fn().mockResolvedValue({ error: null }),
  update: vi.fn().mockResolvedValue({ error: null }),
};

vi.mock("@/integrations/supabase/client.server", () => ({
  supabaseAdmin: mockSupabaseAdmin,
}));

describe("Stripe Server", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createCheckoutSession", () => {
    it("should create checkout session for existing customer", async () => {
      const { stripeServer } = await import("@/integrations/stripe/server");

      // Mock existing subscription with customer ID
      mockSupabaseAdmin.from().select().eq().single.mockResolvedValue({
        data: { stripe_customer_id: "cus_existing123" },
        error: null,
      });

      const stripe = (await import("stripe")).default.mock.results[0].value;
      stripe.checkout.sessions.create.mockResolvedValue({
        id: "cs_test_123",
        url: "https://checkout.stripe.com/cs_test_123",
      });

      const result = await stripeServer.createCheckoutSession(
        "user_123",
        "price_spark_monthly",
        "https://app.com/success",
        "https://app.com/cancel",
      );

      expect(result).toHaveProperty("sessionId", "cs_test_123");
      expect(result).toHaveProperty("url", "https://checkout.stripe.com/cs_test_123");
    });

    it("should create new customer when none exists", async () => {
      const { stripeServer } = await import("@/integrations/stripe/server");

      // No existing customer
      mockSupabaseAdmin.from().select().eq().single.mockResolvedValue({
        data: null,
        error: { code: "PGRST116" },
      });

      // Mock admin.getUserById
      mockSupabaseAdmin.auth = {
        admin: {
          getUserById: vi.fn().mockResolvedValue({
            data: { user: { email: "artist@example.com" } },
          }),
        },
      };

      const stripe = (await import("stripe")).default.mock.results[0].value;
      stripe.customers.create.mockResolvedValue({ id: "cus_new456" });
      stripe.checkout.sessions.create.mockResolvedValue({
        id: "cs_test_456",
        url: "https://checkout.stripe.com/cs_test_456",
      });

      const result = await stripeServer.createCheckoutSession(
        "user_new",
        "price_spotlight_monthly",
        "https://app.com/success",
        "https://app.com/cancel",
      );

      expect(stripe.customers.create).toHaveBeenCalledWith(
        expect.objectContaining({
          email: "artist@example.com",
          metadata: { userId: "user_new" },
        }),
      );
      expect(result.sessionId).toBe("cs_test_456");
    });

    it("should throw error when user email not found", async () => {
      const { stripeServer } = await import("@/integrations/stripe/server");

      mockSupabaseAdmin.from().select().eq().single.mockResolvedValue({
        data: null,
        error: { code: "PGRST116" },
      });
      mockSupabaseAdmin.auth = {
        admin: {
          getUserById: vi.fn().mockResolvedValue({
            data: { user: null },
          }),
        },
      };

      await expect(
        stripeServer.createCheckoutSession(
          "user_noemail",
          "price_spark",
          "https://app.com/success",
          "https://app.com/cancel",
        ),
      ).rejects.toThrow("User email not found");
    });
  });

  describe("syncSubscription", () => {
    it("should sync subscription with correct plan detection", async () => {
      const { stripeServer } = await import("@/integrations/stripe/server");

      mockSupabaseAdmin.from().upsert.mockResolvedValue({ error: null });
      mockSupabaseAdmin.from().update.mockResolvedValue({ error: null });

      const mockSubscription = {
        id: "sub_spotlight",
        metadata: { userId: "user_plan_test" },
        customer: "cus_123",
        status: "active",
        items: {
          data: [{ price: { id: "price_spotlight_monthly" } }],
        },
        current_period_start: 1704067200,
        current_period_end: 1735689600,
        cancel_at: null,
      };

      await stripeServer.syncSubscription(mockSubscription as any);

      expect(mockSupabaseAdmin.from()).toHaveBeenCalledWith("subscriptions");
      expect(mockSupabaseAdmin.from().upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          plan: "spotlight",
          status: "active",
          user_id: "user_plan_test",
        }),
        { onConflict: "user_id,plan" },
      );
    });

    it("should detect headliner plan from price ID", async () => {
      const { stripeServer } = await import("@/integrations/stripe/server");

      mockSupabaseAdmin.from().upsert.mockResolvedValue({ error: null });
      mockSupabaseAdmin.from().update.mockResolvedValue({ error: null });

      const mockSubscription = {
        id: "sub_headliner",
        metadata: { userId: "user_headliner" },
        customer: "cus_456",
        status: "trialing",
        items: {
          data: [{ price: { id: "price_headliner_yearly" } }],
        },
        current_period_start: 1704067200,
        current_period_end: 1735689600,
        cancel_at: null,
      };

      await stripeServer.syncSubscription(mockSubscription as any);

      expect(mockSupabaseAdmin.from().upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          plan: "headliner",
        }),
        expect.anything(),
      );
    });

    it("should throw error when userId missing from metadata", async () => {
      const { stripeServer } = await import("@/integrations/stripe/server");

      const mockSubscription = {
        id: "sub_no_user",
        metadata: {},
        customer: "cus_789",
        items: { data: [] },
      };

      await expect(stripeServer.syncSubscription(mockSubscription as any)).rejects.toThrow(
        "User ID not found",
      );
    });
  });

  describe("cancelSubscription", () => {
    it("should cancel subscription and reset plan to spark", async () => {
      const { stripeServer } = await import("@/integrations/stripe/server");

      mockSupabaseAdmin.from().update.mockResolvedValue({ error: null });

      const mockSubscription = {
        id: "sub_cancel_test",
        metadata: { userId: "user_cancel" },
      };

      await stripeServer.cancelSubscription(mockSubscription as any);

      // First call updates subscriptions table
      expect(mockSupabaseAdmin.from()).toHaveBeenCalledWith("subscriptions");
      expect(mockSupabaseAdmin.from().update).toHaveBeenCalledWith(
        expect.objectContaining({ status: "canceled" }),
      );

      // Second call updates profiles
      expect(mockSupabaseAdmin.from().update).toHaveBeenCalledWith(
        expect.objectContaining({ plan: "spark" }),
      );
    });
  });

  describe("getSubscription", () => {
    it("should return subscription data", async () => {
      const { stripeServer } = await import("@/integrations/stripe/server");

      mockSupabaseAdmin.from().select().eq().order().limit().single.mockResolvedValue({
        data: {
          id: "sub_get_123",
          user_id: "user_get",
          plan: "spotlight",
          status: "active",
        },
        error: null,
      });

      const result = await stripeServer.getSubscription("user_get");

      expect(result).toEqual({
        id: "sub_get_123",
        user_id: "user_get",
        plan: "spotlight",
        status: "active",
      });
    });

    it("should return null for not found (PGRST116)", async () => {
      const { stripeServer } = await import("@/integrations/stripe/server");

      mockSupabaseAdmin.from().select().eq().order().limit().single.mockResolvedValue({
        data: null,
        error: { code: "PGRST116" },
      });

      const result = await stripeServer.getSubscription("user_notfound");

      expect(result).toBeNull();
    });

    it("should throw for other errors", async () => {
      const { stripeServer } = await import("@/integrations/stripe/server");

      mockSupabaseAdmin.from().select().eq().order().limit().single.mockResolvedValue({
        data: null,
        error: { code: "PGRST000" },
      });

      await expect(stripeServer.getSubscription("user_error")).rejects.toThrow();
    });
  });

  describe("verifyWebhookSignature", () => {
    it("should throw when webhook secret not configured", async () => {
      delete process.env.STRIPE_WEBHOOK_SECRET;

      const { stripeServer } = await import("@/integrations/stripe/server");

      await expect(
        stripeServer.verifyWebhookSignature("body", "sig"),
      ).rejects.toThrow("Webhook secret not configured");
    });

    it("should call stripe.webhooks.constructEvent with correct params", async () => {
      process.env.STRIPE_WEBHOOK_SECRET = "whsec_test_secret";

      const { stripeServer } = await import("@/integrations/stripe/server");

      const stripe = (await import("stripe")).default.mock.results[0].value;
      stripe.webhooks.constructEvent.mockReturnValue({ type: "test" });

      const mockEvent = { type: "customer.subscription.created" };
      stripe.webhooks.constructEvent.mockReturnValue(mockEvent);

      const result = stripeServer.verifyWebhookSignature(
        '{"test": "payload"}',
        "sig_abc123",
      );

      expect(stripe.webhooks.constructEvent).toHaveBeenCalledWith(
        '{"test": "payload"}',
        "sig_abc123",
        "whsec_test_secret",
      );
      expect(result).toEqual(mockEvent);
    });
  });

  describe("cancelStripeSubscription", () => {
    it("should call stripe.subscriptions.del", async () => {
      const { stripeServer } = await import("@/integrations/stripe/server");

      const stripe = (await import("stripe")).default.mock.results[0].value;
      stripe.subscriptions.del.mockResolvedValue({ id: "sub_deleted", status: "canceled" });

      const result = await stripeServer.cancelStripeSubscription("sub_cancel_123");

      expect(stripe.subscriptions.del).toHaveBeenCalledWith("sub_cancel_123");
      expect(result).toEqual({ id: "sub_deleted", status: "canceled" });
    });
  });
});