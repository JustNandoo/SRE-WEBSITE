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
  console.log("🚀 Starting Supabase Account & Role Initialization...");

  for (const acc of accounts) {
    console.log(`\nCreating / Verifying user: ${acc.email} (${acc.role})...`);
    const { data: authData, error: authErr } = await supabase.auth.signUp({
      email: acc.email,
      password: acc.password,
    });

    if (authErr) {
      if (authErr.message.includes('already registered')) {
        console.log(`✅ User ${acc.email} is already registered in auth.users.`);
      } else {
        console.error(`❌ Error creating user ${acc.email}:`, authErr.message);
      }
    } else if (authData?.user) {
      console.log(`✅ Successfully created auth user ${acc.email} (ID: ${authData.user.id})`);
      
      // Upsert role
      const { error: roleErr } = await supabase.from('user_roles').upsert({
        id: authData.user.id,
        email: acc.email,
        role: acc.role,
      });

      if (roleErr) {
        console.error(`❌ Error assigning role ${acc.role} to ${acc.email}:`, roleErr.message);
      } else {
        console.log(`✅ Successfully assigned role '${acc.role}' to ${acc.email} in public.user_roles`);
      }
    }
  }

  console.log("\n🎉 Account Setup Complete!");
  console.log("Credentials available for login:");
  console.log("-----------------------------------------");
  console.log("Super Admin : superadmin@sre-pens.com / SuperAdminSRE2026!");
  console.log("Admin       : admin@sre-pens.com      / AdminSRE2026!");
  console.log("Staff       : staff@sre-pens.com      / StaffSRE2026!");
  console.log("-----------------------------------------");
}

setup();
