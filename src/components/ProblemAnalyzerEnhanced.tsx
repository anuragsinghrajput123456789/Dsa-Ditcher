
import { useState } from "react";
import { Send, Bot, User, BookOpen, ExternalLink, Loader, FileText, Lightbulb, ArrowRight } from "lucide-react";

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
  const [visibleHintIndex, setVisibleHintIndex] =useState(-1);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dsaSheets = [
    {
      name: "LeetCode 75",
      url: "https://leetcode.com/studyplan/leetcode-75/",
      description: "Essential problems to crack coding interviews"
    },
    {
      name: "NeetCode 150",
      url: "https://neetcode.io/practice",
      description: "150 most important problems for interviews"
    },
    {
      name: "Striver's SDE Sheet",
      url: "https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/",
      description: "180 problems for Software Development Engineer roles"
    },
    {
      name: "Blind 75",
      url: "https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions",
      description: "75 most asked coding interview questions"
    }
  ];

  const GEMINI_API_KEY = "AIzaSyAHI6dEYABoLBXht70PtS97_fPFruDipH8";

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

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
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
    setUserInput("");
    setIsLoading(true);

    try {
      const prompt =
        "You are an expert DSA mentor. Analyze and answer the following question from the user. Explain step by step, use DSA patterns, and help the user understand fundamental concepts where appropriate. Always be interactive and friendly.\n\n" +
        userInput;

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        }),
      });
      const data = await res.json();
      const answer =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't process your request. Try again!";

      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: answer,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    } catch {
      setChatMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          type: 'ai',
          content: "Error: Could not fetch a response from Gemini AI.",
          timestamp: new Date()
        }
      ]);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 space-y-8 p-6">
      <div className="text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
          DSA Problem Analyzer & AI Assistant
        </h1>
        <p className="text-gray-300 text-xl">Get step-by-step explanations and AI-powered help for any DSA problem</p>
      </div>

      {/* DSA Sheets Section */}
      <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 rounded-xl p-6 shadow-2xl border border-purple-700/30 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <BookOpen className="w-7 h-7 mr-3 text-purple-400" />
          Popular DSA Practice Sheets
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dsaSheets.map((sheet, index) => (
            <a
              key={index}
              href={sheet.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800/80 backdrop-blur-sm p-5 rounded-xl border border-gray-700/50 hover:border-purple-500/50 hover:bg-gray-800 transition-all duration-300 group transform hover:scale-105"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors">{sheet.name}</h3>
                <ExternalLink className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
              </div>
              <p className="text-sm text-gray-300">{sheet.description}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Problem Input Section */}
      <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-gray-700/50">
        <h2 className="text-2xl font-bold text-white mb-6">Analyze any DSA Problem</h2>
        <textarea
          value={problemText}
          onChange={(e) => setProblemText(e.target.value)}
          placeholder="Paste your DSA problem here...&#10;&#10;For example: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.'"
          className="w-full h-48 p-4 bg-gray-900/80 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-100 placeholder-gray-400"
        />
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-400">{problemText.length} characters</span>
          <button
            onClick={analyzeProblem}
            disabled={!problemText.trim() || loadingAnalysis}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 flex items-center space-x-2 shadow-lg"
          >
            {loadingAnalysis ? <Loader className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            <span>{loadingAnalysis ? "Analyzing..." : "Analyze Problem"}</span>
          </button>
        </div>
      </div>

      {/* Analysis Results */}
      {loadingAnalysis && (
        <div className="flex justify-center items-center p-12 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl border border-blue-700/30 backdrop-blur-sm">
          <Loader className="w-10 h-10 animate-spin text-blue-400 mr-4" />
          <span className="text-xl text-gray-200">AI is analyzing your problem...</span>
        </div>
      )}
      
      {analysis && !loadingAnalysis && (
        <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-xl p-6 border border-green-700/30 backdrop-blur-sm shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
            <FileText className="w-7 h-7 text-green-400 mr-3" />
            AI Analysis
          </h3>
          <div className="text-gray-200 leading-relaxed whitespace-pre-wrap bg-gray-900/50 p-4 rounded-lg border border-gray-700/30">{analysis.summary}</div>
        </div>
      )}

      {/* Hints Section */}
      {analysis && !loadingAnalysis && analysis.hints.length > 0 && (
        <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 rounded-xl p-6 shadow-2xl border border-yellow-700/30 backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Lightbulb className="w-7 h-7 mr-3 text-yellow-400" />
            Hints
          </h3>
          {visibleHintIndex === -1 ? (
            <button
              onClick={() => setVisibleHintIndex(0)}
              className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
            >
              <span>Show First Hint</span>
            </button>
          ) : (
            <div className="space-y-4">
              {analysis.hints.slice(0, visibleHintIndex + 1).map((hint, index) => (
                <div key={index} className="bg-gray-800/60 backdrop-blur-sm p-5 rounded-lg border border-yellow-600/30">
                  <p className="font-semibold text-yellow-300 mb-2">Hint {index + 1}</p>
                  <p className="text-gray-200">{hint}</p>
                </div>
              ))}
              {visibleHintIndex < analysis.hints.length - 1 && (
                <button
                  onClick={() => setVisibleHintIndex(prev => prev + 1)}
                  className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 flex items-center space-x-2 mt-4 shadow-lg"
                >
                  <span>Next Hint</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* AI Chat Assistant */}
      <div className="bg-gradient-to-br from-emerald-900/30 to-teal-900/30 rounded-xl p-6 shadow-2xl border border-emerald-700/30 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Bot className="w-7 h-7 mr-3 text-emerald-400" />
          AI DSA Assistant
        </h2>
        
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-lg border border-emerald-600/30 mb-4">
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {chatMessages.length === 0 ? (
              <div className="text-center text-gray-300 py-8">
                <Bot className="w-16 h-16 mx-auto mb-4 text-emerald-400" />
                <p className="text-xl font-medium mb-2 text-white">Hi! I'm your DSA AI Assistant 🤖</p>
                <p className="text-gray-300">Ask me anything about data structures and algorithms!</p>
                <div className="mt-6 text-sm text-left bg-emerald-900/30 p-4 rounded-lg border border-emerald-700/30">
                  <p className="font-medium mb-2 text-emerald-300">Try asking:</p>
                  <ul className="space-y-1 text-gray-300">
                    <li>• "Explain the Two Sum problem"</li>
                    <li>• "How do I reverse a linked list?"</li>
                    <li>• "What is binary tree traversal?"</li>
                  </ul>
                </div>
              </div>
            ) : (
              chatMessages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                      : 'bg-gray-800/80 backdrop-blur-sm text-gray-200 border border-gray-700/50'
                  }`}>
                    <div className="flex items-start space-x-2">
                      {message.type === 'ai' && <Bot className="w-5 h-5 mt-1 text-emerald-400" />}
                      {message.type === 'user' && <User className="w-5 h-5 mt-1" />}
                      <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                    </div>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg border border-gray-700/50">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-5 h-5 text-emerald-400" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="border-t border-emerald-700/30 p-4">
            <div className="flex space-x-3">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about any DSA problem or concept..."
                className="flex-1 px-4 py-3 bg-gray-900/80 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-100 placeholder-gray-400"
              />
              <button
                onClick={handleSendMessage}
                disabled={!userInput.trim() || isLoading}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
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
