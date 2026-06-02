import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MediaGallery } from "@/components/media-gallery";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/perfil")({
  head: () => ({ meta: [{ title: "Mi perfil — Escénika" }] }),
  component: ProfileEditPage,
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
  ["foto_video", "Foto/Vídeo"],
] as const;

function ProfileEditPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user!.id)
        .single();
      if (error) throw error;
      return data;
    },
  });

  const [form, setForm] = useState({
    display_name: "",
    category: "" as string,
    city: "",
    bio: "",
    requirements: "",
    price_from: "",
    is_published: false,
  });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (profile) {
      setForm({
        display_name: profile.display_name ?? "",
        category: profile.category ?? "",
        city: profile.city ?? "",
        bio: profile.bio ?? "",
        requirements: (profile as { requirements?: string | null }).requirements ?? "",
        price_from: profile.price_from?.toString() ?? "",
        is_published: profile.is_published ?? false,
      });
    }
  }, [profile]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setBusy(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: form.display_name,
        category: (form.category || null) as never,
        city: form.city || null,
        bio: form.bio || null,
        requirements: form.requirements || null,
        price_from: form.price_from ? Number(form.price_from) : null,
        is_published: form.is_published,
      } as never)
      .eq("id", user.id);
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Perfil guardado");
    navigate({ to: "/panel" });
  };

  return (
    <div className="min-h-dvh bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-6 pt-12 pb-24">
        <Link to="/panel" className="text-sm text-muted-foreground hover:text-foreground">
          ← Volver al panel
        </Link>
        <h1 className="mt-6 font-display text-4xl tracking-tight">Editar mi perfil</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Tu perfil público es lo que ven los organizadores. Cuídalo.
        </p>

        <form
          onSubmit={save}
          className="mt-10 space-y-6 rounded-xl border border-border bg-card p-8 shadow-card"
        >
          <div className="space-y-2">
            <Label>Nombre artístico</Label>
            <Input
              value={form.display_name}
              onChange={(e) => setForm({ ...form, display_name: e.target.value })}
              required
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Categoría</Label>
              <Select
                value={form.category}
                onValueChange={(v) => setForm({ ...form, category: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Elige una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {CATS.map(([v, l]) => (
                    <SelectItem key={v} value={v}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Ciudad</Label>
              <Input
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="Madrid"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Descripción / biografía artística</Label>
            <Textarea
              rows={5}
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              placeholder="Cuéntale al cliente quién eres, qué estilo tienes, tu trayectoria y qué te hace único…"
            />
            <p className="text-xs text-muted-foreground">
              Lo primero que leerá el organizador. Sé claro y directo.
            </p>
          </div>

          <div className="space-y-2">
            <Label>Exigencias del artista (rider técnico, hospitality, condiciones)</Label>
            <Textarea
              rows={4}
              value={form.requirements}
              onChange={(e) => setForm({ ...form, requirements: e.target.value })}
              placeholder="Ej: equipo de sonido propio incluido, necesito 2 monitores, camerino con agua, alojamiento si la actuación es a +100 km, etc."
            />
            <p className="text-xs text-muted-foreground">
              Todo lo que el cliente debe saber antes de contratarte.
            </p>
          </div>

          <div className="space-y-2">
            <Label>Precio orientativo desde (€)</Label>
            <Input
              type="number"
              min={0}
              value={form.price_from}
              onChange={(e) => setForm({ ...form, price_from: e.target.value })}
              placeholder="350"
            />
            <p className="text-xs text-muted-foreground">
              Escénika no cobra comisión: tú cobras directamente del cliente.
            </p>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border bg-background p-5">
            <div>
              <p className="font-medium">Publicar perfil</p>
              <p className="text-xs text-muted-foreground">
                Visible en el explorador para los organizadores.
              </p>
            </div>
            <Switch
              checked={form.is_published}
              onCheckedChange={(v) => setForm({ ...form, is_published: v })}
            />
          </div>

          <Button type="submit" disabled={busy} variant="gold" className="w-full">
            {busy ? "Guardando…" : "Guardar cambios"}
          </Button>
        </form>

        {user && profile && (
          <section className="mt-12 rounded-xl border border-border bg-card p-8 shadow-card">
            <MediaGallery
              userId={user.id}
              plan={(profile.plan ?? "spark") as "spark" | "spotlight" | "headliner"}
            />
          </section>
        )}
      </main>
    </div>
  );
}
