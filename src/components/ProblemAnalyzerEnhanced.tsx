import { useState } from "react";
import { Send, Bot, User, BookOpen, ExternalLink, Loader, FileText } from "lucide-react";

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const ProblemAnalyzerEnhanced = () => {
  const [problemText, setProblemText] = useState("");
  const [analysis, setAnalysis] = useState<{ summary: string } | null>(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
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

  const GEMINI_API_KEY = "AIzaSyBCXu4gQcNNQIF8jxqdDTfuSaOBMyBZZg4";

  const analyzeProblem = async () => {
    if (!problemText.trim()) return;
    
    setLoadingAnalysis(true);
    setAnalysis(null);
    try {
      const prompt = `Analyze the following DSA problem and provide a detailed explanation with:
1. Simple summary for beginners
2. Input/Output examples with explanation
3. Two approaches (brute force and optimal) with time/space complexity
4. Edge cases to consider
5. Similar problems

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
      
      setAnalysis({ summary: response });
    } catch (error) {
      console.error("Analysis error:", error);
      setAnalysis({
        summary: "Error: Could not analyze the problem. Please try again.",
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
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          DSA Problem Analyzer & AI Assistant
        </h1>
        <p className="text-slate-600 text-lg">Get step-by-step explanations and AI-powered help for any DSA problem</p>
      </div>

      {/* DSA Sheets Section */}
      <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-6 shadow-lg border border-violet-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-violet-600" />
          Popular DSA Practice Sheets
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dsaSheets.map((sheet, index) => (
            <a
              key={index}
              href={sheet.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-4 rounded-lg border border-violet-200 hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-slate-800 group-hover:text-violet-700">{sheet.name}</h3>
                <ExternalLink className="w-4 h-4 text-violet-600" />
              </div>
              <p className="text-sm text-slate-600">{sheet.description}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Problem Input Section */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Analyze any DSA Problem</h2>
        <textarea
          value={problemText}
          onChange={(e) => setProblemText(e.target.value)}
          placeholder="Paste your DSA problem here...&#10;&#10;For example: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.'"
          className="w-full h-40 p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none bg-white text-gray-900"
        />
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-500">{problemText.length} characters</span>
          <button
            onClick={analyzeProblem}
            disabled={!problemText.trim() || loadingAnalysis}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 flex items-center space-x-2"
          >
            {loadingAnalysis ? <Loader className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span>{loadingAnalysis ? "Analyzing..." : "Analyze Problem"}</span>
          </button>
        </div>
      </div>

      {/* Analysis Results */}
      {loadingAnalysis && (
        <div className="flex justify-center items-center p-10 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-blue-200">
          <Loader className="w-8 h-8 animate-spin text-blue-600 mr-4" />
          <span className="text-lg text-gray-700">AI is analyzing your problem...</span>
        </div>
      )}
      
      {analysis && !loadingAnalysis && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
          <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
            <FileText className="w-6 h-6 text-green-600 mr-2" />
            AI Analysis
          </h3>
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">{analysis.summary}</div>
        </div>
      )}

      {/* AI Chat Assistant */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 shadow-lg border border-emerald-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
          <Bot className="w-6 h-6 mr-2 text-emerald-600" />
          AI DSA Assistant
        </h2>
        
        <div className="bg-white rounded-lg border border-emerald-200 mb-4">
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {chatMessages.length === 0 ? (
              <div className="text-center text-slate-500 py-8">
                <Bot className="w-12 h-12 mx-auto mb-3 text-emerald-400" />
                <p className="text-lg font-medium mb-2">Hi! I'm your DSA AI Assistant 🤖</p>
                <p className="text-sm">Ask me anything about data structures and algorithms!</p>
                <div className="mt-4 text-xs text-left bg-emerald-50 p-3 rounded-lg">
                  <p className="font-medium mb-1">Try asking:</p>
                  <ul className="space-y-1">
                    <li>• "Explain the Two Sum problem"</li>
                    <li>• "How do I reverse a linked list?"</li>
                    <li>• "What is binary tree traversal?"</li>
                  </ul>
                </div>
              </div>
            ) : (
              chatMessages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-slate-100 text-slate-800'
                  }`}>
                    <div className="flex items-start space-x-2">
                      {message.type === 'ai' && <Bot className="w-4 h-4 mt-1 text-emerald-600" />}
                      {message.type === 'user' && <User className="w-4 h-4 mt-1" />}
                      <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                    </div>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4 text-emerald-600" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="border-t border-emerald-200 p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about any DSA problem or concept..."
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900"
              />
              <button
                onClick={handleSendMessage}
                disabled={!userInput.trim() || isLoading}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemAnalyzerEnhanced;
