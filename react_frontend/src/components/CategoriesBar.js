import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * CategoriesBar
 * Minimalist Ocean Professional horizontal bar under navbar.
 * Clicking "Categories" reveals category buttons with a left-to-right animation,
 * inline to the right of the Categories button with constant bar height.
 * Collapse animates right-to-left. Category click navigates via React Router.
 */
export default function CategoriesBar() {
  /** This is a public function. */
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState('idle'); // idle | opening | open | closing
  const nav = useNavigate();
  const loc = useLocation();
  const rowRef = useRef(null);

  // Close on route change to keep layout consistent
  useEffect(() => {
    if (open) {
      // trigger closing animation; keep element mounted to animate
      setPhase('closing');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loc.pathname]);

  // When closing animation ends, mark as closed (and unmount content)
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
      <div className="container catbar-inline">
        {/* Single-row flex container that never changes height */}
        <div className="catbar-row" ref={rowRef}>
          <button
            type="button"
            className="btn-categories"
            aria-expanded={open}
            aria-controls="categories-inline"
            onClick={toggle}
          >
            Categories
            <span aria-hidden="true" style={{ marginLeft: 6 }}>{open ? '▴' : '▾'}</span>
          </button>

          {/* Inline chips container: occupies horizontal space only; no vertical push */}
          <div
            id="categories-inline"
            className={`inline-chips ${open ? 'open' : ''} ${phase}`}
            aria-hidden={!open && phase !== 'closing'}
          >
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
      </div>
    </div>
  );
}
