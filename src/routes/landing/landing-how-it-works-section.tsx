// Landing page how it works section
import { steps } from "./landing-data";

export function LandingHowItWorksSection() {
  return (
    <section className="bg-card/40" id="como-funciona">
      <div className="mx-auto max-w-[1180px] px-6 py-20">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-gold">Cómo funciona</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">
            Tres pasos para el<br />evento perfecto
          </h2>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.n} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full gradient-gold font-display text-2xl font-bold text-gold-foreground shadow-gold">
                {step.n}
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}