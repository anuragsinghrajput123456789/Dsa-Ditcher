/**
 * All static roadmap card and step data for the main learning roadmaps.
 */
export const roadmaps = [
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
  {
    id: "sorting-searching",
    title: "Sorting & Searching",
    description: "Master sorting algorithms and searching techniques",
    duration: "4 Days",
    difficulty: "Beginner",
    xpReward: 350,
    color: "from-cyan-500 to-blue-600",
    icon: "🔢",
    completed: 1,
    total: 6,
  },
  {
    id: "hashing-basics",
    title: "Hash Tables & Maps",
    description: "Understand hashing, hash maps, and typical DSA problems",
    duration: "3 Days",
    difficulty: "Intermediate",
    xpReward: 400,
    color: "from-yellow-500 to-yellow-600",
    icon: "🗃️",
    completed: 0,
    total: 5,
  },
  {
    id: "graphs-and-trees",
    title: "Graphs and Trees",
    description: "Deep dive into graphs, trees, traversals, pathfinding",
    duration: "6 Days",
    difficulty: "Intermediate",
    xpReward: 600,
    color: "from-pink-500 to-purple-800",
    icon: "🌲",
    completed: 0,
    total: 8,
  },
];

export const roadmapDetails = {
  "arrays-mastery": {
    title: "Arrays Mastery",
    description: "Master array operations, two pointers, and sliding window techniques",
    duration: "3 Days",
    xpReward: 300,
    steps: [
      { 
        id: 1, 
        title: "Array Basics & Operations", 
        completed: true, 
        xp: 50,
        description: "Start here! Learn array fundamentals, indexing, and basic operations like insertion, deletion, and traversal.",
        prerequisites: "None - This is your starting point!",
        topics: ["Array Declaration", "Indexing", "Basic Operations", "Memory Layout"]
      },
      { 
        id: 2, 
        title: "Two Pointers Technique", 
        completed: true, 
        xp: 75,
        description: "Learn the powerful two-pointer technique for solving array problems efficiently.",
        prerequisites: "Complete Step 1: Array Basics",
        topics: ["Left-Right Pointers", "Fast-Slow Pointers", "Opposite Direction", "Same Direction"]
      },
      { 
        id: 3, 
        title: "Sliding Window Pattern", 
        completed: false, 
        xp: 75,
        description: "Master sliding window technique for substring and subarray problems.",
        prerequisites: "Complete Step 2: Two Pointers",
        topics: ["Fixed Window", "Variable Window", "Maximum/Minimum Problems", "Substring Patterns"]
      },
      { 
        id: 4, 
        title: "Prefix Sum & Difference Arrays", 
        completed: false, 
        xp: 50,
        description: "Learn advanced array techniques for range queries and updates.",
        prerequisites: "Complete Step 3: Sliding Window",
        topics: ["Prefix Sums", "Difference Arrays", "Range Queries", "Subarray Sums"]
      },
      { 
        id: 5, 
        title: "Practice Problems & Assessment", 
        completed: false, 
        xp: 50,
        description: "Apply all learned concepts to solve real interview problems.",
        prerequisites: "Complete all previous steps",
        topics: ["LeetCode Problems", "Interview Questions", "Time Complexity Analysis", "Space Optimization"]
      },
    ]
  },
  "tree-fundamentals": {
    title: "Tree Fundamentals",
    description: "Learn binary trees, BST, and tree traversal algorithms",
    duration: "5 Days",
    xpReward: 500,
    steps: [
      { 
        id: 1, 
        title: "Binary Tree Basics", 
        completed: false, 
        xp: 60,
        description: "Start with tree terminology, structure, and basic properties.",
        prerequisites: "Basic understanding of recursion recommended",
        topics: ["Tree Terminology", "Binary Tree Properties", "Tree Representation", "Basic Operations"]
      },
      { 
        id: 2, 
        title: "Tree Traversal (Inorder, Preorder, Postorder)", 
        completed: false, 
        xp: 80,
        description: "Master the three fundamental ways to traverse binary trees.",
        prerequisites: "Complete Step 1: Binary Tree Basics",
        topics: ["Inorder Traversal", "Preorder Traversal", "Postorder Traversal", "Iterative vs Recursive"]
      },
      { 
        id: 3, 
        title: "Binary Search Trees", 
        completed: false, 
        xp: 90,
        description: "Learn BST properties and operations for efficient searching.",
        prerequisites: "Complete Step 2: Tree Traversals",
        topics: ["BST Properties", "Search Operation", "Insert Operation", "Delete Operation"]
      },
      { 
        id: 4, 
        title: "Tree Construction & Modification", 
        completed: false, 
        xp: 70,
        description: "Build trees from different representations and modify existing trees.",
        prerequisites: "Complete Step 3: Binary Search Trees",
        topics: ["Build from Arrays", "Build from Traversals", "Tree Modification", "Path Problems"]
      },
      { 
        id: 5, 
        title: "Advanced Tree Problems", 
        completed: false, 
        xp: 80,
        description: "Solve complex tree problems involving multiple concepts.",
        prerequisites: "Complete Step 4: Tree Construction",
        topics: ["Lowest Common Ancestor", "Tree Diameter", "Path Sum Problems", "Tree Validation"]
      },
      { 
        id: 6, 
        title: "Balanced Trees (AVL, Red-Black)", 
        completed: false, 
        xp: 70,
        description: "Understand self-balancing trees for optimal performance.",
        prerequisites: "Complete Step 5: Advanced Problems",
        topics: ["AVL Trees", "Red-Black Trees", "Rotation Operations", "Balance Factors"]
      },
      { 
        id: 7, 
        title: "Practice Problems & Assessment", 
        completed: false, 
        xp: 50,
        description: "Apply tree concepts to solve interview-level problems.",
        prerequisites: "Complete all previous steps",
        topics: ["Interview Problems", "Complexity Analysis", "Edge Cases", "Optimization Techniques"]
      },
    ]
  },
  "graph-algorithms": {
    title: "Graph Algorithms",
    description: "Master BFS, DFS, shortest paths, and minimum spanning trees",
    duration: "7 Days",
    xpReward: 700,
    steps: [
      { id: 1, title: "Graph Representation", completed: false, xp: 60, description: "Learn different ways to represent graphs in code.", prerequisites: "Basic data structures knowledge", topics: ["Adjacency Matrix", "Adjacency List", "Edge List", "Graph Types"] },
      { id: 2, title: "Depth-First Search (DFS)", completed: false, xp: 80, description: "Master DFS traversal and its applications.", prerequisites: "Complete Step 1: Graph Representation", topics: ["DFS Algorithm", "Recursive vs Iterative", "Connected Components", "Cycle Detection"] },
      { id: 3, title: "Breadth-First Search (BFS)", completed: false, xp: 80, description: "Learn BFS traversal and shortest path in unweighted graphs.", prerequisites: "Complete Step 2: DFS", topics: ["BFS Algorithm", "Level Order Traversal", "Shortest Path", "Bipartite Check"] },
      { id: 4, title: "Shortest Path (Dijkstra, Floyd-Warshall)", completed: false, xp: 100, description: "Solve shortest path problems in weighted graphs.", prerequisites: "Complete Step 3: BFS", topics: ["Dijkstra's Algorithm", "Floyd-Warshall", "Bellman-Ford", "Path Reconstruction"] },
      { id: 5, title: "Minimum Spanning Tree (Kruskal, Prim)", completed: false, xp: 90, description: "Find minimum cost to connect all vertices.", prerequisites: "Complete Step 4: Shortest Path", topics: ["Kruskal's Algorithm", "Prim's Algorithm", "Union-Find", "MST Properties"] },
      { id: 6, title: "Topological Sorting", completed: false, xp: 70, description: "Order vertices in directed acyclic graphs.", prerequisites: "Complete Step 5: MST", topics: ["Kahn's Algorithm", "DFS-based Approach", "Cycle Detection", "Applications"] },
      { id: 7, title: "Graph Coloring & Advanced Topics", completed: false, xp: 80, description: "Explore advanced graph algorithms.", prerequisites: "Complete Step 6: Topological Sort", topics: ["Graph Coloring", "Bipartite Matching", "Network Flow Basics", "Strongly Connected Components"] },
      { id: 8, title: "Union-Find (Disjoint Set)", completed: false, xp: 70, description: "Master the union-find data structure.", prerequisites: "Complete Step 7: Advanced Topics", topics: ["Union-Find Operations", "Path Compression", "Union by Rank", "Applications"] },
      { id: 9, title: "Network Flow", completed: false, xp: 90, description: "Solve maximum flow problems.", prerequisites: "Complete Step 8: Union-Find", topics: ["Ford-Fulkerson", "Max Flow Min Cut", "Bipartite Matching", "Applications"] },
      { id: 10, title: "Practice Problems & Assessment", completed: false, xp: 80, description: "Apply graph algorithms to complex problems.", prerequisites: "Complete all previous steps", topics: ["Interview Problems", "Competition Problems", "Optimization", "Real-world Applications"] },
    ]
  },
  "dp-patterns": {
    title: "Dynamic Programming Patterns",
    description: "Learn common DP patterns and solve complex optimization problems",
    duration: "10 Days",
    xpReward: 1000,
    steps: [
      { id: 1, title: "DP Fundamentals & Memoization", completed: false, xp: 80, description: "Start with DP basics and memoization.", prerequisites: "Strong recursion understanding required", topics: ["DP Principles", "Memoization", "Top-down vs Bottom-up", "Overlapping Subproblems"] },
      { id: 2, title: "1D DP (Fibonacci, House Robber)", completed: false, xp: 90, description: "Master linear DP problems.", prerequisites: "Complete Step 1: DP Fundamentals", topics: ["Fibonacci Sequence", "House Robber", "Climbing Stairs", "Linear DP Pattern"] },
      { id: 3, title: "2D DP (Grid Problems)", completed: false, xp: 100, description: "Solve grid-based DP problems.", prerequisites: "Complete Step 2: 1D DP", topics: ["Unique Paths", "Minimum Path Sum", "Grid Traversal", "2D State Transition"] },
      { id: 4, title: "Knapsack Problems", completed: false, xp: 100, description: "Master the classic knapsack patterns.", prerequisites: "Complete Step 3: 2D DP", topics: ["0/1 Knapsack", "Unbounded Knapsack", "Subset Sum", "Partition Problems"] },
      { id: 5, title: "Longest Common Subsequence", completed: false, xp: 90, description: "Learn string DP with LCS pattern.", prerequisites: "Complete Step 4: Knapsack", topics: ["LCS Algorithm", "Edit Distance", "String Matching", "Sequence Alignment"] },
      { id: 6, title: "Palindrome DP", completed: false, xp: 80, description: "Solve palindrome-related DP problems.", prerequisites: "Complete Step 5: LCS", topics: ["Palindromic Subsequence", "Palindromic Substring", "Palindrome Partitioning", "String Palindromes"] },
      { id: 7, title: "Interval DP", completed: false, xp: 90, description: "Master interval-based DP problems.", prerequisites: "Complete Step 6: Palindrome DP", topics: ["Matrix Chain Multiplication", "Burst Balloons", "Interval Scheduling", "Range DP"] },
      { id: 8, title: "Tree DP", completed: false, xp: 100, description: "Apply DP on tree structures.", prerequisites: "Complete Step 7: Interval DP", topics: ["Tree Diameter", "Binary Tree DP", "Subtree Problems", "Root-to-Leaf Paths"] },
      { id: 9, title: "State Machine DP", completed: false, xp: 90, description: "Model complex states with DP.", prerequisites: "Complete Step 8: Tree DP", topics: ["Stock Problems", "State Transitions", "Multiple States", "Finite State Machines"] },
      { id: 10, title: "Digit DP", completed: false, xp: 80, description: "Solve digit-based DP problems.", prerequisites: "Complete Step 9: State Machine DP", topics: ["Digit Counting", "Number Formation", "Tight Bounds", "Digit Constraints"] },
      { id: 11, title: "Bitmask DP", completed: false, xp: 100, description: "Use bitmasks for DP state representation.", prerequisites: "Complete Step 10: Digit DP", topics: ["Traveling Salesman", "Subset DP", "Bitwise Operations", "State Compression"] },
      { id: 12, title: "Advanced DP & Practice", completed: false, xp: 100, description: "Master advanced DP techniques.", prerequisites: "Complete all previous steps", topics: ["DP Optimization", "Space Optimization", "Hard Problems", "Competition DP"] },
    ]
  },
  "sorting-searching": {
    title: "Sorting & Searching",
    description: "Master sorting algorithms and searching techniques",
    duration: "4 Days",
    xpReward: 350,
    steps: [
      { id: 1, title: "Basic Sorting Algorithms", completed: false, xp: 60, description: "Start with fundamental sorting techniques.", prerequisites: "Array basics recommended", topics: ["Bubble Sort", "Selection Sort", "Insertion Sort", "Time Complexity"] },
      { id: 2, title: "Advanced Sorting Algorithms", completed: false, xp: 80, description: "Learn efficient sorting algorithms.", prerequisites: "Complete Step 1: Basic Sorting", topics: ["Merge Sort", "Quick Sort", "Heap Sort", "Divide and Conquer"] },
      { id: 3, title: "Binary Search & Variants", completed: false, xp: 70, description: "Master binary search and its applications.", prerequisites: "Complete Step 2: Advanced Sorting", topics: ["Binary Search", "Search in Rotated Array", "Peak Element", "Search Range"] },
      { id: 4, title: "Specialized Sorting", completed: false, xp: 60, description: "Learn non-comparison based sorts.", prerequisites: "Complete Step 3: Binary Search", topics: ["Counting Sort", "Radix Sort", "Bucket Sort", "Stable Sorting"] },
      { id: 5, title: "Advanced Search Techniques", completed: false, xp: 80, description: "Explore advanced searching methods.", prerequisites: "Complete Step 4: Specialized Sorting", topics: ["Ternary Search", "Exponential Search", "Interpolation Search", "Pattern Searching"] },
      { id: 6, title: "Practice Problems & Assessment", completed: false, xp: 50, description: "Apply sorting and searching concepts.", prerequisites: "Complete all previous steps", topics: ["Interview Questions", "Optimization Problems", "Hybrid Approaches", "Real-world Applications"] },
    ]
  },
  "hashing-basics": {
    title: "Hash Tables & Maps",
    description: "Understand hashing, hash maps, and typical DSA problems",
    duration: "3 Days",
    xpReward: 400,
    steps: [
      { id: 1, title: "Hashing Fundamentals", completed: false, xp: 80, description: "Learn hash function concepts and collision handling.", prerequisites: "Basic data structures knowledge", topics: ["Hash Functions", "Collision Resolution", "Load Factor", "Hash Table Structure"] },
      { id: 2, title: "Hash Map Operations & Problems", completed: false, xp: 90, description: "Master hash map operations and common patterns.", prerequisites: "Complete Step 1: Hashing Fundamentals", topics: ["Insert/Delete/Search", "Two Sum Pattern", "Frequency Counting", "Subarray Problems"] },
      { id: 3, title: "Advanced Hashing Techniques", completed: false, xp: 80, description: "Explore advanced hashing concepts.", prerequisites: "Complete Step 2: Hash Map Operations", topics: ["Consistent Hashing", "Bloom Filters", "Hash Map Design", "Performance Analysis"] },
      { id: 4, title: "Hash Set Applications", completed: false, xp: 70, description: "Use hash sets for unique element problems.", prerequisites: "Complete Step 3: Advanced Hashing", topics: ["Duplicate Detection", "Set Operations", "Union-Intersection", "Membership Testing"] },
      { id: 5, title: "Practice Problems & Assessment", completed: false, xp: 80, description: "Solve hash table interview problems.", prerequisites: "Complete all previous steps", topics: ["Anagram Problems", "Substring Problems", "Grouping Problems", "Optimization Techniques"] },
    ]
  },
  "graphs-and-trees": {
    title: "Graphs and Trees",
    description: "Deep dive into graphs, trees, traversals, pathfinding",
    duration: "6 Days",
    xpReward: 600,
    steps: [
      { id: 1, title: "Graph and Tree Basics", completed: false, xp: 70, description: "Understand the fundamentals of graphs and trees.", prerequisites: "Basic data structures knowledge", topics: ["Graph vs Tree", "Terminology", "Types of Graphs", "Tree Properties"] },
      { id: 2, title: "Tree Traversals Deep Dive", completed: false, xp: 80, description: "Master all tree traversal techniques.", prerequisites: "Complete Step 1: Graph and Tree Basics", topics: ["DFS Traversals", "BFS Traversal", "Morris Traversal", "Threaded Trees"] },
      { id: 3, title: "Graph Traversals & Connectivity", completed: false, xp: 90, description: "Learn graph traversal algorithms.", prerequisites: "Complete Step 2: Tree Traversals", topics: ["Graph DFS", "Graph BFS", "Connected Components", "Strongly Connected Components"] },
      { id: 4, title: "Pathfinding Algorithms", completed: false, xp: 100, description: "Find paths between nodes efficiently.", prerequisites: "Complete Step 3: Graph Traversals", topics: ["Shortest Path", "All Pairs Shortest Path", "Path Reconstruction", "Pathfinding Heuristics"] },
      { id: 5, title: "Tree and Graph Algorithms", completed: false, xp: 90, description: "Advanced algorithms on trees and graphs.", prerequisites: "Complete Step 4: Pathfinding", topics: ["Tree Diameter", "Graph Cycles", "Bipartite Graphs", "Tree/Graph Isomorphism"] },
      { id: 6, title: "Specialized Tree Structures", completed: false, xp: 80, description: "Learn specialized tree data structures.", prerequisites: "Complete Step 5: Advanced Algorithms", topics: ["Trie", "Segment Tree", "Fenwick Tree", "Suffix Tree"] },
      { id: 7, title: "Graph Theory Applications", completed: false, xp: 90, description: "Apply graph theory to real problems.", prerequisites: "Complete Step 6: Specialized Trees", topics: ["Network Flow", "Matching Problems", "Coloring", "Planarity"] },
      { id: 8, title: "Practice Problems & Assessment", completed: false, xp: 100, description: "Solve complex graph and tree problems.", prerequisites: "Complete all previous steps", topics: ["Interview Problems", "Competitive Programming", "Optimization", "Algorithm Design"] },
    ]
  }
};
