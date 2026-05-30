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
  "dynamic-array": {
    id: "dynamic-array",
    title: "Dynamic Arrays",
    description: "Dynamic arrays automatically resize when capacity is reached. Understand amortized time complexity and how ArrayList/Vector work internally.",
    youtubeVideo: {
      title: "Dynamic Arrays Explained",
      url: "https://www.youtube.com/watch?v=tvw4v7FEF1w",
      channel: "CS Dojo"
    },
    resources: [
      { title: "Dynamic Array Implementation", type: "article", url: "https://www.geeksforgeeks.org/how-do-dynamic-arrays-work/" },
    ],
    practiceProblems: []
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
  "singly-ll": {
    id: "singly-ll",
    title: "Singly Linked List",
    description: "Each node points to the next node only. Operations include insertion, deletion, and traversal in one direction.",
    youtubeVideo: {
      title: "Singly Linked List - Complete Tutorial",
      url: "https://www.youtube.com/watch?v=Nq7ok-OyEpg",
      channel: "Striver"
    },
    resources: [
      { title: "Singly Linked List", type: "article", url: "https://www.geeksforgeeks.org/singly-linked-list/" },
    ],
    practiceProblems: [
      { title: "Delete Node in a Linked List", platform: "LeetCode", url: "https://leetcode.com/problems/delete-node-in-a-linked-list/", difficulty: "medium" },
    ]
  },
  "doubly-ll": {
    id: "doubly-ll",
    title: "Doubly Linked List",
    description: "Each node has pointers to both next and previous nodes, enabling bidirectional traversal and easier deletion.",
    youtubeVideo: {
      title: "Doubly Linked List Explained",
      url: "https://www.youtube.com/watch?v=0eKMU10uEDI",
      channel: "take U forward"
    },
    resources: [
      { title: "Doubly Linked List", type: "article", url: "https://www.geeksforgeeks.org/doubly-linked-list/" },
    ],
    practiceProblems: [
      { title: "Flatten a Multilevel Doubly Linked List", platform: "LeetCode", url: "https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/", difficulty: "medium" },
    ]
  },
  "circular-ll": {
    id: "circular-ll",
    title: "Circular Linked List",
    description: "The last node points back to the first node, creating a circle. Useful for round-robin scheduling and circular buffers.",
    youtubeVideo: {
      title: "Circular Linked List Tutorial",
      url: "https://www.youtube.com/watch?v=d56dM8liafs",
      channel: "Jenny's Lectures"
    },
    resources: [
      { title: "Circular Linked List", type: "article", url: "https://www.geeksforgeeks.org/circular-linked-list/" },
    ],
    practiceProblems: [
      { title: "Circular Array Loop", platform: "LeetCode", url: "https://leetcode.com/problems/circular-array-loop/", difficulty: "medium" },
    ]
  },

  // Stacks
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
  "array-stack": {
    id: "array-stack",
    title: "Array Based Stack",
    description: "Implementation of stack using arrays. Fixed size but cache-friendly with O(1) operations.",
    youtubeVideo: {
      title: "Stack Using Array",
      url: "https://www.youtube.com/watch?v=bxRVz8zklWM",
      channel: "Striver"
    },
    resources: [
      { title: "Stack using Array", type: "article", url: "https://www.geeksforgeeks.org/stack-data-structure-introduction-program/" },
    ],
    practiceProblems: []
  },
  "ll-stack": {
    id: "ll-stack",
    title: "Linked List Based Stack",
    description: "Implementation of stack using linked list. Dynamic size with O(1) operations but extra memory for pointers.",
    youtubeVideo: {
      title: "Stack Using Linked List",
      url: "https://www.youtube.com/watch?v=bxRVz8zklWM",
      channel: "Striver"
    },
    resources: [
      { title: "Stack using Linked List", type: "article", url: "https://www.geeksforgeeks.org/implement-a-stack-using-singly-linked-list/" },
    ],
    practiceProblems: []
  },

  // Queues
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
  "simple-queue": {
    id: "simple-queue",
    title: "Simple Queue",
    description: "Basic queue implementation with enqueue and dequeue operations at opposite ends.",
    youtubeVideo: {
      title: "Queue Implementation",
      url: "https://www.youtube.com/watch?v=M6GnoUDpqEE",
      channel: "Striver"
    },
    resources: [
      { title: "Queue Implementation", type: "article", url: "https://www.geeksforgeeks.org/array-implementation-of-queue-simple/" },
    ],
    practiceProblems: []
  },
  "circular-queue": {
    id: "circular-queue",
    title: "Circular Queue",
    description: "Queue where the last position connects to the first position, maximizing space utilization.",
    youtubeVideo: {
      title: "Circular Queue Explained",
      url: "https://www.youtube.com/watch?v=dn01XST9-bI",
      channel: "Abdul Bari"
    },
    resources: [
      { title: "Circular Queue", type: "article", url: "https://www.geeksforgeeks.org/circular-queue-set-1-introduction-array-implementation/" },
    ],
    practiceProblems: [
      { title: "Design Circular Queue", platform: "LeetCode", url: "https://leetcode.com/problems/design-circular-queue/", difficulty: "medium" },
    ]
  },
  "deque": {
    id: "deque",
    title: "Deque",
    description: "Double-ended queue allowing insertion and deletion at both ends with O(1) operations.",
    youtubeVideo: {
      title: "Deque Data Structure",
      url: "https://www.youtube.com/watch?v=5VDQxLAlfu0",
      channel: "take U forward"
    },
    resources: [
      { title: "Deque Data Structure", type: "article", url: "https://www.geeksforgeeks.org/deque-set-1-introduction-applications/" },
    ],
    practiceProblems: [
      { title: "Sliding Window Maximum", platform: "LeetCode", url: "https://leetcode.com/problems/sliding-window-maximum/", difficulty: "hard" },
    ]
  },
  "priority-queue": {
    id: "priority-queue",
    title: "Priority Queue",
    description: "Abstract data type where elements have priorities. Highest priority element is served first. Usually implemented with heaps.",
    youtubeVideo: {
      title: "Priority Queue & Heaps",
      url: "https://www.youtube.com/watch?v=HqPJF2L5h9U",
      channel: "Abdul Bari"
    },
    resources: [
      { title: "Priority Queue", type: "article", url: "https://www.geeksforgeeks.org/priority-queue-set-1-introduction/" },
    ],
    practiceProblems: [
      { title: "Kth Largest Element", platform: "LeetCode", url: "https://leetcode.com/problems/kth-largest-element-in-an-array/", difficulty: "medium" },
      { title: "Top K Frequent Elements", platform: "LeetCode", url: "https://leetcode.com/problems/top-k-frequent-elements/", difficulty: "medium" },
    ]
  },

  // Hash Tables
  "hash-tables": {
    id: "hash-tables",
    title: "Hash Tables",
    description: "Hash tables provide O(1) average time for search, insert, and delete operations using a hash function to compute indices.",
    youtubeVideo: {
      title: "Hashing Complete Tutorial",
      url: "https://www.youtube.com/watch?v=KEs5UyBJ39g",
      channel: "Striver"
    },
    resources: [
      { title: "Hash Table - GeeksforGeeks", type: "article", url: "https://www.geeksforgeeks.org/hashing-data-structure/" },
    ],
    practiceProblems: [
      { title: "Two Sum", platform: "LeetCode", url: "https://leetcode.com/problems/two-sum/", difficulty: "easy" },
      { title: "Group Anagrams", platform: "LeetCode", url: "https://leetcode.com/problems/group-anagrams/", difficulty: "medium" },
      { title: "Longest Consecutive Sequence", platform: "LeetCode", url: "https://leetcode.com/problems/longest-consecutive-sequence/", difficulty: "medium" },
    ]
  },
  "hash-map": {
    id: "hash-map",
    title: "Hash Map",
    description: "Key-value pair storage with O(1) average time complexity. Essential for frequency counting and caching.",
    youtubeVideo: {
      title: "HashMap Tutorial",
      url: "https://www.youtube.com/watch?v=KEs5UyBJ39g",
      channel: "Striver"
    },
    resources: [
      { title: "HashMap Implementation", type: "article", url: "https://www.geeksforgeeks.org/java-util-hashmap-in-java-with-examples/" },
    ],
    practiceProblems: [
      { title: "Subarray Sum Equals K", platform: "LeetCode", url: "https://leetcode.com/problems/subarray-sum-equals-k/", difficulty: "medium" },
    ]
  },
  "hash-set": {
    id: "hash-set",
    title: "Hash Set",
    description: "Collection of unique elements with O(1) average time for add, remove, and contains operations.",
    youtubeVideo: {
      title: "HashSet Explained",
      url: "https://www.youtube.com/watch?v=KEs5UyBJ39g",
      channel: "Striver"
    },
    resources: [
      { title: "HashSet in Java", type: "article", url: "https://www.geeksforgeeks.org/hashset-in-java/" },
    ],
    practiceProblems: [
      { title: "Contains Duplicate", platform: "LeetCode", url: "https://leetcode.com/problems/contains-duplicate/", difficulty: "easy" },
    ]
  },
  "collision": {
    id: "collision",
    title: "Collision Handling",
    description: "Techniques to handle hash collisions: chaining (linked lists) and open addressing (linear/quadratic probing).",
    youtubeVideo: {
      title: "Hash Collision Handling Techniques",
      url: "https://www.youtube.com/watch?v=zeMa9sg-VJM",
      channel: "Abdul Bari"
    },
    resources: [
      { title: "Collision Resolution Techniques", type: "article", url: "https://www.geeksforgeeks.org/hashing-set-3-open-addressing/" },
    ],
    practiceProblems: []
  },

  // Trees
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
  "binary-tree": {
    id: "binary-tree",
    title: "Binary Tree",
    description: "Each node has at most two children. Foundation for BST, heaps, and expression trees.",
    youtubeVideo: {
      title: "Binary Tree from Scratch",
      url: "https://www.youtube.com/watch?v=_ANrF3FJm7I",
      channel: "Striver"
    },
    resources: [
      { title: "Binary Tree Basics", type: "article", url: "https://www.geeksforgeeks.org/binary-tree-set-1-introduction/" },
    ],
    practiceProblems: [
      { title: "Diameter of Binary Tree", platform: "LeetCode", url: "https://leetcode.com/problems/diameter-of-binary-tree/", difficulty: "easy" },
    ]
  },
  "bst": {
    id: "bst",
    title: "Binary Search Tree",
    description: "Binary tree where left subtree has smaller values and right subtree has larger values. Enables O(log n) search.",
    youtubeVideo: {
      title: "BST Complete Tutorial",
      url: "https://www.youtube.com/watch?v=Zaf8EOVa72I",
      channel: "Striver"
    },
    resources: [
      { title: "Binary Search Tree", type: "article", url: "https://www.geeksforgeeks.org/binary-search-tree-data-structure/" },
    ],
    practiceProblems: [
      { title: "Validate BST", platform: "LeetCode", url: "https://leetcode.com/problems/validate-binary-search-tree/", difficulty: "medium" },
      { title: "Kth Smallest Element in BST", platform: "LeetCode", url: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/", difficulty: "medium" },
      { title: "Lowest Common Ancestor of BST", platform: "LeetCode", url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/", difficulty: "medium" },
    ]
  },
  "avl": {
    id: "avl",
    title: "AVL Tree",
    description: "Self-balancing BST where heights of left and right subtrees differ by at most 1. Uses rotations for balancing.",
    youtubeVideo: {
      title: "AVL Tree - Complete Tutorial",
      url: "https://www.youtube.com/watch?v=jDM6_TnYIqE",
      channel: "Abdul Bari"
    },
    resources: [
      { title: "AVL Tree", type: "article", url: "https://www.geeksforgeeks.org/avl-tree-set-1-insertion/" },
    ],
    practiceProblems: [
      { title: "Balance a BST", platform: "LeetCode", url: "https://leetcode.com/problems/balance-a-binary-search-tree/", difficulty: "medium" },
    ]
  },
  "red-black": {
    id: "red-black",
    title: "Red-Black Tree",
    description: "Self-balancing BST with color properties. Guarantees O(log n) operations with less rotations than AVL.",
    youtubeVideo: {
      title: "Red-Black Trees Explained",
      url: "https://www.youtube.com/watch?v=qvZGUFHWChY",
      channel: "Abdul Bari"
    },
    resources: [
      { title: "Red-Black Tree", type: "article", url: "https://www.geeksforgeeks.org/red-black-tree-set-1-introduction-2/" },
    ],
    practiceProblems: []
  },

  // Graphs
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
  "adj-matrix": {
    id: "adj-matrix",
    title: "Adjacency Matrix",
    description: "2D array representation of graph. O(1) edge lookup but O(V²) space. Good for dense graphs.",
    youtubeVideo: {
      title: "Graph Representation - Matrix",
      url: "https://www.youtube.com/watch?v=YTtpfjGlH2M",
      channel: "Striver"
    },
    resources: [
      { title: "Adjacency Matrix", type: "article", url: "https://www.geeksforgeeks.org/graph-and-its-representations/" },
    ],
    practiceProblems: []
  },
  "adj-list": {
    id: "adj-list",
    title: "Adjacency List",
    description: "Array of lists representation. O(V+E) space, efficient for sparse graphs. Most common representation.",
    youtubeVideo: {
      title: "Graph Representation - List",
      url: "https://www.youtube.com/watch?v=YTtpfjGlH2M",
      channel: "Striver"
    },
    resources: [
      { title: "Adjacency List", type: "article", url: "https://www.geeksforgeeks.org/graph-and-its-representations/" },
    ],
    practiceProblems: []
  },

  // Heaps
  "heaps": {
    id: "heaps",
    title: "Heaps",
    description: "Complete binary tree satisfying heap property. Used for priority queues, heap sort, and finding kth largest/smallest elements.",
    youtubeVideo: {
      title: "Heaps Complete Tutorial",
      url: "https://www.youtube.com/watch?v=HqPJF2L5h9U",
      channel: "Abdul Bari"
    },
    resources: [
      { title: "Heap Data Structure", type: "article", url: "https://www.geeksforgeeks.org/heap-data-structure/" },
    ],
    practiceProblems: [
      { title: "Kth Largest Element", platform: "LeetCode", url: "https://leetcode.com/problems/kth-largest-element-in-an-array/", difficulty: "medium" },
      { title: "Merge K Sorted Lists", platform: "LeetCode", url: "https://leetcode.com/problems/merge-k-sorted-lists/", difficulty: "hard" },
    ]
  },
  "min-heap": {
    id: "min-heap",
    title: "Min Heap",
    description: "Parent is smaller than or equal to children. Root contains minimum element. Used in Dijkstra's algorithm.",
    youtubeVideo: {
      title: "Min Heap Implementation",
      url: "https://www.youtube.com/watch?v=HqPJF2L5h9U",
      channel: "Abdul Bari"
    },
    resources: [
      { title: "Min Heap", type: "article", url: "https://www.geeksforgeeks.org/min-heap-in-java/" },
    ],
    practiceProblems: [
      { title: "Last Stone Weight", platform: "LeetCode", url: "https://leetcode.com/problems/last-stone-weight/", difficulty: "easy" },
    ]
  },
  "max-heap": {
    id: "max-heap",
    title: "Max Heap",
    description: "Parent is larger than or equal to children. Root contains maximum element. Used in heap sort.",
    youtubeVideo: {
      title: "Max Heap Implementation",
      url: "https://www.youtube.com/watch?v=HqPJF2L5h9U",
      channel: "Abdul Bari"
    },
    resources: [
      { title: "Max Heap", type: "article", url: "https://www.geeksforgeeks.org/max-heap-in-java/" },
    ],
    practiceProblems: []
  },

  // Sorting Algorithms
  "sorting": {
    id: "sorting",
    title: "Sorting Algorithms",
    description: "Sorting algorithms arrange elements in a specific order. Understanding their time and space complexities is crucial for optimization.",
    youtubeVideo: {
      title: "Sorting Algorithms - Complete Playlist",
      url: "https://www.youtube.com/watch?v=HGk_ypEuS24",
      channel: "Abdul Bari"
    },
    resources: [
      { title: "Sorting Algorithms - GeeksforGeeks", type: "article", url: "https://www.geeksforgeeks.org/sorting-algorithms/" },
    ],
    practiceProblems: [
      { title: "Sort Colors", platform: "LeetCode", url: "https://leetcode.com/problems/sort-colors/", difficulty: "medium" },
      { title: "Merge Intervals", platform: "LeetCode", url: "https://leetcode.com/problems/merge-intervals/", difficulty: "medium" },
    ]
  },
  "bubble-sort": {
    id: "bubble-sort",
    title: "Bubble Sort",
    description: "Simple sorting algorithm that repeatedly swaps adjacent elements if they're in wrong order. O(n²) time, O(1) space.",
    youtubeVideo: {
      title: "Bubble Sort Algorithm",
      url: "https://www.youtube.com/watch?v=HGk_ypEuS24",
      channel: "Abdul Bari"
    },
    resources: [
      { title: "Bubble Sort", type: "article", url: "https://www.geeksforgeeks.org/bubble-sort/" },
    ],
    practiceProblems: []
  },
  "selection-sort": {
    id: "selection-sort",
    title: "Selection Sort",
    description: "Finds minimum element and places it at the beginning. O(n²) time complexity, useful for small datasets.",
    youtubeVideo: {
      title: "Selection Sort Explained",
      url: "https://www.youtube.com/watch?v=xWBP4lzkoyM",
      channel: "Abdul Bari"
    },
    resources: [
      { title: "Selection Sort", type: "article", url: "https://www.geeksforgeeks.org/selection-sort/" },
    ],
    practiceProblems: []
  },
  "insertion-sort": {
    id: "insertion-sort",
    title: "Insertion Sort",
    description: "Builds sorted array one element at a time. Efficient for small or nearly sorted data. O(n²) worst, O(n) best.",
    youtubeVideo: {
      title: "Insertion Sort Tutorial",
      url: "https://www.youtube.com/watch?v=OGzPmgsI-pQ",
      channel: "Abdul Bari"
    },
    resources: [
      { title: "Insertion Sort", type: "article", url: "https://www.geeksforgeeks.org/insertion-sort/" },
    ],
    practiceProblems: []
  },
  "merge-sort": {
    id: "merge-sort",
    title: "Merge Sort",
    description: "Divide and conquer algorithm. Stable sort with O(n log n) time but O(n) space for merging.",
    youtubeVideo: {
      title: "Merge Sort Algorithm",
      url: "https://www.youtube.com/watch?v=ogjf7ORKfd8",
      channel: "Abdul Bari"
    },
    resources: [
      { title: "Merge Sort", type: "article", url: "https://www.geeksforgeeks.org/merge-sort/" },
    ],
    practiceProblems: [
      { title: "Sort an Array", platform: "LeetCode", url: "https://leetcode.com/problems/sort-an-array/", difficulty: "medium" },
    ]
  },
  "quick-sort": {
    id: "quick-sort",
    title: "Quick Sort",
    description: "Efficient in-place sorting using pivot partitioning. O(n log n) average, O(n²) worst case.",
    youtubeVideo: {
      title: "QuickSort Algorithm",
      url: "https://www.youtube.com/watch?v=7h1s2SojIRw",
      channel: "Abdul Bari"
    },
    resources: [
      { title: "Quick Sort", type: "article", url: "https://www.geeksforgeeks.org/quick-sort/" },
    ],
    practiceProblems: [
      { title: "Kth Largest Element", platform: "LeetCode", url: "https://leetcode.com/problems/kth-largest-element-in-an-array/", difficulty: "medium" },
    ]
  },
  "heap-sort": {
    id: "heap-sort",
    title: "Heap Sort",
    description: "Uses heap data structure for sorting. O(n log n) time, O(1) space. Not stable but in-place.",
    youtubeVideo: {
      title: "Heap Sort Algorithm",
      url: "https://www.youtube.com/watch?v=HqPJF2L5h9U",
      channel: "Abdul Bari"
    },
    resources: [
      { title: "Heap Sort", type: "article", url: "https://www.geeksforgeeks.org/heap-sort/" },
    ],
    practiceProblems: []
  },

  // Searching
  "searching": {
    id: "searching",
    title: "Searching Algorithms",
    description: "Searching algorithms find elements in data structures. Binary search is crucial for sorted data.",
    youtubeVideo: {
      title: "Binary Search Complete Tutorial",
      url: "https://www.youtube.com/watch?v=W9QJ8HaRvJQ",
      channel: "Striver"
    },
    resources: [
      { title: "Searching Algorithms", type: "article", url: "https://www.geeksforgeeks.org/searching-algorithms/" },
    ],
    practiceProblems: [
      { title: "Binary Search", platform: "LeetCode", url: "https://leetcode.com/problems/binary-search/", difficulty: "easy" },
      { title: "Search in Rotated Sorted Array", platform: "LeetCode", url: "https://leetcode.com/problems/search-in-rotated-sorted-array/", difficulty: "medium" },
    ]
  },
  "linear-search": {
    id: "linear-search",
    title: "Linear Search",
    description: "Sequential search through each element. O(n) time, works on unsorted data.",
    youtubeVideo: {
      title: "Linear Search Explained",
      url: "https://www.youtube.com/watch?v=C46QfTjVCNU",
      channel: "CS Dojo"
    },
    resources: [
      { title: "Linear Search", type: "article", url: "https://www.geeksforgeeks.org/linear-search/" },
    ],
    practiceProblems: []
  },
  "binary-search": {
    id: "binary-search",
    title: "Binary Search",
    description: "Divide and conquer search on sorted array. O(log n) time. Master the template for variations.",
    youtubeVideo: {
      title: "Binary Search - All Patterns",
      url: "https://www.youtube.com/watch?v=W9QJ8HaRvJQ",
      channel: "Striver"
    },
    resources: [
      { title: "Binary Search", type: "article", url: "https://www.geeksforgeeks.org/binary-search/" },
    ],
    practiceProblems: [
      { title: "Binary Search", platform: "LeetCode", url: "https://leetcode.com/problems/binary-search/", difficulty: "easy" },
      { title: "Find First and Last Position", platform: "LeetCode", url: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/", difficulty: "medium" },
      { title: "Search Insert Position", platform: "LeetCode", url: "https://leetcode.com/problems/search-insert-position/", difficulty: "easy" },
    ]
  },

  // Graph Algorithms
  "graph-algos": {
    id: "graph-algos",
    title: "Graph Algorithms",
    description: "Algorithms for traversing, searching, and finding shortest paths in graphs.",
    youtubeVideo: {
      title: "Graph Algorithms Complete Course",
      url: "https://www.youtube.com/watch?v=YTtpfjGlH2M",
      channel: "Striver"
    },
    resources: [
      { title: "Graph Algorithms", type: "article", url: "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/" },
    ],
    practiceProblems: []
  },
  "bfs": {
    id: "bfs",
    title: "Breadth-First Search",
    description: "Level-by-level traversal using queue. Finds shortest path in unweighted graphs. O(V+E) time.",
    youtubeVideo: {
      title: "BFS Algorithm - Complete Tutorial",
      url: "https://www.youtube.com/watch?v=UeE67iCK2lQ",
      channel: "Striver"
    },
    resources: [
      { title: "BFS Algorithm", type: "article", url: "https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/" },
    ],
    practiceProblems: [
      { title: "Rotting Oranges", platform: "LeetCode", url: "https://leetcode.com/problems/rotting-oranges/", difficulty: "medium" },
      { title: "Word Ladder", platform: "LeetCode", url: "https://leetcode.com/problems/word-ladder/", difficulty: "hard" },
    ]
  },
  "dfs": {
    id: "dfs",
    title: "Depth-First Search",
    description: "Explores as far as possible before backtracking. Uses stack/recursion. O(V+E) time.",
    youtubeVideo: {
      title: "DFS Algorithm - Complete Tutorial",
      url: "https://www.youtube.com/watch?v=Qzf1a--rhp8",
      channel: "Striver"
    },
    resources: [
      { title: "DFS Algorithm", type: "article", url: "https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/" },
    ],
    practiceProblems: [
      { title: "Number of Islands", platform: "LeetCode", url: "https://leetcode.com/problems/number-of-islands/", difficulty: "medium" },
      { title: "Pacific Atlantic Water Flow", platform: "LeetCode", url: "https://leetcode.com/problems/pacific-atlantic-water-flow/", difficulty: "medium" },
    ]
  },
  "dijkstra": {
    id: "dijkstra",
    title: "Dijkstra's Algorithm",
    description: "Finds shortest path from source to all vertices in weighted graph with non-negative edges. O(V² or E log V with heap).",
    youtubeVideo: {
      title: "Dijkstra's Algorithm Explained",
      url: "https://www.youtube.com/watch?v=V6H1qAeB-l4",
      channel: "Striver"
    },
    resources: [
      { title: "Dijkstra's Algorithm", type: "article", url: "https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/" },
    ],
    practiceProblems: [
      { title: "Network Delay Time", platform: "LeetCode", url: "https://leetcode.com/problems/network-delay-time/", difficulty: "medium" },
      { title: "Path with Minimum Effort", platform: "LeetCode", url: "https://leetcode.com/problems/path-with-minimum-effort/", difficulty: "medium" },
    ]
  },
  "bellman-ford": {
    id: "bellman-ford",
    title: "Bellman-Ford Algorithm",
    description: "Handles negative edge weights. Detects negative cycles. O(VE) time complexity.",
    youtubeVideo: {
      title: "Bellman Ford Algorithm",
      url: "https://www.youtube.com/watch?v=0vVofAhAYjc",
      channel: "Striver"
    },
    resources: [
      { title: "Bellman-Ford Algorithm", type: "article", url: "https://www.geeksforgeeks.org/bellman-ford-algorithm-dp-23/" },
    ],
    practiceProblems: [
      { title: "Cheapest Flights Within K Stops", platform: "LeetCode", url: "https://leetcode.com/problems/cheapest-flights-within-k-stops/", difficulty: "medium" },
    ]
  },
  "floyd-warshall": {
    id: "floyd-warshall",
    title: "Floyd-Warshall Algorithm",
    description: "Finds shortest paths between all pairs of vertices. O(V³) time but handles negative edges.",
    youtubeVideo: {
      title: "Floyd Warshall Algorithm",
      url: "https://www.youtube.com/watch?v=oNI0rf2P9gE",
      channel: "Abdul Bari"
    },
    resources: [
      { title: "Floyd-Warshall Algorithm", type: "article", url: "https://www.geeksforgeeks.org/floyd-warshall-algorithm-dp-16/" },
    ],
    practiceProblems: []
  },
  "kruskal": {
    id: "kruskal",
    title: "Kruskal's MST",
    description: "Greedy algorithm for Minimum Spanning Tree. Uses Union-Find. O(E log E) time.",
    youtubeVideo: {
      title: "Kruskal's Algorithm",
      url: "https://www.youtube.com/watch?v=1KRmCzBl_mQ",
      channel: "Striver"
    },
    resources: [
      { title: "Kruskal's Algorithm", type: "article", url: "https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/" },
    ],
    practiceProblems: [
      { title: "Min Cost to Connect All Points", platform: "LeetCode", url: "https://leetcode.com/problems/min-cost-to-connect-all-points/", difficulty: "medium" },
    ]
  },
  "prim": {
    id: "prim",
    title: "Prim's MST",
    description: "Greedy algorithm for Minimum Spanning Tree. Grows tree from single vertex. O(E log V) with heap.",
    youtubeVideo: {
      title: "Prim's Algorithm",
      url: "https://www.youtube.com/watch?v=mJcZjjKzeqk",
      channel: "Striver"
    },
    resources: [
      { title: "Prim's Algorithm", type: "article", url: "https://www.geeksforgeeks.org/prims-minimum-spanning-tree-mst-greedy-algo-5/" },
    ],
    practiceProblems: []
  },

  // Tree Traversal
  "tree-traversal": {
    id: "tree-traversal",
    title: "Tree Traversal",
    description: "Methods to visit all nodes in a tree: inorder, preorder, postorder, and level order.",
    youtubeVideo: {
      title: "Tree Traversals - All Types",
      url: "https://www.youtube.com/watch?v=RBSGKlAvoiM",
      channel: "freeCodeCamp"
    },
    resources: [
      { title: "Tree Traversals", type: "article", url: "https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/" },
    ],
    practiceProblems: [
      { title: "Binary Tree Inorder Traversal", platform: "LeetCode", url: "https://leetcode.com/problems/binary-tree-inorder-traversal/", difficulty: "easy" },
    ]
  },
  "inorder": {
    id: "inorder",
    title: "Inorder Traversal",
    description: "Left → Root → Right. For BST, gives sorted order.",
    youtubeVideo: {
      title: "Inorder Traversal",
      url: "https://www.youtube.com/watch?v=Z_NEgBgbRVI",
      channel: "Striver"
    },
    resources: [
      { title: "Inorder Traversal", type: "article", url: "https://www.geeksforgeeks.org/inorder-traversal-of-binary-tree/" },
    ],
    practiceProblems: [
      { title: "Binary Tree Inorder Traversal", platform: "LeetCode", url: "https://leetcode.com/problems/binary-tree-inorder-traversal/", difficulty: "easy" },
    ]
  },
  "preorder": {
    id: "preorder",
    title: "Preorder Traversal",
    description: "Root → Left → Right. Used for copying trees and prefix expressions.",
    youtubeVideo: {
      title: "Preorder Traversal",
      url: "https://www.youtube.com/watch?v=RBSGKlAvoiM",
      channel: "freeCodeCamp"
    },
    resources: [
      { title: "Preorder Traversal", type: "article", url: "https://www.geeksforgeeks.org/preorder-traversal-of-binary-tree/" },
    ],
    practiceProblems: [
      { title: "Binary Tree Preorder Traversal", platform: "LeetCode", url: "https://leetcode.com/problems/binary-tree-preorder-traversal/", difficulty: "easy" },
    ]
  },
  "postorder": {
    id: "postorder",
    title: "Postorder Traversal",
    description: "Left → Right → Root. Used for deleting trees and postfix expressions.",
    youtubeVideo: {
      title: "Postorder Traversal",
      url: "https://www.youtube.com/watch?v=RBSGKlAvoiM",
      channel: "freeCodeCamp"
    },
    resources: [
      { title: "Postorder Traversal", type: "article", url: "https://www.geeksforgeeks.org/postorder-traversal-of-binary-tree/" },
    ],
    practiceProblems: [
      { title: "Binary Tree Postorder Traversal", platform: "LeetCode", url: "https://leetcode.com/problems/binary-tree-postorder-traversal/", difficulty: "easy" },
    ]
  },
  "level-order": {
    id: "level-order",
    title: "Level Order Traversal",
    description: "BFS on trees. Visit nodes level by level from left to right.",
    youtubeVideo: {
      title: "Level Order Traversal",
      url: "https://www.youtube.com/watch?v=EoAsWbO7sqg",
      channel: "Striver"
    },
    resources: [
      { title: "Level Order Traversal", type: "article", url: "https://www.geeksforgeeks.org/level-order-tree-traversal/" },
    ],
    practiceProblems: [
      { title: "Binary Tree Level Order Traversal", platform: "LeetCode", url: "https://leetcode.com/problems/binary-tree-level-order-traversal/", difficulty: "medium" },
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
  },
  "memoization": {
    id: "memoization",
    title: "Memoization",
    description: "Top-down DP approach. Store results of function calls to avoid redundant calculations.",
    youtubeVideo: {
      title: "Memoization Explained",
      url: "https://www.youtube.com/watch?v=nqowUJzG-iM",
      channel: "Striver"
    },
    resources: [
      { title: "Memoization", type: "article", url: "https://www.geeksforgeeks.org/memoization-1d-2d-and-3d/" },
    ],
    practiceProblems: []
  },
  "tabulation": {
    id: "tabulation",
    title: "Tabulation",
    description: "Bottom-up DP approach. Build solution iteratively from smaller subproblems.",
    youtubeVideo: {
      title: "Tabulation vs Memoization",
      url: "https://www.youtube.com/watch?v=nqowUJzG-iM",
      channel: "Striver"
    },
    resources: [
      { title: "Tabulation", type: "article", url: "https://www.geeksforgeeks.org/tabulation-vs-memoization/" },
    ],
    practiceProblems: []
  },
  "knapsack": {
    id: "knapsack",
    title: "Knapsack Problem",
    description: "Classic DP problem: maximize value while staying within weight capacity. Learn 0/1 and unbounded variants.",
    youtubeVideo: {
      title: "0/1 Knapsack - Complete Tutorial",
      url: "https://www.youtube.com/watch?v=GqOmJHQZivw",
      channel: "Striver"
    },
    resources: [
      { title: "0/1 Knapsack", type: "article", url: "https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/" },
    ],
    practiceProblems: [
      { title: "Partition Equal Subset Sum", platform: "LeetCode", url: "https://leetcode.com/problems/partition-equal-subset-sum/", difficulty: "medium" },
      { title: "Target Sum", platform: "LeetCode", url: "https://leetcode.com/problems/target-sum/", difficulty: "medium" },
    ]
  },
  "lcs": {
    id: "lcs",
    title: "Longest Common Subsequence",
    description: "Find the longest subsequence common to two sequences. Foundation for diff algorithms and bioinformatics.",
    youtubeVideo: {
      title: "LCS - Complete Tutorial",
      url: "https://www.youtube.com/watch?v=NPZn9jBrX8U",
      channel: "Striver"
    },
    resources: [
      { title: "LCS Problem", type: "article", url: "https://www.geeksforgeeks.org/longest-common-subsequence-dp-4/" },
    ],
    practiceProblems: [
      { title: "Longest Common Subsequence", platform: "LeetCode", url: "https://leetcode.com/problems/longest-common-subsequence/", difficulty: "medium" },
      { title: "Edit Distance", platform: "LeetCode", url: "https://leetcode.com/problems/edit-distance/", difficulty: "medium" },
    ]
  },
  "lis": {
    id: "lis",
    title: "Longest Increasing Subsequence",
    description: "Find the longest subsequence where elements are in increasing order. O(n log n) solution exists using binary search.",
    youtubeVideo: {
      title: "LIS - All Approaches",
      url: "https://www.youtube.com/watch?v=ekcwMsSIzVc",
      channel: "Striver"
    },
    resources: [
      { title: "LIS Problem", type: "article", url: "https://www.geeksforgeeks.org/longest-increasing-subsequence-dp-3/" },
    ],
    practiceProblems: [
      { title: "Longest Increasing Subsequence", platform: "LeetCode", url: "https://leetcode.com/problems/longest-increasing-subsequence/", difficulty: "medium" },
      { title: "Russian Doll Envelopes", platform: "LeetCode", url: "https://leetcode.com/problems/russian-doll-envelopes/", difficulty: "hard" },
    ]
  },

  // Greedy Algorithms
  "greedy": {
    id: "greedy",
    title: "Greedy Algorithms",
    description: "Make locally optimal choices hoping for global optimum. Works when greedy choice property and optimal substructure exist.",
    youtubeVideo: {
      title: "Greedy Algorithms Complete Course",
      url: "https://www.youtube.com/watch?v=HzeK7g8cD0Y",
      channel: "Striver"
    },
    resources: [
      { title: "Greedy Algorithms", type: "article", url: "https://www.geeksforgeeks.org/greedy-algorithms/" },
    ],
    practiceProblems: [
      { title: "Jump Game", platform: "LeetCode", url: "https://leetcode.com/problems/jump-game/", difficulty: "medium" },
      { title: "Gas Station", platform: "LeetCode", url: "https://leetcode.com/problems/gas-station/", difficulty: "medium" },
    ]
  },
  "activity-selection": {
    id: "activity-selection",
    title: "Activity Selection",
    description: "Classic greedy problem: select maximum non-overlapping activities. Sort by end time and greedily pick.",
    youtubeVideo: {
      title: "Activity Selection Problem",
      url: "https://www.youtube.com/watch?v=DHr-Mn_vzs0",
      channel: "Abdul Bari"
    },
    resources: [
      { title: "Activity Selection", type: "article", url: "https://www.geeksforgeeks.org/activity-selection-problem-greedy-algo-1/" },
    ],
    practiceProblems: [
      { title: "Non-overlapping Intervals", platform: "LeetCode", url: "https://leetcode.com/problems/non-overlapping-intervals/", difficulty: "medium" },
    ]
  },
  "huffman": {
    id: "huffman",
    title: "Huffman Coding",
    description: "Optimal prefix-free encoding for data compression. Build tree bottom-up using min-heap.",
    youtubeVideo: {
      title: "Huffman Coding Algorithm",
      url: "https://www.youtube.com/watch?v=co4_ahEDCho",
      channel: "Abdul Bari"
    },
    resources: [
      { title: "Huffman Coding", type: "article", url: "https://www.geeksforgeeks.org/huffman-coding-greedy-algo-3/" },
    ],
    practiceProblems: []
  },

  // Backtracking
  "backtracking": {
    id: "backtracking",
    title: "Backtracking",
    description: "Systematic way to explore all possible solutions. Build candidates incrementally and abandon if constraints violated.",
    youtubeVideo: {
      title: "Backtracking Complete Course",
      url: "https://www.youtube.com/watch?v=DKCbsiDBN6c",
      channel: "Striver"
    },
    resources: [
      { title: "Backtracking Algorithms", type: "article", url: "https://www.geeksforgeeks.org/backtracking-algorithms/" },
    ],
    practiceProblems: [
      { title: "Subsets", platform: "LeetCode", url: "https://leetcode.com/problems/subsets/", difficulty: "medium" },
      { title: "Permutations", platform: "LeetCode", url: "https://leetcode.com/problems/permutations/", difficulty: "medium" },
      { title: "Combination Sum", platform: "LeetCode", url: "https://leetcode.com/problems/combination-sum/", difficulty: "medium" },
    ]
  },
  "n-queens": {
    id: "n-queens",
    title: "N-Queens Problem",
    description: "Place N queens on NxN chessboard so no two attack each other. Classic backtracking example.",
    youtubeVideo: {
      title: "N-Queens Problem Solution",
      url: "https://www.youtube.com/watch?v=Ph95IHmRp5M",
      channel: "Striver"
    },
    resources: [
      { title: "N-Queens Problem", type: "article", url: "https://www.geeksforgeeks.org/n-queen-problem-backtracking-3/" },
    ],
    practiceProblems: [
      { title: "N-Queens", platform: "LeetCode", url: "https://leetcode.com/problems/n-queens/", difficulty: "hard" },
    ]
  },
  "sudoku": {
    id: "sudoku",
    title: "Sudoku Solver",
    description: "Fill 9x9 grid following sudoku rules. Backtrack when a cell can't be filled with valid number.",
    youtubeVideo: {
      title: "Sudoku Solver Algorithm",
      url: "https://www.youtube.com/watch?v=FWAIf_EVUKE",
      channel: "Striver"
    },
    resources: [
      { title: "Sudoku Solver", type: "article", url: "https://www.geeksforgeeks.org/sudoku-backtracking-7/" },
    ],
    practiceProblems: [
      { title: "Sudoku Solver", platform: "LeetCode", url: "https://leetcode.com/problems/sudoku-solver/", difficulty: "hard" },
    ]
  },
  "subset-sum": {
    id: "subset-sum",
    title: "Subset Sum",
    description: "Find if subset exists with given sum. Can be solved with backtracking or DP.",
    youtubeVideo: {
      title: "Subset Sum Problem",
      url: "https://www.youtube.com/watch?v=GqOmJHQZivw",
      channel: "Striver"
    },
    resources: [
      { title: "Subset Sum Problem", type: "article", url: "https://www.geeksforgeeks.org/subset-sum-problem-dp-25/" },
    ],
    practiceProblems: [
      { title: "Partition Equal Subset Sum", platform: "LeetCode", url: "https://leetcode.com/problems/partition-equal-subset-sum/", difficulty: "medium" },
    ]
  },

  // Divide and Conquer
  "divide-conquer": {
    id: "divide-conquer",
    title: "Divide & Conquer",
    description: "Break problem into subproblems, solve recursively, and combine solutions. Foundation for many efficient algorithms.",
    youtubeVideo: {
      title: "Divide and Conquer Explained",
      url: "https://www.youtube.com/watch?v=2Rr2tW9zvRg",
      channel: "Abdul Bari"
    },
    resources: [
      { title: "Divide and Conquer", type: "article", url: "https://www.geeksforgeeks.org/divide-and-conquer-algorithm-introduction/" },
    ],
    practiceProblems: [
      { title: "Merge Sort", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/merge-sort/", difficulty: "medium" },
    ]
  },
  "merge-sort-dc": {
    id: "merge-sort-dc",
    title: "Merge Sort (D&C)",
    description: "Divide array, sort halves, merge. O(n log n) guaranteed. Classic divide and conquer.",
    youtubeVideo: {
      title: "Merge Sort Algorithm",
      url: "https://www.youtube.com/watch?v=ogjf7ORKfd8",
      channel: "Abdul Bari"
    },
    resources: [
      { title: "Merge Sort", type: "article", url: "https://www.geeksforgeeks.org/merge-sort/" },
    ],
    practiceProblems: []
  },
  "quick-sort-dc": {
    id: "quick-sort-dc",
    title: "Quick Sort (D&C)",
    description: "Partition around pivot, recursively sort. Average O(n log n), in-place.",
    youtubeVideo: {
      title: "QuickSort Algorithm",
      url: "https://www.youtube.com/watch?v=7h1s2SojIRw",
      channel: "Abdul Bari"
    },
    resources: [
      { title: "Quick Sort", type: "article", url: "https://www.geeksforgeeks.org/quick-sort/" },
    ],
    practiceProblems: []
  },
  "binary-search-dc": {
    id: "binary-search-dc",
    title: "Binary Search (D&C)",
    description: "Divide search space in half each step. O(log n) time for sorted arrays.",
    youtubeVideo: {
      title: "Binary Search",
      url: "https://www.youtube.com/watch?v=W9QJ8HaRvJQ",
      channel: "Striver"
    },
    resources: [
      { title: "Binary Search", type: "article", url: "https://www.geeksforgeeks.org/binary-search/" },
    ],
    practiceProblems: []
  },

  // Advanced Topics
  "segment-tree": {
    id: "segment-tree",
    title: "Segment Tree",
    description: "Tree for range queries and updates in O(log n). Useful for sum, min, max queries on arrays.",
    youtubeVideo: {
      title: "Segment Tree Complete Tutorial",
      url: "https://www.youtube.com/watch?v=NEG-SoyigGE",
      channel: "Striver"
    },
    resources: [
      { title: "Segment Tree", type: "article", url: "https://www.geeksforgeeks.org/segment-tree-set-1-sum-of-given-range/" },
    ],
    practiceProblems: [
      { title: "Range Sum Query - Mutable", platform: "LeetCode", url: "https://leetcode.com/problems/range-sum-query-mutable/", difficulty: "medium" },
    ]
  },
  "fenwick-tree": {
    id: "fenwick-tree",
    title: "Fenwick Tree (BIT)",
    description: "Binary Indexed Tree for prefix sums with O(log n) update and query. Simpler than segment tree.",
    youtubeVideo: {
      title: "Fenwick Tree Tutorial",
      url: "https://www.youtube.com/watch?v=uSFzHCZ4E-8",
      channel: "Errichto"
    },
    resources: [
      { title: "Fenwick Tree", type: "article", url: "https://www.geeksforgeeks.org/binary-indexed-tree-or-fenwick-tree-2/" },
    ],
    practiceProblems: [
      { title: "Count of Smaller Numbers After Self", platform: "LeetCode", url: "https://leetcode.com/problems/count-of-smaller-numbers-after-self/", difficulty: "hard" },
    ]
  },
  "trie": {
    id: "trie",
    title: "Trie",
    description: "Prefix tree for efficient string operations. O(m) search/insert where m is word length. Used in autocomplete.",
    youtubeVideo: {
      title: "Trie Data Structure",
      url: "https://www.youtube.com/watch?v=dBGUmUQhjaM",
      channel: "Striver"
    },
    resources: [
      { title: "Trie Data Structure", type: "article", url: "https://www.geeksforgeeks.org/trie-insert-and-search/" },
    ],
    practiceProblems: [
      { title: "Implement Trie", platform: "LeetCode", url: "https://leetcode.com/problems/implement-trie-prefix-tree/", difficulty: "medium" },
      { title: "Word Search II", platform: "LeetCode", url: "https://leetcode.com/problems/word-search-ii/", difficulty: "hard" },
    ]
  },
  "suffix-array": {
    id: "suffix-array",
    title: "Suffix Array",
    description: "Sorted array of all suffixes. Space-efficient alternative to suffix trees for pattern matching.",
    youtubeVideo: {
      title: "Suffix Array Tutorial",
      url: "https://www.youtube.com/watch?v=zqKlL3ZpTqs",
      channel: "William Fiset"
    },
    resources: [
      { title: "Suffix Array", type: "article", url: "https://www.geeksforgeeks.org/suffix-array-set-1-introduction/" },
    ],
    practiceProblems: []
  },
  "disjoint-set": {
    id: "disjoint-set",
    title: "Disjoint Set / Union Find",
    description: "Track elements partitioned into disjoint sets. Nearly O(1) union and find with path compression and union by rank.",
    youtubeVideo: {
      title: "Disjoint Set Union - Complete Tutorial",
      url: "https://www.youtube.com/watch?v=3gbO7FDYNFQ",
      channel: "Striver"
    },
    resources: [
      { title: "Disjoint Set Union", type: "article", url: "https://www.geeksforgeeks.org/union-find/" },
    ],
    practiceProblems: [
      { title: "Number of Connected Components", platform: "LeetCode", url: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/", difficulty: "medium" },
      { title: "Redundant Connection", platform: "LeetCode", url: "https://leetcode.com/problems/redundant-connection/", difficulty: "medium" },
    ]
  },
  "string-algos": {
    id: "string-algos",
    title: "String Algorithms",
    description: "Algorithms for pattern matching, searching, and string manipulation.",
    youtubeVideo: {
      title: "String Algorithms Playlist",
      url: "https://www.youtube.com/watch?v=V5-7GzOfADQ",
      channel: "Abdul Bari"
    },
    resources: [
      { title: "String Algorithms", type: "article", url: "https://www.geeksforgeeks.org/string-data-structure/" },
    ],
    practiceProblems: []
  },
  "kmp": {
    id: "kmp",
    title: "KMP Algorithm",
    description: "Knuth-Morris-Pratt pattern matching in O(n+m). Uses failure function to avoid re-comparing characters.",
    youtubeVideo: {
      title: "KMP Algorithm Explained",
      url: "https://www.youtube.com/watch?v=V5-7GzOfADQ",
      channel: "Abdul Bari"
    },
    resources: [
      { title: "KMP Algorithm", type: "article", url: "https://www.geeksforgeeks.org/kmp-algorithm-for-pattern-searching/" },
    ],
    practiceProblems: [
      { title: "Find the Index of First Occurrence", platform: "LeetCode", url: "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/", difficulty: "easy" },
    ]
  },
  "rabin-karp": {
    id: "rabin-karp",
    title: "Rabin-Karp Algorithm",
    description: "Rolling hash for pattern matching. O(n+m) average. Good for multiple pattern search.",
    youtubeVideo: {
      title: "Rabin-Karp Algorithm",
      url: "https://www.youtube.com/watch?v=qQ8vS2btsxI",
      channel: "Abdul Bari"
    },
    resources: [
      { title: "Rabin-Karp", type: "article", url: "https://www.geeksforgeeks.org/rabin-karp-algorithm-for-pattern-searching/" },
    ],
    practiceProblems: [
      { title: "Repeated DNA Sequences", platform: "LeetCode", url: "https://leetcode.com/problems/repeated-dna-sequences/", difficulty: "medium" },
    ]
  },
  "z-algo": {
    id: "z-algo",
    title: "Z Algorithm",
    description: "Linear time pattern matching. Z-array stores length of longest substring starting from position i matching prefix.",
    youtubeVideo: {
      title: "Z Algorithm Tutorial",
      url: "https://www.youtube.com/watch?v=CpZh4eF8QBw",
      channel: "Tushar Roy"
    },
    resources: [
      { title: "Z Algorithm", type: "article", url: "https://www.geeksforgeeks.org/z-algorithm-linear-time-pattern-searching-algorithm/" },
    ],
    practiceProblems: []
  },

  // Practice Platforms
  "leetcode": {
    id: "leetcode",
    title: "LeetCode",
    description: "Most popular platform for coding interview preparation. Focus on top 150 problems and company-specific questions.",
    youtubeVideo: {
      title: "How to Use LeetCode Effectively",
      url: "https://www.youtube.com/watch?v=aHZW7TuY_yo",
      channel: "NeetCode"
    },
    resources: [
      { title: "LeetCode Platform", type: "practice", url: "https://leetcode.com/" },
      { title: "NeetCode 150", type: "article", url: "https://neetcode.io/practice" },
    ],
    practiceProblems: []
  },
  "codeforces": {
    id: "codeforces",
    title: "Codeforces",
    description: "Platform for competitive programming with regular contests. Great for improving problem-solving speed.",
    youtubeVideo: {
      title: "Getting Started with Codeforces",
      url: "https://www.youtube.com/watch?v=xAeiXy8-9Y8",
      channel: "Colin Galen"
    },
    resources: [
      { title: "Codeforces Platform", type: "practice", url: "https://codeforces.com/" },
    ],
    practiceProblems: []
  },
  "hackerrank": {
    id: "hackerrank",
    title: "HackerRank",
    description: "Platform with structured tracks for learning. Good for beginners and certification.",
    youtubeVideo: {
      title: "HackerRank Guide",
      url: "https://www.youtube.com/watch?v=oBt53YbR9Kk",
      channel: "freeCodeCamp"
    },
    resources: [
      { title: "HackerRank Platform", type: "practice", url: "https://www.hackerrank.com/" },
    ],
    practiceProblems: []
  },
  "mock-interviews": {
    id: "mock-interviews",
    title: "Mock Interviews",
    description: "Practice with mock interviews to simulate real interview conditions. Focus on communication and problem-solving approach.",
    youtubeVideo: {
      title: "Mock Interview Tips",
      url: "https://www.youtube.com/watch?v=1qw5ITr3k9E",
      channel: "Clément Mihailescu"
    },
    resources: [
      { title: "Pramp - Free Mock Interviews", type: "practice", url: "https://www.pramp.com/" },
      { title: "Interviewing.io", type: "practice", url: "https://interviewing.io/" },
    ],
    practiceProblems: []
  },
  "system-design": {
    id: "system-design",
    title: "System Design",
    description: "Design large-scale distributed systems. Important for senior engineering interviews.",
    youtubeVideo: {
      title: "System Design Complete Course",
      url: "https://www.youtube.com/watch?v=xpDnVSmNFX0",
      channel: "Gaurav Sen"
    },
    resources: [
      { title: "System Design Primer", type: "article", url: "https://github.com/donnemartin/system-design-primer" },
      { title: "Designing Data-Intensive Applications", type: "documentation", url: "https://dataintensive.net/" },
    ],
    practiceProblems: []
  },
};

// Default topic data for topics not in the map
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
