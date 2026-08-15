'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Circle, ChevronDown, ChevronRight, ExternalLink, Sparkles, Filter, Award } from "lucide-react";
import { useRoadmapProgress } from "@/hooks/useRoadmapProgress";
import TopicDetailModal from "./TopicDetailModal";
import { Button } from "@/components/ui/button";

interface RoadmapNode {
  id: string;
  title: string;
  completed?: boolean;
  children?: RoadmapNode[];
  isOptional?: boolean;
  isAlternative?: boolean;
  link?: string;
}

const mainRoadmapTree: RoadmapNode = {
  id: "languages",
  title: "Programming Language",
  children: [
    {
      id: "cpp",
      title: "C++",
      isAlternative: true,
      children: [
        { id: "time-complexity", title: "Time Complexity" },
        { id: "space-complexity", title: "Space Complexity" },
      ]
    },
    {
      id: "java",
      title: "Java",
      isAlternative: true,
      children: [
        { id: "recursion", title: "Recursion" },
      ]
    },
    {
      id: "python",
      title: "Python",
      isAlternative: true,
    },
    {
      id: "javascript",
      title: "JavaScript",
      children: [
        {
          id: "arrays",
          title: "Arrays",
          children: [
            { id: "1d-array", title: "1D Array" },
            { id: "2d-array", title: "2D Array" },
          ]
        },
        {
          id: "linked-lists",
          title: "Linked Lists",
          children: [
            { id: "singly-ll", title: "Singly LL" },
            { id: "doubly-ll", title: "Doubly LL", isOptional: true },
          ]
        },
        {
          id: "stacks",
          title: "Stacks",
          children: [
            { id: "ll-stack", title: "LL Stack" },
          ]
        },
        {
          id: "queues",
          title: "Queues",
          children: [
            { id: "circular-queue", title: "Circular Queue", isOptional: true },
          ]
        },
        {
          id: "trees",
          title: "Trees",
          children: [
            { id: "binary-tree", title: "Binary Tree" },
            { id: "bst", title: "BST" },
          ]
        },
        {
          id: "graphs",
          title: "Graphs",
          children: [
            { id: "bfs", title: "BFS Traversal" },
            { id: "dfs", title: "DFS Traversal" },
            { id: "dijkstra", title: "Dijkstra's Algo", isOptional: true },
          ]
        },
        {
          id: "dynamic-prog",
          title: "Dynamic Programming",
          children: [
            { id: "memoization", title: "Memoization" },
            { id: "tabulation", title: "Tabulation" },
          ]
        }
      ]
    }
  ]
};

export function FlowchartRoadmap() {
  const { isCompleted, toggleComplete, completedTopics } = useRoadmapProgress();
  const [selectedTopic, setSelectedTopic] = useState<{ id: string; title: string } | null>(null);
  const [showRequired, setShowRequired] = useState(true);
  const [showAlternative, setShowAlternative] = useState(true);
  const [showOptional, setShowOptional] = useState(true);

  const totalTopics = 24;
  const solvedCount = completedTopics.size;
  const masteryPercentage = Math.round((solvedCount / totalTopics) * 100);

  const handleNodeClick = (nodeId: string, title: string) => {
    setSelectedTopic({ id: nodeId, title });
  };

  const renderNodes = (node: RoadmapNode, depth = 0): React.ReactNode => {
    if (node.isOptional && !showOptional) return null;
    if (node.isAlternative && !showAlternative) return null;
    if (!node.isOptional && !node.isAlternative && !showRequired && depth > 0) return null;

    const completed = isCompleted(node.id);

    return (
      <div key={node.id} className="flex flex-col items-center space-y-4">
        <div
          onClick={() => handleNodeClick(node.id, node.title)}
          className={`px-4 py-2.5 rounded-2xl border cursor-pointer transition-all duration-300 shadow-md text-xs sm:text-sm font-semibold flex items-center space-x-2 backdrop-blur-md ${
            completed
              ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-300 shadow-emerald-500/10"
              : node.isOptional
              ? "bg-pink-500/10 border-pink-500/30 text-pink-300"
              : node.isAlternative
              ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-300"
              : "bg-card border-border/80 text-foreground hover:border-violet-500/60"
          }`}
        >
          {completed ? (
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          ) : (
            <Circle className="w-4 h-4 text-muted-foreground" />
          )}
          <span>{node.title}</span>
        </div>

        {node.children && node.children.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 pt-2 border-t border-border/40 w-full">
            {node.children.map((child) => renderNodes(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Roadmap Control Bar */}
      <div className="bg-card rounded-2xl p-6 border border-border/80 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-violet-400" />
              Connected SVG DSA Roadmap
            </h2>
            <p className="text-xs text-muted-foreground">Flowing path trackways linking topics with live mastery calculations</p>
          </div>

          <div className="flex items-center space-x-3 bg-violet-500/10 px-4 py-2 rounded-xl border border-violet-500/20">
            <Award className="w-5 h-5 text-violet-400" />
            <div>
              <div className="text-[10px] text-muted-foreground uppercase font-bold">Curriculum Mastery</div>
              <div className="text-sm font-bold text-violet-300">{masteryPercentage}% ({solvedCount}/{totalTopics} Topics)</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/60 text-xs">
          <div className="flex items-center space-x-1 text-muted-foreground mr-2">
            <Filter className="w-3.5 h-3.5" />
            <span>Filters:</span>
          </div>

          <button
            onClick={() => setShowRequired(!showRequired)}
            className={`px-3 py-1 rounded-full border transition-all ${
              showRequired ? "bg-violet-500/20 border-violet-500 text-violet-300" : "bg-muted/40 border-border text-muted-foreground"
            }`}
          >
            Required Nodes
          </button>

          <button
            onClick={() => setShowAlternative(!showAlternative)}
            className={`px-3 py-1 rounded-full border transition-all ${
              showAlternative ? "bg-indigo-500/20 border-indigo-500 text-indigo-300" : "bg-muted/40 border-border text-muted-foreground"
            }`}
          >
            Alternative Languages
          </button>

          <button
            onClick={() => setShowOptional(!showOptional)}
            className={`px-3 py-1 rounded-full border transition-all ${
              showOptional ? "bg-pink-500/20 border-pink-500 text-pink-300" : "bg-muted/40 border-border text-muted-foreground"
            }`}
          >
            Optional Deep Dives
          </button>
        </div>
      </div>

      {/* Main Connected Tree Rendering */}
      <div className="bg-card/50 rounded-2xl p-6 border border-border/60 overflow-x-auto min-h-[400px] flex justify-center">
        {renderNodes(mainRoadmapTree)}
      </div>

      {/* Topic Detail Modal */}
      {selectedTopic && (
        <TopicDetailModal
          isOpen={!!selectedTopic}
          onClose={() => setSelectedTopic(null)}
          topicId={selectedTopic.id}
          topicTitle={selectedTopic.title}
          isCompleted={isCompleted(selectedTopic.id)}
          onToggleComplete={toggleComplete}
        />
      )}
    </div>
  );
}
export default FlowchartRoadmap;
