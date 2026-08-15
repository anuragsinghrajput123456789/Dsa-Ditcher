export interface TopicResource {
  title: string;
  type: "article" | "video" | "practice" | "documentation";
  url: string;
  difficulty?: "easy" | "medium" | "hard";
}

export interface TopicData {
  id: string;
  title: string;
  description: string;
  youtubeVideo?: {
    title: string;
    url: string;
    channel: string;
  };
  resources: TopicResource[];
  practiceProblems: {
    title: string;
    platform: string;
    url: string;
    difficulty: "easy" | "medium" | "hard";
  }[];
}

export const topicDataMap: Record<string, TopicData> = {
  // Programming Languages
  "javascript": {
    id: "javascript",
    title: "JavaScript",
    description: "JavaScript is a versatile programming language essential for web development. It's great for DSA practice due to its flexibility and extensive built-in methods.",
    youtubeVideo: {
      title: "JavaScript Full Course - Beginner to Pro",
      url: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
      channel: "freeCodeCamp"
    },
    resources: [
      { title: "JavaScript.info - Modern Tutorial", type: "documentation", url: "https://javascript.info/" },
      { title: "MDN JavaScript Guide", type: "documentation", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide" },
    ],
    practiceProblems: []
  },
  "python": {
    id: "python",
    title: "Python",
    description: "Python is known for its clean syntax and readability, making it an excellent choice for learning DSA concepts quickly.",
    youtubeVideo: {
      title: "Python Full Course for Beginners",
      url: "https://www.youtube.com/watch?v=XKHEtdqhLK8",
      channel: "Bro Code"
    },
    resources: [
      { title: "Python Official Tutorial", type: "documentation", url: "https://docs.python.org/3/tutorial/" },
      { title: "Real Python Tutorials", type: "article", url: "https://realpython.com/" },
    ],
    practiceProblems: []
  },
  "java": {
    id: "java",
    title: "Java",
    description: "Java is widely used in enterprise applications and competitive programming. Its strong type system helps catch errors early.",
    youtubeVideo: {
      title: "Java Full Course for Beginners",
      url: "https://www.youtube.com/watch?v=eIrMbAQSU34",
      channel: "Programming with Mosh"
    },
    resources: [
      { title: "Java Documentation", type: "documentation", url: "https://docs.oracle.com/javase/tutorial/" },
      { title: "Java W3Schools", type: "article", url: "https://www.w3schools.com/java/" },
    ],
    practiceProblems: []
  },
  "cpp": {
    id: "cpp",
    title: "C++",
    description: "C++ offers low-level memory control and is the preferred language for competitive programming due to its speed and STL library.",
    youtubeVideo: {
      title: "C++ Full Course for Beginners",
      url: "https://www.youtube.com/watch?v=vLnPwxZdW4Y",
      channel: "freeCodeCamp"
    },
    resources: [
      { title: "C++ Reference", type: "documentation", url: "https://en.cppreference.com/" },
      { title: "Learn C++", type: "article", url: "https://www.learncpp.com/" },
    ],
    practiceProblems: []
  },
  "go": {
    id: "go",
    title: "Go",
    description: "Go is a modern language known for its simplicity, efficiency, and excellent support for concurrent programming.",
    youtubeVideo: {
      title: "Go Programming – Golang Full Course",
      url: "https://www.youtube.com/watch?v=un6ZyFkqFKo",
      channel: "freeCodeCamp"
    },
    resources: [
      { title: "Go Tour", type: "documentation", url: "https://go.dev/tour/" },
      { title: "Go by Example", type: "article", url: "https://gobyexample.com/" },
    ],
    practiceProblems: []
  },
  "rust": {
    id: "rust",
    title: "Rust",
    description: "Rust provides memory safety without garbage collection, making it ideal for high-performance system programming.",
    youtubeVideo: {
      title: "Rust Programming Full Course",
      url: "https://www.youtube.com/watch?v=BpPEoZW5IiY",
      channel: "freeCodeCamp"
    },
    resources: [
      { title: "The Rust Book", type: "documentation", url: "https://doc.rust-lang.org/book/" },
      { title: "Rust by Example", type: "article", url: "https://doc.rust-lang.org/rust-by-example/" },
    ],
    practiceProblems: []
  },

  // Basics
  "time-complexity": {
    id: "time-complexity",
    title: "Time Complexity",
    description: "Time complexity measures how the running time of an algorithm grows as the input size increases. Understanding this is crucial for writing efficient code.",
    youtubeVideo: {
      title: "Time Complexity Analysis - Complete Tutorial",
      url: "https://www.youtube.com/watch?v=FPu9Uld7W-E",
      channel: "Abdul Bari"
    },
    resources: [
      { title: "Time Complexity - GeeksforGeeks", type: "article", url: "https://www.geeksforgeeks.org/understanding-time-complexity-simple-examples/" },
      { title: "Big-O Cheat Sheet", type: "documentation", url: "https://www.bigocheatsheet.com/" },
    ],
    practiceProblems: [
      { title: "Time Complexity Analysis Quiz", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/practice-questions-time-complexity-analysis/", difficulty: "easy" },
    ]
  },
  "space-complexity": {
    id: "space-complexity",
    title: "Space Complexity",
    description: "Space complexity measures the amount of memory an algorithm uses relative to the input size. It includes both auxiliary space and input space.",
    youtubeVideo: {
      title: "Space Complexity Analysis",
      url: "https://www.youtube.com/watch?v=yOb0BL-84h8",
      channel: "Abdul Bari"
    },
    resources: [
      { title: "Space Complexity - GeeksforGeeks", type: "article", url: "https://www.geeksforgeeks.org/g-fact-86/" },
    ],
    practiceProblems: []
  },
  "big-o": {
    id: "big-o",
    title: "Big O Notation",
    description: "Big O notation describes the upper bound of an algorithm's complexity, helping compare algorithm efficiency in the worst case.",
    youtubeVideo: {
      title: "Big O Notation - Full Course",
      url: "https://www.youtube.com/watch?v=Mo4vesaut8g",
      channel: "freeCodeCamp"
    },
    resources: [
      { title: "Big O Notation Explained", type: "article", url: "https://www.freecodecamp.org/news/big-o-notation-why-it-matters-and-why-it-doesnt-1674cfa8a23c/" },
      { title: "Big-O Cheat Sheet", type: "documentation", url: "https://www.bigocheatsheet.com/" },
    ],
    practiceProblems: []
  },
  "recursion": {
    id: "recursion",
    title: "Recursion",
    description: "Recursion is a technique where a function calls itself to solve smaller instances of the same problem. Master the base case and recursive case concepts.",
    youtubeVideo: {
      title: "Recursion in One Shot",
      url: "https://www.youtube.com/watch?v=yVdKa8dnKiE",
      channel: "Striver"
    },
    resources: [
      { title: "Recursion - GeeksforGeeks", type: "article", url: "https://www.geeksforgeeks.org/recursion/" },
      { title: "Thinking Recursively", type: "video", url: "https://www.youtube.com/watch?v=oKndim5-G94" },
    ],
    practiceProblems: [
      { title: "Fibonacci Number", platform: "LeetCode", url: "https://leetcode.com/problems/fibonacci-number/", difficulty: "easy" },
      { title: "Power of Two", platform: "LeetCode", url: "https://leetcode.com/problems/power-of-two/", difficulty: "easy" },
      { title: "Pow(x, n)", platform: "LeetCode", url: "https://leetcode.com/problems/powx-n/", difficulty: "medium" },
    ]
  },

  // Arrays
  "arrays": {
    id: "arrays",
    title: "Arrays",
    description: "Arrays are fundamental data structures that store elements in contiguous memory locations. They provide O(1) access time and are the building blocks for many other data structures.",
    youtubeVideo: {
      title: "Arrays Complete Course - All Array Problems",
      url: "https://www.youtube.com/watch?v=37E9ckMDdTk",
      channel: "Striver"
    },
    resources: [
      { title: "Arrays - GeeksforGeeks", type: "article", url: "https://www.geeksforgeeks.org/array-data-structure/" },
      { title: "Array Methods in JavaScript", type: "documentation", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array" },
    ],
    practiceProblems: [
      { title: "Two Sum", platform: "LeetCode", url: "https://leetcode.com/problems/two-sum/", difficulty: "easy" },
      { title: "Best Time to Buy and Sell Stock", platform: "LeetCode", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", difficulty: "easy" },
      { title: "Contains Duplicate", platform: "LeetCode", url: "https://leetcode.com/problems/contains-duplicate/", difficulty: "easy" },
      { title: "Maximum Subarray", platform: "LeetCode", url: "https://leetcode.com/problems/maximum-subarray/", difficulty: "medium" },
      { title: "Product of Array Except Self", platform: "LeetCode", url: "https://leetcode.com/problems/product-of-array-except-self/", difficulty: "medium" },
    ]
  },
  "1d-array": {
    id: "1d-array",
    title: "1D Arrays",
    description: "One-dimensional arrays are the simplest form of arrays, storing elements in a single row. Master traversal, insertion, deletion, and common patterns.",
    youtubeVideo: {
      title: "1D Array Problems - Complete Guide",
      url: "https://www.youtube.com/watch?v=37E9ckMDdTk",
      channel: "Striver"
    },
    resources: [
      { title: "1D Array Basics", type: "article", url: "https://www.geeksforgeeks.org/array-data-structure/" },
    ],
    practiceProblems: [
      { title: "Move Zeroes", platform: "LeetCode", url: "https://leetcode.com/problems/move-zeroes/", difficulty: "easy" },
      { title: "Rotate Array", platform: "LeetCode", url: "https://leetcode.com/problems/rotate-array/", difficulty: "medium" },
    ]
  },
  "2d-array": {
    id: "2d-array",
    title: "2D Arrays",
    description: "Two-dimensional arrays (matrices) are used for grid-based problems, image processing, and dynamic programming. Learn row-major and column-major traversals.",
    youtubeVideo: {
      title: "2D Arrays & Matrix Problems",
      url: "https://www.youtube.com/watch?v=T_NyFJiVlEQ",
      channel: "take U forward"
    },
    resources: [
      { title: "Matrix/2D Array", type: "article", url: "https://www.geeksforgeeks.org/multidimensional-arrays-in-java/" },
    ],
    practiceProblems: [
      { title: "Rotate Image", platform: "LeetCode", url: "https://leetcode.com/problems/rotate-image/", difficulty: "medium" },
      { title: "Spiral Matrix", platform: "LeetCode", url: "https://leetcode.com/problems/spiral-matrix/", difficulty: "medium" },
      { title: "Set Matrix Zeroes", platform: "LeetCode", url: "https://leetcode.com/problems/set-matrix-zeroes/", difficulty: "medium" },
    ]
  },

  // Linked Lists
  "linked-lists": {
    id: "linked-lists",
    title: "Linked Lists",
    description: "Linked lists are linear data structures where elements are stored in nodes connected via pointers. They provide efficient insertion and deletion operations.",
    youtubeVideo: {
      title: "Linked List Complete Course",
      url: "https://www.youtube.com/watch?v=Nq7ok-OyEpg",
      channel: "Striver"
    },
    resources: [
      { title: "Linked List - GeeksforGeeks", type: "article", url: "https://www.geeksforgeeks.org/linked-list-set-1-introduction/" },
      { title: "Linked Lists Visualized", type: "video", url: "https://www.youtube.com/watch?v=njTh_OwMljA" },
    ],
    practiceProblems: [
      { title: "Reverse Linked List", platform: "LeetCode", url: "https://leetcode.com/problems/reverse-linked-list/", difficulty: "easy" },
      { title: "Merge Two Sorted Lists", platform: "LeetCode", url: "https://leetcode.com/problems/merge-two-sorted-lists/", difficulty: "easy" },
      { title: "Linked List Cycle", platform: "LeetCode", url: "https://leetcode.com/problems/linked-list-cycle/", difficulty: "easy" },
      { title: "Remove Nth Node From End", platform: "LeetCode", url: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/", difficulty: "medium" },
    ]
  },

  // Stacks & Queues
  "stacks": {
    id: "stacks",
    title: "Stacks",
    description: "Stacks follow LIFO (Last In First Out) principle. Common operations include push, pop, and peek with O(1) time complexity.",
    youtubeVideo: {
      title: "Stack Data Structure - Complete Tutorial",
      url: "https://www.youtube.com/watch?v=bxRVz8zklWM",
      channel: "Striver"
    },
    resources: [
      { title: "Stack Data Structure", type: "article", url: "https://www.geeksforgeeks.org/stack-data-structure/" },
    ],
    practiceProblems: [
      { title: "Valid Parentheses", platform: "LeetCode", url: "https://leetcode.com/problems/valid-parentheses/", difficulty: "easy" },
      { title: "Min Stack", platform: "LeetCode", url: "https://leetcode.com/problems/min-stack/", difficulty: "medium" },
      { title: "Daily Temperatures", platform: "LeetCode", url: "https://leetcode.com/problems/daily-temperatures/", difficulty: "medium" },
      { title: "Largest Rectangle in Histogram", platform: "LeetCode", url: "https://leetcode.com/problems/largest-rectangle-in-histogram/", difficulty: "hard" },
    ]
  },
  "queues": {
    id: "queues",
    title: "Queues",
    description: "Queues follow FIFO (First In First Out) principle. Used in BFS, scheduling, and buffering operations.",
    youtubeVideo: {
      title: "Queue Data Structure - Complete Tutorial",
      url: "https://www.youtube.com/watch?v=M6GnoUDpqEE",
      channel: "Striver"
    },
    resources: [
      { title: "Queue Data Structure", type: "article", url: "https://www.geeksforgeeks.org/queue-data-structure/" },
    ],
    practiceProblems: [
      { title: "Implement Queue using Stacks", platform: "LeetCode", url: "https://leetcode.com/problems/implement-queue-using-stacks/", difficulty: "easy" },
      { title: "Number of Recent Calls", platform: "LeetCode", url: "https://leetcode.com/problems/number-of-recent-calls/", difficulty: "easy" },
    ]
  },

  // Trees & Graphs
  "trees": {
    id: "trees",
    title: "Trees",
    description: "Trees are hierarchical data structures with a root node and child nodes. Binary trees, BSTs, and balanced trees are common variants.",
    youtubeVideo: {
      title: "Binary Tree Complete Course",
      url: "https://www.youtube.com/watch?v=_ANrF3FJm7I",
      channel: "Striver"
    },
    resources: [
      { title: "Binary Tree - GeeksforGeeks", type: "article", url: "https://www.geeksforgeeks.org/binary-tree-data-structure/" },
    ],
    practiceProblems: [
      { title: "Maximum Depth of Binary Tree", platform: "LeetCode", url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/", difficulty: "easy" },
      { title: "Invert Binary Tree", platform: "LeetCode", url: "https://leetcode.com/problems/invert-binary-tree/", difficulty: "easy" },
      { title: "Same Tree", platform: "LeetCode", url: "https://leetcode.com/problems/same-tree/", difficulty: "easy" },
      { title: "Binary Tree Level Order Traversal", platform: "LeetCode", url: "https://leetcode.com/problems/binary-tree-level-order-traversal/", difficulty: "medium" },
    ]
  },
  "graphs": {
    id: "graphs",
    title: "Graphs",
    description: "Graphs consist of vertices connected by edges. They model networks, relationships, and many real-world problems.",
    youtubeVideo: {
      title: "Graph Series - Complete Course",
      url: "https://www.youtube.com/watch?v=YTtpfjGlH2M",
      channel: "Striver"
    },
    resources: [
      { title: "Graph Data Structure", type: "article", url: "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/" },
    ],
    practiceProblems: [
      { title: "Number of Islands", platform: "LeetCode", url: "https://leetcode.com/problems/number-of-islands/", difficulty: "medium" },
      { title: "Clone Graph", platform: "LeetCode", url: "https://leetcode.com/problems/clone-graph/", difficulty: "medium" },
      { title: "Course Schedule", platform: "LeetCode", url: "https://leetcode.com/problems/course-schedule/", difficulty: "medium" },
    ]
  },

  // Dynamic Programming
  "dynamic-prog": {
    id: "dynamic-prog",
    title: "Dynamic Programming",
    description: "Dynamic Programming optimizes recursive solutions by storing subproblem results. Master memoization and tabulation techniques.",
    youtubeVideo: {
      title: "Dynamic Programming Complete Playlist",
      url: "https://www.youtube.com/watch?v=nqowUJzG-iM",
      channel: "Striver"
    },
    resources: [
      { title: "DP - GeeksforGeeks", type: "article", url: "https://www.geeksforgeeks.org/dynamic-programming/" },
    ],
    practiceProblems: [
      { title: "Climbing Stairs", platform: "LeetCode", url: "https://leetcode.com/problems/climbing-stairs/", difficulty: "easy" },
      { title: "House Robber", platform: "LeetCode", url: "https://leetcode.com/problems/house-robber/", difficulty: "medium" },
      { title: "Coin Change", platform: "LeetCode", url: "https://leetcode.com/problems/coin-change/", difficulty: "medium" },
      { title: "Longest Common Subsequence", platform: "LeetCode", url: "https://leetcode.com/problems/longest-common-subsequence/", difficulty: "medium" },
    ]
  }
};

export const getDefaultTopicData = (id: string, title: string): TopicData => {
  const formattedId = id.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
  return {
    id,
    title,
    description: `Master ${title} - a crucial component in Data Structures and Algorithms. Revise fundamental concepts, study standard implementations, and solve top interview problems.`,
    resources: [
      { 
        title: `${title} Reference & Complete Guide`, 
        type: "article", 
        url: `https://www.geeksforgeeks.org/${formattedId}/` 
      },
      { 
        title: `${title} Playlist (Striver / NeetCode)`, 
        type: "video", 
        url: `https://www.youtube.com/results?search_query=striver+neetcode+${encodeURIComponent(title)}` 
      },
      { 
        title: `LeetCode ${title} Problems Hub`, 
        type: "practice", 
        url: `https://leetcode.com/problemset/all/?search=${encodeURIComponent(title)}` 
      }
    ],
    practiceProblems: [
      { 
        title: `Solve ${title} Challenges on GeeksforGeeks`, 
        platform: "GeeksforGeeks", 
        url: `https://practice.geeksforgeeks.org/explore?page=1&search=${encodeURIComponent(title)}`,
        difficulty: "medium" 
      }
    ]
  };
};
