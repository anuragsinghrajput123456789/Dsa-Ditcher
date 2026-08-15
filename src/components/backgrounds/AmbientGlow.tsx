'use client';

import React from 'react';

interface AmbientGlowProps {
  className?: string;
}

export function AmbientGlow({ className = '' }: AmbientGlowProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* Top Left Electric Violet Ambient Glow */}
      <div 
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-30 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.6) 0%, rgba(139,92,246,0) 70%)'
        }}
      />

      {/* Top Right Neon Magenta Ambient Glow */}
      <div 
        className="absolute -top-20 -right-20 w-[30rem] h-[30rem] rounded-full opacity-25 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(217,70,239,0.5) 0%, rgba(217,70,239,0) 70%)'
        }}
      />

      {/* Center Subtle Cyan Atmosphere */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[40rem] h-[25rem] rounded-full opacity-15 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(34,211,238,0.3) 0%, rgba(34,211,238,0) 75%)'
        }}
      />
    </div>
  );
}
export default AmbientGlow;
