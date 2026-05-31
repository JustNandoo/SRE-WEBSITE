
-- Migration: Add specific staff roles and remove generic admin/staff
-- Path: apps/backend/supabase/migrations/20260531000002_division_staff_accounts.sql

-- 1. Delete generic admin and staff accounts to avoid constraint violations
DELETE FROM public.user_roles WHERE email IN ('admin@sre-pens.com', 'staff@sre-pens.com');
DELETE FROM auth.identities WHERE provider_id IN ('admin@sre-pens.com', 'staff@sre-pens.com');
DELETE FROM auth.users WHERE email IN ('admin@sre-pens.com', 'staff@sre-pens.com');

-- 2. Update the CHECK constraint on user_roles
ALTER TABLE public.user_roles DROP CONSTRAINT IF EXISTS user_roles_role_check;
ALTER TABLE public.user_roles ADD CONSTRAINT user_roles_role_check CHECK (role IN (
  'super-admin', 'p-level', 'secretary', 'treasurer', 'education', 'content-marketing', 
  'crd', 'hr', 'pr', 'graphic-design', 'finance',
  'staff-secretary', 'staff-treasurer', 'staff-education', 'staff-content-marketing',
  'staff-crd', 'staff-hr', 'staff-pr', 'staff-graphic-design', 'staff-finance'
));

-- 3. Insert new division-specific staff accounts

-- Account for staff-secretary
INSERT INTO auth.users (
  instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000', 'f9c93c88-5b3d-448f-9f0a-92cc6c1b43f5', 'authenticated', 'authenticated', 'staffsecretary@sre-pens.com', crypt('staffsecretarySRE2026!', gen_salt('bf')), NOW(), '{"provider":"email","providers":["email"]}', '{"role":"staff-secretary"}', NOW(), NOW()
);

INSERT INTO auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at) VALUES 
('f9c93c88-5b3d-448f-9f0a-92cc6c1b43f5', 'f9c93c88-5b3d-448f-9f0a-92cc6c1b43f5', format('{"sub":"%s","email":"%s"}', 'f9c93c88-5b3d-448f-9f0a-92cc6c1b43f5', 'staffsecretary@sre-pens.com')::jsonb, 'email', 'staffsecretary@sre-pens.com', NOW(), NOW(), NOW());

INSERT INTO public.user_roles (id, email, role, password_text) VALUES 
('f9c93c88-5b3d-448f-9f0a-92cc6c1b43f5', 'staffsecretary@sre-pens.com', 'staff-secretary', 'staffsecretarySRE2026!');

-- Account for staff-treasurer
INSERT INTO auth.users (
  instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000', 'cc75549d-4465-4364-85ae-28f5354a9504', 'authenticated', 'authenticated', 'stafftreasurer@sre-pens.com', crypt('stafftreasurerSRE2026!', gen_salt('bf')), NOW(), '{"provider":"email","providers":["email"]}', '{"role":"staff-treasurer"}', NOW(), NOW()
);

INSERT INTO auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at) VALUES 
('cc75549d-4465-4364-85ae-28f5354a9504', 'cc75549d-4465-4364-85ae-28f5354a9504', format('{"sub":"%s","email":"%s"}', 'cc75549d-4465-4364-85ae-28f5354a9504', 'stafftreasurer@sre-pens.com')::jsonb, 'email', 'stafftreasurer@sre-pens.com', NOW(), NOW(), NOW());

INSERT INTO public.user_roles (id, email, role, password_text) VALUES 
('cc75549d-4465-4364-85ae-28f5354a9504', 'stafftreasurer@sre-pens.com', 'staff-treasurer', 'stafftreasurerSRE2026!');

-- Account for staff-education
INSERT INTO auth.users (
  instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000', '1de60b53-14e7-480c-bfd9-e3e7d610266f', 'authenticated', 'authenticated', 'staffeducation@sre-pens.com', crypt('staffeducationSRE2026!', gen_salt('bf')), NOW(), '{"provider":"email","providers":["email"]}', '{"role":"staff-education"}', NOW(), NOW()
);

INSERT INTO auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at) VALUES 
('1de60b53-14e7-480c-bfd9-e3e7d610266f', '1de60b53-14e7-480c-bfd9-e3e7d610266f', format('{"sub":"%s","email":"%s"}', '1de60b53-14e7-480c-bfd9-e3e7d610266f', 'staffeducation@sre-pens.com')::jsonb, 'email', 'staffeducation@sre-pens.com', NOW(), NOW(), NOW());

INSERT INTO public.user_roles (id, email, role, password_text) VALUES 
('1de60b53-14e7-480c-bfd9-e3e7d610266f', 'staffeducation@sre-pens.com', 'staff-education', 'staffeducationSRE2026!');

-- Account for staff-content-marketing
INSERT INTO auth.users (
  instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000', '31d89b2e-898c-4676-bc53-ec992e829b22', 'authenticated', 'authenticated', 'staffcontentmarketing@sre-pens.com', crypt('staffcontentmarketingSRE2026!', gen_salt('bf')), NOW(), '{"provider":"email","providers":["email"]}', '{"role":"staff-content-marketing"}', NOW(), NOW()
);

INSERT INTO auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at) VALUES 
('31d89b2e-898c-4676-bc53-ec992e829b22', '31d89b2e-898c-4676-bc53-ec992e829b22', format('{"sub":"%s","email":"%s"}', '31d89b2e-898c-4676-bc53-ec992e829b22', 'staffcontentmarketing@sre-pens.com')::jsonb, 'email', 'staffcontentmarketing@sre-pens.com', NOW(), NOW(), NOW());

INSERT INTO public.user_roles (id, email, role, password_text) VALUES 
('31d89b2e-898c-4676-bc53-ec992e829b22', 'staffcontentmarketing@sre-pens.com', 'staff-content-marketing', 'staffcontentmarketingSRE2026!');

-- Account for staff-crd
INSERT INTO auth.users (
  instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000', '278747d0-5341-46c6-9967-a877dc67c98a', 'authenticated', 'authenticated', 'staffcrd@sre-pens.com', crypt('staffcrdSRE2026!', gen_salt('bf')), NOW(), '{"provider":"email","providers":["email"]}', '{"role":"staff-crd"}', NOW(), NOW()
);

INSERT INTO auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at) VALUES 
('278747d0-5341-46c6-9967-a877dc67c98a', '278747d0-5341-46c6-9967-a877dc67c98a', format('{"sub":"%s","email":"%s"}', '278747d0-5341-46c6-9967-a877dc67c98a', 'staffcrd@sre-pens.com')::jsonb, 'email', 'staffcrd@sre-pens.com', NOW(), NOW(), NOW());

INSERT INTO public.user_roles (id, email, role, password_text) VALUES 
('278747d0-5341-46c6-9967-a877dc67c98a', 'staffcrd@sre-pens.com', 'staff-crd', 'staffcrdSRE2026!');

-- Account for staff-hr
INSERT INTO auth.users (
  instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000', '9b2ce719-e431-49f5-b64d-d4f273e44d24', 'authenticated', 'authenticated', 'staffhr@sre-pens.com', crypt('staffhrSRE2026!', gen_salt('bf')), NOW(), '{"provider":"email","providers":["email"]}', '{"role":"staff-hr"}', NOW(), NOW()
);

INSERT INTO auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at) VALUES 
('9b2ce719-e431-49f5-b64d-d4f273e44d24', '9b2ce719-e431-49f5-b64d-d4f273e44d24', format('{"sub":"%s","email":"%s"}', '9b2ce719-e431-49f5-b64d-d4f273e44d24', 'staffhr@sre-pens.com')::jsonb, 'email', 'staffhr@sre-pens.com', NOW(), NOW(), NOW());

INSERT INTO public.user_roles (id, email, role, password_text) VALUES 
('9b2ce719-e431-49f5-b64d-d4f273e44d24', 'staffhr@sre-pens.com', 'staff-hr', 'staffhrSRE2026!');

-- Account for staff-pr
INSERT INTO auth.users (
  instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000', 'f81139c0-ece9-4fa5-bf54-27987ad239b9', 'authenticated', 'authenticated', 'staffpr@sre-pens.com', crypt('staffprSRE2026!', gen_salt('bf')), NOW(), '{"provider":"email","providers":["email"]}', '{"role":"staff-pr"}', NOW(), NOW()
);

INSERT INTO auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at) VALUES 
('f81139c0-ece9-4fa5-bf54-27987ad239b9', 'f81139c0-ece9-4fa5-bf54-27987ad239b9', format('{"sub":"%s","email":"%s"}', 'f81139c0-ece9-4fa5-bf54-27987ad239b9', 'staffpr@sre-pens.com')::jsonb, 'email', 'staffpr@sre-pens.com', NOW(), NOW(), NOW());

INSERT INTO public.user_roles (id, email, role, password_text) VALUES 
('f81139c0-ece9-4fa5-bf54-27987ad239b9', 'staffpr@sre-pens.com', 'staff-pr', 'staffprSRE2026!');

-- Account for staff-graphic-design
INSERT INTO auth.users (
  instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000', 'b66b56d2-e7b3-4162-9347-8813e5737259', 'authenticated', 'authenticated', 'staffgraphicdesign@sre-pens.com', crypt('staffgraphicdesignSRE2026!', gen_salt('bf')), NOW(), '{"provider":"email","providers":["email"]}', '{"role":"staff-graphic-design"}', NOW(), NOW()
);

INSERT INTO auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at) VALUES 
('b66b56d2-e7b3-4162-9347-8813e5737259', 'b66b56d2-e7b3-4162-9347-8813e5737259', format('{"sub":"%s","email":"%s"}', 'b66b56d2-e7b3-4162-9347-8813e5737259', 'staffgraphicdesign@sre-pens.com')::jsonb, 'email', 'staffgraphicdesign@sre-pens.com', NOW(), NOW(), NOW());

INSERT INTO public.user_roles (id, email, role, password_text) VALUES 
('b66b56d2-e7b3-4162-9347-8813e5737259', 'staffgraphicdesign@sre-pens.com', 'staff-graphic-design', 'staffgraphicdesignSRE2026!');

-- Account for staff-finance
INSERT INTO auth.users (
  instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000', '71e0d290-4f2f-4ba9-bf62-ad0e7003a86d', 'authenticated', 'authenticated', 'stafffinance@sre-pens.com', crypt('stafffinanceSRE2026!', gen_salt('bf')), NOW(), '{"provider":"email","providers":["email"]}', '{"role":"staff-finance"}', NOW(), NOW()
);

INSERT INTO auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at) VALUES 
('71e0d290-4f2f-4ba9-bf62-ad0e7003a86d', '71e0d290-4f2f-4ba9-bf62-ad0e7003a86d', format('{"sub":"%s","email":"%s"}', '71e0d290-4f2f-4ba9-bf62-ad0e7003a86d', 'stafffinance@sre-pens.com')::jsonb, 'email', 'stafffinance@sre-pens.com', NOW(), NOW(), NOW());

INSERT INTO public.user_roles (id, email, role, password_text) VALUES 
('71e0d290-4f2f-4ba9-bf62-ad0e7003a86d', 'stafffinance@sre-pens.com', 'staff-finance', 'stafffinanceSRE2026!');
