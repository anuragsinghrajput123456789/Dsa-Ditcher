'use client';

import { useState } from "react";
import { Play, RotateCcw, Settings, Brain, Code2 } from "lucide-react";
import ComplexityFinder from "./playground/ComplexityFinder";
import CodeEditor from "./playground/CodeEditor";
import IOPanel from "./playground/IOPanel";
import { Button } from "@/components/ui/button";

export function CodePlayground() {
  const javascriptExample = `function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

// Example execution
const numbers = [64, 34, 25, 12, 22, 11, 90];
const sortedNumbers = bubbleSort(numbers);
console.log(sortedNumbers);`;

  const [code, setCode] = useState(javascriptExample);
  const language = "javascript";
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState("editor");

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput("");

    setTimeout(() => {
      try {
        let capturedOutput = "";
        const originalConsoleLog = console.log;
        
        console.log = (...args) => {
          capturedOutput += args.map(arg => {
            if (typeof arg === 'object' && arg !== null) {
              return JSON.stringify(arg);
            }
            return String(arg);
          }).join(' ') + '\n';
        };

        try {
          new Function(code)();
          setOutput(capturedOutput.trim() || "Code executed cleanly with zero errors.");
        } catch (e: any) {
          setOutput(`Runtime Execution Error: ${e instanceof Error ? e.message : String(e)}`);
        } finally {
          console.log = originalConsoleLog;
        }
      } catch (error) {
        setOutput("An unexpected execution exception occurred.");
      } finally {
        setIsRunning(false);
      }
    }, 400);
  };

  const handleResetCode = () => {
    setCode(javascriptExample);
    setOutput("");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-semibold">
          <Code2 className="w-3.5 h-3.5 text-violet-400" />
          <span>IN-BROWSER MONACO IDE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Code Playground & Big-O Analyzer
        </h1>
        <p className="text-xs text-[#B8B1CC] max-w-2xl mx-auto">
          Execute JavaScript algorithms directly in your browser with real-time AST & AI Big-O complexity analysis.
        </p>
      </div>

      <div className="glass-panel rounded-2xl border border-violet-500/20 shadow-2xl overflow-hidden">
        <div className="border-b border-violet-500/15 bg-[#05030D]/60">
          <nav className="flex space-x-6 px-6">
            <button
              onClick={() => setActiveTab("editor")}
              className={`py-3 px-1 border-b-2 font-semibold text-xs transition-colors flex items-center space-x-2 ${
                activeTab === "editor"
                  ? "border-violet-500 text-violet-300"
                  : "border-transparent text-[#B8B1CC] hover:text-white"
              }`}
            >
              <Code2 className="w-4 h-4 text-violet-400" />
              <span>Monaco Editor</span>
            </button>
            <button
              onClick={() => setActiveTab("complexity")}
              className={`py-3 px-1 border-b-2 font-semibold text-xs transition-colors flex items-center space-x-2 ${
                activeTab === "complexity"
                  ? "border-violet-500 text-violet-300"
                  : "border-transparent text-[#B8B1CC] hover:text-white"
              }`}
            >
              <Brain className="w-4 h-4 text-magenta-400" />
              <span>Big-O Complexity Finder</span>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "editor" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center space-x-2 text-xs text-[#B8B1CC]">
                  <Settings className="w-4 h-4 text-violet-400" />
                  <span>Language Engine: <strong className="text-white">JavaScript (ES6+)</strong></span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleResetCode}
                    className="border-violet-500/20 text-xs text-[#B8B1CC] hover:text-white h-9"
                  >
                    <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                    <span>Reset Code</span>
                  </Button>
                  
                  <Button
                    size="sm"
                    onClick={handleRunCode}
                    disabled={isRunning}
                    className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold text-xs h-9 px-4 rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                  >
                    <Play className="w-3.5 h-3.5 mr-1.5" />
                    <span>{isRunning ? "Executing..." : "Run Code"}</span>
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                <CodeEditor
                  code={code}
                  onCodeChange={setCode}
                  language={language}
                  languageName="JavaScript"
                />
                <IOPanel
                  output={output}
                  isRunning={isRunning}
                />
              </div>
            </div>
          )}

          {activeTab === "complexity" && (
            <ComplexityFinder code={code} language={language} />
          )}
        </div>
      </div>
    </div>
  );
}
export default CodePlayground;
