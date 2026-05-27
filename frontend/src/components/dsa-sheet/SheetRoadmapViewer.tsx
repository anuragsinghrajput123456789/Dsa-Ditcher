import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, CheckCircle, Circle, BookOpen, Lightbulb, 
  Play, ExternalLink, Sparkles, Award, Search, HelpCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type DsaSheet = {
  id: string;
  title: string;
  description: string;
  problems: string;
};

interface SheetRoadmapViewerProps {
  sheet: DsaSheet;
  onBack: () => void;
}

interface ProblemItem {
  id: string;
  name: string;
  completed: boolean;
}

interface SheetSection {
  category: string;
  items: ProblemItem[];
}

export default function SheetRoadmapViewer({ sheet, onBack }: SheetRoadmapViewerProps) {
  const navigate = useNavigate();
  const [sections, setSections] = useState<SheetSection[]>([]);
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>({});
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  // Dynamic parser for sheet problems
  useEffect(() => {
    // 1. Load progress status from localStorage
    let progress: Record<string, boolean> = {};
    try {
      const storedProgress = localStorage.getItem(`dsa-sheet-progress-${sheet.id}`);
      if (storedProgress) {
        progress = JSON.parse(storedProgress);
      }
    } catch (e) {
      console.error("Error loading sheet progress", e);
    }
    setCompletedMap(progress);

    // 2. Parse problems list string dynamically
    const parsedSections: SheetSection[] = [];
    let currentCategory = "General Practice";
    let currentItems: ProblemItem[] = [];

    const lines = sheet.problems.split("\n");
    lines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed) return;

      // Check if it looks like a Category Header (ends with colon, or doesn't start with digits)
      if (trimmed.endsWith(":") || (!/^\d+\./.test(trimmed) && trimmed.length > 2 && !trimmed.startsWith("-") && !trimmed.startsWith("*"))) {
        if (currentItems.length > 0 || currentCategory !== "General Practice") {
          parsedSections.push({ 
            category: currentCategory.endsWith(":") ? currentCategory.slice(0, -1) : currentCategory, 
            items: currentItems 
          });
          currentItems = [];
        }
        currentCategory = trimmed;
      } else {
        // It's a problem list item. Parse out prefix index.
        const problemName = trimmed.replace(/^(\d+\.|-|\*)\s*/, "");
        if (problemName && problemName.toLowerCase() !== "and many more..." && !problemName.toLowerCase().startsWith("plus many more") && !problemName.toLowerCase().startsWith("and ")) {
          const problemId = `${sheet.id}-${currentCategory}-${problemName}`.replace(/\s+/g, "-").toLowerCase();
          currentItems.push({
            id: problemId,
            name: problemName,
            completed: !!progress[problemId]
          });
        }
      }
    });

    if (currentItems.length > 0 || parsedSections.length === 0) {
      parsedSections.push({ 
        category: currentCategory.endsWith(":") ? currentCategory.slice(0, -1) : currentCategory, 
        items: currentItems 
      });
    }

    setSections(parsedSections);

    // Default expand first 3 categories
    const initialExpanded: Record<string, boolean> = {};
    parsedSections.forEach((s, idx) => {
      initialExpanded[s.category] = idx < 3;
    });
    setExpandedSections(initialExpanded);
  }, [sheet]);

  const toggleProblemComplete = (problemId: string) => {
    const nextMap = { ...completedMap, [problemId]: !completedMap[problemId] };
    setCompletedMap(nextMap);
    localStorage.setItem(`dsa-sheet-progress-${sheet.id}`, JSON.stringify(nextMap));
    
    // Update active section states
    setSections(prev => prev.map(sec => ({
      ...sec,
      items: sec.items.map(item => item.id === problemId ? { ...item, completed: !item.completed } : item)
    })));
  };

  const toggleSection = (category: string) => {
    setExpandedSections(prev => ({ ...prev, [category]: !prev[category] }));
  };

  // Metrics calculators
  const totalProblems = sections.reduce((sum, s) => sum + s.items.length, 0);
  const completedProblems = sections.reduce((sum, s) => sum + s.items.filter(item => completedMap[item.id]).length, 0);
  const progressPercent = totalProblems > 0 ? Math.round((completedProblems / totalProblems) * 100) : 0;

  const navigateToAnalyzer = (problemName: string) => {
    navigate("/analyzer", { state: { problem: problemName } });
  };

  const getProblemExternalSearchUrl = (problemName: string) => {
    return `https://www.google.com/search?q=${encodeURIComponent(problemName + " leetcode solution")}`;
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      
      {/* Back Button */}
      <Button
        onClick={onBack}
        variant="ghost"
        className="text-primary hover:text-primary/80 hover:bg-primary/10 transition-all duration-200"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Sheets
      </Button>

      {/* Sheet Details Glow Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 rounded-full text-xs font-bold uppercase tracking-wider text-blue-200 border border-white/10">
              <Award className="w-3.5 h-3.5 text-yellow-300" />
              Practice Roadmap Natively Active
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{sheet.title}</h1>
            <p className="text-blue-100 text-sm leading-relaxed">{sheet.description}</p>
          </div>
          
          <div className="flex items-center gap-4 bg-black/25 backdrop-blur-md rounded-2xl p-4 border border-white/10 w-full md:w-auto text-center">
            <div className="flex-1 md:flex-initial">
              <div className="text-3xl font-black text-white">{completedProblems} / {totalProblems}</div>
              <div className="text-xs text-blue-200 font-semibold uppercase tracking-wider mt-1">Problems Solved</div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress metrics wrapper */}
      <div className="glass-card rounded-2xl p-6 shadow-xl border border-border/50">
        <div className="flex justify-between items-center mb-2.5 text-sm font-bold">
          <span className="text-foreground">Overall Practice Goal Completed</span>
          <span className="text-primary">{progressPercent}%</span>
        </div>
        <Progress value={progressPercent} className="h-3 rounded-full bg-muted" />
      </div>

      {/* Category List */}
      <div className="space-y-4">
        {sections.map((section, secIdx) => {
          const isExpanded = !!expandedSections[section.category];
          const completedInCategory = section.items.filter(item => completedMap[item.id]).length;
          const categoryPercent = section.items.length > 0 ? Math.round((completedInCategory / section.items.length) * 100) : 0;

          return (
            <div 
              key={secIdx}
              className="glass-card rounded-2xl border border-border/50 shadow-md overflow-hidden"
            >
              
              {/* Accordion Header */}
              <div
                onClick={() => toggleSection(section.category)}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-5 cursor-pointer bg-muted/20 hover:bg-muted/40 transition-colors border-b border-border/40 select-none"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    categoryPercent === 100 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-primary/10 text-primary'
                  }`}>
                    {categoryPercent === 100 ? "✓" : secIdx + 1}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-foreground text-base sm:text-lg">
                      {section.category}
                    </h3>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {completedInCategory} of {section.items.length} problems solved ({categoryPercent}%)
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="w-24 sm:w-32 bg-muted dark:bg-muted/30 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        categoryPercent === 100 ? 'bg-emerald-500' : 'bg-primary'
                      }`}
                      style={{ width: `${categoryPercent}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-bold text-muted-foreground uppercase">
                    {isExpanded ? "Collapse" : "Expand"}
                  </span>
                </div>
              </div>

              {/* Problem Rows container */}
              {isExpanded && (
                <div className="divide-y divide-border/40 bg-card/35">
                  {section.items.map((item, itemIdx) => (
                    <motion.div 
                      key={item.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: itemIdx * 0.03 }}
                      className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 hover:bg-muted/25 transition-colors ${
                        item.completed ? 'bg-emerald-50/10 dark:bg-emerald-950/5' : ''
                      }`}
                    >
                      
                      {/* Checkbox and Title */}
                      <div className="flex items-start gap-3.5 flex-1 min-w-0">
                        <button
                          onClick={() => toggleProblemComplete(item.id)}
                          className={`w-5.5 h-5.5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 ${
                            item.completed
                              ? 'bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/25'
                              : 'border-muted-foreground/45 hover:border-emerald-500'
                          }`}
                        >
                          {item.completed && <span className="text-xs font-black">✓</span>}
                        </button>
                        
                        <div className="min-w-0">
                          <p className={`text-sm sm:text-base font-bold truncate leading-snug ${
                            item.completed ? 'text-emerald-600 dark:text-emerald-400 line-through opacity-70' : 'text-foreground'
                          }`}>
                            {item.name}
                          </p>
                        </div>
                      </div>

                      {/* Utility Action Buttons */}
                      <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-end">
                        <Button
                          onClick={() => navigateToAnalyzer(item.name)}
                          size="sm"
                          variant="outline"
                          className="h-8 text-xs font-bold border-border/60 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 text-indigo-500 hover:text-indigo-600 gap-1 rounded-lg"
                        >
                          <Lightbulb className="w-3.5 h-3.5" />
                          <span>AI Mentor</span>
                        </Button>
                        <Button
                          onClick={() => navigate("/playground")}
                          size="sm"
                          variant="outline"
                          className="h-8 text-xs font-bold border-border/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 text-emerald-500 hover:text-emerald-600 gap-1 rounded-lg"
                        >
                          <Play className="w-3.5 h-3.5 fill-emerald-500/10" />
                          <span>Playground</span>
                        </Button>
                        <a 
                          href={getProblemExternalSearchUrl(item.name)} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 text-xs font-bold text-muted-foreground hover:text-foreground gap-1 p-2 rounded-lg"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Button>
                        </a>
                      </div>

                    </motion.div>
                  ))}
                  {section.items.length === 0 && (
                    <div className="p-8 text-center text-muted-foreground text-sm font-medium">
                      No problems listed under this topic group.
                    </div>
                  )}
                </div>
              )}

            </div>
          );
        })}
      </div>
      
    </div>
  );
}
