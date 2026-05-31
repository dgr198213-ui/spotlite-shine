-- ============================================================
-- Spotlite Shine - RLS Policy Optimization Script
-- Fixes correlated subquery performance issues
-- ============================================================

-- ISSUE 1: Media SELECT Policy - Replace correlated subquery
DROP POLICY IF EXISTS "Media viewable for published artists or owner" ON public.media;

CREATE OR REPLACE FUNCTION public.is_published_artist(artist_uuid UUID)
RETURNS BOOLEAN 
STABLE LANGUAGE SQL SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = artist_uuid AND is_published = true
  );
$$;

CREATE POLICY "Media viewable for published artists or owner"
  ON public.media FOR SELECT
  USING (
    auth.uid() = user_id
    OR is_published_artist(user_id)
  );

-- ISSUE 2: Deterministic get_user_role (admin > organizer > artist)
DROP FUNCTION IF EXISTS public.get_user_role(UUID);

CREATE OR REPLACE FUNCTION public.get_user_role(_user_id UUID)
RETURNS public.app_role
STABLE LANGUAGE SQL SECURITY DEFINER SET search_path = public
AS $$
  SELECT COALESCE(
    (SELECT role FROM public.user_roles WHERE user_id = _user_id AND role = 'admin' LIMIT 1),
    (SELECT role FROM public.user_roles WHERE user_id = _user_id AND role = 'organizer' LIMIT 1),
    (SELECT role FROM public.user_roles WHERE user_id = _user_id AND role = 'artist' LIMIT 1),
    'artist'::public.app_role
  )
$$;

-- ISSUE 3: Robust handle_new_user with error handling
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  selected_role public.app_role;
  profile_display_name TEXT;
BEGIN
  selected_role := COALESCE(
    (NEW.raw_user_meta_data->>'role')::public.app_role,
    'artist'
  );
  
  profile_display_name := COALESCE(
    NEW.raw_user_meta_data->>'display_name',
    split_part(NEW.email, '@', 1)
  );
  
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, profile_display_name)
  ON CONFLICT (id) DO NOTHING;
  
  INSERT INTO public.user_roles (user_id, role) 
  VALUES (NEW.id, selected_role)
  ON CONFLICT (user_id, role) DO NOTHING;
  
  RETURN NEW;
  
EXCEPTION WHEN OTHERS THEN
  RAISE WARNING 'handle_new_user failed: %', SQLERRM;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
