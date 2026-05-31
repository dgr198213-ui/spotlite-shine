import { describe, it, expect, vi, beforeEach } from "vitest";

describe("supabaseAdmin", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  describe("createSupabaseAdminClient", () => {
    it("should create client with valid credentials", async () => {
      process.env.SUPABASE_URL = "https://test-project.supabase.co";
      process.env.SUPABASE_SERVICE_ROLE_KEY = "valid-service-key";
      
      const { supabaseAdmin } = await import("../client.server");
      
      // Access a method to trigger initialization
      expect(supabaseAdmin).toBeDefined();
    });

    it("should create placeholder client when env vars missing", async () => {
      delete process.env.SUPABASE_URL;
      delete process.env.SUPABASE_SERVICE_ROLE_KEY;
      delete process.env.VITE_SUPABASE_URL;
      
      const { supabaseAdmin } = await import("../client.server");
      
      expect(supabaseAdmin).toBeDefined();
    });

    it("should use VITE_SUPABASE_URL as fallback", async () => {
      delete process.env.SUPABASE_URL;
      delete process.env.SUPABASE_SERVICE_ROLE_KEY;
      process.env.VITE_SUPABASE_URL = "https://fallback.supabase.co";
      
      const { supabaseAdmin } = await import("../client.server");
      
      expect(supabaseAdmin).toBeDefined();
    });
  });

  describe("lazy initialization", () => {
    it("should initialize client on first access", async () => {
      process.env.SUPABASE_URL = "https://lazy-test.supabase.co";
      process.env.SUPABASE_SERVICE_ROLE_KEY = "lazy-service-key";
      
      const { supabaseAdmin } = await import("../client.server");
      
      // Access the client - should trigger lazy init
      const fromMethod = supabaseAdmin.from;
      expect(typeof fromMethod).toBe("function");
    });

    it("should reuse same instance on multiple accesses", async () => {
      process.env.SUPABASE_URL = "https://singleton-test.supabase.co";
      process.env.SUPABASE_SERVICE_ROLE_KEY = "singleton-service-key";
      
      // Import twice (simulating different imports)
      const mod1 = await import("../client.server");
      const mod2 = await import("../client.server");
      
      // They should be the same object due to module caching
      expect(mod1.supabaseAdmin).toBe(mod2.supabaseAdmin);
    });
  });

  describe("proxy behavior", () => {
    it("should proxy from() method", async () => {
      process.env.SUPABASE_URL = "https://proxy-test.supabase.co";
      process.env.SUPABASE_SERVICE_ROLE_KEY = "proxy-service-key";
      
      const { supabaseAdmin } = await import("../client.server");
      
      const tableProxy = supabaseAdmin.from("profiles");
      
      expect(tableProxy).toBeDefined();
      // Table proxy should have chainable methods
      expect(typeof tableProxy.select).toBe("function");
      expect(typeof tableProxy.insert).toBe("function");
      expect(typeof tableProxy.update).toBe("function");
      expect(typeof tableProxy.delete).toBe("function");
    });

    it("should proxy select() method on table", async () => {
      process.env.SUPABASE_URL = "https://select-test.supabase.co";
      process.env.SUPABASE_SERVICE_ROLE_KEY = "select-service-key";
      
      const { supabaseAdmin } = await import("../client.server");
      
      const selectProxy = supabaseAdmin.from("profiles").select("*");
      
      expect(typeof selectProxy.eq).toBe("function");
    });

    it("should proxy eq() method for filtering", async () => {
      process.env.SUPABASE_URL = "https://eq-test.supabase.co";
      process.env.SUPABASE_SERVICE_ROLE_KEY = "eq-service-key";
      
      const { supabaseAdmin } = await import("../client.server");
      
      const filteredQuery = supabaseAdmin.from("profiles").select("*").eq("id", "user_123");
      
      expect(filteredQuery).toBeDefined();
    });
  });

  describe("auth proxy", () => {
    it("should expose auth.admin methods", async () => {
      process.env.SUPABASE_URL = "https://auth-test.supabase.co";
      process.env.SUPABASE_SERVICE_ROLE_KEY = "auth-service-key";
      
      const { supabaseAdmin } = await import("../client.server");
      
      expect(supabaseAdmin.auth).toBeDefined();
      expect(supabaseAdmin.auth.admin).toBeDefined();
      expect(typeof supabaseAdmin.auth.admin.getUserById).toBe("function");
    });
  });
});
