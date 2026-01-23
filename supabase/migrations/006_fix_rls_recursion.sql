-- =================================================================
-- FIX RLS INFINITE RECURSION
-- Issue: Policies checking 'admin' role query 'user_profiles' table,
-- which itself has policies querying 'user_profiles', causing a loop.
-- Solution: Use a SECURITY DEFINER function to bypass RLS for role checks.
-- =================================================================

-- 1. Create a secure function to check user role
-- SECURITY DEFINER means this runs with the privileges of the creator (postgres/admin)
-- bypassing RLS on user_profiles table.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
DECLARE
  current_role text;
BEGIN
  SELECT rol INTO current_role
  FROM public.user_profiles
  WHERE id = auth.uid();
  
  RETURN current_role = 'admin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Drop the recursive policies on user_profiles
DROP POLICY IF EXISTS "Admins can manage all profiles" ON user_profiles;

-- 3. Re-create the policy using the safe function
CREATE POLICY "Admins can manage all profiles" 
ON user_profiles 
FOR ALL 
USING ( public.is_admin() );

-- 4. OPTIONAL: Update other tables to use this function for better performance/safety
-- (This prevents them from accidentally triggering recursion if logic changes)

-- Projects
DROP POLICY IF EXISTS "Admins can delete projects" ON projects;
DROP POLICY IF EXISTS "Users can update assigned projects" ON projects;

CREATE POLICY "Admins can delete projects" 
ON projects FOR DELETE 
USING ( public.is_admin() );

CREATE POLICY "Users can update assigned projects" 
ON projects FOR UPDATE 
USING ( responsable = auth.uid() OR public.is_admin() );

-- Leads
DROP POLICY IF EXISTS "Admins can delete leads" ON leads;
DROP POLICY IF EXISTS "Users can update assigned leads" ON leads;

CREATE POLICY "Admins can delete leads" 
ON leads FOR DELETE 
USING ( public.is_admin() );

CREATE POLICY "Users can update assigned leads" 
ON leads FOR UPDATE 
USING ( asignado_a = auth.uid() OR public.is_admin() );

-- Deals
DROP POLICY IF EXISTS "Admins can delete deals" ON deals;
DROP POLICY IF EXISTS "Users can update assigned deals" ON deals;

CREATE POLICY "Admins can delete deals" 
ON deals FOR DELETE 
USING ( public.is_admin() );

CREATE POLICY "Users can update assigned deals" 
ON deals FOR UPDATE 
USING ( asignado_a = auth.uid() OR public.is_admin() );

-- Tasks
DROP POLICY IF EXISTS "Users can update assigned tasks" ON tasks;
DROP POLICY IF EXISTS "Users can delete own tasks" ON tasks;

CREATE POLICY "Users can update assigned tasks" 
ON tasks FOR UPDATE 
USING ( asignado_a = auth.uid() OR creado_por = auth.uid() OR public.is_admin() );

CREATE POLICY "Users can delete own tasks" 
ON tasks FOR DELETE 
USING ( creado_por = auth.uid() OR public.is_admin() );

-- Activities
DROP POLICY IF EXISTS "Admins can delete activities" ON activities;
CREATE POLICY "Admins can delete activities" 
ON activities FOR DELETE 
USING ( public.is_admin() );

-- Documents
DROP POLICY IF EXISTS "Users can delete own documents" ON documents;
CREATE POLICY "Users can delete own documents" 
ON documents FOR DELETE 
USING ( subido_por = auth.uid() OR public.is_admin() );
