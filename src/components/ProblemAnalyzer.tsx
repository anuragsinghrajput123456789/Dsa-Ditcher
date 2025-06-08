
import { useState } from "react";
import { Send, Loader, FileText, Clock, Zap, Target, AlertCircle, Link as LinkIcon } from "lucide-react";

const ProblemAnalyzer = () => {
  const [problemText, setProblemText] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const mockAnalysis = {
    simpleSummary: "This is a classic 'Two Sum' problem. You have a list of numbers and a target number. Your job is to find two numbers in the list that add up to the target. It's like finding two puzzle pieces that fit together perfectly!",
    inputOutput: {
      input: "Array of integers: [2, 7, 11, 15], Target: 9",
      output: "Indices of two numbers that sum to target: [0, 1]",
      explanation: "Because nums[0] + nums[1] = 2 + 7 = 9"
    },
    approaches: {
      bruteForce: {
        hint: "Check every possible pair of numbers",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        description: "Use two nested loops to check all combinations"
      },
      optimal: {
        hint: "Use a hash map to store visited numbers",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        description: "Store numbers as you iterate and check if complement exists"
      }
    },
    edgeCases: [
      "Array with only two elements",
      "No solution exists",
      "Multiple valid solutions",
      "Duplicate numbers in array"
    ],
    similarProblems: [
      { title: "3Sum", platform: "LeetCode", difficulty: "Medium", url: "https://leetcode.com/problems/3sum/" },
      { title: "Two Sum II", platform: "LeetCode", difficulty: "Easy", url: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/" },
      { title: "4Sum", platform: "LeetCode", difficulty: "Medium", url: "https://leetcode.com/problems/4sum/" }
    ]
  };

  const analyzeProblem = async () => {
    if (!problemText.trim()) return;
    
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setAnalysis(mockAnalysis);
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
          {/* Simple Summary */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
              <FileText className="w-6 h-6 text-green-600 mr-2" />
              Simple Summary
            </h3>
            <p className="text-gray-700 leading-relaxed">{analysis.simpleSummary}</p>
          </div>

          {/* Input/Output */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Target className="w-6 h-6 text-blue-600 mr-2" />
              Input & Output
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Input</h4>
                <p className="text-blue-700">{analysis.inputOutput.input}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Output</h4>
                <p className="text-green-700">{analysis.inputOutput.output}</p>
              </div>
            </div>
            <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-2">Explanation</h4>
              <p className="text-gray-700">{analysis.inputOutput.explanation}</p>
            </div>
          </div>

          {/* Approaches */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Clock className="w-5 h-5 text-orange-500 mr-2" />
                Brute Force Approach
              </h3>
              <div className="space-y-3">
                <p className="text-gray-600">{analysis.approaches.bruteForce.description}</p>
                <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                  <p className="font-medium text-orange-800">Hint: {analysis.approaches.bruteForce.hint}</p>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Time: {analysis.approaches.bruteForce.timeComplexity}</span>
                  <span className="text-gray-600">Space: {analysis.approaches.bruteForce.spaceComplexity}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Zap className="w-5 h-5 text-green-500 mr-2" />
                Optimal Approach
              </h3>
              <div className="space-y-3">
                <p className="text-gray-600">{analysis.approaches.optimal.description}</p>
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <p className="font-medium text-green-800">Hint: {analysis.approaches.optimal.hint}</p>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Time: {analysis.approaches.optimal.timeComplexity}</span>
                  <span className="text-gray-600">Space: {analysis.approaches.optimal.spaceComplexity}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Edge Cases */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <AlertCircle className="w-6 h-6 text-yellow-600 mr-2" />
              Edge Cases to Consider
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {analysis.edgeCases.map((edgeCase: string, index: number) => (
                <div key={index} className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  <p className="text-yellow-800">{edgeCase}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Similar Problems */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <LinkIcon className="w-6 h-6 text-purple-600 mr-2" />
              Similar Problems
            </h3>
            <div className="space-y-3">
              {analysis.similarProblems.map((problem: any, index: number) => (
                <a
                  key={index}
                  href={problem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div>
                    <h4 className="font-medium text-gray-800 group-hover:text-blue-600">{problem.title}</h4>
                    <p className="text-sm text-gray-600">{problem.platform}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {problem.difficulty}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProblemAnalyzer;
