-- Optimizar consultas por user_id en tabla clients
CREATE INDEX IF NOT EXISTS idx_clients_user_id ON public.clients(user_id);

-- Optimizar consultas por organization_id (por si acaso)
CREATE INDEX IF NOT EXISTS idx_clients_org_id ON public.clients(organization_id);

-- Re-analizar tabla para actualizar estadísticas
ANALYZE public.clients;
