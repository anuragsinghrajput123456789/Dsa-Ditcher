import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, SkipBack, SkipForward, Sparkles, Loader2, Zap, Code2, Info, ChevronRight } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";

interface Step {
  comparing: number[];
  swapping: number[];
  array: number[];
  description: string;
  sorted: number[];
  highlight?: number[];
  code?: string;
}

interface AlgorithmInfo {
  name: string;
  description: string;
  complexity: string;
  spaceComplexity: string;
  pseudocode?: string[];
}

const AlgorithmVisualizerAnimated = () => {
  const [geminiApiKey, setGeminiApiKey] = useState("");
  const [customAlgorithmInput, setCustomAlgorithmInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(true);
  
  const [algorithmInfo, setAlgorithmInfo] = useState<AlgorithmInfo | null>(null);
  const [array, setArray] = useState<number[]>([64, 34, 25, 12, 22, 11, 90]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(800);
  
  const [comparing, setComparing] = useState<number[]>([]);
  const [swapping, setSwapping] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [highlight, setHighlight] = useState<number[]>([]);

  const generateCustomVisualization = async () => {
    if (!customAlgorithmInput.trim()) {
      toast.error("Please enter an algorithm description");
      return;
    }

    if (!geminiApiKey.trim()) {
      toast.error("Please enter your Gemini API key");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${geminiApiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are an expert algorithm visualization generator. Generate a detailed step-by-step visualization for the following algorithm.

Algorithm: ${customAlgorithmInput}

Generate a JSON response with EXACTLY this structure:
{
  "algorithmName": "Clear name of the algorithm",
  "description": "Detailed explanation of how the algorithm works (2-3 sentences)",
  "timeComplexity": "Time complexity (e.g., O(n²), O(n log n))",
  "spaceComplexity": "Space complexity (e.g., O(1), O(n))",
  "pseudocode": [
    "Step 1: description",
    "Step 2: description",
    "..."
  ],
  "initialArray": [array of 8 random numbers between 10-99],
  "steps": [
    {
      "comparing": [indices being compared, e.g., [0, 1]],
      "swapping": [indices being swapped, empty if no swap],
      "array": [current state of the array after this step],
      "description": "Clear description of what happens in this step",
      "sorted": [indices that are in their final sorted position],
      "highlight": [any indices to highlight for attention],
      "code": "The line of pseudocode being executed"
    }
  ]
}

IMPORTANT RULES:
1. Generate 15-25 detailed steps showing the COMPLETE algorithm execution
2. Each step must show the CURRENT state of the array AFTER that operation
3. The "comparing" array should highlight elements being compared
4. The "swapping" array should highlight elements being swapped
5. The "sorted" array should accumulate as elements reach their final positions
6. Make descriptions educational and clear
7. Return ONLY valid JSON, no markdown or extra text`
              }]
            }],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 8192,
            }
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Gemini API Error:", response.status, errorData);
        
        if (response.status === 429) {
          toast.error("API quota exceeded. Please wait or use a different API key.", { duration: 5000 });
        } else if (response.status === 400) {
          toast.error("Invalid API key. Please check your Gemini API key.");
        } else {
          toast.error(errorData?.error?.message || `API Error: ${response.status}`);
        }
        setIsGenerating(false);
        return;
      }

      const data = await response.json();
      const text = data.candidates[0].content.parts[0].text;
      
      // Extract JSON from markdown code blocks if present
      let jsonText = text;
      const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (jsonMatch) {
        jsonText = jsonMatch[1];
      }
      
      const result = JSON.parse(jsonText.trim());

      setAlgorithmInfo({
        name: result.algorithmName,
        description: result.description,
        complexity: result.timeComplexity,
        spaceComplexity: result.spaceComplexity,
        pseudocode: result.pseudocode
      });

      setArray(result.initialArray);
      setSteps(result.steps);
      setCurrentStep(0);
      setComparing([]);
      setSwapping([]);
      setSorted([]);
      setHighlight([]);
      setIsPlaying(false);
      setShowCustomInput(false);

      toast.success("Visualization generated successfully!", {
        description: `${result.steps.length} steps created for ${result.algorithmName}`
      });
    } catch (error) {
      console.error("Error generating visualization:", error);
      toast.error("Failed to parse AI response. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Animation controls
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isPlaying && currentStep < steps.length - 1) {
      timeout = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, speed);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timeout);
  }, [isPlaying, currentStep, speed, steps.length]);

  // Update visualization state when step changes
  useEffect(() => {
    if (steps.length > 0 && currentStep < steps.length) {
      const step = steps[currentStep];
      setComparing(step.comparing || []);
      setSwapping(step.swapping || []);
      setArray(step.array || array);
      setSorted(step.sorted || []);
      setHighlight(step.highlight || []);
    }
  }, [currentStep, steps]);

  const resetVisualization = () => {
    if (steps.length > 0) {
      setArray(steps[0].array);
    }
    setCurrentStep(0);
    setComparing([]);
    setSwapping([]);
    setSorted([]);
    setHighlight([]);
    setIsPlaying(false);
  };

  const getBarColor = (index: number) => {
    if (sorted.includes(index)) return "from-emerald-500 to-emerald-400 shadow-emerald-500/50";
    if (swapping.includes(index)) return "from-rose-500 to-pink-400 shadow-rose-500/50";
    if (comparing.includes(index)) return "from-amber-500 to-yellow-400 shadow-amber-500/50";
    if (highlight.includes(index)) return "from-violet-500 to-purple-400 shadow-violet-500/50";
    return "from-blue-500 to-cyan-400 shadow-blue-500/30";
  };

  const maxValue = Math.max(...array, 1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4"
        >
          AI Algorithm Visualizer
        </motion.h1>
        <p className="text-slate-600 text-lg">Enter any algorithm and watch it come to life with animated step-by-step execution</p>
      </div>

      {/* Input Section */}
      <motion.div 
        layout
        className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 shadow-2xl border border-slate-700"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">AI-Powered Visualization</h2>
              <p className="text-slate-400 text-sm">Describe any algorithm to generate an animated visualization</p>
            </div>
          </div>
          <button
            onClick={() => setShowCustomInput(!showCustomInput)}
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            {showCustomInput ? "Hide" : "Show Input"}
          </button>
        </div>

        <AnimatePresence>
          {showCustomInput && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 overflow-hidden"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Gemini API Key
                  </label>
                  <input
                    type="password"
                    value={geminiApiKey}
                    onChange={(e) => setGeminiApiKey(e.target.value)}
                    placeholder="Enter your Gemini API key"
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-600 text-white placeholder-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all"
                    disabled={isGenerating}
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Get free key: <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Google AI Studio</a>
                  </p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Algorithm Description or Code
                </label>
                <Textarea
                  value={customAlgorithmInput}
                  onChange={(e) => setCustomAlgorithmInput(e.target.value)}
                  placeholder="Example: 'Insertion sort algorithm' or 'Quick sort with Lomuto partition' or paste your sorting code..."
                  className="min-h-[120px] resize-none bg-slate-800 border-slate-600 text-white placeholder-slate-500 focus:border-purple-500 focus:ring-purple-500/20"
                  disabled={isGenerating}
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={generateCustomVisualization}
                disabled={isGenerating || !customAlgorithmInput.trim() || !geminiApiKey.trim()}
                className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-size-200 animate-gradient text-white px-6 py-4 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center gap-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating Visualization...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Generate Animated Visualization
                  </>
                )}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Visualization Section */}
      {algorithmInfo && steps.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Algorithm Info Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 border border-slate-700">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl">
                <Info className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white">{algorithmInfo.name}</h3>
                <p className="text-slate-400 mt-1">{algorithmInfo.description}</p>
              </div>
              <div className="flex gap-3">
                <div className="px-3 py-1.5 bg-emerald-500/20 rounded-lg border border-emerald-500/30">
                  <span className="text-emerald-400 text-sm font-mono">Time: {algorithmInfo.complexity}</span>
                </div>
                <div className="px-3 py-1.5 bg-blue-500/20 rounded-lg border border-blue-500/30">
                  <span className="text-blue-400 text-sm font-mono">Space: {algorithmInfo.spaceComplexity}</span>
                </div>
              </div>
            </div>

            {algorithmInfo.pseudocode && (
              <div className="mt-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <Code2 className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium text-purple-400">Pseudocode</span>
                </div>
                <div className="space-y-1">
                  {algorithmInfo.pseudocode.map((line, i) => (
                    <div 
                      key={i} 
                      className={`text-sm font-mono px-2 py-1 rounded transition-colors ${
                        steps[currentStep]?.code?.includes(line.substring(0, 10)) 
                          ? 'bg-purple-500/20 text-purple-300' 
                          : 'text-slate-400'
                      }`}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-4 border border-slate-700">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-sm">Speed:</span>
                <input
                  type="range"
                  min="200"
                  max="1500"
                  value={1700 - speed}
                  onChange={(e) => setSpeed(1700 - Number(e.target.value))}
                  className="w-32 accent-purple-500"
                />
                <span className="text-slate-500 text-xs w-16">{speed}ms</span>
              </div>
              
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentStep(0)}
                  className="p-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                >
                  <SkipBack className="w-5 h-5" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                  disabled={currentStep === 0}
                  className="p-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors disabled:opacity-50"
                >
                  ←
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center gap-2 font-semibold"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  {isPlaying ? "Pause" : "Play"}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
                  disabled={currentStep >= steps.length - 1}
                  className="p-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors disabled:opacity-50"
                >
                  →
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentStep(steps.length - 1)}
                  className="p-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                >
                  <SkipForward className="w-5 h-5" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={resetVisualization}
                  className="p-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                >
                  <RotateCcw className="w-5 h-5" />
                </motion.button>
              </div>
              
              <div className="text-slate-400 text-sm font-mono">
                Step {currentStep + 1} / {steps.length}
              </div>
            </div>
          </div>

          {/* Array Visualization */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-slate-700 overflow-hidden">
            <div className="flex items-end justify-center gap-3 h-72">
              <AnimatePresence mode="popLayout">
                {array.map((value, index) => (
                  <motion.div
                    key={`${index}-${value}`}
                    layout
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      scale: swapping.includes(index) ? 1.1 : 1,
                      transition: { type: "spring", stiffness: 300, damping: 25 }
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <motion.div
                      animate={{
                        boxShadow: swapping.includes(index) 
                          ? "0 0 30px rgba(244, 63, 94, 0.5)" 
                          : comparing.includes(index)
                          ? "0 0 20px rgba(245, 158, 11, 0.4)"
                          : sorted.includes(index)
                          ? "0 0 20px rgba(16, 185, 129, 0.4)"
                          : "0 0 10px rgba(59, 130, 246, 0.2)"
                      }}
                      className={`bg-gradient-to-t ${getBarColor(index)} rounded-t-lg min-w-[48px] flex items-end justify-center pb-2 text-white font-bold shadow-lg relative overflow-hidden`}
                      style={{ 
                        height: `${Math.max((value / maxValue) * 220, 40)}px`
                      }}
                    >
                      {/* Shimmer effect */}
                      {(swapping.includes(index) || comparing.includes(index)) && (
                        <motion.div
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        />
                      )}
                      <span className="relative z-10 text-sm">{value}</span>
                    </motion.div>
                    <div className={`text-sm font-mono px-2 py-1 rounded-lg ${
                      comparing.includes(index) ? 'bg-amber-500/20 text-amber-400' :
                      swapping.includes(index) ? 'bg-rose-500/20 text-rose-400' :
                      sorted.includes(index) ? 'bg-emerald-500/20 text-emerald-400' :
                      'bg-slate-700 text-slate-400'
                    }`}>
                      [{index}]
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Legend */}
            <div className="mt-8 flex justify-center gap-6 flex-wrap">
              {[
                { color: "from-blue-500 to-cyan-400", label: "Default" },
                { color: "from-amber-500 to-yellow-400", label: "Comparing" },
                { color: "from-rose-500 to-pink-400", label: "Swapping" },
                { color: "from-emerald-500 to-emerald-400", label: "Sorted" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded bg-gradient-to-t ${item.color}`} />
                  <span className="text-slate-400 text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-4 border border-slate-700">
            <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>
          </div>

          {/* Step Description */}
          <motion.div 
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 border border-slate-700"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex-shrink-0">
                <ChevronRight className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">
                  Step {currentStep + 1}: {steps[currentStep]?.code || "Current Operation"}
                </h4>
                <p className="text-slate-300 text-lg">
                  {steps[currentStep]?.description || "Click play to start the visualization"}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Empty State */}
      {!algorithmInfo && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="p-4 bg-slate-800/50 rounded-full inline-block mb-4">
            <Sparkles className="w-12 h-12 text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-300 mb-2">No Visualization Yet</h3>
          <p className="text-slate-500">Enter an algorithm description above to generate an animated visualization</p>
        </motion.div>
      )}
    </div>
  );
};

export default AlgorithmVisualizerAnimated;
