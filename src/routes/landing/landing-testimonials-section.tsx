// Landing page testimonials section
import { testimonials } from "./landing-data";

export function LandingTestimonialsSection() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 py-20">
      <div className="text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-gold">Lo dicen los artistas</span>
        <h2 className="mt-4 font-display text-4xl md:text-5xl">
          Historias reales de<br />artistas que triunfan
        </h2>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {testimonials.map((t) => (
          <div key={t.name} className="rounded-xl border border-border bg-card/70 p-7">
            <p className="italic leading-relaxed text-foreground">"{t.text}"</p>
            <div className="mt-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold to-secondary font-bold text-gold-foreground">
                {t.initials}
              </div>
              <div>
                <div className="font-semibold text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}