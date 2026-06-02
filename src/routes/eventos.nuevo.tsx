import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { addEvent } from "@/lib/events-store";
import {
  Calendar,
  Upload,
  Info,
  Clock,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { useState, useRef } from "react";

export const Route = createFileRoute("/eventos/nuevo")({
  head: () => ({
    meta: [
      { title: "Publicar evento — Escénika" },
      {
        name: "description",
        content:
          "Publica tu evento gratis durante 1 mes y conecta con artistas.",
      },
    ],
  }),
  component: NuevoEventoPage,
});

const categories = [
  "Música en vivo",
  "Teatro",
  "Magia",
  "Comedia",
  "Danza",
  "DJ / Fiesta",
  "Corporativo",
  "Boda",
  "Festival",
  "Otro",
];

function NuevoEventoPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    category: "",
    creatorName: "",
    creatorEmail: "",
  });
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("La imagen no puede superar 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!imagePreview) {
      setError("Debes subir una imagen del evento");
      return;
    }

    if (!formData.title || !formData.description || !formData.startDate || !formData.endDate) {
      setError("Por favor, completa todos los campos obligatorios");
      return;
    }

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      setError("La fecha de inicio no puede ser en el pasado");
      return;
    }

    if (end < start) {
      setError("La fecha de fin debe ser posterior a la de inicio");
      return;
    }

    setIsSubmitting(true);

    try {
      addEvent({
        title: formData.title,
        description: formData.description,
        imageUrl: imagePreview,
        startDate: formData.startDate,
        endDate: formData.endDate,
        location: formData.location,
        category: formData.category,
        creatorName: formData.creatorName || "Organizador",
        creatorEmail: formData.creatorEmail,
      });

      setSuccess(true);
      setTimeout(() => {
        navigate({ to: "/eventos" });
      }, 2000);
    } catch (err) {
      setError("Error al publicar el evento. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-dvh bg-background">
        <SiteHeader />
        <main className="mx-auto flex max-w-lg flex-col items-center justify-center px-6 py-24 text-center">
          <div className="rounded-full bg-primary/10 p-4">
            <CheckCircle2 className="h-12 w-12 text-primary" />
          </div>
          <h1 className="mt-6 font-display text-3xl">Evento publicado</h1>
          <p className="mt-3 text-muted-foreground">
            Tu evento ya está visible para todos los artistas de Escénika.
            Se eliminará automáticamente cuando termine o al cumplirse 1 mes.
          </p>
          <Button asChild variant="gold" className="mt-8">
            <Link to="/eventos">Ver todos los eventos</Link>
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-2xl px-6 py-12">
        <Link
          to="/eventos"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Volver a eventos
        </Link>

        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Nuevo evento
          </p>
          <h1 className="mt-3 font-display text-3xl tracking-tight md:text-4xl">
            Publica tu evento gratis
          </h1>
          <p className="mt-3 text-muted-foreground">
            Conecta con artistas de toda España. Tu evento será visible durante
            1 mes o hasta que termine.
          </p>
        </div>

        {/* Info banner */}
        <div className="mb-8 flex items-start gap-4 rounded-xl border border-primary/20 bg-primary/5 p-4">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div className="text-sm">
            <p className="font-medium text-foreground">Gratuito durante 1 mes</p>
            <p className="mt-1 text-muted-foreground">
              Tu evento se eliminará automáticamente cuando finalice o al cumplir
              30 días desde su publicación. Estrategia para atraer eventos que
              contraten artistas de Escénika.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Image upload */}
          <div className="space-y-3">
            <Label className="text-base">Imagen del evento *</Label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`relative cursor-pointer overflow-hidden rounded-xl border-2 border-dashed transition-all ${
                imagePreview
                  ? "border-primary"
                  : "border-border hover:border-primary/50"
              }`}
            >
              {imagePreview ? (
                <div className="relative aspect-[16/9]">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-foreground/50 opacity-0 transition-opacity hover:opacity-100">
                    <span className="rounded-full bg-background px-4 py-2 text-sm font-medium">
                      Cambiar imagen
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex aspect-[16/9] flex-col items-center justify-center p-8 text-center">
                  <Upload className="mb-4 h-10 w-10 text-muted-foreground" />
                  <p className="font-medium">Haz clic para subir una imagen</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    JPG, PNG o WebP. Máximo 5MB.
                  </p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Nombre del evento *</Label>
            <Input
              id="title"
              placeholder="ej: Festival de Verano 2025"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="h-12"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Descripción *</Label>
            <Textarea
              id="description"
              placeholder="Describe el evento, qué tipo de artista buscas, condiciones, etc."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="min-h-[120px] resize-none"
              required
            />
          </div>

          {/* Dates */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="startDate">Fecha de inicio *</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  className="h-12 pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">Fecha de fin *</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  className="h-12 pl-10"
                  required
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Ubicación</Label>
            <Input
              id="location"
              placeholder="ej: Madrid, España"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="h-12"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Categoría</Label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: cat })}
                  className={`rounded-full border px-4 py-2 text-sm transition-all ${
                    formData.category === cat
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Contact info */}
          <div className="space-y-4 rounded-xl border border-border bg-card/50 p-6">
            <h3 className="font-display text-lg">Datos de contacto</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="creatorName">Tu nombre</Label>
                <Input
                  id="creatorName"
                  placeholder="ej: Juan García"
                  value={formData.creatorName}
                  onChange={(e) =>
                    setFormData({ ...formData, creatorName: e.target.value })
                  }
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="creatorEmail">Tu email</Label>
                <Input
                  id="creatorEmail"
                  type="email"
                  placeholder="ej: juan@empresa.com"
                  value={formData.creatorEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, creatorEmail: e.target.value })
                  }
                  className="h-12"
                />
              </div>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* Expiry info */}
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 shrink-0" />
            <span>
              Tu evento se eliminará automáticamente cuando finalice o al cumplir
              30 días desde su publicación.
            </span>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            variant="gold"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Publicando..." : "Publicar evento gratis"}
          </Button>
        </form>
      </main>

      <SiteFooter />
    </div>
  );
}
