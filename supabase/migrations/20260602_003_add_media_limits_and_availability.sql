-- ============================================================================
-- MIGRATION: Añadir límites de medios y disponibilidad de artistas
-- ============================================================================

-- 1. Tabla para límites de medios por plan
CREATE TABLE public.media_limits (
  plan public.artist_plan PRIMARY KEY,
  max_images INTEGER NOT NULL DEFAULT 5,
  max_videos INTEGER NOT NULL DEFAULT 1,
  max_video_duration_seconds INTEGER NOT NULL DEFAULT 10,
  max_video_size_mb INTEGER NOT NULL DEFAULT 20
);

-- Insertar límites por defecto para los planes existentes
INSERT INTO public.media_limits (plan, max_images, max_videos, max_video_duration_seconds, max_video_size_mb) VALUES
(
  'spark',
  5,
  1,
  10,
  20
),
(
  'spotlight',
  20,
  5,
  60,
  100
),
(
  'headliner',
  999,
  999,
  9999,
  9999
);

-- 2. Tabla para disponibilidad de artistas
CREATE TABLE public.artist_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.artist_availability ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Artists can view their own availability"
  ON public.artist_availability FOR SELECT
  USING (auth.uid() = artist_id);

CREATE POLICY "Artists can manage their own availability"
  ON public.artist_availability FOR INSERT WITH CHECK (auth.uid() = artist_id);
CREATE POLICY "Artists can update their own availability"
  ON public.artist_availability FOR UPDATE USING (auth.uid() = artist_id);
CREATE POLICY "Artists can delete their own availability"
  ON public.artist_availability FOR DELETE USING (auth.uid() = artist_id);

CREATE INDEX idx_artist_availability_artist_id ON public.artist_availability(artist_id);
CREATE INDEX idx_artist_availability_dates ON public.artist_availability(start_date, end_date);

-- 3. Modificar tabla de eventos para añadir fecha de caducidad
ALTER TABLE public.events
ADD COLUMN IF NOT EXISTS valid_until TIMESTAMPTZ;

-- Trigger para updated_at en artist_availability
CREATE TRIGGER artist_availability_updated_at
  BEFORE UPDATE ON public.artist_availability
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
