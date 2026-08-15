'use client';

import React, { useState } from 'react';
import { Code2, Sparkles, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MonacoEditor from '@monaco-editor/react';
import { toast } from 'sonner';

interface CodeConversionPanelProps {
  generatedCode: { language: string; code: string } | null;
  isLoading: boolean;
  onGenerateCode: (language: string) => void;
}

export function CodeConversionPanel({ generatedCode, isLoading, onGenerateCode }: CodeConversionPanelProps) {
  const [selectedLang, setSelectedLang] = useState<string>('javascript');
  const [copied, setCopied] = useState(false);

  const languages = [
    { id: 'javascript', name: 'JavaScript' },
    { id: 'python', name: 'Python' },
    { id: 'cpp', name: 'C++' },
    { id: 'java', name: 'Java' },
  ];

  const handleCopy = () => {
    if (generatedCode?.code) {
      navigator.clipboard.writeText(generatedCode.code);
      setCopied(true);
      toast.success("Code copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-5 border border-violet-500/20 shadow-xl space-y-4 flex flex-col h-full overflow-hidden animate-fade-in">
      
      {/* Header & Controls */}
      <div className="flex items-center justify-between border-b border-violet-500/15 pb-3">
        <div className="flex items-center space-x-2">
          <Code2 className="w-5 h-5 text-violet-400" />
          <h3 className="font-bold text-sm text-white">Convert Strategy to Code</h3>
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            className="bg-[#05030D] border border-violet-500/30 text-xs text-white rounded-xl px-2.5 py-1 font-semibold outline-none"
          >
            {languages.map((l) => (
              <option key={l.id} value={l.id}>{l.name}</option>
            ))}
          </select>

          <Button
            onClick={() => onGenerateCode(selectedLang)}
            disabled={isLoading}
            className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold text-xs h-8 px-3 rounded-xl gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isLoading ? "Generating..." : "Generate Code"}</span>
          </Button>
        </div>
      </div>

      {!generatedCode || !generatedCode.code ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-[#77708D] space-y-3">
          <Code2 className="w-10 h-10 text-violet-400/50" />
          <div>
            <p className="text-white font-bold text-sm">Approach Ready to Implement</p>
            <p className="text-xs text-[#B8B1CC] mt-1 max-w-xs">
              Select your target language and click "Generate Code" to convert your strategy and pseudocode into code.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col space-y-2 overflow-hidden">
          <div className="flex items-center justify-between text-xs text-[#B8B1CC] px-1">
            <span>Target: <strong className="text-white capitalize">{generatedCode.language}</strong></span>
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1 text-xs text-violet-300 hover:text-white"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied!" : "Copy Code"}</span>
            </button>
          </div>

          <div className="flex-1 rounded-xl overflow-hidden border border-violet-500/30">
            <MonacoEditor
              value={generatedCode.code}
              language={generatedCode.language === 'cpp' ? 'cpp' : generatedCode.language}
              theme="vs-dark"
              options={{
                fontSize: 13,
                fontFamily: "Fira Code, monospace",
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                readOnly: true,
                automaticLayout: true,
              }}
              height="100%"
              width="100%"
            />
          </div>
        </div>
      )}

    </div>
  );
}
export default CodeConversionPanel;
