"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// 🎭 Escénika Brand — Sidebar Footer Component
// Container for sidebar footer content with Escénika styling

interface SidebarFooterProps extends React.ComponentProps<"div"> {}

export const SidebarFooter = React.forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar="footer"
        className={cn(
          // Escénika styling - subtle gradient footer
          "flex flex-col gap-2 p-3 mt-auto border-t border-sidebar-border/50",
          "bg-gradient-to-t from-[oklch(0.24_0.08_300)] to-transparent",
          className
        )}
        {...props}
      />
    );
  }
);
SidebarFooter.displayName = "SidebarFooter";