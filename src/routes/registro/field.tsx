import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";

interface FieldProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: ReactNode;
}

export function Field({ icon: Icon, label, children }: FieldProps) {
  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3.5 w-3.5 text-gold" /> {label}
      </Label>
      {children}
    </div>
  );
}