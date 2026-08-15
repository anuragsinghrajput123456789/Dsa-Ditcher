'use client';

import { useState } from "react";
import { Play, RotateCcw, Settings, Brain, Code } from "lucide-react";
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

// Example usage
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
          setOutput(capturedOutput.trim() || "Code executed successfully with no console output.");
        } catch (e: any) {
          setOutput(`Runtime Error: ${e instanceof Error ? e.message : String(e)}`);
        } finally {
          console.log = originalConsoleLog;
        }
      } catch (error) {
        setOutput("An unexpected error occurred during execution.");
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
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white via-violet-200 to-violet-400 bg-clip-text text-transparent">
          Code Playground & Monaco Editor
        </h1>
        <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
          Write, execute, and analyze your custom JavaScript algorithms directly in your browser.
        </p>
      </div>

      <div className="bg-card rounded-2xl shadow-xl border border-border/80 overflow-hidden">
        <div className="border-b border-border bg-muted/30">
          <nav className="flex space-x-6 px-6">
            <button
              onClick={() => setActiveTab("editor")}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                activeTab === "editor"
                  ? "border-violet-500 text-violet-400"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Code className="w-4 h-4" />
              <span>Monaco Editor</span>
            </button>
            <button
              onClick={() => setActiveTab("complexity")}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                activeTab === "complexity"
                  ? "border-violet-500 text-violet-400"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Brain className="w-4 h-4" />
              <span>Big-O Complexity Finder</span>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "editor" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Settings className="w-4 h-4" />
                  <span>Language: <strong className="text-foreground">JavaScript (ES6+)</strong></span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleResetCode}
                    className="flex items-center space-x-2 text-xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </Button>
                  
                  <Button
                    variant="gradient"
                    size="sm"
                    onClick={handleRunCode}
                    disabled={isRunning}
                    className="flex items-center space-x-2 text-xs"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>{isRunning ? "Running..." : "Run Code"}</span>
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
