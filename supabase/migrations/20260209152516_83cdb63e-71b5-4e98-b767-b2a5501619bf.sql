
-- Create ai_boost_plans table
CREATE TABLE public.ai_boost_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  stripe_price_id TEXT NOT NULL,
  stripe_product_id TEXT NOT NULL,
  extra_daily_requests INTEGER NOT NULL,
  extra_daily_tokens INTEGER NOT NULL,
  monthly_token_cap INTEGER NOT NULL,
  price_display TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.ai_boost_plans ENABLE ROW LEVEL SECURITY;

-- Public read access (config data)
CREATE POLICY "Anyone can read AI boost plans"
  ON public.ai_boost_plans
  FOR SELECT
  USING (true);

-- Seed the two boost plans
INSERT INTO public.ai_boost_plans (name, slug, stripe_price_id, stripe_product_id, extra_daily_requests, extra_daily_tokens, monthly_token_cap, price_display)
VALUES
  ('AI Boost Plus', 'plus', 'price_1SywKZGdKrTRUj6vGH6vz3Jg', 'prod_Twq0CtKDWALa1I', 100, 200000, 4000000, '$5/mo'),
  ('AI Boost Pro', 'pro', 'price_1SywKaGdKrTRUj6veG4R9oWq', 'prod_Twq0TjQg0LYuYG', 300, 500000, 12000000, '$10/mo');
