
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Book, Search, BookOpen, TrendingUp, Star, Timer, Calendar, Code, MessageSquare, Lightbulb, Map, Play, Target } from "lucide-react";

const Dashboard = () => {
  const [problemOfTheDay, setProblemOfTheDay] = useState({
    title: "Two Sum",
    difficulty: "Easy",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target."
  });

  const quickStats = [
    { label: "Problems Solved", value: "23", icon: Star, color: "text-yellow-600" },
    { label: "Study Streak", value: "7 days", icon: Calendar, color: "text-green-600" },
    { label: "Time Studied", value: "12h 45m", icon: Timer, color: "text-blue-600" },
    { label: "Current Level", value: "3", icon: TrendingUp, color: "text-purple-600" },
  ];

  const quickActions = [
    { title: "Explore Topics", description: "Learn DSA concepts with comprehensive resources", icon: Book, path: "/topics", color: "from-blue-500 to-blue-600" },
    { title: "Analyze Problem", description: "Get AI insights on any DSA problem", icon: Search, path: "/analyzer", color: "from-green-500 to-green-600" },
    { title: "Visualizations", description: "See algorithms come to life", icon: BookOpen, path: "/visualizations", color: "from-purple-500 to-purple-600" },
    { title: "Learning Roadmap", description: "Follow structured learning paths", icon: TrendingUp, path: "/roadmap", color: "from-orange-500 to-orange-600" },
    { title: "Custom Roadmap", description: "Create your personalized learning journey", icon: Map, path: "/custom-roadmap", color: "from-pink-500 to-pink-600" },
    { title: "DSA Chat Guide", description: "Get help from your AI DSA tutor", icon: MessageSquare, path: "/chat-guide", color: "from-indigo-500 to-indigo-600" },
    { title: "Question Explainer", description: "Understand problems with detailed explanations", icon: Lightbulb, path: "/question-explainer", color: "from-yellow-500 to-yellow-600" },
    { title: "Code Playground", description: "Practice coding with multi-language support", icon: Code, path: "/playground", color: "from-teal-500 to-teal-600" },
  ];

  const recentActivity = [
    { type: "completed", topic: "Arrays - Two Pointers", time: "2 hours ago" },
    { type: "started", topic: "Binary Trees", time: "1 day ago" },
    { type: "practice", topic: "Dynamic Programming", time: "2 days ago" },
  ];

  const featuredContent = [
    { 
      title: "Master the Two Pointers Technique", 
      description: "Learn this powerful array manipulation technique",
      type: "Tutorial",
      duration: "15 min",
      difficulty: "Beginner"
    },
    { 
      title: "Dynamic Programming Patterns", 
      description: "Common DP patterns every programmer should know",
      type: "Guide",
      duration: "25 min",
      difficulty: "Advanced"
    },
    { 
      title: "Graph Algorithms Visualization", 
      description: "Watch BFS and DFS in action",
      type: "Interactive",
      duration: "20 min",
      difficulty: "Intermediate"
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome to DSA Pathfinder! 🚀</h1>
        <p className="text-blue-100 text-lg mb-6">Your complete platform for mastering Data Structures and Algorithms</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Progress to Level 4</span>
              <span className="text-sm">1250 / 2000 XP</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-500"
                style={{ width: "62.5%" }}
              ></div>
            </div>
          </div>
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-2xl font-bold">8</div>
            <div className="text-sm">New features available</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <Icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Problem of the Day */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <Star className="w-6 h-6 text-yellow-500 mr-2" />
          Problem of the Day
        </h2>
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-semibold text-gray-800">{problemOfTheDay.title}</h3>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              {problemOfTheDay.difficulty}
            </span>
          </div>
          <p className="text-gray-600 mb-4">{problemOfTheDay.description}</p>
          <div className="flex space-x-3">
            <Link
              to="/question-explainer"
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
            >
              Explain Problem
            </Link>
            <Link
              to="/playground"
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200"
            >
              Try in Playground
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Explore Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link
                  key={index}
                  to={action.path}
                  className="group bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-800">{action.title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-600">{action.description}</p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'completed' ? 'bg-green-500' :
                    activity.type === 'started' ? 'bg-blue-500' : 'bg-orange-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{activity.topic}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Content */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Featured Content</h3>
            <div className="space-y-4">
              {featuredContent.map((content, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-800 text-sm">{content.title}</h4>
                    <span className="text-xs text-gray-500">{content.duration}</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{content.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-blue-600 font-medium">{content.type}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      content.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                      content.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {content.difficulty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Start */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <Target className="w-5 h-5 text-green-600 mr-2" />
              Quick Start
            </h3>
            <p className="text-gray-600 text-sm mb-4">New to DSA? Start with these recommended paths:</p>
            <div className="space-y-2">
              <Link to="/topics" className="block text-sm text-blue-600 hover:text-blue-700">
                • Learn Array Fundamentals
              </Link>
              <Link to="/visualizations" className="block text-sm text-blue-600 hover:text-blue-700">
                • Watch Sorting Algorithms
              </Link>
              <Link to="/roadmap" className="block text-sm text-blue-600 hover:text-blue-700">
                • Follow Beginner Roadmap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
