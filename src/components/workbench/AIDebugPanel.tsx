'use client';

import React, { useState } from 'react';
import { Bot, CheckCircle2, AlertTriangle, Lightbulb, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IAIReviewResponse } from '@/types';

interface AIDebugPanelProps {
  aiReview: IAIReviewResponse | null;
  isLoading: boolean;
  onRequestReview: () => void;
}

export function AIDebugPanel({ aiReview, isLoading, onRequestReview }: AIDebugPanelProps) {
  const [hintIndex, setHintIndex] = useState(0);

  return (
    <div className="glass-panel rounded-2xl p-5 border border-violet-500/20 shadow-xl space-y-4 flex flex-col h-full overflow-hidden animate-fade-in">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-violet-500/15 pb-3">
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5 text-violet-400" />
          <h3 className="font-bold text-sm text-white">AI Mentor Approach Review</h3>
        </div>

        <Button
          onClick={onRequestReview}
          disabled={isLoading}
          className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold text-xs h-8 px-3 rounded-xl gap-1.5 shadow-[0_0_12px_rgba(139,92,246,0.3)]"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isLoading ? "Reviewing..." : "Review Approach"}</span>
        </Button>
      </div>

      {!aiReview ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-[#77708D] space-y-3">
          <Bot className="w-10 h-10 text-violet-400/50" />
          <div>
            <p className="text-white font-bold text-sm">No Review Requested Yet</p>
            <p className="text-xs text-[#B8B1CC] mt-1 max-w-xs">
              Draft your solution strategy or steps, then click "Review Approach" for progressive AI guidance.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs">
          
          {/* Correctness Score & Status Gauge */}
          <div className="p-4 rounded-xl bg-[#05030D] border border-violet-500/30 flex items-center justify-between shadow-md">
            <div>
              <div className="text-[10px] font-bold text-[#77708D] uppercase">Approach Assessment</div>
              <div className="text-base font-bold text-white flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{aiReview.correctness?.status || "Valid Approach"}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-extrabold text-violet-300 font-mono glow-text-violet">
                {aiReview.correctness?.score || 85}%
              </div>
              <div className="text-[9px] text-[#77708D] uppercase font-bold">Score</div>
            </div>
          </div>

          {/* Feedback Summary */}
          <div className="p-3.5 rounded-xl bg-violet-500/10 border border-violet-500/20 text-[#B8B1CC] font-mono text-[11px] leading-relaxed">
            {aiReview.correctness?.feedback || "Your approach demonstrates solid algorithmic logic."}
          </div>

          {/* Logic & Edge Cases */}
          {aiReview.edgeCases && aiReview.edgeCases.length > 0 && (
            <div className="space-y-1.5">
              <h4 className="font-bold text-amber-300 text-[11px] flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>Edge Cases to Consider</span>
              </h4>
              <ul className="list-disc list-inside text-[#B8B1CC] font-mono text-[11px] space-y-1 bg-[#05030D] p-3 rounded-xl border border-amber-500/20">
                {aiReview.edgeCases.map((ec, idx) => (
                  <li key={idx}>{ec}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Progressive Hints */}
          {aiReview.hints && aiReview.hints.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-violet-500/15">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-[11px] flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  <span>Progressive Hint ({hintIndex + 1}/{aiReview.hints.length})</span>
                </h4>
                {hintIndex < aiReview.hints.length - 1 && (
                  <button
                    onClick={() => setHintIndex((prev) => prev + 1)}
                    className="text-[10px] text-amber-300 hover:underline font-bold"
                  >
                    Next Hint →
                  </button>
                )}
              </div>
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
                {aiReview.hints[hintIndex]}
              </div>
            </div>
          )}

          {/* Next Step Guidance */}
          {aiReview.nextStep && (
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-200 font-mono text-[11px]">
              <strong>Next Step:</strong> {aiReview.nextStep}
            </div>
          )}

        </div>
      )}

    </div>
  );
}
export default AIDebugPanel;
