
import { useState } from "react";
import { Calendar, Clock, Star, CheckCircle, Circle, Target, TrendingUp } from "lucide-react";
import { useAuthStore } from "../store/authStore";

const Roadmap = () => {
  const { user, updateXP } = useAuthStore();
  const [selectedRoadmap, setSelectedRoadmap] = useState<string | null>(null);

  const roadmaps = [
    {
      id: "arrays-mastery",
      title: "Arrays Mastery",
      description: "Master array operations, two pointers, and sliding window techniques",
      duration: "3 Days",
      difficulty: "Beginner",
      xpReward: 300,
      color: "from-blue-500 to-blue-600",
      icon: "📊",
      completed: 2,
      total: 5,
    },
    {
      id: "tree-fundamentals",
      title: "Tree Fundamentals",
      description: "Learn binary trees, BST, and tree traversal algorithms",
      duration: "5 Days",
      difficulty: "Intermediate",
      xpReward: 500,
      color: "from-green-500 to-green-600",
      icon: "🌳",
      completed: 0,
      total: 7,
    },
    {
      id: "graph-algorithms",
      title: "Graph Algorithms",
      description: "Master BFS, DFS, shortest paths, and minimum spanning trees",
      duration: "7 Days",
      difficulty: "Advanced",
      xpReward: 700,
      color: "from-purple-500 to-purple-600",
      icon: "🕸️",
      completed: 0,
      total: 10,
    },
    {
      id: "dp-patterns",
      title: "Dynamic Programming Patterns",
      description: "Learn common DP patterns and solve complex optimization problems",
      duration: "10 Days",
      difficulty: "Advanced",
      xpReward: 1000,
      color: "from-red-500 to-red-600",
      icon: "💎",
      completed: 0,
      total: 12,
    },
  ];

  const roadmapDetails = {
    "arrays-mastery": {
      steps: [
        { id: 1, title: "Array Basics & Operations", completed: true, xp: 50 },
        { id: 2, title: "Two Pointers Technique", completed: true, xp: 75 },
        { id: 3, title: "Sliding Window Pattern", completed: false, xp: 75 },
        { id: 4, title: "Prefix Sum & Difference Arrays", completed: false, xp: 50 },
        { id: 5, title: "Practice Problems & Assessment", completed: false, xp: 50 },
      ]
    }
  };

  const completeStep = (roadmapId: string, stepId: number) => {
    const step = roadmapDetails[roadmapId as keyof typeof roadmapDetails]?.steps.find(s => s.id === stepId);
    if (step && !step.completed) {
      step.completed = true;
      updateXP(step.xp);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Learning Roadmaps</h1>
        <p className="text-gray-600 text-lg">Follow structured paths to master DSA concepts efficiently</p>
      </div>

      {!selectedRoadmap ? (
        <div className="space-y-6">
          {/* Progress Overview */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">Your Learning Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                  <Target className="w-6 h-6" />
                  <span className="text-2xl font-bold">1</span>
                </div>
                <p className="text-sm">Active Roadmaps</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle className="w-6 h-6" />
                  <span className="text-2xl font-bold">2</span>
                </div>
                <p className="text-sm">Steps Completed</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="w-6 h-6" />
                  <span className="text-2xl font-bold">{Math.round(((user?.level || 1) - 1) * 25)}%</span>
                </div>
                <p className="text-sm">Overall Progress</p>
              </div>
            </div>
          </div>

          {/* Roadmap Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roadmaps.map((roadmap) => (
              <div
                key={roadmap.id}
                onClick={() => setSelectedRoadmap(roadmap.id)}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 cursor-pointer hover:-translate-y-1 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${roadmap.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    <span className="text-2xl">{roadmap.icon}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">{roadmap.completed}/{roadmap.total} completed</div>
                    <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className={`bg-gradient-to-r ${roadmap.color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${(roadmap.completed / roadmap.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">{roadmap.title}</h3>
                <p className="text-gray-600 mb-4">{roadmap.description}</p>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {roadmap.duration}
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      {roadmap.xpReward} XP
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    roadmap.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                    roadmap.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {roadmap.difficulty}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedRoadmap(null)}
            className="mb-6 text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Roadmaps
          </button>

          {/* Roadmap Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white mb-6">
            <h1 className="text-3xl font-bold mb-2">Arrays Mastery</h1>
            <p className="text-blue-100 mb-4">Master array operations, two pointers, and sliding window techniques</p>
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                3 Days
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1" />
                300 XP Total
              </div>
              <div className="flex items-center">
                <Target className="w-4 h-4 mr-1" />
                2/5 Completed
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Learning Steps</h2>
            <div className="space-y-4">
              {roadmapDetails["arrays-mastery"].steps.map((step, index) => (
                <div key={step.id} className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <button
                    onClick={() => completeStep("arrays-mastery", step.id)}
                    className="flex-shrink-0"
                  >
                    {step.completed ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-400 hover:text-green-500" />
                    )}
                  </button>
                  
                  <div className="flex-1">
                    <h3 className={`font-semibold ${step.completed ? 'text-green-800' : 'text-gray-800'}`}>
                      Step {step.id}: {step.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {step.completed ? 'Completed! Great job!' : 'Click to mark as complete'}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-800">{step.xp} XP</div>
                    {step.completed && (
                      <div className="text-xs text-green-600">✓ Earned</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                <span className="text-sm text-gray-600">40% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500" style={{ width: '40%' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roadmap;
