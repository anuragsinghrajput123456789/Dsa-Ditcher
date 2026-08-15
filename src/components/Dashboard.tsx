'use client';

import { useState, useEffect } from "react";
import { 
  Sparkles, Flame, Trophy, Target, Clock, 
  Play, Pause, ArrowRight, Activity, Terminal, Brain,
  Map, Library, FileSpreadsheet, CheckCircle, Zap
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

  const quickFeatures = [
    { id: "roadmap", title: "Connected SVG Roadmap", desc: "Interactive trackway prerequisites", icon: Map, color: "text-violet-400 bg-violet-500/10 border-violet-500/20" },
    { id: "analyzer", title: "AI Problem Analyzer", desc: "Optimal code & progressive hints", icon: Brain, color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
    { id: "playground", title: "Code Playground", desc: "Monaco Editor with Big-O analysis", icon: Terminal, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    { id: "visualizer", title: "Algorithm Visualizer", desc: "Sorting & BFS/DFS step machines", icon: Activity, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
    { id: "cheat-sheet", title: "3D Flashcard Revision", desc: "Pattern decks & Big-O matrix", icon: Library, color: "text-pink-400 bg-pink-500/10 border-pink-500/20" },
    { id: "sheet-manager", title: "DSA Problem Sheets", desc: "Striver 75 & custom sheet manager", icon: FileSpreadsheet, color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-violet-950/80 via-indigo-950/80 to-background border border-violet-500/30 p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full-Stack Next.js Architecture</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">
              Welcome back, <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-white bg-clip-text text-transparent">{user?.name || "Developer"}</span>!
            </h1>
            <p className="text-muted-foreground text-sm max-w-xl">
              Track your daily interview practice, solve algorithm queries with AI hints, and explore connected topic roadmaps.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="p-4 rounded-2xl bg-card/80 border border-border/80 text-center space-y-1">
              <div className="flex items-center justify-center space-x-1 text-amber-400">
                <Flame className="w-5 h-5 animate-pulse" />
                <span className="text-2xl font-bold">{displayStreak}</span>
              </div>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold block">Active Streak</span>
            </div>

            <div className="p-4 rounded-2xl bg-card/80 border border-border/80 text-center space-y-1">
              <div className="flex items-center justify-center space-x-1 text-emerald-400">
                <CheckCircle className="w-5 h-5" />
                <span className="text-2xl font-bold">{problemsSolved}</span>
              </div>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold block">Solved Problems</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Study Timer & Problem of the Day */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Live Study Session Timer */}
        <div className="bg-card rounded-2xl p-6 border border-border/80 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-violet-400" />
              <h3 className="font-bold text-base">Study Session Timer</h3>
            </div>
            <span className="text-xs font-mono text-violet-300 bg-violet-500/10 px-2.5 py-1 rounded-full border border-violet-500/20">
              {formatTime(studyTime)}
            </span>
          </div>

          <p className="text-xs text-muted-foreground">
            Track focused coding time while revising roadmaps or running code in the Monaco Editor.
          </p>

          <div className="flex items-center space-x-3 pt-2">
            <Button
              variant={isTimerRunning ? "outline" : "gradient"}
              size="sm"
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="gap-2 text-xs"
            >
              {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isTimerRunning ? "Pause Timer" : "Start Session"}</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsTimerRunning(false);
                setStudyTime(0);
              }}
              className="text-xs"
            >
              Reset
            </Button>
          </div>
        </div>

        {/* Problem of the Day */}
        <div className="bg-card rounded-2xl p-6 border border-border/80 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-base">Problem of the Day</h3>
            </div>
            <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20 font-medium">Easy</span>
          </div>

          <h4 className="font-bold text-sm text-foreground">Two Sum</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Given an array of integers <code className="text-violet-300 font-mono">nums</code> and an integer <code className="text-violet-300 font-mono">target</code>, return indices of the two numbers such that they add up to target.
          </p>

          <div className="pt-2 flex justify-end">
            <Button
              variant="gradient"
              size="sm"
              onClick={() => setActiveTab("analyzer")}
              className="gap-1.5 text-xs"
            >
              <span>Solve with AI Tutor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

      </div>

      {/* Feature Exploration Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold flex items-center space-x-2">
          <Target className="w-5 h-5 text-violet-400" />
          <span>Platform Feature Hub</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                onClick={() => setActiveTab(feat.id)}
                className="group p-5 rounded-2xl bg-card border border-border/80 hover:border-violet-500/40 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-violet-500/10 space-y-3"
              >
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${feat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm group-hover:text-violet-400 transition-colors flex items-center justify-between">
                    <span>{feat.title}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">{feat.desc}</p>
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
