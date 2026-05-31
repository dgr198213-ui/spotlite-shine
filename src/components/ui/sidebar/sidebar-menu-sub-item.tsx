import * as React from "react";

export interface SidebarMenuSubItemProps
  extends React.ComponentProps<"li"> {}

export function SidebarMenuSubItem({ ...props }: SidebarMenuSubItemProps) {
  return <li data-sidebar="menu-sub-item" {...props} />;
}