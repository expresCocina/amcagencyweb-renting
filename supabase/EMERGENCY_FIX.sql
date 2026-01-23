-- =====================================================
-- SOLUCIÓN DE EMERGENCIA PARA FORMULARIO DE CONTACTO
-- Ejecuta esto en el SQL Editor de Supabase
-- =====================================================

-- 1. Desactivar RLS momentáneamente para confirmar que este es el problema
-- Si esto funciona, sabemos 100% que era una política mal configurada.
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;

-- 2. Asegurar permisos básicos al rol anónimo para futuras activaciones
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON TABLE leads TO postgres, anon, authenticated, service_role;

-- 3. (Opcional) Volver a activar RLS con una política UNIVERSAL
-- Si prefieres mantener seguridad, descomenta las siguientes líneas:

/*
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Universal Insert" ON leads;

CREATE POLICY "Universal Insert"
ON leads
FOR INSERT
TO public
WITH CHECK (true);
*/
