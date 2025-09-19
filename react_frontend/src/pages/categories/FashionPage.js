import React, { useEffect, useMemo, useState } from 'react';
import { fetchProducts } from '../../services/api';
import Loader from '../../components/Loader';

/**
 * PUBLIC_INTERFACE
 * FashionPage
 * Minimal route page for Fashion category.
 */
export default function FashionPage() {
  /** This is a public function. */
  const [data, setData] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const res = await fetchProducts();
      if (mounted) { setData(res); setLoading(false); }
    })();
    return () => { mounted = false; };
  }, []);
  const items = useMemo(() => data.items.slice(0, 12), [data.items]);
  return (
    <div className="page-shell">
      <div className="container">
        <h2 style={{ margin: '16px 0 12px' }}>Fashion</h2>
        {loading ? <Loader /> : (
          items.length === 0 ? <div className="empty-state">No items found.</div> : (
            <div className="grid">
              {items.map(p => (
                <div key={p.id} className="product-card">
                  <div className="product-thumb">
                    {p.image ? <img src={p.image} alt={p.name} /> : <span style={{color:'var(--text-tertiary)'}}>No image</span>}
                  </div>
                  <div className="product-body">
                    <h3 className="product-title" title={p.name}>{p.name}</h3>
                    <div className="product-meta">
                      <span className="price">${p.price?.toFixed(2)}</span>
                      <span className="stars">★ {p.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}
