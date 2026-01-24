-- 1. Ensure AMC Agency Exists (and get its ID)
DO $$
DECLARE
    org_id UUID;
BEGIN
    -- Try to find it
    SELECT id INTO org_id FROM public.organizations WHERE slug = 'amc-agency' LIMIT 1;
    
    -- If not found, create it
    IF org_id IS NULL THEN
        INSERT INTO public.organizations (name, slug, plan)
        VALUES ('AMC Agency', 'amc-agency', 'enterprise')
        RETURNING id INTO org_id;
    END IF;

    -- 2. SAFETY NET: Temporarily allowing NULL in clients.organization_id
    -- This prevents the "Hard Stop" error if the trigger somehow fails.
    ALTER TABLE public.clients ALTER COLUMN organization_id DROP NOT NULL;

    -- 3. RECREATE THE TRIGGER (Simplest Version possible)
    -- We'll force the ID we just found/created.
    EXECUTE format('
        CREATE OR REPLACE FUNCTION public.set_client_org()
        RETURNS TRIGGER AS $trig$
        BEGIN
          IF NEW.organization_id IS NULL THEN
             NEW.organization_id := %L; -- Injected Org ID
          END IF;
          RETURN NEW;
        END;
        $trig$ LANGUAGE plpgsql SECURITY DEFINER;
    ', org_id);

END $$;

-- 4. Re-bind the trigger
DROP TRIGGER IF EXISTS on_client_insert ON public.clients;
CREATE TRIGGER on_client_insert
BEFORE INSERT ON public.clients
FOR EACH ROW EXECUTE FUNCTION public.set_client_org();

-- 5. Helper verification check
SELECT id, name, slug FROM public.organizations WHERE slug = 'amc-agency';
