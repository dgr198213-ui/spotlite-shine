import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { User, Wand2, MapPin } from "lucide-react";
import type { UserRole, SignupFormData } from "./constants";
import { Field } from "./field";

interface StepTwoProps {
  role: UserRole;
  form: SignupFormData;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onFormChange: (key: keyof SignupFormData, value: string) => void;
}

export function StepTwo({ role, form, onBack, onSubmit, onFormChange }: StepTwoProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <header className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl">Cuéntanos más</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Lo básico para que los organizadores te encuentren.
          </p>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          ← Atrás
        </button>
      </header>

      <Field icon={User} label="Nombre artístico">
        <Input
          value={form.name}
          onChange={(e) => onFormChange("name", e.target.value)}
          placeholder="Lucía Reverb"
          required
        />
      </Field>

      <Field icon={Wand2} label="Disciplina principal">
        <Select value={form.category} onValueChange={(v) => onFormChange("category", v)}>
          <SelectTrigger>
            <SelectValue placeholder="Elige una categoría" />
          </SelectTrigger>
          <SelectContent>
            {[
              ["musica", "Música"],
              ["teatro", "Teatro"],
              ["magia", "Magia"],
              ["comedia", "Comedia"],
              ["danza", "Danza"],
              ["dj", "DJ"],
              ["circo", "Circo"],
              ["arte", "Arte"],
              ["foto_video", "Foto / Vídeo"],
            ].map(([v, l]) => (
              <SelectItem key={v} value={v}>
                {l}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field icon={MapPin} label="Ciudad (opcional)">
        <Input
          value={form.city}
          onChange={(e) => onFormChange("city", e.target.value)}
          placeholder="Madrid"
        />
      </Field>

      <Button type="submit" variant="gold" size="lg" className="w-full rounded-full">
        Continuar
      </Button>
    </form>
  );
}