
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

  // Tree visualization state
  const [treeNodes, setTreeNodes] = useState([
    { id: 1, value: 50, x: 300, y: 50, visited: false },
    { id: 2, value: 30, x: 200, y: 150, visited: false },
    { id: 3, value: 70, x: 400, y: 150, visited: false },
    { id: 4, value: 20, x: 150, y: 250, visited: false },
    { id: 5, value: 40, x: 250, y: 250, visited: false },
  ]);

  // Graph visualization state
  const [graphNodes, setGraphNodes] = useState([
    { id: 'A', x: 100, y: 100, visited: false },
    { id: 'B', x: 300, y: 100, visited: false },
    { id: 'C', x: 200, y: 200, visited: false },
    { id: 'D', x: 400, y: 200, visited: false },
  ]);

  const algorithmCategories = {
    sorting: [
      { id: "bubble-sort", name: "Bubble Sort", complexity: "O(n²)" },
      { id: "merge-sort", name: "Merge Sort", complexity: "O(n log n)" },
      { id: "quick-sort", name: "Quick Sort", complexity: "O(n log n)" },
      { id: "insertion-sort", name: "Insertion Sort", complexity: "O(n²)" },
      { id: "selection-sort", name: "Selection Sort", complexity: "O(n²)" },
    ],
    trees: [
      { id: "binary-search", name: "Binary Search Tree", complexity: "O(log n)" },
      { id: "tree-traversal", name: "Tree Traversal (DFS)", complexity: "O(n)" },
      { id: "bfs-tree", name: "Tree Traversal (BFS)", complexity: "O(n)" },
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
      { id: "collision-resolution", name: "Collision Resolution", complexity: "O(1)" },
      { id: "rehashing", name: "Rehashing", complexity: "O(n)" },
    ]
  };

  const bubbleSortSteps = [
    { comparing: [0, 1], swapping: [], description: "Compare elements at positions 0 and 1" },
    { comparing: [0, 1], swapping: [0, 1], description: "Swap 64 and 34 since 64 > 34" },
    { comparing: [1, 2], swapping: [], description: "Compare elements at positions 1 and 2" },
    { comparing: [1, 2], swapping: [1, 2], description: "Swap 64 and 25 since 64 > 25" },
    { comparing: [2, 3], swapping: [], description: "Compare elements at positions 2 and 3" },
    { comparing: [2, 3], swapping: [2, 3], description: "Swap 64 and 12 since 64 > 12" },
  ];

  const resetVisualization = () => {
    setArray([64, 34, 25, 12, 22, 11, 90]);
    setCurrentStep(0);
    setComparing([]);
    setSwapping([]);
    setIsPlaying(false);
    
    // Reset tree nodes
    setTreeNodes(prev => prev.map(node => ({ ...node, visited: false })));
    
    // Reset graph nodes
    setGraphNodes(prev => prev.map(node => ({ ...node, visited: false })));
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentStep < bubbleSortSteps.length) {
      interval = setTimeout(() => {
        const step = bubbleSortSteps[currentStep];
        setComparing(step.comparing);
        setSwapping(step.swapping);
        
        if (step.swapping.length > 0) {
          const newArray = [...array];
          const [i, j] = step.swapping;
          [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
          setArray(newArray);
        }
        
        setCurrentStep(currentStep + 1);
      }, speed);
    } else if (currentStep >= bubbleSortSteps.length) {
      setIsPlaying(false);
    }
    
    return () => clearTimeout(interval);
  }, [isPlaying, currentStep, speed]);

  const getBarColor = (index: number) => {
    if (swapping.includes(index)) return "bg-red-500";
    if (comparing.includes(index)) return "bg-yellow-500";
    return "bg-blue-500";
  };

  const renderSortingVisualization = () => (
    <div className="space-y-6">
      {/* Array Visualization */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-end justify-center space-x-2 h-64">
          {array.map((value, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div
                className={`${getBarColor(index)} rounded-t transition-all duration-300 min-w-[40px] flex items-end justify-center text-white font-bold pb-2`}
                style={{ height: `${(value / Math.max(...array)) * 200}px` }}
              >
                {value}
              </div>
              <div className="text-sm text-gray-600">{index}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Step Description */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-2">Step: {currentStep + 1}</h3>
        <p className="text-gray-600">
          {currentStep < bubbleSortSteps.length 
            ? bubbleSortSteps[currentStep]?.description || "Starting bubble sort..."
            : "Sorting complete! The array is now sorted in ascending order."
          }
        </p>
      </div>
    </div>
  );

  const renderTreeVisualization = () => (
    <div className="bg-gray-50 rounded-lg p-6 h-80 relative overflow-hidden">
      <svg width="100%" height="100%" className="absolute inset-0">
        {/* Tree edges */}
        <line x1="300" y1="50" x2="200" y2="150" stroke="#e5e7eb" strokeWidth="2" />
        <line x1="300" y1="50" x2="400" y2="150" stroke="#e5e7eb" strokeWidth="2" />
        <line x1="200" y1="150" x2="150" y2="250" stroke="#e5e7eb" strokeWidth="2" />
        <line x1="200" y1="150" x2="250" y2="250" stroke="#e5e7eb" strokeWidth="2" />
        
        {/* Tree nodes */}
        {treeNodes.map((node) => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r="25"
              fill={node.visited ? "#10b981" : "#3b82f6"}
              stroke="#ffffff"
              strokeWidth="2"
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
  );

  const renderGraphVisualization = () => (
    <div className="bg-gray-50 rounded-lg p-6 h-80 relative overflow-hidden">
      <svg width="100%" height="100%" className="absolute inset-0">
        {/* Graph edges */}
        <line x1="100" y1="100" x2="300" y2="100" stroke="#e5e7eb" strokeWidth="2" />
        <line x1="100" y1="100" x2="200" y2="200" stroke="#e5e7eb" strokeWidth="2" />
        <line x1="300" y1="100" x2="400" y2="200" stroke="#e5e7eb" strokeWidth="2" />
        <line x1="200" y1="200" x2="400" y2="200" stroke="#e5e7eb" strokeWidth="2" />
        
        {/* Graph nodes */}
        {graphNodes.map((node) => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r="30"
              fill={node.visited ? "#10b981" : "#3b82f6"}
              stroke="#ffffff"
              strokeWidth="3"
            />
            <text
              x={node.x}
              y={node.y + 5}
              textAnchor="middle"
              className="text-white font-bold"
            >
              {node.id}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );

  const renderVisualization = () => {
    switch (selectedCategory) {
      case "sorting":
        return renderSortingVisualization();
      case "trees":
        return renderTreeVisualization();
      case "graphs":
        return renderGraphVisualization();
      default:
        return renderSortingVisualization();
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
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 hover:border-gray-300 text-gray-700"
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
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 hover:border-gray-300 text-gray-700"
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
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={togglePlayPause}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? "Pause" : "Play"}</span>
              </button>
              <button
                onClick={resetVisualization}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>

        {renderVisualization()}

        {/* Legend */}
        <div className="mt-6 flex justify-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-600">Default</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span className="text-sm text-gray-600">Comparing</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-sm text-gray-600">Swapping</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-600">Visited/Sorted</span>
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
              This algorithm demonstrates the step-by-step process of solving the problem with visual feedback.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Time Complexity</h4>
            <p className="text-gray-600 text-sm">
              {algorithmCategories[selectedCategory as keyof typeof algorithmCategories]?.find(a => a.id === selectedAlgorithm)?.complexity}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Use Cases</h4>
            <p className="text-gray-600 text-sm">
              Understanding when and where to apply this algorithm in real-world scenarios.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedVisualizations;
