
import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Settings } from "lucide-react";

const Visualizations = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubble-sort");
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [array, setArray] = useState([64, 34, 25, 12, 22, 11, 90]);
  const [currentStep, setCurrentStep] = useState(0);
  const [comparing, setComparing] = useState<number[]>([]);
  const [swapping, setSwapping] = useState<number[]>([]);

  const algorithms = [
    { id: "bubble-sort", name: "Bubble Sort", category: "Sorting" },
    { id: "merge-sort", name: "Merge Sort", category: "Sorting" },
    { id: "quick-sort", name: "Quick Sort", category: "Sorting" },
    { id: "binary-search", name: "Binary Search", category: "Search" },
    { id: "dfs", name: "Depth First Search", category: "Graph" },
    { id: "bfs", name: "Breadth First Search", category: "Graph" },
  ];

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
    if (swapping.includes(index)) return "bg-red-500 dark:bg-red-400";
    if (comparing.includes(index)) return "bg-yellow-500 dark:bg-yellow-400";
    return "bg-blue-500 dark:bg-blue-400";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Algorithm Visualizations
          </h1>
          <p className="text-muted-foreground text-lg">Watch algorithms come to life with interactive animations</p>
        </div>

        {/* Algorithm Selection */}
        <div className="bg-card dark:bg-card rounded-xl p-6 shadow-lg border border-border">
          <h2 className="text-xl font-bold text-card-foreground mb-4">Choose Algorithm</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {algorithms.map((algo) => (
              <button
                key={algo.id}
                onClick={() => setSelectedAlgorithm(algo.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-center hover:scale-105 ${
                  selectedAlgorithm === algo.id
                    ? "border-primary bg-primary/10 text-primary shadow-lg"
                    : "border-border hover:border-primary/50 text-card-foreground hover:bg-accent/50"
                }`}
              >
                <div className="font-medium">{algo.name}</div>
                <div className="text-sm text-muted-foreground">{algo.category}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Visualization Area */}
        <div className="bg-card dark:bg-card rounded-xl p-6 shadow-lg border border-border">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xl font-bold text-card-foreground">Bubble Sort Visualization</h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-2">
                <Settings className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Speed:</span>
                <input
                  type="range"
                  min="100"
                  max="1000"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="w-20 accent-primary"
                />
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={togglePlayPause}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 hover:scale-105 shadow-lg"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlaying ? "Pause" : "Play"}</span>
                </button>
                <button
                  onClick={resetVisualization}
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 hover:scale-105 shadow-md"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          </div>

          {/* Array Visualization */}
          <div className="mb-6">
            <div className="flex items-end justify-center space-x-2 h-64 bg-muted/30 dark:bg-muted/20 rounded-lg p-4 border border-border/50">
              {array.map((value, index) => (
                <div key={index} className="flex flex-col items-center space-y-2">
                  <div
                    className={`${getBarColor(index)} rounded-t transition-all duration-300 min-w-[40px] flex items-end justify-center text-white dark:text-white font-bold pb-2 shadow-lg animate-pulse`}
                    style={{ height: `${(value / Math.max(...array)) * 200}px` }}
                  >
                    {value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">{index}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Step Description */}
          <div className="bg-muted/50 dark:bg-muted/30 rounded-lg p-4 border border-border/50">
            <h3 className="font-semibold text-card-foreground mb-2">
              Current Step: {currentStep + 1} of {bubbleSortSteps.length}
            </h3>
            <p className="text-muted-foreground">
              {currentStep < bubbleSortSteps.length 
                ? bubbleSortSteps[currentStep]?.description || "Starting bubble sort..."
                : "Sorting complete! The array is now sorted in ascending order. 🎉"
              }
            </p>
          </div>

          {/* Legend */}
          <div className="mt-4 flex flex-wrap justify-center gap-6">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 dark:bg-blue-400 rounded"></div>
              <span className="text-sm text-muted-foreground">Default</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500 dark:bg-yellow-400 rounded"></div>
              <span className="text-sm text-muted-foreground">Comparing</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 dark:bg-red-400 rounded"></div>
              <span className="text-sm text-muted-foreground">Swapping</span>
            </div>
          </div>
        </div>

        {/* Algorithm Info */}
        <div className="bg-card dark:bg-card rounded-xl p-6 shadow-lg border border-border">
          <h3 className="text-xl font-bold text-card-foreground mb-4">About Bubble Sort</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-muted/30 dark:bg-muted/20 rounded-lg border border-border/50">
              <h4 className="font-semibold text-card-foreground mb-2 text-primary">How it works</h4>
              <p className="text-muted-foreground text-sm">
                Bubble sort repeatedly steps through the list, compares adjacent elements and swaps them if they're in the wrong order.
              </p>
            </div>
            <div className="p-4 bg-muted/30 dark:bg-muted/20 rounded-lg border border-border/50">
              <h4 className="font-semibold text-card-foreground mb-2 text-primary">Time Complexity</h4>
              <p className="text-muted-foreground text-sm">
                <span className="text-green-600 dark:text-green-400">Best: O(n)</span> | 
                <span className="text-yellow-600 dark:text-yellow-400"> Average: O(n²)</span> | 
                <span className="text-red-600 dark:text-red-400"> Worst: O(n²)</span>
              </p>
            </div>
            <div className="p-4 bg-muted/30 dark:bg-muted/20 rounded-lg border border-border/50">
              <h4 className="font-semibold text-card-foreground mb-2 text-primary">Space Complexity</h4>
              <p className="text-muted-foreground text-sm">
                <span className="text-green-600 dark:text-green-400">O(1)</span> - Only uses a constant amount of additional memory space.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visualizations;
