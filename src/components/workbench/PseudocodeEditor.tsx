'use client';

import React from 'react';
import { Code2, AlignLeft, Sparkles } from 'lucide-react';
import { IWorkbenchData } from '@/types';

interface PseudocodeEditorProps {
  data: IWorkbenchData;
  updateData: (updater: Partial<IWorkbenchData>) => void;
}

export function PseudocodeEditor({ data, updateData }: PseudocodeEditorProps) {
  const pseudocode = data.pseudocode || '';
  const lines = pseudocode.split('\n');

  const handleInsertKeyword = (keyword: string) => {
    const textarea = document.getElementById('pseudocode-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const current = pseudocode;
    const replacement = `${keyword} `;

    const newText = current.substring(0, start) + replacement + current.substring(end);
    updateData({ pseudocode: newText });
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border border-violet-500/20 shadow-xl space-y-4 flex flex-col h-full overflow-hidden animate-fade-in">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-violet-500/15 pb-3">
        <div className="flex items-center space-x-2">
          <Code2 className="w-4 h-4 text-violet-400" />
          <h3 className="font-bold text-sm text-white">Language-Agnostic Pseudocode</h3>
        </div>

        <div className="flex items-center space-x-1 font-mono text-[10px]">
          {['START', 'FOR', 'WHILE', 'IF', 'RETURN', 'END'].map((kw) => (
            <button
              key={kw}
              onClick={() => handleInsertKeyword(kw)}
              className="px-2 py-0.5 rounded-md bg-[#05030D] border border-violet-500/30 text-violet-300 hover:text-white hover:bg-violet-500/20 transition-colors"
            >
              {kw}
            </button>
          ))}
        </div>
      </div>

      {/* Pseudocode Editor with Line Numbers */}
      <div className="flex-1 rounded-xl bg-[#05030D] border border-violet-500/30 flex overflow-hidden shadow-inner font-mono text-xs">
        
        {/* Line Numbers Bar */}
        <div className="w-10 bg-[#0E0A1F]/80 text-[#77708D] border-r border-violet-500/20 py-3 text-right pr-2 select-none space-y-1">
          {lines.map((_, idx) => (
            <div key={idx}>{idx + 1}</div>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          id="pseudocode-textarea"
          value={pseudocode}
          onChange={(e) => updateData({ pseudocode: e.target.value })}
          placeholder="START&#10;    create hashmap seen&#10;    FOR each item IN nums&#10;        IF target - item IN seen THEN&#10;            RETURN indices&#10;        END IF&#10;    END FOR&#10;END"
          className="flex-1 h-full p-3 bg-transparent text-violet-200 leading-relaxed focus:outline-none resize-none font-mono"
          spellCheck={false}
        />
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-[#77708D] pt-1">
        <span>Language Independent Pseudocode</span>
        <span>{lines.length} Lines</span>
      </div>

    </div>
  );
}
export default PseudocodeEditor;
