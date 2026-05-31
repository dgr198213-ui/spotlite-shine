// Modular Supabase types - re-exports from types/ directory
// This file exists for backwards compatibility
// New implementation is in src/integrations/supabase/types/index.ts

export {
  Database,
  type Json,
  type DatabaseWithoutInternals,
  type PublicSchema,
} from "./types/database";

export type {
  Tables,
  TablesInsert,
  TablesUpdate,
  Enums,
  CompositeTypes,
} from "./types/generics";

export {
  Constants,
  Enums as EnumConstants,
  type AppRole,
  type ArtistCategory,
  type ArtistPlan,
  type MediaType,
} from "./types/constants";

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
} from "./types/tables";