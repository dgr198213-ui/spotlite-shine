import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function SiteHeader() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-4 z-50 mx-auto w-[min(1180px,calc(100%-2rem))]">
      <div className="flex items-center justify-between rounded-full border border-border/40 bg-gradient-to-br from-card/60 to-card/40 px-5 py-3 backdrop-blur-xl shadow-lg hover:shadow-xl transition-shadow">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
          <img src={logo} alt="Spot&Shows" className="h-12 w-auto md:h-14" />
          <span className="sr-only">Spot&Shows</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm md:flex">
          <Link
            to="/explorar"
            className="text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: "text-foreground font-semibold" }}
          >
            Explorar
          </Link>
          <Link
            to="/precios"
            className="text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: "text-foreground font-semibold" }}
          >
            Precios
          </Link>
          <a
            href="/#como-funciona"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Cómo funciona
          </a>
        </nav>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-muted-foreground hover:text-foreground"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <>
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
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="rounded-full">
                <Link to="/login">Acceder</Link>
              </Button>
              <Button asChild size="sm" variant="gold" className="rounded-full">
                <Link to="/registro">Empezar</Link>
              </Button>
            </>
          )}
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl border border-border/40 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-xl shadow-lg md:hidden">
          <nav className="flex flex-col gap-4 p-4">
            <Link
              to="/explorar"
              className="text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Explorar
            </Link>
            <Link
              to="/precios"
              className="text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Precios
            </Link>
            <a
              href="/#como-funciona"
              className="text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Cómo funciona
            </a>
            <div className="border-t border-border pt-4 flex flex-col gap-2">
              {user ? (
                <>
                  <Button asChild variant="ghost" size="sm" className="rounded-full justify-start">
                    <Link to="/panel" onClick={() => setMobileMenuOpen(false)}>
                      Mi panel
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full"
                    onClick={async () => {
                      await supabase.auth.signOut();
                      navigate({ to: "/" });
                      setMobileMenuOpen(false);
                    }}
                  >
                    Salir
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="ghost" size="sm" className="rounded-full justify-start">
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      Acceder
                    </Link>
                  </Button>
                  <Button asChild size="sm" variant="gold" className="rounded-full">
                    <Link to="/registro" onClick={() => setMobileMenuOpen(false)}>
                      Empezar
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
