
import { useState } from "react";
import { Search, BookOpen, Youtube, FileText, Zap, Clock, ExternalLink, Star, CheckCircle } from "lucide-react";

const TopicExplorer = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);

  const topics = [
    {
      id: "arrays",
      name: "Arrays",
      description: "Linear data structure storing elements in contiguous memory",
      difficulty: "Beginner",
      color: "from-blue-500 to-blue-600",
      icon: "📊",
      concepts: ["Basic Operations", "Two Pointers", "Sliding Window", "Sorting"],
      estimatedTime: "3-5 days",
      prerequisites: ["Basic Programming"],
    },
    {
      id: "linkedlists",
      name: "Linked Lists",
      description: "Dynamic data structure with nodes connected via pointers",
      difficulty: "Beginner",
      color: "from-green-500 to-green-600",
      icon: "🔗",
      concepts: ["Singly Linked", "Doubly Linked", "Circular", "Operations"],
      estimatedTime: "4-6 days",
      prerequisites: ["Arrays", "Pointers"],
    },
    {
      id: "stacks",
      name: "Stacks",
      description: "LIFO data structure for managing data in last-in-first-out order",
      difficulty: "Beginner",
      color: "from-purple-500 to-purple-600",
      icon: "📚",
      concepts: ["Push/Pop", "Applications", "Implementation", "Problems"],
      estimatedTime: "2-3 days",
      prerequisites: ["Arrays"],
    },
    {
      id: "queues",
      name: "Queues",
      description: "FIFO data structure for managing data in first-in-first-out order",
      difficulty: "Beginner",
      color: "from-yellow-500 to-yellow-600",
      icon: "🚶",
      concepts: ["Enqueue/Dequeue", "Circular Queue", "Priority Queue", "Applications"],
      estimatedTime: "2-3 days",
      prerequisites: ["Arrays"],
    },
    {
      id: "trees",
      name: "Trees",
      description: "Hierarchical data structure with parent-child relationships",
      difficulty: "Intermediate",
      color: "from-red-500 to-red-600",
      icon: "🌳",
      concepts: ["Binary Trees", "BST", "AVL", "Traversals"],
      estimatedTime: "7-10 days",
      prerequisites: ["Linked Lists", "Recursion"],
    },
    {
      id: "graphs",
      name: "Graphs",
      description: "Non-linear data structure with vertices and edges",
      difficulty: "Advanced",
      color: "from-indigo-500 to-indigo-600",
      icon: "🕸️",
      concepts: ["BFS", "DFS", "Shortest Path", "MST"],
      estimatedTime: "10-14 days",
      prerequisites: ["Trees", "Queues", "Stacks"],
    },
    {
      id: "dp",
      name: "Dynamic Programming",
      description: "Optimization technique using overlapping subproblems",
      difficulty: "Advanced",
      color: "from-pink-500 to-pink-600",
      icon: "💎",
      concepts: ["Memoization", "Tabulation", "Optimization", "Patterns"],
      estimatedTime: "14-21 days",
      prerequisites: ["Recursion", "Arrays"],
    },
    {
      id: "sorting",
      name: "Sorting Algorithms",
      description: "Algorithms to arrange data in specific order",
      difficulty: "Intermediate",
      color: "from-teal-500 to-teal-600",
      icon: "🔄",
      concepts: ["Bubble Sort", "Merge Sort", "Quick Sort", "Heap Sort"],
      estimatedTime: "5-7 days",
      prerequisites: ["Arrays", "Recursion"],
    },
    {
      id: "hashing",
      name: "Hashing",
      description: "Data structure that maps keys to values using hash functions",
      difficulty: "Intermediate",
      color: "from-orange-500 to-orange-600",
      icon: "🔑",
      concepts: ["Hash Tables", "Collision Handling", "Hash Functions", "Applications"],
      estimatedTime: "4-6 days",
      prerequisites: ["Arrays"],
    },
    {
      id: "heaps",
      name: "Heaps",
      description: "Complete binary tree with heap property",
      difficulty: "Intermediate",
      color: "from-cyan-500 to-cyan-600",
      icon: "⛰️",
      concepts: ["Min Heap", "Max Heap", "Priority Queue", "Heap Sort"],
      estimatedTime: "5-7 days",
      prerequisites: ["Trees", "Arrays"],
    },
    {
      id: "tries",
      name: "Tries",
      description: "Tree data structure for storing strings efficiently",
      difficulty: "Intermediate",
      color: "from-lime-500 to-lime-600",
      icon: "🌿",
      concepts: ["Prefix Tree", "Auto-complete", "Word Search", "Implementation"],
      estimatedTime: "3-5 days",
      prerequisites: ["Trees", "Strings"],
    },
    {
      id: "backtracking",
      name: "Backtracking",
      description: "Algorithmic approach for solving constraint satisfaction problems",
      difficulty: "Advanced",
      color: "from-violet-500 to-violet-600",
      icon: "🔄",
      concepts: ["N-Queens", "Sudoku", "Permutations", "Combinations"],
      estimatedTime: "7-10 days",
      prerequisites: ["Recursion", "Trees"],
    }
  ];

  const topicDetails = {
    arrays: {
      summary: "Arrays are the most fundamental data structure in programming. Think of them as a row of boxes where each box can hold one item, and each box has a number (index) to identify it. You can quickly access any item if you know its position.",
      bruteForce: "Start with simple nested loops for most problems. For searching, check each element one by one. For sorting, use simple comparison-based approaches.",
      optimal: "Use two pointers technique for pairs, sliding window for subarrays, and binary search for sorted arrays. Hash maps can reduce time complexity from O(n²) to O(n).",
      timeComplexity: "Access: O(1), Search: O(n), Insertion: O(n), Deletion: O(n)",
      spaceComplexity: "O(1) for operations, O(n) for storage",
      videos: [
        { title: "Arrays Explained Simply", url: "https://youtube.com/watch?v=arrays1", channel: "CS Dojo" },
        { title: "Two Pointers Technique", url: "https://youtube.com/watch?v=twopointers", channel: "NeetCode" },
        { title: "Sliding Window Pattern", url: "https://youtube.com/watch?v=slidingwindow", channel: "Abdul Bari" },
      ],
      resources: [
        { title: "Array Cheat Sheet", type: "PDF", url: "https://example.com/array-cheat-sheet" },
        { title: "Common Array Patterns", type: "Article", url: "https://leetcode.com/discuss/array-patterns" },
        { title: "GeeksforGeeks Arrays", type: "Tutorial", url: "https://geeksforgeeks.org/array-data-structure" },
      ],
      practiceSheets: [
        { title: "Striver's A2Z DSA Sheet", url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/", problems: 40 },
        { title: "Love Babbar 450 Problems", url: "https://450dsa.com/", problems: 450 },
        { title: "Blind 75", url: "https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions", problems: 75 },
      ]
    }
  };

  const filteredTopics = topics.filter(topic =>
    topic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId);
  };

  const toggleTopicCompletion = (topicId: string) => {
    setCompletedTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">DSA Topic Explorer</h1>
        <p className="text-gray-600 text-lg mb-6">Master data structures and algorithms with comprehensive learning resources</p>
        
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {!selectedTopic ? (
        <div className="space-y-6">
          {/* Progress Overview */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
            <h2 className="text-xl font-bold mb-4">Your Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-2xl font-bold">{completedTopics.length}</div>
                <div className="text-sm">Topics Completed</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-2xl font-bold">{topics.length}</div>
                <div className="text-sm">Total Topics</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-2xl font-bold">{Math.round((completedTopics.length / topics.length) * 100)}%</div>
                <div className="text-sm">Progress</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTopics.map((topic) => (
              <div
                key={topic.id}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 cursor-pointer hover:-translate-y-1 group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${topic.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    <span className="text-2xl">{topic.icon}</span>
                  </div>
                  <button
                    onClick={() => toggleTopicCompletion(topic.id)}
                    className={`p-1 rounded-full transition-colors ${
                      completedTopics.includes(topic.id) 
                        ? 'text-green-600 bg-green-100' 
                        : 'text-gray-400 hover:text-green-600'
                    }`}
                  >
                    <CheckCircle className="w-6 h-6" />
                  </button>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2">{topic.name}</h3>
                <p className="text-gray-600 mb-4 text-sm">{topic.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    {topic.estimatedTime}
                  </div>
                  <div className="text-xs text-gray-500">
                    Prerequisites: {topic.prerequisites.join(", ")}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    topic.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                    topic.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {topic.difficulty}
                  </span>
                  <button
                    onClick={() => handleTopicSelect(topic.id)}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    Learn More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => setSelectedTopic(null)}
            className="mb-6 text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Topics
          </button>
          
          {topicDetails.arrays && (
            <div className="space-y-6">
              {/* Topic Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Arrays</h1>
                    <p className="text-blue-100 mb-4">Master the foundation of all data structures</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span>⏱️ 3-5 days</span>
                      <span>📚 4 concepts</span>
                      <span>🏆 Beginner</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleTopicCompletion('arrays')}
                    className={`p-3 rounded-full transition-colors ${
                      completedTopics.includes('arrays') 
                        ? 'bg-green-500 text-white' 
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <CheckCircle className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Summary and Complexity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <Zap className="w-6 h-6 text-yellow-500 mr-2" />
                    Simple Summary
                  </h2>
                  <p className="text-gray-700 leading-relaxed">{topicDetails.arrays.summary}</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Complexity</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-700">Time</h4>
                      <p className="text-sm text-gray-600">{topicDetails.arrays.timeComplexity}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700">Space</h4>
                      <p className="text-sm text-gray-600">{topicDetails.arrays.spaceComplexity}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Approaches */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                    <Clock className="w-5 h-5 text-orange-500 mr-2" />
                    Brute Force Approach
                  </h3>
                  <p className="text-gray-600">{topicDetails.arrays.bruteForce}</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                    <Zap className="w-5 h-5 text-green-500 mr-2" />
                    Optimal Approach
                  </h3>
                  <p className="text-gray-600">{topicDetails.arrays.optimal}</p>
                </div>
              </div>

              {/* Learning Resources */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Videos */}
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <Youtube className="w-5 h-5 text-red-500 mr-2" />
                    Video Resources
                  </h3>
                  <div className="space-y-3">
                    {topicDetails.arrays.videos.map((video, index) => (
                      <a
                        key={index}
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <div className="flex items-center">
                          <Youtube className="w-6 h-6 text-red-500 mr-3" />
                          <div>
                            <p className="font-medium text-gray-800 group-hover:text-blue-600">{video.title}</p>
                            <p className="text-sm text-gray-500">{video.channel}</p>
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Resources */}
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <FileText className="w-5 h-5 text-blue-500 mr-2" />
                    Study Resources
                  </h3>
                  <div className="space-y-3">
                    {topicDetails.arrays.resources.map((resource, index) => (
                      <a
                        key={index}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <div className="flex items-center">
                          <FileText className="w-6 h-6 text-blue-500 mr-3" />
                          <div>
                            <p className="font-medium text-gray-800 group-hover:text-blue-600">{resource.title}</p>
                            <p className="text-sm text-gray-500">{resource.type}</p>
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Practice Sheets */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <Star className="w-5 h-5 text-yellow-500 mr-2" />
                  DSA Practice Sheets
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {topicDetails.arrays.practiceSheets.map((sheet, index) => (
                    <a
                      key={index}
                      href={sheet.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-800 group-hover:text-blue-600">{sheet.title}</h4>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600">{sheet.problems} problems</p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TopicExplorer;
