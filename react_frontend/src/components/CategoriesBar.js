import React, { useEffect, useRef, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * CategoriesBar
 * Horizontal categories navigation strip shown below the top header.
 * Now renders a dropdown with two columns: Men's and Women's.
 */
export default function CategoriesBar() {
  /** This is a public function. */
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const onDocClick = (e) => {
      if (!open) return;
      const target = e.target;
      if (menuRef.current?.contains(target) || btnRef.current?.contains(target)) return;
      setOpen(false);
    };
    const onEsc = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, [open]);

  const handleToggle = () => setOpen(v => !v);

  // Simple navigation helper (keeps current app structure; replace with router/nav later if needed)
  const goto = (hash) => {
    // Update location hash to hint filtering areas; can be integrated with real routing later
    try {
      window.location.hash = hash;
    } catch {
      // no-op for non-browser environments
    }
    setOpen(false);
  };

  // Example lists; can be wired to real data or routes later
  const mens = ['T-Shirts', 'Shirts', 'Jeans', 'Jackets', 'Suits'];
  const womens = ['Dresses', 'Tops', 'Skirts', 'Jeans', 'Outerwear'];

  return (
    <div className="categories-bar" role="navigation" aria-label="Shop by category">
      <div className="container categories-inner" style={{ position: 'relative' }}>
        <strong className="categories-title">Shop</strong>
        <div className="categories-list" role="list">
          <button
            ref={btnRef}
            type="button"
            className="category-chip"
            aria-haspopup="true"
            aria-expanded={open}
            aria-controls="categories-dropdown-menu"
            onClick={handleToggle}
          >
            Categories
            <span aria-hidden="true" style={{ marginLeft: 6 }}>▾</span>
          </button>
        </div>

        {open && (
          <div
            id="categories-dropdown-menu"
            ref={menuRef}
            role="menu"
            aria-label="Browse categories"
            style={{
              position: 'absolute',
              top: '48px',
              left: '90px',
              background: '#fff',
              border: '1px solid var(--border)',
              boxShadow: '0 16px 36px rgba(124,58,237,0.18)',
              borderRadius: 12,
              padding: 16,
              zIndex: 55,
              minWidth: 420
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', marginBottom: 10 }}>
                  Men&apos;s
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
                  {mens.map(item => (
                    <li key={`m-${item}`}>
                      <button
                        role="menuitem"
                        className="btn ghost"
                        style={{ width: '100%', justifyContent: 'flex-start', height: 36, padding: '0 12px' }}
                        onClick={() => goto(`#mens-${item.toLowerCase().replace(/\\s+/g, '-')}`)}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', marginBottom: 10 }}>
                  Women&apos;s
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
                  {womens.map(item => (
                    <li key={`w-${item}`}>
                      <button
                        role="menuitem"
                        className="btn ghost"
                        style={{ width: '100%', justifyContent: 'flex-start', height: 36, padding: '0 12px' }}
                        onClick={() => goto(`#womens-${item.toLowerCase().replace(/\\s+/g, '-')}`)}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="helper" style={{ marginTop: 12 }}>
              Tip: Use the Filters sidebar to refine by price and sort by rating or price.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
