const fs = require('fs');
const crypto = require('crypto');

const divisions = ['secretary', 'treasurer', 'education', 'contentmarketing', 'crd', 'hr', 'pr', 'graphicdesign', 'finance'];

let sql = `
-- Migration: Add specific staff roles and remove generic admin/staff
-- Path: apps/backend/supabase/migrations/20260531000002_division_staff_accounts.sql

-- 1. Delete generic admin and staff accounts
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
`;

divisions.forEach(div => {
  const id = crypto.randomUUID();
  const rawDiv = div === 'contentmarketing' ? 'content-marketing' : div === 'graphicdesign' ? 'graphic-design' : div;
  const roleName = 'staff-' + rawDiv;
  
  sql += `
-- Account for ${roleName}
INSERT INTO auth.users (
  instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000', '${id}', 'authenticated', 'authenticated', 'staff${div}@sre-pens.com', crypt('staff${div}SRE2026!', gen_salt('bf')), NOW(), '{"provider":"email","providers":["email"]}', '{"role":"${roleName}"}', NOW(), NOW()
);

INSERT INTO auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at) VALUES 
('${id}', '${id}', format('{"sub":"%s","email":"%s"}', '${id}', 'staff${div}@sre-pens.com')::jsonb, 'email', 'staff${div}@sre-pens.com', NOW(), NOW(), NOW());

INSERT INTO public.user_roles (id, email, role, password_text) VALUES 
('${id}', 'staff${div}@sre-pens.com', '${roleName}', 'staff${div}SRE2026!');
`;
});

fs.writeFileSync('apps/backend/supabase/migrations/20260531000002_division_staff_accounts.sql', sql, 'utf8');
console.log('Migration generated');
