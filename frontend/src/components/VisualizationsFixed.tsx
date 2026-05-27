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

  // Unified Switch for Step Generators
  const generateStepsForAlgorithm = (algoId: string, initialArray: number[]) => {
    switch (algoId) {
      case "merge-sort":
        return generateMergeSortSteps(initialArray);
      case "quick-sort":
        return generateQuickSortSteps(initialArray);
      case "binary-search":
        return generateBinarySearchSteps(initialArray);
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
        const step = steps[currentStep];
        setComparing(step.comparing);
        setSwapping(step.swapping);
        setArray(step.array);
        setSorted(step.sorted);
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
      setComparing(step.comparing || []);
      setSwapping(step.swapping || []);
      setArray(step.array || array);
      setSorted(step.sorted || []);
    }
  }, [currentStep]);

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

  const renderGraphVisualization = () => (
    <div className="h-80 bg-purple-50/10 dark:bg-purple-950/10 rounded-xl p-6 border border-border">
      <div className="flex justify-center items-center h-full">
        <svg width="400" height="250" viewBox="0 0 400 250">
          <line x1="100" y1="50" x2="200" y2="50" stroke="currentColor" className="text-muted-foreground" strokeWidth="2" />
          <line x1="100" y1="50" x2="50" y2="150" stroke="currentColor" className="text-muted-foreground" strokeWidth="2" />
          <line x1="100" y1="50" x2="150" y2="150" stroke="currentColor" className="text-muted-foreground" strokeWidth="2" />
          <line x1="200" y1="50" x2="250" y2="150" stroke="currentColor" className="text-muted-foreground" strokeWidth="2" />
          <line x1="200" y1="50" x2="300" y2="150" stroke="currentColor" className="text-muted-foreground" strokeWidth="2" />
          <line x1="50" y1="150" x2="150" y2="150" stroke="currentColor" className="text-muted-foreground" strokeWidth="2" />
          
          <circle cx="100" cy="50" r="20" fill="#8b5cf6" stroke="white" strokeWidth="2" />
          <text x="100" y="55" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">A</text>
          
          <circle cx="200" cy="50" r="20" fill="#8b5cf6" stroke="white" strokeWidth="2" />
          <text x="200" y="55" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">B</text>
          
          <circle cx="50" cy="150" r="20" fill="#6366f1" stroke="white" strokeWidth="2" />
          <text x="50" y="155" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">C</text>
          
          <circle cx="150" cy="150" r="20" fill="#6366f1" stroke="white" strokeWidth="2" />
          <text x="150" y="155" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">D</text>
          
          <circle cx="250" cy="150" r="20" fill="#6366f1" stroke="white" strokeWidth="2" />
          <text x="250" y="155" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">E</text>
          
          <circle cx="300" cy="150" r="20" fill="#6366f1" stroke="white" strokeWidth="2" />
          <text x="300" y="155" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">F</text>
        </svg>
      </div>
      <div className="text-center mt-4">
        <p className="text-primary font-medium">Graph Traversal Visualization</p>
        <p className="text-sm text-muted-foreground mt-1">Nodes will highlight during BFS/DFS traversal</p>
      </div>
    </div>
  );

  const renderTreeVisualization = () => (
    <div className="h-80 bg-green-50/10 dark:bg-green-950/10 rounded-xl p-6 border border-border">
      <div className="flex justify-center items-center h-full">
        <svg width="350" height="220" viewBox="0 0 350 220">
          <line x1="175" y1="30" x2="125" y2="80" stroke="currentColor" className="text-muted-foreground" strokeWidth="2" />
          <line x1="175" y1="30" x2="225" y2="80" stroke="currentColor" className="text-muted-foreground" strokeWidth="2" />
          <line x1="125" y1="80" x2="100" y2="130" stroke="currentColor" className="text-muted-foreground" strokeWidth="2" />
          <line x1="125" y1="80" x2="150" y2="130" stroke="currentColor" className="text-muted-foreground" strokeWidth="2" />
          <line x1="225" y1="80" x2="200" y2="130" stroke="currentColor" className="text-muted-foreground" strokeWidth="2" />
          <line x1="225" y1="80" x2="250" y2="130" stroke="currentColor" className="text-muted-foreground" strokeWidth="2" />
          
          <circle cx="175" cy="30" r="18" fill="#10b981" stroke="white" strokeWidth="2" />
          <text x="175" y="35" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">1</text>
          
          <circle cx="125" cy="80" r="18" fill="#059669" stroke="white" strokeWidth="2" />
          <text x="125" y="85" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">2</text>
          
          <circle cx="225" cy="80" r="18" fill="#059669" stroke="white" strokeWidth="2" />
          <text x="225" y="85" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">3</text>
          
          <circle cx="100" cy="130" r="18" fill="#047857" stroke="white" strokeWidth="2" />
          <text x="100" y="135" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">4</text>
          
          <circle cx="150" cy="130" r="18" fill="#047857" stroke="white" strokeWidth="2" />
          <text x="150" y="135" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">5</text>
          
          <circle cx="200" cy="130" r="18" fill="#047857" stroke="white" strokeWidth="2" />
          <text x="200" y="135" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">6</text>
          
          <circle cx="250" cy="130" r="18" fill="#047857" stroke="white" strokeWidth="2" />
          <text x="250" y="135" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">7</text>
        </svg>
      </div>
      <div className="text-center mt-4">
        <p className="text-emerald-500 font-medium">Binary Tree Structure</p>
        <p className="text-sm text-muted-foreground mt-1">Inorder: 4,2,5,1,6,3,7 | Preorder: 1,2,4,5,3,6,7</p>
      </div>
    </div>
  );

  const renderHashMapVisualization = () => (
    <div className="h-80 bg-orange-50/10 dark:bg-orange-950/10 rounded-xl p-6 border border-border">
      <div className="grid grid-cols-4 gap-4 h-full">
        {[0, 1, 2, 3].map(bucket => (
          <div key={bucket} className="bg-card rounded-lg border border-border p-3">
            <div className="text-center text-primary font-bold mb-2">Bucket {bucket}</div>
            <div className="space-y-2">
              {bucket === 0 && (
                <div className="bg-orange-100/50 dark:bg-orange-950/20 p-2 rounded text-xs">
                  <div className="font-mono text-foreground">key: "apple"</div>
                  <div className="font-mono text-muted-foreground">val: 5</div>
                </div>
              )}
              {bucket === 1 && (
                <div className="bg-orange-100/50 dark:bg-orange-950/20 p-2 rounded text-xs">
                  <div className="font-mono text-foreground">key: "banana"</div>
                  <div className="font-mono text-muted-foreground">val: 3</div>
                </div>
              )}
              {bucket === 2 && (
                <>
                  <div className="bg-orange-100/50 dark:bg-orange-950/20 p-2 rounded text-xs">
                    <div className="font-mono text-foreground">key: "orange"</div>
                    <div className="font-mono text-muted-foreground">val: 8</div>
                  </div>
                  <div className="bg-orange-100/50 dark:bg-orange-950/20 p-2 rounded text-xs">
                    <div className="font-mono text-foreground">key: "grape"</div>
                    <div className="font-mono text-muted-foreground">val: 2</div>
                  </div>
                </>
              )}
              {bucket === 3 && (
                <div className="text-muted-foreground text-xs text-center py-4">empty</div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <p className="text-orange-500 font-medium">HashMap with Chaining</p>
        <p className="text-sm text-muted-foreground mt-1">Hash function: key.length % 4</p>
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
        {algorithms.find(a => a.id === selectedAlgorithm)?.visual === 'array' && steps[currentStep] && (
          <div className="mt-4 p-4 bg-primary/5 dark:bg-primary/10 rounded-lg border border-border">
            <p className="text-foreground font-medium">{steps[currentStep].description}</p>
          </div>
        )}
      </div>

      {/* Controls */}
      {algorithms.find(a => a.id === selectedAlgorithm)?.visual === 'array' && (
        <div className="glass-card rounded-xl p-6 shadow-lg border border-border">
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
