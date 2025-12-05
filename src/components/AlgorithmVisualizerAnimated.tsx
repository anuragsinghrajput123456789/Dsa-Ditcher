import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, SkipForward, SkipBack, Sparkles, Loader2, Zap } from "lucide-react";
// Using native textarea instead of Textarea component for reliability
import { toast } from "sonner";

interface Step {
  comparing: number[];
  swapping: number[];
  array: number[];
  description: string;
  sorted: number[];
  highlight?: number[];
  pseudocodeLine?: number;
}

interface AlgorithmInfo {
  name: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  pseudocode: string[];
}

const GEMINI_API_KEY = "AIzaSyD2oB3wxwd3GrSgA4NcDNenUoSnLGH-pew";

const AlgorithmVisualizerAnimated = () => {
  const [customAlgorithmInput, setCustomAlgorithmInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(800);
  const [currentStep, setCurrentStep] = useState(0);
  const [array, setArray] = useState<number[]>([]);
  const [comparing, setComparing] = useState<number[]>([]);
  const [swapping, setSwapping] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [highlight, setHighlight] = useState<number[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [algorithmInfo, setAlgorithmInfo] = useState<AlgorithmInfo | null>(null);
  const [hasVisualization, setHasVisualization] = useState(false);

  const generateVisualization = async () => {
    if (!customAlgorithmInput.trim()) {
      toast.error("Please describe the algorithm you want to visualize");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are an algorithm visualization expert. Create a detailed step-by-step visualization for the given algorithm.

Algorithm: ${customAlgorithmInput}

Generate a JSON response with this EXACT structure (no markdown, just pure JSON):
{
  "algorithmName": "Name of the algorithm",
  "description": "Clear explanation of how the algorithm works (2-3 sentences)",
  "timeComplexity": "Time complexity (e.g., O(n²))",
  "spaceComplexity": "Space complexity (e.g., O(1))",
  "pseudocode": [
    "line 1 of pseudocode",
    "line 2 of pseudocode",
    "..."
  ],
  "initialArray": [array of 8 numbers between 10-99],
  "steps": [
    {
      "comparing": [indices being compared],
      "swapping": [indices being swapped, empty if no swap],
      "array": [current state of array after this step],
      "description": "What's happening in this step",
      "sorted": [indices that are in final sorted position],
      "highlight": [any special indices to highlight],
      "pseudocodeLine": 0
    }
  ]
}

Requirements:
- Generate 20-40 detailed steps showing the complete algorithm execution
- Each step must show the current state of the array
- Include which elements are being compared, swapped, or are in final position
- Make descriptions clear and educational
- pseudocodeLine should be 0-indexed matching the pseudocode array
- Return ONLY valid JSON, no explanations or markdown`
              }]
            }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 8192
            }
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Gemini API Error:", response.status, errorData);
        
        if (response.status === 429) {
          toast.error("API quota exceeded. Please try again later.", { duration: 5000 });
        } else if (response.status === 400) {
          toast.error("Invalid request. Please try a different algorithm description.");
        } else {
          toast.error(`API Error: ${response.status}`);
        }
        return;
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!text) {
        toast.error("No response from AI. Please try again.");
        return;
      }

      // Extract JSON from response (handle markdown code blocks)
      let jsonText = text;
      const jsonMatch = text.match(/```json\n?([\s\S]*?)\n?```/) || text.match(/```\n?([\s\S]*?)\n?```/);
      if (jsonMatch) {
        jsonText = jsonMatch[1];
      }

      const result = JSON.parse(jsonText.trim());

      // Validate result structure
      if (!result.steps || !Array.isArray(result.steps) || result.steps.length === 0) {
        toast.error("Invalid visualization data. Please try again.");
        return;
      }

      setAlgorithmInfo({
        name: result.algorithmName || "Custom Algorithm",
        description: result.description || "",
        timeComplexity: result.timeComplexity || "Unknown",
        spaceComplexity: result.spaceComplexity || "Unknown",
        pseudocode: result.pseudocode || []
      });

      setArray(result.initialArray || result.steps[0]?.array || [64, 34, 25, 12, 22, 11, 90, 45]);
      setSteps(result.steps);
      setCurrentStep(0);
      setComparing([]);
      setSwapping([]);
      setSorted([]);
      setHighlight([]);
      setIsPlaying(false);
      setHasVisualization(true);

      toast.success(`${result.algorithmName} visualization ready!`);
    } catch (error) {
      console.error("Error generating visualization:", error);
      toast.error("Failed to generate visualization. Please check your input and try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Playback effect
  useEffect(() => {
    if (!isPlaying || currentStep >= steps.length - 1) {
      if (currentStep >= steps.length - 1) setIsPlaying(false);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, speed, steps.length]);

  // Update visualization state when step changes
  useEffect(() => {
    if (steps.length > 0 && currentStep < steps.length) {
      const step = steps[currentStep];
      setArray(step.array || []);
      setComparing(step.comparing || []);
      setSwapping(step.swapping || []);
      setSorted(step.sorted || []);
      setHighlight(step.highlight || []);
    }
  }, [currentStep, steps]);

  const togglePlayPause = () => setIsPlaying(!isPlaying);
  const stepForward = () => currentStep < steps.length - 1 && setCurrentStep(prev => prev + 1);
  const stepBackward = () => currentStep > 0 && setCurrentStep(prev => prev - 1);
  const reset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    if (steps.length > 0) {
      const firstStep = steps[0];
      setArray(firstStep.array || []);
      setComparing([]);
      setSwapping([]);
      setSorted([]);
      setHighlight([]);
    }
  };

  const getBarColor = (index: number) => {
    if (sorted.includes(index)) return "from-emerald-500 to-emerald-400";
    if (swapping.includes(index)) return "from-rose-500 to-rose-400";
    if (comparing.includes(index)) return "from-amber-500 to-amber-400";
    if (highlight.includes(index)) return "from-purple-500 to-purple-400";
    return "from-blue-500 to-blue-400";
  };

  const getBarShadow = (index: number) => {
    if (sorted.includes(index)) return "shadow-emerald-500/50";
    if (swapping.includes(index)) return "shadow-rose-500/50";
    if (comparing.includes(index)) return "shadow-amber-500/50";
    if (highlight.includes(index)) return "shadow-purple-500/50";
    return "shadow-blue-500/30";
  };

  const maxValue = Math.max(...(array.length > 0 ? array : [100]));

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-2xl p-6 border border-purple-500/30 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">AI Algorithm Visualizer</h2>
            <p className="text-purple-200 text-sm">Describe any algorithm and watch it come to life</p>
          </div>
        </div>

        <textarea
          value={customAlgorithmInput}
          onChange={(e) => {
            console.log("Input changed:", e.target.value);
            setCustomAlgorithmInput(e.target.value);
          }}
          placeholder="Describe an algorithm... e.g., 'Bubble sort', 'Quick sort with pivot selection', 'Binary search on sorted array', 'Selection sort finding minimum each pass'"
          className="w-full min-h-[100px] bg-slate-900/50 border border-purple-500/30 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20 focus:outline-none mb-4 p-3 rounded-lg resize-none"
          disabled={isGenerating}
        />

        <button
          onClick={generateVisualization}
          disabled={isGenerating || !customAlgorithmInput.trim()}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/25"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating Visualization...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              Generate Visualization
            </>
          )}
        </button>
      </div>

      {/* Visualization Area */}
      <AnimatePresence mode="wait">
        {hasVisualization && algorithmInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Algorithm Info Header */}
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl p-6 border border-slate-700/50">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {algorithmInfo.name}
                </h3>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full border border-blue-500/30">
                    Time: {algorithmInfo.timeComplexity}
                  </span>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full border border-purple-500/30">
                    Space: {algorithmInfo.spaceComplexity}
                  </span>
                </div>
              </div>
              <p className="text-slate-300">{algorithmInfo.description}</p>
            </div>

            {/* Main Visualization */}
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl p-6 border border-slate-700/50">
              {/* Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <button
                    onClick={stepBackward}
                    disabled={currentStep === 0}
                    className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <SkipBack className="w-5 h-5" />
                  </button>
                  <button
                    onClick={togglePlayPause}
                    className="p-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl transition-all shadow-lg shadow-emerald-500/25"
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </button>
                  <button
                    onClick={stepForward}
                    disabled={currentStep >= steps.length - 1}
                    className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <SkipForward className="w-5 h-5" />
                  </button>
                  <button
                    onClick={reset}
                    className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-slate-400 text-sm">Speed:</span>
                  <input
                    type="range"
                    min="100"
                    max="1500"
                    value={1600 - speed}
                    onChange={(e) => setSpeed(1600 - Number(e.target.value))}
                    className="w-24 accent-purple-500"
                  />
                  <span className="text-slate-400 text-sm w-16">{speed}ms</span>
                </div>
              </div>

              {/* Array Visualization */}
              <div className="flex items-end justify-center gap-2 h-72 bg-slate-900/50 rounded-xl p-4 mb-4">
                {array.map((value, index) => (
                  <motion.div
                    key={`${index}-${currentStep}`}
                    layout
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <motion.div
                      className={`w-12 bg-gradient-to-t ${getBarColor(index)} rounded-t-lg flex items-end justify-center pb-1 shadow-lg ${getBarShadow(index)} relative overflow-hidden`}
                      style={{ height: `${(value / maxValue) * 200 + 40}px` }}
                      animate={{
                        scale: comparing.includes(index) || swapping.includes(index) ? 1.05 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <span className="text-white font-bold text-sm relative z-10">{value}</span>
                      {(swapping.includes(index) || comparing.includes(index)) && (
                        <motion.div
                          className="absolute inset-0 bg-white/20"
                          animate={{ opacity: [0, 0.5, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        />
                      )}
                    </motion.div>
                    <span className="text-slate-400 text-xs font-mono">[{index}]</span>
                  </motion.div>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-slate-400 mb-1">
                  <span>Step {currentStep + 1} of {steps.length}</span>
                  <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                    transition={{ type: "spring", stiffness: 100 }}
                  />
                </div>
              </div>

              {/* Step Description */}
              <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                <p className="text-slate-200">
                  {steps[currentStep]?.description || "Ready to start visualization..."}
                </p>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gradient-to-t from-blue-500 to-blue-400 rounded" />
                  <span className="text-slate-400 text-sm">Default</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gradient-to-t from-amber-500 to-amber-400 rounded" />
                  <span className="text-slate-400 text-sm">Comparing</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gradient-to-t from-rose-500 to-rose-400 rounded" />
                  <span className="text-slate-400 text-sm">Swapping</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded" />
                  <span className="text-slate-400 text-sm">Sorted</span>
                </div>
              </div>
            </div>

            {/* Pseudocode Section */}
            {algorithmInfo.pseudocode.length > 0 && (
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl p-6 border border-slate-700/50">
                <h4 className="text-lg font-semibold text-white mb-4">Pseudocode</h4>
                <div className="bg-slate-900/80 rounded-xl p-4 font-mono text-sm">
                  {algorithmInfo.pseudocode.map((line, index) => (
                    <motion.div
                      key={index}
                      className={`py-1 px-2 rounded ${
                        steps[currentStep]?.pseudocodeLine === index
                          ? "bg-purple-500/30 text-purple-200"
                          : "text-slate-400"
                      }`}
                      animate={{
                        backgroundColor: steps[currentStep]?.pseudocodeLine === index 
                          ? "rgba(168, 85, 247, 0.3)" 
                          : "transparent"
                      }}
                    >
                      <span className="text-slate-600 mr-3">{index + 1}</span>
                      {line}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {!hasVisualization && !isGenerating && (
        <div className="text-center py-12 text-slate-400">
          <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Enter an algorithm description above to generate a visualization</p>
        </div>
      )}
    </div>
  );
};

export default AlgorithmVisualizerAnimated;
