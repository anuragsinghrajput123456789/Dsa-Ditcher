'use client';

import React from 'react';

export function NetworkBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0 opacity-40">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="netGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#A855F7" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#D946EF" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Network Connections */}
        <path
          d="M 50 100 Q 200 300 400 200 T 800 400 T 1200 150"
          fill="none"
          stroke="url(#netGrad)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />
        <path
          d="M 100 500 Q 350 200 650 450 T 1100 300"
          fill="none"
          stroke="url(#netGrad)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* Glowing Network Nodes */}
        <circle cx="200" cy="300" r="3" fill="#8B5CF6" className="animate-node-pulse" />
        <circle cx="400" cy="200" r="4" fill="#D946EF" className="animate-node-pulse" />
        <circle cx="800" cy="400" r="3" fill="#22D3EE" className="animate-node-pulse" />
        <circle cx="650" cy="450" r="3.5" fill="#A855F7" className="animate-node-pulse" />
        <circle cx="1100" cy="300" r="4" fill="#8B5CF6" className="animate-node-pulse" />
      </svg>
    </div>
  );
}
export default NetworkBackground;
