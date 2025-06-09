
import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Settings, ChevronRight } from "lucide-react";

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
    { id: "bubble-sort", name: "Bubble Sort", category: "Sorting", complexity: "O(n²)" },
    { id: "merge-sort", name: "Merge Sort", category: "Sorting", complexity: "O(n log n)" },
    { id: "quick-sort", name: "Quick Sort", category: "Sorting", complexity: "O(n log n)" },
    { id: "binary-search", name: "Binary Search", category: "Search", complexity: "O(log n)" },
    { id: "linear-search", name: "Linear Search", category: "Search", complexity: "O(n)" },
    { id: "insertion-sort", name: "Insertion Sort", category: "Sorting", complexity: "O(n²)" },
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
    if (sorted.includes(index)) return "bg-gradient-to-t from-green-500 to-green-400";
    if (swapping.includes(index)) return "bg-gradient-to-t from-red-500 to-red-400";
    if (comparing.includes(index)) return "bg-gradient-to-t from-yellow-500 to-yellow-400";
    return "bg-gradient-to-t from-blue-500 to-blue-400";
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Sorting': return 'bg-blue-100 text-blue-800';
      case 'Search': return 'bg-green-100 text-green-800';
      case 'Graph': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Algorithm Visualizations
        </h1>
        <p className="text-gray-600 text-lg">Interactive animations to understand how algorithms work</p>
      </div>

      {/* Algorithm Selection */}
      <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 shadow-lg border border-blue-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Choose Algorithm</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {algorithms.map((algo) => (
            <button
              key={algo.id}
              onClick={() => setSelectedAlgorithm(algo.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-center group ${
                selectedAlgorithm === algo.id
                  ? "border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 shadow-md"
                  : "border-gray-200 hover:border-blue-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <div className="font-medium text-sm">{algo.name}</div>
              <div className={`text-xs mt-1 px-2 py-1 rounded-full ${getCategoryColor(algo.category)}`}>
                {algo.category}
              </div>
              <div className="text-xs text-gray-500 mt-1">{algo.complexity}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Visualization Area */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 space-y-4 lg:space-y-0">
          <h2 className="text-xl font-bold text-gray-800">
            {algorithms.find(a => a.id === selectedAlgorithm)?.name} Visualization
          </h2>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Settings className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-600">Speed:</span>
              <input
                type="range"
                min="200"
                max="2000"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-20"
              />
              <span className="text-xs text-gray-500">{speed}ms</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={stepBackward}
                disabled={currentStep === 0}
                className="bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ←
              </button>
              
              <button
                onClick={togglePlayPause}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? "Pause" : "Play"}</span>
              </button>
              
              <button
                onClick={stepForward}
                disabled={currentStep >= steps.length - 1}
                className="bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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

        {/* Array Visualization */}
        <div className="mb-6">
          <div className="flex items-end justify-center space-x-3 h-80 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
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
                <div className="text-sm font-medium text-gray-700 bg-white px-2 py-1 rounded shadow-sm">
                  {index}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-600">{currentStep + 1} / {steps.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Description */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
          <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
            <ChevronRight className="w-4 h-4 mr-1 text-blue-600" />
            Step {currentStep + 1}: Current Operation
          </h3>
          <p className="text-gray-700">
            {steps[currentStep]?.description || "Click play to start the visualization"}
          </p>
        </div>

        {/* Legend */}
        <div className="mt-6 flex justify-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-t from-blue-500 to-blue-400 rounded border border-white border-opacity-30"></div>
            <span className="text-sm text-gray-600">Default</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-t from-yellow-500 to-yellow-400 rounded border border-white border-opacity-30"></div>
            <span className="text-sm text-gray-600">Comparing</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-t from-red-500 to-red-400 rounded border border-white border-opacity-30"></div>
            <span className="text-sm text-gray-600">Swapping</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-t from-green-500 to-green-400 rounded border border-white border-opacity-30"></div>
            <span className="text-sm text-gray-600">Sorted</span>
          </div>
        </div>
      </div>

      {/* Algorithm Info */}
      <div className="bg-gradient-to-br from-white to-purple-50 rounded-xl p-6 shadow-lg border border-purple-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4">About Bubble Sort</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h4 className="font-semibold text-gray-800 mb-2">How it works</h4>
            <p className="text-gray-600 text-sm">
              Bubble sort repeatedly compares adjacent elements and swaps them if they're in the wrong order, "bubbling" larger elements to the end.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h4 className="font-semibold text-gray-800 mb-2">Time Complexity</h4>
            <p className="text-gray-600 text-sm">
              <span className="font-mono bg-gray-100 px-2 py-1 rounded">Best: O(n)</span><br/>
              <span className="font-mono bg-gray-100 px-2 py-1 rounded">Average: O(n²)</span><br/>
              <span className="font-mono bg-gray-100 px-2 py-1 rounded">Worst: O(n²)</span>
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h4 className="font-semibold text-gray-800 mb-2">Space Complexity</h4>
            <p className="text-gray-600 text-sm">
              <span className="font-mono bg-gray-100 px-2 py-1 rounded">O(1)</span> - Only uses a constant amount of additional memory space for temporary variables.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualizationsFixed;
