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
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_e, session) => {
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
 * Uses the session token from Supabase auth
 */
export async function getAuth() {
  const { getRequest } = await import("@tanstack/react-start/server");
  const { createClient } = await import("@supabase/supabase-js");

  // Use consistent environment variable names (prefer non-VITE_ for server)
  const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const SUPABASE_PUBLISHABLE_KEY =
    process.env.SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    console.error("Missing Supabase configuration");
    return { user: null };
  }

  try {
    const request = getRequest();

    // Try to get token from Authorization header
    const authHeader = request?.headers.get("authorization");
    let token: string | null = null;

    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else {
      // Fallback: try to get from cookie (for browser sessions)
      const cookieHeader = request?.headers.get("cookie");
      if (cookieHeader) {
        const cookies = cookieHeader.split(";").reduce(
          (acc, cookie) => {
            const [key, value] = cookie.trim().split("=");
            acc[key] = value;
            return acc;
          },
          {} as Record<string, string>,
        );

        // Supabase stores session in sb-{project-ref}-auth-token
        const sessionKey = Object.keys(cookies).find((key) => key.includes("auth-token"));
        if (sessionKey) {
          try {
            const sessionData = JSON.parse(decodeURIComponent(cookies[sessionKey]));
            token = sessionData.access_token;
          } catch (e) {
            // Session cookie parsing failed
          }
        }
      }
    }

    if (!token) {
      return { user: null };
    }

    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
    const {
      data: { user },
    } = await supabaseClient.auth.getUser(token);

    return { user };
  } catch (error) {
    console.error("Auth error:", error);
    return { user: null };
  }
}
