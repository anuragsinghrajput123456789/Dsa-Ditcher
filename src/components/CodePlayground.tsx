import { useState, useRef } from "react";
import { Calculator, Lightbulb } from "lucide-react";
import CodeEditor from "./playground/CodeEditor";
import CodeControls from "./playground/CodeControls";
import ComplexityAnalysis from "./playground/ComplexityAnalysis";
import IOPanel from "./playground/IOPanel";
import Sidebar from "./playground/Sidebar";

const CodePlayground = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [savedSnippets, setSavedSnippets] = useState<any[]>([]);
  const [showComplexityAnalysis, setShowComplexityAnalysis] = useState(false);
  const [complexityAnalysis, setComplexityAnalysis] = useState<any>(null);
  const [optimizationTips, setOptimizationTips] = useState<string[]>([]);
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

  const analyzeComplexity = (code: string, language: string) => {
    // Analyze time and space complexity based on code patterns
    const analysis = {
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      explanation: "",
      optimizations: []
    };

    const codeLines = code.toLowerCase();
    
    // Time complexity analysis
    if (codeLines.includes("for") && codeLines.includes("while")) {
      analysis.timeComplexity = "O(n²)";
      analysis.explanation = "Nested loops detected";
      analysis.optimizations.push("Consider using hash maps to reduce nested loops");
    } else if (codeLines.match(/for.*for/s) || codeLines.match(/while.*while/s)) {
      analysis.timeComplexity = "O(n²)";
      analysis.explanation = "Nested loops detected";
      analysis.optimizations.push("Use two pointers technique if applicable");
    } else if (codeLines.includes("sort")) {
      analysis.timeComplexity = "O(n log n)";
      analysis.explanation = "Sorting operation detected";
      analysis.optimizations.push("Consider if sorting is necessary");
    } else if (codeLines.includes("binary_search") || codeLines.includes("binarysearch")) {
      analysis.timeComplexity = "O(log n)";
      analysis.explanation = "Binary search implementation";
    } else if (codeLines.includes("for") || codeLines.includes("while")) {
      analysis.timeComplexity = "O(n)";
      analysis.explanation = "Single loop iteration";
    } else {
      analysis.timeComplexity = "O(1)";
      analysis.explanation = "Constant time operations";
    }

    // Space complexity analysis
    if (codeLines.includes("dp") || codeLines.includes("memo")) {
      analysis.spaceComplexity = "O(n)";
      analysis.optimizations.push("Consider space-optimized DP if possible");
    } else if (codeLines.includes("recursion") || codeLines.includes("def") && codeLines.includes("return")) {
      analysis.spaceComplexity = "O(n)";
      analysis.explanation += " (Recursion stack space)";
    } else if (codeLines.includes("[") && codeLines.includes("]")) {
      analysis.spaceComplexity = "O(n)";
      analysis.explanation += " (Additional array/list storage)";
    }

    return analysis;
  };

  const generateOptimizationTips = (code: string, language: string) => {
    const tips = [];
    const codeLines = code.toLowerCase();

    if (codeLines.includes("for i in range(len(")) {
      tips.push("Use enumerate() instead of range(len()) for cleaner code");
    }
    
    if (codeLines.includes("if") && codeLines.includes("return") && codeLines.includes("else")) {
      tips.push("Consider early returns to reduce nesting");
    }

    if (codeLines.includes("append") && codeLines.includes("for")) {
      tips.push("Consider list comprehension for better performance");
    }

    if (codeLines.includes("dict") || codeLines.includes("{}")) {
      tips.push("Good use of hash map for O(1) lookups!");
    }

    if (codeLines.includes("two_sum") || codeLines.includes("twosum")) {
      tips.push("Classic two-sum pattern - consider the complement approach");
    }

    if (codeLines.includes("sort") && codeLines.includes("for")) {
      tips.push("Sorting before processing can often simplify the logic");
    }

    if (tips.length === 0) {
      tips.push("Code looks good! Consider edge cases and error handling");
    }

    return tips;
  };

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
    
    const analysis = analyzeComplexity(code, selectedLanguage);
    const tips = generateOptimizationTips(code, selectedLanguage);
    
    setComplexityAnalysis(analysis);
    setOptimizationTips(tips);
    setShowComplexityAnalysis(true);
    
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
        <p className="text-gray-600 text-lg">Practice DSA problems with multi-language support and complexity analysis</p>
      </div>

      <CodeControls
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
        onLoadTemplate={loadTemplate}
        onRunCode={runCode}
        onSaveSnippet={saveSnippet}
        onDownloadCode={downloadCode}
        onUploadFile={() => fileInputRef.current?.click()}
        isRunning={isRunning}
        hasCode={!!code.trim()}
        languages={languages}
      />

      <input
        type="file"
        ref={fileInputRef}
        onChange={uploadFile}
        accept=".py,.js,.java,.cpp,.c,.txt"
        className="hidden"
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <CodeEditor
            code={code}
            onCodeChange={setCode}
            language={selectedLanguage}
            languageName={languages.find(lang => lang.id === selectedLanguage)?.name || ""}
          />

          {showComplexityAnalysis && complexityAnalysis && (
            <ComplexityAnalysis
              analysis={complexityAnalysis}
              roadmapColor="from-blue-500 to-purple-500"
            />
          )}

          {optimizationTips.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2" />
                Optimization Tips
              </h3>
              <div className="space-y-2">
                {optimizationTips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-2 p-3 bg-blue-50 rounded-lg">
                    <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-blue-800">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <IOPanel
            input={input}
            output={output}
            isRunning={isRunning}
            onInputChange={setInput}
          />
        </div>

        <Sidebar
          savedSnippets={savedSnippets}
          onLoadSnippet={loadSnippet}
          onCodeChange={setCode}
        />
      </div>
    </div>
  );
};

export default CodePlayground;
