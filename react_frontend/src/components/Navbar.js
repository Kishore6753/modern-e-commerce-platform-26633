import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { signOut } from '../services';
import { FiUser, FiShoppingCart } from 'react-icons/fi';

/**
 * Header/navbar renders a single top row:
 * Brand | Search | Sign-in/Orders | Cart
 */
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
