-- ==============================================================================
-- SRE PENS V2 - COMPLETE SEEDER & ACCOUNT RESET (SESUAI DOKUMEN KREDENSIAL CMS)
-- Cara jalankan: Supabase Dashboard -> SQL Editor -> Run
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. Update/Pastikan CHECK constraint di public.user_roles mencakup semua role
ALTER TABLE public.user_roles DROP CONSTRAINT IF EXISTS user_roles_role_check;
ALTER TABLE public.user_roles ADD CONSTRAINT user_roles_role_check CHECK (role IN (
  'super-admin', 'p-level', 
  'secretary', 'treasurer', 'education', 'content-marketing', 'crd', 'hr', 'pr', 'graphic-design', 'finance',
  'staff-secretary', 'staff-treasurer', 'staff-education', 'staff-content-marketing', 'staff-crd', 'staff-hr', 'staff-pr', 'staff-graphic-design', 'staff-finance'
));

-- 2. Hapus data auth lama untuk menyegarkan seluruh kredensial
DELETE FROM public.user_roles WHERE email IN (
  'superadmin@sre-pens.com', 'plevel@sre-pens.com',
  'secretary@sre-pens.com', 'treasurer@sre-pens.com', 'education@sre-pens.com', 'contentmarketing@sre-pens.com',
  'crd@sre-pens.com', 'hr@sre-pens.com', 'pr@sre-pens.com', 'graphicdesign@sre-pens.com', 'finance@sre-pens.com',
  'staffsecretary@sre-pens.com', 'stafftreasurer@sre-pens.com', 'staffeducation@sre-pens.com', 'staffcontentmarketing@sre-pens.com',
  'staffcrd@sre-pens.com', 'staffhr@sre-pens.com', 'staffpr@sre-pens.com', 'staffgraphicdesign@sre-pens.com', 'stafffinance@sre-pens.com'
);

DELETE FROM auth.identities WHERE provider_id IN (
  'superadmin@sre-pens.com', 'plevel@sre-pens.com',
  'secretary@sre-pens.com', 'treasurer@sre-pens.com', 'education@sre-pens.com', 'contentmarketing@sre-pens.com',
  'crd@sre-pens.com', 'hr@sre-pens.com', 'pr@sre-pens.com', 'graphicdesign@sre-pens.com', 'finance@sre-pens.com',
  'staffsecretary@sre-pens.com', 'stafftreasurer@sre-pens.com', 'staffeducation@sre-pens.com', 'staffcontentmarketing@sre-pens.com',
  'staffcrd@sre-pens.com', 'staffhr@sre-pens.com', 'staffpr@sre-pens.com', 'staffgraphicdesign@sre-pens.com', 'stafffinance@sre-pens.com'
);

DELETE FROM auth.users WHERE email IN (
  'superadmin@sre-pens.com', 'plevel@sre-pens.com',
  'secretary@sre-pens.com', 'treasurer@sre-pens.com', 'education@sre-pens.com', 'contentmarketing@sre-pens.com',
  'crd@sre-pens.com', 'hr@sre-pens.com', 'pr@sre-pens.com', 'graphicdesign@sre-pens.com', 'finance@sre-pens.com',
  'staffsecretary@sre-pens.com', 'stafftreasurer@sre-pens.com', 'staffeducation@sre-pens.com', 'staffcontentmarketing@sre-pens.com',
  'staffcrd@sre-pens.com', 'staffhr@sre-pens.com', 'staffpr@sre-pens.com', 'staffgraphicdesign@sre-pens.com', 'stafffinance@sre-pens.com'
);

-- 3. INSERT INTO auth.users
INSERT INTO auth.users (
  instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) VALUES 
-- Super Admin & P-Level
('00000000-0000-0000-0000-000000000000', 'e7b99c0d-c052-442a-8991-89736c05eb77', 'authenticated', 'authenticated', 'superadmin@sre-pens.com', crypt('superadminSRE2026!', gen_salt('bf')), NOW(), '{"provider":"email","providers":["email"]}', '{"role":"super-admin"}', NOW(), NOW(), '', '', '', ''),
('00000000-0000-0000-0000-000000000000', 'd3b84f2b-b8c1-4c6e-8260-15cc9bf6028a', 'authenticated', 'authenticated', 'plevel@sre-pens.com', crypt('plevelSRE2026!', gen_salt('bf')), NOW(), '{"provider":"email","providers":["email"]}', '{"role":"p-level"}', NOW(), NOW(), '', '', '', ''),

-- Akun Koordinator Divisi (Full CRUD)
('00000000-0000-0000-0000-000000000000', 'a4f91040-df2b-42ab-b78b-d779cbde4f33', 'authenticated', 'authenticated', 'secretary@sre-pens.com', crypt('secretarySRE2026!', gen_salt('bf')), NOW(), '{"provider":"email","providers":["email"]}', '{"role":"secretary"}', NOW(), NOW(), '', '', '', ''),
('00000000-0000-0000-0000-000000000000', 'dbe49102-127e-4001-9c88-b22da19fbc74', 'authenticated', 'authenticated', 'treasurer@sre-pens.com', crypt('treasurerSRE2026!', gen_salt('bf')), NOW(), '{"provider":"email","providers":["email"]}', '{"role":"treasurer"}', NOW(), NOW(), '', '', '', ''),
('00000000-0000-0000-0000-000000000000', 'c3cf1d0f-488f-4cfc-b847-e17f0a8d6e99', 'authenticated', 'authenticated', 'education@sre-pens.com', crypt('educationSRE2026!', gen_salt('bf')), NOW(), '{"provider":"email","providers":["email"]}', '{"role":"education"}', NOW(), NOW(), '', '', '', ''),
('00000000-0000-0000-0000-000000000000', '87f651d2-092f-410a-9d90-ba3e1dbf3df4', 'authenticated', 'authenticated', 'contentmarketing@sre-pens.com', crypt('contentmarketingSRE2026!', gen_salt('bf')), NOW(), '{"provider":"email","providers":["email"]}', '{"role":"content-marketing"}', NOW(), NOW(), '', '', '', ''),
('00000000-0000-0000-0000-000000000000', '3b9f49ac-f21e-450f-ba1c-ea23df1f0ca3', 'authenticated', 'authenticated', 'crd@sre-pens.com', crypt('crdSRE2026!', gen_salt('bf')), NOW(), '{"provider":"email","providers":["email"]}', '{"role":"crd"}', NOW(), NOW(), '', '', '', ''),
('00000000-0000-0000-0000-000000000000', '7d9bc4a3-de01-4467-9fb8-a62bbcc2fca4', 'authenticated', 'authenticated', 'hr@sre-pens.com', crypt('hrSRE2026!', gen_salt('bf')), NOW(), '{"provider":"email","providers":["email"]}', '{"role":"hr"}', NOW(), NOW(), '', '', '', ''),
('00000000-0000-0000-0000-000000000000', 'e62a2bb7-f58d-4cb8-9cb8-6f9c49a35c06', 'authenticated', 'authenticated', 'pr@sre-pens.com', crypt('prSRE2026!', gen_salt('bf')), NOW(), '{"provider":"email","providers":["email"]}', '{"role":"pr"}', NOW(), NOW(), '', '', '', ''),
('00000000-0000-0000-0000-000000000000', 'b8c14c6e-8260-4b2b-15cc-9bf6028ad3b8', 'authenticated', 'authenticated', 'graphicdesign@sre-pens.com', crypt('graphicdesignSRE2026!', gen_salt('bf')), NOW(), '{"provider":"email","providers":["email"]}', '{"role":"graphic-design"}', NOW(), NOW(), '', '', '', ''),
('00000000-0000-0000-0000-000000000000', '9d2cb390-1c0b-4d45-9833-2895ea9f5e1f', 'authenticated', 'authenticated', 'finance@sre-pens.com', crypt('financeSRE2026!', gen_salt('bf')), NOW(), '{"provider":"email","providers":["email"]}', '{"role":"finance"}', NOW(), NOW(), '', '', '', ''),

-- Akun Staff Per-Divisi (Read-Only)
('00000000-0000-0000-0000-000000000000', 'f9c93c88-5b3d-448f-9f0a-92cc6c1b43f5', 'authenticated', 'authenticated', 'staffsecretary@sre-pens.com', crypt('staffsecretarySRE2026!', gen_salt('bf')), NOW(), '{"provider":"email","providers":["email"]}', '{"role":"staff-secretary"}', NOW(), NOW(), '', '', '', ''),
('00000000-0000-0000-0000-000000000000', 'cc75549d-4465-4364-85ae-28f5354a9504', 'authenticated', 'authenticated', 'stafftreasurer@sre-pens.com', crypt('stafftreasurerSRE2026!', gen_salt('bf')), NOW(), '{"provider":"email","providers":["email"]}', '{"role":"staff-treasurer"}', NOW(), NOW(), '', '', '', ''),
('00000000-0000-0000-0000-000000000000', '1de60b53-14e7-480c-bfd9-e3e7d610266f', 'authenticated', 'authenticated', 'staffeducation@sre-pens.com', crypt('staffeducationSRE2026!', gen_salt('bf')), NOW(), '{"provider":"email","providers":["email"]}', '{"role":"staff-education"}', NOW(), NOW(), '', '', '', ''),
('00000000-0000-0000-0000-000000000000', '4e2b819a-5f3c-4d2a-8b1e-9f0a1b2c3d4e', 'authenticated', 'authenticated', 'staffcontentmarketing@sre-pens.com', crypt('staffcontentmarketingSRE2026!', gen_salt('bf')), NOW(), '{"provider":"email","providers":["email"]}', '{"role":"staff-content-marketing"}', NOW(), NOW(), '', '', '', ''),
('00000000-0000-0000-0000-000000000000', '5f3c920b-6a4d-5e3b-9c2f-0a1b2c3d4e5f', 'authenticated', 'authenticated', 'staffcrd@sre-pens.com', crypt('staffcrdSRE2026!', gen_salt('bf')), NOW(), '{"provider":"email","providers":["email"]}', '{"role":"staff-crd"}', NOW(), NOW(), '', '', '', ''),
('00000000-0000-0000-0000-000000000000', '6a4d031c-7b5e-6f4c-0d3a-1b2c3d4e5f6a', 'authenticated', 'authenticated', 'staffhr@sre-pens.com', crypt('staffhrSRE2026!', gen_salt('bf')), NOW(), '{"provider":"email","providers":["email"]}', '{"role":"staff-hr"}', NOW(), NOW(), '', '', '', ''),
('00000000-0000-0000-0000-000000000000', '7b5e142d-8c6f-7a5d-1e4b-2c3d4e5f6a7b', 'authenticated', 'authenticated', 'staffpr@sre-pens.com', crypt('staffprSRE2026!', gen_salt('bf')), NOW(), '{"provider":"email","providers":["email"]}', '{"role":"staff-pr"}', NOW(), NOW(), '', '', '', ''),
('00000000-0000-0000-0000-000000000000', '8c6f253e-9d7a-8b6e-2f5c-3d4e5f6a7b8c', 'authenticated', 'authenticated', 'staffgraphicdesign@sre-pens.com', crypt('staffgraphicdesignSRE2026!', gen_salt('bf')), NOW(), '{"provider":"email","providers":["email"]}', '{"role":"staff-graphic-design"}', NOW(), NOW(), '', '', '', ''),
('00000000-0000-0000-0000-000000000000', '9d7a364f-0e8b-9c7f-3a6d-4e5f6a7b8c9d', 'authenticated', 'authenticated', 'stafffinance@sre-pens.com', crypt('stafffinanceSRE2026!', gen_salt('bf')), NOW(), '{"provider":"email","providers":["email"]}', '{"role":"staff-finance"}', NOW(), NOW(), '', '', '', '');

-- 4. INSERT INTO auth.identities
INSERT INTO auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at) VALUES 
('e7b99c0d-c052-442a-8991-89736c05eb77', 'e7b99c0d-c052-442a-8991-89736c05eb77', format('{"sub":"%s","email":"%s","email_verified":true}', 'e7b99c0d-c052-442a-8991-89736c05eb77', 'superadmin@sre-pens.com')::jsonb, 'email', 'superadmin@sre-pens.com', NOW(), NOW(), NOW()),
('d3b84f2b-b8c1-4c6e-8260-15cc9bf6028a', 'd3b84f2b-b8c1-4c6e-8260-15cc9bf6028a', format('{"sub":"%s","email":"%s","email_verified":true}', 'd3b84f2b-b8c1-4c6e-8260-15cc9bf6028a', 'plevel@sre-pens.com')::jsonb, 'email', 'plevel@sre-pens.com', NOW(), NOW(), NOW()),

('a4f91040-df2b-42ab-b78b-d779cbde4f33', 'a4f91040-df2b-42ab-b78b-d779cbde4f33', format('{"sub":"%s","email":"%s","email_verified":true}', 'a4f91040-df2b-42ab-b78b-d779cbde4f33', 'secretary@sre-pens.com')::jsonb, 'email', 'secretary@sre-pens.com', NOW(), NOW(), NOW()),
('dbe49102-127e-4001-9c88-b22da19fbc74', 'dbe49102-127e-4001-9c88-b22da19fbc74', format('{"sub":"%s","email":"%s","email_verified":true}', 'dbe49102-127e-4001-9c88-b22da19fbc74', 'treasurer@sre-pens.com')::jsonb, 'email', 'treasurer@sre-pens.com', NOW(), NOW(), NOW()),
('c3cf1d0f-488f-4cfc-b847-e17f0a8d6e99', 'c3cf1d0f-488f-4cfc-b847-e17f0a8d6e99', format('{"sub":"%s","email":"%s","email_verified":true}', 'c3cf1d0f-488f-4cfc-b847-e17f0a8d6e99', 'education@sre-pens.com')::jsonb, 'email', 'education@sre-pens.com', NOW(), NOW(), NOW()),
('87f651d2-092f-410a-9d90-ba3e1dbf3df4', '87f651d2-092f-410a-9d90-ba3e1dbf3df4', format('{"sub":"%s","email":"%s","email_verified":true}', '87f651d2-092f-410a-9d90-ba3e1dbf3df4', 'contentmarketing@sre-pens.com')::jsonb, 'email', 'contentmarketing@sre-pens.com', NOW(), NOW(), NOW()),
('3b9f49ac-f21e-450f-ba1c-ea23df1f0ca3', '3b9f49ac-f21e-450f-ba1c-ea23df1f0ca3', format('{"sub":"%s","email":"%s","email_verified":true}', '3b9f49ac-f21e-450f-ba1c-ea23df1f0ca3', 'crd@sre-pens.com')::jsonb, 'email', 'crd@sre-pens.com', NOW(), NOW(), NOW()),
('7d9bc4a3-de01-4467-9fb8-a62bbcc2fca4', '7d9bc4a3-de01-4467-9fb8-a62bbcc2fca4', format('{"sub":"%s","email":"%s","email_verified":true}', '7d9bc4a3-de01-4467-9fb8-a62bbcc2fca4', 'hr@sre-pens.com')::jsonb, 'email', 'hr@sre-pens.com', NOW(), NOW(), NOW()),
('e62a2bb7-f58d-4cb8-9cb8-6f9c49a35c06', 'e62a2bb7-f58d-4cb8-9cb8-6f9c49a35c06', format('{"sub":"%s","email":"%s","email_verified":true}', 'e62a2bb7-f58d-4cb8-9cb8-6f9c49a35c06', 'pr@sre-pens.com')::jsonb, 'email', 'pr@sre-pens.com', NOW(), NOW(), NOW()),
('b8c14c6e-8260-4b2b-15cc-9bf6028ad3b8', 'b8c14c6e-8260-4b2b-15cc-9bf6028ad3b8', format('{"sub":"%s","email":"%s","email_verified":true}', 'b8c14c6e-8260-4b2b-15cc-9bf6028ad3b8', 'graphicdesign@sre-pens.com')::jsonb, 'email', 'graphicdesign@sre-pens.com', NOW(), NOW(), NOW()),
('9d2cb390-1c0b-4d45-9833-2895ea9f5e1f', '9d2cb390-1c0b-4d45-9833-2895ea9f5e1f', format('{"sub":"%s","email":"%s","email_verified":true}', '9d2cb390-1c0b-4d45-9833-2895ea9f5e1f', 'finance@sre-pens.com')::jsonb, 'email', 'finance@sre-pens.com', NOW(), NOW(), NOW()),

('f9c93c88-5b3d-448f-9f0a-92cc6c1b43f5', 'f9c93c88-5b3d-448f-9f0a-92cc6c1b43f5', format('{"sub":"%s","email":"%s","email_verified":true}', 'f9c93c88-5b3d-448f-9f0a-92cc6c1b43f5', 'staffsecretary@sre-pens.com')::jsonb, 'email', 'staffsecretary@sre-pens.com', NOW(), NOW(), NOW()),
('cc75549d-4465-4364-85ae-28f5354a9504', 'cc75549d-4465-4364-85ae-28f5354a9504', format('{"sub":"%s","email":"%s","email_verified":true}', 'cc75549d-4465-4364-85ae-28f5354a9504', 'stafftreasurer@sre-pens.com')::jsonb, 'email', 'stafftreasurer@sre-pens.com', NOW(), NOW(), NOW()),
('1de60b53-14e7-480c-bfd9-e3e7d610266f', '1de60b53-14e7-480c-bfd9-e3e7d610266f', format('{"sub":"%s","email":"%s","email_verified":true}', '1de60b53-14e7-480c-bfd9-e3e7d610266f', 'staffeducation@sre-pens.com')::jsonb, 'email', 'staffeducation@sre-pens.com', NOW(), NOW(), NOW()),
('4e2b819a-5f3c-4d2a-8b1e-9f0a1b2c3d4e', '4e2b819a-5f3c-4d2a-8b1e-9f0a1b2c3d4e', format('{"sub":"%s","email":"%s","email_verified":true}', '4e2b819a-5f3c-4d2a-8b1e-9f0a1b2c3d4e', 'staffcontentmarketing@sre-pens.com')::jsonb, 'email', 'staffcontentmarketing@sre-pens.com', NOW(), NOW(), NOW()),
('5f3c920b-6a4d-5e3b-9c2f-0a1b2c3d4e5f', '5f3c920b-6a4d-5e3b-9c2f-0a1b2c3d4e5f', format('{"sub":"%s","email":"%s","email_verified":true}', '5f3c920b-6a4d-5e3b-9c2f-0a1b2c3d4e5f', 'staffcrd@sre-pens.com')::jsonb, 'email', 'staffcrd@sre-pens.com', NOW(), NOW(), NOW()),
('6a4d031c-7b5e-6f4c-0d3a-1b2c3d4e5f6a', '6a4d031c-7b5e-6f4c-0d3a-1b2c3d4e5f6a', format('{"sub":"%s","email":"%s","email_verified":true}', '6a4d031c-7b5e-6f4c-0d3a-1b2c3d4e5f6a', 'staffhr@sre-pens.com')::jsonb, 'email', 'staffhr@sre-pens.com', NOW(), NOW(), NOW()),
('7b5e142d-8c6f-7a5d-1e4b-2c3d4e5f6a7b', '7b5e142d-8c6f-7a5d-1e4b-2c3d4e5f6a7b', format('{"sub":"%s","email":"%s","email_verified":true}', '7b5e142d-8c6f-7a5d-1e4b-2c3d4e5f6a7b', 'staffpr@sre-pens.com')::jsonb, 'email', 'staffpr@sre-pens.com', NOW(), NOW(), NOW()),
('8c6f253e-9d7a-8b6e-2f5c-3d4e5f6a7b8c', '8c6f253e-9d7a-8b6e-2f5c-3d4e5f6a7b8c', format('{"sub":"%s","email":"%s","email_verified":true}', '8c6f253e-9d7a-8b6e-2f5c-3d4e5f6a7b8c', 'staffgraphicdesign@sre-pens.com')::jsonb, 'email', 'staffgraphicdesign@sre-pens.com', NOW(), NOW(), NOW()),
('9d7a364f-0e8b-9c7f-3a6d-4e5f6a7b8c9d', '9d7a364f-0e8b-9c7f-3a6d-4e5f6a7b8c9d', format('{"sub":"%s","email":"%s","email_verified":true}', '9d7a364f-0e8b-9c7f-3a6d-4e5f6a7b8c9d', 'stafffinance@sre-pens.com')::jsonb, 'email', 'stafffinance@sre-pens.com', NOW(), NOW(), NOW());

-- 5. INSERT INTO public.user_roles
INSERT INTO public.user_roles (id, email, role, password_text) VALUES 
('e7b99c0d-c052-442a-8991-89736c05eb77', 'superadmin@sre-pens.com', 'super-admin', 'superadminSRE2026!'),
('d3b84f2b-b8c1-4c6e-8260-15cc9bf6028a', 'plevel@sre-pens.com', 'p-level', 'plevelSRE2026!'),

('a4f91040-df2b-42ab-b78b-d779cbde4f33', 'secretary@sre-pens.com', 'secretary', 'secretarySRE2026!'),
('dbe49102-127e-4001-9c88-b22da19fbc74', 'treasurer@sre-pens.com', 'treasurer', 'treasurerSRE2026!'),
('c3cf1d0f-488f-4cfc-b847-e17f0a8d6e99', 'education@sre-pens.com', 'education', 'educationSRE2026!'),
('87f651d2-092f-410a-9d90-ba3e1dbf3df4', 'contentmarketing@sre-pens.com', 'content-marketing', 'contentmarketingSRE2026!'),
('3b9f49ac-f21e-450f-ba1c-ea23df1f0ca3', 'crd@sre-pens.com', 'crd', 'crdSRE2026!'),
('7d9bc4a3-de01-4467-9fb8-a62bbcc2fca4', 'hr@sre-pens.com', 'hr', 'hrSRE2026!'),
('e62a2bb7-f58d-4cb8-9cb8-6f9c49a35c06', 'pr@sre-pens.com', 'pr', 'prSRE2026!'),
('b8c14c6e-8260-4b2b-15cc-9bf6028ad3b8', 'graphicdesign@sre-pens.com', 'graphic-design', 'graphicdesignSRE2026!'),
('9d2cb390-1c0b-4d45-9833-2895ea9f5e1f', 'finance@sre-pens.com', 'finance', 'financeSRE2026!'),

('f9c93c88-5b3d-448f-9f0a-92cc6c1b43f5', 'staffsecretary@sre-pens.com', 'staff-secretary', 'staffsecretarySRE2026!'),
('cc75549d-4465-4364-85ae-28f5354a9504', 'stafftreasurer@sre-pens.com', 'staff-treasurer', 'stafftreasurerSRE2026!'),
('1de60b53-14e7-480c-bfd9-e3e7d610266f', 'staffeducation@sre-pens.com', 'staff-education', 'staffeducationSRE2026!'),
('4e2b819a-5f3c-4d2a-8b1e-9f0a1b2c3d4e', 'staffcontentmarketing@sre-pens.com', 'staff-content-marketing', 'staffcontentmarketingSRE2026!'),
('5f3c920b-6a4d-5e3b-9c2f-0a1b2c3d4e5f', 'staffcrd@sre-pens.com', 'staff-crd', 'staffcrdSRE2026!'),
('6a4d031c-7b5e-6f4c-0d3a-1b2c3d4e5f6a', 'staffhr@sre-pens.com', 'staff-hr', 'staffhrSRE2026!'),
('7b5e142d-8c6f-7a5d-1e4b-2c3d4e5f6a7b', 'staffpr@sre-pens.com', 'staff-pr', 'staffprSRE2026!'),
('8c6f253e-9d7a-8b6e-2f5c-3d4e5f6a7b8c', 'staffgraphicdesign@sre-pens.com', 'staff-graphic-design', 'staffgraphicdesignSRE2026!'),
('9d7a364f-0e8b-9c7f-3a6d-4e5f6a7b8c9d', 'stafffinance@sre-pens.com', 'staff-finance', 'stafffinanceSRE2026!');

-- 6. TAMPILKAN HASIL RESEED SEBAGAI VERIFIKASI
SELECT 
  u.email, 
  r.role,
  r.password_text AS plain_password,
  u.email_confirmed_at
FROM auth.users u
JOIN public.user_roles r ON r.id = u.id
ORDER BY r.role ASC;
