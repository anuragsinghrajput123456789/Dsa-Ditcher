import { useState } from "react";
import { Search, Lightbulb, Target, Clock, Brain, HelpCircle, ChevronDown, ChevronRight, Send, Bot, User, BookOpen, ExternalLink } from "lucide-react";

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

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const ProblemAnalyzerEnhanced = () => {
  const [selectedProblem, setSelectedProblem] = useState<string>("");
  const [showHints, setShowHints] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         problem.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || problem.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const selectedProblemData = problems.find(p => p.id === selectedProblem);

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

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(userInput),
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('two sum')) {
      return `Great question! The Two Sum problem is a classic array problem. Here's a step-by-step explanation:

**Problem Understanding:**
- You have an array of numbers and a target sum
- Find two numbers that add up to the target
- Return their indices

**Example:**
Array: [2, 7, 11, 15], Target: 9
Answer: [0, 1] (because 2 + 7 = 9)

**Step-by-step approach:**
1. Create a hash map to store numbers we've seen
2. For each number, calculate what we need: target - current number
3. Check if that needed number exists in our hash map
4. If yes, return the indices; if no, add current number to hash map

**Why this works:**
- Hash map gives O(1) lookup time
- We only need to traverse the array once
- Time complexity: O(n), Space complexity: O(n)

Would you like me to explain any specific part in more detail?`;
    }
    
    if (lowerQuestion.includes('linked list')) {
      return `Linked Lists are fundamental data structures! Let me break it down:

**What is a Linked List?**
- A sequence of nodes where each node contains data and a pointer to the next node
- Unlike arrays, elements aren't stored in contiguous memory

**Basic Operations:**
1. **Traversal:** Start from head, follow pointers
2. **Insertion:** Create new node, update pointers
3. **Deletion:** Update pointers to skip the node

**Common Patterns:**
- **Two Pointers:** Fast and slow pointers for cycle detection
- **Reversal:** Change direction of pointers
- **Merging:** Combine two sorted lists

**Example - Reversing a List:**
Original: 1 → 2 → 3 → null
Reversed: 3 → 2 → 1 → null

The key is to use three pointers: previous, current, and next.

What specific linked list concept would you like me to explain further?`;
    }

    if (lowerQuestion.includes('tree') || lowerQuestion.includes('binary')) {
      return `Trees are hierarchical data structures! Let me explain:

**Binary Tree Basics:**
- Each node has at most two children: left and right
- Root is the top node, leaves have no children

**Tree Traversals:**
1. **Inorder:** Left → Root → Right
2. **Preorder:** Root → Left → Right  
3. **Postorder:** Left → Right → Root

**Example Tree:**
\`\`\`
    1
   / \\
  2   3
 / \\
4   5
\`\`\`

**Inorder traversal:** 4, 2, 5, 1, 3

**Common Patterns:**
- **DFS:** Use recursion or stack
- **BFS:** Use queue for level-order traversal
- **Path problems:** Track path from root to leaves

**When to use which traversal:**
- Inorder: Get sorted values in BST
- Preorder: Copy/clone tree structure
- Postorder: Delete tree, calculate size

Which tree concept interests you most?`;
    }

    return `I'd be happy to help explain any DSA concept! Here are some things I can help with:

**Popular Topics:**
- Arrays & Two Pointers
- Linked Lists & Fast/Slow Pointers
- Trees & Graph Traversals
- Dynamic Programming
- Hash Maps & Sets
- Sorting & Searching Algorithms

**How I can help:**
✅ Break down complex problems into simple steps
✅ Provide real-world examples and analogies
✅ Explain time/space complexity
✅ Show different solution approaches
✅ Give coding patterns and templates

Feel free to ask about any specific problem or concept! You can also paste a problem statement and I'll explain it step by step.

What would you like to learn about today?`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Hard': return 'bg-rose-100 text-rose-800 border-rose-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
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

      {/* Search and Filter */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-lg border border-blue-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search problems..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
              />
            </div>
          </div>
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-w-[150px] bg-white"
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
          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Problems</h2>
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
                      ? 'border-indigo-500 bg-gradient-to-r from-indigo-50 to-purple-50'
                      : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="font-medium text-slate-800 mb-2">{problem.title}</div>
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

        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
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
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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

          {/* Problem Details */}
          {selectedProblemData && (
            <div className="space-y-6">
              {/* Problem Header */}
              <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl p-6 shadow-lg border border-slate-200">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-slate-800">{selectedProblemData.title}</h2>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(selectedProblemData.difficulty)}`}>
                      {selectedProblemData.difficulty}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedProblemData.category)}`}>
                      {selectedProblemData.category}
                    </span>
                  </div>
                </div>
                <p className="text-slate-700 mb-4">{selectedProblemData.description}</p>
                
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
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 shadow-lg border border-amber-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-slate-800 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-amber-600" />
                    Hints & Guidance
                  </h3>
                  <button
                    onClick={() => setShowHints(!showHints)}
                    className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-2 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-200 flex items-center space-x-2"
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>{showHints ? 'Hide Hints' : 'Show Hints'}</span>
                  </button>
                </div>

                {showHints && (
                  <div className="space-y-3">
                    {selectedProblemData.hints.slice(0, currentHint + 1).map((hint, index) => (
                      <div key={index} className="bg-white rounded-lg p-4 border border-amber-200">
                        <div className="flex items-start space-x-3">
                          <div className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <p className="text-slate-700 flex-1">{hint}</p>
                        </div>
                      </div>
                    ))}
                    
                    {currentHint < selectedProblemData.hints.length - 1 && (
                      <button
                        onClick={() => setCurrentHint(currentHint + 1)}
                        className="text-amber-600 hover:text-amber-700 font-medium flex items-center space-x-1"
                      >
                        <span>Show next hint</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Approaches */}
              <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 shadow-lg border border-blue-200">
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
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
                        <span className="text-slate-700">{approach}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Examples */}
              <div className="bg-gradient-to-br from-white to-green-50 rounded-xl p-6 shadow-lg border border-green-200">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Examples</h3>
                <div className="space-y-4">
                  {selectedProblemData.examples.map((example, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-green-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                        <div>
                          <span className="font-semibold text-slate-700">Input:</span>
                          <div className="bg-slate-100 rounded p-2 font-mono text-sm mt-1">{example.input}</div>
                        </div>
                        <div>
                          <span className="font-semibold text-slate-700">Output:</span>
                          <div className="bg-slate-100 rounded p-2 font-mono text-sm mt-1">{example.output}</div>
                        </div>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-700">Explanation:</span>
                        <p className="text-slate-600 mt-1">{example.explanation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemAnalyzerEnhanced;
