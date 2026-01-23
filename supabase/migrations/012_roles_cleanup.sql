-- =================================================================
-- ROLE CLEANUP & RESET
-- Purpose: Reset EVERYONE to 'cliente' so we start fresh.
-- Future: New users will automatically be 'cliente' thanks to Migration 010.
-- =================================================================

-- 1. Reset ALL existing users to 'cliente'
-- This cleans up the list immediately.
UPDATE public.user_profiles 
SET rol = 'cliente';

-- 2. OPTIONAL: Automatically set specific emails as ADMIN
-- (Replace these emails with your actual admin emails if you know them now,
-- otherwise run this and manually update just your 2 rows in Supabase)

-- UPDATE public.user_profiles 
-- SET rol = 'admin' 
-- WHERE email IN ('tu_email@gmail.com', 'socio@gmail.com');

-- 3. Verify the automation trigger exists (Double Check)
-- This ensures that tomorrow, when 200 clients register, 
-- they strictly land as 'cliente'.
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, nombre_completo, email, rol, activo)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data->>'full_name', 
    NEW.email,
    'cliente', -- GUARANTEED CLIENT ROLE
    true
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
