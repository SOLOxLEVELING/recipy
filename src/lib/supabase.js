import { createClient } from '@supabase/supabase-js';

// NOTE: In a real production app, these should be in environment variables.
// For this portfolio demo, we are initializing them directly.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://sjymwmmmxmteqtqqurmm.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqeW13bW1teG10ZXF0cXF1cm1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4MzQwMjYsImV4cCI6MjA3OTQxMDAyNn0.vVhCOLE21rCcMDjRFxKXLZl82QcgJ-h9r2HnQwqv9Co";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
