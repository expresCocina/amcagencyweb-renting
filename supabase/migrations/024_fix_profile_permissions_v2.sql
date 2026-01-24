-- 1. Drop policies if they exist (to avoid "already exists" error)
DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "View Own Profile" ON public.user_profiles;

-- 2. Re-create them with the correct permissions
CREATE POLICY "Users can update own profile" ON public.user_profiles
FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "View Own Profile" ON public.user_profiles 
FOR SELECT USING (auth.uid() = id);

-- 3. Grant usage on sequences if any (Generic fix for new tables)
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
