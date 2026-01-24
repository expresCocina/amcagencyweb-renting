-- Ensure we have a non-recursive policy for reading profiles
DROP POLICY IF EXISTS "Users can view all profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "View Own Profile" ON public.user_profiles;

-- Strict, non-recursive policy: You can ONLY see your own profile.
CREATE POLICY "View Own Profile" ON public.user_profiles 
FOR SELECT USING (auth.uid() = id);

-- Allow admins to see everything (but be careful of recursion if we used a SELECT here)
-- For now, let's keep it simple. If we need admin access, we can add it later.
-- But for LOGIN check, the user only needs to read THEIR OWN profile.
