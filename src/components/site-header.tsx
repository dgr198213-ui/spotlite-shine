import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

export function SiteHeader() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-4 z-50 mx-auto w-[min(1180px,calc(100%-2rem))]">
      <div className="flex items-center justify-between rounded-full border border-border bg-card/70 px-5 py-3 backdrop-blur-xl shadow-card">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
<<<<<<< Updated upstream
          <img src={logo} alt="Spot&Shows" className="h-12 w-auto md:h-14" />
          <span className="sr-only">Spot&Shows</span>
=======
          <img src={logo} alt="Escénika" className="h-14 md:h-16 w-auto object-contain mix-blend-multiply" />
          <span className="sr-only">Escénika</span>
>>>>>>> Stashed changes
        </Link>
        <nav className="hidden items-center gap-7 text-sm md:flex">
          <Link
            to="/explorar"
            className="text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
          >
            Artistas
          </Link>
          <Link
            to="/eventos"
            className="text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
          >
            Eventos
          </Link>
          <Link
            to="/precios"
            className="text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
          >
            Planes
          </Link>
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
