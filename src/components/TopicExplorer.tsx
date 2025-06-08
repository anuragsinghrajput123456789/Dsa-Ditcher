
import { useState } from "react";
import { Search, BookOpen, Youtube, FileText, Zap, Clock } from "lucide-react";

const TopicExplorer = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const topics = [
    {
      id: "arrays",
      name: "Arrays",
      description: "Linear data structure storing elements in contiguous memory",
      difficulty: "Beginner",
      color: "from-blue-500 to-blue-600",
      icon: "📊",
      concepts: ["Basic Operations", "Two Pointers", "Sliding Window", "Sorting"],
    },
    {
      id: "linkedlists",
      name: "Linked Lists",
      description: "Dynamic data structure with nodes connected via pointers",
      difficulty: "Beginner",
      color: "from-green-500 to-green-600",
      icon: "🔗",
      concepts: ["Singly Linked", "Doubly Linked", "Circular", "Operations"],
    },
    {
      id: "stacks",
      name: "Stacks",
      description: "LIFO data structure for managing data in last-in-first-out order",
      difficulty: "Beginner",
      color: "from-purple-500 to-purple-600",
      icon: "📚",
      concepts: ["Push/Pop", "Applications", "Implementation", "Problems"],
    },
    {
      id: "queues",
      name: "Queues",
      description: "FIFO data structure for managing data in first-in-first-out order",
      difficulty: "Beginner",
      color: "from-yellow-500 to-yellow-600",
      icon: "🚶",
      concepts: ["Enqueue/Dequeue", "Circular Queue", "Priority Queue", "Applications"],
    },
    {
      id: "trees",
      name: "Trees",
      description: "Hierarchical data structure with parent-child relationships",
      difficulty: "Intermediate",
      color: "from-red-500 to-red-600",
      icon: "🌳",
      concepts: ["Binary Trees", "BST", "AVL", "Traversals"],
    },
    {
      id: "graphs",
      name: "Graphs",
      description: "Non-linear data structure with vertices and edges",
      difficulty: "Advanced",
      color: "from-indigo-500 to-indigo-600",
      icon: "🕸️",
      concepts: ["BFS", "DFS", "Shortest Path", "MST"],
    },
    {
      id: "dp",
      name: "Dynamic Programming",
      description: "Optimization technique using overlapping subproblems",
      difficulty: "Advanced",
      color: "from-pink-500 to-pink-600",
      icon: "💎",
      concepts: ["Memoization", "Tabulation", "Optimization", "Patterns"],
    },
    {
      id: "sorting",
      name: "Sorting Algorithms",
      description: "Algorithms to arrange data in specific order",
      difficulty: "Intermediate",
      color: "from-teal-500 to-teal-600",
      icon: "🔄",
      concepts: ["Bubble Sort", "Merge Sort", "Quick Sort", "Heap Sort"],
    },
  ];

  const topicDetails = {
    arrays: {
      summary: "Arrays are the most fundamental data structure in programming. Think of them as a row of boxes where each box can hold one item, and each box has a number (index) to identify it. You can quickly access any item if you know its position.",
      bruteForce: "Start with simple nested loops for most problems. For searching, check each element one by one. For sorting, use simple comparison-based approaches.",
      optimal: "Use two pointers technique for pairs, sliding window for subarrays, and binary search for sorted arrays. Hash maps can reduce time complexity from O(n²) to O(n).",
      videos: [
        { title: "Arrays Explained Simply", url: "https://youtube.com/watch?v=arrays1" },
        { title: "Two Pointers Technique", url: "https://youtube.com/watch?v=twopointers" },
      ],
      resources: [
        { title: "Array Cheat Sheet", type: "PDF", url: "#" },
        { title: "Common Array Patterns", type: "Article", url: "#" },
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

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">DSA Topic Explorer</h1>
        <p className="text-gray-600 text-lg mb-6">Master data structures and algorithms with AI-powered explanations</p>
        
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => handleTopicSelect(topic.id)}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 cursor-pointer hover:-translate-y-1 group"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${topic.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <span className="text-2xl">{topic.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{topic.name}</h3>
              <p className="text-gray-600 mb-4">{topic.description}</p>
              <div className="flex justify-between items-center">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  topic.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                  topic.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {topic.difficulty}
                </span>
                <span className="text-sm text-gray-500">{topic.concepts.length} concepts</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
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
                <h1 className="text-3xl font-bold mb-2">Arrays</h1>
                <p className="text-blue-100">Master the foundation of all data structures</p>
              </div>

              {/* AI Summary */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Zap className="w-6 h-6 text-yellow-500 mr-2" />
                  AI Simple Summary
                </h2>
                <p className="text-gray-700 leading-relaxed">{topicDetails.arrays.summary}</p>
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

              {/* Videos */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <Youtube className="w-5 h-5 text-red-500 mr-2" />
                  Video Resources
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {topicDetails.arrays.videos.map((video, index) => (
                    <a
                      key={index}
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Youtube className="w-8 h-8 text-red-500 mr-3" />
                      <span className="font-medium text-gray-800">{video.title}</span>
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
                      className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <FileText className="w-6 h-6 text-blue-500 mr-3" />
                      <div>
                        <span className="font-medium text-gray-800">{resource.title}</span>
                        <span className="text-sm text-gray-500 ml-2">({resource.type})</span>
                      </div>
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
