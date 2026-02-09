
-- AI usage tracking table (per-user, per-day)
CREATE TABLE public.ai_usage_daily (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  usage_date DATE NOT NULL DEFAULT CURRENT_DATE,
  grammar_assistant_count INTEGER NOT NULL DEFAULT 0,
  grammar_drill_count INTEGER NOT NULL DEFAULT 0,
  total_tokens_estimate INTEGER NOT NULL DEFAULT 0,
  last_used_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, usage_date)
);

-- Enable RLS
ALTER TABLE public.ai_usage_daily ENABLE ROW LEVEL SECURITY;

-- Users can only read their own usage
CREATE POLICY "Users can view own AI usage"
  ON public.ai_usage_daily FOR SELECT
  USING (auth.uid() = user_id);

-- Only edge functions (service role) can insert/update
CREATE POLICY "Service role can manage AI usage"
  ON public.ai_usage_daily FOR ALL
  USING (true)
  WITH CHECK (true);

-- Index for fast lookups
CREATE INDEX idx_ai_usage_daily_user_date ON public.ai_usage_daily(user_id, usage_date);

-- Configurable AI limits table (admin-tunable without redeploy)
CREATE TABLE public.ai_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tier TEXT NOT NULL UNIQUE CHECK (tier IN ('free', 'monthly', 'lifetime')),
  daily_request_limit INTEGER NOT NULL,
  daily_token_limit INTEGER NOT NULL,
  min_interval_seconds INTEGER NOT NULL DEFAULT 3,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.ai_limits ENABLE ROW LEVEL SECURITY;

-- Anyone can read limits (needed by edge functions via anon key)
CREATE POLICY "Anyone can read AI limits"
  ON public.ai_limits FOR SELECT
  USING (true);

-- Insert default tier configs
INSERT INTO public.ai_limits (tier, daily_request_limit, daily_token_limit, min_interval_seconds) VALUES
  ('free', 15, 50000, 3),
  ('monthly', 100, 300000, 2),
  ('lifetime', 150, 500000, 2);
