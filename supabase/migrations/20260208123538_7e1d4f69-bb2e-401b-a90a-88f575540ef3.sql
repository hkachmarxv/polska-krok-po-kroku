
-- Function to look up email by display_name (for username login)
-- Security definer so it bypasses RLS
CREATE OR REPLACE FUNCTION public.get_email_by_username(username TEXT)
RETURNS TEXT
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT u.email
  FROM auth.users u
  INNER JOIN public.profiles p ON p.user_id = u.id
  WHERE LOWER(p.display_name) = LOWER(username)
  LIMIT 1;
$$;
