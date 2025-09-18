import React from 'react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, onOpen }) {
  const { add } = useCart();
  return (
    <div className="product-card">
      <button className="product-thumb" onClick={() => onOpen(product)} aria-label={`View ${product.name}`}>
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <span style={{color:'#9CA3AF'}}>No image</span>
        )}
      </button>
      <div className="product-body">
        <h3 className="product-title" title={product.name}>{product.name}</h3>
        <div className="product-meta">
          <span className="price">${product.price.toFixed(2)}</span>
          <span aria-label={`Rating ${product.rating} out of 5`}>⭐ {product.rating}</span>
        </div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn ghost" onClick={() => onOpen(product)}>Details</button>
          <button className="btn" onClick={() => add(product, 1)}>Add</button>
        </div>
      </div>
    </div>
  );
}
