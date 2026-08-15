'use client';

import { useState, useEffect } from "react";
import { Send, Bot, BookOpen, Loader, Lightbulb, ArrowRight, Sparkles, Brain, Trash2, Cpu, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { IChat } from "@/types";

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface AnalysisResult {
  summary: string;
  hints: string[];
}

export function ProblemAnalyzerEnhanced() {
  const [problemText, setProblemText] = useState("");
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [visibleHintIndex, setVisibleHintIndex] = useState(-1);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await api.get<IChat[]>('/api/chats');
        if (Array.isArray(data)) {
          setChatMessages(
            data.map((msg) => ({
              id: msg._id,
              type: msg.role,
              content: msg.content,
              timestamp: new Date(msg.createdAt || Date.now()),
            }))
          );
        }
      } catch (error) {
        // Ignore unauthenticated network errors
      }
    };
    fetchHistory();
  }, []);

  const handleAnalyze = async () => {
    if (!problemText.trim()) {
      toast.error("Please enter a problem statement to analyze.");
      return;
    }

    setLoadingAnalysis(true);
    setAnalysis(null);
    setVisibleHintIndex(-1);

    try {
      const openrouterKey = typeof window !== 'undefined' ? localStorage.getItem("openrouter_api_key") || "" : "";
      const res = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-openrouter-key": openrouterKey,
        },
        body: JSON.stringify({ problemText }),
      });

      const data = await res.json();
      const rawText = data.text || "";

      // Parse HINT: lines out of the text
      const lines = rawText.split('\n');
      const hintsArr: string[] = [];
      const summaryLines: string[] = [];

      lines.forEach((line: string) => {
        if (line.trim().startsWith('HINT:')) {
          hintsArr.push(line.replace('HINT:', '').trim());
        } else {
          summaryLines.push(line);
        }
      });

      setAnalysis({
        summary: summaryLines.join('\n').trim(),
        hints: hintsArr.length > 0 ? hintsArr : ["Draw a small input array on paper.", "Identify any subproblems or repeat recursive states.", "Consider sorting if pair comparison is needed."],
      });

      toast.success("Problem analysis generated successfully!");
    } catch (error) {
      console.error("Failed to analyze problem:", error);
      toast.error("Analysis failed. Using local mentor fallback engine.");
    } finally {
      setLoadingAnalysis(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const userText = userInput;
    setUserInput("");

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: userText,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      api.post('/api/chats', { role: 'user', content: userText }).catch(() => {});

      const openrouterKey = typeof window !== 'undefined' ? localStorage.getItem("openrouter_api_key") || "" : "";
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-openrouter-key": openrouterKey
        },
        body: JSON.stringify({
          message: userText,
          history: chatMessages.slice(-6).map((m) => ({ role: m.type, content: m.content })),
        }),
      });

      const data = await res.json();
      const aiReplyText = data.response || data.text || "I am here to guide your DSA learning!";

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: aiReplyText,
        timestamp: new Date(),
      };

      setChatMessages((prev) => [...prev, aiMsg]);
      api.post('/api/chats', { role: 'ai', content: aiReplyText }).catch(() => {});
    } catch (error) {
      console.error("AI Chat Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = async () => {
    setChatMessages([]);
    try {
      await api.delete('/api/chats');
      toast.success("Chat history cleared");
    } catch (e) {
      // Ignore
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Module Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-semibold">
          <Brain className="w-3.5 h-3.5 text-violet-400" />
          <span>SDE ANALYSIS WORKBENCH</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          AI Problem Analyzer & Mentor Tutor
        </h1>
        <p className="text-xs text-[#B8B1CC] max-w-2xl mx-auto">
          Deconstruct LeetCode questions, receive progressive hints, and query live Big-O time & space complexities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Analyzer Panel */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel rounded-2xl p-6 border border-violet-500/20 shadow-xl space-y-4">
            <div className="flex items-center space-x-2 border-b border-violet-500/15 pb-3">
              <Cpu className="w-5 h-5 text-violet-400" />
              <h2 className="font-bold text-sm text-white">Problem Statement Input</h2>
            </div>

            <textarea
              value={problemText}
              onChange={(e) => setProblemText(e.target.value)}
              placeholder="Paste LeetCode question, custom problem parameters, or constraints here..."
              className="w-full h-44 p-4 rounded-xl bg-[#05030D] border border-violet-500/30 text-xs font-mono text-white focus:ring-1 focus:ring-violet-500 outline-none resize-none"
            />

            <div className="flex justify-end">
              <Button
                onClick={handleAnalyze}
                disabled={loadingAnalysis}
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold text-xs h-9 px-5 rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all"
              >
                {loadingAnalysis ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin mr-2" />
                    <span>Analyzing Statement...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    <span>Analyze Problem</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Analysis Breakdown & Progressive Hints */}
          {analysis && (
            <div className="glass-panel rounded-2xl p-6 border border-violet-500/20 shadow-xl space-y-6 animate-fade-in">
              <div className="p-4 rounded-xl bg-[#05030D]/80 border border-violet-500/20 text-xs leading-relaxed space-y-2">
                <h3 className="font-bold text-violet-300 flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Analytical Breakdown</span>
                </h3>
                <div className="whitespace-pre-wrap text-[#B8B1CC] font-mono text-[11px]">{analysis.summary}</div>
              </div>

              {/* Progressive Hints Section */}
              <div className="space-y-3 pt-2 border-t border-violet-500/15">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                    <h3 className="font-bold text-sm text-white">Progressive Pedagogical Hints</h3>
                  </div>
                  {visibleHintIndex < analysis.hints.length - 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setVisibleHintIndex((prev) => prev + 1)}
                      className="text-xs h-8 border-amber-500/30 text-amber-300 hover:bg-amber-500/10 gap-1"
                    >
                      <span>Show Next Hint</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  )}
                </div>

                <div className="space-y-2">
                  {analysis.hints.slice(0, visibleHintIndex + 1).map((hint, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 animate-fade-in">
                      <strong>Hint {idx + 1}:</strong> {hint}
                    </div>
                  ))}
                  {visibleHintIndex === -1 && (
                    <p className="text-xs text-[#77708D] italic">Click "Show Next Hint" to reveal step-by-step guidance without leaking the complete algorithm.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right AI Mentor Tutor Chat */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-6 border border-violet-500/20 shadow-xl flex flex-col h-[620px]">
          <div className="flex items-center justify-between border-b border-violet-500/15 pb-3 mb-4">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5 text-violet-400" />
              <h2 className="font-bold text-sm text-white">AlgoSpark AI Mentor Guide</h2>
            </div>
            {chatMessages.length > 0 && (
              <button
                onClick={handleClearHistory}
                className="p-1.5 text-[#B8B1CC] hover:text-red-400 rounded-lg transition-colors"
                title="Clear chat history"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2 text-xs">
            {chatMessages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2 text-[#77708D]">
                <Bot className="w-8 h-8 text-violet-400/60 mb-2" />
                <p className="font-medium text-white">Have a DSA question?</p>
                <p className="text-[11px] text-[#B8B1CC]">Ask about Big-O complexity bounds, sliding window patterns, or dynamic programming memoization!</p>
              </div>
            ) : (
              chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex space-x-2 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                      msg.type === 'user'
                        ? 'bg-violet-600 text-white rounded-tr-none font-medium'
                        : 'bg-[#05030D] text-[#F5F3FF] border border-violet-500/25 rounded-tl-none whitespace-pre-wrap font-mono text-[11px]'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex items-center space-x-2 text-violet-400 text-xs">
                <Loader className="w-3.5 h-3.5 animate-spin" />
                <span>Mentor AI is typing response...</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="pt-4 border-t border-violet-500/15 flex space-x-2 mt-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask mentor a question..."
              className="flex-1 h-9 px-3 rounded-xl bg-[#05030D] border border-violet-500/30 text-xs text-white focus:ring-1 focus:ring-violet-500 outline-none"
            />
            <Button type="submit" size="sm" disabled={isLoading} className="h-9 w-9 p-0 bg-violet-600 hover:bg-violet-500 text-white rounded-xl">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>

      </div>
    </div>
  );
}
export default ProblemAnalyzerEnhanced;
