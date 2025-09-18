import React from 'react';
import { useCart } from '../context/CartContext';

export default function ProductModal({ product, onClose }) {
  const { add } = useCart();
  if (!product) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label={`${product.name} details`} style={{
      position:'fixed', inset:0, background:'rgba(0,0,0,0.32)', display:'grid', placeItems:'center', zIndex:70
    }}>
      <div className="card" style={{width:'min(96vw, 800px)', background:'#fff', overflow:'hidden'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:0}}>
          <div className="product-thumb" style={{background:'#F3F4F6'}}>
            {product.image ? <img src={product.image} alt={product.name} /> : <span style={{color:'#9CA3AF'}}>No image</span>}
          </div>
          <div style={{padding:16, display:'grid', gap:12}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <h2 style={{margin:0}}>{product.name}</h2>
              <button className="btn ghost" onClick={onClose}>Close</button>
            </div>
            <div className="helper">Category: {product.category} · ⭐ {product.rating}</div>
            <div><strong style={{fontSize:20}}>${product.price.toFixed(2)}</strong></div>
            <p className="helper">This is a placeholder description. Connect to backend to load full product details and specs.</p>
            <div style={{display:'flex', gap:8}}>
              <button className="btn" onClick={() => { add(product, 1); onClose(); }}>Add to cart</button>
              <button className="btn ghost" onClick={onClose}>Close</button>
            </div>
            <div className="helper">Stock: {product.stock ?? 'n/a'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
