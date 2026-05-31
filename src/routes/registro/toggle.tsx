import type { ReactNode } from "react";

interface ToggleBtnProps {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}

export function ToggleBtn({ active, onClick, children }: ToggleBtnProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 rounded-full px-4 py-2 text-xs transition-colors ${
        active
          ? "bg-foreground text-background"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}