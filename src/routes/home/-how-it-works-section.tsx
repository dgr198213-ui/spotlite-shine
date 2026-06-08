// How it works section component
import { howItWorksSteps } from "./steps-data";

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-center font-display text-4xl md:text-5xl">Cómo brillar en TUESDI</h2>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {howItWorksSteps.map((step) => (
          <div
            key={step.n}
            className="rounded-2xl border border-border gradient-card p-7 shadow-card transition-transform hover:-translate-y-1"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-gold font-display text-xl font-bold text-gold-foreground shadow-gold">
              {step.n}
            </div>
            <h3 className="mt-5 font-display text-xl">{step.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
