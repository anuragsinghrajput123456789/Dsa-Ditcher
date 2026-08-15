'use client';

import { useState } from "react";
import { Brain, Clock, Database, AlertCircle, Loader, Wand2 } from "lucide-react";
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
      setError("Code is empty. Please write some code to analyze.");
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
      setError("Failed to analyze complexity. Using local fallback rules.");
      toast.error("Network issue. Reverting to local analysis engine.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-lg border border-border p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">AI Big-O Complexity Finder</h3>
            <p className="text-xs text-muted-foreground">Instantly compute time and space complexity O-notation</p>
          </div>
        </div>

        <Button
          onClick={analyzeComplexity}
          disabled={isLoading}
          variant="gradient"
          size="sm"
          className="flex items-center space-x-2"
        >
          {isLoading ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4" />
              <span>Find Big-O</span>
            </>
          )}
        </Button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {result && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/20 space-y-1">
              <div className="flex items-center space-x-2 text-violet-400 text-xs font-semibold uppercase">
                <Clock className="w-4 h-4" />
                <span>Time Complexity</span>
              </div>
              <p className="text-2xl font-bold text-violet-300">{result.timeComplexity}</p>
            </div>

            <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 space-y-1">
              <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase">
                <Database className="w-4 h-4" />
                <span>Space Complexity</span>
              </div>
              <p className="text-2xl font-bold text-indigo-300">{result.spaceComplexity}</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-muted/50 border border-border/60 space-y-2">
            <h4 className="font-semibold text-sm">Explanation</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{result.explanation}</p>
          </div>

          {result.optimizations && result.optimizations.length > 0 && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
              <h4 className="font-semibold text-sm text-emerald-400">Optimization Suggestions</h4>
              <ul className="list-disc list-inside text-xs text-emerald-300/80 space-y-1">
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
