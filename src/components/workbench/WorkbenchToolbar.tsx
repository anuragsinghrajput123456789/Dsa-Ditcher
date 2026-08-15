'use client';

import React from 'react';
import { Save, Sparkles, Cpu, Code2, Download, RotateCcw, HelpCircle, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WorkbenchToolbarProps {
  saveStatus: 'saved' | 'saving' | 'error' | 'idle';
  onSave: () => void;
  onRequestReview: () => void;
  onAnalyzeComplexity: () => void;
  onConvertCode: () => void;
  onExport: () => void;
  onReset: () => void;
  onOpenShortcuts: () => void;
}

export function WorkbenchToolbar({
  saveStatus,
  onSave,
  onRequestReview,
  onAnalyzeComplexity,
  onConvertCode,
  onExport,
  onReset,
  onOpenShortcuts,
}: WorkbenchToolbarProps) {
  return (
    <div className="glass-panel rounded-2xl p-3 border border-violet-500/20 shadow-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
      
      {/* Save Status Badge */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#05030D] border border-violet-500/30 text-[11px] font-mono">
          {saveStatus === 'saving' && <Loader2 className="w-3 h-3 text-violet-400 animate-spin" />}
          {saveStatus === 'saved' && <Check className="w-3 h-3 text-emerald-400" />}
          <span className={saveStatus === 'saving' ? 'text-violet-300' : saveStatus === 'saved' ? 'text-emerald-300' : 'text-[#77708D]'}>
            {saveStatus === 'saving' ? 'Autosaving...' : saveStatus === 'saved' ? 'Autosaved' : 'Draft Saved'}
          </span>
        </div>
      </div>

      {/* Main Action Buttons */}
      <div className="flex items-center space-x-2 flex-wrap">
        <Button
          onClick={onRequestReview}
          className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold text-xs h-8 px-3 rounded-xl gap-1 shadow-[0_0_12px_rgba(139,92,246,0.3)]"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Review</span>
        </Button>

        <Button
          onClick={onAnalyzeComplexity}
          variant="outline"
          className="border-violet-500/30 text-xs h-8 text-violet-300 hover:text-white gap-1"
        >
          <Cpu className="w-3.5 h-3.5 text-violet-400" />
          <span>Complexity</span>
        </Button>

        <Button
          onClick={onConvertCode}
          variant="outline"
          className="border-magenta-500/30 text-xs h-8 text-magenta-300 hover:text-white gap-1"
        >
          <Code2 className="w-3.5 h-3.5 text-magenta-400" />
          <span>Convert to Code</span>
        </Button>

        <Button
          onClick={onSave}
          variant="outline"
          className="border-violet-500/20 text-xs h-8 text-[#B8B1CC] hover:text-white gap-1"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save</span>
        </Button>

        <Button
          onClick={onExport}
          variant="outline"
          className="border-violet-500/20 text-xs h-8 text-[#B8B1CC] hover:text-white gap-1"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export</span>
        </Button>
      </div>

      {/* Utility Actions */}
      <div className="flex items-center space-x-1">
        <button
          onClick={onOpenShortcuts}
          className="p-1.5 rounded-lg text-[#77708D] hover:text-white hover:bg-white/5 transition-colors"
          title="Keyboard Shortcuts"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
        <button
          onClick={onReset}
          className="p-1.5 rounded-lg text-[#77708D] hover:text-red-400 hover:bg-white/5 transition-colors"
          title="Reset Workbench"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
export default WorkbenchToolbar;
