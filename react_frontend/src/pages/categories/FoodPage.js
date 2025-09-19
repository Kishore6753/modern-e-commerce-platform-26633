import React from 'react';

/**
 * PUBLIC_INTERFACE
 * FoodPage
 * Minimal placeholder page for Food.
 */
export default function FoodPage() {
  /** This is a public function. */
  return (
    <div className="page-shell">
      <div className="container">
        <h2 style={{ margin: '16px 0 12px' }}>Food</h2>
        <div className="empty-state">Connect backend to load food products.</div>
      </div>
    </div>
  );
}
