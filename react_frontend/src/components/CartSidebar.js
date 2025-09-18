import React from 'react';
import { useCart } from '../context/CartContext';

export default function CartSidebar({ onCheckout }) {
  const { isOpen, close, items, remove, setQty, total, clear } = useCart();

  return (
    <aside className={`sidebar-cart ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen} aria-label="Shopping cart">
      <header className="card" style={{border:0}}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <strong>Cart</strong>
          <button className="btn ghost" onClick={close}>Close</button>
        </div>
      </header>
      <div className="content">
        {items.length === 0 ? (
          <div className="empty-state">Your cart is empty. Discover products and add them here.</div>
        ) : items.map(i => (
          <div key={i.id} className="card" style={{padding:12, display:'grid', gap:8}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div style={{fontWeight:600}}>{i.name}</div>
              <button className="btn ghost" onClick={() => remove(i.id)}>Remove</button>
            </div>
            <div className="helper">${i.price.toFixed(2)} each</div>
            <div style={{display:'flex', alignItems:'center', gap:8}}>
              <label className="helper" htmlFor={`qty-${i.id}`}>Qty</label>
              <input id={`qty-${i.id}`} className="input" style={{width:80}} type="number" min="1" value={i.qty} onChange={e => setQty(i.id, Math.max(1, Number(e.target.value||1)))} />
            </div>
          </div>
        ))}
      </div>
      <footer>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12}}>
          <span>Total</span>
          <strong>${total.toFixed(2)}</strong>
        </div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn ghost" onClick={clear} disabled={items.length===0}>Clear</button>
          <button className="btn" onClick={onCheckout} disabled={items.length===0}>Checkout</button>
        </div>
        <div className="helper" style={{marginTop:8}}>Payment integration placeholder. Wire to provider (e.g., Stripe) later.</div>
      </footer>
    </aside>
  );
}
