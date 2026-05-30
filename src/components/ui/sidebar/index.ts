// 🎭 Escénika Brand — Sidebar Atomic Components
// Barrel export for all sidebar atomic components

// Atoms (primitives)
export {
  useSidebar,
  SidebarProvider,
  SidebarContext,
  type SidebarContextProps,
} from "./atoms/sidebar-context";

export { SIDEBAR_COOKIE_NAME, SIDEBAR_COOKIE_MAX_AGE, SIDEBAR_WIDTH, SIDEBAR_WIDTH_MOBILE, SIDEBAR_WIDTH_ICON, SIDEBAR_KEYBOARD_SHORTCUT } from "./atoms/sidebar-constants";

export { sidebarMenuButtonVariants, type SidebarMenuButtonVariants } from "./atoms/sidebar-variants";

// Molecules (composed primitives)
export { SidebarTrigger } from "./molecules/sidebar-trigger";
export { SidebarRail } from "./molecules/sidebar-rail";
export { SidebarInput } from "./molecules/sidebar-input";
export { SidebarSeparator } from "./molecules/sidebar-separator";

// Organisms (complex structures)
export { SidebarHeader } from "./organisms/sidebar-header";
export { SidebarFooter } from "./organisms/sidebar-footer";
export { SidebarContent } from "./organisms/sidebar-content";
export { SidebarGroup } from "./organisms/sidebar-group";

// Templates (composed organisms)
export { SidebarMenuItem, SidebarMenuButton, SidebarMenuBadge, SidebarMenuSub } from "./templates/sidebar-menu";

// Legacy re-exports for backward compatibility
// Import from ui/sidebar for existing usage
export {
  Sidebar,
  SidebarContent as SidebarContentComponent,
  SidebarFooter as SidebarFooterComponent,
  SidebarGroup as SidebarGroupComponent,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader as SidebarHeaderComponent,
  SidebarInput as SidebarInputComponent,
  SidebarInset,
  SidebarMenuAction,
  SidebarMenuBadge as SidebarMenuBadgeComponent,
  SidebarMenuButton as SidebarMenuButtonComponent,
  SidebarMenuItem as SidebarMenuItemComponent,
  SidebarMenuSkeleton,
  SidebarMenuSub as SidebarMenuSubComponent,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider as SidebarProviderComponent,
  SidebarRail as SidebarRailComponent,
  SidebarSeparator as SidebarSeparatorComponent,
  SidebarTrigger as SidebarTriggerComponent,
  useSidebar as useSidebarHook,
} from "./../../ui/sidebar";