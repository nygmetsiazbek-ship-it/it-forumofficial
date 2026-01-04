import { createClient } from '@supabase/supabase-js';

// Default configuration
let supabaseUrl = 'https://ccqpijjnlgvahxqunqpk.supabase.co';
let supabaseAnonKey = 'sb_publishable_dnmCW6S7bCOaNt6QC4G_6w_tWBZvx4A';

// Safely attempt to read environment variables
try {
  // Check if import.meta.env exists before accessing properties
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    if (import.meta.env.VITE_SUPABASE_URL) {
      supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    }
    if (import.meta.env.VITE_SUPABASE_ANON_KEY) {
      supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    }
  }
} catch (error) {
  console.warn('Could not read environment variables:', error);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
