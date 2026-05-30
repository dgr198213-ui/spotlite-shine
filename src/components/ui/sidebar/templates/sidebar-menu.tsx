"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useSidebar } from "../atoms/sidebar-context";
import { sidebarMenuButtonVariants } from "../atoms/sidebar-variants";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

// 🎭 Escénika Brand — Sidebar Menu Item Component
interface SidebarMenuItemProps extends React.ComponentProps<"li"> {}

export const SidebarMenuItem = React.forwardRef<HTMLLIElement, SidebarMenuItemProps>(
  ({ className, ...props }, ref) => (
    <li
      ref={ref}
      data-sidebar="menu-item"
      className={cn("group/menu-item relative list-none", className)}
      {...props}
    />
  )
);
SidebarMenuItem.displayName = "SidebarMenuItem";

// 🎭 Escénika Brand — Sidebar Menu Button Component
interface SidebarMenuButtonProps extends React.ComponentProps<"button"> {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
}

export const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps & VariantProps<typeof sidebarMenuButtonVariants>
>(
  (
    {
      asChild = false,
      isActive = false,
      variant = "default",
      size = "default",
      tooltip,
      className,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const { isMobile, state } = useSidebar();

    const button = (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        // Escénika gold ring for active/hover states
        className={cn(
          sidebarMenuButtonVariants({ variant, size }),
          "data-[active=true]:bg-gold/20 data-[active=true]:text-gold",
          className
        )}
        {...props}
      />
    );

    if (!tooltip) return button;

    if (typeof tooltip === "string") {
      tooltip = { children: tooltip };
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
          hidden={state !== "collapsed" || isMobile}
          {...tooltip}
        />
      </Tooltip>
    );
  }
);
SidebarMenuButton.displayName = "SidebarMenuButton";

// 🎭 Escénika Brand — Sidebar Menu Badge Component
interface SidebarMenuBadgeProps extends React.ComponentProps<"div"> {}

export const SidebarMenuBadge = React.forwardRef<HTMLDivElement, SidebarMenuBadgeProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-sidebar="menu-badge"
      className={cn(
        // Escénika gold badge styling
        "pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums",
        "bg-gold/20 text-gold border border-gold/30",
        className
      )}
      {...props}
    />
  )
);
SidebarMenuBadge.displayName = "SidebarMenuBadge";

// 🎭 Escénika Brand — Sidebar Menu Sub Component
interface SidebarMenuSubProps extends React.ComponentProps<"ul"> {}

export const SidebarMenuSub = React.forwardRef<HTMLUListElement, SidebarMenuSubProps>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      data-sidebar="menu-sub"
      className={cn(
        "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border/50 px-2.5 py-0.5 list-none",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
);
SidebarMenuSub.displayName = "SidebarMenuSub";