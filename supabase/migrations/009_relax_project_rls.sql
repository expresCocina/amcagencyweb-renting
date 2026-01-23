-- =================================================================
-- FIX PROJECT RLS "SOFT LOCK"
-- Issue: Users cannot update projects they created if they didn't
-- assign them to themselves (responsable is NULL), because the
-- policy only allowed update if (responsable = auth.uid()).
-- Solution: Allow updates if responsable is NULL (unassigned)
-- or if the user is the assigned one (or admin).
-- =================================================================

DROP POLICY IF EXISTS "Users can update assigned projects" ON projects;

CREATE POLICY "Users can update assigned projects" 
ON projects FOR UPDATE 
USING ( 
    responsable = auth.uid() 
    OR responsable IS NULL 
    OR public.is_admin() 
);

-- Note: We generally assume that if a project is unassigned, 
-- any team member should be able to update it (e.g. to assign it 
-- to themselves or change status).
