import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Circle, ChevronDown, ChevronRight, ExternalLink } from "lucide-react";

interface RoadmapNode {
  id: string;
  title: string;
  completed?: boolean;
  children?: RoadmapNode[];
  isOptional?: boolean;
  isAlternative?: boolean;
  link?: string;
}

interface FlowchartRoadmapProps {
  title: string;
  description: string;
  nodes: RoadmapNode[];
  onNodeClick?: (nodeId: string) => void;
}

const NodeCard = ({ 
  node, 
  depth = 0, 
  onNodeClick 
}: { 
  node: RoadmapNode; 
  depth?: number; 
  onNodeClick?: (nodeId: string) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(depth < 2);
  const hasChildren = node.children && node.children.length > 0;

  const getBorderColor = () => {
    if (node.isOptional) return "border-pink-300 dark:border-pink-600";
    if (node.isAlternative) return "border-indigo-300 dark:border-indigo-600";
    if (node.completed) return "border-green-400 dark:border-green-500";
    return "border-blue-300 dark:border-blue-500";
  };

  const getBgColor = () => {
    if (node.isOptional) return "bg-pink-50 dark:bg-pink-900/20";
    if (node.isAlternative) return "bg-indigo-50 dark:bg-indigo-900/20";
    if (node.completed) return "bg-green-50 dark:bg-green-900/20";
    return "bg-blue-50 dark:bg-blue-900/20";
  };

  const getTextColor = () => {
    if (node.isOptional) return "text-pink-700 dark:text-pink-200";
    if (node.isAlternative) return "text-indigo-700 dark:text-indigo-200";
    if (node.completed) return "text-green-700 dark:text-green-200";
    return "text-blue-700 dark:text-blue-200";
  };

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: depth * 0.05 }}
        className={`
          relative px-4 py-2 rounded-lg border-2 ${getBorderColor()} ${getBgColor()}
          cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105
          min-w-[120px] text-center
        `}
        onClick={() => {
          if (hasChildren) {
            setIsExpanded(!isExpanded);
          }
          onNodeClick?.(node.id);
        }}
      >
        <div className="flex items-center justify-center gap-2">
        {node.completed ? (
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
          ) : (
            <Circle className="w-4 h-4 text-blue-400 flex-shrink-0" />
          )}
          <span className={`text-sm font-medium ${getTextColor()}`}>
            {node.title}
          </span>
          {hasChildren && (
            isExpanded ? 
              <ChevronDown className="w-4 h-4 text-muted-foreground" /> : 
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
          )}
          {node.link && (
            <ExternalLink className="w-3 h-3 text-muted-foreground" />
          )}
        </div>
      </motion.div>

      {/* Children nodes */}
      {hasChildren && isExpanded && (
        <div className="mt-4 ml-6 pl-4 border-l-2 border-blue-200 dark:border-blue-700 space-y-3">
          {node.children!.map((child, index) => (
            <div key={child.id} className="relative">
              {/* Connector line */}
              <div className="absolute -left-4 top-1/2 w-4 h-0.5 bg-blue-200 dark:bg-blue-700" />
              <NodeCard node={child} depth={depth + 1} onNodeClick={onNodeClick} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const FlowchartSection = ({
  title,
  nodes,
  color = "amber",
  onNodeClick
}: {
  title: string;
  nodes: RoadmapNode[];
  color?: string;
  onNodeClick?: (nodeId: string) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="relative">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`
          px-6 py-3 rounded-xl border-2 border-purple-300 dark:border-purple-600 
          bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30
          cursor-pointer transition-all duration-200 hover:shadow-lg mb-4
          flex items-center justify-between
        `}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
          <span className="font-bold text-purple-800 dark:text-purple-100">{title}</span>
        </div>
        {isExpanded ? 
          <ChevronDown className="w-5 h-5 text-purple-600 dark:text-purple-300" /> : 
          <ChevronRight className="w-5 h-5 text-purple-600 dark:text-purple-300" />
        }
      </motion.div>

      {/* Nodes Grid */}
      {isExpanded && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 ml-4 mb-6">
          {nodes.map((node) => (
            <NodeCard key={node.id} node={node} onNodeClick={onNodeClick} />
          ))}
        </div>
      )}
    </div>
  );
};

// Sample DSA roadmap data matching the reference image style
const dsaRoadmapData = {
  title: "DSA Learning Path",
  description: "Step by step guide to becoming a DSA expert",
  sections: [
    {
      title: "Pick a Programming Language",
      nodes: [
        { id: "javascript", title: "JavaScript", completed: true },
        { id: "python", title: "Python" },
        { id: "java", title: "Java" },
        { id: "cpp", title: "C++" },
        { id: "go", title: "Go" },
        { id: "rust", title: "Rust" },
      ]
    },
    {
      title: "Learn the Basics",
      nodes: [
        { id: "time-complexity", title: "Time Complexity", completed: true },
        { id: "space-complexity", title: "Space Complexity", completed: true },
        { id: "big-o", title: "Big O Notation", completed: true },
        { id: "recursion", title: "Recursion" },
      ]
    },
    {
      title: "Data Structures",
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
      title: "Algorithms",
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
      title: "Advanced Topics",
      nodes: [
        { 
          id: "segment-tree", 
          title: "Segment Tree",
          isOptional: true,
        },
        { 
          id: "fenwick-tree", 
          title: "Fenwick Tree",
          isOptional: true,
        },
        { 
          id: "trie", 
          title: "Trie",
        },
        { 
          id: "suffix-array", 
          title: "Suffix Array",
          isOptional: true,
        },
        { 
          id: "disjoint-set", 
          title: "Disjoint Set / Union Find",
        },
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
      title: "Practice & Interview Prep",
      nodes: [
        { id: "leetcode", title: "LeetCode" },
        { id: "codeforces", title: "Codeforces", isAlternative: true },
        { id: "hackerrank", title: "HackerRank", isAlternative: true },
        { id: "mock-interviews", title: "Mock Interviews" },
        { id: "system-design", title: "System Design", isOptional: true },
      ]
    },
  ]
};

const FlowchartRoadmap = () => {
  const handleNodeClick = (nodeId: string) => {
    console.log("Node clicked:", nodeId);
    // Could navigate to topic details or mark as complete
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full text-purple-700 dark:text-purple-200 text-sm mb-4">
          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
          Interactive Learning Path
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          {dsaRoadmapData.title}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {dsaRoadmapData.description}
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-8 p-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 border-blue-300 bg-blue-50 dark:bg-blue-900/20" />
          <span className="text-sm text-muted-foreground">Required</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 border-indigo-300 bg-indigo-50 dark:bg-indigo-900/20" />
          <span className="text-sm text-muted-foreground">Alternative</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 border-pink-300 bg-pink-50 dark:bg-pink-900/20" />
          <span className="text-sm text-muted-foreground">Optional</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border-2 border-green-400 bg-green-50 dark:bg-green-900/20" />
          <span className="text-sm text-muted-foreground">Completed</span>
        </div>
      </div>

      {/* Roadmap Sections */}
      <div className="space-y-6">
        {dsaRoadmapData.sections.map((section) => (
          <FlowchartSection
            key={section.title}
            title={section.title}
            nodes={section.nodes}
            onNodeClick={handleNodeClick}
          />
        ))}
      </div>

      {/* Footer tip */}
      <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
        <p className="text-sm text-purple-700 dark:text-purple-200 text-center">
          💡 <strong>Tip:</strong> Click on any topic to expand and see subtopics. Pink items are optional but recommended for deeper understanding.
        </p>
      </div>
    </div>
  );
};

export default FlowchartRoadmap;
