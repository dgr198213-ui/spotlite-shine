import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Lock } from "lucide-react";
import type { UserRole, SignupFormData } from "./constants";
import { Field } from "./field";
import { ToggleBtn } from "./toggle";

interface StepThreeProps {
  role: UserRole;
  form: SignupFormData;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onFormChange: (key: keyof SignupFormData, value: string) => void;
  busy: boolean;
  magic: boolean;
  onToggleMagic: (value: boolean) => void;
}

export function StepThree({
  role,
  form,
  onBack,
  onSubmit,
  onFormChange,
  busy,
  magic,
  onToggleMagic,
}: StepThreeProps) {
  const displayName = role === "artist" ? form.name : form.company;

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <header className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl">Crea tu acceso</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Hola {displayName} 👋 último paso.
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

      <div className="flex rounded-full border border-border bg-card/40 p-1 text-xs">
        <ToggleBtn active={!magic} onClick={() => onToggleMagic(false)}>
          Email + contraseña
        </ToggleBtn>
        <ToggleBtn active={magic} onClick={() => onToggleMagic(true)}>
          Enlace mágico
        </ToggleBtn>
      </div>

      <Field icon={Mail} label="Email">
        <Input
          type="email"
          value={form.email}
          onChange={(e) => onFormChange("email", e.target.value)}
          required
        />
      </Field>

      {!magic && (
        <Field icon={Lock} label="Contraseña">
          <Input
            type="password"
            value={form.password}
            onChange={(e) => onFormChange("password", e.target.value)}
            minLength={8}
            required
            placeholder="Mínimo 8 caracteres"
          />
        </Field>
      )}

      <Button
        type="submit"
        disabled={busy}
        variant="gold"
        size="lg"
        className="w-full rounded-full"
      >
        {busy ? "Creando cuenta…" : magic ? "Enviar enlace mágico" : "Crear cuenta"}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        Al continuar aceptas los{" "}
        <Link to="/terminos" className="text-gold hover:underline">
          términos
        </Link>{" "}
        y la{" "}
        <Link to="/privacidad" className="text-gold hover:underline">
          política de privacidad
        </Link>
        .
      </p>
    </form>
  );
}