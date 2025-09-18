import React, { useState } from 'react';
import { signInWithEmail, signUpWithEmail } from '../services';

export default function AuthModal({ open, onClose }) {
  const [email, setEmail] = useState('');
  const [mode, setMode] = useState('signin');
  const [status, setStatus] = useState({ loading: false, message: '' });

  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: '' });
    try {
      if (mode === 'signin') {
        await signInWithEmail(email);
        setStatus({ loading: false, message: 'Magic link sent. Check your email.' });
      } else {
        await signUpWithEmail(email);
        setStatus({ loading: false, message: 'Signup link sent. Check your email.' });
      }
    } catch (err) {
      setStatus({ loading: false, message: err.message || 'Auth error' });
    }
  };

  return (
    <div role="dialog" aria-modal="true" aria-label="Authentication" style={{
      position:'fixed', inset:0, background:'rgba(0,0,0,0.32)', display:'grid', placeItems:'center', zIndex:70
    }}>
      <div className="card" style={{width:'min(96vw, 420px)', background:'#fff'}}>
        <div style={{padding:16, borderBottom:'1px solid var(--color-border)', display:'flex', justifyContent:'space-between'}}>
          <strong>{mode === 'signin' ? 'Sign in' : 'Create account'}</strong>
          <button className="btn ghost" onClick={onClose}>Close</button>
        </div>
        <form onSubmit={submit} style={{padding:16, display:'grid', gap:12}}>
          <input
            className="input"
            placeholder="you@example.com"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button className="btn" type="submit" disabled={status.loading}>
            {status.loading ? 'Please wait...' : (mode === 'signin' ? 'Send sign-in link' : 'Send signup link')}
          </button>
          {status.message && <div className="helper">{status.message}</div>}
          <div className="helper">
            {mode === 'signin' ? (
              <>No account? <button type="button" className="btn ghost" onClick={() => setMode('signup')}>Create one</button></>
            ) : (
              <>Already have an account? <button type="button" className="btn ghost" onClick={() => setMode('signin')}>Sign in</button></>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
