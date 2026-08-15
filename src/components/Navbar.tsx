'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, X, Code2, Sparkles, Flame, 
  Library, BrainCircuit, Activity, Map, 
  FileSpreadsheet, Terminal, ArrowRight, User,
  Settings, Key, LogOut, Cpu
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

  const [showSettings, setShowSettings] = useState(false);
  const [openrouterKey, setOpenrouterKey] = useState("");

  useEffect(() => {
    setOpenrouterKey(localStorage.getItem("openrouter_api_key") || "");
    
    const handleOpenSettings = () => setShowSettings(true);
    window.addEventListener("open-ai-settings", handleOpenSettings);
    return () => window.removeEventListener("open-ai-settings", handleOpenSettings);
  }, []);

  const handleSaveKeys = () => {
    localStorage.setItem("openrouter_api_key", openrouterKey.trim());
    setShowSettings(false);
    toast.success("AI API keys updated successfully.");
  };

  const navItems = [
    { id: "roadmap", label: "Roadmap", icon: Map },
    { id: "analyzer", label: "Problem Analyzer", icon: BrainCircuit },
    { id: "playground", label: "AI Workbench", icon: Terminal },
    { id: "visualizer", label: "Visualizer", icon: Activity },
    { id: "cheat-sheet", label: "Revision Hub", icon: Library },
    { id: "sheet-manager", label: "Problem Sheets", icon: FileSpreadsheet },
  ];

  const displayStreak = user?.streak !== undefined ? user.streak : guestStreak;

  return (
    <header className="sticky top-3 z-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav className="glass-panel rounded-2xl transition-all duration-300 border border-[rgba(139,92,246,0.22)] shadow-[0_8px_32px_rgba(5,3,13,0.6)]">
        <div className="px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            
            {/* Futuristic Brand Logo */}
            <Link 
              href="/" 
              onClick={() => {
                if (setActiveTab) setActiveTab('dashboard');
              }}
              className="flex items-center space-x-3 group cursor-pointer"
            >
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 via-purple-600 to-magenta-500 p-0.5 shadow-[0_0_15px_rgba(139,92,246,0.4)] group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-[#0E0A1F] rounded-[10px] flex items-center justify-center">
                  <Code2 className="w-4 h-4 text-violet-400 group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-1">
                  <span className="font-extrabold text-base tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-200 to-purple-400">
                    AlgoSpark
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                </div>
                <span className="text-[9px] text-[#B8B1CC] font-mono -mt-1 tracking-widest uppercase">
                  AI DSA Laboratory
                </span>
              </div>
            </Link>

            {/* Navigation Items */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab && setActiveTab(item.id)}
                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-violet-500/15 text-violet-300 border border-violet-500/30 shadow-[0_0_12px_rgba(139,92,246,0.2)]"
                        : "text-[#B8B1CC] hover:text-white hover:bg-white/5"
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
              {/* Flame Streak Widget */}
              <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-bold shadow-[0_0_12px_rgba(245,158,11,0.15)]">
                <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
                <span>{displayStreak} Day Streak</span>
              </div>

              {/* AI Settings Trigger */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowSettings(true)}
                className="w-9 h-9 rounded-xl border-violet-500/20 bg-violet-500/5 hover:bg-violet-500/15 text-[#B8B1CC] hover:text-violet-300 transition-colors"
                title="AI API Keys Configuration"
              >
                <Settings className="w-4 h-4" />
              </Button>

              {user ? (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium">
                    <User className="w-3.5 h-3.5 text-violet-400" />
                    <span>{user.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    className="text-xs text-[#B8B1CC] hover:text-red-400 hover:bg-red-500/10"
                  >
                    <LogOut className="w-3.5 h-3.5 mr-1" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/login">
                    <Button variant="ghost" size="sm" className="text-xs text-[#B8B1CC] hover:text-white">
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button size="sm" className="text-xs bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                      Sign Up
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Trigger */}
            <div className="lg:hidden flex items-center space-x-2">
              <div className="flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
                <Flame className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
                <span>{displayStreak}</span>
              </div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl text-[#B8B1CC] hover:text-white hover:bg-white/5"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="lg:hidden border-t border-violet-500/20 px-4 pt-3 pb-5 space-y-2 bg-[#0E0A1F]/95 backdrop-blur-2xl rounded-b-2xl animate-fade-in">
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
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-violet-500/15 text-violet-300 border border-violet-500/30"
                      : "text-[#B8B1CC] hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4 text-violet-400" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </nav>

      {/* AI Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <div className="w-full max-w-md glass-panel rounded-2xl p-6 shadow-2xl space-y-4 border border-violet-500/30">
            <div className="flex items-center justify-between border-b border-violet-500/20 pb-3">
              <div className="flex items-center space-x-2">
                <Key className="w-5 h-5 text-violet-400" />
                <h3 className="font-bold text-base text-white">Custom OpenRouter API Key</h3>
              </div>
              <button onClick={() => setShowSettings(false)} className="text-[#B8B1CC] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-[#B8B1CC] leading-relaxed">
              Optional: Provide your own OpenRouter key. If omitted, AlgoSpark automatically uses the server-side API key or the zero-crash local AST sandbox.
            </p>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[#B8B1CC] block mb-1">OpenRouter Key</label>
                <input
                  type="password"
                  value={openrouterKey}
                  onChange={(e) => setOpenrouterKey(e.target.value)}
                  placeholder="sk-or-v1-..."
                  className="w-full h-9 px-3 rounded-xl bg-[#05030D] border border-violet-500/30 text-xs text-white focus:ring-1 focus:ring-violet-500 outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <Button variant="ghost" size="sm" onClick={() => setShowSettings(false)} className="text-xs text-[#B8B1CC]">
                Cancel
              </Button>
              <Button size="sm" onClick={handleSaveKeys} className="text-xs bg-violet-600 hover:bg-violet-500 text-white font-semibold">
                Save Key
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
export default Navbar;
