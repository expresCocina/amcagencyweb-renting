-- =================================================================
-- AUTOMATE USER PROFILES (Separation of Concerns)
-- Issue: We need to distinguish between "Clients" (Public) and "Staff" (Admins/Sellers).
-- Solution: Default new users to 'cliente' role. Only Admins can promote them.
-- =================================================================

-- 1. Create the Function that handles the new user event
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, nombre_completo, email, rol, activo)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data->>'full_name', 
    NEW.email,
    'cliente', -- DEFAULT ROLE IS NOW CLIENT (Restricted)
    true
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Create the Trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. Safety: Ensure email column exists
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'email') THEN 
        ALTER TABLE public.user_profiles ADD COLUMN email TEXT; 
    END IF; 
END $$;

-- 4. Backfill emails
UPDATE public.user_profiles 
SET email = (SELECT email FROM auth.users WHERE auth.users.id = public.user_profiles.id)
WHERE email IS NULL;

-- 5. OPTIONAL: If you want to force specific existing users to be admins, you can do it here manually:
-- UPDATE public.user_profiles SET rol = 'admin' WHERE email = 'tu_email@admin.com';
