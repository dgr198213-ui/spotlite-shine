-- ============================================================================
-- MIGRATION: Mejorar perfiles — slug automático y función de salud
-- ============================================================================

-- Función para generar slug único a partir del nombre
CREATE OR REPLACE FUNCTION public.generate_profile_slug(display_name TEXT, user_id UUID)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  counter INTEGER := 0;
BEGIN
  -- Normalizar: minúsculas, reemplazar espacios y caracteres especiales
  base_slug := lower(regexp_replace(
    translate(
      display_name,
      'áàäâãéèëêíìïîóòöôõúùüûñç',
      'aaaaaeeeeiiiiooooouuuunc'
    ),
    '[^a-z0-9]+', '-', 'g'
  ));
  -- Eliminar guiones al inicio y al final
  base_slug := trim(both '-' from base_slug);
  -- Truncar a 50 caracteres
  base_slug := left(base_slug, 50);

  final_slug := base_slug;

  -- Verificar unicidad
  WHILE EXISTS (SELECT 1 FROM public.profiles WHERE slug = final_slug AND id != user_id) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;

  RETURN final_slug;
END;
$$;

-- Trigger para auto-generar slug al insertar o actualizar display_name
CREATE OR REPLACE FUNCTION public.auto_set_profile_slug()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Solo generar si no tiene slug o si cambió el display_name
  IF NEW.slug IS NULL OR (TG_OP = 'UPDATE' AND OLD.display_name IS DISTINCT FROM NEW.display_name AND NEW.slug = OLD.slug) THEN
    NEW.slug := public.generate_profile_slug(NEW.display_name, NEW.id);
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_auto_slug ON public.profiles;
CREATE TRIGGER profiles_auto_slug
  BEFORE INSERT OR UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.auto_set_profile_slug();

-- Actualizar slugs vacíos existentes
UPDATE public.profiles
SET slug = public.generate_profile_slug(display_name, id)
WHERE slug IS NULL OR slug = '';

-- ============================================================================
-- Función de salud de la base de datos (para health checks)
-- ============================================================================
CREATE OR REPLACE FUNCTION public.health_check()
RETURNS JSONB
LANGUAGE SQL
SECURITY DEFINER SET search_path = public
AS $$
  SELECT jsonb_build_object(
    'status', 'ok',
    'timestamp', now(),
    'profiles_count', (SELECT COUNT(*) FROM public.profiles),
    'published_count', (SELECT COUNT(*) FROM public.profiles WHERE is_published = true)
  )
$$;

GRANT EXECUTE ON FUNCTION public.health_check() TO anon, authenticated;
