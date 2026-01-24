-- ===============================================================
-- FIX NUCLEAR: MAJORAMO.10@GMAIL.COM
-- ===============================================================

DO $$
DECLARE
  target_email TEXT := 'majoramo.10@gmail.com'; 
  target_user_id UUID;
  recent_org_id UUID;
BEGIN
  -- 1. Buscar el ID del usuario
  SELECT id INTO target_user_id FROM auth.users WHERE email = target_email;
  
  -- 2. Buscar la organización más reciente
  SELECT id INTO recent_org_id FROM public.organizations ORDER BY created_at DESC LIMIT 1;

  IF target_user_id IS NOT NULL THEN
     IF recent_org_id IS NOT NULL THEN
        -- 3. Actualizar el perfil: Hacerlo ADMIN y Vincular a la Organización
        UPDATE public.user_profiles
        SET 
            rol = 'admin', 
            organization_id = recent_org_id
        WHERE id = target_user_id;

        -- 4. Ejecutar el sembrador de datos (para que no salga vacío)
        PERFORM public.seed_new_organization(recent_org_id, target_user_id);

        RAISE NOTICE '✅ FIX COMPLETADO: Usuario % es Admin de % y tiene datos.', target_email, recent_org_id;
     ELSE
        RAISE NOTICE 'ERROR: No se encontró ninguna organización.';
     END IF;
  ELSE
     RAISE NOTICE 'ERROR: Usuario % no encontrado.', target_email;
  END IF;
END $$;
