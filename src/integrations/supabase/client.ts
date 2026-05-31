import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

function getSupabaseConfig() {
  // Supports NEXT_PUBLIC_ (Vercel/Next.js standard), VITE_ (Vite), and bare names
  const SUPABASE_URL =
    import.meta.env.NEXT_PUBLIC_SUPABASE_URL ||
    import.meta.env.VITE_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL;

  // Supports ANON_KEY (Supabase standard) and PUBLISHABLE_KEY (legacy)
  const SUPABASE_ANON_KEY =
    import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  return { SUPABASE_URL, SUPABASE_ANON_KEY };
}

function createSupabaseClient() {
  const { SUPABASE_URL, SUPABASE_ANON_KEY } = getSupabaseConfig();

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    const missing = [
      ...(!SUPABASE_URL ? ["NEXT_PUBLIC_SUPABASE_URL"] : []),
      ...(!SUPABASE_ANON_KEY ? ["NEXT_PUBLIC_SUPABASE_ANON_KEY"] : []),
    ];
    console.warn(
      `[Supabase] Missing env var(s): ${missing.join(", ")}. Configure them in Vercel Environment Variables.`,
    );
    return createClient<Database>("https://placeholder.supabase.co", "placeholder-key", {
      auth: {
        storage: typeof window !== "undefined" ? localStorage : undefined,
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }

  return createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      storage: typeof window !== "undefined" ? localStorage : undefined,
      persistSession: true,
      autoRefreshToken: true,
    },
  });
}

let _supabase: ReturnType<typeof createSupabaseClient> | undefined;

export const supabase = new Proxy({} as ReturnType<typeof createSupabaseClient>, {
  get(_, prop, receiver) {
    if (!_supabase) _supabase = createSupabaseClient();
    return Reflect.get(_supabase, prop, receiver);
  },
});
