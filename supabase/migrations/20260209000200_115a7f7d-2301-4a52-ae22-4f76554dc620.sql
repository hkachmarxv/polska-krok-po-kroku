ALTER TABLE public.user_progress 
ADD COLUMN IF NOT EXISTS lesson_steps_completed jsonb DEFAULT '{}';