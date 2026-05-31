import { createBrowserClient } from '@supabase/ssr';

// Custom sessionStorage adapter — session expires when tab/browser is closed
const sessionStorageAdapter = typeof window !== 'undefined'
  ? {
      getItem: (key: string) => window.sessionStorage.getItem(key),
      setItem: (key: string, value: string) => window.sessionStorage.setItem(key, value),
      removeItem: (key: string) => window.sessionStorage.removeItem(key),
    }
  : undefined;

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-project.supabase.co';
  const supabaseAnonKey = 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE1OTg4ODMwMDAsImV4cCI6MTkwNDQ0MzAwMH0.placeholder';

  return createBrowserClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      storage: sessionStorageAdapter,
      persistSession: true, // persist within the same tab session only
      autoRefreshToken: true,
    },
  });
};
