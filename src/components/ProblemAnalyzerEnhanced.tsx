
import { useState } from "react";
import { Search, Lightbulb, Target, Clock, Brain, HelpCircle, ChevronDown, ChevronRight } from "lucide-react";

interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  description: string;
  hints: string[];
  timeComplexity: string;
  spaceComplexity: string;
  approaches: string[];
  examples: { input: string; output: string; explanation: string }[];
}

const ProblemAnalyzerEnhanced = () => {
  const [selectedProblem, setSelectedProblem] = useState<string>("");
  const [showHints, setShowHints] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const problems: Problem[] = [
    {
      id: "two-sum",
      title: "Two Sum",
      difficulty: "Easy",
      category: "Array",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      hints: [
        "Think about what you need to find for each number to make the target sum",
        "Can you store previously seen numbers and their indices?",
        "A hash map can give you O(1) lookup time",
        "For each number, check if (target - current number) exists in your hash map"
      ],
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      approaches: ["Brute Force O(n²)", "Hash Map O(n)", "Two Pointers (sorted array)"],
      examples: [
        {
          input: "nums = [2,7,11,15], target = 9",
          output: "[0,1]",
          explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]"
        }
      ]
    },
    {
      id: "reverse-linked-list",
      title: "Reverse Linked List",
      difficulty: "Easy",
      category: "Linked List",
      description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
      hints: [
        "You need to reverse the direction of pointers",
        "Keep track of the previous node as you iterate",
        "Use three pointers: previous, current, and next",
        "Don't forget to handle the null termination"
      ],
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      approaches: ["Iterative with 3 pointers", "Recursive approach"],
      examples: [
        {
          input: "[1,2,3,4,5]",
          output: "[5,4,3,2,1]",
          explanation: "The linked list is reversed"
        }
      ]
    },
    {
      id: "binary-tree-inorder",
      title: "Binary Tree Inorder Traversal",
      difficulty: "Medium",
      category: "Tree",
      description: "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
      hints: [
        "Inorder means: Left -> Root -> Right",
        "You can solve this recursively or iteratively",
        "For iterative approach, use a stack",
        "Process left subtree completely before visiting root"
      ],
      timeComplexity: "O(n)",
      spaceComplexity: "O(h) where h is height",
      approaches: ["Recursive DFS", "Iterative with Stack", "Morris Traversal O(1) space"],
      examples: [
        {
          input: "root = [1,null,2,3]",
          output: "[1,3,2]",
          explanation: "Inorder traversal visits nodes in left-root-right order"
        }
      ]
    }
  ];

  const categories = ["All", "Array", "Linked List", "Tree", "Graph", "Dynamic Programming", "String"];

  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         problem.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || problem.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const selectedProblemData = problems.find(p => p.id === selectedProblem);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Array': 'bg-blue-100 text-blue-800',
      'Linked List': 'bg-purple-100 text-purple-800',
      'Tree': 'bg-green-100 text-green-800',
      'Graph': 'bg-indigo-100 text-indigo-800',
      'Dynamic Programming': 'bg-orange-100 text-orange-800',
      'String': 'bg-pink-100 text-pink-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Problem Analyzer
        </h1>
        <p className="text-gray-600 text-lg">Analyze problems step-by-step with hints and multiple approaches</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-gradient-to-br from-white to-purple-50 rounded-xl p-6 shadow-lg border border-purple-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search problems..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent min-w-[150px]"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Problem List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Problems</h2>
            <div className="space-y-3">
              {filteredProblems.map((problem) => (
                <button
                  key={problem.id}
                  onClick={() => {
                    setSelectedProblem(problem.id);
                    setShowHints(false);
                    setCurrentHint(0);
                  }}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                    selectedProblem === problem.id
                      ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50'
                      : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="font-medium text-gray-800 mb-2">{problem.title}</div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(problem.category)}`}>
                      {problem.category}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Problem Details */}
        <div className="lg:col-span-2">
          {selectedProblemData ? (
            <div className="space-y-6">
              {/* Problem Header */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">{selectedProblemData.title}</h2>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(selectedProblemData.difficulty)}`}>
                      {selectedProblemData.difficulty}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedProblemData.category)}`}>
                      {selectedProblemData.category}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{selectedProblemData.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-center mb-2">
                      <Clock className="w-4 h-4 mr-2 text-blue-600" />
                      <span className="font-semibold text-blue-800">Time Complexity</span>
                    </div>
                    <div className="text-xl font-bold text-blue-600">{selectedProblemData.timeComplexity}</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center mb-2">
                      <Target className="w-4 h-4 mr-2 text-green-600" />
                      <span className="font-semibold text-green-800">Space Complexity</span>
                    </div>
                    <div className="text-xl font-bold text-green-600">{selectedProblemData.spaceComplexity}</div>
                  </div>
                </div>
              </div>

              {/* Hints Section */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 shadow-lg border border-yellow-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-yellow-600" />
                    Hints & Guidance
                  </h3>
                  <button
                    onClick={() => setShowHints(!showHints)}
                    className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-4 py-2 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 flex items-center space-x-2"
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>{showHints ? 'Hide Hints' : 'Show Hints'}</span>
                  </button>
                </div>

                {showHints && (
                  <div className="space-y-3">
                    {selectedProblemData.hints.slice(0, currentHint + 1).map((hint, index) => (
                      <div key={index} className="bg-white rounded-lg p-4 border border-yellow-200">
                        <div className="flex items-start space-x-3">
                          <div className="bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <p className="text-gray-700 flex-1">{hint}</p>
                        </div>
                      </div>
                    ))}
                    
                    {currentHint < selectedProblemData.hints.length - 1 && (
                      <button
                        onClick={() => setCurrentHint(currentHint + 1)}
                        className="text-yellow-600 hover:text-yellow-700 font-medium flex items-center space-x-1"
                      >
                        <span>Show next hint</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Approaches */}
              <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 shadow-lg border border-blue-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Brain className="w-6 h-6 mr-2 text-blue-600" />
                  Solution Approaches
                </h3>
                <div className="space-y-2">
                  {selectedProblemData.approaches.map((approach, index) => (
                    <div key={index} className="bg-white rounded-lg p-3 border border-blue-200">
                      <div className="flex items-center space-x-2">
                        <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </span>
                        <span className="text-gray-700">{approach}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Examples */}
              <div className="bg-gradient-to-br from-white to-green-50 rounded-xl p-6 shadow-lg border border-green-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Examples</h3>
                <div className="space-y-4">
                  {selectedProblemData.examples.map((example, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-green-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                        <div>
                          <span className="font-semibold text-gray-700">Input:</span>
                          <div className="bg-gray-100 rounded p-2 font-mono text-sm mt-1">{example.input}</div>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Output:</span>
                          <div className="bg-gray-100 rounded p-2 font-mono text-sm mt-1">{example.output}</div>
                        </div>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Explanation:</span>
                        <p className="text-gray-600 mt-1">{example.explanation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl p-12 shadow-lg border border-gray-100 text-center">
              <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Select a Problem</h3>
              <p className="text-gray-600">Choose a problem from the list to analyze it step by step</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemAnalyzerEnhanced;
