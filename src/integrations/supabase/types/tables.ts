// Type-safe table aliases for common usage
// Extracts Row, Insert, and Update types for each table

import type { PublicSchema } from "./database";

// Event table types
export interface Event {
  budget_max: number | null;
  budget_min: number | null;
  category: "musica" | "teatro" | "magia" | "comedia" | "danza" | "dj" | "circo" | "arte" | "foto_video" | null;
  city: string | null;
  created_at: string;
  date: string;
  description: string | null;
  id: string;
  image_url: string | null;
  is_published: boolean;
  location: string;
  organizer_id: string;
  title: string;
  updated_at: string;
}

export interface EventInsert {
  budget_max?: number | null;
  budget_min?: number | null;
  category?: Event["category"];
  city?: string | null;
  created_at?: string;
  date: string;
  description?: string | null;
  id?: string;
  image_url?: string | null;
  is_published?: boolean;
  location: string;
  organizer_id: string;
  title: string;
  updated_at?: string;
}

export interface EventUpdate {
  budget_max?: number | null;
  budget_min?: number | null;
  category?: Event["category"];
  city?: string | null;
  created_at?: string;
  date?: string;
  description?: string | null;
  id?: string;
  image_url?: string | null;
  is_published?: boolean;
  location?: string;
  organizer_id?: string;
  title?: string;
  updated_at?: string;
}

// Favorite table types
export interface Favorite {
  artist_id: string;
  created_at: string;
  id: string;
  user_id: string;
}

export interface FavoriteInsert {
  artist_id: string;
  created_at?: string;
  id?: string;
  user_id: string;
}

export interface FavoriteUpdate {
  artist_id?: string;
  created_at?: string;
  id?: string;
  user_id?: string;
}

// Media table types
export interface Media {
  created_at: string;
  duration_seconds: number | null;
  id: string;
  position: number;
  storage_path: string | null;
  type: "image" | "video";
  url: string;
  user_id: string;
}

export interface MediaInsert {
  created_at?: string;
  duration_seconds?: number | null;
  id?: string;
  position?: number;
  storage_path?: string | null;
  type: "image" | "video";
  url: string;
  user_id: string;
}

export interface MediaUpdate {
  created_at?: string;
  duration_seconds?: number | null;
  id?: string;
  position?: number;
  storage_path?: string | null;
  type?: "image" | "video";
  url?: string;
  user_id?: string;
}

// Message table types
export interface Message {
  body: string;
  created_at: string;
  id: string;
  is_read: boolean;
  recipient_id: string;
  sender_id: string;
  subject: string | null;
}

export interface MessageInsert {
  body: string;
  created_at?: string;
  id?: string;
  is_read?: boolean;
  recipient_id: string;
  sender_id: string;
  subject?: string | null;
}

export interface MessageUpdate {
  body?: string;
  created_at?: string;
  id?: string;
  is_read?: boolean;
  recipient_id?: string;
  sender_id?: string;
  subject?: string | null;
}

// Profile table types
export interface Profile {
  avatar_url: string | null;
  bio: string | null;
  category: Event["category"];
  city: string | null;
  cover_url: string | null;
  created_at: string;
  display_name: string;
  id: string;
  is_published: boolean;
  organizer_company: string | null;
  organizer_email: string | null;
  organizer_name: string | null;
  organizer_phone: string | null;
  organizer_website: string | null;
  plan: "spark" | "spotlight" | "headliner";
  price_from: number | null;
  rating: number | null;
  requirements: string | null;
  reviews_count: number;
  slug: string | null;
  updated_at: string;
}

export interface ProfileInsert {
  avatar_url?: string | null;
  bio?: string | null;
  category?: Profile["category"];
  city?: string | null;
  cover_url?: string | null;
  created_at?: string;
  display_name: string;
  id: string;
  is_published?: boolean;
  organizer_company?: string | null;
  organizer_email?: string | null;
  organizer_name?: string | null;
  organizer_phone?: string | null;
  organizer_website?: string | null;
  plan?: Profile["plan"];
  price_from?: number | null;
  rating?: number | null;
  requirements?: string | null;
  reviews_count?: number;
  slug?: string | null;
  updated_at?: string;
}

export interface ProfileUpdate {
  avatar_url?: string | null;
  bio?: string | null;
  category?: Profile["category"];
  city?: string | null;
  cover_url?: string | null;
  created_at?: string;
  display_name?: string;
  id?: string;
  is_published?: boolean;
  organizer_company?: string | null;
  organizer_email?: string | null;
  organizer_name?: string | null;
  organizer_phone?: string | null;
  organizer_website?: string | null;
  plan?: Profile["plan"];
  price_from?: number | null;
  rating?: number | null;
  requirements?: string | null;
  reviews_count?: number;
  slug?: string | null;
  updated_at?: string;
}

// Subscription table types
export interface Subscription {
  cancel_at: string | null;
  created_at: string;
  current_period_end: string | null;
  current_period_start: string | null;
  id: string;
  plan: "spark" | "spotlight" | "headliner";
  status: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  updated_at: string;
  user_id: string;
}

export interface SubscriptionInsert {
  cancel_at?: string | null;
  created_at?: string;
  current_period_end?: string | null;
  current_period_start?: string | null;
  id?: string;
  plan?: Subscription["plan"];
  status?: string;
  stripe_customer_id?: string | null;
  stripe_subscription_id?: string | null;
  updated_at?: string;
  user_id: string;
}

export interface SubscriptionUpdate {
  cancel_at?: string | null;
  created_at?: string;
  current_period_end?: string | null;
  current_period_start?: string | null;
  id?: string;
  plan?: Subscription["plan"];
  status?: string;
  stripe_customer_id?: string | null;
  stripe_subscription_id?: string | null;
  updated_at?: string;
  user_id?: string;
}

// UserRole table types
export interface UserRole {
  created_at: string;
  id: string;
  role: "admin" | "artist" | "organizer";
  user_id: string;
}

export interface UserRoleInsert {
  created_at?: string;
  id?: string;
  role: "admin" | "artist" | "organizer";
  user_id: string;
}

export interface UserRoleUpdate {
  created_at?: string;
  id?: string;
  role?: "admin" | "artist" | "organizer";
  user_id?: string;
}