import { useState, useEffect } from "react";
import { Play, RotateCcw, Settings, Brain, Code } from "lucide-react";
import ComplexityFinder from "./playground/ComplexityFinder";
import CodeEditor from "./playground/CodeEditor";
import IOPanel from "./playground/IOPanel";

const CodePlayground = () => {
  useEffect(() => {
    document.title = "Interactive JavaScript Code Playground & Complexity Finder | DSA Ditcher";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Execute your JavaScript algorithms directly in your browser. Analyze Big O time and space complexity with AI guidance, and optimize execution structures.");
    }
  }, []);
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

    // Simulate execution with a timeout for better UX
    setTimeout(() => {
      try {
        let capturedOutput = "";
        const originalConsoleLog = console.log;
        
        // Override console.log to capture output
        console.log = (...args) => {
          capturedOutput += args.map(arg => {
            if (typeof arg === 'object' && arg !== null) {
              return JSON.stringify(arg);
            }
            return String(arg);
          }).join(' ') + '\n';
        };

        try {
          // Use Function constructor for safer execution than eval
          new Function(code)();
          setOutput(capturedOutput.trim() || "Code executed with no output.");
        } catch (e: any) {
          setOutput(`Error: ${e.message}`);
        } finally {
          // Restore original console.log
          console.log = originalConsoleLog;
        }
      } catch (error) {
        setOutput("An unexpected error occurred during execution.");
      } finally {
        setIsRunning(false);
      }
    }, 1000);
  };

  const handleResetCode = () => {
    setCode(javascriptExample);
    setOutput("");
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent mb-4 animate-fade-in">
          Code Playground
        </h1>
        <p className="text-muted-foreground text-lg">
          Write, run, and analyze your JavaScript code with complexity insights and AI assistance.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-card rounded-xl shadow-lg border border-border animate-fade-in">
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab("editor")}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "editor"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
              }`}
            >
              <Code className="w-4 h-4 inline mr-2" />
              Code Editor (with AI!)
            </button>
            <button
              onClick={() => setActiveTab("complexity")}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "complexity"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
              }`}
            >
              <Brain className="w-4 h-4 inline mr-2" />
              Complexity Analysis
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "editor" && (
            <div className="space-y-6">
              {/* Controls */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Settings className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">Language: JavaScript</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleResetCode}
                    className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg hover:bg-secondary/80 transition-colors flex items-center space-x-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset</span>
                  </button>
                  
                  <button
                    onClick={handleRunCode}
                    disabled={isRunning}
                    className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-all duration-200 flex items-center space-x-2 shadow-lg disabled:opacity-50"
                  >
                    {isRunning ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                        <span>Running...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        <span>Run Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Code Editor and IO Panel */}
              <div className="space-y-6">
                <CodeEditor
                  code={code}
                  onCodeChange={setCode}
                  language={language}
                  languageName={"JavaScript"}
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

      {/* Quick Tips */}
      <div className="bg-secondary/50 rounded-xl p-6 shadow-lg border border-border">
        <h3 className="text-xl font-bold text-foreground mb-4">💡 Quick Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-card p-4 rounded-lg border border-border">
            <h4 className="font-semibold text-foreground mb-2">🚀 Performance</h4>
            <p className="text-sm text-muted-foreground">Use the Complexity Analysis tab to understand the time and space complexity of your algorithms.</p>
          </div>
          <div className="bg-card p-4 rounded-lg border border-border">
            <h4 className="font-semibold text-foreground mb-2">📚 Learning</h4>
            <p className="text-sm text-muted-foreground">Check the Resources tab for curated learning materials and practice problems.</p>
          </div>
          <div className="bg-card p-4 rounded-lg border border-border">
            <h4 className="font-semibold text-foreground mb-2">🔧 Debug</h4>
            <p className="text-sm text-muted-foreground">Use console.log() to debug your code step by step.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePlayground;
