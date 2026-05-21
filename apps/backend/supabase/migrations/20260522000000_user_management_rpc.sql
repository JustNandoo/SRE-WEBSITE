-- Migration: Create public.manage_cms_user security definer function for secure admin user management from the frontend
-- Path: apps/backend/supabase/migrations/20260522000000_user_management_rpc.sql

CREATE OR REPLACE FUNCTION public.manage_cms_user(
  action_type TEXT,
  user_id UUID,
  user_email TEXT,
  user_password TEXT,
  user_role TEXT
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  encrypted_pw TEXT;
  result JSON;
BEGIN
  -- Verify the caller is an authenticated super-admin or p-level
  IF NOT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE id = auth.uid() AND role IN ('super-admin', 'p-level')
  ) THEN
    RAISE EXCEPTION 'Unauthorized: Only super-admin or p-level can manage accounts';
  END IF;

  encrypted_pw := crypt(user_password, gen_salt('bf'));

  IF action_type = 'CREATE' THEN
    -- 1. Insert into auth.users
    INSERT INTO auth.users (
      instance_id, id, aud, role, email, encrypted_password, 
      email_confirmed_at, raw_app_meta_data, raw_user_meta_data, 
      created_at, updated_at
    ) VALUES (
      '00000000-0000-0000-0000-000000000000', user_id, 'authenticated', 'authenticated', 
      user_email, encrypted_pw, NOW(), 
      '{"provider":"email","providers":["email"]}', 
      jsonb_build_object('role', user_role),
      NOW(), NOW()
    );

    -- 2. Insert into auth.identities
    INSERT INTO auth.identities (
      id, user_id, identity_data, provider, provider_id, 
      last_sign_in_at, created_at, updated_at
    ) VALUES (
      user_id, user_id, 
      jsonb_build_object('sub', user_id, 'email', user_email), 
      'email', user_email, NOW(), NOW(), NOW()
    );

    -- 3. Insert into public.user_roles
    INSERT INTO public.user_roles (id, email, role, password_text)
    VALUES (user_id, user_email, user_role, user_password);

    result := json_build_object('success', true, 'message', 'User created successfully');

  ELSIF action_type = 'UPDATE' THEN
    -- 1. Update auth.users
    UPDATE auth.users 
    SET 
      email = user_email,
      encrypted_password = encrypted_pw,
      raw_user_meta_data = jsonb_build_object('role', user_role),
      updated_at = NOW()
    WHERE id = user_id;

    -- 2. Update auth.identities
    UPDATE auth.identities
    SET 
      identity_data = jsonb_build_object('sub', user_id, 'email', user_email),
      provider_id = user_email,
      updated_at = NOW()
    WHERE user_id = user_id;

    -- 3. Update public.user_roles
    UPDATE public.user_roles
    SET 
      email = user_email,
      role = user_role,
      password_text = user_password,
      updated_at = NOW()
    WHERE id = user_id;

    result := json_build_object('success', true, 'message', 'User updated successfully');

  ELSIF action_type = 'DELETE' THEN
    -- 1. Delete public.user_roles
    DELETE FROM public.user_roles WHERE id = user_id;

    -- 2. Delete auth.identities
    DELETE FROM auth.identities WHERE user_id = user_id;

    -- 3. Delete auth.users
    DELETE FROM auth.users WHERE id = user_id;

    result := json_build_object('success', true, 'message', 'User deleted successfully');
  ELSE
    RAISE EXCEPTION 'Invalid action type';
  END IF;

  RETURN result;
END;
$$;
