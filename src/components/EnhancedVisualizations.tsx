
import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Settings, ChevronRight } from "lucide-react";

const EnhancedVisualizations = () => {
  const [selectedCategory, setSelectedCategory] = useState("sorting");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubble-sort");
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [currentStep, setCurrentStep] = useState(0);

  // Sorting visualization state
  const [array, setArray] = useState([64, 34, 25, 12, 22, 11, 90]);
  const [comparing, setComparing] = useState<number[]>([]);
  const [swapping, setSwapping] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);

  // Binary search state
  const [searchArray, setSearchArray] = useState([11, 12, 22, 25, 34, 64, 90]);
  const [searchTarget, setSearchTarget] = useState(25);
  const [searchLeft, setSearchLeft] = useState(0);
  const [searchRight, setSearchRight] = useState(6);
  const [searchMid, setSearchMid] = useState(-1);
  const [searchFound, setSearchFound] = useState(false);

  // Tree visualization state
  const [treeNodes, setTreeNodes] = useState([
    { id: 1, value: 50, x: 300, y: 50, visited: false, current: false, level: 0 },
    { id: 2, value: 30, x: 200, y: 150, visited: false, current: false, level: 1 },
    { id: 3, value: 70, x: 400, y: 150, visited: false, current: false, level: 1 },
    { id: 4, value: 20, x: 150, y: 250, visited: false, current: false, level: 2 },
    { id: 5, value: 40, x: 250, y: 250, visited: false, current: false, level: 2 },
    { id: 6, value: 60, x: 350, y: 250, visited: false, current: false, level: 2 },
    { id: 7, value: 80, x: 450, y: 250, visited: false, current: false, level: 2 },
  ]);

  // Graph visualization state
  const [graphNodes, setGraphNodes] = useState([
    { id: 'A', x: 100, y: 100, visited: false, current: false, distance: Infinity },
    { id: 'B', x: 300, y: 100, visited: false, current: false, distance: Infinity },
    { id: 'C', x: 200, y: 200, visited: false, current: false, distance: Infinity },
    { id: 'D', x: 400, y: 200, visited: false, current: false, distance: Infinity },
    { id: 'E', x: 150, y: 300, visited: false, current: false, distance: Infinity },
    { id: 'F', x: 350, y: 300, visited: false, current: false, distance: Infinity },
  ]);

  // Queue for BFS
  const [queue, setQueue] = useState<string[]>([]);
  const [stack, setStack] = useState<string[]>([]);

  // Hash map state
  const [hashMap, setHashMap] = useState([
    { bucket: 0, items: [{ key: 'apple', value: 5, hash: 0 }] },
    { bucket: 1, items: [{ key: 'banana', value: 3, hash: 1 }] },
    { bucket: 2, items: [{ key: 'orange', value: 8, hash: 2 }, { key: 'grape', value: 2, hash: 2 }] },
    { bucket: 3, items: [] },
  ]);
  const [hashOperation, setHashOperation] = useState({ type: '', key: '', value: '', highlight: -1 });

  const algorithmCategories = {
    sorting: [
      { id: "bubble-sort", name: "Bubble Sort", complexity: "O(n²)" },
      { id: "merge-sort", name: "Merge Sort", complexity: "O(n log n)" },
      { id: "quick-sort", name: "Quick Sort", complexity: "O(n log n)" },
      { id: "insertion-sort", name: "Insertion Sort", complexity: "O(n²)" },
      { id: "selection-sort", name: "Selection Sort", complexity: "O(n²)" },
    ],
    trees: [
      { id: "binary-search-tree", name: "Binary Search Tree", complexity: "O(log n)" },
      { id: "tree-traversal-dfs", name: "Tree Traversal (DFS)", complexity: "O(n)" },
      { id: "tree-traversal-bfs", name: "Tree Traversal (BFS)", complexity: "O(n)" },
      { id: "avl-rotation", name: "AVL Tree Rotation", complexity: "O(log n)" },
    ],
    graphs: [
      { id: "dfs-graph", name: "Depth First Search", complexity: "O(V + E)" },
      { id: "bfs-graph", name: "Breadth First Search", complexity: "O(V + E)" },
      { id: "dijkstra", name: "Dijkstra's Algorithm", complexity: "O(V²)" },
      { id: "kruskal", name: "Kruskal's MST", complexity: "O(E log E)" },
    ],
    arrays: [
      { id: "linear-search", name: "Linear Search", complexity: "O(n)" },
      { id: "binary-search-array", name: "Binary Search", complexity: "O(log n)" },
      { id: "two-pointers", name: "Two Pointers", complexity: "O(n)" },
      { id: "sliding-window", name: "Sliding Window", complexity: "O(n)" },
    ],
    hashing: [
      { id: "hash-insert", name: "Hash Table Insert", complexity: "O(1)" },
      { id: "hash-search", name: "Hash Table Search", complexity: "O(1)" },
      { id: "collision-resolution", name: "Collision Resolution", complexity: "O(1)" },
      { id: "rehashing", name: "Rehashing", complexity: "O(n)" },
    ]
  };

  // Get algorithm steps based on selected algorithm
  const getAlgorithmSteps = () => {
    switch (selectedAlgorithm) {
      case "bubble-sort":
        return [
          { comparing: [0, 1], swapping: [], description: "Compare elements at positions 0 and 1 (64 vs 34)", action: "compare" },
          { comparing: [0, 1], swapping: [0, 1], description: "Swap 64 and 34 since 64 > 34", action: "swap" },
          { comparing: [1, 2], swapping: [], description: "Compare elements at positions 1 and 2 (64 vs 25)", action: "compare" },
          { comparing: [1, 2], swapping: [1, 2], description: "Swap 64 and 25 since 64 > 25", action: "swap" },
          { comparing: [2, 3], swapping: [], description: "Compare elements at positions 2 and 3 (64 vs 12)", action: "compare" },
          { comparing: [2, 3], swapping: [2, 3], description: "Swap 64 and 12 since 64 > 12", action: "swap" },
          { comparing: [3, 4], swapping: [], description: "Compare elements at positions 3 and 4 (64 vs 22)", action: "compare" },
          { comparing: [3, 4], swapping: [3, 4], description: "Swap 64 and 22 since 64 > 22", action: "swap" },
          { comparing: [4, 5], swapping: [], description: "Compare elements at positions 4 and 5 (64 vs 11)", action: "compare" },
          { comparing: [4, 5], swapping: [4, 5], description: "Swap 64 and 11 since 64 > 11", action: "swap" },
          { comparing: [5, 6], swapping: [], description: "Compare elements at positions 5 and 6 (64 vs 90)", action: "compare" },
          { comparing: [], swapping: [], description: "No swap needed. First pass complete - largest element (90) is in place!", action: "complete" },
        ];
      case "binary-search-array":
        return [
          { description: `Searching for ${searchTarget} in sorted array. Initialize left=0, right=6`, action: "init" },
          { description: `Calculate mid = (0 + 6) / 2 = 3. Check array[3] = 25`, action: "calculate" },
          { description: `Found target ${searchTarget} at index 3!`, action: "found" },
        ];
      case "tree-traversal-dfs":
        return [
          { nodeId: 1, description: "Start DFS from root (50)", action: "visit" },
          { nodeId: 2, description: "Visit left child (30)", action: "visit" },
          { nodeId: 4, description: "Visit left child (20)", action: "visit" },
          { nodeId: 5, description: "Backtrack and visit right child (40)", action: "visit" },
          { nodeId: 3, description: "Backtrack to root and visit right child (70)", action: "visit" },
          { nodeId: 6, description: "Visit left child (60)", action: "visit" },
          { nodeId: 7, description: "Visit right child (80)", action: "visit" },
        ];
      case "tree-traversal-bfs":
        return [
          { nodeId: 1, description: "Start BFS from root (50). Add to queue: [50]", action: "visit" },
          { nodeId: 2, description: "Process 50, add children to queue: [30, 70]", action: "visit" },
          { nodeId: 3, description: "Process 30, add children to queue: [70, 20, 40]", action: "visit" },
          { nodeId: 4, description: "Process 70, add children to queue: [20, 40, 60, 80]", action: "visit" },
          { nodeId: 5, description: "Process remaining nodes: 20, 40, 60, 80", action: "visit" },
          { nodeId: 6, description: "Continue BFS traversal", action: "visit" },
          { nodeId: 7, description: "BFS traversal complete", action: "visit" },
        ];
      case "dfs-graph":
        return [
          { nodeId: 'A', description: "Start DFS from node A. Push A to stack", action: "visit" },
          { nodeId: 'B', description: "Visit unvisited neighbor B. Push B to stack", action: "visit" },
          { nodeId: 'D', description: "Visit unvisited neighbor D. Push D to stack", action: "visit" },
          { nodeId: 'F', description: "Visit unvisited neighbor F. Push F to stack", action: "visit" },
          { nodeId: 'C', description: "Backtrack and visit C", action: "visit" },
          { nodeId: 'E', description: "Visit remaining node E", action: "visit" },
        ];
      case "bfs-graph":
        return [
          { nodeId: 'A', description: "Start BFS from node A. Add A to queue: [A]", action: "visit" },
          { nodeId: 'B', description: "Process A, add neighbors to queue: [B, C]", action: "visit" },
          { nodeId: 'C', description: "Process B, add neighbors to queue: [C, D]", action: "visit" },
          { nodeId: 'D', description: "Process C, add neighbors to queue: [D, E]", action: "visit" },
          { nodeId: 'E', description: "Process D, add neighbors to queue: [E, F]", action: "visit" },
          { nodeId: 'F', description: "Process remaining nodes in queue", action: "visit" },
        ];
      case "hash-insert":
        return [
          { description: "Insert key 'mango' with value 6", action: "insert", key: "mango", value: 6 },
          { description: "Calculate hash: 'mango'.length % 4 = 5 % 4 = 1", action: "hash" },
          { description: "Insert into bucket 1 (collision with 'banana')", action: "collision" },
          { description: "Use chaining to resolve collision", action: "resolve" },
        ];
      case "hash-search":
        return [
          { description: "Search for key 'orange'", action: "search", key: "orange" },
          { description: "Calculate hash: 'orange'.length % 4 = 6 % 4 = 2", action: "hash" },
          { description: "Check bucket 2", action: "check" },
          { description: "Found 'orange' with value 8", action: "found" },
        ];
      default:
        return [
          { description: "Select an algorithm to see step-by-step visualization", action: "start" },
        ];
    }
  };

  const resetVisualization = () => {
    setArray([64, 34, 25, 12, 22, 11, 90]);
    setSearchArray([11, 12, 22, 25, 34, 64, 90]);
    setCurrentStep(0);
    setComparing([]);
    setSwapping([]);
    setSorted([]);
    setIsPlaying(false);
    setSearchLeft(0);
    setSearchRight(6);
    setSearchMid(-1);
    setSearchFound(false);
    setQueue([]);
    setStack([]);
    
    // Reset tree nodes
    setTreeNodes(prev => prev.map(node => ({ ...node, visited: false, current: false })));
    
    // Reset graph nodes
    setGraphNodes(prev => prev.map(node => ({ ...node, visited: false, current: false, distance: Infinity })));
    
    // Reset hash operation
    setHashOperation({ type: '', key: '', value: '', highlight: -1 });
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Main animation effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setTimeout(() => {
        const steps = getAlgorithmSteps();
        
        if (currentStep < steps.length) {
          const step = steps[currentStep];
          
          if (selectedCategory === "sorting") {
            if (step.comparing) setComparing(step.comparing);
            if (step.swapping) setSwapping(step.swapping);
            
            if (step.action === "swap" && step.swapping && step.swapping.length === 2) {
              const newArray = [...array];
              const [i, j] = step.swapping;
              [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
              setArray(newArray);
            }
          } else if (selectedCategory === "arrays" && selectedAlgorithm === "binary-search-array") {
            if (step.action === "calculate") {
              const mid = Math.floor((searchLeft + searchRight) / 2);
              setSearchMid(mid);
              if (searchArray[mid] === searchTarget) {
                setSearchFound(true);
              } else if (searchArray[mid] < searchTarget) {
                setSearchLeft(mid + 1);
              } else {
                setSearchRight(mid - 1);
              }
            }
          } else if (selectedCategory === "trees") {
            if (step.nodeId) {
              setTreeNodes(prev => prev.map(node => ({
                ...node,
                current: node.id === step.nodeId,
                visited: node.id === step.nodeId ? true : node.visited
              })));
            }
          } else if (selectedCategory === "graphs") {
            if (step.nodeId) {
              setGraphNodes(prev => prev.map(node => ({
                ...node,
                current: node.id === step.nodeId,
                visited: node.id === step.nodeId ? true : node.visited
              })));
              
              if (selectedAlgorithm === "bfs-graph") {
                setQueue(prev => [...prev, step.nodeId]);
              } else if (selectedAlgorithm === "dfs-graph") {
                setStack(prev => [...prev, step.nodeId]);
              }
            }
          } else if (selectedCategory === "hashing") {
            if (step.key) {
              setHashOperation({
                type: step.action,
                key: step.key,
                value: step.value || '',
                highlight: step.key.length % 4
              });
            }
          }
          
          setCurrentStep(currentStep + 1);
        } else {
          setIsPlaying(false);
          if (selectedCategory === "sorting") {
            setSorted(Array.from({length: array.length}, (_, i) => i));
          }
        }
      }, speed);
    }
    
    return () => clearTimeout(interval);
  }, [isPlaying, currentStep, speed, selectedCategory, selectedAlgorithm, array, searchLeft, searchRight, searchTarget, searchArray]);

  // Reset when algorithm changes
  useEffect(() => {
    resetVisualization();
  }, [selectedAlgorithm, selectedCategory]);

  const getBarColor = (index: number) => {
    if (sorted.includes(index)) return "bg-green-500";
    if (swapping.includes(index)) return "bg-red-500";
    if (comparing.includes(index)) return "bg-yellow-500";
    return "bg-blue-500";
  };

  const getSearchBarColor = (index: number) => {
    if (searchFound && index === searchMid) return "bg-green-500";
    if (index === searchMid) return "bg-yellow-500";
    if (index < searchLeft || index > searchRight) return "bg-gray-300";
    return "bg-blue-500";
  };

  const renderSortingVisualization = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-end justify-center space-x-2 h-64">
          {array.map((value, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div
                className={`${getBarColor(index)} rounded-t transition-all duration-500 min-w-[40px] flex items-end justify-center text-white font-bold pb-2 transform hover:scale-110`}
                style={{ 
                  height: `${(value / Math.max(...array)) * 200}px`,
                  transformOrigin: 'bottom'
                }}
              >
                {value}
              </div>
              <div className="text-sm text-gray-600">{index}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBinarySearchVisualization = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="mb-4 text-center">
          <p className="text-lg font-semibold">Searching for: {searchTarget}</p>
          <p className="text-sm text-gray-600">Left: {searchLeft}, Right: {searchRight}, Mid: {searchMid >= 0 ? searchMid : 'N/A'}</p>
        </div>
        <div className="flex items-end justify-center space-x-2 h-32">
          {searchArray.map((value, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div
                className={`${getSearchBarColor(index)} rounded transition-all duration-500 min-w-[50px] h-16 flex items-center justify-center text-white font-bold`}
              >
                {value}
              </div>
              <div className="text-sm text-gray-600">{index}</div>
            </div>
          ))}
        </div>
        {searchFound && (
          <div className="mt-4 text-center text-green-600 font-bold">
            Target {searchTarget} found at index {searchMid}!
          </div>
        )}
      </div>
    </div>
  );

  const renderTreeVisualization = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-6 h-80 relative overflow-hidden">
        <svg width="100%" height="100%" className="absolute inset-0">
          {/* Tree edges */}
          <line x1="300" y1="50" x2="200" y2="150" stroke="#e5e7eb" strokeWidth="2" />
          <line x1="300" y1="50" x2="400" y2="150" stroke="#e5e7eb" strokeWidth="2" />
          <line x1="200" y1="150" x2="150" y2="250" stroke="#e5e7eb" strokeWidth="2" />
          <line x1="200" y1="150" x2="250" y2="250" stroke="#e5e7eb" strokeWidth="2" />
          <line x1="400" y1="150" x2="350" y2="250" stroke="#e5e7eb" strokeWidth="2" />
          <line x1="400" y1="150" x2="450" y2="250" stroke="#e5e7eb" strokeWidth="2" />
          
          {/* Tree nodes */}
          {treeNodes.map((node) => (
            <g key={node.id} className="transition-all duration-500">
              <circle
                cx={node.x}
                cy={node.y}
                r="25"
                fill={node.current ? "#ef4444" : node.visited ? "#10b981" : "#3b82f6"}
                stroke="#ffffff"
                strokeWidth="3"
                className={`transition-all duration-500 ${node.current ? 'animate-pulse' : ''}`}
              />
              <text
                x={node.x}
                y={node.y + 5}
                textAnchor="middle"
                className="text-white font-bold text-sm"
              >
                {node.value}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );

  const renderGraphVisualization = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-6 h-80 relative overflow-hidden">
        <svg width="100%" height="100%" className="absolute inset-0">
          {/* Graph edges */}
          <line x1="100" y1="100" x2="300" y2="100" stroke="#e5e7eb" strokeWidth="3" />
          <line x1="100" y1="100" x2="200" y2="200" stroke="#e5e7eb" strokeWidth="3" />
          <line x1="300" y1="100" x2="400" y2="200" stroke="#e5e7eb" strokeWidth="3" />
          <line x1="200" y1="200" x2="400" y2="200" stroke="#e5e7eb" strokeWidth="3" />
          <line x1="200" y1="200" x2="150" y2="300" stroke="#e5e7eb" strokeWidth="3" />
          <line x1="400" y1="200" x2="350" y2="300" stroke="#e5e7eb" strokeWidth="3" />
          
          {/* Graph nodes */}
          {graphNodes.map((node) => (
            <g key={node.id} className="transition-all duration-500">
              <circle
                cx={node.x}
                cy={node.y}
                r="30"
                fill={node.current ? "#ef4444" : node.visited ? "#10b981" : "#3b82f6"}
                stroke="#ffffff"
                strokeWidth="4"
                className={`transition-all duration-500 ${node.current ? 'animate-pulse' : ''}`}
              />
              <text
                x={node.x}
                y={node.y + 5}
                textAnchor="middle"
                className="text-white font-bold text-lg"
              >
                {node.id}
              </text>
            </g>
          ))}
        </svg>
        
        {/* Queue/Stack display */}
        <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow">
          <div className="text-sm font-semibold">
            {selectedAlgorithm === "bfs-graph" ? "Queue:" : "Stack:"}
          </div>
          <div className="text-sm">
            {selectedAlgorithm === "bfs-graph" 
              ? `[${queue.join(', ')}]` 
              : `[${stack.join(', ')}]`
            }
          </div>
        </div>
      </div>
    </div>
  );

  const renderHashingVisualization = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-6 h-80">
        <div className="grid grid-cols-4 gap-4 h-full">
          {hashMap.map((bucket, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-lg border-2 p-3 transition-all duration-300 ${
                hashOperation.highlight === index ? 'border-yellow-400 bg-yellow-50' : 'border-gray-300'
              }`}
            >
              <div className="text-center font-bold mb-2 text-gray-700">Bucket {index}</div>
              <div className="space-y-2">
                {bucket.items.length > 0 ? (
                  bucket.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="bg-blue-100 p-2 rounded text-xs">
                      <div className="font-mono">key: "{item.key}"</div>
                      <div className="font-mono">val: {item.value}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-400 text-xs text-center">empty</div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Hash operation display */}
        {hashOperation.type && (
          <div className="mt-4 bg-white p-3 rounded border">
            <div className="text-sm font-semibold">Current Operation:</div>
            <div className="text-sm">
              {hashOperation.type === 'insert' && `Inserting "${hashOperation.key}" with value ${hashOperation.value}`}
              {hashOperation.type === 'search' && `Searching for "${hashOperation.key}"`}
              {hashOperation.type === 'hash' && `Hash function: "${hashOperation.key}".length % 4 = ${hashOperation.key.length} % 4 = ${hashOperation.highlight}`}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderVisualization = () => {
    if (selectedCategory === "sorting") {
      return renderSortingVisualization();
    } else if (selectedCategory === "arrays" && selectedAlgorithm === "binary-search-array") {
      return renderBinarySearchVisualization();
    } else if (selectedCategory === "trees") {
      return renderTreeVisualization();
    } else if (selectedCategory === "graphs") {
      return renderGraphVisualization();
    } else if (selectedCategory === "hashing") {
      return renderHashingVisualization();
    } else {
      return (
        <div className="bg-gray-50 rounded-lg p-6 h-80 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Algorithm Visualization</h3>
            <p className="text-gray-600">Select a specific algorithm to see step-by-step visualization</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">DSA Algorithm Visualizations</h1>
        <p className="text-gray-600 text-lg">Interactive visualizations for data structures and algorithms</p>
      </div>

      {/* Category Selection */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Choose Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.keys(algorithmCategories).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-center capitalize ${
                selectedCategory === category
                  ? "border-blue-500 bg-blue-50 text-blue-700 transform scale-105"
                  : "border-gray-200 hover:border-gray-300 text-gray-700 hover:scale-102"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Algorithm Selection */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Choose Algorithm</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {algorithmCategories[selectedCategory as keyof typeof algorithmCategories]?.map((algo) => (
            <button
              key={algo.id}
              onClick={() => setSelectedAlgorithm(algo.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                selectedAlgorithm === algo.id
                  ? "border-blue-500 bg-blue-50 text-blue-700 transform scale-105"
                  : "border-gray-200 hover:border-gray-300 text-gray-700 hover:scale-102"
              }`}
            >
              <div className="font-medium">{algo.name}</div>
              <div className="text-sm text-gray-500">{algo.complexity}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Visualization Area */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            {algorithmCategories[selectedCategory as keyof typeof algorithmCategories]?.find(a => a.id === selectedAlgorithm)?.name} Visualization
          </h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Settings className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-600">Speed:</span>
              <input
                type="range"
                min="100"
                max="1000"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-20"
              />
              <span className="text-xs text-gray-500">{speed}ms</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={togglePlayPause}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2 hover:scale-105"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? "Pause" : "Play"}</span>
              </button>
              <button
                onClick={resetVisualization}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-200 flex items-center space-x-2 hover:scale-105"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>

        {renderVisualization()}

        {/* Step Description */}
        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
            <ChevronRight className="w-4 h-4 mr-1 text-blue-600" />
            Step {currentStep + 1}: Current Operation
          </h3>
          <p className="text-gray-600">
            {currentStep < getAlgorithmSteps().length 
              ? getAlgorithmSteps()[currentStep]?.description || "Starting algorithm..."
              : "Algorithm complete!"
            }
          </p>
        </div>

        {/* Enhanced Legend */}
        <div className="mt-6 flex justify-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-600">Default</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span className="text-sm text-gray-600">Comparing/Current</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded animate-pulse"></div>
            <span className="text-sm text-gray-600">Active/Swapping</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-600">Visited/Sorted/Found</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
            <span className="text-sm text-gray-600">Inactive/Out of range</span>
          </div>
        </div>
      </div>

      {/* Algorithm Info */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Algorithm Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">How it works</h4>
            <p className="text-gray-600 text-sm">
              {selectedAlgorithm === 'bubble-sort' && "Bubble sort repeatedly compares adjacent elements and swaps them if they're in wrong order."}
              {selectedAlgorithm === 'binary-search-array' && "Binary search finds target by repeatedly dividing sorted array in half."}
              {selectedAlgorithm === 'tree-traversal-dfs' && "DFS explores tree depth-first using recursion or stack."}
              {selectedAlgorithm === 'tree-traversal-bfs' && "BFS explores tree level-by-level using a queue."}
              {selectedAlgorithm === 'dfs-graph' && "DFS explores graph depth-first, going as deep as possible before backtracking."}
              {selectedAlgorithm === 'bfs-graph' && "BFS explores graph level-by-level, visiting all neighbors before moving deeper."}
              {selectedAlgorithm.includes('hash') && "Hash table uses hash function to map keys to array indices for fast lookup."}
              {!selectedAlgorithm.includes('bubble') && !selectedAlgorithm.includes('binary') && !selectedAlgorithm.includes('tree') && !selectedAlgorithm.includes('graph') && !selectedAlgorithm.includes('hash') && "This algorithm demonstrates step-by-step problem solving with visual feedback."}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Time Complexity</h4>
            <p className="text-gray-600 text-sm">
              {algorithmCategories[selectedCategory as keyof typeof algorithmCategories]?.find(a => a.id === selectedAlgorithm)?.complexity || "N/A"}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Use Cases</h4>
            <p className="text-gray-600 text-sm">
              {selectedAlgorithm === 'bubble-sort' && "Educational purposes, small datasets where simplicity matters."}
              {selectedAlgorithm === 'binary-search-array' && "Searching in sorted arrays, finding insertion points."}
              {selectedAlgorithm.includes('tree') && "File systems, expression parsing, database indexing."}
              {selectedAlgorithm.includes('graph') && "Social networks, shortest paths, connected components."}
              {selectedAlgorithm.includes('hash') && "Caching, database indexing, fast lookups."}
              {!selectedAlgorithm.includes('bubble') && !selectedAlgorithm.includes('binary') && !selectedAlgorithm.includes('tree') && !selectedAlgorithm.includes('graph') && !selectedAlgorithm.includes('hash') && "Understanding algorithmic thinking and problem-solving patterns."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedVisualizations;
