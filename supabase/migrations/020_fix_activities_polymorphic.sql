-- 1. FIX: The table uses 'relacionado_con' + 'relacionado_id', NOT 'lead_id'
-- We also ensure organization_id is nullable just in case.

ALTER TABLE public.activities ALTER COLUMN organization_id DROP NOT NULL;

CREATE OR REPLACE FUNCTION public.log_new_lead_activity() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.activities (
    relacionado_con,  -- Polymorphic Type
    relacionado_id,   -- Polymorphic ID (Text)
    tipo, 
    titulo, 
    descripcion,
    organization_id
  )
  VALUES (
    'lead',           -- It is a lead
    NEW.id::text,     -- ID cast to text
    'system', 
    'Lead Creado', 
    'El lead ha sido registrado automaticamente desde la web.',
    NEW.organization_id
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Re-bind trigger
DROP TRIGGER IF EXISTS on_lead_created ON public.leads;
CREATE TRIGGER on_lead_created
  AFTER INSERT ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.log_new_lead_activity();
