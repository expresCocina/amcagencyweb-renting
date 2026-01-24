-- 1. Create Organizations Table
CREATE TABLE IF NOT EXISTS public.organizations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL, -- For potential subdomains or URLs (e.g., amc.crm.com)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    plan TEXT DEFAULT 'free' -- free, pro, enterprise
);

-- Enable RLS on organizations
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

-- 2. Create the "Default" Organization (Migration Step)
-- We insert a default org for existing data so we don't lose anything
INSERT INTO public.organizations (name, slug, plan)
VALUES ('AMC Agency', 'amc-agency', 'enterprise')
ON CONFLICT (slug) DO NOTHING;

-- Capture the ID of this new/existing org
DO $$
DECLARE
    default_org_id UUID;
BEGIN
    SELECT id INTO default_org_id FROM public.organizations WHERE slug = 'amc-agency' LIMIT 1;

    -- 3. Link Users to Organization
    -- Add column to user_profiles if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'organization_id') THEN
        ALTER TABLE public.user_profiles 
        ADD COLUMN organization_id UUID REFERENCES public.organizations(id);
        
        -- Migrate existing users to default org
        UPDATE public.user_profiles SET organization_id = default_org_id WHERE organization_id IS NULL;
        
        -- Make it mandatory after migration
        ALTER TABLE public.user_profiles ALTER COLUMN organization_id SET NOT NULL;
    END IF;

    -- 4. Add organization_id to CORE tables
    -- We'll do this for: leads, clients, projects, tasks, activities, deals
    
    -- LEADS
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'organization_id') THEN
        ALTER TABLE public.leads ADD COLUMN organization_id UUID REFERENCES public.organizations(id);
        UPDATE public.leads SET organization_id = default_org_id WHERE organization_id IS NULL;
        ALTER TABLE public.leads ALTER COLUMN organization_id SET NOT NULL;
        CREATE INDEX idx_leads_org ON public.leads(organization_id);
    END IF;

    -- CLIENTS
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'clients' AND column_name = 'organization_id') THEN
        ALTER TABLE public.clients ADD COLUMN organization_id UUID REFERENCES public.organizations(id);
        UPDATE public.clients SET organization_id = default_org_id WHERE organization_id IS NULL;
        ALTER TABLE public.clients ALTER COLUMN organization_id SET NOT NULL;
        CREATE INDEX idx_clients_org ON public.clients(organization_id);
    END IF;

    -- PROJECTS
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'organization_id') THEN
        ALTER TABLE public.projects ADD COLUMN organization_id UUID REFERENCES public.organizations(id);
        UPDATE public.projects SET organization_id = default_org_id WHERE organization_id IS NULL;
        ALTER TABLE public.projects ALTER COLUMN organization_id SET NOT NULL;
         CREATE INDEX idx_projects_org ON public.projects(organization_id);
    END IF;

    -- TASKS
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tasks' AND column_name = 'organization_id') THEN
        ALTER TABLE public.tasks ADD COLUMN organization_id UUID REFERENCES public.organizations(id);
        UPDATE public.tasks SET organization_id = default_org_id WHERE organization_id IS NULL;
        ALTER TABLE public.tasks ALTER COLUMN organization_id SET NOT NULL;
         CREATE INDEX idx_tasks_org ON public.tasks(organization_id);
    END IF;

    -- DEALS
     IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'deals' AND column_name = 'organization_id') THEN
        ALTER TABLE public.deals ADD COLUMN organization_id UUID REFERENCES public.organizations(id);
        UPDATE public.deals SET organization_id = default_org_id WHERE organization_id IS NULL;
        ALTER TABLE public.deals ALTER COLUMN organization_id SET NOT NULL;
         CREATE INDEX idx_deals_org ON public.deals(organization_id);
    END IF;

     -- ACTIVITIES
     IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'activities' AND column_name = 'organization_id') THEN
        ALTER TABLE public.activities ADD COLUMN organization_id UUID REFERENCES public.organizations(id);
        UPDATE public.activities SET organization_id = default_org_id WHERE organization_id IS NULL;
        ALTER TABLE public.activities ALTER COLUMN organization_id SET NOT NULL;
         CREATE INDEX idx_activities_org ON public.activities(organization_id);
    END IF;
    
    -- NOTIFICATIONS
     IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'notifications' AND column_name = 'organization_id') THEN
        ALTER TABLE public.notifications ADD COLUMN organization_id UUID REFERENCES public.organizations(id);
        UPDATE public.notifications SET organization_id = default_org_id WHERE organization_id IS NULL;
        ALTER TABLE public.notifications ALTER COLUMN organization_id SET NOT NULL;
         CREATE INDEX idx_notifications_org ON public.notifications(organization_id);
    END IF;

END $$;

-- 5. Helper Function for RLS
-- Allows us to get the current user's org ID easily
CREATE OR REPLACE FUNCTION public.get_my_org_id()
RETURNS UUID AS $$
BEGIN
  RETURN (SELECT organization_id FROM public.user_profiles WHERE id = auth.uid() LIMIT 1);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Update RLS Policies (The Isolation Layer)
-- Example for Leads (You would repeat this pattern for all tables)

-- DROP existing policies to replace them with Multi-tenant ones
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.leads;
DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON public.leads;
DROP POLICY IF EXISTS "Enable update access for authenticated users" ON public.leads;
DROP POLICY IF EXISTS "Enable delete access for authenticated users" ON public.leads;

-- NEW SaaS Policies for LEADS
CREATE POLICY "SaaS: View own org leads" ON public.leads
    FOR SELECT USING (organization_id = get_my_org_id());

CREATE POLICY "SaaS: Insert own org leads" ON public.leads
    FOR INSERT WITH CHECK (organization_id = get_my_org_id());

CREATE POLICY "SaaS: Update own org leads" ON public.leads
    FOR UPDATE USING (organization_id = get_my_org_id());

CREATE POLICY "SaaS: Delete own org leads" ON public.leads
    FOR DELETE USING (organization_id = get_my_org_id());

-- Repeat similar RLS updates for Clients, Projects, Tasks, etc. in next steps or manually apply similar logic.
-- For safety, this script only updates LEADS policies fully as an example. 
-- IMPORTANT: In a real migration, you must update ALL table policies to include `organization_id = get_my_org_id()`.
