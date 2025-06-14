import { useState } from "react";
import { Play, RotateCcw, Settings, Brain, Code, Zap } from "lucide-react";
import ComplexityFinder from "./playground/ComplexityFinder";
import ResourceManager from "./resources/ResourceManager";
import CodeEditor from "./playground/CodeEditor";
import IOPanel from "./playground/IOPanel";

const CodePlayground = () => {
  const [code, setCode] = useState(`def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
sorted_numbers = bubble_sort(numbers)
print(sorted_numbers)`);
  
  const [input, setInput] = useState("64, 34, 25, 12, 22, 11, 90");
  const [language, setLanguage] = useState("python");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState("editor");

  const handleRunCode = () => {
    setIsRunning(true);
    // Simulate code execution based on input
    setTimeout(() => {
      try {
        // This is a simulation. For a real app, you'd send the code and input to a backend execution environment.
        // Here, we just simulate the bubble sort for the default example code.
        const numbers = input.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
        
        // Simple bubble sort logic for demonstration, mimics the Python/JS examples
        for (let i = 0; i < numbers.length; i++) {
          for (let j = 0; j < numbers.length - i - 1; j++) {
            if (numbers[j] > numbers[j + 1]) {
              [numbers[j], numbers[j + 1]] = [numbers[j + 1], numbers[j]];
            }
          }
        }
        setOutput(`Sorted array: [${numbers.join(', ')}]\n\nNote: This is a simulated execution for demonstration purposes.`);
      } catch (error) {
        setOutput("An error occurred during simulated execution. Please check your input format.");
      } finally {
        setIsRunning(false);
      }
    }, 1500);
  };

  const handleResetCode = () => {
    setCode(`def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
sorted_numbers = bubble_sort(numbers)
print(sorted_numbers)`);
    setOutput("");
    setInput("64, 34, 25, 12, 22, 11, 90");
  };

  const languageExamples = {
    python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`,
    javascript: `function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}`,
    java: `public static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    setCode(languageExamples[newLanguage as keyof typeof languageExamples] || "");
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent mb-4 animate-fade-in">
          Code Playground
        </h1>
        <p className="text-slate-600 text-lg">
          Write, run, and analyze your DSA code with complexity insights and AI assistance.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 animate-fade-in">
        <div className="border-b border-slate-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab("editor")}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "editor"
                  ? "border-emerald-500 text-emerald-600"
                  : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              }`}
            >
              <Code className="w-4 h-4 inline mr-2" />
              Code Editor (with AI!)
            </button>
            <button
              onClick={() => setActiveTab("complexity")}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "complexity"
                  ? "border-emerald-500 text-emerald-600"
                  : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              }`}
            >
              <Brain className="w-4 h-4 inline mr-2" />
              Complexity Analysis
            </button>
            <button
              onClick={() => setActiveTab("resources")}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "resources"
                  ? "border-emerald-500 text-emerald-600"
                  : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              }`}
            >
              <Zap className="w-4 h-4 inline mr-2" />
              Resources
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
                    <Settings className="w-4 h-4 text-slate-600" />
                    <span className="text-sm font-medium text-slate-700">Language:</span>
                    <select
                      value={language}
                      onChange={(e) => handleLanguageChange(e.target.value)}
                      className="px-3 py-1 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm bg-white"
                    >
                      <option value="python">Python</option>
                      <option value="javascript">JavaScript</option>
                      <option value="java">Java</option>
                      <option value="cpp">C++</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleResetCode}
                    className="bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors flex items-center space-x-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset</span>
                  </button>
                  
                  <button
                    onClick={handleRunCode}
                    disabled={isRunning}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-2 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 flex items-center space-x-2 shadow-lg disabled:opacity-50"
                  >
                    {isRunning ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
                  languageName={
                    language === "python"
                      ? "Python"
                      : language === "javascript"
                      ? "JavaScript"
                      : language === "java"
                      ? "Java"
                      : "C++"
                  }
                />
                <IOPanel
                  input={input}
                  onInputChange={setInput}
                  output={output}
                  isRunning={isRunning}
                />
              </div>
            </div>
          )}

          {activeTab === "complexity" && (
            <ComplexityFinder code={code} language={language} />
          )}

          {activeTab === "resources" && (
            <ResourceManager topic="general" />
          )}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 shadow-lg border border-cyan-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4">💡 Quick Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-cyan-200">
            <h4 className="font-semibold text-slate-800 mb-2">🚀 Performance</h4>
            <p className="text-sm text-slate-600">Use the Complexity Analysis tab to understand the time and space complexity of your algorithms.</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-cyan-200">
            <h4 className="font-semibold text-slate-800 mb-2">📚 Learning</h4>
            <p className="text-sm text-slate-600">Check the Resources tab for curated learning materials and practice problems.</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-cyan-200">
            <h4 className="font-semibold text-slate-800 mb-2">🔧 Debug</h4>
            <p className="text-sm text-slate-600">Use console.log() or print() statements to debug your code step by step.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePlayground;
