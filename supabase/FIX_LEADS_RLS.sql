-- =====================================================
-- FIX RLS POLICIES FOR LEADS TABLE
-- Ejecuta este script completo en el SQL Editor de Supabase
-- =====================================================

-- 1. Asegurar que RLS está activo
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- 2. Eliminar políticas anteriores para limpiar conflictos
DROP POLICY IF EXISTS "Allow public insert on leads" ON leads;
DROP POLICY IF EXISTS "Allow authenticated users to view leads" ON leads;
DROP POLICY IF EXISTS "Allow authenticated users to update leads" ON leads;
DROP POLICY IF EXISTS "Allow authenticated users to delete leads" ON leads;
DROP POLICY IF EXISTS "Public Leads Insert" ON leads; -- Por si acaso tiene otro nombre

-- 3. Crear Política para Inserción Pública (Formulario Web)
-- Esta es la crucial para que funcione el formulario
CREATE POLICY "Allow public insert on leads"
ON leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 4. Crear Políticas para el CRM (Usuarios Autenticados)
CREATE POLICY "Allow authenticated users to view leads"
ON leads
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated users to update leads"
ON leads
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete leads"
ON leads
FOR DELETE
TO authenticated
USING (true);

-- 5. Conceder permisos explícitos de inserción al rol anónimo
GRANT INSERT ON TABLE leads TO anon;
GRANT SELECT ON TABLE leads TO anon; -- A veces necesario para el retorno del INSERT

