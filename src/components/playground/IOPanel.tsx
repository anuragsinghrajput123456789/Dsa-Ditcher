'use client';

import { Terminal } from "lucide-react";

interface IOPanelProps {
  output: string;
  isRunning: boolean;
}

export default function IOPanel({ output, isRunning }: IOPanelProps) {
  return (
    <div className="rounded-xl overflow-hidden shadow-xl border border-border bg-card">
      <div className="bg-secondary text-foreground flex items-center space-x-2 px-4 py-3 border-b border-border">
        <Terminal className="w-4 h-4 text-violet-400" />
        <span className="font-semibold text-sm">Execution Output</span>
      </div>
      <div className="p-4 bg-background/80 min-h-[120px] font-mono text-xs text-foreground">
        {isRunning ? (
          <div className="flex items-center space-x-2 text-violet-400">
            <div className="w-3 h-3 border-2 border-violet-400 border-t-transparent rounded-full animate-spin"></div>
            <span>Executing script...</span>
          </div>
        ) : output ? (
          <pre className="whitespace-pre-wrap text-emerald-400">{output}</pre>
        ) : (
          <span className="text-muted-foreground italic">Click "Run Code" to view console outputs here...</span>
        )}
      </div>
    </div>
  );
}
