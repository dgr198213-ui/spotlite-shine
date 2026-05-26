import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthState {
  session: Session | null;
  user: User | null;
  loading: boolean;
}

const AuthCtx = createContext<AuthState>({ session: null, user: null, loading: true });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ session: null, user: null, loading: true });

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setState({ session, user: session?.user ?? null, loading: false });
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setState({ session, user: session?.user ?? null, loading: false });
    });
    return () => subscription.unsubscribe();
  }, []);

  return <AuthCtx.Provider value={state}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => useContext(AuthCtx);

/**
 * Server-side helper to get current user from request headers
 */
export async function getAuth() {
  const { getRequest } = await import("@tanstack/react-start/server");
  const { createClient } = await import("@supabase/supabase-js");

  const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const SUPABASE_PUBLISHABLE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;

  const request = getRequest();
  const authHeader = request?.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return { user: null };
  }

  const token = authHeader.split(" ")[1];
  const supabase = createClient(SUPABASE_URL!, SUPABASE_PUBLISHABLE_KEY!);
  const { data: { user } } = await supabase.auth.getUser(token);

  return { user };
}

