import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Circle, ChevronDown, ChevronRight, ExternalLink, RotateCcw, Sparkles, Filter, Award, HelpCircle } from "lucide-react";
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

interface NodeCardProps {
  node: RoadmapNode;
  depth?: number;
  onNodeClick?: (nodeId: string, title: string) => void;
  isCompleted?: boolean;
}

const NodeCard = ({ 
  node, 
  depth = 0, 
  onNodeClick,
  isCompleted 
}: NodeCardProps) => {
  const [isExpanded, setIsExpanded] = useState(depth < 1);
  const hasChildren = node.children && node.children.length > 0;
  const completed = isCompleted ?? node.completed;

  const getThemeClass = () => {
    if (completed) {
      return "border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 shadow-lg shadow-emerald-500/10";
    }
    if (node.isOptional) {
      return "border-pink-400 bg-pink-50/15 dark:bg-pink-950/10 text-pink-500 dark:text-pink-400 hover:border-pink-500";
    }
    if (node.isAlternative) {
      return "border-indigo-400 bg-indigo-50/15 dark:bg-indigo-950/10 text-indigo-500 dark:text-indigo-400 hover:border-indigo-500";
    }
    return "border-blue-500/50 bg-card hover:border-primary/80 text-foreground shadow-lg shadow-blue-500/5";
  };

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.03, y: -2 }}
        transition={{ duration: 0.2, delay: depth * 0.03 }}
        className={`
          px-4 py-3 rounded-2xl border-2 ${getThemeClass()}
          cursor-pointer transition-all duration-300 min-w-[130px] font-semibold text-xs sm:text-sm text-center relative group
        `}
        onClick={(e) => {
          e.stopPropagation();
          if (hasChildren) {
            setIsExpanded(!isExpanded);
          } else {
            onNodeClick?.(node.id, node.title);
          }
        }}
        onDoubleClick={(e) => {
          e.stopPropagation();
          onNodeClick?.(node.id, node.title);
        }}
      >
        {/* Glow backdrop on completed nodes */}
        {completed && (
          <div className="absolute inset-0 bg-emerald-500/5 rounded-2xl animate-pulse pointer-events-none"></div>
        )}

        <div className="flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 text-left min-w-0">
            {completed ? (
              <div className="p-0.5 bg-emerald-500 text-white rounded-full flex-shrink-0">
                <CheckCircle className="w-3.5 h-3.5" />
              </div>
            ) : (
              <Circle className={`w-3.5 h-3.5 flex-shrink-0 ${node.isOptional ? 'text-pink-400' : node.isAlternative ? 'text-indigo-400' : 'text-blue-400'}`} />
            )}
            <span className="truncate pr-1">{node.title}</span>
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            {hasChildren && (
              isExpanded ? 
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" /> : 
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
            )}
            {node.link && (
              <ExternalLink className="w-3 h-3 text-muted-foreground" />
            )}
          </div>
        </div>
      </motion.div>

      {/* Children branches */}
      <AnimatePresence>
        {hasChildren && isExpanded && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 ml-6 pl-4 border-l-2 border-primary/20 dark:border-primary/30 space-y-2 relative"
          >
            {node.children!.map((child, index) => (
              <div key={child.id} className="relative py-1">
                {/* Horizontal connection line */}
                <div className="absolute -left-4 top-1/2 w-4 h-0.5 bg-primary/20 dark:bg-primary/30" />
                <NodeCard node={child} depth={depth + 1} onNodeClick={onNodeClick} isCompleted={isCompleted} />
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface FlowchartSectionProps {
  title: string;
  nodes: RoadmapNode[];
  sectionIndex: number;
  onNodeClick?: (nodeId: string, title: string) => void;
  isCompleted: (id: string) => boolean;
}

const FlowchartSection = ({
  title,
  nodes,
  sectionIndex,
  onNodeClick,
  isCompleted
}: FlowchartSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="relative">
      {/* Svg flow path connector lines between sections */}
      {sectionIndex > 0 && (
        <div className="hidden md:flex justify-center my-3 text-primary/30">
          <svg width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 0 V30" stroke="currentColor" strokeWidth="3" strokeDasharray="4 4" className="animate-[stroke-flow_2s_linear_infinite]" />
            <path d="M15 22 L20 28 L25 22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}

      {/* Section Milestone Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, delay: sectionIndex * 0.05 }}
        className={`
          px-5 py-4 rounded-2xl border-2 border-purple-500/25 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-pink-500/5
          cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-purple-500/40 mb-4
          flex items-center justify-between shadow-sm relative overflow-hidden group
        `}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="absolute inset-0 bg-white/[0.02] dark:bg-white/[0.01] backdrop-blur-md"></div>
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-purple-500/10">
            {sectionIndex + 1}
          </div>
          <span className="font-extrabold text-sm sm:text-base text-indigo-900 dark:text-indigo-100 group-hover:text-primary transition-colors">{title}</span>
        </div>
        
        <div className="relative z-10 flex items-center gap-2 text-xs font-bold text-muted-foreground">
          <span>{nodes.length} checkpoints</span>
          {isExpanded ? 
            <ChevronDown className="w-5 h-5 text-indigo-500" /> : 
            <ChevronRight className="w-5 h-5 text-indigo-500" />
          }
        </div>
      </motion.div>

      {/* Grid of Nodes */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ml-1 md:ml-4 mb-6"
          >
            {nodes.map((node) => (
              <NodeCard key={node.id} node={node} onNodeClick={onNodeClick} isCompleted={isCompleted(node.id)} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const dsaRoadmapData = {
  title: "Interactive SDE Learning Path",
  description: "Accelerate your mastery of structural algorithms, balance indices, complex recursion models, and interview sheets.",
  sections: [
    {
      title: "Programming Language Foundation",
      nodes: [
        { id: "javascript", title: "JavaScript", completed: true },
        { id: "python", title: "Python" },
        { id: "java", title: "Java" },
        { id: "cpp", title: "C++" },
        { id: "go", title: "Go", isOptional: true },
        { id: "rust", title: "Rust", isOptional: true },
      ]
    },
    {
      title: "Basics & Structural Complexities",
      nodes: [
        { id: "time-complexity", title: "Time Complexity", completed: true },
        { id: "space-complexity", title: "Space Complexity", completed: true },
        { id: "big-o", title: "Big O Notation", completed: true },
        { id: "recursion", title: "Recursion" },
      ]
    },
    {
      title: "Data Structures Mastery",
      nodes: [
        { 
          id: "arrays", 
          title: "Arrays", 
          completed: true,
          children: [
            { id: "1d-array", title: "1D Arrays", completed: true },
            { id: "2d-array", title: "2D Arrays" },
            { id: "dynamic-array", title: "Dynamic Arrays" },
          ]
        },
        { 
          id: "linked-lists", 
          title: "Linked Lists",
          children: [
            { id: "singly-ll", title: "Singly Linked" },
            { id: "doubly-ll", title: "Doubly Linked" },
            { id: "circular-ll", title: "Circular" },
          ]
        },
        { 
          id: "stacks", 
          title: "Stacks",
          children: [
            { id: "array-stack", title: "Array Based" },
            { id: "ll-stack", title: "Linked List Based" },
          ]
        },
        { 
          id: "queues", 
          title: "Queues",
          children: [
            { id: "simple-queue", title: "Simple Queue" },
            { id: "circular-queue", title: "Circular Queue" },
            { id: "deque", title: "Deque" },
            { id: "priority-queue", title: "Priority Queue" },
          ]
        },
        { 
          id: "hash-tables", 
          title: "Hash Tables",
          children: [
            { id: "hash-map", title: "Hash Map" },
            { id: "hash-set", title: "Hash Set" },
            { id: "collision", title: "Collision Handling" },
          ]
        },
        { 
          id: "trees", 
          title: "Trees",
          children: [
            { id: "binary-tree", title: "Binary Tree" },
            { id: "bst", title: "BST" },
            { id: "avl", title: "AVL Tree" },
            { id: "red-black", title: "Red-Black Tree" },
          ]
        },
        { 
          id: "graphs", 
          title: "Graphs",
          children: [
            { id: "adj-matrix", title: "Adjacency Matrix" },
            { id: "adj-list", title: "Adjacency List" },
          ]
        },
        { 
          id: "heaps", 
          title: "Heaps",
          children: [
            { id: "min-heap", title: "Min Heap" },
            { id: "max-heap", title: "Max Heap" },
          ]
        },
      ]
    },
    {
      title: "Algorithmic Paradigms",
      nodes: [
        { 
          id: "sorting", 
          title: "Sorting",
          children: [
            { id: "bubble-sort", title: "Bubble Sort" },
            { id: "selection-sort", title: "Selection Sort" },
            { id: "insertion-sort", title: "Insertion Sort" },
            { id: "merge-sort", title: "Merge Sort" },
            { id: "quick-sort", title: "Quick Sort" },
            { id: "heap-sort", title: "Heap Sort" },
          ]
        },
        { 
          id: "searching", 
          title: "Searching",
          children: [
            { id: "linear-search", title: "Linear Search" },
            { id: "binary-search", title: "Binary Search" },
          ]
        },
        { 
          id: "graph-algos", 
          title: "Graph Algorithms",
          children: [
            { id: "bfs", title: "BFS" },
            { id: "dfs", title: "DFS" },
            { id: "dijkstra", title: "Dijkstra" },
            { id: "bellman-ford", title: "Bellman-Ford" },
            { id: "floyd-warshall", title: "Floyd-Warshall" },
            { id: "kruskal", title: "Kruskal's MST" },
            { id: "prim", title: "Prim's MST" },
          ]
        },
        { 
          id: "tree-traversal", 
          title: "Tree Traversal",
          children: [
            { id: "inorder", title: "Inorder" },
            { id: "preorder", title: "Preorder" },
            { id: "postorder", title: "Postorder" },
            { id: "level-order", title: "Level Order" },
          ]
        },
        { 
          id: "dynamic-prog", 
          title: "Dynamic Programming",
          children: [
            { id: "memoization", title: "Memoization" },
            { id: "tabulation", title: "Tabulation" },
            { id: "knapsack", title: "Knapsack" },
            { id: "lcs", title: "LCS" },
            { id: "lis", title: "LIS" },
          ]
        },
        { 
          id: "greedy", 
          title: "Greedy Algorithms",
          isAlternative: true,
          children: [
            { id: "activity-selection", title: "Activity Selection" },
            { id: "huffman", title: "Huffman Coding" },
          ]
        },
        { 
          id: "backtracking", 
          title: "Backtracking",
          isOptional: true,
          children: [
            { id: "n-queens", title: "N-Queens" },
            { id: "sudoku", title: "Sudoku Solver" },
            { id: "subset-sum", title: "Subset Sum" },
          ]
        },
        { 
          id: "divide-conquer", 
          title: "Divide & Conquer",
          children: [
            { id: "merge-sort-dc", title: "Merge Sort" },
            { id: "quick-sort-dc", title: "Quick Sort" },
            { id: "binary-search-dc", title: "Binary Search" },
          ]
        },
      ]
    },
    {
      title: "Advanced Data Structures",
      nodes: [
        { id: "segment-tree", title: "Segment Tree", isOptional: true },
        { id: "fenwick-tree", title: "Fenwick Tree", isOptional: true },
        { id: "trie", title: "Trie" },
        { id: "suffix-array", title: "Suffix Array", isOptional: true },
        { id: "disjoint-set", title: "Disjoint Set / Union Find" },
        { 
          id: "string-algos", 
          title: "String Algorithms",
          children: [
            { id: "kmp", title: "KMP" },
            { id: "rabin-karp", title: "Rabin-Karp" },
            { id: "z-algo", title: "Z Algorithm" },
          ]
        },
      ]
    },
    {
      title: "SDE Interview Readiness",
      nodes: [
        { id: "leetcode", title: "LeetCode Practice" },
        { id: "codeforces", title: "Codeforces Challenges", isAlternative: true },
        { id: "hackerrank", title: "HackerRank Practice", isAlternative: true },
        { id: "mock-interviews", title: "Mock Interviews" },
        { id: "system-design", title: "System Design", isOptional: true },
      ]
    },
  ]
};

// Count all nodes including children
const countAllNodes = (nodes: RoadmapNode[]): number => {
  return nodes.reduce((count, node) => {
    return count + 1 + (node.children ? countAllNodes(node.children) : 0);
  }, 0);
};

const totalTopics = dsaRoadmapData.sections.reduce((sum, section) => sum + countAllNodes(section.nodes), 0);

const FlowchartRoadmap = () => {
  const { isCompleted, toggleComplete, completedTopics, resetProgress } = useRoadmapProgress();
  const [selectedTopic, setSelectedTopic] = useState<{ id: string; title: string } | null>(null);
  const [filterType, setFilterType] = useState<"all" | "required" | "alternative" | "optional">("all");

  const handleNodeClick = (nodeId: string, title: string) => {
    setSelectedTopic({ id: nodeId, title });
  };

  const progressPercent = Math.round((completedTopics.size / totalTopics) * 100);

  // Circular calculations
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 pb-12 space-y-8 animate-fade-in">
      {/* Platform Control Panel / Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-card border border-border/50 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full filter blur-xl"></div>
        
        {/* Profile Info */}
        <div className="md:col-span-2 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full text-xs font-bold text-primary">
            <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
            Milestone Control Panel
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">{dsaRoadmapData.title}</h2>
          <p className="text-sm font-semibold text-muted-foreground leading-relaxed max-w-xl">{dsaRoadmapData.description}</p>
        </div>

        {/* Circular Progress widget */}
        <div className="md:col-span-1 flex items-center justify-end gap-5 bg-muted/20 dark:bg-muted/10 p-4 rounded-2xl border border-border/40">
          <div className="relative w-20 h-20">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r={radius} className="text-muted/40 dark:text-muted/10" strokeWidth="6" fill="transparent" stroke="currentColor" />
              <circle 
                cx="40" 
                cy="40" 
                r={radius} 
                className="text-primary transition-all duration-500" 
                strokeWidth="6" 
                fill="transparent" 
                stroke="currentColor"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-black text-foreground">{progressPercent}%</span>
            </div>
          </div>
          <div className="text-left space-y-1">
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Solving Mastery</div>
            <div className="text-lg font-black text-foreground">{completedTopics.size} / {totalTopics}</div>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetProgress}
              className="text-muted-foreground hover:text-destructive p-0 h-6 flex items-center gap-1 text-xs font-bold hover:bg-transparent"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Path
            </Button>
          </div>
        </div>
      </div>

      {/* Filter Toolbar & Legend */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-muted/25 dark:bg-muted/10 p-4 rounded-2xl border border-border/40">
        {/* Category Filters */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <div className="flex flex-wrap gap-1">
            {(["all", "required", "alternative", "optional"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all duration-300 ${
                  filterType === type 
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/10' 
                    : 'text-muted-foreground hover:bg-card border border-border/40'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 font-semibold text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded-lg border-2 border-blue-400 bg-card" />
            <span>Required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded-lg border-2 border-indigo-400 bg-card" />
            <span>Alternative</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded-lg border-2 border-pink-400 bg-card" />
            <span>Optional</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded-lg border-2 border-emerald-500 bg-emerald-50/20" />
            <span>Completed</span>
          </div>
        </div>
      </div>

      {/* Interconnected Milestone Sections */}
      <div className="space-y-4">
        {dsaRoadmapData.sections.map((section, idx) => {
          // Filtering logic based on active filter button
          const filteredNodes = section.nodes.filter(node => {
            if (filterType === "all") return true;
            if (filterType === "optional") return node.isOptional === true;
            if (filterType === "alternative") return node.isAlternative === true;
            if (filterType === "required") return !node.isOptional && !node.isAlternative;
            return true;
          });

          if (filteredNodes.length === 0) return null;

          return (
            <FlowchartSection
              key={section.title}
              title={section.title}
              nodes={filteredNodes}
              sectionIndex={idx}
              onNodeClick={handleNodeClick}
              isCompleted={isCompleted}
            />
          );
        })}
      </div>

      {/* Guide Card */}
      <div className="p-4 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-pink-500/5 rounded-2xl border-2 border-purple-500/10 text-center font-bold text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm">
        <HelpCircle className="w-4 h-4 text-purple-500" />
        <span>Double-click nodes with children to expand detailed trees. Double-click topics to access structural study guides.</span>
      </div>

      {/* Topic Detail Modal */}
      <TopicDetailModal
        isOpen={!!selectedTopic}
        onClose={() => setSelectedTopic(null)}
        topicId={selectedTopic?.id || null}
        topicTitle={selectedTopic?.title || ""}
        isCompleted={selectedTopic ? isCompleted(selectedTopic.id) : false}
        onToggleComplete={toggleComplete}
      />
    </div>
  );
};

export default FlowchartRoadmap;
