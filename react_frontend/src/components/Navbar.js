import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { signOut } from '../services';

export default function Navbar({ onSearchChange, onOpenAuth }) {
  const { items, toggle } = useCart();
  const { user } = useAuth();
  const [q, setQ] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    onSearchChange(q);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <div className="brand">
          <span className="brand-badge">🌊</span>
          <span>Ocean Shop</span>
        </div>
        <form className="searchbar" onSubmit={onSubmit} role="search" aria-label="Product search">
          <input
            className="input"
            placeholder="Search minimalist products..."
            value={q}
            onChange={e => setQ(e.target.value)}
            aria-label="Search"
          />
          <button className="btn ghost" type="submit">Search</button>
        </form>
        <div className="nav-actions">
          {user ? (
            <>
              <a className="btn ghost" href="/orders" aria-label="Orders">Orders</a>
              <button className="btn ghost" onClick={() => signOut()}>Sign out</button>
            </>
          ) : (
            <button className="btn ghost" onClick={onOpenAuth}>Sign in</button>
          )}
          <button className="btn" onClick={toggle} aria-label="Open cart">
            Cart <span className="badge" aria-label={`${items.length} items in cart`}>{items.length}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
