'use client';

import { useState, useEffect } from "react";
import { 
  Sparkles, Flame, Trophy, Target, Clock, 
  Play, Pause, ArrowRight, Activity, Terminal, BrainCircuit,
  Map, Library, FileSpreadsheet, CheckCircle2, Zap, Cpu,
  Code2, Network, GitBranch, Layers, ShieldCheck, ArrowDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

interface DashboardProps {
  setActiveTab: (tab: string) => void;
}

export function Dashboard({ setActiveTab }: DashboardProps) {
  const { user, guestStreak } = useAuth();

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [studyTime, setStudyTime] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setStudyTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) return `${hours}h ${minutes}m ${secs}s`;
    if (minutes > 0) return `${minutes}m ${secs}s`;
    return `${secs}s`;
  };

  const displayStreak = user?.streak !== undefined ? user.streak : guestStreak;
  const problemsSolved = user?.problemsSolved || 0;

  const masterySteps = [
    { step: "01", title: "Problem", desc: "Extract parameters & edge constraints", icon: Target, glow: "border-violet-500/40 text-violet-400" },
    { step: "02", title: "Understand", desc: "Deconstruct inputs into state paths", icon: BrainCircuit, glow: "border-purple-500/40 text-purple-400" },
    { step: "03", title: "Approach", desc: "Evaluate HashMap vs Two-Pointers", icon: GitBranch, glow: "border-magenta-500/40 text-magenta-400" },
    { step: "04", title: "Visualize", desc: "Simulate step-by-step state changes", icon: Activity, glow: "border-cyan-500/40 text-cyan-400" },
    { step: "05", title: "Analyze", desc: "Verify Big-O runtime & memory depth", icon: Cpu, glow: "border-emerald-500/40 text-emerald-400" },
    { step: "06", title: "Solve", desc: "Execute clean, optimal code in IDE", icon: CheckCircle2, glow: "border-amber-500/40 text-amber-400" },
  ];

  const quickFeatures = [
    { id: "roadmap", title: "Connected SVG Roadmap", desc: "Interactive flowchart prerequisites", icon: Map, color: "text-violet-400 bg-violet-500/10 border-violet-500/20" },
    { id: "analyzer", title: "AI Problem Workbench", desc: "Optimal code & progressive hints", icon: BrainCircuit, color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
    { id: "playground", title: "Code Playground", desc: "Monaco Editor with Big-O analysis", icon: Terminal, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    { id: "visualizer", title: "Algorithm Visualizer", desc: "Sorting & BFS/DFS state machines", icon: Activity, color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
    { id: "cheat-sheet", title: "3D Revision Deck", desc: "Pattern cards & Big-O matrix", icon: Library, color: "text-magenta-400 bg-magenta-500/10 border-magenta-500/20" },
    { id: "sheet-manager", title: "Problem Sheets", desc: "Striver 75 & custom sheet manager", icon: FileSpreadsheet, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  ];

  return (
    <div className="space-y-12 animate-fade-in">
      
      {/* Hero Section */}
      <div className="relative glass-panel rounded-3xl p-6 sm:p-10 overflow-hidden border border-violet-500/20 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span>AI-POWERED DSA LEARNING LABORATORY</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                MASTER DATA STRUCTURES. <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-300 to-magenta-400 glow-text-violet">
                  THINK IN ALGORITHMS.
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-[#B8B1CC] leading-relaxed max-w-xl">
                AlgoSpark is an advanced interactive laboratory. Visualize step-by-step algorithms, solve queries with AI guidance, and master interview patterns through connected SVG roadmaps.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                onClick={() => setActiveTab("analyzer")}
                className="bg-gradient-to-r from-violet-600 via-purple-600 to-magenta-600 hover:from-violet-500 hover:to-magenta-500 text-white font-bold text-xs h-11 px-6 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all hover:scale-[1.02]"
              >
                <span>Start Learning</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <Button
                variant="outline"
                onClick={() => setActiveTab("roadmap")}
                className="border-violet-500/30 bg-violet-500/5 hover:bg-violet-500/15 text-violet-200 font-semibold text-xs h-11 px-6 rounded-xl"
              >
                <span>Explore Roadmap</span>
              </Button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-4 border-t border-violet-500/15 flex items-center space-x-6 text-xs text-[#B8B1CC]">
              <div className="flex items-center space-x-2">
                <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
                <span>Streak: <strong className="text-white">{displayStreak} Days</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Solved: <strong className="text-white">{problemsSolved} Problems</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Accuracy: <strong className="text-white">Optimal AST</strong></span>
              </div>
            </div>
          </div>

          {/* Hero Right Visual: Algorithm Intelligence Core */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm h-72 rounded-2xl bg-[#0E0A1F]/90 border border-violet-500/30 p-5 shadow-[0_0_30px_rgba(139,92,246,0.15)] flex flex-col justify-between overflow-hidden">
              
              {/* Circuit Header */}
              <div className="flex items-center justify-between border-b border-violet-500/20 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
                  <span className="text-xs font-mono font-bold text-violet-300">CORE INTELLIGENCE // OPERATIONAL</span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded-md">AI ACTIVE</span>
              </div>

              {/* Node Network Visualizer */}
              <div className="relative flex-1 flex items-center justify-center my-2">
                <div className="absolute w-24 h-24 rounded-full bg-violet-600/20 animate-pulse-glow"></div>
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-violet-600 to-magenta-600 border border-violet-400 flex items-center justify-center shadow-[0_0_25px_rgba(139,92,246,0.6)] z-10">
                  <Cpu className="w-8 h-8 text-white animate-pulse" />
                </div>

                {/* Satellite Nodes */}
                <div className="absolute top-2 left-6 px-2.5 py-1 rounded-lg bg-[#05030D] border border-violet-500/40 text-[10px] font-mono text-violet-300 shadow-md">
                  Time: O(n log n)
                </div>
                <div className="absolute bottom-3 right-4 px-2.5 py-1 rounded-lg bg-[#05030D] border border-magenta-500/40 text-[10px] font-mono text-magenta-300 shadow-md">
                  Space: O(1)
                </div>
                <div className="absolute top-4 right-8 px-2.5 py-1 rounded-lg bg-[#05030D] border border-cyan-500/40 text-[10px] font-mono text-cyan-300 shadow-md">
                  Hash Map
                </div>
              </div>

              {/* Status Footer */}
              <div className="border-t border-violet-500/20 pt-2 flex items-center justify-between text-[10px] font-mono text-[#B8B1CC]">
                <span>AST Evaluation: CLEAN</span>
                <span className="text-emerald-400">Zero Crash Engine</span>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Algorithm Mastery Workflow */}
      <div className="space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            ALGORITHM MASTERY WORKFLOW
          </h2>
          <p className="text-xs text-[#B8B1CC]">Structured 6-phase analytical workflow for engineering interviews</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {masterySteps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-panel glass-panel-hover p-4 rounded-2xl border flex flex-col justify-between space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-[#77708D]">{item.step}</span>
                  <div className={`p-1.5 rounded-lg border bg-background/50 ${item.glow}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-xs text-white">{item.title}</h3>
                  <p className="text-[10px] text-[#B8B1CC] mt-0.5 leading-tight">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid: Study Timer & Problem of the Day */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Live Study Session Timer */}
        <div className="glass-panel rounded-2xl p-6 border border-violet-500/20 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-violet-400" />
              <h3 className="font-bold text-sm text-white">Laboratory Focus Timer</h3>
            </div>
            <span className="text-xs font-mono text-violet-300 bg-violet-500/15 px-3 py-1 rounded-full border border-violet-500/30 shadow-[0_0_10px_rgba(139,92,246,0.2)]">
              {formatTime(studyTime)}
            </span>
          </div>

          <p className="text-xs text-[#B8B1CC] leading-relaxed">
            Measure your focused coding sessions while analyzing roadmaps or writing solution algorithms in the Monaco IDE.
          </p>

          <div className="flex items-center space-x-3 pt-1">
            <Button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className={`text-xs h-9 px-4 rounded-xl font-bold transition-all ${
                isTimerRunning 
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30"
                  : "bg-violet-600 hover:bg-violet-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]"
              }`}
            >
              {isTimerRunning ? <Pause className="w-3.5 h-3.5 mr-1.5" /> : <Play className="w-3.5 h-3.5 mr-1.5" />}
              <span>{isTimerRunning ? "Pause Session" : "Start Timer"}</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsTimerRunning(false);
                setStudyTime(0);
              }}
              className="text-xs h-9 border-violet-500/20 text-[#B8B1CC] hover:text-white"
            >
              Reset
            </Button>
          </div>
        </div>

        {/* Problem of the Day */}
        <div className="glass-panel rounded-2xl p-6 border border-violet-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-sm text-white">Daily Target Problem</h3>
            </div>
            <span className="text-[10px] bg-emerald-500/15 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-bold">EASY</span>
          </div>

          <h4 className="font-bold text-sm text-white">Two Sum (LeetCode #1)</h4>
          <p className="text-xs text-[#B8B1CC] leading-relaxed">
            Given an array of integers <code className="text-violet-300 font-mono">nums</code> and an integer <code className="text-violet-300 font-mono">target</code>, return indices of the two numbers such that they add up to target.
          </p>

          <div className="pt-2 flex justify-end">
            <Button
              size="sm"
              onClick={() => setActiveTab("analyzer")}
              className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold text-xs h-9 px-4 rounded-xl shadow-[0_0_12px_rgba(139,92,246,0.3)]"
            >
              <span>Analyze in AI Workbench</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </div>
        </div>

      </div>

      {/* Feature Exploration Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-extrabold text-white flex items-center space-x-2">
          <Layers className="w-5 h-5 text-violet-400" />
          <span>Laboratory Platform Modules</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                onClick={() => setActiveTab(feat.id)}
                className="group glass-panel glass-panel-hover p-5 rounded-2xl border cursor-pointer space-y-3"
              >
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${feat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white group-hover:text-violet-300 transition-colors flex items-center justify-between">
                    <span>{feat.title}</span>
                    <ArrowRight className="w-4 h-4 text-violet-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-xs text-[#B8B1CC] mt-1">{feat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
export default Dashboard;
