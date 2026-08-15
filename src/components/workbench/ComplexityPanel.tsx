'use client';

import React from 'react';
import { Cpu, Clock, Database, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ComplexityPanelProps {
  complexity: any;
  isLoading: boolean;
  onAnalyzeComplexity: () => void;
}

export function ComplexityPanel({ complexity, isLoading, onAnalyzeComplexity }: ComplexityPanelProps) {
  return (
    <div className="glass-panel rounded-2xl p-5 border border-violet-500/20 shadow-xl space-y-4 flex flex-col h-full overflow-hidden animate-fade-in">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-violet-500/15 pb-3">
        <div className="flex items-center space-x-2">
          <Cpu className="w-5 h-5 text-violet-400" />
          <h3 className="font-bold text-sm text-white">Algorithm Complexity Analysis</h3>
        </div>

        <Button
          onClick={onAnalyzeComplexity}
          disabled={isLoading}
          className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold text-xs h-8 px-3 rounded-xl gap-1"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isLoading ? "Analyzing..." : "Analyze Big-O"}</span>
        </Button>
      </div>

      {!complexity ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-[#77708D] space-y-3">
          <Cpu className="w-10 h-10 text-violet-400/50" />
          <div>
            <p className="text-white font-bold text-sm">Analyze Algorithm Bounds</p>
            <p className="text-xs text-[#B8B1CC] mt-1 max-w-xs">
              Click "Analyze Big-O" to compute theoretical time & space complexity for best, average, and worst case scenarios.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs">
          
          <div className="grid grid-cols-2 gap-3">
            {/* Time Complexity Card */}
            <div className="p-4 rounded-xl bg-[#05030D] border border-violet-500/30 space-y-1">
              <div className="flex items-center space-x-1.5 text-violet-400 font-bold uppercase text-[10px]">
                <Clock className="w-3.5 h-3.5" />
                <span>Time Complexity</span>
              </div>
              <p className="text-2xl font-extrabold text-white font-mono glow-text-violet">
                {complexity.timeComplexity?.value || complexity.timeComplexity || 'O(n)'}
              </p>
            </div>

            {/* Space Complexity Card */}
            <div className="p-4 rounded-xl bg-[#05030D] border border-magenta-500/30 space-y-1">
              <div className="flex items-center space-x-1.5 text-magenta-400 font-bold uppercase text-[10px]">
                <Database className="w-3.5 h-3.5" />
                <span>Space Complexity</span>
              </div>
              <p className="text-2xl font-extrabold text-white font-mono glow-text-magenta">
                {complexity.spaceComplexity?.value || complexity.spaceComplexity || 'O(n)'}
              </p>
            </div>
          </div>

          {/* Detailed Explanation */}
          <div className="p-3.5 rounded-xl bg-[#05030D] border border-violet-500/20 space-y-1.5">
            <h4 className="font-bold text-white text-[11px] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Runtime & Memory Bounds</span>
            </h4>
            <p className="text-[#B8B1CC] font-mono text-[11px] leading-relaxed">
              {complexity.timeComplexity?.explanation || complexity.explanation || 'Single pass over array with hash map key lookup.'}
            </p>
          </div>

        </div>
      )}

    </div>
  );
}
export default ComplexityPanel;
