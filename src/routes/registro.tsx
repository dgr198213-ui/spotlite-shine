import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { SiteHeader } from "@/components/site-header";
import {
  DEFAULT_FORM,
  type SignupFormData,
  type SignupStep,
  type UserRole,
} from "./constants";
import { StepOne, MarketingSidebar } from "./step-one";
import { StepTwo } from "./step-two";
import { StepThree } from "./step-three";

export const Route = createFileRoute("/registro")({
  head: () => ({
    meta: [
      { title: "Crear cuenta — Escénika" },
      {
        name: "description",
        content:
          "Crea tu perfil de artista o promotor en Escénika. Conecta con talento o encuentra tu próximo evento.",
      },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState<UserRole | null>(null);
  const [step, setStep] = useState<SignupStep>(1);
  const [form, setForm] = useState<SignupFormData>(DEFAULT_FORM);
  const [busy, setBusy] = useState(false);
  const [magic, setMagic] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate({ to: "/panel" });
  }, [user, loading, navigate]);

  const selectRole = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleFormChange = (key: keyof SignupFormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleBack = () => {
    setStep(1);
    setRole(null);
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "artist") {
      if (!form.name.trim()) return toast.error("Dinos tu nombre artístico");
      if (!form.category) return toast.error("Elige tu disciplina principal");
    } else {
      if (!form.company.trim()) return toast.error("Dinos el nombre de tu empresa/evento");
    }
    setStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) return;
    setBusy(true);

    const metadata = {
      display_name: role === "artist" ? form.name : form.company,
      category: form.category || null,
      city: form.city || null,
      role,
    };

    if (magic) {
      const { error } = await supabase.auth.signInWithOtp({
        email: form.email,
        options: {
          emailRedirectTo: `${window.location.origin}/panel`,
          data: metadata,
        },
      });
      setBusy(false);
      if (error) return toast.error(error.message);
      toast.success("Te hemos enviado un enlace mágico", {
        description: "Revisa tu bandeja de entrada.",
      });
      return;
    }

    if (form.password.length < 8) {
      setBusy(false);
      return toast.error("La contraseña debe tener al menos 8 caracteres");
    }

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        emailRedirectTo: `${window.location.origin}/panel`,
        data: metadata,
      },
    });

    if (error) {
      setBusy(false);
      return toast.error(error.message);
    }

    if (data.user) {
      await supabase
        .from("profiles")
        .update({
          display_name: metadata.display_name,
          category: form.category || null,
          city: form.city || null,
          organizer_company: role === "organizer" ? form.company : null,
        } as never)
        .eq("id", data.user.id);
    }

    setBusy(false);
    toast.success("¡Cuenta creada!", { description: "Vamos a configurar tu perfil." });
    navigate({ to: "/perfil" });
  };

  return (
    <div className="min-h-dvh gradient-hero">
      <SiteHeader />
      <main className="mx-auto grid max-w-6xl gap-12 px-6 pt-12 pb-20 md:grid-cols-[1.1fr_1fr] md:pt-20">
        {/* Columna marketing */}
        <aside className="hidden md:block">
          <MarketingSidebar role={role} />
        </aside>

        {/* Columna formulario */}
        <section className="rounded-3xl border border-border gradient-card p-7 shadow-card md:p-10">
          {step === 1 && <StepOne role={role} onSelectRole={selectRole} />}

          {step === 2 && role && (
            <StepTwo
              role={role}
              form={form}
              onBack={handleBack}
              onSubmit={handleNextStep}
              onFormChange={handleFormChange}
            />
          )}

          {step === 3 && role && (
            <StepThree
              role={role}
              form={form}
              onBack={() => setStep(2)}
              onSubmit={handleSubmit}
              onFormChange={handleFormChange}
              busy={busy}
              magic={magic}
              onToggleMagic={setMagic}
            />
          )}
        </section>
      </main>
    </div>
  );
}