"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// 🎭 Escénika Brand — Sidebar Header Component
// Container for sidebar header content with Escénika styling

interface SidebarHeaderProps extends React.ComponentProps<"div"> {}

export const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar="header"
        className={cn(
          // Escénika styling - gold accent on headers
          "flex flex-col gap-2 p-3 border-b border-sidebar-border/50",
          "bg-gradient-to-b from-[oklch(0.24_0.08_300)] to-transparent",
          className,
        )}
        {...props}
      />
    );
  },
);
SidebarHeader.displayName = "SidebarHeader";
