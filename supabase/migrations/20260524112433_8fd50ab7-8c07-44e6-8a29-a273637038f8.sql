
-- Fix search_path en funciones existentes (handle_new_user y handle_updated_at ya tienen search_path = public)
ALTER FUNCTION public.handle_updated_at() SET search_path = public;

-- Revocar EXECUTE público en SECURITY DEFINER funciones (solo se usan vía RLS/triggers internos)
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_updated_at() FROM PUBLIC, anon, authenticated;
