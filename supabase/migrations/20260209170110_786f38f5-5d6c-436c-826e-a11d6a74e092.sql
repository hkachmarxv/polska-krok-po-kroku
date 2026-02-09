
CREATE POLICY "Users can insert their own AI usage data"
ON public.ai_usage_daily FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own AI usage data"
ON public.ai_usage_daily FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
