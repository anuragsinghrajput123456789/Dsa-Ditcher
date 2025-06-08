
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Book, Search, BookOpen, TrendingUp, Star, Timer, Calendar } from "lucide-react";

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
    { title: "Explore Topics", description: "Learn DSA concepts with AI explanations", icon: Book, path: "/topics", color: "from-blue-500 to-blue-600" },
    { title: "Analyze Problem", description: "Get AI insights on any DSA problem", icon: Search, path: "/analyzer", color: "from-green-500 to-green-600" },
    { title: "Visualizations", description: "See algorithms come to life", icon: BookOpen, path: "/visualizations", color: "from-purple-500 to-purple-600" },
    { title: "Learning Roadmap", description: "Follow structured learning paths", icon: TrendingUp, path: "/roadmap", color: "from-orange-500 to-orange-600" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome to DSA Pathfinder! 🚀</h1>
        <p className="text-blue-100 text-lg">Ready to master Data Structures and Algorithms?</p>
        <div className="mt-4 bg-white/20 rounded-lg p-4 backdrop-blur-sm">
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
          <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:from-yellow-600 hover:to-orange-600 transition-all duration-200">
            Solve Now (+50 XP)
          </button>
        </div>
      </div>

      {/* Quick Actions */}
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
  );
};

export default Dashboard;
