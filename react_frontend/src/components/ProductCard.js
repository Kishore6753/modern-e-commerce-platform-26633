import React from 'react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, onOpen }) {
  const { add } = useCart();
  const subtitle = product.subtitle || 'Organic • 120 capsules'; // placeholder subtext

  return (
    <div className="product-card">
      <button className="product-thumb" onClick={() => onOpen(product)} aria-label={`View ${product.name}`}>
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        ) : (
          <span style={{color:'var(--text-tertiary)'}}>No image</span>
        )}
      </button>
      <div className="product-body">
        <h3 className="product-title" title={product.name}>{product.name}</h3>
        <div className="product-subtitle">{subtitle}</div>
        <div className="product-meta">
          <span className="price">${product.price.toFixed(2)}</span>
          <span className="stars" aria-label={`Rating ${product.rating} out of 5`}>★ {product.rating}</span>
        </div>
        <div style={{display:'flex', gap:12}}>
          <button className="btn" onClick={() => add(product, 1)}>Add to cart</button>
          <button className="btn ghost" onClick={() => onOpen(product)} aria-label="View details">Details</button>
        </div>
      </div>
    </div>
  );
}
