import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteHeader } from "@/components/site-header";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/registro")({
  head: () => ({
    meta: [{ title: "Crear cuenta — Spotlite" }],
  }),
  component: SignupPage,
});

function SignupPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate({ to: "/panel" });
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) return toast.error("La contraseña debe tener al menos 8 caracteres");
    setBusy(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: name },
        emailRedirectTo: `${window.location.origin}/panel`,
      },
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("¡Cuenta creada! Configurando tu escenario…");
    navigate({ to: "/panel" });
  };

  return (
    <div className="min-h-dvh gradient-hero">
      <SiteHeader />
      <div className="mx-auto flex max-w-md flex-col px-6 pt-16 pb-20">
        <div className="text-center">
          <Sparkles className="mx-auto h-8 w-8 text-gold" />
          <h1 className="mt-4 font-display text-3xl">Reclama tu escenario</h1>
          <p className="mt-2 text-sm text-muted-foreground">Crea tu perfil profesional en menos de 5 minutos.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-2xl border border-border gradient-card p-6 shadow-card">
          <div className="space-y-2">
            <Label>Nombre artístico</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Lucía Reverb" />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label>Contraseña</Label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
            <p className="text-xs text-muted-foreground">Mínimo 8 caracteres.</p>
          </div>
          <Button type="submit" disabled={busy} variant="gold" className="w-full rounded-full">
            {busy ? "Creando cuenta…" : "Crear cuenta"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          ¿Ya tienes cuenta? <Link to="/login" className="text-gold hover:underline">Acceder</Link>
        </p>
      </div>
    </div>
  );
}
