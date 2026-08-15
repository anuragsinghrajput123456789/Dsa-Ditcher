'use client';

import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Settings, ChevronRight, SkipForward, SkipBack } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function VisualizationsFixed() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubble-sort");
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [array, setArray] = useState([64, 34, 25, 12, 22, 11, 90]);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<any[]>([]);

  const algorithms = [
    { id: "bubble-sort", name: "Bubble Sort", category: "Sorting", complexity: "O(n²)" },
    { id: "merge-sort", name: "Merge Sort", category: "Sorting", complexity: "O(n log n)" },
    { id: "quick-sort", name: "Quick Sort", category: "Sorting", complexity: "O(n log n)" },
    { id: "bfs-graph", name: "BFS Graph", category: "Graph", complexity: "O(V + E)" },
    { id: "dfs-graph", name: "DFS Graph", category: "Graph", complexity: "O(V + E)" },
    { id: "hash-map-ops", name: "HashMap Collisions", category: "Hash", complexity: "O(1)" },
  ];

  // 1. Bubble Sort Generator
  const generateBubbleSortSteps = (initialArray: number[]) => {
    const generated = [];
    const arr = [...initialArray];
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        generated.push({
          comparing: [j, j + 1],
          swapping: [],
          array: [...arr],
          description: `Compare element ${arr[j]} at index ${j} with ${arr[j + 1]} at index ${j + 1}`,
          sorted: Array.from({ length: i }, (_, k) => n - 1 - k)
        });
        
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          generated.push({
            comparing: [j, j + 1],
            swapping: [j, j + 1],
            array: [...arr],
            description: `Swap ${arr[j + 1]} and ${arr[j]} since ${arr[j + 1]} > ${arr[j]}`,
            sorted: Array.from({ length: i }, (_, k) => n - 1 - k)
          });
        }
      }
    }
    
    generated.push({
      comparing: [],
      swapping: [],
      array: [...arr],
      description: "Sorting complete! Array is ordered.",
      sorted: Array.from({ length: n }, (_, i) => i)
    });
    
    return generated;
  };

  useEffect(() => {
    if (selectedAlgorithm === "bubble-sort") {
      const generated = generateBubbleSortSteps(array);
      setSteps(generated);
      setCurrentStep(0);
    }
  }, [selectedAlgorithm]);

  useEffect(() => {
    let timer: any;
    if (isPlaying && steps.length > 0) {
      timer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, steps, speed]);

  const activeStep = steps[currentStep] || {
    array,
    comparing: [],
    swapping: [],
    sorted: [],
    description: "Ready to start visualization."
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setArray([64, 34, 25, 12, 22, 11, 90]);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white via-violet-200 to-violet-400 bg-clip-text text-transparent">
          Interactive Algorithm Visualizers
        </h1>
        <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
          Step-by-step state animations of sorting algorithms, graph traversals, and hash table collisions.
        </p>
      </div>

      {/* Control Panel */}
      <div className="bg-card rounded-2xl p-6 border border-border/80 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase">Algorithm:</span>
            <select
              value={selectedAlgorithm}
              onChange={(e) => setSelectedAlgorithm(e.target.value)}
              className="bg-background border border-input text-xs rounded-xl px-3 py-1.5 font-medium focus:ring-1 focus:ring-violet-500 outline-none"
            >
              {algorithms.map((algo) => (
                <option key={algo.id} value={algo.id}>{algo.name} ({algo.complexity})</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" onClick={handleReset} className="text-xs gap-1">
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
              className="text-xs"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant="gradient"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-xs gap-1"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? "Pause" : "Play"}</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))}
              disabled={currentStep >= steps.length - 1}
              className="text-xs"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </Button>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-muted-foreground font-semibold">Speed:</span>
            <input
              type="range"
              min="200"
              max="2000"
              step="200"
              value={2200 - speed}
              onChange={(e) => setSpeed(2200 - Number(e.target.value))}
              className="w-24 accent-violet-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Step Info */}
        <div className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/20 text-xs font-mono text-violet-300">
          <strong>Step {currentStep + 1}/{steps.length || 1}:</strong> {activeStep.description}
        </div>

        {/* Bar Visualization Canvas */}
        <div className="h-64 bg-background/80 rounded-2xl border border-border p-6 flex items-end justify-center gap-3">
          {activeStep.array?.map((val: number, idx: number) => {
            const isComparing = activeStep.comparing?.includes(idx);
            const isSwapping = activeStep.swapping?.includes(idx);
            const isSorted = activeStep.sorted?.includes(idx);

            let barColor = "bg-violet-600/80 border-violet-400/40";
            if (isComparing) barColor = "bg-amber-500 border-amber-300 animate-pulse";
            if (isSwapping) barColor = "bg-rose-500 border-rose-300 scale-105";
            if (isSorted) barColor = "bg-emerald-500 border-emerald-300";

            return (
              <div key={idx} className="flex flex-col items-center gap-2 flex-1 max-w-[50px] transition-all duration-300">
                <span className="text-[10px] font-mono text-muted-foreground">{val}</span>
                <div
                  className={`w-full rounded-t-lg border transition-all duration-300 shadow-md ${barColor}`}
                  style={{ height: `${(val / 100) * 180}px` }}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default VisualizationsFixed;
