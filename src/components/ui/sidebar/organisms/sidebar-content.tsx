"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// 🎭 Escénika Brand — Sidebar Content Component
// Scrollable content area with Escénika styling

interface SidebarContentProps extends React.ComponentProps<"div"> {}

export const SidebarContent = React.forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar="content"
        className={cn(
          // Escénika styled scrollable area
          "flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overflow-x-hidden",
          "scrollbar-thin scrollbar-thumb-sidebar-border scrollbar-track-transparent",
          "group-data-[collapsible=icon]:overflow-hidden",
          className,
        )}
        {...props}
      />
    );
  },
);
SidebarContent.displayName = "SidebarContent";
