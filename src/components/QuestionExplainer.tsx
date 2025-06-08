
import { useState } from "react";
import { Send, Loader, BookOpen, Code, Lightbulb, Target, Clock, Zap, ExternalLink } from "lucide-react";

const QuestionExplainer = () => {
  const [questionText, setQuestionText] = useState("");
  const [explanation, setExplanation] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const mockExplanation = {
    title: "Two Sum Problem",
    difficulty: "Easy",
    summary: "Think of this like finding two friends in a crowd whose ages add up to a specific number. You're given a list of people's ages and a target age sum. Your job is to find which two people, when their ages are added together, equal the target sum. The trick is to do this efficiently!",
    
    breakdown: {
      whatWeHave: "An array of integers (numbers) and a target sum",
      whatWeWant: "The positions (indices) of two numbers that add up to the target",
      constraint: "Each number can only be used once",
      example: "Array: [2, 7, 11, 15], Target: 9 → Answer: positions [0, 1] because 2 + 7 = 9"
    },

    approaches: [
      {
        name: "Brute Force",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        description: "Check every possible pair of numbers",
        steps: [
          "Start with the first number",
          "Check it with every other number",
          "If their sum equals target, return their positions",
          "If not found, move to the next number and repeat"
        ],
        code: `def twoSum(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []`,
        pros: ["Simple to understand", "No extra space needed"],
        cons: ["Slow for large arrays", "Checks same pairs multiple times"]
      },
      {
        name: "Hash Map (Optimal)",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        description: "Use a hash map to store numbers we've seen",
        steps: [
          "Create an empty hash map",
          "For each number, calculate what we need to reach target",
          "Check if we've seen that needed number before",
          "If yes, return positions. If no, store current number"
        ],
        code: `def twoSum(nums, target):
    seen = {}  # hash map to store number -> index
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
        pros: ["Much faster", "Single pass through array"],
        cons: ["Uses extra memory", "Slightly more complex"]
      }
    ],

    walkthrough: {
      input: "[2, 7, 11, 15], target = 9",
      steps: [
        { step: 1, action: "Look at 2", thinking: "Need 9-2=7. Haven't seen 7 yet. Store 2 at position 0." },
        { step: 2, action: "Look at 7", thinking: "Need 9-7=2. We've seen 2 at position 0!" },
        { step: 3, action: "Found answer", thinking: "Return [0, 1] because nums[0] + nums[1] = 2 + 7 = 9" }
      ]
    },

    edgeCases: [
      { case: "Empty array", handling: "Return empty result" },
      { case: "Array with one element", handling: "No pairs possible, return empty" },
      { case: "No solution exists", handling: "Return empty array or indicate no solution" },
      { case: "Multiple valid solutions", handling: "Return any one valid pair" },
      { case: "Duplicate numbers", handling: "Make sure not to use same index twice" }
    ],

    relatedProblems: [
      { 
        title: "Three Sum", 
        platform: "LeetCode", 
        difficulty: "Medium",
        url: "https://leetcode.com/problems/3sum/",
        connection: "Extension to three numbers instead of two"
      },
      { 
        title: "Two Sum II - Input Array Is Sorted", 
        platform: "LeetCode", 
        difficulty: "Easy",
        url: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
        connection: "Same problem but array is sorted - can use two pointers"
      },
      { 
        title: "Four Sum", 
        platform: "LeetCode", 
        difficulty: "Medium",
        url: "https://leetcode.com/problems/4sum/",
        connection: "Finding four numbers that sum to target"
      }
    ],

    practiceSheets: [
      {
        name: "NeetCode 150",
        url: "https://neetcode.io/practice",
        description: "Curated list of 150 essential coding problems",
        relevantSection: "Arrays & Hashing"
      },
      {
        name: "Blind 75",
        url: "https://leetcode.com/list/xi4ci4ig/",
        description: "75 most important LeetCode problems for interviews",
        relevantSection: "Array Problems"
      },
      {
        name: "Striver's A2Z DSA Sheet",
        url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/",
        description: "Comprehensive DSA learning path",
        relevantSection: "Step 3: Arrays"
      }
    ]
  };

  const explainQuestion = async () => {
    if (!questionText.trim()) return;
    
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2500));
    setExplanation(mockExplanation);
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">DSA Question Explainer</h1>
        <p className="text-gray-600 text-lg">Get detailed explanations for any DSA problem with examples and multiple approaches</p>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Paste Your Question</h2>
        <textarea
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Paste your DSA question here...

For example: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.'"
          className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-500">{questionText.length} characters</span>
          <button
            onClick={explainQuestion}
            disabled={!questionText.trim() || loading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 flex items-center space-x-2"
          >
            {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span>{loading ? "Analyzing..." : "Explain Question"}</span>
          </button>
        </div>
      </div>

      {/* Explanation Results */}
      {explanation && (
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{explanation.title}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  explanation.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                  explanation.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {explanation.difficulty}
                </span>
              </div>
              <BookOpen className="w-8 h-8 text-green-600" />
            </div>
          </div>

          {/* Simple Explanation */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Lightbulb className="w-6 h-6 text-yellow-500 mr-2" />
              Simple Explanation
            </h3>
            <p className="text-gray-700 leading-relaxed">{explanation.summary}</p>
          </div>

          {/* Problem Breakdown */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Target className="w-6 h-6 text-blue-600 mr-2" />
              Problem Breakdown
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">What we have:</h4>
                  <p className="text-gray-600">{explanation.breakdown.whatWeHave}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">What we want:</h4>
                  <p className="text-gray-600">{explanation.breakdown.whatWeWant}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Constraint:</h4>
                  <p className="text-gray-600">{explanation.breakdown.constraint}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Example:</h4>
                  <p className="text-gray-600 font-mono text-sm bg-gray-50 p-2 rounded">{explanation.breakdown.example}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Approaches */}
          <div className="space-y-6">
            {explanation.approaches.map((approach: any, index: number) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center">
                    {index === 0 ? <Clock className="w-6 h-6 text-orange-500 mr-2" /> : <Zap className="w-6 h-6 text-green-500 mr-2" />}
                    {approach.name}
                  </h3>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Time: {approach.timeComplexity}</div>
                    <div className="text-sm text-gray-600">Space: {approach.spaceComplexity}</div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{approach.description}</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Algorithm Steps:</h4>
                    <ol className="space-y-2">
                      {approach.steps.map((step: string, stepIndex: number) => (
                        <li key={stepIndex} className="flex items-start">
                          <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                            {stepIndex + 1}
                          </span>
                          <span className="text-gray-700">{step}</span>
                        </li>
                      ))}
                    </ol>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-green-800 mb-2">Pros:</h5>
                        <ul className="space-y-1">
                          {approach.pros.map((pro: string, proIndex: number) => (
                            <li key={proIndex} className="text-green-700 text-sm">• {pro}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-red-800 mb-2">Cons:</h5>
                        <ul className="space-y-1">
                          {approach.cons.map((con: string, conIndex: number) => (
                            <li key={conIndex} className="text-red-700 text-sm">• {con}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Code Implementation:</h4>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm">
                        <code>{approach.code}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Step-by-step Walkthrough */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Code className="w-6 h-6 text-purple-600 mr-2" />
              Step-by-Step Walkthrough
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <strong>Input:</strong> <code>{explanation.walkthrough.input}</code>
            </div>
            <div className="space-y-3">
              {explanation.walkthrough.steps.map((step: any, index: number) => (
                <div key={index} className="flex items-start space-x-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{step.action}</div>
                    <div className="text-gray-600 text-sm mt-1">{step.thinking}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Edge Cases */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Edge Cases to Consider</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {explanation.edgeCases.map((edge: any, index: number) => (
                <div key={index} className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-2">{edge.case}</h4>
                  <p className="text-yellow-700 text-sm">{edge.handling}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Problems */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <ExternalLink className="w-6 h-6 text-purple-600 mr-2" />
              Related Problems
            </h3>
            <div className="space-y-3">
              {explanation.relatedProblems.map((problem: any, index: number) => (
                <a
                  key={index}
                  href={problem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 group-hover:text-blue-600">{problem.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{problem.connection}</p>
                      <p className="text-xs text-gray-500 mt-2">{problem.platform}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                        problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {problem.difficulty}
                      </span>
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Practice Sheets */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Recommended Practice Sheets</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {explanation.practiceSheets.map((sheet: any, index: number) => (
                <a
                  key={index}
                  href={sheet.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 mb-2">{sheet.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{sheet.description}</p>
                  <div className="text-xs text-blue-600 font-medium">
                    Focus: {sheet.relevantSection}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionExplainer;
