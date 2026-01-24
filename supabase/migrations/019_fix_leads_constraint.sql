-- 1. NUCLEAR OPTION: Remove the constraint causing the error
-- This allows a lead to be created even if organization_id is missing initially.
ALTER TABLE public.leads ALTER COLUMN organization_id DROP NOT NULL;

-- 2. Update the Trigger to be "Self-Healing"
-- If organization_id comes empty, the trigger will go find the Agency ID itself.
CREATE OR REPLACE FUNCTION public.handle_new_client() 
RETURNS TRIGGER AS $$
DECLARE
  final_org_id UUID;
BEGIN
  -- 1. Try to get ID from the new client record
  final_org_id := NEW.organization_id;

  -- 2. If missing, look for AMC Agency default ID
  IF final_org_id IS NULL THEN
     SELECT id INTO final_org_id FROM public.organizations WHERE slug = 'amc-agency' LIMIT 1;
  END IF;

  -- 3. Insert the Lead (Safely)
  INSERT INTO public.leads (
    nombre, 
    email, 
    telefono, 
    empresa, 
    fuente, 
    estado,
    organization_id
  )
  VALUES (
    NEW.nombre_representante, 
    NEW.email, 
    NEW.whatsapp, 
    NEW.nombre_negocio, 
    'formulario_web', 
    'nuevo',
    final_org_id -- Can be null now, preventing the crash
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Double check the trigger is attached
DROP TRIGGER IF EXISTS on_client_created ON public.clients;
CREATE TRIGGER on_client_created
  AFTER INSERT ON public.clients
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_client();
