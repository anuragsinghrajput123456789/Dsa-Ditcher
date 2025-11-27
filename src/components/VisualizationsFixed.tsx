
import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Settings, ChevronRight, Sparkles, Loader2 } from "lucide-react";
import { Textarea } from "./ui/textarea";
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
  
  // Custom algorithm state
  const [customAlgorithmInput, setCustomAlgorithmInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customAlgorithmInfo, setCustomAlgorithmInfo] = useState<{
    name: string;
    description: string;
    complexity: string;
    spaceComplexity: string;
  } | null>(null);

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

  const generateCustomVisualization = async () => {
    if (!customAlgorithmInput.trim()) {
      toast.error("Please enter an algorithm description");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=AIzaSyDVWX6Nk3e-xpZN9OBaX5vCLsEXbpEkp1o",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are an algorithm visualization expert. Given an algorithm description, generate step-by-step visualization data.

Algorithm Description: ${customAlgorithmInput}

Generate a JSON response with the following structure:
{
  "algorithmName": "Name of the algorithm",
  "description": "Brief description of how it works",
  "timeComplexity": "Time complexity (e.g., O(n²))",
  "spaceComplexity": "Space complexity (e.g., O(1))",
  "visualType": "array" (always use array for now),
  "initialArray": [array of 7 numbers between 1-100],
  "steps": [
    {
      "comparing": [array of indices being compared],
      "swapping": [array of indices being swapped],
      "array": [current state of array],
      "description": "Description of this step",
      "sorted": [array of indices that are in final position]
    }
  ]
}

Important:
- Generate 15-30 steps that show the algorithm execution
- Each step should have a clear description
- Make the visualization educational and easy to follow
- Ensure the steps are accurate to the algorithm
- Only respond with valid JSON, no additional text`
              }]
            }]
          })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate visualization");
      }

      const data = await response.json();
      const text = data.candidates[0].content.parts[0].text;
      
      // Extract JSON from markdown code blocks if present
      const jsonMatch = text.match(/```json\n?([\s\S]*?)\n?```/) || text.match(/```\n?([\s\S]*?)\n?```/);
      const jsonText = jsonMatch ? jsonMatch[1] : text;
      
      const result = JSON.parse(jsonText);

      // Set custom algorithm info
      setCustomAlgorithmInfo({
        name: result.algorithmName,
        description: result.description,
        complexity: result.timeComplexity,
        spaceComplexity: result.spaceComplexity
      });

      // Set visualization data
      setArray(result.initialArray);
      setSteps(result.steps);
      setCurrentStep(0);
      setComparing([]);
      setSwapping([]);
      setSorted([]);
      setIsPlaying(false);
      setSelectedAlgorithm("custom");
      setShowCustomInput(false);

      toast.success("Custom visualization generated!");
    } catch (error) {
      console.error("Error generating visualization:", error);
      toast.error("Failed to generate visualization. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

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
          {/* Graph edges */}
          <line x1="100" y1="50" x2="200" y2="50" stroke="#6366f1" strokeWidth="2" />
          <line x1="100" y1="50" x2="50" y2="150" stroke="#6366f1" strokeWidth="2" />
          <line x1="100" y1="50" x2="150" y2="150" stroke="#6366f1" strokeWidth="2" />
          <line x1="200" y1="50" x2="250" y2="150" stroke="#6366f1" strokeWidth="2" />
          <line x1="200" y1="50" x2="300" y2="150" stroke="#6366f1" strokeWidth="2" />
          <line x1="50" y1="150" x2="150" y2="150" stroke="#6366f1" strokeWidth="2" />
          
          {/* Graph nodes */}
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
          {/* Tree edges */}
          <line x1="175" y1="30" x2="125" y2="80" stroke="#059669" strokeWidth="2" />
          <line x1="175" y1="30" x2="225" y2="80" stroke="#059669" strokeWidth="2" />
          <line x1="125" y1="80" x2="100" y2="130" stroke="#059669" strokeWidth="2" />
          <line x1="125" y1="80" x2="150" y2="130" stroke="#059669" strokeWidth="2" />
          <line x1="225" y1="80" x2="200" y2="130" stroke="#059669" strokeWidth="2" />
          <line x1="225" y1="80" x2="250" y2="130" stroke="#059669" strokeWidth="2" />
          
          {/* Tree nodes */}
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
        {/* Hash buckets */}
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

      {/* Custom Algorithm Input */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 shadow-lg border border-purple-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-bold text-slate-800">AI-Powered Custom Visualizations</h2>
          </div>
          <button
            onClick={() => setShowCustomInput(!showCustomInput)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center gap-2 shadow-md"
          >
            <Sparkles className="w-4 h-4" />
            {showCustomInput ? "Hide" : "Create Custom"}
          </button>
        </div>

        {showCustomInput && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Describe the algorithm you want to visualize
              </label>
              <Textarea
                value={customAlgorithmInput}
                onChange={(e) => setCustomAlgorithmInput(e.target.value)}
                placeholder="Example: 'Selection sort algorithm that finds the minimum element and swaps it to the front' or 'Quick sort with pivot selection'"
                className="min-h-[120px] resize-none border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                disabled={isGenerating}
              />
            </div>
            <button
              onClick={generateCustomVisualization}
              disabled={isGenerating || !customAlgorithmInput.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Visualization...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Visualization
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Algorithm Selection */}
      <div className="bg-gradient-to-br from-white to-violet-50 rounded-xl p-6 shadow-lg border border-violet-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Pre-built Algorithms</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {algorithms.map((algo) => (
            <button
              key={algo.id}
              onClick={() => {
                setSelectedAlgorithm(algo.id);
                setCustomAlgorithmInfo(null);
              }}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-center group ${
                selectedAlgorithm === algo.id && !customAlgorithmInfo
                  ? "border-violet-500 bg-gradient-to-r from-violet-50 to-purple-50 text-violet-700 shadow-md"
                  : "border-slate-200 hover:border-violet-300 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <div className="font-medium text-sm">{algo.name}</div>
              <div className={`text-xs mt-1 px-2 py-1 rounded-full ${getCategoryColor(algo.category)}`}>
                {algo.category}
              </div>
              <div className="text-xs text-slate-500 mt-1">{algo.complexity}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Visualization Area */}
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl p-6 shadow-lg border border-slate-200">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {customAlgorithmInfo ? customAlgorithmInfo.name : algorithms.find(a => a.id === selectedAlgorithm)?.name} Visualization
            </h2>
            {customAlgorithmInfo && (
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs px-2 py-1 rounded-full border border-purple-200">
                  AI Generated
                </span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Settings className="w-4 h-4 text-slate-600" />
              <span className="text-sm text-slate-600">Speed:</span>
              <input
                type="range"
                min="200"
                max="2000"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-20"
              />
              <span className="text-xs text-slate-500">{speed}ms</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={stepBackward}
                disabled={currentStep === 0}
                className="bg-slate-600 text-white px-3 py-2 rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ←
              </button>
              
              <button
                onClick={togglePlayPause}
                className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 py-2 rounded-lg hover:from-emerald-700 hover:to-green-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? "Pause" : "Play"}</span>
              </button>
              
              <button
                onClick={stepForward}
                disabled={currentStep >= steps.length - 1}
                className="bg-slate-600 text-white px-3 py-2 rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                →
              </button>
              
              <button
                onClick={resetVisualization}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
              
              <button
                onClick={generateRandomArray}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Random
              </button>
            </div>
          </div>
        </div>

        {/* Visualization Container */}
        <div className="mb-6">
          {renderVisualization()}
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-700">Progress</span>
            <span className="text-sm text-slate-600">{currentStep + 1} / {steps.length}</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-violet-500 to-purple-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Description */}
        <div className="bg-gradient-to-r from-violet-50 to-indigo-50 rounded-lg p-4 border border-violet-200">
          <h3 className="font-semibold text-slate-800 mb-2 flex items-center">
            <ChevronRight className="w-4 h-4 mr-1 text-violet-600" />
            Step {currentStep + 1}: Current Operation
          </h3>
          <p className="text-slate-700">
            {steps[currentStep]?.description || "Click play to start the visualization"}
          </p>
        </div>

        {/* Legend */}
        <div className="mt-6 flex justify-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-t from-blue-500 to-blue-400 rounded border border-white border-opacity-30"></div>
            <span className="text-sm text-slate-600">Default</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-t from-amber-500 to-amber-400 rounded border border-white border-opacity-30"></div>
            <span className="text-sm text-slate-600">Comparing</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-t from-rose-500 to-rose-400 rounded border border-white border-opacity-30"></div>
            <span className="text-sm text-slate-600">Swapping</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded border border-white border-opacity-30"></div>
            <span className="text-sm text-slate-600">Sorted</span>
          </div>
        </div>
      </div>

      {/* Algorithm Info */}
      <div className="bg-gradient-to-br from-white to-purple-50 rounded-xl p-6 shadow-lg border border-purple-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Algorithm Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
            <h4 className="font-semibold text-slate-800 mb-2">How it works</h4>
            <p className="text-slate-600 text-sm">
              {customAlgorithmInfo ? customAlgorithmInfo.description : (
                <>
                  {selectedAlgorithm === 'bubble-sort' && "Bubble sort repeatedly compares adjacent elements and swaps them if they're in the wrong order, 'bubbling' larger elements to the end."}
                  {selectedAlgorithm === 'bfs-graph' && "BFS explores graph level by level, visiting all neighbors before moving to the next level. Uses a queue data structure."}
                  {selectedAlgorithm === 'dfs-graph' && "DFS explores as far as possible along each branch before backtracking. Uses a stack or recursion."}
                  {selectedAlgorithm === 'binary-tree-traversal' && "Tree traversal visits each node in a specific order: inorder (left-root-right), preorder (root-left-right), or postorder (left-right-root)."}
                  {selectedAlgorithm === 'hash-map-ops' && "HashMap uses a hash function to map keys to buckets, providing O(1) average-case lookup, insertion, and deletion."}
                </>
              )}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
            <h4 className="font-semibold text-slate-800 mb-2">Time Complexity</h4>
            <p className="text-slate-600 text-sm">
              <span className="font-mono bg-slate-100 px-2 py-1 rounded">
                {customAlgorithmInfo ? customAlgorithmInfo.complexity : algorithms.find(a => a.id === selectedAlgorithm)?.complexity}
              </span>
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
            <h4 className="font-semibold text-slate-800 mb-2">Space Complexity</h4>
            <p className="text-slate-600 text-sm">
              <span className="font-mono bg-slate-100 px-2 py-1 rounded">
                {customAlgorithmInfo ? customAlgorithmInfo.spaceComplexity : (
                  selectedAlgorithm.includes('graph') ? 'O(V)' : 
                  selectedAlgorithm.includes('tree') ? 'O(h)' : 
                  selectedAlgorithm.includes('hash') ? 'O(n)' : 'O(1)'
                )}
              </span>
              {!customAlgorithmInfo && (
                <span> - 
                  {selectedAlgorithm.includes('graph') ? ' Space for visited array and queue/stack' :
                   selectedAlgorithm.includes('tree') ? ' Recursion stack depth (height of tree)' :
                   selectedAlgorithm.includes('hash') ? ' Space for storing key-value pairs' :
                   ' Only uses a constant amount of additional memory space for temporary variables.'}
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualizationsFixed;
