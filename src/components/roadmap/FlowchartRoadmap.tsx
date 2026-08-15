'use client';

import { useState } from "react";
import { CheckCircle, Circle, Sparkles, Filter, Award, Map } from "lucide-react";
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
  title: "Programming Languages",
  children: [
    {
      id: "cpp",
      title: "C++ Standard",
      isAlternative: true,
      children: [
        { id: "time-complexity", title: "Time Complexity" },
        { id: "space-complexity", title: "Space Complexity" },
      ]
    },
    {
      id: "java",
      title: "Java SE",
      isAlternative: true,
      children: [
        { id: "recursion", title: "Recursion Mechanics" },
      ]
    },
    {
      id: "python",
      title: "Python 3",
      isAlternative: true,
    },
    {
      id: "javascript",
      title: "JavaScript / TypeScript",
      children: [
        {
          id: "arrays",
          title: "Arrays & Vectors",
          children: [
            { id: "1d-array", title: "1D Sliding Window" },
            { id: "2d-array", title: "2D Matrix Scan" },
          ]
        },
        {
          id: "linked-lists",
          title: "Linked Lists",
          children: [
            { id: "singly-ll", title: "Singly Linked List" },
            { id: "doubly-ll", title: "Doubly Linked List", isOptional: true },
          ]
        },
        {
          id: "stacks",
          title: "Stacks & Queues",
          children: [
            { id: "ll-stack", title: "Monotonic Stack" },
          ]
        },
        {
          id: "trees",
          title: "Trees & BST",
          children: [
            { id: "binary-tree", title: "Binary Tree DFS" },
            { id: "bst", title: "BST Search" },
          ]
        },
        {
          id: "graphs",
          title: "Graph Algorithms",
          children: [
            { id: "bfs", title: "BFS Shortest Path" },
            { id: "dfs", title: "DFS Island Scan" },
            { id: "dijkstra", title: "Dijkstra Shortest Path", isOptional: true },
          ]
        },
        {
          id: "dynamic-prog",
          title: "Dynamic Programming",
          children: [
            { id: "memoization", title: "Top-Down Memoization" },
            { id: "tabulation", title: "Bottom-Up Tabulation" },
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
          className={`px-4 py-2.5 rounded-2xl border cursor-pointer transition-all duration-300 shadow-lg text-xs font-semibold flex items-center space-x-2 backdrop-blur-md ${
            completed
              ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
              : node.isOptional
              ? "bg-magenta-500/15 border-magenta-500/30 text-magenta-300 hover:border-magenta-500/60"
              : node.isAlternative
              ? "bg-purple-500/15 border-purple-500/30 text-purple-300 hover:border-purple-500/60"
              : "bg-[#0E0A1F] border-violet-500/30 text-white hover:border-violet-500/60 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]"
          }`}
        >
          {completed ? (
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          ) : (
            <Circle className="w-4 h-4 text-[#77708D]" />
          )}
          <span>{node.title}</span>
        </div>

        {node.children && node.children.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 pt-3 border-t border-violet-500/20 w-full">
            {node.children.map((child) => renderNodes(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-semibold">
          <Map className="w-3.5 h-3.5 text-violet-400" />
          <span>CONNECTED ALGORITHM NETWORK</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Interactive SVG DSA Roadmap
        </h1>
        <p className="text-xs text-[#B8B1CC] max-w-2xl mx-auto">
          Connected network tree linking DSA prerequisites, core structures, and advanced Dynamic Programming.
        </p>
      </div>

      {/* Control Bar */}
      <div className="glass-panel rounded-2xl p-6 border border-violet-500/20 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-violet-400" />
              Connected Vector Roadmap
            </h2>
            <p className="text-xs text-[#B8B1CC]">Flowing path trackways linking topics with live mastery calculations</p>
          </div>

          <div className="flex items-center space-x-3 bg-[#05030D] px-4 py-2 rounded-xl border border-violet-500/30">
            <Award className="w-5 h-5 text-violet-400" />
            <div>
              <div className="text-[10px] text-[#77708D] uppercase font-bold">Curriculum Mastery</div>
              <div className="text-sm font-bold text-violet-300">{masteryPercentage}% ({solvedCount}/{totalTopics} Topics)</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-violet-500/15 text-xs">
          <div className="flex items-center space-x-1 text-[#77708D] mr-2">
            <Filter className="w-3.5 h-3.5" />
            <span>Filters:</span>
          </div>

          <button
            onClick={() => setShowRequired(!showRequired)}
            className={`px-3 py-1 rounded-full border text-xs font-semibold transition-all ${
              showRequired ? "bg-violet-500/20 border-violet-500 text-violet-200 shadow-[0_0_10px_rgba(139,92,246,0.2)]" : "bg-[#05030D] border-violet-500/20 text-[#77708D]"
            }`}
          >
            Required Nodes
          </button>

          <button
            onClick={() => setShowAlternative(!showAlternative)}
            className={`px-3 py-1 rounded-full border text-xs font-semibold transition-all ${
              showAlternative ? "bg-purple-500/20 border-purple-500 text-purple-200 shadow-[0_0_10px_rgba(168,85,247,0.2)]" : "bg-[#05030D] border-violet-500/20 text-[#77708D]"
            }`}
          >
            Alternative Languages
          </button>

          <button
            onClick={() => setShowOptional(!showOptional)}
            className={`px-3 py-1 rounded-full border text-xs font-semibold transition-all ${
              showOptional ? "bg-magenta-500/20 border-magenta-500 text-magenta-200 shadow-[0_0_10px_rgba(217,70,239,0.2)]" : "bg-[#05030D] border-violet-500/20 text-[#77708D]"
            }`}
          >
            Optional Deep Dives
          </button>
        </div>
      </div>

      {/* Main Connected Tree Rendering */}
      <div className="glass-panel/50 rounded-2xl p-6 border border-violet-500/15 overflow-x-auto min-h-[420px] flex justify-center shadow-xl">
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
