import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Book, Search, BookOpen, TrendingUp, Star, Timer, Calendar, 
  Code, MessageSquare, Lightbulb, Map, Play, Target, Sparkles, 
  Zap, Award, Trophy, Heart, Rocket, Clock, Pause, Medal, 
  Crown, Flame, ArrowRight, Activity, Award as Shield, Bot, Send 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { API_BASE_URL } from "@/config";

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
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const [userStats, setUserStats] = useState({ level: "Beginner", problemsSolved: 0, streak: 0, loading: true });

  useEffect(() => {
    document.title = "AlgoSpark - Master DSA with AI | Dashboard";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Track your DSA progress, view problem of the day, monitor study time, and practice with custom roadmaps, chatbots, and templates on AlgoSpark.");
    }

    const fetchUserProfile = async () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const { token } = JSON.parse(storedUser);
        try {
          const res = await fetch(`${API_BASE_URL}/api/users/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
            const data = await res.json();
             setUserStats({ 
               level: data.level || "Beginner", 
               problemsSolved: data.problemsSolved || 0,
               streak: data.streak || 0,
               loading: false
             });
          }
        } catch (error) {
          console.error("Failed to fetch user profile", error);
        }
      } else {
         const guestStreak = parseInt(localStorage.getItem("guest-streak") || "0");
         setUserStats(prev => ({ ...prev, streak: guestStreak, loading: false }));
      }
    };
    fetchUserProfile();
  }, []);

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

  const achievements = [
    { 
      title: "First Steps", 
      description: "Completed your first problem", 
      icon: Trophy, 
      color: "from-yellow-400 to-yellow-600", 
      earned: true,
      xp: "+50 XP"
    },
    { 
      title: "Problem Solver", 
      description: "Solved 10 problems", 
      icon: Target, 
      color: "from-blue-400 to-blue-600", 
      earned: userStats.problemsSolved >= 10,
      xp: "+100 XP"
    },
    { 
      title: "Streak Master", 
      description: "7-day solving streak", 
      icon: Flame, 
      color: "from-orange-400 to-red-500", 
      earned: true,
      xp: "+150 XP"
    },
    { 
      title: "Algorithm Expert", 
      description: "Master 5 algorithm patterns", 
      icon: Crown, 
      color: "from-purple-400 to-purple-600", 
      earned: false,
      xp: "+200 XP"
    }
  ];

  const quickActions = [
    { title: "Explore Topics", description: "Learn DSA concepts with comprehensive resources", icon: Book, path: "/topics", color: "from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500", shadow: "shadow-blue-500/10" },
    { title: "Analyze Problem", description: "Get AI insights on any DSA problem", icon: Search, path: "/analyzer", color: "from-emerald-500 to-emerald-600 dark:from-emerald-400 dark:to-emerald-500", shadow: "shadow-emerald-500/10" },
    { title: "Visualizations", description: "See algorithms come to life", icon: BookOpen, path: "/visualizations", color: "from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500", shadow: "shadow-purple-500/10" },
    { title: "Learning Roadmap", description: "Follow structured learning paths", icon: TrendingUp, path: "/roadmap", color: "from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500", shadow: "shadow-orange-500/10" },
    { title: "Custom Roadmap", description: "Create your personalized learning journey", icon: Map, path: "/custom-roadmap", color: "from-pink-500 to-pink-600 dark:from-pink-400 dark:to-pink-500", shadow: "shadow-pink-500/10" },
    { title: "DSA Chat Guide", description: "Get help from your AI DSA tutor", icon: MessageSquare, path: "/chat-guide", color: "from-indigo-500 to-indigo-600 dark:from-indigo-400 dark:to-indigo-500", shadow: "shadow-indigo-500/10" },
    { title: "Question Explainer", description: "Understand problems with detailed explanations", icon: Lightbulb, path: "/question-explainer", color: "from-amber-500 to-amber-600 dark:from-amber-400 dark:to-amber-500", shadow: "shadow-amber-500/10" },
    { title: "Code Playground", description: "Practice coding with multi-language support", icon: Code, path: "/playground", color: "from-teal-500 to-teal-600 dark:from-teal-400 dark:to-teal-500", shadow: "shadow-teal-500/10" },
  ];

  const recentActivity = [
    { type: "completed", topic: "Arrays - Two Pointers", time: "2 hours ago", icon: Award },
    { type: "started", topic: "Binary Trees", time: "1 day ago", icon: Play },
    { type: "practice", topic: "Dynamic Programming", time: "2 days ago", icon: Code },
  ];

  const featuredContent = [
    { 
      title: "Master Two Pointers Technique", 
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
  ];

  // Helper values for streak and difficulty representation
  const generateStreakDays = (streakCount: number) => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    
    const list = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dayIndex = d.getDay();
      
      const isActive = i < streakCount;
      list.push({
        name: daysOfWeek[dayIndex],
        active: isActive,
        today: i === 0
      });
    }
    return list;
  };

  const streakDays = generateStreakDays(userStats.streak || 1);

  const easySolved = Math.max(0, Math.floor(userStats.problemsSolved * 0.5));
  const mediumSolved = Math.max(0, Math.floor(userStats.problemsSolved * 0.35));
  const hardSolved = Math.max(0, userStats.problemsSolved - easySolved - mediumSolved);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <motion.div 
      className="space-y-8 pb-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Welcome Hero Section */}
      <motion.div 
        variants={itemVariants}
        className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-950 dark:via-purple-900 dark:to-pink-900/60 rounded-3xl p-6 sm:p-8 md:p-10 text-white shadow-2xl border border-white/10 dark:border-white/5"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
        
        {/* Decorative Grid Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-xs font-semibold tracking-wider text-pink-200 uppercase mb-4 backdrop-blur-md border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
              Empowered by AI Learning
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 tracking-tight bg-gradient-to-r from-white via-blue-100 to-pink-100 bg-clip-text text-transparent">
              Welcome to AlgoSpark! 🚀
            </h1>
            <p className="text-blue-100 text-sm sm:text-base md:text-lg mb-6 max-w-xl font-medium leading-relaxed">
              Your ultimate command center for conquering Data Structures, mastering algorithms, and acing coding interviews.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/topics">
                <Button className="bg-white text-purple-700 hover:bg-blue-50 font-bold px-6 py-2.5 rounded-xl shadow-lg hover:shadow-white/10 hover:scale-105 transition-all duration-300">
                  Start Practicing
                </Button>
              </Link>
              <Link to="/chat-guide">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold px-5 py-2.5 rounded-xl backdrop-blur-sm">
                  Consult AI Tutor
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <div className="flex-1 md:flex-initial min-w-[130px] bg-white/10 dark:bg-black/35 rounded-2xl p-5 backdrop-blur-md border border-white/10 hover:bg-white/15 transition-all duration-300 text-center">
              <Medal className="w-8 h-8 mx-auto text-yellow-300 mb-2 animate-bounce" />
              <div className="text-2xl font-black text-white">{userStats.level}</div>
              <div className="text-xs text-blue-200 font-medium">Rank Level</div>
            </div>
            <div className="flex-1 md:flex-initial min-w-[130px] bg-white/10 dark:bg-black/35 rounded-2xl p-5 backdrop-blur-md border border-white/10 hover:bg-white/15 transition-all duration-300 text-center">
              <Sparkles className="w-8 h-8 mx-auto text-pink-300 mb-2 animate-pulse" />
              <div className="text-2xl font-black text-white">{userStats.problemsSolved}</div>
              <div className="text-xs text-blue-200 font-medium">Problems Solved</div>
            </div>
          </div>
        </div>

        {/* Dynamic floating circles */}
        <div className="absolute top-1/4 right-1/3 w-32 h-32 bg-purple-500/10 rounded-full filter blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-8 -right-8 w-44 h-44 bg-pink-500/10 rounded-full filter blur-2xl pointer-events-none"></div>
      </motion.div>

      {/* Main Grid: Features and Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Problem of the Day & Quick Actions (Grid Span 2) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Problem of the Day */}
          <motion.div 
            variants={itemVariants}
            className="relative overflow-hidden glass-card rounded-2xl p-6 md:p-8 shadow-xl border border-border/50 group"
          >
            {/* Glowing border decoration */}
            <div className="absolute inset-0 border border-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-100 dark:bg-amber-950/40 rounded-xl">
                  <Star className="w-6 h-6 text-amber-500 animate-pulse fill-amber-500/20" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-primary tracking-wider uppercase">Challenge Badge</div>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">Problem of the Day</h2>
                </div>
              </div>
              <span className="px-4 py-1.5 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded-full text-xs font-bold border border-emerald-200 dark:border-emerald-800">
                {problemOfTheDay.difficulty}
              </span>
            </div>

            <div className="bg-muted/40 dark:bg-muted/10 rounded-xl p-5 border border-border/40 mb-6">
              <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                <Code className="w-5 h-5 text-indigo-500" />
                {problemOfTheDay.title}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {problemOfTheDay.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/question-explainer">
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  AI Explainer
                </Button>
              </Link>
              <Link to="/playground">
                <Button variant="outline" className="border-border hover:bg-muted/50 font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2">
                  <Play className="w-4 h-4 text-emerald-500" />
                  Solve in Playground
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Quick Actions / Explore Features */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-100 dark:bg-indigo-950/40 rounded-xl">
                <Zap className="w-5 h-5 text-indigo-500" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Explore Platform Features</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <Link
                      to={action.path}
                      className="group block relative overflow-hidden glass-card glass-card-hover rounded-2xl p-5 shadow-lg border border-border/40"
                    >
                      <div className="flex items-center mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center text-white shadow-lg ${action.shadow} group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                            {action.title}
                          </h3>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {action.description}
                      </p>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* NEW: AI Quest & Coding Companion Panel */}
          <motion.div 
            variants={itemVariants}
            className="relative overflow-hidden glass-card rounded-2xl p-6 md:p-8 shadow-xl border border-border/50 group space-y-6"
          >
            {/* Ambient subtle light glow */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/10 rounded-full filter blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border/40 pb-5">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-950/40 rounded-xl group-hover:rotate-6 transition-transform duration-300">
                  <Bot className="w-6 h-6 text-indigo-500" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-indigo-500 tracking-wider uppercase">Active Companion</div>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">Meet Aura - AI DSA Assistant</h2>
                </div>
              </div>
              <span className="px-3.5 py-1 bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-bold border border-indigo-200 dark:border-indigo-800 animate-pulse">
                Online & Ready
              </span>
            </div>

            <div className="bg-muted/40 dark:bg-muted/10 rounded-xl p-5 border border-border/40 space-y-3.5">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Target className="w-4.5 h-4.5 text-pink-500" />
                Daily Coding Quest
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Solve <span className="text-foreground font-semibold">1 Stack/Queue Medium challenge</span> today to claim your <span className="text-amber-500 font-bold">🔥 1.5x Streak Multiplier</span> and advance to the Silver tier!
              </p>
              <div className="w-full bg-muted dark:bg-muted/20 h-2 rounded-full overflow-hidden relative">
                <div className="bg-gradient-to-r from-indigo-500 to-pink-500 h-full rounded-full w-2/3"></div>
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground font-semibold">
                <span>Progress: 66% Complete</span>
                <span>+120 XP Reward</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Quick AI Explainer</div>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Ask Aura anything... e.g. 'Explain Recursion'" 
                  className="flex-1 bg-muted/40 dark:bg-muted/20 border border-border/60 hover:border-primary/40 focus:border-primary rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all duration-300"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const inputVal = (e.target as HTMLInputElement).value;
                      if (inputVal.trim()) {
                        window.location.href = `/chat-guide?query=${encodeURIComponent(inputVal)}`;
                      }
                    }
                  }}
                />
                <Button 
                  onClick={(e) => {
                    const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                    if (input && input.value.trim()) {
                      window.location.href = `/chat-guide?query=${encodeURIComponent(input.value)}`;
                    } else {
                      window.location.href = `/chat-guide`;
                    }
                  }}
                  className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold rounded-xl px-4 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300"
                >
                  <Send className="w-4.5 h-4.5" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* NEW: Global Leaderboard & Tier Highlights */}
          <motion.div 
            variants={itemVariants}
            className="glass-card rounded-2xl p-6 shadow-xl border border-border/50 space-y-6"
          >
            <div className="flex items-center justify-between border-b border-border/40 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-pink-100 dark:bg-pink-950/40 rounded-lg">
                  <Trophy className="w-4.5 h-4.5 text-pink-500" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-foreground">Global Coding Arena</h3>
              </div>
              <span className="text-[10px] text-muted-foreground font-semibold bg-muted px-2 py-0.5 rounded-full">
                Active Standings
              </span>
            </div>

            <div className="space-y-3.5">
              {/* Top 3 Users */}
              <div className="flex items-center justify-between p-2.5 bg-yellow-500/5 hover:bg-yellow-500/10 border border-yellow-500/20 rounded-xl transition-colors duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-yellow-500/20 border border-yellow-500 flex items-center justify-center text-xs font-bold text-yellow-500">1</div>
                  <div className="flex items-center gap-1.5 flex-1 min-w-0">
                    <span className="text-xs sm:text-sm font-bold text-foreground truncate">Siddharth Sharma</span>
                    <Sparkles className="w-3.5 h-3.5 text-yellow-500 flex-shrink-0" />
                  </div>
                </div>
                <span className="text-xs font-semibold text-yellow-500 flex-shrink-0">3,450 XP</span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-slate-500/5 hover:bg-slate-500/10 border border-slate-500/20 rounded-xl transition-colors duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-slate-400/20 border border-slate-400 flex items-center justify-center text-xs font-bold text-slate-400">2</div>
                  <span className="text-xs sm:text-sm font-bold text-foreground truncate">Priyanjali Roy</span>
                </div>
                <span className="text-xs font-semibold text-slate-400 flex-shrink-0">3,120 XP</span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-amber-700/5 hover:bg-amber-700/10 border border-amber-700/20 rounded-xl transition-colors duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-700/20 border border-amber-700 flex items-center justify-center text-xs font-bold text-amber-700">3</div>
                  <span className="text-xs sm:text-sm font-bold text-foreground truncate">Nikhil Varma</span>
                </div>
                <span className="text-xs font-semibold text-amber-600 flex-shrink-0">2,880 XP</span>
              </div>

              {/* Current User Staging */}
              <div className="flex items-center justify-between p-3.5 bg-indigo-500/10 border border-indigo-500/30 rounded-xl shadow-inner relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-full filter blur-lg"></div>
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs font-extrabold shadow-md shadow-indigo-500/25 flex-shrink-0">12</div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs sm:text-sm font-extrabold text-foreground flex items-center gap-1">
                      <span className="truncate">You (Stellar Pioneer)</span>
                      <Flame className="w-3 h-3 text-pink-500 animate-bounce flex-shrink-0" />
                    </span>
                    <span className="text-[10px] text-muted-foreground truncate">Silver Tier Rank • Top 8%</span>
                  </div>
                </div>
                <span className="text-xs font-black text-indigo-500 flex-shrink-0">1,450 XP</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Right Side: Stellar Analytics & Streak Calendar & Sidebar Content */}
        <div className="space-y-8">

          {/* BRAND NEW: Stellar Analytics & Streak Calendar Widget */}
          <motion.div 
            variants={itemVariants}
            className="glass-card rounded-2xl p-6 shadow-xl border border-border/50 space-y-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full filter blur-xl"></div>
            
            {/* Widget Title */}
            <div className="flex items-center justify-between border-b border-border/40 pb-4">
              <div className="flex items-center gap-2.5">
                <Activity className="w-5 h-5 text-pink-500 animate-pulse" />
                <h3 className="text-lg font-bold text-foreground">Stellar Analytics</h3>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-100 dark:bg-amber-950/40 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-900">
                <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{userStats.streak || 0} Day Streak</span>
              </div>
            </div>

            {/* Streak Calendar Grid */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Weekly Activity Streak</div>
              <div className="flex justify-between items-center gap-1.5 bg-muted/30 dark:bg-muted/10 p-3 rounded-xl border border-border/30">
                {streakDays.map((day, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2">
                    <span className="text-[10px] font-bold text-muted-foreground">{day.name}</span>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                      day.active 
                        ? 'bg-gradient-to-br from-indigo-500 to-pink-500 text-white shadow-md shadow-purple-500/20' 
                        : 'bg-muted dark:bg-muted/30 border border-border text-muted-foreground'
                    } ${day.today ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}`}>
                      {day.active ? (
                        <Sparkles className="w-3 h-3 text-yellow-200" />
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Difficulty Bar breakdown */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Problem Distribution</div>
              <div className="space-y-2.5">
                {/* Easy Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-emerald-500">Easy Problems</span>
                    <span className="text-foreground">{easySolved} Solved</span>
                  </div>
                  <div className="w-full bg-muted dark:bg-muted/20 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${userStats.problemsSolved > 0 ? (easySolved / userStats.problemsSolved) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>

                {/* Medium Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-amber-500">Medium Problems</span>
                    <span className="text-foreground">{mediumSolved} Solved</span>
                  </div>
                  <div className="w-full bg-muted dark:bg-muted/20 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-amber-500 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${userStats.problemsSolved > 0 ? (mediumSolved / userStats.problemsSolved) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>

                {/* Hard Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-rose-500">Hard Problems</span>
                    <span className="text-foreground">{hardSolved} Solved</span>
                  </div>
                  <div className="w-full bg-muted dark:bg-muted/20 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-rose-500 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${userStats.problemsSolved > 0 ? (hardSolved / userStats.problemsSolved) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Study Clock Section */}
            <div className="bg-gradient-to-br from-indigo-50/50 to-pink-50/50 dark:from-indigo-950/20 dark:to-pink-950/10 rounded-xl p-4 border border-indigo-100 dark:border-indigo-900/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4.5 h-4.5 text-indigo-500" />
                  <span className="text-xs font-bold text-foreground">Session Focus Timer</span>
                </div>
                {isTimerRunning && (
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                )}
              </div>
              <div className="text-2xl font-black text-foreground mb-3 font-mono">
                {formatTime(studyTime)}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  size="sm"
                  className={`flex-1 font-bold text-xs h-8 rounded-lg ${
                    isTimerRunning 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                  }`}
                >
                  {isTimerRunning ? <Pause className="w-3.5 h-3.5 mr-1" /> : <Play className="w-3.5 h-3.5 mr-1" />}
                  {isTimerRunning ? "Pause" : "Focus Now"}
                </Button>
                <Button
                  onClick={() => {
                    setStudyTime(0);
                    setIsTimerRunning(false);
                  }}
                  size="sm"
                  variant="outline"
                  className="text-xs h-8 px-2.5 rounded-lg border-border"
                >
                  Reset
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div 
            variants={itemVariants}
            className="glass-card rounded-2xl p-6 shadow-xl border border-border/50"
          >
            <div className="flex items-center gap-2.5 mb-5">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-950/40 rounded-lg">
                <TrendingUp className="w-4.5 h-4.5 text-emerald-500" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-foreground">Recent Activity</h3>
            </div>
            
            <div className="space-y-3">
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex items-center space-x-3.5 p-3 bg-muted/20 hover:bg-muted/40 rounded-xl border border-border/30 transition-all duration-200 group">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      activity.type === 'completed' ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-500' :
                      activity.type === 'started' ? 'bg-indigo-100 dark:bg-indigo-950/40 text-indigo-500' : 'bg-orange-100 dark:bg-orange-950/40 text-orange-500'
                    }`}>
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-foreground group-hover:text-primary transition-colors duration-200 truncate">
                        {activity.topic}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Featured Content */}
          <motion.div 
            variants={itemVariants}
            className="glass-card rounded-2xl p-6 shadow-xl border border-border/50"
          >
            <div className="flex items-center gap-2.5 mb-5">
              <div className="p-2 bg-purple-100 dark:bg-purple-950/40 rounded-lg">
                <Sparkles className="w-4.5 h-4.5 text-purple-500" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-foreground">Curated Lessons</h3>
            </div>
            
            <div className="space-y-4">
              {featuredContent.map((content, index) => {
                const Icon = content.icon;
                return (
                  <div key={index} className="p-4 border border-border/40 rounded-xl hover:border-primary/40 hover:bg-muted/10 transition-all duration-300 group cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 text-primary transition-colors duration-300">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1.5">
                          <h4 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors duration-300 line-clamp-1">
                            {content.title}
                          </h4>
                          <span className="text-[10px] text-muted-foreground whitespace-nowrap bg-muted px-1.5 py-0.5 rounded ml-2">
                            {content.duration}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                          {content.description}
                        </p>
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="text-primary font-bold bg-primary/10 px-2 py-0.5 rounded-full">
                            {content.type}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full font-bold ${
                            content.difficulty === 'Beginner' ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300' :
                            content.difficulty === 'Intermediate' ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300' :
                            'bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
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
          </motion.div>

        </div>

      </div>

      {/* Achievements Section */}
      <motion.div 
        variants={itemVariants}
        className="glass-card rounded-2xl p-6 sm:p-8 shadow-xl border border-border/50 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-purple-500/5 to-transparent rounded-full filter blur-2xl"></div>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl">
              <Trophy className="w-6 h-6 text-purple-500 fill-purple-500/10" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">Streaks & Milestones</h2>
          </div>
          <Sparkles className="w-5 h-5 text-purple-500 animate-bounce" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div 
                key={index} 
                className={`relative overflow-hidden rounded-xl p-5 border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                  achievement.earned 
                    ? 'border-emerald-200/50 dark:border-emerald-800/40 bg-gradient-to-br from-emerald-50/50 to-teal-50/30 dark:from-emerald-950/10 dark:to-teal-950/5' 
                    : 'border-border bg-muted/10'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-r ${achievement.color} text-white shadow-md`}>
                    <Icon className="w-5.5 h-5.5" />
                  </div>
                  {achievement.earned && (
                    <div className="w-5.5 h-5.5 bg-emerald-500 rounded-full flex items-center justify-center shadow-md">
                      <Star className="w-3 h-3 text-white fill-white" />
                    </div>
                  )}
                </div>
                <h3 className={`font-bold mb-1.5 text-sm sm:text-base ${achievement.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {achievement.title}
                </h3>
                <p className={`text-xs leading-relaxed mb-3 ${achievement.earned ? 'text-muted-foreground' : 'text-muted-foreground/60'}`}>
                  {achievement.description}
                </p>
                <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block ${
                  achievement.earned 
                    ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300' 
                    : 'bg-muted text-muted-foreground border'
                }`}>
                  {achievement.xp}
                </div>
                {!achievement.earned && (
                  <div className="absolute inset-0 bg-muted/5 backdrop-blur-[1px] rounded-xl flex items-center justify-center">
                    <div className="text-[10px] font-bold text-muted-foreground bg-background/90 px-2.5 py-1 rounded-full border border-border shadow-sm">
                      Locked Milestone
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>

    </motion.div>
  );
};

export default Dashboard;
