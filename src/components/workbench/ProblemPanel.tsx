'use client';

import React, { useState } from 'react';
import { Target, ChevronLeft, ChevronRight, Play, Sparkles, BookOpen, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IWorkbenchData } from '@/types';

interface ProblemPanelProps {
  data: IWorkbenchData;
  updateData: (updater: Partial<IWorkbenchData>) => void;
  onStartThinking: () => void;
}

export function ProblemPanel({ data, updateData, onStartThinking }: ProblemPanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (isCollapsed) {
    return (
      <div className="glass-panel rounded-2xl p-3 border border-violet-500/20 flex flex-col items-center justify-between h-full space-y-4">
        <button
          onClick={() => setIsCollapsed(false)}
          className="p-2 rounded-xl bg-violet-500/15 border border-violet-500/30 text-violet-300 hover:text-white hover:scale-105 transition-all"
          title="Expand Problem Panel"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        <div className="writing-mode-vertical text-[10px] font-mono font-bold tracking-widest text-violet-300 uppercase rotate-180 opacity-70">
          PROBLEM CONTEXT
        </div>
        <Target className="w-4 h-4 text-violet-400" />
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-2xl p-5 border border-violet-500/20 shadow-xl space-y-4 flex flex-col h-full overflow-hidden animate-fade-in">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-violet-500/15 pb-3">
        <div className="flex items-center space-x-2">
          <Target className="w-4 h-4 text-violet-400" />
          <h3 className="font-bold text-xs text-white uppercase tracking-wider">Problem Context</h3>
        </div>
        <button
          onClick={() => setIsCollapsed(true)}
          className="p-1 text-[#B8B1CC] hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          title="Collapse Panel"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs">
        {/* Title & Difficulty */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <input
              type="text"
              value={data.problemTitle}
              onChange={(e) => updateData({ problemTitle: e.target.value })}
              className="font-bold text-sm text-white bg-transparent border-b border-violet-500/20 focus:border-violet-500 outline-none w-full mr-2 font-sans"
            />
            <span className="text-[10px] bg-emerald-500/15 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
              {data.problemDifficulty || 'Easy'}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-[#77708D] uppercase tracking-wider block">Description</label>
          <textarea
            value={data.problemDescription}
            onChange={(e) => updateData({ problemDescription: e.target.value })}
            placeholder="Enter problem statement description..."
            className="w-full h-28 p-3 rounded-xl bg-[#05030D] border border-violet-500/30 text-xs text-[#B8B1CC] leading-relaxed focus:ring-1 focus:ring-violet-500 outline-none resize-none"
          />
        </div>

        {/* Constraints */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-[#77708D] uppercase tracking-wider block">Constraints</label>
          <textarea
            value={data.constraints}
            onChange={(e) => updateData({ constraints: e.target.value })}
            placeholder="Constraints (e.g. 1 <= n <= 10^5)..."
            className="w-full h-16 p-2.5 rounded-xl bg-[#05030D] border border-violet-500/30 font-mono text-[11px] text-violet-300 focus:ring-1 focus:ring-violet-500 outline-none resize-none"
          />
        </div>

        {/* Examples */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-[#77708D] uppercase tracking-wider block">Examples / Inputs</label>
          <textarea
            value={data.examples}
            onChange={(e) => updateData({ examples: e.target.value })}
            placeholder="Input / Output sample cases..."
            className="w-full h-16 p-2.5 rounded-xl bg-[#05030D] border border-violet-500/30 font-mono text-[11px] text-cyan-300 focus:ring-1 focus:ring-violet-500 outline-none resize-none"
          />
        </div>
      </div>

      {/* Start Thinking Button */}
      <div className="pt-2 border-t border-violet-500/15">
        <Button
          onClick={onStartThinking}
          className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold text-xs h-9 rounded-xl shadow-[0_0_12px_rgba(139,92,246,0.3)] gap-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Start Thinking & Drafting</span>
        </Button>
      </div>

    </div>
  );
}
export default ProblemPanel;
