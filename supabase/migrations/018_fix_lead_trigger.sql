-- 1. Redefine the function that creates leads from clients
-- This overrides the old one that didn't know about organization_id
CREATE OR REPLACE FUNCTION public.handle_new_client() 
RETURNS TRIGGER AS $$
BEGIN
  -- Insert intro leads table
  INSERT INTO public.leads (
    nombre, 
    email, 
    telefono, 
    empresa, 
    fuente, 
    estado,
    organization_id -- This was missing!
  )
  VALUES (
    NEW.nombre_representante, 
    NEW.email, 
    NEW.whatsapp, 
    NEW.nombre_negocio, 
    'formulario_web'::text, 
    'nuevo'::text,
    NEW.organization_id -- Now we copy it from the client
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Ensure Trigger exists (Just in case)
DROP TRIGGER IF EXISTS on_client_created ON public.clients;
CREATE TRIGGER on_client_created
  AFTER INSERT ON public.clients
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_client();
