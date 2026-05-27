import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Settings, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const VisualizationsFixed = () => {
  useEffect(() => {
    document.title = "Interactive DSA Algorithm Visualizations & Animations | DSA Ditcher";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Watch sorting, searching, binary tree, and graph algorithms come to life with interactive step-by-step animations. Master Bubble Sort, Merge Sort, Quick Sort, DFS/BFS, and HashMaps.");
    }
  }, []);

  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubble-sort");
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [array, setArray] = useState([64, 34, 25, 12, 22, 11, 90]);
  const [currentStep, setCurrentStep] = useState(0);
  const [comparing, setComparing] = useState<number[]>([]);
  const [swapping, setSwapping] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);

  // Specific visualizer states
  const [graphActiveNode, setGraphActiveNode] = useState("");
  const [graphVisitedNodes, setGraphVisitedNodes] = useState<string[]>([]);
  const [graphQueue, setGraphQueue] = useState<string[]>([]);
  const [graphStack, setGraphStack] = useState<string[]>([]);

  const [treeActiveNode, setTreeActiveNode] = useState("");
  const [treeVisitedNodes, setTreeVisitedNodes] = useState<string[]>([]);

  const [hashmapBuckets, setHashmapBuckets] = useState<{ key: string; val: number }[][]>([[], [], [], []]);
  const [hashmapActiveBucket, setHashmapActiveBucket] = useState<number | null>(null);
  const [hashmapActiveKey, setHashmapActiveKey] = useState("");

  const algorithms = [
    { id: "bubble-sort", name: "Bubble Sort", category: "Sorting", complexity: "O(n²)", visual: "array" },
    { id: "merge-sort", name: "Merge Sort", category: "Sorting", complexity: "O(n log n)", visual: "array" },
    { id: "quick-sort", name: "Quick Sort", category: "Sorting", complexity: "O(n log n)", visual: "array" },
    { id: "binary-search", name: "Binary Search", category: "Search", complexity: "O(log n)", visual: "array" },
    { id: "bfs-graph", name: "BFS Graph", category: "Graph", complexity: "O(V + E)", visual: "graph" },
    { id: "dfs-graph", name: "DFS Graph", category: "Graph", complexity: "O(V + E)", visual: "graph" },
    { id: "binary-tree-traversal", name: "Tree Traversal", category: "Tree", complexity: "O(n)", visual: "tree" },
    { id: "hash-map-ops", name: "HashMap Operations", category: "Hash", complexity: "O(1)", visual: "hashmap" },
  ];

  // 1. Bubble Sort Steps Generator
  const generateBubbleSortSteps = (initialArray: number[]) => {
    const steps = [];
    const arr = [...initialArray];
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        steps.push({
          comparing: [j, j + 1],
          swapping: [],
          array: [...arr],
          description: `Compare elements at positions ${j} and ${j + 1}: ${arr[j]} and ${arr[j + 1]}`,
          sorted: []
        });
        
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          steps.push({
            comparing: [j, j + 1],
            swapping: [j, j + 1],
            array: [...arr],
            description: `Swap ${arr[j + 1]} and ${arr[j]} since ${arr[j + 1]} > ${arr[j]}`,
            sorted: []
          });
        }
      }
      steps.push({
        comparing: [],
        swapping: [],
        array: [...arr],
        description: `Element ${arr[n - i - 1]} is now in its correct position`,
        sorted: Array.from({ length: i + 1 }, (_, k) => n - k - 1)
      });
    }
    
    steps.push({
      comparing: [],
      swapping: [],
      array: [...arr],
      description: "Sorting complete! All elements are in order.",
      sorted: Array.from({ length: n }, (_, i) => i)
    });
    
    return steps;
  };

  // 2. Merge Sort Steps Generator
  const generateMergeSortSteps = (initialArray: number[]) => {
    const steps = [];
    const arr = [...initialArray];
    
    const mergeSortHelper = (l: number, r: number) => {
      if (l >= r) return;
      const m = Math.floor((l + r) / 2);
      
      steps.push({
        comparing: [],
        swapping: [],
        array: [...arr],
        description: `Divide: Split array into left [index ${l} to ${m}] and right [index ${m + 1} to ${r}]`,
        sorted: []
      });
      
      mergeSortHelper(l, m);
      mergeSortHelper(m + 1, r);
      merge(l, m, r);
    };
    
    const merge = (l: number, m: number, r: number) => {
      const leftArr = arr.slice(l, m + 1);
      const rightArr = arr.slice(m + 1, r + 1);
      
      let i = 0, j = 0, k = l;
      
      steps.push({
        comparing: Array.from({ length: r - l + 1 }, (_, idx) => l + idx),
        swapping: [],
        array: [...arr],
        description: `Merge: Start merging left [${leftArr.join(", ")}] and right [${rightArr.join(", ")}]`,
        sorted: []
      });
      
      while (i < leftArr.length && j < rightArr.length) {
        steps.push({
          comparing: [l + i, m + 1 + j],
          swapping: [],
          array: [...arr],
          description: `Compare elements: ${leftArr[i]} and ${rightArr[j]}`,
          sorted: []
        });
        
        if (leftArr[i] <= rightArr[j]) {
          arr[k] = leftArr[i];
          steps.push({
            comparing: [],
            swapping: [k],
            array: [...arr],
            description: `Place ${leftArr[i]} from left partition into position ${k}`,
            sorted: []
          });
          i++;
        } else {
          arr[k] = rightArr[j];
          steps.push({
            comparing: [],
            swapping: [k],
            array: [...arr],
            description: `Place ${rightArr[j]} from right partition into position ${k}`,
            sorted: []
          });
          j++;
        }
        k++;
      }
      
      while (i < leftArr.length) {
        arr[k] = leftArr[i];
        steps.push({
          comparing: [],
          swapping: [k],
          array: [...arr],
          description: `Copy remaining element ${leftArr[i]} from left partition into position ${k}`,
          sorted: []
        });
        i++;
        k++;
      }
      
      while (j < rightArr.length) {
        arr[k] = rightArr[j];
        steps.push({
          comparing: [],
          swapping: [k],
          array: [...arr],
          description: `Copy remaining element ${rightArr[j]} from right partition into position ${k}`,
          sorted: []
        });
        j++;
        k++;
      }
      
      steps.push({
        comparing: [],
        swapping: [],
        array: [...arr],
        description: `Finished merging partition [index ${l} to ${r}]`,
        sorted: Array.from({ length: r - l + 1 }, (_, idx) => l + idx)
      });
    };
    
    mergeSortHelper(0, arr.length - 1);
    
    steps.push({
      comparing: [],
      swapping: [],
      array: [...arr],
      description: "Merge Sort complete! All elements are sorted.",
      sorted: Array.from({ length: arr.length }, (_, k) => k)
    });
    
    return steps;
  };

  // 3. Quick Sort Steps Generator
  const generateQuickSortSteps = (initialArray: number[]) => {
    const steps = [];
    const arr = [...initialArray];
    
    const quickSortHelper = (low: number, high: number) => {
      if (low < high) {
        const pivotIdx = partition(low, high);
        quickSortHelper(low, pivotIdx - 1);
        quickSortHelper(pivotIdx + 1, high);
      } else if (low === high) {
        steps.push({
          comparing: [],
          swapping: [],
          array: [...arr],
          description: `Element ${arr[low]} at index ${low} is sorted (single element partition)`,
          sorted: [low]
        });
      }
    };
    
    const partition = (low: number, high: number) => {
      const pivot = arr[high];
      
      steps.push({
        comparing: [high],
        swapping: [],
        array: [...arr],
        description: `Partition: Pick element at index ${high} (${pivot}) as pivot`,
        sorted: []
      });
      
      let i = low - 1;
      
      for (let j = low; j < high; j++) {
        steps.push({
          comparing: [j, high],
          swapping: [],
          array: [...arr],
          description: `Compare element ${arr[j]} at index ${j} with pivot ${pivot}`,
          sorted: []
        });
        
        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          steps.push({
            comparing: [i, j],
            swapping: [i, j],
            array: [...arr],
            description: `Swap element at index ${i} (${arr[i]}) with index ${j} (${arr[j]}) since it is smaller than pivot`,
            sorted: []
          });
        }
      }
      
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      steps.push({
        comparing: [i + 1, high],
        swapping: [i + 1, high],
        array: [...arr],
        description: `Swap pivot ${pivot} at index ${high} with index ${i + 1} (${arr[i + 1]}) to place pivot in correct position`,
        sorted: [i + 1]
      });
      
      return i + 1;
    };
    
    quickSortHelper(0, arr.length - 1);
    
    steps.push({
      comparing: [],
      swapping: [],
      array: [...arr],
      description: "Quick Sort complete! All elements are sorted.",
      sorted: Array.from({ length: arr.length }, (_, k) => k)
    });
    
    return steps;
  };

  // 4. Binary Search Steps Generator
  const generateBinarySearchSteps = (initialArray: number[]) => {
    // Binary search strictly runs on a sorted array!
    const arr = [...initialArray].sort((a, b) => a - b);
    const steps = [];
    const n = arr.length;
    const target = arr[Math.floor(Math.random() * n)]; // Pick a random target from array
    
    let left = 0;
    let right = n - 1;
    
    steps.push({
      comparing: [],
      swapping: [],
      array: [...arr],
      description: `Target to search is: ${target}. Array must be sorted first!`,
      sorted: []
    });

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      
      steps.push({
        comparing: [mid],
        swapping: [],
        array: [...arr],
        description: `Left = ${left}, Right = ${right}. Calculate Middle = ${mid}. Element at Middle is ${arr[mid]}`,
        sorted: []
      });

      if (arr[mid] === target) {
        steps.push({
          comparing: [],
          swapping: [],
          array: [...arr],
          description: `Found target ${target} at position ${mid}! Search complete.`,
          sorted: [mid]
        });
        return steps;
      }

      if (arr[mid] < target) {
        steps.push({
          comparing: [],
          swapping: [],
          array: [...arr],
          description: `${arr[mid]} < ${target}. Target must be in right half. Search from index ${mid + 1} to ${right}`,
          sorted: []
        });
        left = mid + 1;
      } else {
        steps.push({
          comparing: [],
          swapping: [],
          array: [...arr],
          description: `${arr[mid]} > ${target}. Target must be in left half. Search from index ${left} to ${mid - 1}`,
          sorted: []
        });
        right = mid - 1;
      }
    }
    
    return steps;
  };

  const generateBFSSteps = () => {
    return [
      {
        activeNode: "",
        visitedNodes: [],
        queue: [],
        description: "Initial Graph state. BFS will start from Node A.",
      },
      {
        activeNode: "A",
        visitedNodes: ["A"],
        queue: ["A"],
        description: "Start BFS from Node A. Enqueue A and mark it as visited.",
      },
      {
        activeNode: "A",
        visitedNodes: ["A", "B", "C", "D"],
        queue: ["B", "C", "D"],
        description: "Dequeue A. Explore its adjacent unvisited neighbors B, C, and D. Mark them as visited and enqueue them.",
      },
      {
        activeNode: "B",
        visitedNodes: ["A", "B", "C", "D", "E", "F"],
        queue: ["C", "D", "E", "F"],
        description: "Dequeue B. Explore its adjacent unvisited neighbors E and F. Mark them as visited and enqueue them.",
      },
      {
        activeNode: "C",
        visitedNodes: ["A", "B", "C", "D", "E", "F"],
        queue: ["D", "E", "F"],
        description: "Dequeue C. All its adjacent neighbors (A, D) are already visited. No nodes to enqueue.",
      },
      {
        activeNode: "D",
        visitedNodes: ["A", "B", "C", "D", "E", "F"],
        queue: ["E", "F"],
        description: "Dequeue D. All its adjacent neighbors (A, C) are already visited. No nodes to enqueue.",
      },
      {
        activeNode: "E",
        visitedNodes: ["A", "B", "C", "D", "E", "F"],
        queue: ["F"],
        description: "Dequeue E. All its adjacent neighbors (B) are already visited. No nodes to enqueue.",
      },
      {
        activeNode: "F",
        visitedNodes: ["A", "B", "C", "D", "E", "F"],
        queue: [],
        description: "Dequeue F. Queue is now empty. BFS Traversal complete! Visited order: A -> B -> C -> D -> E -> F",
      }
    ];
  };

  const generateDFSSteps = () => {
    return [
      {
        activeNode: "",
        visitedNodes: [],
        stack: [],
        description: "Initial Graph state. DFS will start from Node A.",
      },
      {
        activeNode: "A",
        visitedNodes: ["A"],
        stack: ["A"],
        description: "Start DFS from Node A. Push A onto stack and mark as visited.",
      },
      {
        activeNode: "B",
        visitedNodes: ["A", "B"],
        stack: ["A", "B"],
        description: "Explore neighbor B from A. Push B onto stack and mark as visited.",
      },
      {
        activeNode: "E",
        visitedNodes: ["A", "B", "E"],
        stack: ["A", "B", "E"],
        description: "Explore neighbor E from B. Push E onto stack and mark as visited.",
      },
      {
        activeNode: "E",
        visitedNodes: ["A", "B", "E"],
        stack: ["A", "B"],
        description: "E has no unvisited neighbors. Backtrack to B by popping E off stack.",
      },
      {
        activeNode: "F",
        visitedNodes: ["A", "B", "E", "F"],
        stack: ["A", "B", "F"],
        description: "Explore other unvisited neighbor F from B. Push F onto stack and mark as visited.",
      },
      {
        activeNode: "F",
        visitedNodes: ["A", "B", "E", "F"],
        stack: ["A", "B"],
        description: "F has no unvisited neighbors. Backtrack to B by popping F off stack.",
      },
      {
        activeNode: "B",
        visitedNodes: ["A", "B", "E", "F"],
        stack: ["A"],
        description: "B has no remaining unvisited neighbors. Backtrack to A by popping B off stack.",
      },
      {
        activeNode: "C",
        visitedNodes: ["A", "B", "E", "F", "C"],
        stack: ["A", "C"],
        description: "Explore unvisited neighbor C from A. Push C onto stack and mark as visited.",
      },
      {
        activeNode: "D",
        visitedNodes: ["A", "B", "E", "F", "C", "D"],
        stack: ["A", "C", "D"],
        description: "Explore unvisited neighbor D from C. Push D onto stack and mark as visited.",
      },
      {
        activeNode: "D",
        visitedNodes: ["A", "B", "E", "F", "C", "D"],
        stack: ["A", "C"],
        description: "D has no unvisited neighbors. Backtrack to C by popping D off stack.",
      },
      {
        activeNode: "C",
        visitedNodes: ["A", "B", "E", "F", "C", "D"],
        stack: ["A"],
        description: "C has no remaining unvisited neighbors. Backtrack to A by popping C off stack.",
      },
      {
        activeNode: "A",
        visitedNodes: ["A", "B", "E", "F", "C", "D"],
        stack: [],
        description: "A has no remaining unvisited neighbors. Pop A off stack. Stack is empty. DFS Traversal complete! Visited order: A -> B -> E -> F -> C -> D",
      }
    ];
  };

  const generateTreeTraversalSteps = () => {
    return [
      {
        activeNode: "",
        visitedNodes: [],
        description: "Initial Tree state. We will visualize Preorder Traversal (Root -> Left -> Right).",
      },
      {
        activeNode: "1",
        visitedNodes: ["1"],
        description: "Visit root node 1. Visited: [1]",
      },
      {
        activeNode: "2",
        visitedNodes: ["1", "2"],
        description: "Go left: visit node 2. Visited: [1, 2]",
      },
      {
        activeNode: "4",
        visitedNodes: ["1", "2", "4"],
        description: "Go left again: visit leaf node 4. Visited: [1, 2, 4]",
      },
      {
        activeNode: "5",
        visitedNodes: ["1", "2", "4", "5"],
        description: "Backtrack to 2, then go right: visit node 5. Visited: [1, 2, 4, 5]",
      },
      {
        activeNode: "3",
        visitedNodes: ["1", "2", "4", "5", "3"],
        description: "Backtrack to root 1, then go right: visit node 3. Visited: [1, 2, 4, 5, 3]",
      },
      {
        activeNode: "6",
        visitedNodes: ["1", "2", "4", "5", "3", "6"],
        description: "Go left: visit node 6. Visited: [1, 2, 4, 5, 3, 6]",
      },
      {
        activeNode: "7",
        visitedNodes: ["1", "2", "4", "5", "3", "6", "7"],
        description: "Backtrack to 3, then go right: visit leaf node 7. Preorder Traversal complete! Visited order: 1 -> 2 -> 4 -> 5 -> 3 -> 6 -> 7",
      }
    ];
  };

  const generateHashMapSteps = () => {
    return [
      {
        activeBucket: null,
        activeKey: "",
        buckets: [[], [], [], []],
        description: "Start with an empty HashMap of 4 buckets. Hash function is: key.length % 4.",
      },
      {
        activeBucket: 1,
        activeKey: "apple",
        buckets: [
          [],
          [{ key: "apple", val: 5 }],
          [],
          []
        ],
        description: "Put('apple', 5): Hash code is 'apple'.length % 4 = 5 % 4 = 1. Insert key-value pair into Bucket 1.",
      },
      {
        activeBucket: 2,
        activeKey: "banana",
        buckets: [
          [],
          [{ key: "apple", val: 5 }],
          [{ key: "banana", val: 3 }],
          []
        ],
        description: "Put('banana', 3): Hash code is 'banana'.length % 4 = 6 % 4 = 2. Insert key-value pair into Bucket 2.",
      },
      {
        activeBucket: 2,
        activeKey: "orange",
        buckets: [
          [],
          [{ key: "apple", val: 5 }],
          [{ key: "banana", val: 3 }, { key: "orange", val: 8 }],
          []
        ],
        description: "Put('orange', 8): Hash code is 6 % 4 = 2. Bucket 2 is occupied by 'banana'. Collision resolved by chaining 'orange' behind 'banana' in linked list.",
      },
      {
        activeBucket: 1,
        activeKey: "grape",
        buckets: [
          [],
          [{ key: "apple", val: 5 }, { key: "grape", val: 2 }],
          [{ key: "banana", val: 3 }, { key: "orange", val: 8 }],
          []
        ],
        description: "Put('grape', 2): Hash code is 'grape'.length % 4 = 5 % 4 = 1. Bucket 1 is occupied by 'apple'. Collision resolved by chaining 'grape' behind 'apple'.",
      },
      {
        activeBucket: 2,
        activeKey: "banana",
        buckets: [
          [],
          [{ key: "apple", val: 5 }, { key: "grape", val: 2 }],
          [{ key: "banana", val: 3 }, { key: "orange", val: 8 }],
          []
        ],
        description: "Get('banana'): Hash code is 2. Search linked list in Bucket 2. Found key 'banana' with value 3.",
      },
      {
        activeBucket: 1,
        activeKey: "apple",
        buckets: [
          [],
          [{ key: "grape", val: 2 }],
          [{ key: "banana", val: 3 }, { key: "orange", val: 8 }],
          []
        ],
        description: "Remove('apple'): Hash code is 1. Search linked list in Bucket 1, find 'apple' and remove it. 'grape' now becomes the head of Bucket 1.",
      }
    ];
  };

  // Unified Switch for Step Generators
  const generateStepsForAlgorithm = (algoId: string, initialArray: number[]) => {
    switch (algoId) {
      case "merge-sort":
        return generateMergeSortSteps(initialArray);
      case "quick-sort":
        return generateQuickSortSteps(initialArray);
      case "binary-search":
        return generateBinarySearchSteps(initialArray);
      case "bfs-graph":
        return generateBFSSteps();
      case "dfs-graph":
        return generateDFSSteps();
      case "binary-tree-traversal":
        return generateTreeTraversalSteps();
      case "hash-map-ops":
        return generateHashMapSteps();
      case "bubble-sort":
      default:
        return generateBubbleSortSteps(initialArray);
    }
  };

  const [steps, setSteps] = useState(() => generateStepsForAlgorithm(selectedAlgorithm, array));

  // Synchronization effect on Algorithm changes
  useEffect(() => {
    const newArray = [64, 34, 25, 12, 22, 11, 90];
    if (selectedAlgorithm === "binary-search") {
      newArray.sort((a, b) => a - b);
    }
    setArray(newArray);
    setSteps(generateStepsForAlgorithm(selectedAlgorithm, newArray));
    setCurrentStep(0);
    setComparing([]);
    setSwapping([]);
    setSorted([]);
    setIsPlaying(false);

    // Reset specific visualizer states
    setGraphActiveNode("");
    setGraphVisitedNodes([]);
    setGraphQueue([]);
    setGraphStack([]);
    setTreeActiveNode("");
    setTreeVisitedNodes([]);
    setHashmapBuckets([[], [], [], []]);
    setHashmapActiveBucket(null);
    setHashmapActiveKey("");
  }, [selectedAlgorithm]);

  const resetVisualization = () => {
    const newArray = [64, 34, 25, 12, 22, 11, 90];
    if (selectedAlgorithm === "binary-search") {
      newArray.sort((a, b) => a - b);
    }
    setArray(newArray);
    setSteps(generateStepsForAlgorithm(selectedAlgorithm, newArray));
    setCurrentStep(0);
    setComparing([]);
    setSwapping([]);
    setSorted([]);
    setIsPlaying(false);

    // Reset specific visualizer states
    setGraphActiveNode("");
    setGraphVisitedNodes([]);
    setGraphQueue([]);
    setGraphStack([]);
    setTreeActiveNode("");
    setTreeVisitedNodes([]);
    setHashmapBuckets([[], [], [], []]);
    setHashmapActiveBucket(null);
    setHashmapActiveKey("");
  };

  const generateRandomArray = () => {
    const newArray = Array.from({ length: 7 }, () => Math.floor(Math.random() * 100) + 1);
    if (selectedAlgorithm === "binary-search") {
      newArray.sort((a, b) => a - b);
    }
    setArray(newArray);
    setSteps(generateStepsForAlgorithm(selectedAlgorithm, newArray));
    setCurrentStep(0);
    setComparing([]);
    setSwapping([]);
    setSorted([]);
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const stepForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const stepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentStep < steps.length - 1) {
      interval = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, speed);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
    
    return () => clearTimeout(interval);
  }, [isPlaying, currentStep, speed, steps]);

  useEffect(() => {
    if (currentStep < steps.length) {
      const step = steps[currentStep];
      
      // Update array states if they exist on the step
      if (step.array) setArray(step.array);
      if (step.comparing) setComparing(step.comparing);
      if (step.swapping) setSwapping(step.swapping);
      if (step.sorted) setSorted(step.sorted);
      
      // Update graph states if they exist on the step
      if (step.activeNode !== undefined) setGraphActiveNode(step.activeNode);
      if (step.visitedNodes !== undefined) {
        setGraphVisitedNodes(step.visitedNodes);
        setTreeVisitedNodes(step.visitedNodes); // Share visited nodes with tree traversal
      }
      if (step.queue !== undefined) setGraphQueue(step.queue);
      if (step.stack !== undefined) setGraphStack(step.stack);
      
      // Update tree states
      if (step.activeNode !== undefined) setTreeActiveNode(step.activeNode);
      
      // Update hashmap states
      if (step.buckets !== undefined) setHashmapBuckets(step.buckets);
      if (step.activeBucket !== undefined) setHashmapActiveBucket(step.activeBucket);
      if (step.activeKey !== undefined) setHashmapActiveKey(step.activeKey);
    }
  }, [currentStep, steps]);

  const getBarColor = (index: number) => {
    if (sorted.includes(index)) return "bg-gradient-to-t from-emerald-500 to-emerald-400";
    if (swapping.includes(index)) return "bg-gradient-to-t from-rose-500 to-rose-400";
    if (comparing.includes(index)) return "bg-gradient-to-t from-amber-500 to-amber-400";
    return "bg-gradient-to-t from-primary to-primary/70";
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Sorting': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      case 'Search': return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300';
      case 'Graph': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300';
      case 'Tree': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'Hash': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300';
      default: return 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300';
    }
  };

  const renderArrayVisualization = () => (
    <div className="flex items-end justify-center space-x-3 h-80 bg-slate-50/50 dark:bg-slate-950/40 rounded-xl p-6 border border-border shadow-inner">
      {array.map((value, index) => (
        <div key={`${index}-${value}`} className="flex flex-col items-center space-y-2">
          <div
            className={`${getBarColor(index)} rounded-t-lg transition-all duration-300 min-w-[50px] flex items-end justify-center text-white font-bold pb-2 shadow-lg border border-white border-opacity-10`}
            style={{ 
              height: `${(value / Math.max(...array)) * 230}px`,
              minHeight: '30px'
            }}
          >
            <span className="text-sm shadow-sm">{value}</span>
          </div>
          <div className="text-sm font-medium text-foreground bg-popover px-2.5 py-1 rounded-lg shadow-sm border border-border/50">
            {index}
          </div>
        </div>
      ))}
    </div>
  );

  const getGraphNodeStyle = (nodeId: string) => {
    const isActive = graphActiveNode === nodeId;
    const isVisited = graphVisitedNodes.includes(nodeId);
    const inQueueStack = graphQueue.includes(nodeId) || graphStack.includes(nodeId);

    if (isActive) {
      return {
        fill: "#eab308", // Yellow
        stroke: "#fef08a",
        strokeWidth: 3,
        className: "animate-pulse shadow-lg"
      };
    }
    if (inQueueStack) {
      return {
        fill: "#6366f1", // Indigo
        stroke: "#c7d2fe",
        strokeWidth: 2,
        className: ""
      };
    }
    if (isVisited) {
      return {
        fill: "#10b981", // Emerald
        stroke: "#a7f3d0",
        strokeWidth: 2,
        className: ""
      };
    }
    return {
      fill: "#475569", // Slate
      stroke: "#94a3b8",
      strokeWidth: 1.5,
      className: ""
    };
  };

  const getGraphEdgeStyle = (u: string, v: string) => {
    const uVisited = graphVisitedNodes.includes(u);
    const vVisited = graphVisitedNodes.includes(v);
    const uActive = graphActiveNode === u;
    const vActive = graphActiveNode === v;

    if (uActive || vActive) {
      return { stroke: "#eab308", strokeWidth: 3, className: "animate-pulse" };
    }
    if (uVisited && vVisited) {
      return { stroke: "#10b981", strokeWidth: 3, className: "" };
    }
    const uInQueueStack = graphQueue.includes(u) || graphStack.includes(u);
    const vInQueueStack = graphQueue.includes(v) || graphStack.includes(v);
    if ((uVisited || uInQueueStack) && (vVisited || vInQueueStack)) {
      return { stroke: "#6366f1", strokeWidth: 2.5, className: "" };
    }
    return { stroke: "currentColor", strokeWidth: 1.5, className: "text-muted-foreground/30" };
  };

  const renderGraphVisualization = () => (
    <div className="h-auto bg-purple-50/5 dark:bg-purple-950/5 rounded-xl p-6 border border-border flex flex-col justify-between">
      <div className="flex justify-center items-center h-64">
        <svg width="400" height="220" viewBox="0 0 400 220" className="drop-shadow-md">
          {/* Edges */}
          <line x1="100" y1="50" x2="200" y2="50" {...getGraphEdgeStyle("A", "B")} />
          <line x1="100" y1="50" x2="50" y2="150" {...getGraphEdgeStyle("A", "C")} />
          <line x1="100" y1="50" x2="150" y2="150" {...getGraphEdgeStyle("A", "D")} />
          <line x1="200" y1="50" x2="250" y2="150" {...getGraphEdgeStyle("B", "E")} />
          <line x1="200" y1="50" x2="300" y2="150" {...getGraphEdgeStyle("B", "F")} />
          <line x1="50" y1="150" x2="150" y2="150" {...getGraphEdgeStyle("C", "D")} />
          
          {/* Nodes */}
          {(() => {
            const nodeA = getGraphNodeStyle("A");
            return (
              <g className="transition-all duration-300">
                <circle cx="100" cy="50" r="20" fill={nodeA.fill} stroke={nodeA.stroke} strokeWidth={nodeA.strokeWidth} className={nodeA.className} />
                <text x="100" y="54" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">A</text>
              </g>
            );
          })()}
          {(() => {
            const nodeB = getGraphNodeStyle("B");
            return (
              <g className="transition-all duration-300">
                <circle cx="200" cy="50" r="20" fill={nodeB.fill} stroke={nodeB.stroke} strokeWidth={nodeB.strokeWidth} className={nodeB.className} />
                <text x="200" y="54" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">B</text>
              </g>
            );
          })()}
          {(() => {
            const nodeC = getGraphNodeStyle("C");
            return (
              <g className="transition-all duration-300">
                <circle cx="50" cy="150" r="20" fill={nodeC.fill} stroke={nodeC.stroke} strokeWidth={nodeC.strokeWidth} className={nodeC.className} />
                <text x="50" y="154" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">C</text>
              </g>
            );
          })()}
          {(() => {
            const nodeD = getGraphNodeStyle("D");
            return (
              <g className="transition-all duration-300">
                <circle cx="150" cy="150" r="20" fill={nodeD.fill} stroke={nodeD.stroke} strokeWidth={nodeD.strokeWidth} className={nodeD.className} />
                <text x="150" y="154" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">D</text>
              </g>
            );
          })()}
          {(() => {
            const nodeE = getGraphNodeStyle("E");
            return (
              <g className="transition-all duration-300">
                <circle cx="250" cy="150" r="20" fill={nodeE.fill} stroke={nodeE.stroke} strokeWidth={nodeE.strokeWidth} className={nodeE.className} />
                <text x="250" y="154" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">E</text>
              </g>
            );
          })()}
          {(() => {
            const nodeF = getGraphNodeStyle("F");
            return (
              <g className="transition-all duration-300">
                <circle cx="300" cy="150" r="20" fill={nodeF.fill} stroke={nodeF.stroke} strokeWidth={nodeF.strokeWidth} className={nodeF.className} />
                <text x="300" y="154" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">F</text>
              </g>
            );
          })()}
        </svg>
      </div>

      {/* State Indicators */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-100/50 dark:bg-slate-900/40 rounded-xl p-3 border border-border shadow-inner">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
            Visited Nodes (Order)
          </span>
          <div className="flex flex-wrap items-center gap-1 min-h-[32px]">
            {graphVisitedNodes.length === 0 ? (
              <span className="text-xs text-muted-foreground/50 italic">None yet</span>
            ) : (
              graphVisitedNodes.map((node, idx) => (
                <div key={node} className="flex items-center">
                  <span className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded text-xs font-bold font-mono shadow-sm">
                    {node}
                  </span>
                  {idx < graphVisitedNodes.length - 1 && (
                    <ChevronRight className="w-3 h-3 text-muted-foreground/40 mx-0.5" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-slate-100/50 dark:bg-slate-900/40 rounded-xl p-3 border border-border shadow-inner">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
            {selectedAlgorithm === "bfs-graph" ? "Queue (FIFO)" : "Stack (LIFO)"}
          </span>
          <div className="flex flex-wrap items-center gap-1.5 min-h-[32px]">
            {selectedAlgorithm === "bfs-graph" ? (
              graphQueue.length === 0 ? (
                <span className="text-xs text-muted-foreground/50 italic">Queue is empty</span>
              ) : (
                graphQueue.map((node) => (
                  <span key={node} className="bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 px-2.5 py-0.5 rounded text-xs font-bold font-mono shadow-sm">
                    {node}
                  </span>
                ))
              )
            ) : (
              graphStack.length === 0 ? (
                <span className="text-xs text-muted-foreground/50 italic">Stack is empty</span>
              ) : (
                graphStack.map((node) => (
                  <span key={node} className="bg-purple-50/20 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800 px-2.5 py-0.5 rounded text-xs font-bold font-mono shadow-sm">
                    {node}
                  </span>
                ))
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const getTreeNodeStyle = (nodeId: string) => {
    const isActive = treeActiveNode === nodeId;
    const isVisited = treeVisitedNodes.includes(nodeId);

    if (isActive) {
      return {
        fill: "#eab308", // Yellow
        stroke: "#fef08a",
        strokeWidth: 3,
        className: "animate-pulse shadow-lg"
      };
    }
    if (isVisited) {
      return {
        fill: "#10b981", // Emerald
        stroke: "#a7f3d0",
        strokeWidth: 2,
        className: ""
      };
    }
    return {
      fill: "#475569", // Slate
      stroke: "#94a3b8",
      strokeWidth: 1.5,
      className: ""
    };
  };

  const getTreeEdgeStyle = (u: string, v: string) => {
    const uVisited = treeVisitedNodes.includes(u);
    const vVisited = treeVisitedNodes.includes(v);
    const uActive = treeActiveNode === u;
    const vActive = treeActiveNode === v;

    if (uActive || vActive) {
      return { stroke: "#eab308", strokeWidth: 3, className: "animate-pulse" };
    }
    if (uVisited && vVisited) {
      return { stroke: "#10b981", strokeWidth: 3, className: "" };
    }
    return { stroke: "currentColor", strokeWidth: 1.5, className: "text-muted-foreground/30" };
  };

  const renderTreeVisualization = () => (
    <div className="h-auto bg-green-50/5 dark:bg-green-950/5 rounded-xl p-6 border border-border flex flex-col justify-between">
      <div className="flex justify-center items-center h-64">
        <svg width="350" height="200" viewBox="0 0 350 200" className="drop-shadow-md">
          {/* Edges */}
          <line x1="175" y1="30" x2="125" y2="80" {...getTreeEdgeStyle("1", "2")} />
          <line x1="175" y1="30" x2="225" y2="80" {...getTreeEdgeStyle("1", "3")} />
          <line x1="125" y1="80" x2="100" y2="130" {...getTreeEdgeStyle("2", "4")} />
          <line x1="125" y1="80" x2="150" y2="130" {...getTreeEdgeStyle("2", "5")} />
          <line x1="225" y1="80" x2="200" y2="130" {...getTreeEdgeStyle("3", "6")} />
          <line x1="225" y1="80" x2="250" y2="130" {...getTreeEdgeStyle("3", "7")} />
          
          {/* Nodes */}
          {(() => {
            const node1 = getTreeNodeStyle("1");
            return (
              <g className="transition-all duration-300">
                <circle cx="175" cy="30" r="18" fill={node1.fill} stroke={node1.stroke} strokeWidth={node1.strokeWidth} className={node1.className} />
                <text x="175" y="34" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">1</text>
              </g>
            );
          })()}
          
          {(() => {
            const node2 = getTreeNodeStyle("2");
            return (
              <g className="transition-all duration-300">
                <circle cx="125" cy="80" r="18" fill={node2.fill} stroke={node2.stroke} strokeWidth={node2.strokeWidth} className={node2.className} />
                <text x="125" y="84" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">2</text>
              </g>
            );
          })()}
          
          {(() => {
            const node3 = getTreeNodeStyle("3");
            return (
              <g className="transition-all duration-300">
                <circle cx="225" cy="80" r="18" fill={node3.fill} stroke={node3.stroke} strokeWidth={node3.strokeWidth} className={node3.className} />
                <text x="225" y="84" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">3</text>
              </g>
            );
          })()}
          
          {(() => {
            const node4 = getTreeNodeStyle("4");
            return (
              <g className="transition-all duration-300">
                <circle cx="100" cy="130" r="18" fill={node4.fill} stroke={node4.stroke} strokeWidth={node4.strokeWidth} className={node4.className} />
                <text x="100" y="134" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">4</text>
              </g>
            );
          })()}
          
          {(() => {
            const node5 = getTreeNodeStyle("5");
            return (
              <g className="transition-all duration-300">
                <circle cx="150" cy="130" r="18" fill={node5.fill} stroke={node5.stroke} strokeWidth={node5.strokeWidth} className={node5.className} />
                <text x="150" y="134" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">5</text>
              </g>
            );
          })()}
          
          {(() => {
            const node6 = getTreeNodeStyle("6");
            return (
              <g className="transition-all duration-300">
                <circle cx="200" cy="130" r="18" fill={node6.fill} stroke={node6.stroke} strokeWidth={node6.strokeWidth} className={node6.className} />
                <text x="200" y="134" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">6</text>
              </g>
            );
          })()}
          
          {(() => {
            const node7 = getTreeNodeStyle("7");
            return (
              <g className="transition-all duration-300">
                <circle cx="250" cy="130" r="18" fill={node7.fill} stroke={node7.stroke} strokeWidth={node7.strokeWidth} className={node7.className} />
                <text x="250" y="134" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">7</text>
              </g>
            );
          })()}
        </svg>
      </div>

      {/* Traversal State display */}
      <div className="mt-4 bg-slate-100/50 dark:bg-slate-900/40 rounded-xl p-3 border border-border shadow-inner">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
          Traversal Sequence (Preorder: Root → Left → Right)
        </span>
        <div className="flex flex-wrap items-center gap-1 min-h-[32px]">
          {treeVisitedNodes.length === 0 ? (
            <span className="text-xs text-muted-foreground/50 italic">None yet</span>
          ) : (
            treeVisitedNodes.map((node, idx) => (
              <div key={node} className="flex items-center">
                <span className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded text-xs font-bold font-mono shadow-sm">
                  {node}
                </span>
                {idx < treeVisitedNodes.length - 1 && (
                  <ChevronRight className="w-3 h-3 text-muted-foreground/40 mx-0.5" />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  const renderHashMapVisualization = () => (
    <div className="h-auto bg-orange-50/5 dark:bg-orange-950/5 rounded-xl p-6 border border-border flex flex-col justify-between">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {hashmapBuckets.map((bucketItems, bucketIdx) => {
          const isActiveBucket = hashmapActiveBucket === bucketIdx;
          return (
            <div
              key={bucketIdx}
              className={`bg-card rounded-xl border p-4 transition-all duration-300 flex flex-col justify-between ${
                isActiveBucket
                  ? "border-amber-500 bg-amber-500/5 ring-2 ring-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                  : "border-border bg-card/40 hover:bg-card/70"
              }`}
            >
              <div>
                <div
                  className={`text-center font-bold text-sm mb-3 pb-2 border-b border-border transition-colors ${
                    isActiveBucket ? "text-amber-500 font-extrabold" : "text-foreground/80"
                  }`}
                >
                  Bucket {bucketIdx}
                </div>
                <div className="flex flex-col gap-2 justify-center items-center min-h-[90px]">
                  {bucketItems.length === 0 ? (
                    <span className="text-muted-foreground/30 text-xs italic py-4">Empty</span>
                  ) : (
                    <div className="w-full space-y-2">
                      {bucketItems.map((item, idx) => {
                        const isActiveKey = hashmapActiveKey === item.key;
                        return (
                          <div key={`${item.key}-${idx}`} className="flex flex-col items-center w-full">
                            <div
                              className={`flex items-center justify-between w-full p-2.5 rounded-lg border text-xs font-mono transition-all duration-300 transform shadow-sm ${
                                isActiveKey
                                  ? "bg-violet-600 border-violet-500 text-white shadow-md scale-105 animate-pulse"
                                  : "bg-slate-100/50 dark:bg-slate-900/50 border-border text-foreground hover:bg-slate-100 dark:hover:bg-slate-900"
                              }`}
                            >
                              <div className="font-bold truncate max-w-[70px]">{item.key}</div>
                              <div className={isActiveKey ? "text-violet-200" : "text-muted-foreground"}>
                                val: {item.val}
                              </div>
                            </div>
                            {idx < bucketItems.length - 1 && (
                              <div className="text-center py-1">
                                <span className="text-indigo-400 text-xs font-bold font-mono">↓ chain</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-center mt-6 p-3 bg-slate-100/50 dark:bg-slate-900/40 rounded-xl border border-border shadow-inner">
        <p className="text-orange-500 font-semibold text-sm">HashMap Collision Resolution via Chaining</p>
        <p className="text-xs text-muted-foreground mt-1 font-mono">Hash function: key.length % 4</p>
      </div>
    </div>
  );

  const renderVisualization = () => {
    const selectedAlgo = algorithms.find(a => a.id === selectedAlgorithm);
    switch (selectedAlgo?.visual) {
      case 'graph': return renderGraphVisualization();
      case 'tree': return renderTreeVisualization();
      case 'hashmap': return renderHashMapVisualization();
      default: return renderArrayVisualization();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
          Algorithm Visualizations
        </h1>
        <p className="text-muted-foreground text-lg">Interactive animations to understand how algorithms work</p>
      </div>

      {/* Algorithm Selection */}
      <div className="glass-card rounded-xl p-6 shadow-lg border border-border animate-fade-in">
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2 text-primary" />
          Select Algorithm
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {algorithms.map((algo) => (
            <button
              key={algo.id}
              onClick={() => {
                setSelectedAlgorithm(algo.id);
              }}
              className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                selectedAlgorithm === algo.id
                  ? 'border-primary bg-primary/10 dark:bg-primary/20 shadow-md'
                  : 'border-border bg-card/30 hover:border-primary/50 hover:bg-accent/40'
              }`}
            >
              <div className="font-semibold text-foreground flex items-center">
                {algo.name}
                {selectedAlgorithm === algo.id && (
                  <ChevronRight className="w-4 h-4 ml-auto text-primary" />
                )}
              </div>
              <div className="flex items-center mt-2 space-x-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor(algo.category)}`}>
                  {algo.category}
                </span>
                <span className="text-xs text-muted-foreground font-mono">{algo.complexity}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Visualization Area */}
      <div className="glass-card rounded-xl p-6 shadow-lg border border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">
            {algorithms.find(a => a.id === selectedAlgorithm)?.name} Visualization
          </h2>
          {algorithms.find(a => a.id === selectedAlgorithm)?.visual === 'array' && (
            <button
              onClick={generateRandomArray}
              className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg transition-colors text-sm font-medium border border-primary/20"
            >
              Randomize Array
            </button>
          )}
        </div>
        
        {renderVisualization()}

        {/* Step description */}
        {steps[currentStep] && (
          <div className="mt-4 p-4 bg-primary/5 dark:bg-primary/10 rounded-lg border border-border animate-fade-in">
            <p className="text-foreground font-medium">{steps[currentStep].description}</p>
          </div>
        )}
      </div>

      {/* Controls */}
      {steps.length > 0 && (
        <div className="glass-card rounded-xl p-6 shadow-lg border border-border animate-fade-in">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={stepBackward}
              disabled={currentStep === 0}
              className="p-3 bg-card hover:bg-accent rounded-full shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-border text-foreground"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            
            <button
              onClick={togglePlayPause}
              className="p-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            
            <button
              onClick={stepForward}
              disabled={currentStep >= steps.length - 1}
              className="p-3 bg-card hover:bg-accent rounded-full shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-border text-foreground"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <button
              onClick={resetVisualization}
              className="px-4 py-2 bg-card hover:bg-accent text-foreground rounded-lg shadow-md hover:shadow-lg transition-all border border-border"
            >
              <RotateCcw className="w-4 h-4 inline mr-2 animate-spin-slow" />
              Reset
            </button>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-violet-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Speed control */}
          <div className="mt-4 flex items-center justify-center gap-4">
            <span className="text-sm text-muted-foreground">Speed:</span>
            <input
              type="range"
              min="100"
              max="2000"
              step="100"
              value={2100 - speed}
              onChange={(e) => setSpeed(2100 - parseInt(e.target.value))}
              className="w-32 accent-primary"
            />
            <span className="text-sm text-muted-foreground w-16">{speed}ms</span>
          </div>
        </div>
      )}

      {/* Algorithm Info */}
      <div className="glass-card rounded-xl p-6 shadow-lg border border-border animate-fade-in">
        <h3 className="text-xl font-bold text-foreground mb-4">Algorithm Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card/40 p-4 rounded-lg shadow-sm border border-border">
            <h4 className="font-semibold text-foreground mb-2">How it works</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {selectedAlgorithm === 'bubble-sort' && "Bubble sort repeatedly compares adjacent elements and swaps them if they're in the wrong order, 'bubbling' larger elements to the end."}
              {selectedAlgorithm === 'merge-sort' && "Merge sort divides the array into halves, recursively sorts them, and merges the sorted halves back together."}
              {selectedAlgorithm === 'quick-sort' && "Quick sort picks a pivot element, partitions the array around it, and recursively sorts the partitions."}
              {selectedAlgorithm === 'binary-search' && "Binary search repeatedly divides the search interval in half, comparing the middle element to the target value."}
              {selectedAlgorithm === 'bfs-graph' && "BFS explores graph level by level, visiting all neighbors before moving to the next level. Uses a queue data structure."}
              {selectedAlgorithm === 'dfs-graph' && "DFS explores as far as possible along each branch before backtracking. Uses a stack or recursion."}
              {selectedAlgorithm === 'binary-tree-traversal' && "Tree traversal visits each node in a specific order: inorder (left-root-right), preorder (root-left-right), or postorder (left-right-root)."}
              {selectedAlgorithm === 'hash-map-ops' && "HashMap uses a hash function to map keys to buckets, providing O(1) average-case lookup, insertion, and deletion."}
            </p>
          </div>
          <div className="bg-card/40 p-4 rounded-lg shadow-sm border border-border">
            <h4 className="font-semibold text-foreground mb-2">Time Complexity</h4>
            <p className="text-muted-foreground text-sm">
              <span className="font-mono bg-muted px-2.5 py-1 rounded-lg text-primary font-bold">
                {algorithms.find(a => a.id === selectedAlgorithm)?.complexity}
              </span>
            </p>
          </div>
          <div className="bg-card/40 p-4 rounded-lg shadow-sm border border-border">
            <h4 className="font-semibold text-foreground mb-2">Space Complexity</h4>
            <p className="text-muted-foreground text-sm">
              <span className="font-mono bg-muted px-2.5 py-1 rounded-lg text-primary font-bold mb-2 inline-block">
                {selectedAlgorithm.includes('graph') ? 'O(V)' : 
                 selectedAlgorithm.includes('tree') ? 'O(h)' : 
                 selectedAlgorithm.includes('hash') ? 'O(n)' : 
                 selectedAlgorithm === 'merge-sort' ? 'O(n)' : 'O(1)'}
              </span>
              <span className="block mt-2 text-xs leading-relaxed text-muted-foreground">
                {selectedAlgorithm.includes('graph') ? ' Space for visited array and queue/stack' :
                 selectedAlgorithm.includes('tree') ? ' Recursion stack depth (height of tree)' :
                 selectedAlgorithm.includes('hash') ? ' Space for storing key-value pairs' :
                 selectedAlgorithm === 'merge-sort' ? ' Additional space for merging' :
                 ' Only uses a constant amount of additional memory space.'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualizationsFixed;
