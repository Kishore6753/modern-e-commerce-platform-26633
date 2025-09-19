import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * CategoriesBar
 * Minimalist Ocean Professional horizontal bar under navbar.
 * Clicking "Categories" reveals category buttons with a left-to-right animation,
 * pushing the content down. Collapse animates right-to-left.
 * Category click navigates via React Router.
 */
export default function CategoriesBar() {
  /** This is a public function. */
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState('idle'); // idle | opening | open | closing
  const nav = useNavigate();
  const loc = useLocation();
  const rowRef = useRef(null);

  // Close the bar on route change to keep layout consistent
  useEffect(() => {
    if (open) {
      setPhase('closing');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loc.pathname]);

  // When closing animation ends, mark as closed
  useEffect(() => {
    if (phase !== 'closing') return;
    const el = rowRef.current;
    if (!el) return;
    const onEnd = () => {
      setOpen(false);
      setPhase('idle');
    };
    el.addEventListener('animationend', onEnd, { once: true });
    return () => el.removeEventListener('animationend', onEnd);
  }, [phase]);

  const toggle = () => {
    if (!open) {
      setOpen(true);
      // let the DOM mount, then run opening animation
      requestAnimationFrame(() => setPhase('opening'));
      const el = rowRef.current;
      if (el) {
        const onEnd = () => setPhase('open');
        el.addEventListener('animationend', onEnd, { once: true });
      }
    } else {
      setPhase('closing');
    }
  };

  const go = (path) => {
    nav(path);
  };

  const categories = [
    { key: 'fashion', label: 'Fashion' },
    { key: 'electronics', label: 'Electronics' },
    { key: 'food', label: 'Food' },
    { key: 'grocery', label: 'Grocery' },
  ];

  return (
    <div className="categories-bar" role="navigation" aria-label="Browse categories">
      <div className="container" style={{ display: 'grid', alignItems: 'center' }}>
        <div className="catbar-head" style={{ display: 'flex', alignItems: 'center', gap: 12, height: 48 }}>
          <button
            type="button"
            className="btn-categories"
            aria-expanded={open}
            aria-controls="categories-row"
            onClick={toggle}
          >
            Categories
            <span aria-hidden="true" style={{ marginLeft: 6 }}>{open ? '▴' : '▾'}</span>
          </button>
          <span className="categories-title" style={{ color: 'var(--text-secondary)' }}>Shop by</span>
        </div>

        {(open || phase === 'closing') && (
          <div
            id="categories-row"
            ref={rowRef}
            className={`categories-expand ${phase}`}
            aria-hidden={phase === 'idle'}
          >
            <div className="categories-chips">
              {categories.map((c, idx) => (
                <button
                  key={c.key}
                  type="button"
                  className="category-chip item"
                  style={{ '--i': idx }}
                  onClick={() => go(`/${c.key}`)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
