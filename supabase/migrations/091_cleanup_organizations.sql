-- ===============================================================
-- LIMPIEZA TOTAL: Borrar Organizaciones de Prueba
-- ===============================================================

DO $$
DECLARE
  -- El ID de la organización principal (AMC Agency)
  main_org_id UUID;
BEGIN
  -- 1. Intentar encontrar la organización original "AMC Agency"
  SELECT id INTO main_org_id FROM public.organizations WHERE slug = 'amc-agency' LIMIT 1;

  -- Si no existe, crearla para no dejar datos huérfanos
  IF main_org_id IS NULL THEN
    INSERT INTO public.organizations (name, slug, plan)
    VALUES ('AMC Agency', 'amc-agency', 'enterprise')
    RETURNING id INTO main_org_id;
  END IF;

  -- 2. Mover TODOS los datos importantes a la organización principal
  -- (Para no perder leads o clientes creados durante las pruebas)
  UPDATE public.leads SET organization_id = main_org_id;
  UPDATE public.clients SET organization_id = main_org_id;
  UPDATE public.deals SET organization_id = main_org_id;
  UPDATE public.tasks SET organization_id = main_org_id;
  UPDATE public.projects SET organization_id = main_org_id;
  UPDATE public.activities SET organization_id = main_org_id;
  UPDATE public.documents SET organization_id = main_org_id;
  UPDATE public.user_profiles SET organization_id = main_org_id;

  -- 3. Borrar las organizaciones de prueba (Todo lo que NO sea AMC Agency)
  DELETE FROM public.organizations WHERE id != main_org_id;

  RAISE NOTICE 'Limpieza completada. Todos los datos movidos a AMC Agency y organizaciones extra eliminadas.';
END $$;
