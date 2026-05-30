"use client";

import * as React from "react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// 🎭 Escénika Brand — Sidebar Separator Component
// Visual divider with Escénika styling

interface SidebarSeparatorProps extends React.ComponentProps<typeof Separator> {}

export const SidebarSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  SidebarSeparatorProps
>(({ className, ...props }, ref) => {
  return (
    <Separator
      ref={ref}
      data-sidebar="separator"
      className={cn(
        "mx-2 w-auto bg-gradient-to-r from-transparent via-sidebar-border/80 to-transparent",
        className
      )}
      {...props}
    />
  );
});
SidebarSeparator.displayName = "SidebarSeparator";