-- =================================================================
-- FIX MISSING DATA & FOREIGN KEYS
-- Issue: Cannot apply FKs to user_profiles because some users
-- exist in auth.users but NOT in public.user_profiles yet.
-- Solution: 
-- 1. Backfill missing profiles from auth.users
-- 2. Nullify references to users that don't exist at all
-- 3. Apply the Foreign Keys safely
-- =================================================================

-- 1. Backfill missing profiles (Safe Insert)
-- This ensures every user in auth.users has a counterpart in public.user_profiles
INSERT INTO public.user_profiles (id, nombre_completo)
SELECT id, raw_user_meta_data->>'full_name' as nombre_completo
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.user_profiles);

-- 2. Clean up orphaned data (Optional but safe)
-- Set to NULL any field that points to a user ID that doesn't exist in public.user_profiles
UPDATE tasks SET asignado_a = NULL WHERE asignado_a NOT IN (SELECT id FROM public.user_profiles);
UPDATE tasks SET creado_por = NULL WHERE creado_por NOT IN (SELECT id FROM public.user_profiles);
UPDATE leads SET asignado_a = NULL WHERE asignado_a NOT IN (SELECT id FROM public.user_profiles);
UPDATE deals SET asignado_a = NULL WHERE asignado_a NOT IN (SELECT id FROM public.user_profiles);
UPDATE projects SET responsable = NULL WHERE responsable NOT IN (SELECT id FROM public.user_profiles);


-- 3. NOW APPLY THE CONSTRAINTS (The previous 007 logic)

-- LEADS
ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_asignado_a_fkey;
ALTER TABLE leads ADD CONSTRAINT leads_asignado_a_fkey FOREIGN KEY (asignado_a) REFERENCES public.user_profiles(id) ON DELETE SET NULL;

-- DEALS
ALTER TABLE deals DROP CONSTRAINT IF EXISTS deals_asignado_a_fkey;
ALTER TABLE deals ADD CONSTRAINT deals_asignado_a_fkey FOREIGN KEY (asignado_a) REFERENCES public.user_profiles(id) ON DELETE SET NULL;

-- TASKS
ALTER TABLE tasks DROP CONSTRAINT IF EXISTS tasks_asignado_a_fkey;
ALTER TABLE tasks ADD CONSTRAINT tasks_asignado_a_fkey FOREIGN KEY (asignado_a) REFERENCES public.user_profiles(id) ON DELETE SET NULL;

ALTER TABLE tasks DROP CONSTRAINT IF EXISTS tasks_creado_por_fkey;
ALTER TABLE tasks ADD CONSTRAINT tasks_creado_por_fkey FOREIGN KEY (creado_por) REFERENCES public.user_profiles(id) ON DELETE SET NULL;

-- PROJECTS
ALTER TABLE projects DROP CONSTRAINT IF EXISTS projects_responsable_fkey;
ALTER TABLE projects ADD CONSTRAINT projects_responsable_fkey FOREIGN KEY (responsable) REFERENCES public.user_profiles(id) ON DELETE SET NULL;

-- ACTIVITIES
ALTER TABLE activities DROP CONSTRAINT IF EXISTS activities_usuario_id_fkey;
ALTER TABLE activities ADD CONSTRAINT activities_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.user_profiles(id) ON DELETE SET NULL;

-- DOCUMENTS
ALTER TABLE documents DROP CONSTRAINT IF EXISTS documents_subido_por_fkey;
ALTER TABLE documents ADD CONSTRAINT documents_subido_por_fkey FOREIGN KEY (subido_por) REFERENCES public.user_profiles(id) ON DELETE SET NULL;
