'use client';

import React from 'react';

export function GridBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-60 z-0">
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, #05030D 80%)'
        }}
      />
    </div>
  );
}
export default GridBackground;
