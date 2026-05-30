-- Migration: Create public.update_own_profile security definer function for secure profile updates from the frontend
-- Path: apps/backend/supabase/migrations/20260531000000_update_own_profile_rpc.sql

CREATE OR REPLACE FUNCTION public.update_own_profile(
  new_email TEXT,
  new_password TEXT
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  encrypted_pw TEXT;
  result JSON;
  current_user_id UUID;
  current_role TEXT;
BEGIN
  current_user_id := auth.uid();

  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'Unauthorized: Must be logged in to update profile';
  END IF;

  -- Hash the new password
  encrypted_pw := crypt(new_password, gen_salt('bf'));

  -- Get current role to preserve it in auth.users metadata
  SELECT role INTO current_role FROM public.user_roles WHERE id = current_user_id;

  -- 1. Update auth.users
  UPDATE auth.users 
  SET 
    email = new_email,
    encrypted_password = encrypted_pw,
    raw_user_meta_data = jsonb_build_object('role', current_role),
    updated_at = NOW()
  WHERE id = current_user_id;

  -- 2. Update auth.identities
  UPDATE auth.identities
  SET 
    identity_data = jsonb_build_object('sub', current_user_id, 'email', new_email),
    provider_id = new_email,
    updated_at = NOW()
  WHERE user_id = current_user_id;

  -- 3. Update public.user_roles (store [ENCRYPTED] instead of raw text to ensure security)
  UPDATE public.user_roles
  SET 
    email = new_email,
    password_text = '[ENCRYPTED]',
    updated_at = NOW()
  WHERE id = current_user_id;

  result := json_build_object('success', true, 'message', 'Profile updated successfully');
  
  RETURN result;
END;
$$;
