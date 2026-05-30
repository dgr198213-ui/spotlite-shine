"use client";

import * as React from "react";
import { useSidebar } from "../atoms/sidebar-context";
import { cn } from "@/lib/utils";

// 🎭 Escénika Brand — Sidebar Rail Component
// Invisible resize handle for sidebar on desktop

interface SidebarRailProps extends React.ComponentProps<"button"> {}

export const SidebarRail = React.forwardRef<HTMLButtonElement, SidebarRailProps>(
  ({ className, ...props }, ref) => {
    const { toggleSidebar } = useSidebar();

    return (
      <button
        ref={ref}
        data-sidebar="rail"
        aria-label="Alternar Sidebar"
        tabIndex={-1}
        onClick={toggleSidebar}
        title="Alternar Sidebar"
        className={cn(
          // Escénika styling with gold hover accent
          "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear cursor-ew-resize",
          "after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-gold/40",
          "group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
          "group-data-[collapsible=offcanvas]:translate-x-0",
          "group-data-[collapsible=offcanvas]:after:left-full",
          "group-data-[collapsible=offcanvas]:hover:bg-sidebar-accent",
          "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
          "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
          className
        )}
        {...props}
      />
    );
  }
);
SidebarRail.displayName = "SidebarRail";