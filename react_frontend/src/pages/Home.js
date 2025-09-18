import React, { useEffect, useMemo, useState } from 'react';
import { fetchProducts } from '../services/api';
import bannerImg from '../assets/banner.png';

export default function Home({ searchQuery }) {
  const [data, setData] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const result = await fetchProducts({ q: searchQuery });
      if (mounted) {
        setData(result);
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [searchQuery]);

  // Prepare a small set of demo dresses (image + name only)
  const demoProducts = useMemo(() => {
    const items = data.items.slice(0, 6); // Keep small demo set
    return items.map((i, idx) => ({
      id: i.id,
      name: i.name,
      image: i.image || null, // Use null if no image
      price: i.price,
      rating: i.rating,
      key: `${i.id}-${idx}`,
    }));
  }, [data.items]);

  return (
    <div className="page-shell">
      {/* Featured banner */}
      <div
        className="top-banner"
        role="img"
        aria-label="Promotional banner"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(255,255,255,0.0), rgba(255,255,255,0.0)), url(${bannerImg})`,
          minHeight: '400px', // Make banner more prominent
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          marginBottom: '32px'
        }}
      >
        <span className="sr-only">Welcome to Your Market – Discover our latest collections</span>
      </div>

      <div className="container">
        <h2 style={{ margin: '0 0 32px', fontSize: '28px', fontWeight: 600 }}>Featured Collection</h2>
        {loading ? (
          <div className="empty-state">Loading...</div>
        ) : (
          <div className="grid" aria-live="polite">
            {demoProducts.map(item => (
              <div key={item.key} className="product-card">
                <div className="product-thumb">
                  {item.image ? (
                    <img src={item.image} alt={item.name} />
                  ) : (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      display: 'grid',
                      placeItems: 'center',
                      color: 'var(--text-tertiary)',
                      fontSize: 13,
                    }}>
                      Image placeholder
                    </div>
                  )}
                </div>
                <div className="product-body">
                  <h3 className="product-title" title={item.name}>{item.name}</h3>
                  <div className="product-meta">
                    <span className="price">${item.price?.toFixed(2)}</span>
                    <span className="stars" aria-label={`Rating ${item.rating} out of 5`}>★ {item.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
