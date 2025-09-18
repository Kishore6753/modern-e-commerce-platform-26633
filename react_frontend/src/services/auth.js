import { getSupabaseClient } from '../supabaseClient';

/**
 * PUBLIC_INTERFACE
 * getCurrentSession
 * Retrieves the current Supabase auth session (or null if not authenticated).
 */
export async function getCurrentSession() {
  /** This is a public function. */
  const supabase = getSupabaseClient();
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data?.session ?? null;
  } catch (e) {
    console.warn('Auth:getCurrentSession failed:', e.message);
    return null;
  }
}

/**
 * PUBLIC_INTERFACE
 * onAuthStateChange
 * Subscribes to Supabase auth state changes and invokes the provided callback with the current session.
 * Returns an unsubscribe function to stop listening.
 */
export function onAuthStateChange(callback) {
  /** This is a public function. */
  const supabase = getSupabaseClient();
  const { data: listener } = supabase.auth.onAuthStateChange(async (_event, _session) => {
    // Get the latest session to ensure consistency.
    const { data } = await supabase.auth.getSession();
    callback(data?.session ?? null);
  });
  return () => {
    try {
      listener?.subscription?.unsubscribe?.();
    } catch {
      // no-op
    }
  };
}

/**
 * PUBLIC_INTERFACE
 * signInWithEmail
 * Sends a magic link sign-in email to the provided address.
 * Uses REACT_APP_SITE_URL as redirect base if defined, falls back to current origin.
 */
export async function signInWithEmail(email) {
  /** This is a public function. */
  const supabase = getSupabaseClient();
  const redirectTo = process.env.REACT_APP_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : undefined);
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectTo,
    },
  });
  if (error) throw error;
  return true;
}

/**
 * PUBLIC_INTERFACE
 * signUpWithEmail
 * Initiates a passwordless signup flow using email magic link.
 */
export async function signUpWithEmail(email) {
  /** This is a public function. */
  const supabase = getSupabaseClient();
  const redirectTo = process.env.REACT_APP_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : undefined);
  const { error } = await supabase.auth.signUp({
    email,
    options: {
      emailRedirectTo: redirectTo,
    },
  });
  if (error) throw error;
  return true;
}

/**
 * PUBLIC_INTERFACE
 * signOut
 * Signs out the current user.
 */
export async function signOut() {
  /** This is a public function. */
  const supabase = getSupabaseClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  return true;
}
