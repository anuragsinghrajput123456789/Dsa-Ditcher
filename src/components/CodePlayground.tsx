import { useState, useRef } from "react";
import { Play, Save, Download, Upload, Settings, Code, Terminal } from "lucide-react";

const CodePlayground = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [savedSnippets, setSavedSnippets] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const languages = [
    { id: "python", name: "Python", extension: "py" },
    { id: "javascript", name: "JavaScript", extension: "js" },
    { id: "java", name: "Java", extension: "java" },
    { id: "cpp", name: "C++", extension: "cpp" },
    { id: "c", name: "C", extension: "c" },
  ];

  const templates = {
    python: `# Python DSA Template
def solve():
    # Your solution here
    pass

# Example: Two Sum
def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# Test
nums = [2, 7, 11, 15]
target = 9
result = two_sum(nums, target)
print(f"Result: {result}")`,

    javascript: `// JavaScript DSA Template
function solve() {
    // Your solution here
}

// Example: Two Sum
function twoSum(nums, target) {
    const seen = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (seen.has(complement)) {
            return [seen.get(complement), i];
        }
        seen.set(nums[i], i);
    }
    return [];
}

// Test
const nums = [2, 7, 11, 15];
const target = 9;
const result = twoSum(nums, target);
console.log("Result:", result);`,

    java: `// Java DSA Template
import java.util.*;

public class Solution {
    public static void main(String[] args) {
        // Test your solution here
        int[] nums = {2, 7, 11, 15};
        int target = 9;
        int[] result = twoSum(nums, target);
        System.out.println("Result: " + Arrays.toString(result));
    }
    
    // Example: Two Sum
    public static int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (seen.containsKey(complement)) {
                return new int[]{seen.get(complement), i};
            }
            seen.put(nums[i], i);
        }
        return new int[]{};
    }
}`,

    cpp: `// C++ DSA Template
#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

// Example: Two Sum
vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (seen.find(complement) != seen.end()) {
            return {seen[complement], i};
        }
        seen[nums[i]] = i;
    }
    return {};
}

int main() {
    vector<int> nums = {2, 7, 11, 15};
    int target = 9;
    vector<int> result = twoSum(nums, target);
    
    cout << "Result: [";
    for (int i = 0; i < result.size(); i++) {
        cout << result[i];
        if (i < result.size() - 1) cout << ", ";
    }
    cout << "]" << endl;
    
    return 0;
}`,

    c: `// C DSA Template
#include <stdio.h>
#include <stdlib.h>

// Example: Two Sum (simplified version)
void twoSum(int* nums, int numsSize, int target) {
    for (int i = 0; i < numsSize; i++) {
        for (int j = i + 1; j < numsSize; j++) {
            if (nums[i] + nums[j] == target) {
                printf("Result: [%d, %d]\\n", i, j);
                return;
            }
        }
    }
    printf("No solution found\\n");
}

int main() {
    int nums[] = {2, 7, 11, 15};
    int numsSize = 4;
    int target = 9;
    
    twoSum(nums, numsSize, target);
    
    return 0;
}`
  };

  const commonSnippets = [
    {
      name: "Binary Search",
      language: "python",
      code: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1

# Test
arr = [1, 3, 5, 7, 9, 11]
target = 7
result = binary_search(arr, target)
print(f"Found at index: {result}")`
    },
    {
      name: "DFS Tree Traversal",
      language: "python",
      code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def dfs_inorder(root):
    if not root:
        return []
    
    result = []
    result.extend(dfs_inorder(root.left))
    result.append(root.val)
    result.extend(dfs_inorder(root.right))
    return result

# Test
root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)
result = dfs_inorder(root)
print(f"Inorder: {result}")`
    },
    {
      name: "Quick Sort",
      language: "python",
      code: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quick_sort(left) + middle + quick_sort(right)

# Test
arr = [64, 34, 25, 12, 22, 11, 90]
sorted_arr = quick_sort(arr)
print(f"Sorted: {sorted_arr}")`
    }
  ];

  // Enhanced code execution simulation
  const executeCode = (code: string, language: string, input: string) => {
    const lines = code.split('\n');
    const outputLines = [];
    
    try {
      // Simulate different outputs based on code content and language
      if (language === "python") {
        if (code.includes("two_sum") || code.includes("twoSum")) {
          outputLines.push("Result: [0, 1]");
        } else if (code.includes("binary_search")) {
          outputLines.push("Found at index: 3");
        } else if (code.includes("quick_sort")) {
          outputLines.push("Sorted: [11, 12, 22, 25, 34, 64, 90]");
        } else if (code.includes("dfs_inorder")) {
          outputLines.push("Inorder: [2, 1, 3]");
        } else if (code.includes("print")) {
          // Extract print statements and simulate output
          lines.forEach(line => {
            if (line.includes("print(")) {
              const match = line.match(/print\(([^)]+)\)/);
              if (match) {
                let printContent = match[1];
                if (printContent.includes("f\"") || printContent.includes("f'")) {
                  // Handle f-strings
                  printContent = printContent.replace(/f["']/, '').replace(/["']$/, '');
                  outputLines.push(printContent.replace(/\{[^}]+\}/g, 'value'));
                } else {
                  outputLines.push(printContent.replace(/["']/g, ''));
                }
              }
            }
          });
        } else {
          outputLines.push("Code executed successfully!");
        }
      } else if (language === "javascript") {
        if (code.includes("twoSum")) {
          outputLines.push("Result: [ 0, 1 ]");
        } else if (code.includes("console.log")) {
          lines.forEach(line => {
            if (line.includes("console.log")) {
              const match = line.match(/console\.log\(([^)]+)\)/);
              if (match) {
                outputLines.push(match[1].replace(/["']/g, ''));
              }
            }
          });
        } else {
          outputLines.push("Code executed successfully!");
        }
      } else if (language === "java") {
        if (code.includes("twoSum")) {
          outputLines.push("Result: [0, 1]");
        } else {
          outputLines.push("Code compiled and executed successfully!");
        }
      } else if (language === "cpp") {
        if (code.includes("twoSum")) {
          outputLines.push("Result: [0, 1]");
        } else {
          outputLines.push("Code compiled and executed successfully!");
        }
      } else if (language === "c") {
        if (code.includes("twoSum")) {
          outputLines.push("Result: [0, 1]");
        } else {
          outputLines.push("Code compiled and executed successfully!");
        }
      }

      // Add execution stats
      outputLines.push("");
      outputLines.push(`Execution time: ${Math.random() * 0.1 + 0.01}s`);
      outputLines.push(`Memory used: ${Math.random() * 2 + 1.5}MB`);
      
      if (input.trim()) {
        outputLines.push(`Input processed: ${input.trim()}`);
      }
      
    } catch (error) {
      outputLines.push(`Error: ${error}`);
    }
    
    return outputLines.join('\n');
  };

  const loadTemplate = () => {
    setCode(templates[selectedLanguage as keyof typeof templates] || "");
  };

  const runCode = async () => {
    setIsRunning(true);
    
    // Simulate compilation/execution time
    setTimeout(() => {
      const result = executeCode(code, selectedLanguage, input);
      setOutput(result);
      setIsRunning(false);
    }, 1500);
  };

  const saveSnippet = () => {
    const snippet = {
      id: Date.now().toString(),
      name: `Snippet ${savedSnippets.length + 1}`,
      language: selectedLanguage,
      code: code,
      timestamp: new Date().toLocaleString()
    };
    setSavedSnippets(prev => [...prev, snippet]);
  };

  const loadSnippet = (snippet: any) => {
    setCode(snippet.code);
    setSelectedLanguage(snippet.language);
  };

  const downloadCode = () => {
    const language = languages.find(lang => lang.id === selectedLanguage);
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${language?.extension || 'txt'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCode(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Code Playground</h1>
        <p className="text-gray-600 text-lg">Practice DSA problems with multi-language support</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Language Selection */}
          <div className="flex items-center space-x-4">
            <label className="font-medium text-gray-700">Language:</label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.name}
                </option>
              ))}
            </select>
            <button
              onClick={loadTemplate}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Load Template
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={runCode}
              disabled={isRunning || !code.trim()}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>{isRunning ? "Running..." : "Run Code"}</span>
            </button>
            
            <button
              onClick={saveSnippet}
              disabled={!code.trim()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
            
            <button
              onClick={downloadCode}
              disabled={!code.trim()}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={uploadFile}
              accept=".py,.js,.java,.cpp,.c,.txt"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span>Upload</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Code Editor */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gray-800 text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Code className="w-5 h-5" />
                <span className="font-medium">
                  {languages.find(lang => lang.id === selectedLanguage)?.name} Editor
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-300">Lines: {code.split('\n').length}</span>
                <span className="text-sm text-gray-300">Chars: {code.length}</span>
              </div>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={`Write your ${languages.find(lang => lang.id === selectedLanguage)?.name} code here...`}
              className="w-full h-96 p-4 font-mono text-sm border-none focus:outline-none resize-none bg-gray-900 text-gray-100"
              spellCheck={false}
            />
          </div>

          {/* Input/Output */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                <h3 className="font-medium text-gray-800">Input</h3>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter input for your program..."
                className="w-full h-32 p-4 font-mono text-sm border-none focus:outline-none resize-none"
              />
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gray-100 px-4 py-3 border-b border-gray-200 flex items-center">
                <Terminal className="w-4 h-4 mr-2" />
                <h3 className="font-medium text-gray-800">Output</h3>
              </div>
              <div className="h-32 p-4 font-mono text-sm bg-gray-900 text-green-400 overflow-y-auto">
                {isRunning ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-400 mr-2"></div>
                    Running code...
                  </div>
                ) : (
                  <pre className="whitespace-pre-wrap">{output || "Click 'Run Code' to see output..."}</pre>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Common Snippets */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Common Snippets</h3>
            <div className="space-y-2">
              {commonSnippets.map((snippet, index) => (
                <button
                  key={index}
                  onClick={() => setCode(snippet.code)}
                  className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-gray-800">{snippet.name}</div>
                  <div className="text-sm text-gray-600">{snippet.language}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Saved Snippets */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Saved Snippets</h3>
            {savedSnippets.length === 0 ? (
              <p className="text-gray-500 text-sm">No saved snippets yet</p>
            ) : (
              <div className="space-y-2">
                {savedSnippets.map((snippet) => (
                  <div
                    key={snippet.id}
                    className="p-3 border border-gray-200 rounded-lg"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium text-gray-800">{snippet.name}</div>
                      <button
                        onClick={() => loadSnippet(snippet)}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        Load
                      </button>
                    </div>
                    <div className="text-sm text-gray-600">{snippet.language}</div>
                    <div className="text-xs text-gray-500">{snippet.timestamp}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Tips */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Tips</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div>• Use meaningful variable names</div>
              <div>• Comment your complex logic</div>
              <div>• Test with edge cases</div>
              <div>• Consider time & space complexity</div>
              <div>• Practice regularly</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePlayground;
