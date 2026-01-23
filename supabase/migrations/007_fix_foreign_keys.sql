-- =================================================================
-- FIX FOREIGN KEY RELATIONSHIPS
-- Issue: Tables reference auth.users directly, preventing PostgREST
-- from joining with public.user_profiles to get names/avatars.
-- Solution: Change FKs to reference public.user_profiles(id).
-- =================================================================

-- 1. LEADS
ALTER TABLE leads
DROP CONSTRAINT IF EXISTS leads_asignado_a_fkey;

ALTER TABLE leads
ADD CONSTRAINT leads_asignado_a_fkey
FOREIGN KEY (asignado_a)
REFERENCES public.user_profiles(id)
ON DELETE SET NULL;

-- 2. DEALS
ALTER TABLE deals
DROP CONSTRAINT IF EXISTS deals_asignado_a_fkey;

ALTER TABLE deals
ADD CONSTRAINT deals_asignado_a_fkey
FOREIGN KEY (asignado_a)
REFERENCES public.user_profiles(id)
ON DELETE SET NULL;

-- 3. TASKS
ALTER TABLE tasks
DROP CONSTRAINT IF EXISTS tasks_asignado_a_fkey;

ALTER TABLE tasks
ADD CONSTRAINT tasks_asignado_a_fkey
FOREIGN KEY (asignado_a)
REFERENCES public.user_profiles(id)
ON DELETE SET NULL;

ALTER TABLE tasks
DROP CONSTRAINT IF EXISTS tasks_creado_por_fkey;

ALTER TABLE tasks
ADD CONSTRAINT tasks_creado_por_fkey
FOREIGN KEY (creado_por)
REFERENCES public.user_profiles(id)
ON DELETE SET NULL;

-- 4. PROJECTS
ALTER TABLE projects
DROP CONSTRAINT IF EXISTS projects_responsable_fkey;

ALTER TABLE projects
ADD CONSTRAINT projects_responsable_fkey
FOREIGN KEY (responsable)
REFERENCES public.user_profiles(id)
ON DELETE SET NULL;

-- 5. ACTIVITIES
ALTER TABLE activities
DROP CONSTRAINT IF EXISTS activities_usuario_id_fkey;

ALTER TABLE activities
ADD CONSTRAINT activities_usuario_id_fkey
FOREIGN KEY (usuario_id)
REFERENCES public.user_profiles(id)
ON DELETE SET NULL;

-- 6. DOCUMENTS
ALTER TABLE documents
DROP CONSTRAINT IF EXISTS documents_subido_por_fkey;

ALTER TABLE documents
ADD CONSTRAINT documents_subido_por_fkey
FOREIGN KEY (subido_por)
REFERENCES public.user_profiles(id)
ON DELETE SET NULL;
