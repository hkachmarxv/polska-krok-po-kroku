
-- Replace the overly permissive policy with specific service-role policies
DROP POLICY "Service role can manage AI usage" ON public.ai_usage_daily;

-- Users cannot insert/update/delete their own usage (only service role via edge functions)
-- No INSERT/UPDATE/DELETE policies for anon/authenticated = only service_role can write
