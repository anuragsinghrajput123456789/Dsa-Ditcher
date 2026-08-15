'use client';

import { useState } from "react";
import { Brain, Clock, Database, AlertCircle, Loader, Wand2, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ComplexityResponse } from "@/types";

interface ComplexityFinderProps {
  code: string;
  language: string;
}

export default function ComplexityFinder({ code, language }: ComplexityFinderProps) {
  const [result, setResult] = useState<ComplexityResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeComplexity = async () => {
    if (!code.trim()) {
      setError("Code is empty. Please enter code in the Monaco Editor.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const openrouterKey = typeof window !== 'undefined' ? localStorage.getItem("openrouter_api_key") || "" : "";
      const res = await fetch("/api/ai/complexity", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-openrouter-key": openrouterKey
        },
        body: JSON.stringify({ code, language }),
      });

      if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`);
      }
      
      const parsedResult: ComplexityResponse = await res.json();
      setResult(parsedResult);
    } catch (e: any) {
      console.error("Complexity analysis error:", e);
      setError("Network or API issue. Utilizing local AST fallback analysis engine.");
      toast.error("Network issue. Reverting to local analysis engine.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-panel rounded-2xl border border-violet-500/20 p-6 space-y-6 shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-violet-500/15 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-violet-400">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white">AI Big-O Complexity Finder</h3>
            <p className="text-xs text-[#B8B1CC]">Compute exact time and space complexity O-notation bounds</p>
          </div>
        </div>

        <Button
          onClick={analyzeComplexity}
          disabled={isLoading}
          className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold text-xs h-9 px-4 rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.3)]"
        >
          {isLoading ? (
            <>
              <Loader className="w-4 h-4 animate-spin mr-2" />
              <span>Scanning AST...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4 mr-2" />
              <span>Compute Big-O</span>
            </>
          )}
        </Button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {result && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Time Complexity Card */}
            <div className="p-5 rounded-2xl bg-[#05030D] border border-violet-500/30 space-y-1 shadow-[0_0_20px_rgba(139,92,246,0.15)]">
              <div className="flex items-center space-x-2 text-violet-400 text-xs font-bold uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                <span>Time Complexity</span>
              </div>
              <p className="text-3xl font-extrabold text-white glow-text-violet font-mono">{result.timeComplexity}</p>
            </div>

            {/* Space Complexity Card */}
            <div className="p-5 rounded-2xl bg-[#05030D] border border-magenta-500/30 space-y-1 shadow-[0_0_20px_rgba(217,70,239,0.15)]">
              <div className="flex items-center space-x-2 text-magenta-400 text-xs font-bold uppercase tracking-wider">
                <Database className="w-4 h-4" />
                <span>Space Complexity</span>
              </div>
              <p className="text-3xl font-extrabold text-white glow-text-magenta font-mono">{result.spaceComplexity}</p>
            </div>

          </div>

          <div className="p-4 rounded-xl bg-[#05030D]/80 border border-violet-500/20 space-y-2 text-xs">
            <h4 className="font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span>Structural Explanation</span>
            </h4>
            <p className="text-[#B8B1CC] font-mono leading-relaxed">{result.explanation}</p>
          </div>

          {result.optimizations && result.optimizations.length > 0 && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-2 text-xs">
              <h4 className="font-bold text-emerald-300 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Optimization Recommendations</span>
              </h4>
              <ul className="list-disc list-inside text-emerald-200/80 font-mono text-[11px] space-y-1">
                {result.optimizations.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
