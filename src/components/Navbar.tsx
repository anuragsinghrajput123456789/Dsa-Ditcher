'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Menu, X, Code, Sparkles, Flame, 
  Library, BrainCircuit, Activity, Map, 
  FileSpreadsheet, Terminal, ArrowRight, User,
  Settings, Key, LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface NavbarProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, guestStreak } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const [showSettings, setShowSettings] = useState(false);
  const [geminiKey, setGeminiKey] = useState("");
  const [openrouterKey, setOpenrouterKey] = useState("");

  useEffect(() => {
    setGeminiKey(localStorage.getItem("gemini_api_key") || "");
    setOpenrouterKey(localStorage.getItem("openrouter_api_key") || "");
    
    const handleOpenSettings = () => setShowSettings(true);
    window.addEventListener("open-ai-settings", handleOpenSettings);
    return () => window.removeEventListener("open-ai-settings", handleOpenSettings);
  }, []);

  const handleSaveKeys = () => {
    localStorage.setItem("gemini_api_key", geminiKey.trim());
    localStorage.setItem("openrouter_api_key", openrouterKey.trim());
    setShowSettings(false);
    toast.success("AI API settings updated successfully.");
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Sparkles },
    { id: "roadmap", label: "Interactive Roadmap", icon: Map },
    { id: "analyzer", label: "Problem Analyzer", icon: BrainCircuit },
    { id: "playground", label: "Code Playground", icon: Terminal },
    { id: "visualizer", label: "Visualizers", icon: Activity },
    { id: "cheat-sheet", label: "Revision Hub", icon: Library },
    { id: "sheet-manager", label: "Problem Sheets", icon: FileSpreadsheet },
  ];

  const displayStreak = user?.streak !== undefined ? user.streak : guestStreak;

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-500 to-purple-400 p-0.5 shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-background rounded-[10px] flex items-center justify-center">
                <Code className="w-5 h-5 text-violet-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-200 to-violet-400">
                AlgoSpark
              </span>
              <span className="text-[10px] text-muted-foreground font-medium -mt-1 tracking-wider uppercase">
                AI Learning Hub
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab && setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-violet-500/10 text-violet-400 border border-violet-500/20 shadow-[0_0_12px_rgba(168,85,247,0.15)]"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-violet-400" : ""}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Action Bar */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Flame Active Streak Badge */}
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold shadow-[0_0_15px_rgba(245,158,11,0.15)]">
              <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
              <span>{displayStreak} Day Streak</span>
            </div>

            {/* AI Settings Trigger */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowSettings(true)}
              className="w-9 h-9 rounded-xl border-border/60 hover:border-violet-500/40 hover:text-violet-400"
              title="AI API Keys Configuration"
            >
              <Settings className="w-4 h-4" />
            </Button>

            {user ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium">
                  <User className="w-3.5 h-3.5" />
                  <span>{user.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-xs text-muted-foreground hover:text-destructive"
                >
                  <LogOut className="w-3.5 h-3.5 mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-xs">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="gradient" size="sm" className="text-xs">
                    Sign Up
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
              <Flame className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
              <span>{displayStreak}</span>
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden border-b border-border/60 bg-background/95 backdrop-blur-2xl px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (setActiveTab) setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-violet-500/10 text-violet-400 border border-violet-500/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-card border border-border/80 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center space-x-2">
                <Key className="w-5 h-5 text-violet-400" />
                <h3 className="font-semibold text-lg">AI API Keys</h3>
              </div>
              <button onClick={() => setShowSettings(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              Optional: Enter custom API keys. If left blank, AlgoSpark automatically uses server-side keys or the zero-crash local AST sandbox.
            </p>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">OpenRouter Key</label>
                <input
                  type="password"
                  value={openrouterKey}
                  onChange={(e) => setOpenrouterKey(e.target.value)}
                  placeholder="sk-or-v1-..."
                  className="w-full h-9 px-3 rounded-lg bg-background border border-input text-xs focus:ring-1 focus:ring-violet-500 outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">Gemini Direct Key</label>
                <input
                  type="password"
                  value={geminiKey}
                  onChange={(e) => setGeminiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full h-9 px-3 rounded-lg bg-background border border-input text-xs focus:ring-1 focus:ring-violet-500 outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <Button variant="ghost" size="sm" onClick={() => setShowSettings(false)}>Cancel</Button>
              <Button variant="gradient" size="sm" onClick={handleSaveKeys}>Save Keys</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
