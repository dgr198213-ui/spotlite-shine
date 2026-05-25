import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function SiteHeader() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-4 z-50 mx-auto w-[min(1180px,calc(100%-2rem))]">
      <div className="flex items-center justify-between rounded-full border border-border bg-card/70 px-5 py-3 backdrop-blur-xl shadow-card">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold">
          <Sparkles className="h-5 w-5 text-gold" />
          <span>Spot&Shows</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm md:flex">
          <Link to="/explorar" className="text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }}>Explorar</Link>
          <Link to="/precios" className="text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }}>Precios</Link>
          <a href="/#como-funciona" className="text-muted-foreground transition-colors hover:text-foreground">Cómo funciona</a>
        </nav>
        {user ? (
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="rounded-full">
              <Link to="/panel">Mi panel</Link>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full"
              onClick={async () => {
                await supabase.auth.signOut();
                navigate({ to: "/" });
              }}
            >
              Salir
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="rounded-full">
              <Link to="/login">Acceder</Link>
            </Button>
            <Button asChild size="sm" variant="gold" className="rounded-full">
              <Link to="/registro">Empezar</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
