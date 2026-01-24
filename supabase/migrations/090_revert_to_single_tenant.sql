-- ===============================================================
-- REVERSIÓN A MODO "AGENCIA ÚNICA" (SINGLE TENANT)
-- ===============================================================
-- Al desactivar RLS (Row Level Security), eliminamos las barreras "SaaS".
-- Ahora, cualquier usuario logueado (tú y tu equipo de ventas) podrá ver
-- TODOS los leads, deals y clientes de la base de datos, sin importar la "organización".
-- Esto devuelve la base de datos a su estado original de "Todo para mí".

ALTER TABLE public.leads DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.deals DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations DISABLE ROW LEVEL SECURITY;

-- Nota: Las columnas 'organization_id' seguirán existiendo pero ya no filtrarán nada.
-- La base de datos vuelve a ser 100% tuya y transparente.
