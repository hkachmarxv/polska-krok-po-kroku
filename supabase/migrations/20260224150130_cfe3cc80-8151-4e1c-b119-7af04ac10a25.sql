
-- Referral codes table
CREATE TABLE public.referral_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL,
  referrer_name TEXT NOT NULL,
  referrer_email TEXT,
  stripe_coupon_id TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Unique uppercase code constraint
CREATE UNIQUE INDEX idx_referral_codes_code ON public.referral_codes (UPPER(code));

-- Enable RLS
ALTER TABLE public.referral_codes ENABLE ROW LEVEL SECURITY;

-- Public read so app can validate codes
CREATE POLICY "Anyone can read active referral codes"
  ON public.referral_codes FOR SELECT
  USING (active = true);

-- Referrals tracking table
CREATE TABLE public.referrals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  referral_code_id UUID NOT NULL REFERENCES public.referral_codes(id),
  referred_user_id UUID NOT NULL,
  converted BOOLEAN NOT NULL DEFAULT false,
  converted_at TIMESTAMPTZ,
  stripe_session_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Each user can only be referred once
CREATE UNIQUE INDEX idx_referrals_user ON public.referrals (referred_user_id);

-- Enable RLS
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- Users can read their own referral
CREATE POLICY "Users can read own referral"
  ON public.referrals FOR SELECT
  USING (auth.uid() = referred_user_id);

-- Users can insert their own referral (on signup)
CREATE POLICY "Users can insert own referral"
  ON public.referrals FOR INSERT
  WITH CHECK (auth.uid() = referred_user_id);

-- Seed data: two referral codes
INSERT INTO public.referral_codes (code, referrer_name, stripe_coupon_id)
VALUES
  ('POLSKI', 'Owner', 'h9YKpA8l'),
  ('ANDRE', 'Andre', 'h9YKpA8l');
