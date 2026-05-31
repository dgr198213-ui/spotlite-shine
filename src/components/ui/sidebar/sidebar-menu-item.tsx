import * as React from "react";

import { cn } from "@/lib/utils";

export interface SidebarMenuItemProps
  extends React.ComponentProps<"li"> {}

export function SidebarMenuItem({ className, ...props }: SidebarMenuItemProps) {
  return (
    <li
      data-sidebar="menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  );
}