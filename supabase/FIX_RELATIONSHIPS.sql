-- =====================================================
-- FIX RELATIONS FOR LEADS TABLE
-- Ejecuta este script para que el CRM pueda leer los leads
-- =====================================================

-- 1. Eliminar la restricción anterior que apuntaba a auth.users
ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_asignado_a_fkey;

-- 2. Crear nueva restricción apuntando a public.user_profiles
-- Esto permite que Supabase detecte la relación para el JOIN en el frontend
ALTER TABLE leads 
ADD CONSTRAINT leads_asignado_a_fkey 
FOREIGN KEY (asignado_a) 
REFERENCES public.user_profiles(id);

-- 3. Asegurar que user_profiles tenga permisos de lectura
GRANT SELECT ON TABLE user_profiles TO authenticated;
GRANT SELECT ON TABLE user_profiles TO anon;
