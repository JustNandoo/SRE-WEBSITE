import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cvrjgkpjlrqriisillwx.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_2FvEwmcddXGN7Aec7qNM1w_4RdlwVrd';

const supabase = createClient(supabaseUrl, supabaseKey);

const accounts = [
  { email: 'superadmin@sre-pens.com', password: 'SuperAdminSRE2026!', role: 'super-admin' },
  { email: 'admin@sre-pens.com', password: 'AdminSRE2026!', role: 'admin' },
  { email: 'staff@sre-pens.com', password: 'StaffSRE2026!', role: 'staff' },
];

async function setup() {
  console.log("🚀 Starting Supabase Account & Role Verification...");

  for (const acc of accounts) {
    console.log(`\nVerifying auth user: ${acc.email} (${acc.role})...`);
    const { data: authData, error: authErr } = await supabase.auth.signUp({
      email: acc.email,
      password: acc.password,
    });

    if (authErr && !authErr.message.includes('already registered')) {
      console.error(`❌ Error creating user ${acc.email}:`, authErr.message);
    } else {
      console.log(`✅ Auth user ${acc.email} verified.`);
      if (authData?.user?.id) {
        // Upsert role with password_text
        const { error: roleErr } = await supabase.from('user_roles').upsert({
          id: authData.user.id,
          email: acc.email,
          role: acc.role,
          password_text: acc.password,
        });

        if (roleErr) {
          console.error(`❌ Error updating public.user_roles for ${acc.email}:`, roleErr.message);
        } else {
          console.log(`✅ Successfully synced role '${acc.role}' and password hint for ${acc.email}`);
        }
      }
    }
  }

  console.log("\n🎉 Verification Complete! For complete initialization, please run the SQL migration in Supabase SQL editor.");
}

setup();
