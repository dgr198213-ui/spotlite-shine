import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SiteHeader } from "@/components/site-header";
import {
  Check,
  Mail,
  Lock,
  User,
  MapPin,
  Wand2,
  Music,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/registro")({
  head: () => ({
    meta: [
      { title: "Crear cuenta — Escénika" },
      {
        name: "description",
        content:
          "Crea tu perfil de artista o promotor en Escénika. Conecta con talento o encuentra tu próximo evento.",
      },
    ],
  }),
  component: SignupPage,
});

const ARTIST_CATS = [
  ["musica", "Música"],
  ["teatro", "Teatro"],
  ["magia", "Magia"],
  ["comedia", "Comedia"],
  ["danza", "Danza"],
  ["dj", "DJ"],
  ["circo", "Circo"],
  ["arte", "Arte"],
  ["foto_video", "Foto / Vídeo"],
] as const;

const ARTIST_PERKS = [
  "Perfil profesional con foto, descripción y precio",
  "Sin permanencia ni comisiones por contrato",
  "Aparece en el explorador de talento",
  "Acceso prioritario al plan Standard cuando se abra",
];

const ORGANIZER_PERKS = [
  "Acceso a la agenda cultural de Escénika",
  "Busca y guarda artistas en favoritos",
  "Publica tus eventos y recibe solicitudes",
  "Comunícate directamente con los artistas",
];

type UserRole = "artist" | "organizer";

function SignupPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole | null>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [busy, setBusy] = useState(false);
  const [magic, setMagic] = useState(false);

  const [form, setForm] = useState({
    name: "",
    category: "",
    city: "",
    email: "",
    password: "",
    company: "",
  });

  useEffect(() => {
    if (!loading && user) navigate({ to: "/panel" });
  }, [user, loading, navigate]);

  const selectRole = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setStep(2);
  };

  const nextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "artist") {
      if (!form.name.trim()) return toast.error("Dinos tu nombre artístico");
      if (!form.category) return toast.error("Elige tu disciplina principal");
    } else {
      if (!form.company.trim()) return toast.error("Dinos el nombre de tu empresa/evento");
    }
    setStep(3);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);

    const metadata = {
      display_name: role === "artist" ? form.name : form.company,
      category: form.category || null,
      city: form.city || null,
      role,
    };

    if (magic) {
      const { error } = await supabase.auth.signInWithOtp({
        email: form.email,
        options: {
          emailRedirectTo: `${window.location.origin}/panel`,
          data: metadata,
        },
      });
      setBusy(false);
      if (error) return toast.error(error.message);
      toast.success("Te hemos enviado un enlace mágico", {
        description: "Revisa tu bandeja de entrada.",
      });
      return;
    }

    if (form.password.length < 8) {
      setBusy(false);
      return toast.error("La contraseña debe tener al menos 8 caracteres");
    }

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        emailRedirectTo: `${window.location.origin}/panel`,
        data: metadata,
      },
    });
    if (error) {
      setBusy(false);
      return toast.error(error.message);
    }

    if (data.user) {
      await supabase
        .from("profiles")
        .update({
          display_name: metadata.display_name,
          category: (form.category || null) as never,
          city: form.city || null,
          organizer_company: role === "organizer" ? form.company : null,
        } as never)
        .eq("id", data.user.id);
    }

    setBusy(false);
    toast.success("¡Cuenta creada!", { description: "Vamos a configurar tu perfil." });
    navigate({ to: "/perfil" });
  };

  return (
    <div className="min-h-dvh bg-background">
      <SiteHeader />
      <main className="mx-auto grid max-w-6xl gap-12 px-6 pt-12 pb-24 md:grid-cols-[1.1fr_1fr] md:pt-20">
        {/* Columna marketing */}
        <aside className="hidden md:block">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Escénika · Plataforma de talento
          </p>
          <h1 className="mt-6 font-display text-5xl leading-[1.1] tracking-tight">
            {role === "artist"
              ? "Tu próximo escenario,\na un clic."
              : role === "organizer"
                ? "Encuentra talento\nexcepcional."
                : "Conecta con talento\no crea tu agenda."}
          </h1>
          <p className="mt-6 max-w-md text-muted-foreground">
            {role === "artist"
              ? "Estamos lanzando Escénika. Durante la beta, los artistas se publican gratis. Nosotros somos solo intermediarios: tú cobras directamente del cliente."
              : role === "organizer"
                ? "Accede a cientos de artistas verificados, crea tu agenda cultural y conecta directamente con el talento que necesitas para tus eventos."
                : "Eres artista buscando escenarios o promotor buscando talento. Elige tu rol y empieza."}
          </p>
          <ul className="mt-10 space-y-4">
            {(role === "artist"
              ? ARTIST_PERKS
              : role === "organizer"
                ? ORGANIZER_PERKS
                : ARTIST_PERKS
            ).map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          {role === "artist" && (
            <div className="mt-12 rounded-xl border border-primary/20 bg-card p-6 text-sm">
              <p className="font-display text-lg">Tu plan Free (Beta) incluye</p>
              <p className="mt-2 text-muted-foreground">
                1 fotografía, descripción, precio orientativo, exigencias técnicas, ciudad y
                disciplina. Lo justo para empezar fuerte.
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                Próximamente · Standard 6€/mes con vídeo de hasta 8 s y promoción en redes.
              </p>
            </div>
          )}
        </aside>

        {/* Columna formulario */}
        <section className="rounded-xl border border-border bg-card p-8 shadow-card md:p-10">
          {step === 1 ? (
            <div className="space-y-6">
              <header>
                <h2 className="font-display text-2xl">¿Quién eres?</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Elige tu rol para personalizar tu experiencia.
                </p>
              </header>

              <div className="grid gap-4 md:grid-cols-2">
                <button
                  type="button"
                  onClick={() => selectRole("artist")}
                  className="group rounded-xl border-2 border-border bg-background p-6 text-left transition-all hover:border-primary"
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Music className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-display text-lg">Soy Artista</p>
                      <p className="text-xs text-muted-foreground">Busco escenarios y eventos</p>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => selectRole("organizer")}
                  className="group rounded-xl border-2 border-border bg-background p-6 text-left transition-all hover:border-primary"
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-display text-lg">Soy Promotor</p>
                      <p className="text-xs text-muted-foreground">
                        Organizo eventos y busco talento
                      </p>
                    </div>
                  </div>
                </button>
              </div>

              <p className="text-center text-sm text-muted-foreground">
                ¿Ya tienes cuenta?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Acceder
                </Link>
              </p>
            </div>
          ) : step === 2 ? (
            <form onSubmit={nextStep} className="space-y-6">
              <header className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl">Cuéntanos más</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {role === "artist"
                      ? "Lo básico para que los organizadores te encuentren."
                      : "Información sobre tu empresa o evento."}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setRole(null);
                  }}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  ← Atrás
                </button>
              </header>

              {role === "artist" ? (
                <>
                  <Field icon={User} label="Nombre artístico">
                    <Input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Lucía Reverb"
                      required
                    />
                  </Field>

                  <Field icon={Wand2} label="Disciplina principal">
                    <Select
                      value={form.category}
                      onValueChange={(v) => setForm({ ...form, category: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Elige una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {ARTIST_CATS.map(([v, l]) => (
                          <SelectItem key={v} value={v}>
                            {l}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field icon={MapPin} label="Ciudad (opcional)">
                    <Input
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      placeholder="Madrid"
                    />
                  </Field>
                </>
              ) : (
                <>
                  <Field icon={User} label="Nombre de tu empresa/evento">
                    <Input
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="Mi Sala de Conciertos"
                      required
                    />
                  </Field>

                  <Field icon={MapPin} label="Ciudad (opcional)">
                    <Input
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      placeholder="Madrid"
                    />
                  </Field>
                </>
              )}

              <Button type="submit" variant="gold" size="lg" className="w-full">
                Continuar
              </Button>
            </form>
          ) : (
            <form onSubmit={submit} className="space-y-6">
              <header className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl">Crea tu acceso</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {role === "artist"
                      ? `Hola ${form.name} — último paso.`
                      : `Hola ${form.company} — último paso.`}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  ← Atrás
                </button>
              </header>

              <div className="flex rounded-lg border border-border bg-background p-1 text-xs">
                <ToggleBtn active={!magic} onClick={() => setMagic(false)}>
                  Email + contraseña
                </ToggleBtn>
                <ToggleBtn active={magic} onClick={() => setMagic(true)}>
                  Enlace mágico
                </ToggleBtn>
              </div>

              <Field icon={Mail} label="Email">
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </Field>

              {!magic && (
                <Field icon={Lock} label="Contraseña">
                  <Input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    minLength={8}
                    required
                    placeholder="Mínimo 8 caracteres"
                  />
                </Field>
              )}

              <Button
                type="submit"
                disabled={busy}
                variant="gold"
                size="lg"
                className="w-full"
              >
                {busy ? "Creando cuenta…" : magic ? "Enviar enlace mágico" : "Crear cuenta"}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Al continuar aceptas los{" "}
                <Link to="/terminos" className="text-primary hover:underline">
                  términos
                </Link>{" "}
                y la{" "}
                <Link to="/privacidad" className="text-primary hover:underline">
                  política de privacidad
                </Link>
                .
              </p>
            </form>
          )}
        </section>
      </main>
    </div>
  );
}

function Field({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3.5 w-3.5 text-primary" /> {label}
      </Label>
      {children}
    </div>
  );
}

function ToggleBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 rounded-md px-4 py-2 transition-colors ${
        active ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
