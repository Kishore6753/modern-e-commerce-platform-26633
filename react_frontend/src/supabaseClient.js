import { createClient } from '@supabase/supabase-js';

/**
 * PUBLIC_INTERFACE
 * getSupabaseClient
 * Creates and returns a cached Supabase client instance using environment variables.
 * Requires REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_KEY to be set in .env.
 */
let cached;
export function getSupabaseClient() {
  /** This is a public function. */
  if (cached) return cached;
  const url = process.env.REACT_APP_SUPABASE_URL;
  const key = process.env.REACT_APP_SUPABASE_KEY;
  if (!url || !key) {
    console.warn('Supabase: Missing REACT_APP_SUPABASE_URL or REACT_APP_SUPABASE_KEY. Auth features will be disabled.');
  }
  cached = createClient(url || 'http://localhost', key || 'public-anon-key');
  return cached;
}
