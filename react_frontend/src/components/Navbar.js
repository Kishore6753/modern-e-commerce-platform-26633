import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { signOut } from '../services';
import bannerImg from '../assets/banner.png';

export default function Navbar({ onSearchChange, onOpenAuth }) {
  const { items, toggle } = useCart();
  const { user } = useAuth();
  const [q, setQ] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    onSearchChange(q);
  };

  return (
    <>
      <div
        className="top-banner"
        role="img"
        aria-label="Promotional banner"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(255,255,255,0.0), rgba(255,255,255,0.0)), url(${bannerImg})`,
        }}
      >
        <span className="sr-only">Welcome to Your Market – seasonal offers and new arrivals</span>
      </div>

      <nav className="navbar">
        <div className="container navbar-inner">
          <div className="header-actions" style={{gap: 12}}>
            <div className="brand">
              <span className="brand-badge">📍</span>
              <span>YOUR MARKET</span>
            </div>
            <button className="btn-categories" type="button" aria-label="Browse categories">
              ☰ <span>Categories</span>
            </button>
          </div>

          <form className="searchbar" onSubmit={onSubmit} role="search" aria-label="Product search">
            <input
              className="input"
              placeholder="Search for vitamins, cosmetics, home and more..."
              value={q}
              onChange={e => setQ(e.target.value)}
              aria-label="Search"
            />
            <button className="btn" type="submit">Search</button>
          </form>

          <div className="nav-actions" style={{display:'inline-flex', alignItems:'center', gap:8}}>
            <div className="nav-links" aria-hidden="true">
              <a className="nav-link" href="#pharmacy">Pharmacy</a>
              <a className="nav-link" href="#home">Home</a>
              <a className="nav-link" href="#new">New</a>
              <a className="nav-link" href="#care">Care</a>
              <a className="nav-link" href="#cosmetics">Cosmetics</a>
              <a className="nav-link" href="#baby">Baby</a>
              <a className="nav-link" href="#men">For men</a>
              <a className="nav-link" href="#sport">Sport</a>
            </div>
            {user ? (
              <>
                <a className="btn ghost" href="/orders" aria-label="Orders">Orders</a>
                <button className="btn ghost" onClick={() => signOut()}>Sign out</button>
              </>
            ) : (
              <button className="btn ghost" onClick={onOpenAuth}>Sign in</button>
            )}
            <button className="btn" onClick={toggle} aria-label="Open cart">
              🛒 <span>Cart</span> <span className="badge" aria-label={`${items.length} items in cart`}>{items.length}</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
