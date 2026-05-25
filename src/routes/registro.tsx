import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SiteHeader } from "@/components/site-header";
import { CheckCircle2, Mail, Lock, User, MapPin, Sparkles, Wand2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/registro")({
  head: () => ({
    meta: [
      { title: "Crear cuenta — Spot&Shows" },
      { name: "description", content: "Crea tu perfil de artista en Spot&Shows en menos de 5 minutos. Plan gratuito disponible." },
    ],
  }),
  component: SignupPage,
});

const CATS = [
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

const PERKS = [
  "Perfil profesional con galería de fotos y vídeo",
  "Sin permanencia ni comisiones por contrato",
  "Aparece en el explorador de talento",
  "Cancela o mejora a Spotlight cuando quieras",
];

function SignupPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [busy, setBusy] = useState(false);
  const [magic, setMagic] = useState(false);

  const [form, setForm] = useState({
    name: "",
    category: "",
    city: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (!loading && user) navigate({ to: "/panel" });
  }, [user, loading, navigate]);

  const next = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return toast.error("Dinos tu nombre artístico");
    if (!form.category) return toast.error("Elige tu disciplina principal");
    setStep(2);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);

    if (magic) {
      const { error } = await supabase.auth.signInWithOtp({
        email: form.email,
        options: {
          emailRedirectTo: `${window.location.origin}/panel`,
          data: { display_name: form.name, category: form.category, city: form.city },
        },
      });
      setBusy(false);
      if (error) return toast.error(error.message);
      toast.success("Te hemos enviado un enlace mágico", { description: "Revisa tu bandeja de entrada." });
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
        data: { display_name: form.name, category: form.category, city: form.city },
      },
    });
    if (error) {
      setBusy(false);
      return toast.error(error.message);
    }

    // Si el trigger creó el perfil, completamos categoría/ciudad ahora
    if (data.user) {
      await supabase
        .from("profiles")
        .update({ category: form.category as never, city: form.city || null, display_name: form.name })
        .eq("id", data.user.id);
    }

    setBusy(false);
    toast.success("¡Cuenta creada!", { description: "Vamos a configurar tu escenario." });
    navigate({ to: "/perfil" });
  };

  return (
    <div className="min-h-dvh gradient-hero">
      <SiteHeader />
      <main className="mx-auto grid max-w-6xl gap-12 px-6 pt-12 pb-20 md:grid-cols-[1.1fr_1fr] md:pt-20">
        {/* Columna marketing */}
        <aside className="hidden md:block">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-xs uppercase tracking-wider text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-gold" /> Plan Spark · Gratis
          </span>
          <h1 className="mt-6 font-display text-5xl leading-[1.05]">
            Tu próximo escenario,<br />
            <span className="text-gradient-gold">a un clic.</span>
          </h1>
          <p className="mt-5 max-w-md text-muted-foreground">
            Únete a la comunidad de artistas que ya están conectando con eventos en toda España. Crea tu perfil y empieza a recibir propuestas hoy.
          </p>
          <ul className="mt-8 space-y-3">
            {PERKS.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 rounded-2xl border border-gold/30 bg-card/40 p-5 text-sm">
            <p className="font-display text-base">Plan Spark incluye</p>
            <p className="mt-2 text-muted-foreground">
              4 fotos, 1 vídeo de hasta 8 segundos, biografía, ciudad y precio desde. Suficiente para empezar.
            </p>
          </div>
        </aside>

        {/* Columna formulario */}
        <section className="rounded-3xl border border-border gradient-card p-7 shadow-card md:p-10">
          {/* Stepper */}
          <div className="mb-8 flex items-center gap-3 text-xs">
            <Step n={1} active={step >= 1} label="Tu arte" />
            <div className={`h-px flex-1 ${step >= 2 ? "bg-gold" : "bg-border"}`} />
            <Step n={2} active={step >= 2} label="Tu cuenta" />
          </div>

          {step === 1 ? (
            <form onSubmit={next} className="space-y-5">
              <header>
                <h2 className="font-display text-2xl">Empecemos por ti</h2>
                <p className="mt-1 text-sm text-muted-foreground">Lo básico para que los organizadores te encuentren.</p>
              </header>

              <Field icon={User} label="Nombre artístico">
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Lucía Reverb"
                  required
                />
              </Field>

              <Field icon={Wand2} label="Disciplina principal">
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                  <SelectTrigger><SelectValue placeholder="Elige una categoría" /></SelectTrigger>
                  <SelectContent>
                    {CATS.map(([v, l]) => <SelectItem key={v} value={v}>{l}</SelectItem>)}
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

              <Button type="submit" variant="gold" size="lg" className="w-full rounded-full">
                Continuar
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                ¿Ya tienes cuenta? <Link to="/login" className="text-gold hover:underline">Acceder</Link>
              </p>
            </form>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <header className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl">Crea tu acceso</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Hola <span className="text-foreground">{form.name}</span> 👋 último paso.
                  </p>
                </div>
                <button type="button" onClick={() => setStep(1)} className="text-xs text-muted-foreground hover:text-foreground">← Atrás</button>
              </header>

              <div className="flex rounded-full border border-border bg-card/40 p-1 text-xs">
                <ToggleBtn active={!magic} onClick={() => setMagic(false)}>Email + contraseña</ToggleBtn>
                <ToggleBtn active={magic} onClick={() => setMagic(true)}>Enlace mágico</ToggleBtn>
              </div>

              <Field icon={Mail} label="Email">
                <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
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

              <Button type="submit" disabled={busy} variant="gold" size="lg" className="w-full rounded-full">
                {busy ? "Creando cuenta…" : magic ? "Enviar enlace mágico" : "Crear cuenta"}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Al continuar aceptas los términos y la política de privacidad.
              </p>
            </form>
          )}
        </section>
      </main>
    </div>
  );
}

function Step({ n, active, label }: { n: number; active: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full font-display text-xs font-bold ${
          active ? "gradient-gold text-gold-foreground shadow-gold" : "bg-card text-muted-foreground"
        }`}
      >
        {n}
      </span>
      <span className={active ? "text-foreground" : "text-muted-foreground"}>{label}</span>
    </div>
  );
}

function Field({ icon: Icon, label, children }: { icon: React.ComponentType<{ className?: string }>; label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3.5 w-3.5 text-gold" /> {label}
      </Label>
      {children}
    </div>
  );
}

function ToggleBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 rounded-full px-4 py-2 transition-colors ${
        active ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
