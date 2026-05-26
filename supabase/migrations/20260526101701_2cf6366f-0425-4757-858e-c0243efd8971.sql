-- Beta: limit spark plan to 1 image and 0 videos
CREATE OR REPLACE FUNCTION public.enforce_media_plan_limits()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
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
    max_videos := 0; max_images := 1; max_video_seconds := 0;
  ELSIF user_plan = 'spotlight' THEN
    max_videos := 1; max_images := 6; max_video_seconds := 8;
  ELSE
    max_videos := 100; max_images := 100; max_video_seconds := 600;
  END IF;

  IF NEW.type = 'video' THEN
    IF max_videos = 0 THEN
      RAISE EXCEPTION 'Tu plan actual no permite subir vídeos. Próximamente disponible en el plan Standard.';
    END IF;
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
      RAISE EXCEPTION 'Has alcanzado el límite de % imágen(es) de tu plan', max_images;
    END IF;
  END IF;

  RETURN NEW;
END;
$function$;

-- Add requirements/rider column for artist demands (sound, lighting, hospitality, etc.)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS requirements text;