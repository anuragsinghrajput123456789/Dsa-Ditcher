
import { useState } from "react";
import { Send, Loader, FileText, Clock, Zap, Target, AlertCircle, Link as LinkIcon } from "lucide-react";

const GEMINI_API_KEY = "AIzaSyBCXu4gQcNNQIF8jxqdDTfuSaOBMyBZZg4";

const ProblemAnalyzer = () => {
  const [problemText, setProblemText] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const analyzeProblem = async () => {
    if (!problemText.trim()) return;
    
    setLoading(true);
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
      
      // Parse the response and create structured analysis
      const structuredAnalysis = {
        simpleSummary: response,
        inputOutput: {
          input: "Check the AI response above for input details",
          output: "Check the AI response above for output details", 
          explanation: "Detailed explanation provided in the AI response above"
        },
        approaches: {
          bruteForce: {
            hint: "See AI response for brute force approach",
            timeComplexity: "Check AI response",
            spaceComplexity: "Check AI response",
            description: "Brute force approach details in AI response"
          },
          optimal: {
            hint: "See AI response for optimal approach", 
            timeComplexity: "Check AI response",
            spaceComplexity: "Check AI response",
            description: "Optimal approach details in AI response"
          }
        },
        edgeCases: ["Check AI response for edge cases"],
        similarProblems: []
      };
      
      setAnalysis(structuredAnalysis);
    } catch (error) {
      console.error("Analysis error:", error);
      setAnalysis({
        simpleSummary: "Error: Could not analyze the problem. Please try again.",
        inputOutput: { input: "", output: "", explanation: "" },
        approaches: { 
          bruteForce: { hint: "", timeComplexity: "", spaceComplexity: "", description: "" },
          optimal: { hint: "", timeComplexity: "", spaceComplexity: "", description: "" }
        },
        edgeCases: [],
        similarProblems: []
      });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">AI Problem Analyzer</h1>
        <p className="text-gray-600 text-lg">Paste any DSA problem and get instant AI-powered insights</p>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Problem Statement</h2>
        <textarea
          value={problemText}
          onChange={(e) => setProblemText(e.target.value)}
          placeholder="Paste your DSA problem here... 

For example: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.'"
          className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-500">{problemText.length} characters</span>
          <button
            onClick={analyzeProblem}
            disabled={!problemText.trim() || loading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 flex items-center space-x-2"
          >
            {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span>{loading ? "Analyzing..." : "Analyze Problem"}</span>
          </button>
        </div>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6">
          {/* AI Response */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
              <FileText className="w-6 h-6 text-green-600 mr-2" />
              AI Analysis
            </h3>
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">{analysis.simpleSummary}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProblemAnalyzer;
