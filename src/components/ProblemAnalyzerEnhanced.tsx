'use client';

import { useState, useEffect } from "react";
import { Send, Bot, User, BookOpen, ExternalLink, Loader, Lightbulb, ArrowRight, Sparkles, Brain, Trash2 } from "lucide-react";
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
        // Unauthenticated or network error - ignore gracefully
      }
    };
    fetchHistory();
  }, []);

  const handleAnalyze = async () => {
    if (!problemText.trim()) {
      toast.error("Please enter a problem description.");
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

      toast.success("Problem analysis generated!");
    } catch (error) {
      console.error("Failed to analyze problem:", error);
      toast.error("Analysis failed. Reverting to local mentor rules.");
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
      // Save message to chat history DB if logged in
      api.post('/api/chats', { role: 'user', content: userText }).catch(() => {});

      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white via-violet-200 to-violet-400 bg-clip-text text-transparent">
          AI DSA Problem Analyzer & Tutor
        </h1>
        <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
          Paste any algorithm query for step-by-step guidance, progressive hints, and live mentor AI responses.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Analyzer Panel */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-card rounded-2xl p-6 border border-border/80 shadow-xl space-y-4">
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-violet-400" />
              <h2 className="font-bold text-lg">Problem Statement</h2>
            </div>

            <textarea
              value={problemText}
              onChange={(e) => setProblemText(e.target.value)}
              placeholder="Paste LeetCode question or custom problem statement here..."
              className="w-full h-40 p-4 rounded-xl bg-background border border-input text-xs font-mono focus:ring-1 focus:ring-violet-500 outline-none resize-none"
            />

            <div className="flex justify-end">
              <Button
                variant="gradient"
                size="sm"
                onClick={handleAnalyze}
                disabled={loadingAnalysis}
                className="gap-2 text-xs"
              >
                {loadingAnalysis ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Analyze Problem</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Analysis Results & Progressive Hints */}
          {analysis && (
            <div className="bg-card rounded-2xl p-6 border border-border/80 shadow-xl space-y-6 animate-fade-in">
              <div className="p-4 rounded-xl bg-muted/40 border border-border text-xs leading-relaxed space-y-2">
                <h3 className="font-semibold text-violet-300">Analysis Breakdown</h3>
                <div className="whitespace-pre-wrap text-muted-foreground">{analysis.summary}</div>
              </div>

              {/* Progressive Hints Section */}
              <div className="space-y-3 pt-2 border-t border-border/60">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                    <h3 className="font-bold text-sm">Progressive Hints</h3>
                  </div>
                  {visibleHintIndex < analysis.hints.length - 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setVisibleHintIndex((prev) => prev + 1)}
                      className="text-xs gap-1 border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
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
                    <p className="text-xs text-muted-foreground italic">Click "Show Next Hint" to reveal progressive hints without leaking the full code.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right AI Chat Tutor */}
        <div className="lg:col-span-5 bg-card rounded-2xl p-6 border border-border/80 shadow-xl flex flex-col h-[600px]">
          <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-4">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5 text-violet-400" />
              <h2 className="font-bold text-base">AlgoSpark AI Guide</h2>
            </div>
            {chatMessages.length > 0 && (
              <button
                onClick={handleClearHistory}
                className="p-1.5 text-muted-foreground hover:text-destructive rounded-lg transition-colors"
                title="Clear chat history"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2 text-xs">
            {chatMessages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2 text-muted-foreground">
                <Bot className="w-8 h-8 text-violet-400/60 mb-2" />
                <p className="font-medium text-foreground">Have a question about DSA?</p>
                <p className="text-[11px]">Ask about Big-O complexities, sliding window techniques, or graph traversals!</p>
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
                        ? 'bg-violet-600 text-white rounded-tr-none'
                        : 'bg-muted/80 text-foreground border border-border rounded-tl-none whitespace-pre-wrap'
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
                <span>Mentor AI is typing...</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="pt-4 border-t border-border/60 flex space-x-2 mt-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 h-9 px-3 rounded-xl bg-background border border-input text-xs focus:ring-1 focus:ring-violet-500 outline-none"
            />
            <Button type="submit" size="sm" variant="gradient" disabled={isLoading} className="h-9 w-9 p-0">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>

      </div>
    </div>
  );
}
export default ProblemAnalyzerEnhanced;
