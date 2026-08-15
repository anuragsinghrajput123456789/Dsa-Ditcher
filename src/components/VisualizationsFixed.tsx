'use client';

import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Activity, SkipForward, SkipBack, Sliders } from "lucide-react";
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
    { id: "bfs-graph", name: "BFS Graph Traversal", category: "Graph", complexity: "O(V + E)" },
    { id: "dfs-graph", name: "DFS Graph Traversal", category: "Graph", complexity: "O(V + E)" },
    { id: "hash-map-ops", name: "HashMap Chaining", category: "Hash", complexity: "O(1)" },
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
          description: `Comparing elements ${arr[j]} at index ${j} and ${arr[j + 1]} at index ${j + 1}`,
          sorted: Array.from({ length: i }, (_, k) => n - 1 - k)
        });
        
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          generated.push({
            comparing: [j, j + 1],
            swapping: [j, j + 1],
            array: [...arr],
            description: `Swapping ${arr[j + 1]} and ${arr[j]} (${arr[j + 1]} > ${arr[j]})`,
            sorted: Array.from({ length: i }, (_, k) => n - 1 - k)
          });
        }
      }
    }
    
    generated.push({
      comparing: [],
      swapping: [],
      array: [...arr],
      description: "Sorting execution complete! All array elements ordered.",
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
    description: "Ready to launch state machine visualization."
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setArray([64, 34, 25, 12, 22, 11, 90]);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-semibold">
          <Activity className="w-3.5 h-3.5 text-violet-400" />
          <span>ALGORITHM STATE MACHINE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Interactive Algorithm Visualizer
        </h1>
        <p className="text-xs text-[#B8B1CC] max-w-2xl mx-auto">
          Step-by-step state machine animations for sorting algorithms, graph traversals, and hash collisions.
        </p>
      </div>

      {/* Control Panel */}
      <div className="glass-panel rounded-2xl p-6 border border-violet-500/20 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-violet-500/15 pb-4">
          
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-[#B8B1CC] uppercase tracking-wider">Target Algorithm:</span>
            <select
              value={selectedAlgorithm}
              onChange={(e) => setSelectedAlgorithm(e.target.value)}
              className="bg-[#05030D] border border-violet-500/30 text-xs text-white rounded-xl px-3 py-1.5 font-semibold focus:ring-1 focus:ring-violet-500 outline-none"
            >
              {algorithms.map((algo) => (
                <option key={algo.id} value={algo.id}>{algo.name} ({algo.complexity})</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleReset} className="text-xs h-9 border-violet-500/20 text-[#B8B1CC] hover:text-white">
              <RotateCcw className="w-3.5 h-3.5 mr-1" />
              Reset
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
              className="text-xs h-9 border-violet-500/20 text-[#B8B1CC] hover:text-white"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </Button>
            <Button
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold text-xs h-9 px-4 rounded-xl shadow-[0_0_12px_rgba(139,92,246,0.3)]"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 mr-1.5" /> : <Play className="w-3.5 h-3.5 mr-1.5" />}
              <span>{isPlaying ? "Pause" : "Play Animation"}</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))}
              disabled={currentStep >= steps.length - 1}
              className="text-xs h-9 border-violet-500/20 text-[#B8B1CC] hover:text-white"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </Button>
          </div>

          <div className="flex items-center space-x-2 text-xs text-[#B8B1CC]">
            <Sliders className="w-3.5 h-3.5 text-violet-400" />
            <span className="font-semibold">Speed:</span>
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

        {/* Step Information Banner */}
        <div className="p-4 rounded-xl bg-[#05030D] border border-violet-500/30 text-xs font-mono text-violet-300 flex items-center space-x-3">
          <span className="px-2 py-0.5 rounded-md bg-violet-500/20 text-violet-200 font-bold border border-violet-500/30">
            Step {currentStep + 1}/{steps.length || 1}
          </span>
          <span className="text-[#F5F3FF]">{activeStep.description}</span>
        </div>

        {/* Bar Visualization Canvas */}
        <div className="h-72 bg-[#05030D] rounded-2xl border border-violet-500/20 p-6 flex items-end justify-center gap-3 shadow-[inset_0_0_20px_rgba(5,3,13,0.9)]">
          {activeStep.array?.map((val: number, idx: number) => {
            const isComparing = activeStep.comparing?.includes(idx);
            const isSwapping = activeStep.swapping?.includes(idx);
            const isSorted = activeStep.sorted?.includes(idx);

            let barColor = "bg-violet-600/80 border-violet-400/40";
            if (isComparing) barColor = "bg-amber-500 border-amber-300 animate-pulse shadow-[0_0_15px_rgba(245,158,11,0.5)]";
            if (isSwapping) barColor = "bg-rose-500 border-rose-300 scale-105 shadow-[0_0_20px_rgba(225,29,72,0.6)]";
            if (isSorted) barColor = "bg-emerald-500 border-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.4)]";

            return (
              <div key={idx} className="flex flex-col items-center gap-2 flex-1 max-w-[55px] transition-all duration-300">
                <span className="text-[11px] font-mono font-bold text-[#B8B1CC]">{val}</span>
                <div
                  className={`w-full rounded-t-xl border transition-all duration-300 shadow-md ${barColor}`}
                  style={{ height: `${(val / 100) * 190}px` }}
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
