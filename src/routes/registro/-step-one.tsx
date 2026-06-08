import { Link } from "@tanstack/react-router";
import { Music, Calendar, CheckCircle2, Sparkles } from "lucide-react";
import type { UserRole } from "./constants";
import { ARTIST_PERKS, ORGANIZER_PERKS } from "./constants";

interface StepOneProps {
  role: UserRole | null;
  onSelectRole: (role: UserRole) => void;
}

export function StepOne({ role, onSelectRole }: StepOneProps) {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="font-display text-2xl">¿Quién eres?</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Elige tu rol para personalizar tu experiencia.
        </p>
      </header>

      <div className="grid gap-3">
        <button
          type="button"
          onClick={() => onSelectRole("artist")}
          className="group rounded-2xl border-2 border-gold bg-card/60 p-8 text-left transition-all hover:bg-card shadow-glow"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-gold/20 p-4">
              <Music className="h-8 w-8 text-gold" />
            </div>
            <div>
              <p className="font-display text-2xl">Soy Artista</p>
              <p className="text-sm text-muted-foreground">
                Crea tu perfil profesional, sube fotos y vídeos, y encuentra tu próximo escenario.
              </p>
            </div>
          </div>
        </button>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        ¿Ya tienes cuenta?{" "}
        <Link to="/login" className="text-gold hover:underline">
          Acceder
        </Link>
      </p>
    </div>
  );
}

// ─── Marketing Sidebar ───────────────────────────────────────────────────────

interface MarketingSidebarProps {
  role: UserRole | null;
}

export function MarketingSidebar({ role }: MarketingSidebarProps) {
  const perks = role === "organizer" ? ORGANIZER_PERKS : ARTIST_PERKS;
  const isArtist = role === "artist";

  return (
    <>
      <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-card/50 px-4 py-1.5 text-xs uppercase tracking-wider text-gold backdrop-blur">
        <Sparkles className="h-3.5 w-3.5" /> TUESDI · Plataforma de talento
      </span>

      <h1 className="mt-6 font-display text-5xl leading-[1.05]">
        Tu próximo escenario,
        <br />a un clic.
      </h1>

      <p className="mt-5 max-w-md text-muted-foreground">
        Estamos lanzando TUESDI. Durante la beta, los artistas se publican gratis. Nosotros somos
        solo intermediarios: tú cobras directamente del cliente.
      </p>

      <ul className="mt-8 space-y-3">
        {perks.map((p) => (
          <li key={p} className="flex items-start gap-3 text-sm">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
            <span>{p}</span>
          </li>
        ))}
      </ul>

      {isArtist && (
        <div className="mt-10 rounded-2xl border border-gold/30 bg-card/40 p-5 text-sm">
          <p className="font-display text-base">Tu plan Free (Beta) incluye</p>
          <p className="mt-2 text-muted-foreground">
            1 fotografía, descripción, precio orientativo, exigencias técnicas, ciudad y disciplina.
            Lo justo para empezar fuerte.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            Próximamente · Standard 6€/mes con vídeo de hasta 8 s y promoción en redes.
          </p>
        </div>
      )}
    </>
  );
}
