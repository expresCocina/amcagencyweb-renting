-- Update the User Profile Trigger to handle both Agency and SaaS signups
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
DECLARE
  default_org UUID;
  user_type TEXT;
BEGIN
  -- Get the type from metadata (sent by frontend)
  user_type := NEW.raw_user_meta_data->>'signup_type'; -- 'saas' or null (agency)

  IF user_type = 'saas' THEN
     -- SaaS Users start with NO Organization (NULL)
     -- They will create it in /onboarding
     default_org := NULL;
  
  ELSE
     -- Agency Clients (default) get assigned to AMC Agency automatically
     SELECT id INTO default_org FROM public.organizations WHERE slug = 'amc-agency' LIMIT 1;
  END IF;

  INSERT INTO public.user_profiles (id, nombre_completo, email, rol, activo, organization_id)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'nombre_representante', NEW.raw_user_meta_data->>'full_name', 'Nuevo Usuario'),
    NEW.email,
    CASE WHEN user_type = 'saas' THEN 'admin' ELSE 'cliente' END, -- SaaS users are admins of their future org
    true,
    default_org
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
