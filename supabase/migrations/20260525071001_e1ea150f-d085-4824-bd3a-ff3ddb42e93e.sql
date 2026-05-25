
CREATE TYPE public.media_type AS ENUM ('image', 'video');

CREATE TABLE public.media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type public.media_type NOT NULL,
  url TEXT NOT NULL,
  storage_path TEXT,
  duration_seconds NUMERIC(6,2),
  position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX media_user_id_idx ON public.media(user_id);

ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Media viewable for published artists or owner"
  ON public.media FOR SELECT
  USING (
    auth.uid() = user_id
    OR EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = media.user_id AND p.is_published = true)
  );

CREATE POLICY "Users insert own media"
  ON public.media FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own media"
  ON public.media FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users delete own media"
  ON public.media FOR DELETE
  USING (auth.uid() = user_id);

-- Límites por plan, validado en el servidor
CREATE OR REPLACE FUNCTION public.enforce_media_plan_limits()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  user_plan public.artist_plan;
  max_videos INTEGER;
  max_images INTEGER;
  max_video_seconds NUMERIC;
  current_videos INTEGER;
  current_images INTEGER;
BEGIN
  SELECT plan INTO user_plan FROM public.profiles WHERE id = NEW.user_id;

  IF user_plan = 'spark' THEN
    max_videos := 1; max_images := 4; max_video_seconds := 8;
  ELSIF user_plan = 'spotlight' THEN
    max_videos := 5; max_images := 20; max_video_seconds := 60;
  ELSE
    max_videos := 100; max_images := 100; max_video_seconds := 600;
  END IF;

  IF NEW.type = 'video' THEN
    IF NEW.duration_seconds IS NULL OR NEW.duration_seconds > max_video_seconds THEN
      RAISE EXCEPTION 'Tu plan permite vídeos de hasta % segundos', max_video_seconds;
    END IF;
    SELECT COUNT(*) INTO current_videos FROM public.media WHERE user_id = NEW.user_id AND type = 'video';
    IF current_videos >= max_videos THEN
      RAISE EXCEPTION 'Has alcanzado el límite de % vídeo(s) de tu plan', max_videos;
    END IF;
  ELSE
    SELECT COUNT(*) INTO current_images FROM public.media WHERE user_id = NEW.user_id AND type = 'image';
    IF current_images >= max_images THEN
      RAISE EXCEPTION 'Has alcanzado el límite de % imágenes de tu plan', max_images;
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER media_enforce_plan_limits
  BEFORE INSERT ON public.media
  FOR EACH ROW EXECUTE FUNCTION public.enforce_media_plan_limits();

-- Storage bucket público
INSERT INTO storage.buckets (id, name, public)
VALUES ('artist-media', 'artist-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Artist media is publicly readable"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'artist-media');

CREATE POLICY "Users upload own artist media"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'artist-media' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users update own artist media"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'artist-media' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users delete own artist media"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'artist-media' AND auth.uid()::text = (storage.foldername(name))[1]);
