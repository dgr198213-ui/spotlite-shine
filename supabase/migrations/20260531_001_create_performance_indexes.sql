-- ============================================================
-- Spotlite Shine Database - Performance Index Creation Script
-- Generated: 2026-05-31
-- Database: PostgreSQL (Supabase)
-- ============================================================

-- Media Table (CRITICAL)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_media_user_type 
  ON public.media(user_id, type);

-- Events Table
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_events_organizer_published_date 
  ON public.events(organizer_id, is_published, date DESC);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_events_category_published_date 
  ON public.events(category, is_published, date DESC);

-- Favorites Table
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_favorites_artist_created 
  ON public.favorites(artist_id, created_at DESC);

-- Messages Table
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_messages_recipient_unread 
  ON public.messages(recipient_id, is_read, created_at DESC);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_messages_sender_date 
  ON public.messages(sender_id, created_at DESC);

-- Profiles Table
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_profiles_published 
  ON public.profiles(plan, rating DESC, created_at DESC) 
  WHERE is_published = true;

-- User Roles Table
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_roles_role 
  ON public.user_roles(role, created_at DESC);

-- Subscriptions Table
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_subscriptions_status_period 
  ON public.subscriptions(status, current_period_end DESC);
