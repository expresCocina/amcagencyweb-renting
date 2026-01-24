-- 1. Ensure users can UPDATE their own profile (Critical for Onboarding)
CREATE POLICY "Users can update own profile" ON public.user_profiles
FOR UPDATE USING (auth.uid() = id);

-- 2. Ensure users can SELECT their own profile (Critical for Login Check)
-- (Repeating this just in case script 023 wasn't run or got overwritten)
DROP POLICY IF EXISTS "View Own Profile" ON public.user_profiles;
CREATE POLICY "View Own Profile" ON public.user_profiles 
FOR SELECT USING (auth.uid() = id);

-- 3. Grant usage on sequences if any (Generic fix)
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
