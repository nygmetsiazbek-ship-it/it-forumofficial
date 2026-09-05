import { createClient } from '@supabase/supabase-js';

// Configure via .env (see .env.example); the values below are the project defaults
// so the app still boots without a local .env file.
const supabaseUrl =
  import.meta.env?.VITE_SUPABASE_URL ?? 'https://ccqpijjnlgvahxqunqpk.supabase.co';
const supabaseAnonKey =
  import.meta.env?.VITE_SUPABASE_ANON_KEY ??
  'sb_publishable_dnmCW6S7bCOaNt6QC4G_6w_tWBZvx4A';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
