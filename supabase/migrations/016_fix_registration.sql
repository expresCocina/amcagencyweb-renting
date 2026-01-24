-- 1. Relax Constraint: Allow organization_id to be NULL temporarily
-- This is crucial for new users who sign up but haven't chosen an org yet.
ALTER TABLE public.user_profiles ALTER COLUMN organization_id DROP NOT NULL;

-- 2. Update the Trigger Logic
-- Try to auto-assign 'AMC Agency' default org if it exists, otherwise leave NULL (for future SaaS tenants)
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
DECLARE
  default_org UUID;
BEGIN
  -- Attempt to find the default agency org
  SELECT id INTO default_org FROM public.organizations WHERE slug = 'amc-agency' LIMIT 1;

  INSERT INTO public.user_profiles (id, nombre_completo, email, rol, activo, organization_id)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data->>'nombre_representante', -- Map from auth metadata
    NEW.email,
    'cliente', -- Default role
    true,
    default_org -- Will be UUID if found, or NULL if not
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Fix RLS for the Public Registration Page (Inserting into Clients)
-- Since the user inserts into 'clients' table immediately after signup, 
-- but might not have the org_id in their session yet, we need a special policy 
-- OR use a Secure Function.
--
-- HOWEVER, easier fix for now: Allow users to insert rows into 'clients' 
-- if they are the owner of that row (user_id = auth.uid()).
-- And we default the organization_id in a trigger on the clients table too.

CREATE OR REPLACE FUNCTION public.set_client_org()
RETURNS TRIGGER AS $$
BEGIN
  -- If org_id is missing, try to set it from the user's profile or default
  IF NEW.organization_id IS NULL THEN
     -- Try to get from user profile
     SELECT organization_id INTO NEW.organization_id 
     FROM public.user_profiles WHERE id = NEW.user_id;
     
     -- If still null, default to AMC Agency (Safety net for Agency Site)
     IF NEW.organization_id IS NULL THEN
        SELECT id INTO NEW.organization_id FROM public.organizations WHERE slug = 'amc-agency' LIMIT 1;
     END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_client_insert ON public.clients;
CREATE TRIGGER on_client_insert
BEFORE INSERT ON public.clients
FOR EACH ROW EXECUTE FUNCTION public.set_client_org();

-- 4. Update Policy for Clients Table
-- Allow authenticated users to insert their own client record
DROP POLICY IF EXISTS "SaaS: Insert own org clients" ON public.clients;
CREATE POLICY "SaaS: Enable insert for self" ON public.clients
    FOR INSERT WITH CHECK (auth.uid() = user_id); 
    -- We removed the org check here because org is assigned via trigger
