import { Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import logo from "@/assets/logo.png";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <img src={logo} alt="Spot&Shows" className="h-10 w-auto" />
            <p className="mt-3 text-sm text-muted-foreground">
              La plataforma donde artistas encuentran su público y eventos encuentran talento
              excepcional.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <Mail className="h-3.5 w-3.5" />
              <a href="mailto:hola@spotandshows.com" className="hover:text-foreground">
                hola@spotandshows.com
              </a>
            </div>
          </div>
          <FooterCol
            title="Artistas"
            items={[
              { label: "Crear perfil", to: "/registro" },
              { label: "Precios", to: "/precios" },
              { label: "Explorar", to: "/explorar" },
            ]}
          />
          <FooterCol
            title="Eventos"
            items={[
              { label: "Buscar artistas", to: "/explorar" },
              { label: "Cómo contratar", to: "/precios" },
            ]}
          />
          <FooterCol
            title="Legal"
            items={[
              { label: "Términos", to: "/terminos" },
              { label: "Privacidad", to: "/privacidad" },
              { label: "Cookies", to: "/cookies" },
              { label: "Aviso Legal", to: "/aviso-legal" },
            ]}
          />
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
          <span>© {new Date().getFullYear()} Spot&Shows. Hecho con ♥ para artistas de España.</span>
          <span>Versión 2.0</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { label: string; to: string }[] }) {
  return (
    <div>
      <h4 className="font-display text-sm font-semibold">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {items.map((it) => (
          <li key={it.label}>
            <Link to={it.to} className="transition-colors hover:text-foreground">
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
