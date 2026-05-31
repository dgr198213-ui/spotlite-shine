-- ============================================================
-- Spotlite Shine Performance Indexes
-- Database: PostgreSQL (Supabase)
-- ============================================================

-- Media table (CRITICAL - used in every insert)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_media_user_type 
  ON public.media(user_id, type);

-- Events table (composite indexes)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_events_organizer_published_date 
  ON public.events(organizer_id, is_published, date DESC);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_events_category_published_date 
  ON public.events(category, is_published, date DESC);

-- Favorites (reverse lookup)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_favorites_artist_created 
  ON public.favorites(artist_id, created_at DESC);

-- Messages (inbox queries)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_messages_recipient_unread 
  ON public.messages(recipient_id, is_read, created_at DESC);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_messages_sender_date 
  ON public.messages(sender_id, created_at DESC);

-- Partial index for published profiles
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_profiles_published 
  ON public.profiles(plan, rating DESC) 
  WHERE is_published = true;

-- User roles role lookup
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_roles_role 
  ON public.user_roles(role);
