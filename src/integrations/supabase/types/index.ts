// Re-export all supabase types for backwards compatibility
export { Database, type Json } from "./database";
export type {
  Tables,
  TablesInsert,
  TablesUpdate,
  Enums,
  CompositeTypes,
} from "./generics";
export { Constants } from "./constants";
export type {
  Event,
  EventInsert,
  EventUpdate,
  Favorite,
  FavoriteInsert,
  FavoriteUpdate,
  Media,
  MediaInsert,
  MediaUpdate,
  Message,
  MessageInsert,
  MessageUpdate,
  Profile,
  ProfileInsert,
  ProfileUpdate,
  Subscription,
  SubscriptionInsert,
  SubscriptionUpdate,
  UserRole,
  UserRoleInsert,
  UserRoleUpdate,
} from "./tables";