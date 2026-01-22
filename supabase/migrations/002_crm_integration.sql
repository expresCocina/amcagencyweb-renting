-- =====================================================
-- CRM Integration: Auto-create Leads from Client Registration
-- =====================================================

-- Function to create a lead when a new client registers
CREATE OR REPLACE FUNCTION create_lead_from_client()
RETURNS TRIGGER AS $$
DECLARE
  new_lead_id UUID;
BEGIN
  -- Insert new lead
  INSERT INTO leads (
    nombre,
    email,
    telefono,
    empresa,
    fuente,
    estado,
    valor_estimado,
    notas
  ) VALUES (
    NEW.nombre_representante,
    NEW.email,
    NEW.whatsapp,
    NEW.nombre_negocio,
    'web',
    'nuevo',
    0,
    'Lead creado automáticamente desde registro web el ' || NOW()::date
  )
  RETURNING id INTO new_lead_id;

  -- Log activity
  INSERT INTO activities (
    tipo,
    titulo,
    descripcion,
    relacionado_con,
    relacionado_id
  ) VALUES (
    'nota',
    'Nuevo lead desde registro web',
    'Lead creado automáticamente: ' || NEW.nombre_negocio,
    'lead',
    new_lead_id::text
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
DROP TRIGGER IF EXISTS auto_create_lead ON clients;
CREATE TRIGGER auto_create_lead
AFTER INSERT ON clients
FOR EACH ROW
EXECUTE FUNCTION create_lead_from_client();

-- =====================================================
-- Sync existing clients as leads (one-time migration)
-- =====================================================

-- This will create leads for all existing clients that don't have one yet
-- Run this ONCE to migrate existing data

INSERT INTO leads (
  nombre,
  email,
  telefono,
  empresa,
  fuente,
  estado,
  valor_estimado,
  notas
)
SELECT 
  COALESCE(c.nombre_representante, c.nombre_negocio, 'Cliente sin nombre'),
  c.email,
  c.whatsapp,
  c.nombre_negocio,
  'web',
  CASE 
    WHEN c.estado_pago = 'activo' THEN 'ganado'
    WHEN c.estado_pago = 'suspendido' THEN 'perdido'
    ELSE 'nuevo'
  END,
  0,
  'Lead migrado desde cliente existente (ID: ' || c.id || ')'
FROM clients c
WHERE NOT EXISTS (
  SELECT 1 FROM leads l 
  WHERE l.email = c.email AND c.email IS NOT NULL
)
AND (c.email IS NOT NULL OR c.nombre_negocio IS NOT NULL);

-- Log migration activity
INSERT INTO activities (tipo, titulo, descripcion, relacionado_con, relacionado_id)
SELECT 
  'nota',
  'Migración de clientes existentes',
  'Se migraron ' || COUNT(*) || ' clientes existentes como leads en el CRM',
  'lead',
  (SELECT id::text FROM leads ORDER BY created_at DESC LIMIT 1)
FROM leads
WHERE notas LIKE '%Lead migrado desde cliente existente%';
