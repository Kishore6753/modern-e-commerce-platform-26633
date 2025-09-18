import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentSession, onAuthStateChange } from '../services';
const AuthContext = createContext(null);

/**
 * PUBLIC_INTERFACE
 * useAuth
 * Hook to consume auth context.
 */
export function useAuth() {
  /** This is a public function. */
  return useContext(AuthContext);
}

/**
 * PUBLIC_INTERFACE
 * AuthProvider
 * Provides Supabase session to the app and re-renders on auth changes.
 */
export function AuthProvider({ children }) {
  /** This is a public function. */
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsub = () => {};
    (async () => {
      const sess = await getCurrentSession();
      setSession(sess);
      setLoading(false);
      unsub = onAuthStateChange(setSession);
    })();
    return () => unsub();
  }, []);

  const value = { session, user: session?.user || null, loading };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
