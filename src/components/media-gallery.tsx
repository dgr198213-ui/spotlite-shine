import { useRef, useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ImagePlus, Video, Trash2, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

type Plan = "spark" | "spotlight" | "headliner";

// Optimized image sizes for responsive images
const IMAGE_SIZES = [400, 800, 1200];

// Generate srcSet for responsive images
function generateSrcSet(url: string): string {
  return IMAGE_SIZES.map((size) => `${url}?width=${size} ${size}w`).join(", ");
}

// Generate blur placeholder as base64 (tiny 10px version)
function generateBlurPlaceholder(url: string): string {
  return `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k=`;

const LIMITS: Record<Plan, { videos: number; images: number; videoSeconds: number }> = {
  spark: { videos: 0, images: 1, videoSeconds: 0 },
  spotlight: { videos: 1, images: 6, videoSeconds: 8 },
  headliner: { videos: 100, images: 100, videoSeconds: 600 },
};

interface Props {
  userId: string;
  plan: Plan;
}

export function MediaGallery({ userId, plan }: Props) {
  const qc = useQueryClient();
  const limits = LIMITS[plan];
  const imgInput = useRef<HTMLInputElement>(null);
  const vidInput = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState<"image" | "video" | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const { data: media = [] } = useQuery({
    queryKey: ["media", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("media")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const images = media.filter((m) => m.type === "image");
  const videos = media.filter((m) => m.type === "video");

  const probeVideoDuration = (file: File) =>
    new Promise<number>((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const v = document.createElement("video");
      v.preload = "metadata";
      v.onloadedmetadata = () => {
        URL.revokeObjectURL(url);
        resolve(v.duration);
      };
      v.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("No se puede leer el vídeo"));
      };
      v.src = url;
    });

  const handleFile = async (file: File, type: "image" | "video") => {
    if (type === "image" && images.length >= limits.images) {
      return toast.error(`Tu plan permite ${limits.images} imágenes`);
    }
    if (type === "video" && videos.length >= limits.videos) {
      return toast.error(`Tu plan permite ${limits.videos} vídeo(s)`);
    }
    if (file.size > 50 * 1024 * 1024) {
      return toast.error("El archivo no puede superar 50 MB");
    }

    setUploading(type);
    try {
      let duration: number | null = null;
      if (type === "video") {
        duration = await probeVideoDuration(file);
        if (duration > limits.videoSeconds) {
          throw new Error(
            `Tu plan permite vídeos de hasta ${limits.videoSeconds} s. Este dura ${duration.toFixed(1)} s.`,
          );
        }
      }

      const ext = file.name.split(".").pop() ?? "bin";
      const path = `${userId}/${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage.from("artist-media").upload(path, file, {
        contentType: file.type,
        upsert: false,
      });
      if (upErr) throw upErr;

      const { data: pub } = supabase.storage.from("artist-media").getPublicUrl(path);

      const { error: insErr } = await supabase.from("media").insert({
        user_id: userId,
        type,
        url: pub.publicUrl,
        storage_path: path,
        duration_seconds: duration,
        position: media.length,
      });
      if (insErr) {
        await supabase.storage.from("artist-media").remove([path]);
        throw insErr;
      }

      toast.success(type === "video" ? "Vídeo subido" : "Imagen subida");
      qc.invalidateQueries({ queryKey: ["media", userId] });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al subir");
    } finally {
      setUploading(null);
      if (imgInput.current) imgInput.current.value = "";
      if (vidInput.current) vidInput.current.value = "";
    }
  };

  const remove = async (id: string, path: string | null) => {
    if (path) await supabase.storage.from("artist-media").remove([path]);
    const { error } = await supabase.from("media").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Eliminado");
    qc.invalidateQueries({ queryKey: ["media", userId] });
  };

  const isBeta = plan === "spark";

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl">Tu fotografía</h2>
          <p className="text-sm text-muted-foreground">
            {isBeta
              ? `Spot&Shows Free (Beta) · 1 imagen de presentación`
              : `${limits.images} imágenes · ${limits.videos} vídeo(s) ≤ ${limits.videoSeconds}s`}
          </p>
        </div>
        <div className="flex gap-2">
          <input
            ref={imgInput}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0], "image")}
          />
          <input
            ref={vidInput}
            type="file"
            accept="video/mp4,video/webm,video/quicktime"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0], "video")}
          />
          <Button
            type="button"
            variant="gold"
            size="sm"
            className="rounded-full"
            disabled={uploading !== null || images.length >= limits.images}
            onClick={() => imgInput.current?.click()}
          >
            {uploading === "image" ? (
              <Loader2 className="mr-1 h-4 w-4 animate-spin" />
            ) : (
              <ImagePlus className="mr-1 h-4 w-4" />
            )}
            {images.length >= limits.images
              ? "Imagen subida"
              : `Subir imagen (${images.length}/${limits.images})`}
          </Button>
          {!isBeta && limits.videos > 0 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full"
              disabled={uploading !== null || videos.length >= limits.videos}
              onClick={() => vidInput.current?.click()}
            >
              {uploading === "video" ? (
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
              ) : (
                <Video className="mr-1 h-4 w-4" />
              )}
              Vídeo ({videos.length}/{limits.videos})
            </Button>
          )}
        </div>
      </header>

      {isBeta && (
        <div className="flex items-start gap-2 rounded-xl border border-gold/30 bg-card/40 p-3 text-xs text-muted-foreground">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
          <span>
            Estás en la <strong className="text-foreground">versión Beta gratuita</strong>: 1
            fotografía + descripción + precio + exigencias. Los vídeos llegarán muy pronto con el
            plan{" "}
            <a href="/precios" className="text-gold hover:underline">
              Spot&Shows Standard (6€/mes)
            </a>
            .
          </span>
        </div>
      )}

      {media.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          Sin medios aún. Sube una foto o un vídeo corto para que tu perfil destaque.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {media.map((m) => (
            <div
              key={m.id}
              className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-card"
            >
              {m.type === "image" ? (
                <div className="relative h-full w-full overflow-hidden">
                  {/* Blur placeholder shown while loading */}
                  {!loadedImages.has(m.id) && (
                    <div
                      className="absolute inset-0 bg-muted animate-pulse"
                      style={{
                        backgroundImage: `url(${generateBlurPlaceholder(m.url)})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(10px)',
                        transform: 'scale(1.1)'
                      }}
                    />
                  )}
                  <img
                    src={m.url}
                    srcSet={generateSrcSet(m.url)}
                    sizes="(max-width: 768px) 50vw, 33vw"
                    alt=""
                    loading="lazy"
                    className={`h-full w-full object-cover transition-opacity duration-300 ${loadedImages.has(m.id) ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setLoadedImages(prev => new Set(prev).add(m.id))}
                  />
                </div>
              ) : (
                <video
                  src={m.url}
                  className="h-full w-full object-cover"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={m.thumbnail_url || undefined}
                />
              )}
              {m.type === "video" && (
                <span className="absolute left-2 top-2 rounded-full bg-background/80 px-2 py-0.5 text-[10px] uppercase tracking-wider text-gold">
                  {m.duration_seconds ? `${Number(m.duration_seconds).toFixed(1)}s` : "Vídeo"}
                </span>
              )}
              <button
                type="button"
                onClick={() => remove(m.id, m.storage_path)}
                className="absolute right-2 top-2 rounded-full bg-background/80 p-1.5 text-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
                aria-label="Eliminar"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
