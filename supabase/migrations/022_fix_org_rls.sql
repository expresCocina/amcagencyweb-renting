-- 1. Enable INSERT for Authenticated Users
-- Needed so new SaaS users can create their company
CREATE POLICY "Enable insert for authenticated users" ON public.organizations
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 2. Enable SELECT for Authenticated Users
-- Needed for "checking if slug exists" and for returning data after insert
-- In a stricter system, you might restrict this, but for MVP it's necessary.
CREATE POLICY "Enable select for authenticated users" ON public.organizations
FOR SELECT USING (auth.role() = 'authenticated');

-- 3. Enable UPDATE for Organization Admins
-- logic: User must be linked to this org in user_profiles AND have 'admin' role
CREATE POLICY "Enable update for org admins" ON public.organizations
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.organization_id = organizations.id
    AND user_profiles.rol = 'admin'
  )
);
