import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function SiteHeader() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl tracking-tight">Escénika</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 text-sm md:flex">
          <Link
            to="/explorar"
            className="text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
          >
            Explorar
          </Link>
          <Link
            to="/precios"
            className="text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
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

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/panel">Mi panel</Link>
              </Button>
              <Button
                size="sm"
                variant="outline"
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
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">Acceder</Link>
              </Button>
              <Button asChild size="sm" variant="gold">
                <Link to="/registro">Empezar</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="flex items-center justify-center md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background px-6 py-6 md:hidden">
          <nav className="flex flex-col gap-4">
            <Link
              to="/explorar"
              className="text-lg text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Explorar
            </Link>
            <Link
              to="/precios"
              className="text-lg text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Precios
            </Link>
            <a
              href="/#como-funciona"
              className="text-lg text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Cómo funciona
            </a>
            <div className="mt-4 flex flex-col gap-2">
              {user ? (
                <>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/panel" onClick={() => setMobileMenuOpen(false)}>
                      Mi panel
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={async () => {
                      await supabase.auth.signOut();
                      setMobileMenuOpen(false);
                      navigate({ to: "/" });
                    }}
                  >
                    Salir
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="ghost" className="w-full">
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      Acceder
                    </Link>
                  </Button>
                  <Button asChild variant="gold" className="w-full">
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
