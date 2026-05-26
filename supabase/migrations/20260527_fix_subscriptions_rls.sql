-- ============================================================================
-- MIGRATION: Fix Subscriptions RLS Policies for Webhooks
-- ============================================================================
-- This migration adds missing UPDATE policy for subscriptions table
-- to allow Stripe webhooks to update subscription status

-- Add UPDATE policy for subscriptions (for webhook updates)
CREATE POLICY "Service role can update subscriptions"
  ON public.subscriptions FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Add INSERT policy for subscriptions (for webhook inserts)
CREATE POLICY "Service role can insert subscriptions"
  ON public.subscriptions FOR INSERT
  WITH CHECK (true);

-- Ensure the table has RLS enabled (should already be enabled)
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
