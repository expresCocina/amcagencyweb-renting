-- ===============================================================
-- UTILIDAD: Borrado Total de Usuario (Para Pruebas)
-- ===============================================================

CREATE OR REPLACE FUNCTION public.force_delete_user(target_email TEXT)
RETURNS void AS $$
DECLARE
  target_user_id UUID;
BEGIN
  -- 1. Buscar el ID del usuario en auth.users
  SELECT id INTO target_user_id FROM auth.users WHERE email = target_email;

  IF target_user_id IS NULL THEN
    RAISE NOTICE 'Usuario no encontrado: %', target_email;
    RETURN;
  END IF;

  -- 2. Borrar datos relacionados (Orden Inverso para evitar errores FK)
  
  -- Borrar Actividades
  DELETE FROM public.activities 
  WHERE relacionado_id = target_user_id::text 
     OR usuario_id = target_user_id
     OR organization_id IN (SELECT organization_id FROM public.user_profiles WHERE id = target_user_id);

  -- Borrar Leads asociados
  DELETE FROM public.leads 
  WHERE organization_id IN (SELECT organization_id FROM public.user_profiles WHERE id = target_user_id);

  -- Borrar Clientes
  DELETE FROM public.clients WHERE user_id = target_user_id;

  -- Borrar Notificaciones
  DELETE FROM public.notifications WHERE user_id = target_user_id;

  -- Borrar Perfil
  DELETE FROM public.user_profiles WHERE id = target_user_id;
  
  -- Borrar Organización (Si es el único miembro/dueño)
  -- Nota: Esto es peligroso para organizaciones compartidas, pero seguro para pruebas SaaS individuales
  DELETE FROM public.organizations 
  WHERE id NOT IN (SELECT organization_id FROM public.user_profiles WHERE organization_id IS NOT NULL);

  -- 3. Finalmente borrar de Auth (Tabla Maestra)
  DELETE FROM auth.users WHERE id = target_user_id;

  RAISE NOTICE 'Usuario % eliminado con exito', target_email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- EJEMPLO DE USO:
-- SELECT public.force_delete_user('tu_email_de_prueba@gmail.com');
