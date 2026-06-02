-- ============================================================================
-- MIGRATION: Fix Subscriptions RLS — Restrict to service_role only
-- ============================================================================
-- Las políticas anteriores usaban USING (true) sin restricción de rol,
-- lo que permitía a cualquier usuario autenticado modificar suscripciones.
-- Esta migración las reemplaza por políticas que solo permiten service_role.

-- Eliminar políticas anteriores demasiado permisivas
DROP POLICY IF EXISTS "Service role can update subscriptions" ON public.subscriptions;
DROP POLICY IF EXISTS "Service role can insert subscriptions" ON public.subscriptions;

-- Política de INSERT: solo service_role (webhooks de Stripe)
CREATE POLICY "service_role can insert subscriptions"
  ON public.subscriptions FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Política de UPDATE: solo service_role (webhooks de Stripe)
CREATE POLICY "service_role can update subscriptions"
  ON public.subscriptions FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Política de DELETE: solo service_role
CREATE POLICY "service_role can delete subscriptions"
  ON public.subscriptions FOR DELETE
  TO service_role
  USING (true);

-- Asegurar que RLS está habilitado
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- MIGRATION: Añadir columna requirements a profiles si no existe
-- ============================================================================
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS requirements TEXT;
