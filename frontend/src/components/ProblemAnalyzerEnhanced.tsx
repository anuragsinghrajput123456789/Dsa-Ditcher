
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Send, Bot, User, BookOpen, ExternalLink, Loader, FileText, Lightbulb, ArrowRight, Sparkles, Zap, Brain, Code2, Rocket, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { API_BASE_URL } from "@/config";

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



const ProblemAnalyzerEnhanced = () => {
  const location = useLocation();
  const [problemText, setProblemText] = useState("");

  useEffect(() => {
    if (location.state && (location.state as any).problem) {
      setProblemText((location.state as any).problem);
    }
  }, [location]);

  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [visibleHintIndex, setVisibleHintIndex] = useState(-1);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const getToken = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      return JSON.parse(storedUser).token;
    }
    return null;
  };

  useEffect(() => {
    document.title = "AI DSA Problem Analyzer & Tutor | DSA Ditcher";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Get instant step-by-step solutions, optimal code approaches, time/space complexities, edge cases, and progressive hints for any DSA problem using our AI Problem Analyzer.");
    }

    const fetchHistory = async () => {
      const token = getToken();
      if (!token) return;

      try {
        const res = await fetch(`${API_BASE_URL}/api/chats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          const messages = data.map((msg: any) => ({
            id: msg._id,
            type: msg.role,
            content: msg.content,
            timestamp: new Date(msg.createdAt)
          }));
          setChatMessages(messages);
        }
      } catch (error) {
        console.error("Failed to fetch chat history", error);
      }
    };
    fetchHistory();
  }, []);

  const saveMessageToBackend = async (role: 'user' | 'ai', content: string) => {
    const token = getToken();
    if (!token) return null;

    try {
      const res = await fetch(`${API_BASE_URL}/api/chats`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ role, content }),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (error) {
      console.error("Failed to save chat", error);
    }
    return null;
  };

  const deleteChat = async (id: string) => {
    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/chats/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setChatMessages(prev => prev.filter(msg => msg.id !== id));
        toast({ title: "Deleted", description: "Message deleted successfully." });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete message.", variant: "destructive" });
    }
  };

  const clearHistory = async () => {
    if (!window.confirm("Are you sure you want to delete all chat history?")) return;
    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/chats`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setChatMessages([]);
        toast({ title: "Cleared", description: "Chat history cleared." });
      }
    } catch (error) {
       toast({ title: "Error", description: "Failed to clear history.", variant: "destructive" });
    }
  };

  const dsaSheets = [
    {
      name: "LeetCode 75",
      url: "https://leetcode.com/studyplan/leetcode-75/",
      description: "Essential problems to crack coding interviews",
      icon: Code2,
      color: "from-orange-500 to-red-500"
    },
    {
      name: "NeetCode 150",
      url: "https://neetcode.io/practice",
      description: "150 most important problems for interviews",
      icon: Brain,
      color: "from-green-500 to-teal-500"
    },
    {
      name: "Striver's SDE Sheet",
      url: "https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/",
      description: "180 problems for Software Development Engineer roles",
      icon: Rocket,
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "Blind 75",
      url: "https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions",
      description: "75 most asked coding interview questions",
      icon: Zap,
      color: "from-blue-500 to-indigo-500"
    }
  ];

  const analyzeProblem = async () => {
    if (!problemText.trim()) return;
    
    setLoadingAnalysis(true);
    setAnalysis(null);
    setVisibleHintIndex(-1);
    try {
      const res = await fetch(`${API_BASE_URL}/api/ai/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problemText }),
      });

      const data = await res.json();
      const response = data.text || "Sorry, I couldn't analyze your problem.";
      
      const lines = response.split('\n');
      const hints = lines
        .filter(line => line.startsWith("HINT:"))
        .map(hint => hint.replace("HINT:", "").trim());
      const summary = lines
        .filter(line => !line.startsWith("HINT:"))
        .join('\n');

      setAnalysis({ summary, hints });
    } catch (error) {
      console.error("Analysis error:", error);
      setAnalysis({
        summary: "Error: Could not analyze the problem. Please try again.",
        hints: [],
      });
    }
    setLoadingAnalysis(false);
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    // Optimistic update
    const tempId = Date.now().toString();
    const userMessage: ChatMessage = {
      id: tempId,
      type: 'user',
      content: userInput,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    const currentInput = userInput;
    setUserInput("");
    setIsLoading(true);

    // Save user message
    saveMessageToBackend('user', currentInput).then(savedMsg => {
        if (savedMsg) {
             setChatMessages(prev => prev.map(msg => msg.id === tempId ? { ...msg, id: savedMsg._id } : msg));
        }
    });

    try {
      const prompt = `You are an expert DSA mentor specializing in Data Structures and Algorithms. Help the user understand concepts step by step with clear explanations. 

User question: ${currentInput}

Please provide:
1. A clear explanation of the concept
2. Step-by-step approach if it's a problem
3. Time and space complexity analysis
4. Related concepts or patterns
5. Practical examples when helpful

Keep your response educational and engaging.`;

      const res = await fetch(`${API_BASE_URL}/api/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const answer = data.text || "Sorry, I couldn't process your request. Try again!";

      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: answer,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, aiResponse]);
      saveMessageToBackend('ai', answer).then(savedMsg => {
           if (savedMsg) {
               setChatMessages(prev => prev.map(msg => msg.content === answer && msg.type === 'ai' ? { ...msg, id: savedMsg._id } : msg));
           }
      });
    } catch (error) {
      console.error("Chat error:", error);
      setChatMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          type: 'ai',
          content: "Error: Could not connect to AI service. Please check your internet connection and try again.",
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground space-y-6 sm:space-y-8 p-4 sm:p-6 animate-fade-in max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center animate-scale-in">
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
          <div className="p-2 sm:p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl sm:rounded-2xl shadow-lg animate-pulse">
            <Brain className="w-6 h-6 sm:w-10 sm:h-10 text-white" />
          </div>
          <div className="p-2 sm:p-4 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl sm:rounded-2xl shadow-lg animate-pulse" style={{animationDelay: '0.2s'}}>
            <Zap className="w-6 h-6 sm:w-10 sm:h-10 text-white" />
          </div>
          <div className="p-2 sm:p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl shadow-lg animate-pulse" style={{animationDelay: '0.4s'}}>
            <Sparkles className="w-6 h-6 sm:w-10 sm:h-10 text-white" />
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 sm:mb-4">
          DSA Problem Analyzer & AI Assistant
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base md:text-xl">Get step-by-step explanations and AI-powered help for any DSA problem</p>
      </div>

      {/* Two-Column Responsive Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Input, Results, Sheets (Grid Span 2) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* DSA Sheets Section */}
          <div className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl border border-border animate-fade-in">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-8">
              <div className="p-2 sm:p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg sm:rounded-xl">
                <BookOpen className="w-5 h-5 sm:w-7 sm:h-7 text-purple-500" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">Popular DSA Practice Sheets</h2>
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500 animate-bounce ml-auto" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {dsaSheets.map((sheet, index) => {
                const Icon = sheet.icon;
                return (
                  <a
                    key={index}
                    href={sheet.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-card border-2 border-border p-4 sm:p-6 rounded-xl sm:rounded-2xl hover:border-primary/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${sheet.color} rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:text-primary/80 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </div>
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-1 sm:mb-2 text-sm sm:text-base">{sheet.name}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{sheet.description}</p>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Problem Input Section */}
          <div className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl border border-border animate-fade-in">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="p-2 sm:p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg sm:rounded-xl">
                <FileText className="w-5 h-5 sm:w-7 sm:h-7 text-blue-500" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">Analyze any DSA Problem</h2>
            </div>
            
            <div className="space-y-4">
              <textarea
                value={problemText}
                onChange={(e) => setProblemText(e.target.value)}
                placeholder="Paste your DSA problem here...&#10;&#10;For example: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.'"
                className="w-full h-36 sm:h-48 p-4 sm:p-6 bg-muted/50 border-2 border-border rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-primary focus:border-primary/50 resize-none text-foreground placeholder-muted-foreground transition-all duration-300 hover:bg-muted/70 text-sm sm:text-base"
              />
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm text-muted-foreground">{problemText.length} characters</span>
                  {problemText.length > 0 && (
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  )}
                </div>
                <button
                  onClick={analyzeProblem}
                  disabled={!problemText.trim() || loadingAnalysis}
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-medium hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-400 dark:hover:to-purple-400 transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2 sm:space-x-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:hover:transform-none text-sm sm:text-base"
                >
                  {loadingAnalysis ? (
                    <>
                      <Loader className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Analyze Problem</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Analysis Results */}
          {loadingAnalysis && (
            <div className="flex justify-center items-center p-12 bg-card rounded-2xl border border-border shadow-xl">
              <div className="text-center">
                <div className="flex justify-center gap-4 mb-6">
                  <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-4 h-4 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <div className="flex items-center gap-3">
                  <Brain className="w-8 h-8 text-primary animate-pulse" />
                  <span className="text-xl text-foreground">AI is analyzing your problem...</span>
                </div>
              </div>
            </div>
          )}
          
          {analysis && !loadingAnalysis && (
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-border shadow-xl animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                  <FileText className="w-7 h-7 text-green-500" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground">AI Analysis</h3>
                <div className="ml-auto flex gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <div className="text-foreground leading-loose whitespace-pre-wrap bg-gradient-to-br from-muted/40 to-muted/20 p-5 sm:p-8 rounded-2xl border-2 border-border/50 shadow-inner space-y-4">
                  {analysis.summary.split('\n\n').map((paragraph, idx) => {
                    if (paragraph.trim().startsWith('#')) {
                      const level = paragraph.match(/^#+/)?.[0].length || 1;
                      const text = paragraph.replace(/^#+\s*/, '');
                      const HeadingTag = `h${Math.min(level + 1, 6)}` as keyof JSX.IntrinsicElements;
                      return (
                        <HeadingTag key={idx} className="font-bold text-primary mt-6 mb-3 first:mt-0">
                          {text}
                        </HeadingTag>
                      );
                    }
                    if (paragraph.trim().match(/^[\d]+\.|^[-*•]/)) {
                      return (
                        <div key={idx} className="flex gap-3 pl-4">
                          <span className="text-primary font-bold flex-shrink-0">•</span>
                          <p className="text-foreground/90">{paragraph.replace(/^[\d]+\.|^[-*•]\s*/, '')}</p>
                        </div>
                      );
                    }
                    const formattedText = paragraph.split(/(\*\*.*?\*\*)/).map((part, i) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={i} className="text-foreground font-semibold">{part.slice(2, -2)}</strong>;
                      }
                      return part;
                    });
                    return paragraph.trim() ? (
                      <p key={idx} className="text-foreground/90 leading-relaxed">
                        {formattedText}
                      </p>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Hints Section */}
          {analysis && !loadingAnalysis && analysis.hints.length > 0 && (
            <div className="glass-card rounded-2xl p-6 sm:p-8 shadow-xl border border-border animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
                  <Lightbulb className="w-7 h-7 text-yellow-500 animate-pulse" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground">Progressive Hints</h3>
              </div>
              
              {visibleHintIndex === -1 ? (
                <div className="text-center py-8">
                  <div className="mb-6">
                    <Sparkles className="w-16 h-16 text-yellow-500 mx-auto animate-bounce" />
                  </div>
                  <button
                    onClick={() => setVisibleHintIndex(0)}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-2xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5 mx-auto"
                  >
                    <Lightbulb className="w-5 h-5" />
                    <span>Show First Hint</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {analysis.hints.slice(0, visibleHintIndex + 1).map((hint, index) => (
                    <div key={index} className="bg-muted/30 p-6 rounded-xl border border-border animate-fade-in">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{index + 1}</span>
                        </div>
                        <p className="font-semibold text-yellow-600 dark:text-yellow-400">Hint {index + 1}</p>
                      </div>
                      <p className="text-foreground leading-relaxed ml-11">{hint}</p>
                    </div>
                  ))}
                  {visibleHintIndex < analysis.hints.length - 1 && (
                    <div className="text-center pt-4">
                      <button
                        onClick={() => setVisibleHintIndex(prev => prev + 1)}
                        className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 mx-auto"
                      >
                        <span>Next Hint</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Right Column: AI Chat Assistant (Grid Span 1) */}
        <div className="lg:col-span-1 h-full">
          <div className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl border border-border flex flex-col h-[600px] sticky top-24">
            <div className="flex items-center justify-between gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-2 sm:p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg sm:rounded-xl">
                  <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500 animate-pulse animate-bounce" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-foreground">AI DSA Assistant</h2>
              </div>
              {chatMessages.length > 0 && (
                <button 
                  onClick={clearHistory}
                  className="p-2 text-muted-foreground hover:text-destructive transition-colors duration-200"
                  title="Clear History"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )} 
            </div> 

            <div className="bg-muted/30 rounded-xl border border-border flex-grow overflow-hidden flex flex-col mb-2">
              <div className="flex-grow overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 h-96">
                {chatMessages.length === 0 ? (
                  <div className="text-center text-foreground py-6 sm:py-8">
                    <Bot className="w-14 h-14 mx-auto text-emerald-500 mb-4" />
                    <p className="text-base sm:text-lg font-bold mb-2 text-foreground">Hi! I'm your SDE Assistant 🤖</p>
                    <p className="text-xs text-muted-foreground mb-4 leading-relaxed">Ask me anything about algorithms and complexity optimizations!</p>
                    <div className="text-left bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-xl border border-emerald-100 dark:border-emerald-950 text-xs">
                      <p className="font-bold text-emerald-700 dark:text-emerald-400 mb-2">Try asking:</p>
                      <ul className="space-y-1.5 text-muted-foreground font-medium">
                        <li>• "Explain the Two Sum problem"</li>
                        <li>• "How do I reverse a linked list?"</li>
                        <li>• "What is binary tree traversal?"</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  chatMessages.map((message) => (
                    <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                      <div className={`max-w-[90%] p-4 rounded-2xl shadow-sm text-xs sm:text-sm ${
                        message.type === 'user' 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none' 
                          : 'bg-gradient-to-br from-muted/60 to-muted/30 text-foreground border border-border/50 rounded-bl-none'
                      }`}>
                        <div className="flex items-start space-x-2">
                          <div className="flex-1 space-y-2">
                            {message.content.split('\n\n').map((paragraph, idx) => {
                              if (paragraph.trim().startsWith('#')) {
                                const text = paragraph.replace(/^#+\s*/, '');
                                return (
                                  <h4 key={idx} className="font-bold text-sm text-primary mb-1">
                                    {text}
                                  </h4>
                                );
                              }
                              if (paragraph.trim().match(/^[\d]+\.|^[-*•]/)) {
                                return (
                                  <div key={idx} className="flex gap-1.5 pl-1 my-1">
                                    <span className="font-bold text-primary">•</span>
                                    <span className="text-foreground/90">{paragraph.replace(/^[\d]+\.|^[-*•]\s*/, '')}</span>
                                  </div>
                                );
                              }
                              const formattedText = paragraph.split(/(\*\*.*?\*\*)/).map((part, i) => {
                                if (part.startsWith('**') && part.endsWith('**')) {
                                  return <strong key={i} className="font-bold text-primary">{part.slice(2, -2)}</strong>;
                                }
                                return part;
                              });
                              return paragraph.trim() ? (
                                <p key={idx} className="leading-relaxed">
                                  {formattedText}
                                </p>
                              ) : null;
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
                {isLoading && (
                  <div className="flex justify-start animate-fade-in">
                    <div className="bg-muted/50 p-3 rounded-2xl border border-border">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="border-t border-border p-3 bg-muted/20">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask AI mentor..."
                    className="flex-1 px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-xs sm:text-sm"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!userInput.trim() || isLoading}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-2 rounded-lg hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 shadow-md"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProblemAnalyzerEnhanced;
