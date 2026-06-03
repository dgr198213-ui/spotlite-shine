"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// 🎭 Escénika Brand — Sidebar Group Component
// Group container with Escénika styling

interface SidebarGroupProps extends React.ComponentProps<"div"> {}

export const SidebarGroup = React.forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar="group"
        className={cn(
          // Escénika styled group
          "relative flex w-full min-w-0 flex-col p-2 rounded-lg",
          "hover:bg-sidebar-accent/30 transition-colors duration-200",
          className,
        )}
        {...props}
      />
    );
  },
);
SidebarGroup.displayName = "SidebarGroup";
