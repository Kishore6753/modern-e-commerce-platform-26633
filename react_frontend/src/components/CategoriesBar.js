import React from 'react';

/**
 * PUBLIC_INTERFACE
 * CategoriesBar
 * Horizontal categories navigation strip shown below the top header.
 */
export default function CategoriesBar() {
  /** This is a public function. */
  const cats = [
    'Electronics', 'Fashion', 'Home', 'Beauty', 'Grocery', 'Appliances', 'Toys', 'Sports', 'Books'
  ];
  return (
    <div className="categories-bar" role="navigation" aria-label="Shop by category">
      <div className="container categories-inner">
        <strong className="categories-title">Shop by Category</strong>
        <div className="categories-list" role="list">
          {cats.map(c => (
            <a key={c} role="listitem" className="category-chip" href={`#${c.toLowerCase()}`} aria-label={`Browse ${c}`}>
              {c}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
