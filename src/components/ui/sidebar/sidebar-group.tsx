import * as React from "react";

import { cn } from "@/lib/utils";

export interface SidebarGroupProps
  extends React.ComponentProps<"div"> {}

export function SidebarGroup({ className, ...props }: SidebarGroupProps) {
  return (
    <div
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  );
}