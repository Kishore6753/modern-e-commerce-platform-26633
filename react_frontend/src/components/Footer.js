import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container" role="contentinfo">
        <div>© {new Date().getFullYear()} Ocean Shop · Minimalist e-commerce experience</div>
      </div>
    </footer>
  );
}
