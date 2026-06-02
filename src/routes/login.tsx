import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiteHeader } from "@/components/site-header";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ title: "Acceder — Escénika" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate({ to: "/panel" });
  }, [user, loading, navigate]);

  const handlePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("¡Bienvenido de vuelta!");
    navigate({ to: "/panel" });
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return toast.error("Introduce tu email");
    setBusy(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/panel` },
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Te hemos enviado un enlace mágico a tu correo");
  };

  return (
    <div className="min-h-dvh gradient-hero">
      <SiteHeader />
      <div className="mx-auto flex max-w-md flex-col px-6 pt-16 pb-20">
        <div className="text-center">
          <Sparkles className="mx-auto h-8 w-8 text-gold" />
          <h1 className="mt-4 font-display text-3xl">Bienvenido de vuelta</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Accede para gestionar tu perfil de artista o tus eventos publicados.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-border gradient-card p-6 shadow-card">
          <Tabs defaultValue="password">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="password">Contraseña</TabsTrigger>
              <TabsTrigger value="magic">Enlace mágico</TabsTrigger>
            </TabsList>

            <TabsContent value="password">
              <form onSubmit={handlePassword} className="mt-4 space-y-4">
                <Field label="Email" type="email" value={email} onChange={setEmail} required />
                <Field
                  label="Contraseña"
                  type="password"
                  value={password}
                  onChange={setPassword}
                  required
                />
                <Button
                  type="submit"
                  disabled={busy}
                  variant="gold"
                  className="w-full rounded-full"
                >
                  {busy ? "Accediendo…" : "Acceder"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="magic">
              <form onSubmit={handleMagicLink} className="mt-4 space-y-4">
                <Field label="Email" type="email" value={email} onChange={setEmail} required />
                <p className="text-xs text-muted-foreground">
                  Te enviamos un enlace para entrar sin contraseña.
                </p>
                <Button
                  type="submit"
                  disabled={busy}
                  variant="gold"
                  className="w-full rounded-full"
                >
                  {busy ? "Enviando…" : "Enviar enlace mágico"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          ¿Aún no tienes cuenta?{" "}
          <Link to="/registro" className="text-gold hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  required,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </div>
  );
}
