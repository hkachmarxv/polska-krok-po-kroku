
ALTER TABLE public.user_progress
ADD COLUMN IF NOT EXISTS a1_checkpoint_passed boolean NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS a1_checkpoint_score jsonb DEFAULT null;
