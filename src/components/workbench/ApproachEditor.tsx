'use client';

import React from 'react';
import { PenTool, Heading, List, ListOrdered, Code, HelpCircle } from 'lucide-react';
import { IWorkbenchData } from '@/types';

interface ApproachEditorProps {
  data: IWorkbenchData;
  updateData: (updater: Partial<IWorkbenchData>) => void;
}

export function ApproachEditor({ data, updateData }: ApproachEditorProps) {
  const handleInsertText = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById('approach-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const current = data.approachText || '';
    const selected = current.substring(start, end) || 'text';
    const replacement = `${prefix}${selected}${suffix}`;

    const newText = current.substring(0, start) + replacement + current.substring(end);
    updateData({ approachText: newText });
  };

  const charCount = (data.approachText || '').length;

  return (
    <div className="glass-panel rounded-2xl p-6 border border-violet-500/20 shadow-xl space-y-4 flex flex-col h-full animate-fade-in">
      
      {/* Formatting Header */}
      <div className="flex items-center justify-between border-b border-violet-500/15 pb-3">
        <div className="flex items-center space-x-2">
          <PenTool className="w-4 h-4 text-violet-400" />
          <h3 className="font-bold text-sm text-white">Natural Language Solution Strategy</h3>
        </div>

        <div className="flex items-center space-x-1.5 bg-[#05030D] p-1 rounded-xl border border-violet-500/20">
          <button
            onClick={() => handleInsertText('### ')}
            className="p-1.5 text-[#B8B1CC] hover:text-white hover:bg-violet-500/20 rounded-lg transition-colors"
            title="Heading"
          >
            <Heading className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleInsertText('- ')}
            className="p-1.5 text-[#B8B1CC] hover:text-white hover:bg-violet-500/20 rounded-lg transition-colors"
            title="Bullet List"
          >
            <List className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleInsertText('1. ')}
            className="p-1.5 text-[#B8B1CC] hover:text-white hover:bg-violet-500/20 rounded-lg transition-colors"
            title="Numbered List"
          >
            <ListOrdered className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleInsertText('`', '`')}
            className="p-1.5 text-[#B8B1CC] hover:text-white hover:bg-violet-500/20 rounded-lg transition-colors"
            title="Code Snippet"
          >
            <Code className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="flex-1 space-y-2 flex flex-col">
        <p className="text-[11px] text-[#B8B1CC]">
          Describe your intuitive solution in plain English before writing code. Identify structural patterns (e.g. Hash Map, Two-Pointers, BFS).
        </p>

        <textarea
          id="approach-textarea"
          value={data.approachText}
          onChange={(e) => updateData({ approachText: e.target.value })}
          placeholder="I will use a Hash Map to store elements as I scan the array. For each element, I calculate target minus element..."
          className="flex-1 w-full p-4 rounded-xl bg-[#05030D] border border-violet-500/30 text-xs font-mono text-white leading-relaxed focus:ring-1 focus:ring-violet-500 outline-none resize-none"
        />
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between text-[10px] font-mono text-[#77708D] pt-2 border-t border-violet-500/15">
        <span>Thinking & Reasoning Mode</span>
        <span>{charCount} Characters</span>
      </div>

    </div>
  );
}
export default ApproachEditor;
