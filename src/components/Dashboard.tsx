import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Book, Search, BookOpen, TrendingUp, Star, Timer, Calendar, Code, MessageSquare, Lightbulb, Map, Play, Target, Sparkles, Zap, Award, Trophy, Heart, Rocket, Clock, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [problemOfTheDay, setProblemOfTheDay] = useState({
    title: "Two Sum",
    difficulty: "Easy", 
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target."
  });

  // Timer state
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [studyTime, setStudyTime] = useState(0); // in seconds

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setStudyTime(prev => prev + 1);
      }, 1000);
    }
    return() => clearInterval(interval);
  }, [isTimerRunning]);

  // Format time function
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  const quickStats = [
    { label: "Problems Solved", value: "23", icon: Star, color: "text-yellow-500", bgColor: "bg-yellow-50 dark:bg-yellow-900/20", borderColor: "border-yellow-200 dark:border-yellow-700" },
    { 
      label: "Study Timer", 
      value: formatTime(studyTime), 
      icon: Clock, 
      color: "text-blue-500", 
      bgColor: "bg-blue-50 dark:bg-blue-900/20", 
      borderColor: "border-blue-200 dark:border-blue-700",
      isTimer: true
    },
  ];

  const quickActions = [
    { title: "Explore Topics", description: "Learn DSA concepts with comprehensive resources", icon: Book, path: "/topics", color: "from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500", hoverColor: "hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-300 dark:hover:to-blue-400" },
    { title: "Analyze Problem", description: "Get AI insights on any DSA problem", icon: Search, path: "/analyzer", color: "from-green-500 to-green-600 dark:from-green-400 dark:to-green-500", hoverColor: "hover:from-green-600 hover:to-green-700 dark:hover:from-green-300 dark:hover:to-green-400" },
    { title: "Visualizations", description: "See algorithms come to life", icon: BookOpen, path: "/visualizations", color: "from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500", hoverColor: "hover:from-purple-600 hover:to-purple-700 dark:hover:from-purple-300 dark:hover:to-purple-400" },
    { title: "Learning Roadmap", description: "Follow structured learning paths", icon: TrendingUp, path: "/roadmap", color: "from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500", hoverColor: "hover:from-orange-600 hover:to-orange-700 dark:hover:from-orange-300 dark:hover:to-orange-400" },
    { title: "Custom Roadmap", description: "Create your personalized learning journey", icon: Map, path: "/custom-roadmap", color: "from-pink-500 to-pink-600 dark:from-pink-400 dark:to-pink-500", hoverColor: "hover:from-pink-600 hover:to-pink-700 dark:hover:from-pink-300 dark:hover:to-pink-400" },
    { title: "DSA Chat Guide", description: "Get help from your AI DSA tutor", icon: MessageSquare, path: "/chat-guide", color: "from-indigo-500 to-indigo-600 dark:from-indigo-400 dark:to-indigo-500", hoverColor: "hover:from-indigo-600 hover:to-indigo-700 dark:hover:from-indigo-300 dark:hover:to-indigo-400" },
    { title: "Question Explainer", description: "Understand problems with detailed explanations", icon: Lightbulb, path: "/question-explainer", color: "from-yellow-500 to-yellow-600 dark:from-yellow-400 dark:to-yellow-500", hoverColor: "hover:from-yellow-600 hover:to-yellow-700 dark:hover:from-yellow-300 dark:hover:to-yellow-400" },
    { title: "Code Playground", description: "Practice coding with multi-language support", icon: Code, path: "/playground", color: "from-teal-500 to-teal-600 dark:from-teal-400 dark:to-teal-500", hoverColor: "hover:from-teal-600 hover:to-teal-700 dark:hover:from-teal-300 dark:hover:to-teal-400" },
  ];

  const recentActivity = [
    { type: "completed", topic: "Arrays - Two Pointers", time: "2 hours ago", icon: Award },
    { type: "started", topic: "Binary Trees", time: "1 day ago", icon: Play },
    { type: "practice", topic: "Dynamic Programming", time: "2 days ago", icon: Code },
  ];

  const featuredContent = [
    { 
      title: "Master the Two Pointers Technique", 
      description: "Learn this powerful array manipulation technique",
      type: "Tutorial",
      duration: "15 min",
      difficulty: "Beginner",
      icon: Zap
    },
    { 
      title: "Dynamic Programming Patterns", 
      description: "Common DP patterns every programmer should know",
      type: "Guide",
      duration: "25 min",
      difficulty: "Advanced",
      icon: Trophy
    },
    { 
      title: "Graph Algorithms Visualization", 
      description: "Watch BFS and DFS in action",
      type: "Interactive",
      duration: "20 min",
      difficulty: "Intermediate",
      icon: Sparkles
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 dark:from-blue-700 dark:via-purple-700 dark:to-pink-700 rounded-3xl p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm animate-pulse">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2 animate-scale-in">Welcome to DSA Pathfinder! 🚀</h1>
              <p className="text-blue-100 text-lg mb-6 animate-fade-in" style={{animationDelay: '0.2s'}}>Your complete platform for mastering Data Structures and Algorithms</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/20 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:bg-white/25 transition-all duration-300 animate-fade-in" style={{animationDelay: '0.4s'}}>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  <span className="text-sm font-medium">Progress to Level 4</span>
                </div>
                <span className="text-sm font-bold">1250 / 2000 XP</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-white rounded-full h-3 transition-all duration-1000 ease-out animate-scale-in shadow-lg"
                  style={{ width: "62.5%", animationDelay: '0.6s' }}
                ></div>
              </div>
            </div>
            
            <div className="bg-white/20 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:bg-white/25 transition-all duration-300 animate-fade-in" style={{animationDelay: '0.5s'}}>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="text-3xl font-bold">8</div>
                  <div className="text-sm opacity-90">New features available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-4 right-4 opacity-20">
          <Heart className="w-8 h-8 animate-bounce" style={{animationDelay: '1s'}} />
        </div>
        <div className="absolute bottom-4 left-4 opacity-20">
          <Star className="w-6 h-6 animate-spin" style={{animationDuration: '3s'}} />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`${stat.bgColor} ${stat.borderColor} rounded-2xl p-6 shadow-lg border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-scale-in group`} style={{animationDelay: `${index * 0.1}s`}}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl ${stat.color.replace('text-', 'bg-').replace('-500', '-100')} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </div>
              
              {/* Timer Controls */}
              {stat.isTimer && (
                <div className="flex gap-2">
                  <Button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    size="sm"
                    className={`flex items-center gap-2 ${
                      isTimerRunning 
                        ? 'bg-red-500 hover:bg-red-600 text-white' 
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                  >
                    {isTimerRunning ? (
                      <>
                        <Pause className="w-4 h-4" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        Start
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => {
                      setStudyTime(0);
                      setIsTimerRunning(false);
                    }}
                    size="sm"
                    variant="outline"
                    className="text-sm"
                  >
                    Reset
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Problem of the Day */}
      <div className="bg-card rounded-2xl p-8 shadow-xl border border-border animate-fade-in">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
            <Star className="w-7 h-7 text-yellow-500 animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Problem of the Day</h2>
          <div className="ml-auto">
            <Sparkles className="w-6 h-6 text-yellow-500 animate-bounce" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6 border-2 border-yellow-200 dark:border-yellow-700/50">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-foreground">{problemOfTheDay.title}</h3>
            <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium border border-green-200 dark:border-green-700">
              {problemOfTheDay.difficulty}
            </span>
          </div>
          <p className="text-muted-foreground mb-6 leading-relaxed">{problemOfTheDay.description}</p>
          <div className="flex gap-4">
            <Link
              to="/question-explainer"
              className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-300 dark:hover:to-blue-400 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Lightbulb className="w-5 h-5" />
              Explain Problem
            </Link>
            <Link
              to="/playground"
              className="bg-gradient-to-r from-green-500 to-green-600 dark:from-green-400 dark:to-green-500 text-white px-6 py-3 rounded-xl font-medium hover:from-green-600 hover:to-green-700 dark:hover:from-green-300 dark:hover:to-green-400 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Try in Playground
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Zap className="w-6 h-6 text-blue-500" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Explore Features</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link
                  key={index}
                  to={action.path}
                  className="group bg-card rounded-2xl p-6 shadow-lg border border-border hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-14 h-14 bg-gradient-to-r ${action.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{action.title}</h3>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Play className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{action.description}</p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <div className="bg-card rounded-2xl p-6 shadow-lg border border-border animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Recent Activity</h3>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-muted/50 rounded-xl hover:bg-muted/70 transition-colors duration-200 group">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === 'completed' ? 'bg-green-100 dark:bg-green-900/30' :
                      activity.type === 'started' ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-orange-100 dark:bg-orange-900/30'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        activity.type === 'completed' ? 'text-green-500' :
                        activity.type === 'started' ? 'text-blue-500' : 'text-orange-500'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200">{activity.topic}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Featured Content */}
          <div className="bg-card rounded-2xl p-6 shadow-lg border border-border animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Sparkles className="w-5 h-5 text-purple-500 animate-pulse" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Featured Content</h3>
            </div>
            <div className="space-y-4">
              {featuredContent.map((content, index) => {
                const Icon = content.icon;
                return (
                  <div key={index} className="p-4 border-2 border-border rounded-xl hover:border-primary/50 hover:bg-muted/30 transition-all duration-300 cursor-pointer group">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-foreground text-sm group-hover:text-primary transition-colors duration-300">{content.title}</h4>
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">{content.duration}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{content.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-full">{content.type}</span>
                          <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                            content.difficulty === 'Beginner' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                            content.difficulty === 'Intermediate' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                            'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                          }`}>
                            {content.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Start */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-6 border-2 border-green-200 dark:border-green-700/50 animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Quick Start</h3>
              <Rocket className="w-5 h-5 text-green-500 animate-bounce ml-auto" />
            </div>
            <p className="text-muted-foreground text-sm mb-4">New to DSA? Start with these recommended paths:</p>
            <div className="space-y-3">
              <Link to="/topics" className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors duration-200 group">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
                  <span className="text-xs font-bold text-primary">1</span>
                </div>
                Learn Array Fundamentals
              </Link>
              <Link to="/visualizations" className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors duration-200 group">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
                  <span className="text-xs font-bold text-primary">2</span>
                </div>
                Watch Sorting Algorithms
              </Link>
              <Link to="/roadmap" className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors duration-200 group">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
                  <span className="text-xs font-bold text-primary">3</span>
                </div>
                Follow Beginner Roadmap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
