-- ===============================================================
-- SEEDER: Generador de Datos de Prueba para Nuevas Empresas
-- ===============================================================

CREATE OR REPLACE FUNCTION public.seed_new_organization(target_org_id UUID, target_user_id UUID)
RETURNS void AS $$
DECLARE
  v_lead_id UUID;
BEGIN
  -- 1. Crear 2 Leads de Ejemplo
  INSERT INTO public.leads (nombre, email, telefono, empresa, fuente, estado, organization_id, asignado_a)
  VALUES 
  ('Juan Pérez', 'juan.perez@ejemplo.com', '3001234567', 'Inversiones SAS', 'web', 'nuevo', target_org_id, target_user_id)
  RETURNING id INTO v_lead_id;

  INSERT INTO public.leads (nombre, email, telefono, empresa, fuente, estado, organization_id, asignado_a)
  VALUES 
  ('Empresa Demo', 'contacto@demo.com', '3109876543', 'Tech Solutions', 'referido', 'calificado', target_org_id, target_user_id);

  -- 2. Crear un Deal (Negocio) activo
  INSERT INTO public.deals (titulo, descripcion, valor, etapa, probabilidad, fecha_estimada_cierre, lead_id, organization_id, asignado_a)
  VALUES 
  ('Implementación CRM', 'Proyecto piloto de implementación', 1500000, 'propuesta', 60, NOW() + INTERVAL '15 days', v_lead_id, target_org_id, target_user_id);

  -- 3. Crear una Tarea de Bienvenida
  INSERT INTO public.tasks (titulo, descripcion, tipo, prioridad, estado, fecha_vencimiento, organization_id, asignado_a, creado_por)
  VALUES 
  ('👋 Configurar mi perfil', 'Sube tu foto y completa los datos de tu empresa.', 'sistema', 'alta', 'pendiente', NOW() + INTERVAL '24 hours', target_org_id, target_user_id, target_user_id);

  RAISE NOTICE 'Datos de prueba sembrados para la org %', target_org_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
