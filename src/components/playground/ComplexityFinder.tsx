import { useState } from "react";
import { Brain, Clock, Database, TrendingUp, AlertCircle, Loader, Wand2 } from "lucide-react";

interface ComplexityFinderProps {
  code: string;
  language: string;
}

interface ComplexityResult {
  timeComplexity: string;
  spaceComplexity: string;
  explanation: string;
  details: string[];
  optimizations: string[];
  confidence: 'high' | 'medium' | 'low';
}

const ComplexityFinder = ({ code, language }: ComplexityFinderProps) => {
  const [result, setResult] = useState<ComplexityResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const GEMINI_API_KEY = "AIzaSyA1qRYSYXo5fY88oGe-aVg0v9xUzMlx4Us";

  const analyzeComplexity = async () => {
    if (!code.trim()) {
      setError("Code is empty. Please write some code to analyze.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setResult(null);

    const prompt = `Analyze the time and space complexity of the following ${language} code. Provide your answer in a valid JSON format. The JSON object must have the following keys: "timeComplexity" (e.g., "O(n^2)"), "spaceComplexity" (e.g., "O(n)"), "explanation" (a brief one-liner), "details" (an array of strings explaining the analysis), "optimizations" (an array of strings with suggestions), and "confidence" (a string which must be one of 'high', 'medium', or 'low').

Code:
\`\`\`${language}
${code}
\`\`\`

Your response must be only the JSON object, without any surrounding text or markdown formatting like \`\`\`json.`;

    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
          }
        }),
      });

      if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`);
      }
      
      const data = await res.json();
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!responseText) {
        throw new Error("No response from AI.");
      }
      
      const parsedResult: ComplexityResult = JSON.parse(responseText);
      setResult(parsedResult);

    } catch (e: any) {
      console.error("Complexity analysis error:", e);
      let errorMessage = "Failed to analyze complexity. The AI might be unable to parse this code.";
      if (e.message.includes("JSON")) {
        errorMessage = "The AI returned an invalid response. Please try again."
      } else if (e.message.includes("API")) {
        errorMessage = "There was an issue connecting to the AI service."
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getComplexityColor = (complexity: string) => {
    if (complexity.includes("O(1)")) return "from-green-500 to-emerald-500";
    if (complexity.includes("O(log")) return "from-blue-500 to-cyan-500";
    if (complexity.includes("O(n)") && !complexity.includes("²")) return "from-yellow-500 to-amber-500";
    if (complexity.includes("O(n log")) return "from-orange-500 to-yellow-500";
    if (complexity.includes("O(n²)")) return "from-red-500 to-pink-500";
    return "from-purple-500 to-red-500";
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high': return "text-green-600 bg-green-50";
      case 'medium': return "text-yellow-600 bg-yellow-50";
      case 'low': return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg border border-blue-100 p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <Brain className="w-6 h-6 mr-2 text-blue-600" />
          AI Complexity Analysis
        </h3>
        <button
          onClick={analyzeComplexity}
          disabled={isLoading}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 flex items-center space-x-2"
        >
          {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
          <span>{isLoading ? "Analyzing..." : "Analyze with AI"}</span>
        </button>
      </div>
      
      {isLoading && (
        <div className="flex justify-center items-center p-10 bg-white/50 rounded-lg">
          <Loader className="w-8 h-8 animate-spin text-blue-600 mr-4" />
          <span className="text-lg text-gray-700">AI is thinking...</span>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
          <strong className="font-bold">Analysis Failed: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {!isLoading && !error && !result && (
        <div className="text-center p-10 bg-white rounded-lg border border-dashed border-slate-300">
          <Brain className="w-12 h-12 mx-auto text-slate-400 mb-3" />
          <p className="text-slate-600 font-medium">Ready to analyze your code!</p>
          <p className="text-sm text-slate-500">Click the "Analyze with AI" button to get complexity insights.</p>
        </div>
      )}

      {result && (
        <div className="animate-fade-in space-y-6">
          <div className="flex items-center justify-end">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getConfidenceColor(result.confidence)}`}>
                {result.confidence.charAt(0).toUpperCase() + result.confidence.slice(1)} confidence
              </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`bg-gradient-to-r ${getComplexityColor(result.timeComplexity)} rounded-lg p-4 text-white shadow-lg`}>
              <div className="flex items-center mb-2">
                <Clock className="w-5 h-5 mr-2" />
                <span className="font-semibold">Time Complexity</span>
              </div>
              <div className="text-3xl font-bold mb-1">{result.timeComplexity}</div>
              <p className="text-sm opacity-90">{result.explanation}</p>
            </div>

            <div className={`bg-gradient-to-r ${getComplexityColor(result.spaceComplexity)} rounded-lg p-4 text-white shadow-lg`}>
              <div className="flex items-center mb-2">
                <Database className="w-5 h-5 mr-2" />
                <span className="font-semibold">Space Complexity</span>
              </div>
              <div className="text-3xl font-bold mb-1">{result.spaceComplexity}</div>
              <p className="text-sm opacity-90">Memory usage analysis</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-blue-600" />
                Analysis Details
              </h4>
              <ul className="text-sm text-gray-600 space-y-1 pl-1">
                {result.details.map((detail, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-[6px] mr-2 flex-shrink-0"></span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                <AlertCircle className="w-4 h-4 mr-2 text-green-600" />
                Optimization Suggestions
              </h4>
              <ul className="text-sm text-green-700 space-y-1 pl-1">
                {result.optimizations.map((optimization, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-[6px] mr-2 flex-shrink-0"></span>
                    <span>{optimization}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplexityFinder;
