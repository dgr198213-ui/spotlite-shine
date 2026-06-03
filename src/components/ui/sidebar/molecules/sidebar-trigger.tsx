"use client";

import * as React from "react";
import { PanelLeft } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { Button } from "@/components/ui/button";
import { useSidebar } from "../atoms/sidebar-context";
import { cn } from "@/lib/utils";

// 🎭 Escénika Brand — Sidebar Trigger Component
// Primary action button to toggle sidebar visibility

interface SidebarTriggerProps extends React.ComponentProps<typeof Button> {
  asChild?: boolean;
}

export const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  SidebarTriggerProps
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn(
        // Escénika gold accent on hover
        "h-9 w-9 rounded-lg transition-all duration-200 hover:bg-sidebar-accent hover:text-gold",
        className,
      )}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeft className="h-4 w-4" />
      <span className="sr-only">Alternar Sidebar</span>
    </Button>
  );
});
SidebarTrigger.displayName = "SidebarTrigger";
