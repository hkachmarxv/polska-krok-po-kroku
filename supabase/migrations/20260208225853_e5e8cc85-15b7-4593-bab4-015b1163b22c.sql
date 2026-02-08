-- Add streak_freezes column to user_progress table
ALTER TABLE public.user_progress 
ADD COLUMN IF NOT EXISTS streak_freezes integer NOT NULL DEFAULT 10;
