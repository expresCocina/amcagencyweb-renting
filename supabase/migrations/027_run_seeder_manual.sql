-- ===============================================================
-- EJECUTAR SEEDER MANUALMENTE
-- ===============================================================

DO $$
DECLARE
  target_email TEXT := 'majoramo.10@gmail.com'; 
  target_user_id UUID;
  target_org_id UUID;
BEGIN
  -- 1. Buscar usuario
  SELECT id INTO target_user_id FROM auth.users WHERE email = target_email;
  
  -- 2. Buscar su organización
  SELECT organization_id INTO target_org_id FROM public.user_profiles WHERE id = target_user_id;

  IF target_org_id IS NOT NULL THEN
     -- 3. Ejecutar el sembrador
     PERFORM public.seed_new_organization(target_org_id, target_user_id);
     RAISE NOTICE '✅ Datos creados exitosamente para %', target_email;
  ELSE
     RAISE NOTICE '❌ El usuario no tiene organización asignada todavía.';
  END IF;
END $$;
