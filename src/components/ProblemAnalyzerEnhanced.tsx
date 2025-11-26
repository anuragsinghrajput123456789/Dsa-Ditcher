
import { useState } from "react";
import { Send, Bot, User, BookOpen, ExternalLink, Loader, FileText, Lightbulb, ArrowRight, Sparkles, Zap, Brain, Code2, Rocket } from "lucide-react";

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
  const [problemText, setProblemText] = useState("");
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [visibleHintIndex, setVisibleHintIndex] = useState(-1);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const GEMINI_API_KEY = "AIzaSyA1qRYSYXo5fY88oGe-aVg0v9xUzMlx4Us";

  const analyzeProblem = async () => {
    if (!problemText.trim()) return;
    
    setLoadingAnalysis(true);
    setAnalysis(null);
    setVisibleHintIndex(-1);
    try {
      const prompt = `Analyze the following DSA problem and provide a detailed explanation with:
1. Simple summary for beginners
2. Input/Output examples with explanation
3. Two approaches (brute force and optimal) with time/space complexity
4. Edge cases to consider
5. Similar problems

Additionally, provide 3-5 progressive hints to solve the problem. Each hint should be on a new line and must start with the prefix "HINT:".

Problem: ${problemText}`;

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

      const data = await res.json();
      const response = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't analyze your problem.";
      
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

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: userInput,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    const currentInput = userInput;
    setUserInput("");
    setIsLoading(true);

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

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process your request. Try again!";

      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: answer,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, aiResponse]);
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
    <div className="min-h-screen bg-background text-foreground space-y-8 p-6 animate-fade-in">
      {/* Header */}
      <div className="text-center animate-scale-in">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl shadow-lg animate-pulse">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <div className="p-4 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl shadow-lg animate-pulse" style={{animationDelay: '0.2s'}}>
            <Zap className="w-10 h-10 text-white" />
          </div>
          <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg animate-pulse" style={{animationDelay: '0.4s'}}>
            <Sparkles className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
          DSA Problem Analyzer & AI Assistant
        </h1>
        <p className="text-muted-foreground text-xl">Get step-by-step explanations and AI-powered help for any DSA problem</p>
      </div>

      {/* DSA Sheets Section */}
      <div className="bg-card rounded-2xl p-8 shadow-xl border border-border animate-fade-in">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
            <BookOpen className="w-7 h-7 text-purple-500" />
          </div>
          <h2 className="text-3xl font-bold text-foreground">Popular DSA Practice Sheets</h2>
          <Sparkles className="w-6 h-6 text-purple-500 animate-bounce ml-auto" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dsaSheets.map((sheet, index) => {
            const Icon = sheet.icon;
            return (
              <a
                key={index}
                href={sheet.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-card border-2 border-border p-6 rounded-2xl hover:border-primary/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${sheet.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <ExternalLink className="w-5 h-5 text-primary group-hover:text-primary/80 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </div>
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-2">{sheet.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{sheet.description}</p>
              </a>
            );
          })}
        </div>
      </div>

      {/* Problem Input Section */}
      <div className="bg-card rounded-2xl p-8 shadow-xl border border-border animate-fade-in">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
            <FileText className="w-7 h-7 text-blue-500" />
          </div>
          <h2 className="text-3xl font-bold text-foreground">Analyze any DSA Problem</h2>
        </div>
        
        <div className="space-y-4">
          <textarea
            value={problemText}
            onChange={(e) => setProblemText(e.target.value)}
            placeholder="Paste your DSA problem here...&#10;&#10;For example: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.'"
            className="w-full h-48 p-6 bg-muted/50 border-2 border-border rounded-2xl focus:ring-2 focus:ring-primary focus:border-primary/50 resize-none text-foreground placeholder-muted-foreground transition-all duration-300 hover:bg-muted/70"
          />
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{problemText.length} characters</span>
              {problemText.length > 0 && (
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              )}
            </div>
            <button
              onClick={analyzeProblem}
              disabled={!problemText.trim() || loadingAnalysis}
              className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white px-8 py-4 rounded-2xl font-medium hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-400 dark:hover:to-purple-400 transition-all duration-300 disabled:opacity-50 flex items-center space-x-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:hover:transform-none"
            >
              {loadingAnalysis ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
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
        <div className="bg-card rounded-2xl p-8 border border-border shadow-xl animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
              <FileText className="w-7 h-7 text-green-500" />
            </div>
            <h3 className="text-3xl font-bold text-foreground">AI Analysis</h3>
            <div className="ml-auto flex gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
          <div className="text-foreground leading-relaxed whitespace-pre-wrap bg-muted/30 p-6 rounded-xl border border-border">{analysis.summary}</div>
        </div>
      )}

      {/* Hints Section */}
      {analysis && !loadingAnalysis && analysis.hints.length > 0 && (
        <div className="bg-card rounded-2xl p-8 shadow-xl border border-border animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
              <Lightbulb className="w-7 h-7 text-yellow-500 animate-pulse" />
            </div>
            <h3 className="text-3xl font-bold text-foreground">Progressive Hints</h3>
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

      {/* AI Chat Assistant */}
      <div className="bg-card rounded-2xl p-6 shadow-xl border border-border animate-fade-in">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
            <Bot className="w-7 h-7 text-emerald-500 animate-pulse" />
          </div>
          <h2 className="text-3xl font-bold text-foreground">AI DSA Assistant</h2>
        </div>
        
        <div className="bg-muted/30 rounded-xl border border-border mb-4">
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {chatMessages.length === 0 ? (
              <div className="text-center text-foreground py-8">
                <div className="mb-6">
                  <Bot className="w-20 h-20 mx-auto text-emerald-500 animate-bounce" />
                </div>
                <p className="text-2xl font-medium mb-3 text-foreground">Hi! I'm your DSA AI Assistant 🤖</p>
                <p className="text-muted-foreground mb-6">Ask me anything about data structures and algorithms!</p>
                <div className="mt-8 text-sm text-left bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-xl border border-emerald-200 dark:border-emerald-700/50">
                  <p className="font-medium mb-3 text-emerald-700 dark:text-emerald-300">Try asking:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      "Explain the Two Sum problem"
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      "How do I reverse a linked list?"
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      "What is binary tree traversal?"
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              chatMessages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                      : 'bg-muted/50 text-foreground border border-border shadow-lg'
                  }`}>
                    <div className="flex items-start space-x-3">
                      {message.type === 'ai' && (
                        <div className="p-1 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                          <Bot className="w-4 h-4 text-emerald-500" />
                        </div>
                      )}
                      {message.type === 'user' && (
                        <div className="p-1 bg-white/20 rounded-lg">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
                    </div>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-muted/50 p-4 rounded-2xl border border-border shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-1 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                      <Bot className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="border-t border-border p-4 bg-muted/20 rounded-b-xl">
            <div className="flex space-x-3">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about any DSA problem or concept..."
                className="flex-1 px-4 py-3 bg-background border-2 border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary/50 text-foreground placeholder-muted-foreground transition-all duration-300"
              />
              <button
                onClick={handleSendMessage}
                disabled={!userInput.trim() || isLoading}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-500 dark:to-teal-500 text-white px-6 py-3 rounded-xl hover:from-emerald-700 hover:to-teal-700 dark:hover:from-emerald-400 dark:hover:to-teal-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:hover:transform-none"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemAnalyzerEnhanced;
