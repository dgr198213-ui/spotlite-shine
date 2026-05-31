import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export interface SidebarInputProps
  extends React.ComponentProps<typeof Input> {}

export function SidebarInput({ className, ...props }: SidebarInputProps) {
  return (
    <Input
      data-sidebar="input"
      className={cn(
        "h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        className,
      )}
      {...props}
    />
  );
}