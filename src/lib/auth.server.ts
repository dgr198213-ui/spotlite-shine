import { getRequest } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";

export async function getAuth() {
  const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const SUPABASE_PUBLISHABLE_KEY =
    process.env.SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    console.error("Missing Supabase configuration");
    return { user: null };
  }

  try {
    const request = getRequest();
    const authHeader = request?.headers.get("authorization");
    let token: string | null = null;

    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else {
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