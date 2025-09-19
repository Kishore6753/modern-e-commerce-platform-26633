import React, { useEffect, useRef, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { signOut } from '../services';
import { FiUser, FiShoppingCart, FiChevronRight } from 'react-icons/fi';

/**
 * Header/navbar renders a single top row:
 * Category | Brand | Search | Sign-in/Orders | Cart
 * Adds a minimalist Category dropdown opening to the right with options:
 * Fashion, Electronics, Food, Grocery.
 */
export default function Navbar({ onSearchChange, onOpenAuth }) {
  const { items, toggle } = useCart();
  const { user } = useAuth();
  const [q, setQ] = useState('');

  // Category dropdown state and refs
  const [catOpen, setCatOpen] = useState(false);
  const catBtnRef = useRef(null);
  const catMenuRef = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!catOpen) return;
      const t = e.target;
      if (catBtnRef.current?.contains(t) || catMenuRef.current?.contains(t)) return;
      setCatOpen(false);
    };
    const onEsc = (e) => {
      if (e.key === 'Escape') setCatOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, [catOpen]);

  const onSubmit = (e) => {
    e.preventDefault();
    onSearchChange(q);
  };

  const onSelectCategory = (name) => {
    // For now, just hint selection in URL hash to avoid routing refactors
    try { window.location.hash = `#cat-${name.toLowerCase()}`; } catch {}
    setCatOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-inner" style={{ gridTemplateColumns: 'auto auto 1fr auto' }}>
        {/* Category dropdown (left-most) */}
        <div style={{ position: 'relative' }}>
          <button
            ref={catBtnRef}
            type="button"
            className="btn-categories"
            aria-haspopup="menu"
            aria-expanded={catOpen}
            aria-controls="header-category-menu"
            onClick={() => setCatOpen(v => !v)}
          >
            Category
            <FiChevronRight aria-hidden="true" />
          </button>

          {catOpen && (
            <div
              id="header-category-menu"
              ref={catMenuRef}
              role="menu"
              aria-label="Select category"
              style={{
                position: 'absolute',
                top: '50%',
                left: '100%',
                transform: 'translate(8px, -50%)',
                background: '#fff',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-elevated, 0 16px 36px rgba(124,58,237,0.18))',
                borderRadius: 12,
                padding: 8,
                minWidth: 180,
                zIndex: 60
              }}
            >
              {['Fashion', 'Electronics', 'Food', 'Grocery'].map(opt => (
                <button
                  key={opt}
                  role="menuitem"
                  className="btn ghost"
                  style={{ width: '100%', justifyContent: 'flex-start', height: 36, margin: '4px 0' }}
                  onClick={() => onSelectCategory(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Brand */}
        <a className="brand" href="/" aria-label="Home">
          <span className="brand-badge">📍</span>
          <span>YOUR MARKET</span>
        </a>

        {/* Search */}
        <form className="searchbar" onSubmit={onSubmit} role="search" aria-label="Product search">
          <input
            className="input"
            placeholder="Search for products, brands and more"
            value={q}
            onChange={e => setQ(e.target.value)}
            aria-label="Search"
          />
          <button className="btn" type="submit">Search</button>
        </form>

        {/* Right actions */}
        <div className="nav-actions" style={{display:'inline-flex', alignItems:'center', gap:8}}>
          {user ? (
            <>
              <a className="btn ghost" href="/orders" aria-label="Orders">Orders</a>
              <button className="btn ghost" onClick={() => signOut()} aria-label="Sign out">
                <FiUser aria-hidden="true" size={18} />
                <span>Sign out</span>
              </button>
            </>
          ) : (
            <button className="btn ghost" onClick={onOpenAuth} aria-label="Sign in">
              <FiUser aria-hidden="true" size={18} />
              <span>Sign in</span>
            </button>
          )}
          <button className="btn" onClick={toggle} aria-label="Open cart">
            <FiShoppingCart aria-hidden="true" size={18} />
            <span>Cart</span>
            <span className="badge" aria-label={`${items.length} items in cart`}>{items.length}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
