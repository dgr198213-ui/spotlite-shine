import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";
import { SpeedInsights } from "@vercel/speed-insights/react";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 text-center">
      <p className="font-display text-8xl text-gradient-gold">404</p>
      <h1 className="mt-4 font-display text-2xl">Esta página no existe</h1>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Puede que el enlace haya cambiado o que la página haya sido retirada.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-gold transition-transform hover:scale-105"
      >
        Volver al inicio
      </Link>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 text-center">
      <h1 className="font-display text-2xl">Algo se salió del guion</h1>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">{error.message}</p>
      <button
        onClick={() => {
          router.invalidate();
          reset();
        }}
        className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-gold"
      >
        Intentar de nuevo
      </button>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Escénika — Tu escenario, tu audiencia, tu momento" },
      {
        name: "description",
        content:
          "La plataforma donde artistas de España encuentran su público y los eventos encuentran talento excepcional. Sin comisiones.",
      },
      { property: "og:title", content: "Escénika — Tu escenario, tu audiencia, tu momento" },
      {
        property: "og:description",
        content: "La plataforma donde artistas y eventos se encuentran. Sin comisiones.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="bg-background">
      <head>
        <HeadContent />
      </head>
      <body className="bg-background">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      router.invalidate();
    });
    return () => subscription.unsubscribe();
  }, [router]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Outlet />
        <Toaster richColors position="top-center" />
        <SpeedInsights />
      </AuthProvider>
    </QueryClientProvider>
  );
}
