// Video showcase section component
import { Sparkles as SparklesIcon } from "lucide-react";

const showCaseVideos = ["/showcase-1-compressed.mp4", "/showcase-2-compressed.mp4"] as const;

export function ShowCaseSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-xs uppercase tracking-wider text-muted-foreground backdrop-blur">
          <SparklesIcon className="h-3.5 w-3.5 text-gold" /> En directo
        </span>
        <h2 className="mt-5 font-display text-4xl md:text-5xl">
          Así se ven los escenarios en TUESDI
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Una muestra del talento que brilla en nuestra comunidad. Con el plan TUESDI Standard o
          Pro, podrás mostrar tus mejores vídeos directamente en tu perfil.
        </p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {showCaseVideos.map((src) => (
          <div
            key={src}
            className="group relative overflow-hidden rounded-2xl border border-border gradient-card shadow-card"
          >
            <video
              src={src}
              autoPlay
              loop
              muted
              playsInline
              controls
              className="aspect-video h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
