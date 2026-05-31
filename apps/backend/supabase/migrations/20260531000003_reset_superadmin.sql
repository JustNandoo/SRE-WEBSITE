-- ============================================================
-- FIX: Reset & Ensure Superadmin Account
-- Jalankan di: Supabase Dashboard → SQL Editor
-- ============================================================

-- Step 1: Hapus akun superadmin lama jika ada (bersihkan dulu)
DELETE FROM public.user_roles WHERE email = 'superadmin@sre-pens.com';
DELETE FROM auth.identities WHERE provider_id = 'superadmin@sre-pens.com';
DELETE FROM auth.users WHERE email = 'superadmin@sre-pens.com';

-- Step 2: Buat ulang akun superadmin dengan UUID tetap
INSERT INTO auth.users (
  instance_id, 
  id, 
  aud, 
  role, 
  email, 
  encrypted_password, 
  email_confirmed_at, 
  raw_app_meta_data, 
  raw_user_meta_data, 
  created_at, 
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  'e7b99c0d-c052-442a-8991-89736c05eb77',
  'authenticated',
  'authenticated',
  'superadmin@sre-pens.com',
  crypt('superadminSRE2026!', gen_salt('bf')),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"role":"super-admin"}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Step 3: Buat identity untuk superadmin
INSERT INTO auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  provider_id,
  last_sign_in_at,
  created_at,
  updated_at
) VALUES (
  'e7b99c0d-c052-442a-8991-89736c05eb77',
  'e7b99c0d-c052-442a-8991-89736c05eb77',
  format('{"sub":"%s","email":"%s","email_verified":true}', 'e7b99c0d-c052-442a-8991-89736c05eb77', 'superadmin@sre-pens.com')::jsonb,
  'email',
  'superadmin@sre-pens.com',
  NOW(),
  NOW(),
  NOW()
);

-- Step 4: Pastikan user_roles superadmin ada
INSERT INTO public.user_roles (id, email, role, password_text)
VALUES (
  'e7b99c0d-c052-442a-8991-89736c05eb77',
  'superadmin@sre-pens.com',
  'super-admin',
  'superadminSRE2026!'
);

-- Verifikasi hasilnya
SELECT 
  u.email, 
  u.email_confirmed_at,
  r.role,
  r.password_text
FROM auth.users u
JOIN public.user_roles r ON r.id = u.id
WHERE u.email = 'superadmin@sre-pens.com';
