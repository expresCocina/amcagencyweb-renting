-- =================================================================
-- FIX PROJECTS RELATIONSHIPS
-- Problema: La tabla projects referenciaba a auth.users, pero se intentaba
-- hacer join con user_profiles. PostgREST requiere FK explícita.
-- =================================================================

-- 1. Eliminar la restricción FK antigua que apuntaba a auth.users
ALTER TABLE projects 
DROP CONSTRAINT IF EXISTS projects_responsable_fkey;

-- 2. Agregar nueva restricción FK apuntando a public.user_profiles
ALTER TABLE projects 
ADD CONSTRAINT projects_responsable_fkey 
FOREIGN KEY (responsable) 
REFERENCES public.user_profiles(id);

-- 3. Asegurar que los índices existan
CREATE INDEX IF NOT EXISTS idx_projects_responsable ON projects(responsable);

-- =================================================================
-- REPETIR PARA OTRAS TABLAS QUE MUESTRAN ERROR SIMILAR
-- Es buena práctica que las tablas públicas relacionen a user_profiles
-- =================================================================

-- LEADS
ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_asignado_a_fkey;
ALTER TABLE leads ADD CONSTRAINT leads_asignado_a_fkey FOREIGN KEY (asignado_a) REFERENCES public.user_profiles(id);

-- DEALS
ALTER TABLE deals DROP CONSTRAINT IF EXISTS deals_asignado_a_fkey;
ALTER TABLE deals ADD CONSTRAINT deals_asignado_a_fkey FOREIGN KEY (asignado_a) REFERENCES public.user_profiles(id);

-- TASKS (Asignado a)
ALTER TABLE tasks DROP CONSTRAINT IF EXISTS tasks_asignado_a_fkey;
ALTER TABLE tasks ADD CONSTRAINT tasks_asignado_a_fkey FOREIGN KEY (asignado_a) REFERENCES public.user_profiles(id);

-- TASKS (Creado por - este puede quedarse en auth users o profiles, preferible profiles)
ALTER TABLE tasks DROP CONSTRAINT IF EXISTS tasks_creado_por_fkey;
ALTER TABLE tasks ADD CONSTRAINT tasks_creado_por_fkey FOREIGN KEY (creado_por) REFERENCES public.user_profiles(id);

-- ACTIVITIES
ALTER TABLE activities DROP CONSTRAINT IF EXISTS activities_usuario_id_fkey;
ALTER TABLE activities ADD CONSTRAINT activities_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.user_profiles(id);

-- Recargar caché de esquema (Esto sucede auto, pero el comentario sirve de doc)
NOTIFY pgrst, 'reload schema';
