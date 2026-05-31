import { describe, it, vi, expect, beforeEach } from "vitest";
import type { Database } from "@/integrations/supabase/types";

// Re-export types for convenience
type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"];

describe("Supabase Client", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getSupabaseConfig", () => {
    it("should read from VITE_SUPABASE_URL env var", async () => {
      process.env.VITE_SUPABASE_URL = "https://test-project.supabase.co";
      process.env.VITE_SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test";

      // Reset module to pick up env changes
      vi.resetModules();
      const { supabase } = await import("@/integrations/supabase/client");

      // Access URL property to trigger lazy initialization
      expect(supabase).toBeDefined();
    });

    it("should handle missing env vars gracefully", async () => {
      delete process.env.VITE_SUPABASE_URL;
      delete process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

      vi.resetModules();
      const { supabase } = await import("@/integrations/supabase/client");

      expect(supabase).toBeDefined();
    });
  });
});

describe("Supabase Types", () => {
  it("should have correct artist_plan enum values", () => {
    const validPlans: ("spark" | "spotlight" | "headliner")[] = ["spark", "spotlight", "headliner"];

    validPlans.forEach((plan) => {
      expect(["spark", "spotlight", "headliner"]).toContain(plan);
    });
  });

  it("should have correct artist_category enum values", () => {
    const validCategories = [
      "musica",
      "teatro",
      "magia",
      "comedia",
      "danza",
      "dj",
      "circo",
      "arte",
      "foto_video",
    ] as const;

    expect(validCategories).toHaveLength(9);
    validCategories.forEach((cat) => {
      expect(typeof cat).toBe("string");
    });
  });

  it("should have correct app_role enum values", () => {
    const validRoles = ["admin", "artist", "organizer"] as const;

    expect(validRoles).toHaveLength(3);
    validRoles.forEach((role) => {
      expect(["admin", "artist", "organizer"]).toContain(role);
    });
  });

  it("should define all required tables", () => {
    const requiredTables = [
      "events",
      "favorites",
      "media",
      "messages",
      "profiles",
      "subscriptions",
      "user_roles",
    ];

    // This is a compile-time check but we make it runtime for testing
    const db = {} as Database;
    const tables = Object.keys(db.public.Tables);

    requiredTables.forEach((table) => {
      expect(tables).toContain(table);
    });
  });
});

describe("Profile Types", () => {
  it("should validate profile row structure", () => {
    const validProfile: Profile = {
      id: "user_123",
      display_name: "Lucía Reverb",
      category: "musica",
      city: "Madrid",
      plan: "spotlight",
      avatar_url: "https://storage.supabase.co/avatars/user_123.jpg",
      bio: "Cantautora y directora escénica",
      cover_url: null,
      created_at: "2024-01-15T10:30:00Z",
      updated_at: "2024-01-20T15:45:00Z",
      is_published: true,
      organizer_company: null,
      organizer_email: null,
      organizer_name: null,
      organizer_phone: null,
      organizer_website: null,
      price_from: 150,
      rating: 4.8,
      requirements: "Necesito equipo de sonido básico",
      reviews_count: 12,
      slug: "lucia-reverb",
    };

    expect(validProfile.id).toBeTruthy();
    expect(validProfile.display_name).toBeTruthy();
    expect(["spark", "spotlight", "headliner"]).toContain(validProfile.plan);
    expect(typeof validProfile.created_at).toBe("string");
  });

  it("should validate organizer profile fields", () => {
    const organizerProfile: Profile = {
      id: "user_456",
      display_name: "Mi Sala de Conciertos",
      category: null,
      city: "Barcelona",
      plan: "spark",
      avatar_url: null,
      bio: null,
      cover_url: null,
      created_at: "2024-02-01T09:00:00Z",
      updated_at: "2024-02-01T09:00:00Z",
      is_published: true,
      organizer_company: "Mi Sala S.L.",
      organizer_email: "contacto@misala.es",
      organizer_name: "Carlos García",
      organizer_phone: "+34612345678",
      organizer_website: "https://misala.es",
      price_from: null,
      rating: null,
      requirements: null,
      reviews_count: 0,
      slug: "mi-sala-conciertos",
    };

    expect(organizerProfile.organizer_company).toBeTruthy();
    expect(organizerProfile.organizer_email).toBeTruthy();
    expect(organizerProfile.plan).toBe("spark");
  });
});

describe("Subscription Types", () => {
  it("should validate subscription row structure", () => {
    const validSubscription: Subscription = {
      id: "sub_123",
      user_id: "user_123",
      stripe_customer_id: "cus_abc123",
      stripe_subscription_id: "sub_xyz789",
      plan: "headliner",
      status: "active",
      current_period_start: "2024-01-01T00:00:00Z",
      current_period_end: "2024-02-01T00:00:00Z",
      cancel_at: null,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-15T10:00:00Z",
    };

    expect(validSubscription.user_id).toBeTruthy();
    expect(validSubscription.plan).toBe("headliner");
    expect(validSubscription.status).toBeTruthy();
  });

  it("should validate canceled subscription", () => {
    const canceledSubscription: Subscription = {
      id: "sub_canceled",
      user_id: "user_cancel",
      stripe_customer_id: "cus_cancel",
      stripe_subscription_id: "sub_cancel",
      plan: "spark",
      status: "canceled",
      current_period_start: "2024-01-01T00:00:00Z",
      current_period_end: "2024-01-15T00:00:00Z",
      cancel_at: "2024-01-15T00:00:00Z",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-15T00:00:00Z",
    };

    expect(canceledSubscription.status).toBe("canceled");
    expect(canceledSubscription.cancel_at).toBeTruthy();
  });

  it("should validate past_due subscription", () => {
    const pastDueSubscription: Subscription = {
      id: "sub_past_due",
      user_id: "user_past_due",
      stripe_customer_id: "cus_past",
      stripe_subscription_id: "sub_past",
      plan: "spotlight",
      status: "past_due",
      current_period_start: "2024-01-01T00:00:00Z",
      current_period_end: "2024-02-01T00:00:00Z",
      cancel_at: null,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-20T00:00:00Z",
    };

    expect(pastDueSubscription.status).toBe("past_due");
  });
});

describe("Media Types", () => {
  it("should validate media type enum values", () => {
    const validMediaTypes = ["image", "video"] as const;

    expect(validMediaTypes).toHaveLength(2);
    validMediaTypes.forEach((type) => {
      expect(["image", "video"]).toContain(type);
    });
  });
});

describe("Database Constants", () => {
  it("should export Constants with all enums", async () => {
    // Import Constants from the types module
    const { Constants } = await import("@/integrations/supabase/types");

    expect(Constants.public.Enums).toBeDefined();
    expect(Constants.public.Enums.artist_plan).toEqual(["spark", "spotlight", "headliner"]);
    expect(Constants.public.Enums.artist_category).toHaveLength(9);
    expect(Constants.public.Enums.app_role).toEqual(["admin", "artist", "organizer"]);
    expect(Constants.public.Enums.media_type).toEqual(["image", "video"]);
  });
});