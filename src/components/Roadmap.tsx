import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import RoadmapCard from "./roadmap/RoadmapCard";
import RoadmapProgress from "./roadmap/RoadmapProgress";
import RoadmapDetails from "./roadmap/RoadmapDetails";

const Roadmap = () => {
  const { user, updateXP } = useAuthStore();
  const [selectedRoadmap, setSelectedRoadmap] = useState<string | null>(null);

  const roadmaps = [
    {
      id: "arrays-mastery",
      title: "Arrays Mastery",
      description: "Master array operations, two pointers, and sliding window techniques",
      duration: "3 Days",
      difficulty: "Beginner",
      xpReward: 300,
      color: "from-blue-500 to-blue-600",
      icon: "📊",
      completed: 2,
      total: 5,
    },
    {
      id: "tree-fundamentals",
      title: "Tree Fundamentals",
      description: "Learn binary trees, BST, and tree traversal algorithms",
      duration: "5 Days",
      difficulty: "Intermediate",
      xpReward: 500,
      color: "from-green-500 to-green-600",
      icon: "🌳",
      completed: 0,
      total: 7,
    },
    {
      id: "graph-algorithms",
      title: "Graph Algorithms",
      description: "Master BFS, DFS, shortest paths, and minimum spanning trees",
      duration: "7 Days",
      difficulty: "Advanced",
      xpReward: 700,
      color: "from-purple-500 to-purple-600",
      icon: "🕸️",
      completed: 0,
      total: 10,
    },
    {
      id: "dp-patterns",
      title: "Dynamic Programming Patterns",
      description: "Learn common DP patterns and solve complex optimization problems",
      duration: "10 Days",
      difficulty: "Advanced",
      xpReward: 1000,
      color: "from-red-500 to-red-600",
      icon: "💎",
      completed: 0,
      total: 12,
    },
  ];

  const roadmapDetails = {
    "arrays-mastery": {
      title: "Arrays Mastery",
      description: "Master array operations, two pointers, and sliding window techniques",
      duration: "3 Days",
      xpReward: 300,
      steps: [
        { id: 1, title: "Array Basics & Operations", completed: true, xp: 50 },
        { id: 2, title: "Two Pointers Technique", completed: true, xp: 75 },
        { id: 3, title: "Sliding Window Pattern", completed: false, xp: 75 },
        { id: 4, title: "Prefix Sum & Difference Arrays", completed: false, xp: 50 },
        { id: 5, title: "Practice Problems & Assessment", completed: false, xp: 50 },
      ]
    },
    "tree-fundamentals": {
      title: "Tree Fundamentals",
      description: "Learn binary trees, BST, and tree traversal algorithms",
      duration: "5 Days",
      xpReward: 500,
      steps: [
        { id: 1, title: "Binary Tree Basics", completed: false, xp: 60 },
        { id: 2, title: "Tree Traversal (Inorder, Preorder, Postorder)", completed: false, xp: 80 },
        { id: 3, title: "Binary Search Trees", completed: false, xp: 90 },
        { id: 4, title: "Tree Construction & Modification", completed: false, xp: 70 },
        { id: 5, title: "Advanced Tree Problems", completed: false, xp: 80 },
        { id: 6, title: "Balanced Trees (AVL, Red-Black)", completed: false, xp: 70 },
        { id: 7, title: "Practice Problems & Assessment", completed: false, xp: 50 },
      ]
    },
    "graph-algorithms": {
      title: "Graph Algorithms",
      description: "Master BFS, DFS, shortest paths, and minimum spanning trees",
      duration: "7 Days",
      xpReward: 700,
      steps: [
        { id: 1, title: "Graph Representation", completed: false, xp: 60 },
        { id: 2, title: "Depth-First Search (DFS)", completed: false, xp: 80 },
        { id: 3, title: "Breadth-First Search (BFS)", completed: false, xp: 80 },
        { id: 4, title: "Shortest Path (Dijkstra, Floyd-Warshall)", completed: false, xp: 100 },
        { id: 5, title: "Minimum Spanning Tree (Kruskal, Prim)", completed: false, xp: 90 },
        { id: 6, title: "Topological Sorting", completed: false, xp: 70 },
        { id: 7, title: "Graph Coloring & Advanced Topics", completed: false, xp: 80 },
        { id: 8, title: "Union-Find (Disjoint Set)", completed: false, xp: 70 },
        { id: 9, title: "Network Flow", completed: false, xp: 90 },
        { id: 10, title: "Practice Problems & Assessment", completed: false, xp: 80 },
      ]
    },
    "dp-patterns": {
      title: "Dynamic Programming Patterns",
      description: "Learn common DP patterns and solve complex optimization problems",
      duration: "10 Days",
      xpReward: 1000,
      steps: [
        { id: 1, title: "DP Fundamentals & Memoization", completed: false, xp: 80 },
        { id: 2, title: "1D DP (Fibonacci, House Robber)", completed: false, xp: 90 },
        { id: 3, title: "2D DP (Grid Problems)", completed: false, xp: 100 },
        { id: 4, title: "Knapsack Problems", completed: false, xp: 100 },
        { id: 5, title: "Longest Common Subsequence", completed: false, xp: 90 },
        { id: 6, title: "Palindrome DP", completed: false, xp: 80 },
        { id: 7, title: "Interval DP", completed: false, xp: 90 },
        { id: 8, title: "Tree DP", completed: false, xp: 100 },
        { id: 9, title: "State Machine DP", completed: false, xp: 90 },
        { id: 10, title: "Digit DP", completed: false, xp: 80 },
        { id: 11, title: "Bitmask DP", completed: false, xp: 100 },
        { id: 12, title: "Advanced DP & Practice", completed: false, xp: 100 },
      ]
    }
  };

  const completeStep = (roadmapId: string, stepId: number) => {
    const roadmapData = roadmapDetails[roadmapId as keyof typeof roadmapDetails];
    const step = roadmapData?.steps.find(s => s.id === stepId);
    if (step && !step.completed) {
      step.completed = true;
      updateXP(step.xp);
    }
  };

  if (selectedRoadmap) {
    const roadmapData = roadmapDetails[selectedRoadmap as keyof typeof roadmapDetails];
    const selectedRoadmapInfo = roadmaps.find(r => r.id === selectedRoadmap);
    
    if (!roadmapData || !selectedRoadmapInfo) return null;

    return (
      <RoadmapDetails
        roadmapData={roadmapData}
        selectedRoadmapInfo={selectedRoadmapInfo}
        onStepComplete={(stepId) => completeStep(selectedRoadmap, stepId)}
        onBack={() => setSelectedRoadmap(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Learning Roadmaps</h1>
        <p className="text-gray-600 text-lg">Follow structured paths to master DSA concepts efficiently</p>
      </div>

      <RoadmapProgress userLevel={user?.level || 1} />

      {/* Roadmap Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roadmaps.map((roadmap) => (
          <RoadmapCard
            key={roadmap.id}
            roadmap={roadmap}
            onSelect={setSelectedRoadmap}
          />
        ))}
      </div>
    </div>
  );
};

export default Roadmap;
