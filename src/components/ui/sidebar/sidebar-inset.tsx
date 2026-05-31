import * as React from "react";

import { cn } from "@/lib/utils";

export interface SidebarInsetProps
  extends React.ComponentProps<"main"> {}

export function SidebarInset({ className, ...props }: SidebarInsetProps) {
  return (
    <main
      data-sidebar="inset"
      className={cn(
        "relative flex w-full flex-1 flex-col bg-background",
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
        className,
      )}
      {...props}
    />
  );
}