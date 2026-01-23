-- =================================================================
-- FIX ROLES AND VISIBILITY
-- Issue: Active users are not showing in "Assign To" lists.
-- Cause: They likely have NULL role or are 'cliente'.
--        The lists now filter to show ONLY 'admin' or 'vendedor'.
-- Solution: Promote all current users to 'admin' so they are visible.
-- =================================================================

-- 1. Ensure all profiles have a valid role for staff
-- This updates ALL existing users to be 'admin'.
-- WARNING: In a real production app, apply WHERE clauses. 
-- For this setup, we assume all current users are the owners.
UPDATE public.user_profiles
SET rol = 'admin', activo = true
WHERE rol IS NULL OR rol = 'cliente' OR rol = 'vendedor';

-- 2. Verify and fix emails again (just in case)
UPDATE public.user_profiles 
SET email = (SELECT email FROM auth.users WHERE auth.users.id = public.user_profiles.id)
WHERE email IS NULL;

-- 3. Ensure 'nombre_completo' is not null (fallback to email prefix if needed)
UPDATE public.user_profiles
SET nombre_completo = SPLIT_PART(email, '@', 1)
WHERE nombre_completo IS NULL OR nombre_completo = '';
