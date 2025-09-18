import React from 'react';

export default function Loader({ text = 'Loading...' }) {
  return (
    <div className="empty-state" role="status" aria-live="polite">
      {text}
    </div>
  );
}
