import React from 'react';

/**
 * PUBLIC_INTERFACE
 * CategoriesBar
 * Horizontal categories navigation strip shown below the top header.
 * Displays a single category for this clothing-only shop.
 */
export default function CategoriesBar() {
  /** This is a public function. */
  const category = 'Dress Collection';
  return (
    <div className="categories-bar" role="navigation" aria-label="Shop by category">
      <div className="container categories-inner">
        <strong className="categories-title">Shop</strong>
        <div className="categories-list" role="list">
          <a
            role="listitem"
            className="category-chip"
            href="#dress-collection"
            aria-label="Browse Dress Collection"
            title="Dress Collection"
          >
            {category}
          </a>
        </div>
      </div>
    </div>
  );
}
