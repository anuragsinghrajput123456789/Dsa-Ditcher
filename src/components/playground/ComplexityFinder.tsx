
import { Brain, Clock, Database, TrendingUp, AlertCircle } from "lucide-react";

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
  const analyzeComplexity = (code: string): ComplexityResult => {
    const codeLines = code.toLowerCase();
    let timeComplexity = "O(1)";
    let spaceComplexity = "O(1)";
    let explanation = "Constant time operations";
    let details: string[] = [];
    let optimizations: string[] = [];
    let confidence: 'high' | 'medium' | 'low' = 'high';

    // Advanced pattern matching for complexity analysis
    const patterns = {
      nestedLoops: /for[\s\S]*?for|while[\s\S]*?while|for[\s\S]*?while|while[\s\S]*?for/g,
      singleLoop: /for\s*\(|while\s*\(|for\s+\w+\s+in/g,
      recursion: /def\s+\w+\([\s\S]*?\)[\s\S]*?\w+\(|function\s+\w+\([\s\S]*?\)[\s\S]*?\w+\(/g,
      sorting: /\.sort\(|sorted\(|merge_sort|quick_sort|heap_sort/g,
      hashMap: /dict\(|{|}|\bmap\b|hashmap|set\(/g,
      arrays: /\[|\]|array|list/g,
      binarySearch: /binary_search|bsearch|bisect/g,
      dpPatterns: /dp\[|memo\[|cache/g
    };

    // Time complexity analysis
    const nestedLoops = codeLines.match(patterns.nestedLoops);
    const singleLoop = codeLines.match(patterns.singleLoop);
    const sorting = codeLines.match(patterns.sorting);
    const binarySearch = codeLines.match(patterns.binarySearch);
    const recursion = codeLines.match(patterns.recursion);

    if (nestedLoops && nestedLoops.length >= 2) {
      timeComplexity = "O(n³)";
      explanation = "Triple nested loops detected";
      details.push("Multiple nested loops create cubic time complexity");
      optimizations.push("Consider using dynamic programming or memoization");
      confidence = 'high';
    } else if (nestedLoops && nestedLoops.length >= 1) {
      timeComplexity = "O(n²)";
      explanation = "Nested loops detected";
      details.push("Two nested loops create quadratic time complexity");
      optimizations.push("Use hash maps or two-pointer technique to optimize");
      confidence = 'high';
    } else if (sorting) {
      timeComplexity = "O(n log n)";
      explanation = "Sorting operation present";
      details.push("Efficient sorting algorithms have n log n complexity");
      optimizations.push("Consider if sorting is necessary for the solution");
      confidence = 'high';
    } else if (binarySearch) {
      timeComplexity = "O(log n)";
      explanation = "Binary search implementation";
      details.push("Binary search divides search space in half each iteration");
      optimizations.push("Excellent time complexity for search operations");
      confidence = 'high';
    } else if (singleLoop) {
      timeComplexity = "O(n)";
      explanation = "Single loop iteration";
      details.push("Linear traversal through data structure");
      optimizations.push("Consider early termination conditions");
      confidence = 'high';
    } else if (recursion) {
      timeComplexity = "O(2^n)";
      explanation = "Recursive calls detected";
      details.push("Exponential complexity due to recursive branching");
      optimizations.push("Use memoization or dynamic programming");
      confidence = 'medium';
    }

    // Space complexity analysis
    const hashMap = codeLines.match(patterns.hashMap);
    const arrays = codeLines.match(patterns.arrays);
    const dpPatterns = codeLines.match(patterns.dpPatterns);

    if (dpPatterns) {
      spaceComplexity = "O(n²)";
      details.push("2D dynamic programming table used");
    } else if (hashMap || arrays) {
      spaceComplexity = "O(n)";
      details.push("Additional data structures scale with input size");
    } else if (recursion) {
      spaceComplexity = "O(n)";
      details.push("Recursion stack space grows with input");
    } else {
      spaceComplexity = "O(1)";
      details.push("Only constant extra space used");
    }

    // Add general optimizations
    if (!optimizations.length) {
      optimizations.push("Code appears to be well optimized");
    }

    return {
      timeComplexity,
      spaceComplexity,
      explanation,
      details,
      optimizations,
      confidence
    };
  };

  const result = analyzeComplexity(code);

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
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg border border-blue-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <Brain className="w-6 h-6 mr-2 text-blue-600" />
          Complexity Analysis
        </h3>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getConfidenceColor(result.confidence)}`}>
          {result.confidence} confidence
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className={`bg-gradient-to-r ${getComplexityColor(result.timeComplexity)} rounded-lg p-4 text-white`}>
          <div className="flex items-center mb-2">
            <Clock className="w-5 h-5 mr-2" />
            <span className="font-semibold">Time Complexity</span>
          </div>
          <div className="text-3xl font-bold mb-1">{result.timeComplexity}</div>
          <p className="text-sm opacity-90">{result.explanation}</p>
        </div>

        <div className={`bg-gradient-to-r ${getComplexityColor(result.spaceComplexity)} rounded-lg p-4 text-white`}>
          <div className="flex items-center mb-2">
            <Database className="w-5 h-5 mr-2" />
            <span className="font-semibold">Space Complexity</span>
          </div>
          <div className="text-3xl font-bold mb-1">{result.spaceComplexity}</div>
          <p className="text-sm opacity-90">Memory usage</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-lg p-4 border border-blue-200">
          <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2 text-blue-600" />
            Analysis Details
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {result.details.map((detail, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                {detail}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
          <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
            <AlertCircle className="w-4 h-4 mr-2 text-green-600" />
            Optimization Suggestions
          </h4>
          <ul className="text-sm text-green-700 space-y-1">
            {result.optimizations.map((optimization, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                {optimization}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ComplexityFinder;
