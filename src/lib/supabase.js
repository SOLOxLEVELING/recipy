import { createClient } from '@supabase/supabase-js';

// NOTE: In a real production app, these should be in environment variables.
// For this portfolio demo, we are initializing them directly.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
