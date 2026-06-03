"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// 🎭 Escénika Brand — Sidebar Input Component
// Search input styled with Escénika theme

interface SidebarInputProps extends React.ComponentProps<typeof Input> {}

export const SidebarInput = React.forwardRef<React.ElementRef<typeof Input>, SidebarInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        data-sidebar="input"
        className={cn(
          // Escénika styled input with gold focus ring
          "h-9 w-full bg-background/50 backdrop-blur-sm shadow-none",
          "border-sidebar-border/50 focus:border-gold/50",
          "focus-visible:ring-2 focus-visible:ring-sidebar-ring focus-visible:ring-offset-0",
          "placeholder:text-muted-foreground/60",
          className,
        )}
        {...props}
      />
    );
  },
);
SidebarInput.displayName = "SidebarInput";
