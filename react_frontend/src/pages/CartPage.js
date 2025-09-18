import React from 'react';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { items, total, remove, setQty, clear } = useCart();
  return (
    <div className="container app-surface" style={{padding:'24px', marginTop:16}}>
      <h2 style={{marginTop:0}}>Your cart</h2>
      {items.length === 0 ? (
        <div className="empty-state">Your cart is empty.</div>
      ) : (
        <>
          <div style={{display:'grid', gap:12}}>
            {items.map(i => (
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
          <div style={{display:'flex', justifyContent:'space-between', marginTop:16}}>
            <button className="btn ghost" onClick={clear}>Clear</button>
            <strong>Total: ${total.toFixed(2)}</strong>
          </div>
        </>
      )}
    </div>
  );
}
