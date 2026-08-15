'use client';

import React from 'react';
import AmbientGlow from './AmbientGlow';
import GridBackground from './GridBackground';
import NetworkBackground from './NetworkBackground';

interface FuturisticBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export function FuturisticBackground({ children, className = '' }: FuturisticBackgroundProps) {
  return (
    <div className={`relative min-h-screen w-full bg-[#05030D] text-[#F5F3FF] overflow-hidden ${className}`}>
      <AmbientGlow />
      <GridBackground />
      <NetworkBackground />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
export default FuturisticBackground;
