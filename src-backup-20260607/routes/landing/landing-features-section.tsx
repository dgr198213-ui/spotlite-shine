// Landing page features section
import { features } from "./landing-data";

export function LandingFeaturesSection() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 py-20" id="features">
      <div className="text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-gold">¿Por qué Escénika?</span>
        <h2 className="mt-4 font-display text-4xl md:text-5xl">
          La plataforma que los<br />artistas merecían
        </h2>
        <p className="mx-auto mt-4 max-w-[520px] text-muted-foreground">
          Todo lo que necesitas para conectar con tu audiencia y mostrar tu talento, en un solo lugar.
        </p>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <div
              key={f.title}
              className="rounded-xl border border-border bg-card/70 p-8 transition-all hover:-translate-y-1 hover:border-gold/40"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gold/15 text-2xl">
                <Icon className="h-6 w-6 text-gold" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}