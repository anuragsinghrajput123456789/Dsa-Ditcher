import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Settings, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const VisualizationsFixed = () => {
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

  const [steps, setSteps] = useState(() => generateBubbleSortSteps(array));

  const resetVisualization = () => {
    const newArray = [64, 34, 25, 12, 22, 11, 90];
    setArray(newArray);
    setSteps(generateBubbleSortSteps(newArray));
    setCurrentStep(0);
    setComparing([]);
    setSwapping([]);
    setSorted([]);
    setIsPlaying(false);
  };

  const generateRandomArray = () => {
    const newArray = Array.from({ length: 7 }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
    setSteps(generateBubbleSortSteps(newArray));
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
    return "bg-gradient-to-t from-blue-500 to-blue-400";
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Sorting': return 'bg-blue-100 text-blue-800';
      case 'Search': return 'bg-emerald-100 text-emerald-800';
      case 'Graph': return 'bg-purple-100 text-purple-800';
      case 'Tree': return 'bg-green-100 text-green-800';
      case 'Hash': return 'bg-orange-100 text-orange-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const renderArrayVisualization = () => (
    <div className="flex items-end justify-center space-x-3 h-80 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 border border-slate-200">
      {array.map((value, index) => (
        <div key={`${index}-${value}`} className="flex flex-col items-center space-y-2">
          <div
            className={`${getBarColor(index)} rounded-t-lg transition-all duration-300 min-w-[50px] flex items-end justify-center text-white font-bold pb-2 shadow-lg border border-white border-opacity-30`}
            style={{ 
              height: `${(value / Math.max(...array)) * 250}px`,
              minHeight: '30px'
            }}
          >
            <span className="text-sm">{value}</span>
          </div>
          <div className="text-sm font-medium text-slate-700 bg-white px-2 py-1 rounded shadow-sm">
            {index}
          </div>
        </div>
      ))}
    </div>
  );

  const renderGraphVisualization = () => (
    <div className="h-80 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
      <div className="flex justify-center items-center h-full">
        <svg width="400" height="250" viewBox="0 0 400 250">
          <line x1="100" y1="50" x2="200" y2="50" stroke="#6366f1" strokeWidth="2" />
          <line x1="100" y1="50" x2="50" y2="150" stroke="#6366f1" strokeWidth="2" />
          <line x1="100" y1="50" x2="150" y2="150" stroke="#6366f1" strokeWidth="2" />
          <line x1="200" y1="50" x2="250" y2="150" stroke="#6366f1" strokeWidth="2" />
          <line x1="200" y1="50" x2="300" y2="150" stroke="#6366f1" strokeWidth="2" />
          <line x1="50" y1="150" x2="150" y2="150" stroke="#6366f1" strokeWidth="2" />
          
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
        <p className="text-purple-700 font-medium">Graph Traversal Visualization</p>
        <p className="text-sm text-slate-600 mt-1">Nodes will highlight during BFS/DFS traversal</p>
      </div>
    </div>
  );

  const renderTreeVisualization = () => (
    <div className="h-80 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
      <div className="flex justify-center items-center h-full">
        <svg width="350" height="220" viewBox="0 0 350 220">
          <line x1="175" y1="30" x2="125" y2="80" stroke="#059669" strokeWidth="2" />
          <line x1="175" y1="30" x2="225" y2="80" stroke="#059669" strokeWidth="2" />
          <line x1="125" y1="80" x2="100" y2="130" stroke="#059669" strokeWidth="2" />
          <line x1="125" y1="80" x2="150" y2="130" stroke="#059669" strokeWidth="2" />
          <line x1="225" y1="80" x2="200" y2="130" stroke="#059669" strokeWidth="2" />
          <line x1="225" y1="80" x2="250" y2="130" stroke="#059669" strokeWidth="2" />
          
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
        <p className="text-green-700 font-medium">Binary Tree Structure</p>
        <p className="text-sm text-slate-600 mt-1">Inorder: 4,2,5,1,6,3,7 | Preorder: 1,2,4,5,3,6,7</p>
      </div>
    </div>
  );

  const renderHashMapVisualization = () => (
    <div className="h-80 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-200">
      <div className="grid grid-cols-4 gap-4 h-full">
        {[0, 1, 2, 3].map(bucket => (
          <div key={bucket} className="bg-white rounded-lg border border-orange-300 p-3">
            <div className="text-center text-orange-700 font-bold mb-2">Bucket {bucket}</div>
            <div className="space-y-2">
              {bucket === 0 && (
                <div className="bg-orange-100 p-2 rounded text-xs">
                  <div className="font-mono">key: "apple"</div>
                  <div className="font-mono">val: 5</div>
                </div>
              )}
              {bucket === 1 && (
                <div className="bg-orange-100 p-2 rounded text-xs">
                  <div className="font-mono">key: "banana"</div>
                  <div className="font-mono">val: 3</div>
                </div>
              )}
              {bucket === 2 && (
                <>
                  <div className="bg-orange-100 p-2 rounded text-xs">
                    <div className="font-mono">key: "orange"</div>
                    <div className="font-mono">val: 8</div>
                  </div>
                  <div className="bg-orange-100 p-2 rounded text-xs">
                    <div className="font-mono">key: "grape"</div>
                    <div className="font-mono">val: 2</div>
                  </div>
                </>
              )}
              {bucket === 3 && (
                <div className="text-slate-400 text-xs text-center">empty</div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <p className="text-orange-700 font-medium">HashMap with Chaining</p>
        <p className="text-sm text-slate-600 mt-1">Hash function: key.length % 4</p>
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
        <p className="text-slate-600 text-lg">Interactive animations to understand how algorithms work</p>
      </div>

      {/* Algorithm Selection */}
      <div className="bg-gradient-to-br from-white to-violet-50 rounded-xl p-6 shadow-lg border border-violet-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2 text-violet-600" />
          Select Algorithm
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {algorithms.map((algo) => (
            <button
              key={algo.id}
              onClick={() => {
                setSelectedAlgorithm(algo.id);
                if (algo.visual === 'array') {
                  resetVisualization();
                }
              }}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                selectedAlgorithm === algo.id
                  ? 'border-violet-500 bg-violet-50 shadow-md'
                  : 'border-slate-200 hover:border-violet-300 hover:bg-violet-50/50'
              }`}
            >
              <div className="font-semibold text-slate-800 flex items-center">
                {algo.name}
                {selectedAlgorithm === algo.id && (
                  <ChevronRight className="w-4 h-4 ml-auto text-violet-500" />
                )}
              </div>
              <div className="flex items-center mt-2 space-x-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor(algo.category)}`}>
                  {algo.category}
                </span>
                <span className="text-xs text-slate-500 font-mono">{algo.complexity}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Visualization Area */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-800">
            {algorithms.find(a => a.id === selectedAlgorithm)?.name} Visualization
          </h2>
          {algorithms.find(a => a.id === selectedAlgorithm)?.visual === 'array' && (
            <button
              onClick={generateRandomArray}
              className="px-4 py-2 bg-violet-100 text-violet-700 rounded-lg hover:bg-violet-200 transition-colors text-sm font-medium"
            >
              Randomize Array
            </button>
          )}
        </div>
        
        {renderVisualization()}

        {/* Step description */}
        {algorithms.find(a => a.id === selectedAlgorithm)?.visual === 'array' && steps[currentStep] && (
          <div className="mt-4 p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg border border-violet-200">
            <p className="text-slate-700 font-medium">{steps[currentStep].description}</p>
          </div>
        )}
      </div>

      {/* Controls */}
      {algorithms.find(a => a.id === selectedAlgorithm)?.visual === 'array' && (
        <div className="bg-gradient-to-br from-slate-50 to-violet-50 rounded-xl p-6 shadow-lg border border-violet-200">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={stepBackward}
              disabled={currentStep === 0}
              className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-slate-200"
            >
              <RotateCcw className="w-5 h-5 text-slate-600" />
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
              className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-slate-200"
            >
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </button>

            <button
              onClick={resetVisualization}
              className="px-4 py-2 bg-white text-slate-700 rounded-lg shadow-md hover:shadow-lg transition-all border border-slate-200"
            >
              <RotateCcw className="w-4 h-4 inline mr-2" />
              Reset
            </button>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-slate-600 mb-2">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-violet-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Speed control */}
          <div className="mt-4 flex items-center justify-center gap-4">
            <span className="text-sm text-slate-600">Speed:</span>
            <input
              type="range"
              min="100"
              max="2000"
              step="100"
              value={2100 - speed}
              onChange={(e) => setSpeed(2100 - parseInt(e.target.value))}
              className="w-32"
            />
            <span className="text-sm text-slate-600 w-16">{speed}ms</span>
          </div>
        </div>
      )}

      {/* Algorithm Info */}
      <div className="bg-gradient-to-br from-white to-purple-50 rounded-xl p-6 shadow-lg border border-purple-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Algorithm Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
            <h4 className="font-semibold text-slate-800 mb-2">How it works</h4>
            <p className="text-slate-600 text-sm leading-relaxed">
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
          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
            <h4 className="font-semibold text-slate-800 mb-2">Time Complexity</h4>
            <p className="text-slate-600 text-sm">
              <span className="font-mono bg-slate-100 px-2 py-1 rounded">
                {algorithms.find(a => a.id === selectedAlgorithm)?.complexity}
              </span>
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
            <h4 className="font-semibold text-slate-800 mb-2">Space Complexity</h4>
            <p className="text-slate-600 text-sm">
              <span className="font-mono bg-slate-100 px-2 py-1 rounded">
                {selectedAlgorithm.includes('graph') ? 'O(V)' : 
                 selectedAlgorithm.includes('tree') ? 'O(h)' : 
                 selectedAlgorithm.includes('hash') ? 'O(n)' : 
                 selectedAlgorithm === 'merge-sort' ? 'O(n)' : 'O(1)'}
              </span>
              <span> - 
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
