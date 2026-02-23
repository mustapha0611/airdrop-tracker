// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      // We handle the URL hash manually in authCallBack.vue
      // This prevents the SDK from racing and consuming the hash before our code runs
      detectSessionInUrl: false,
      flowType: 'implicit',
      autoRefreshToken: true,
      persistSession: true
    }
  }
);
