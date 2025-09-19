import React from 'react';

/**
 * PUBLIC_INTERFACE
 * GroceryPage
 * Minimal placeholder page for Grocery.
 */
export default function GroceryPage() {
  /** This is a public function. */
  return (
    <div className="page-shell">
      <div className="container">
        <h2 style={{ margin: '16px 0 12px' }}>Grocery</h2>
        <div className="empty-state">Connect backend to load grocery products.</div>
      </div>
    </div>
  );
}
