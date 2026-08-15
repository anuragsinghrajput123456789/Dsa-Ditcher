import { ComplexityResponse } from '@/types';

const GENERAL_MODELS = [
  "qwen/qwen-2.5-coder-32b-instruct",
  "openai/gpt-4o-mini",
  "deepseek/deepseek-chat",
  "meta-llama/llama-3.3-70b-instruct"
];

const JSON_MODELS = [
  "openai/gpt-4o-mini",
  "qwen/qwen-2.5-coder-32b-instruct"
];

// Local DSA Complexity Finder Sandbox
export const localComplexityAnalysis = (code: string, language: string = 'javascript'): ComplexityResponse => {
  const codeLower = code.toLowerCase();
  let timeComplexity = "O(n)";
  let spaceComplexity = "O(1)";
  let explanation = "Linear scan through the collection.";
  let details = ["Iterates through the input elements once in a single sequential loop.", "No nested iterations or repetitive scans detected."];
  let optimizations = ["This approach is highly optimal. Time complexity is linear O(n).", "Ensure no duplicate allocations are made inside the loop to maintain O(1) space."];
  const confidence = "high";

  // Check nested loops
  const loopCount = (code.match(/for\s*\(/g) || []).length + (code.match(/while\s*\(/g) || []).length;
  if (loopCount > 1) {
    timeComplexity = "O(n²)";
    explanation = "Nested loops iterating over the collection.";
    details = ["Detected nested iterations representing quadratic runtime.", "Inner loops execute complete scans for every outer iteration."];
    optimizations = ["Use a HashMap or HashSet to store visited elements, reducing search times from O(n) to O(1) to achieve O(n) overall time.", "Check if you can sort the input first to utilize two pointers."];
  } else if (codeLower.includes("binary") || codeLower.includes("mid = ") || codeLower.includes("high = ") || codeLower.includes("low = ")) {
    timeComplexity = "O(log n)";
    explanation = "Logarithmic divide and conquer scanning.";
    details = ["Search space is halved in each iteration step.", "Extremely efficient scan pattern."];
    optimizations = ["Ensure the input collection is pre-sorted before performing binary splits."];
  } else if (codeLower.includes("recursion") || codeLower.includes("dfs(") || codeLower.includes("bfs(")) {
    timeComplexity = "O(2^n) / O(V+E)";
    spaceComplexity = "O(n)";
    explanation = "Recursive backtracking or state-space tree traversal.";
    details = ["Branching factors multiply runtime exponentially depending on input depth.", "Recursion call stack consumes linear memory space relative to path depth."];
    optimizations = ["Use memoization (Dynamic Programming) to cache repetitive recursive subproblems and reduce time complexity to O(n)."];
  }

  return {
    timeComplexity,
    spaceComplexity,
    explanation,
    details,
    optimizations,
    confidence
  };
};

// Local DSA Chatbot Mentoring Sandbox
export const localChatFallback = (message: string): { text: string } => {
  const msgLower = message.toLowerCase();
  let answer = "";

  if (msgLower.includes("array")) {
    answer = `### 📊 Array Concepts & Mentor Guide
Arrays are linear data structures storing elements in contiguous memory. They provide **O(1) access time** via indices, but **O(n) insertion/deletion** since remaining elements must be shifted.

**Key Techniques to Master:**
1. **Two Pointers**: Move left/right boundaries inwards (e.g., Two Sum, Container With Most Water).
2. **Sliding Window**: Dynamically grow/shrink subsegments to track running sums or properties (e.g., Min Size Subarray Sum).
3. **Prefix Sums**: Pre-calculate running sums to evaluate subarray ranges in O(1) time.`;
  } else if (msgLower.includes("list") || msgLower.includes("node")) {
    answer = `### 🔗 Linked List Guide
Linked lists are sequential collections of nodes connected via pointers. Unlike arrays, they are not stored contiguously, allowing **O(1) dynamic insertions/deletions** but requiring **O(n) search time**.

**Common Interview Patterns:**
1. **Floyd's Cycle Detection (Tortoise and Hare)**: Use a slow and fast pointer to detect loops (e.g., List Cycle).
2. **In-place Reversal**: Track three references (prev, curr, next) to reverse connections securely.
3. **Dummy Node Trick**: Simplify edge cases at the head of the list during merges.`;
  } else if (msgLower.includes("dp") || msgLower.includes("dynamic programming") || msgLower.includes("memoization")) {
    answer = `### 🧩 Dynamic Programming Mastery
Dynamic Programming (DP) is recursion optimized. It solves complex problems by breaking them into overlapping subproblems and caching their results to avoid redundant calculations.

**Two Main Approaches:**
1. **Memoization (Top-Down)**: Keep recursion but cache return values in a table.
2. **Tabulation (Bottom-Up)**: Solve iteratively starting from the base cases up to the final target.

*Mentor Tip*: If a problem asks for "maximum," "minimum," or "total ways" and involves sequential choices, it's highly likely a DP problem!`;
  } else if (msgLower.includes("complexity") || msgLower.includes("big o") || msgLower.includes("time complexity")) {
    answer = `### ⏱️ Time & Space Complexity (Big O) Guide
Complexity analysis estimates the resource growth of an algorithm relative to input size $N$:

- **O(1) Constant**: Operations take the same time regardless of size (e.g. Array access, push/pop).
- **O(log N) Logarithmic**: Search space is halved recursively (e.g. Binary Search).
- **O(N) Linear**: Operations grow proportionally to input size (e.g. Single loops, linear search).
- **O(N²) Quadratic**: Nested loops where operations multiply (e.g. Bubble Sort).

Aim to write algorithms with **O(N)** or **O(N log N)** complexity for standard interview patterns!`;
  } else {
    answer = `### 👋 Hello! I'm your AlgoSpark DSA Mentor!
It looks like you're preparing for technical interviews or sharpening your algorithmic skills. I am here to help you guide through:
- Data Structure selection (Arrays, Lists, Trees, Graphs)
- Complexity evaluations (Big-O analysis)
- Standard SDE interview patterns (DFS, BFS, Sliding Windows)

Tell me what topic you're working on today, and let's break it down step-by-step!`;
  }

  return { text: answer };
};

// Local Problem Explainer Sandbox
export const localProblemFallback = (problemText: string): { text: string } => {
  return {
    text: `### 📊 DSA Problem Breakdown & Analysis
Thank you for uploading the problem statement. Here is an educational breakdown to guide your implementation:

1. **Simple Summary**: Analyze the input parameters and constraints. Identify if the problem requires element matching, contiguous subarrays, or tree paths.
2. **Brute Force Approach**: Nested iteration scanning all pairs or dynamic recursion without caching yields O(n²) or O(2^n) baseline runtime.
3. **Optimal Approach**: Optimize element lookup using a Hash Table or a two-pointer scheme to achieve linear O(n) runtime.

HINT: Write down a few small edge-case test runs (empty inputs, single elements) before drafting your solution.
HINT: If sorting the input simplifies comparisons, check if O(n log n) is acceptable.
HINT: Draw out a recursion tree if you are implementing dfs/bfs to visualize repeat branches.`
  };
};

export async function callOpenRouterAPI(
  prompt: string,
  jsonMode: boolean = false,
  overrideApiKey?: string
): Promise<string | null> {
  const apiKey = (overrideApiKey && overrideApiKey.trim()) || process.env.OPENROUTER_API_KEY;
  if (!apiKey || apiKey.startsWith("your_")) {
    return null;
  }

  const modelList = jsonMode ? JSON_MODELS : GENERAL_MODELS;

  for (const model of modelList) {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": "https://algospark.local",
          "X-Title": "AlgoSpark"
        },
        body: JSON.stringify({
          model: model,
          messages: [{ role: "user", content: prompt }],
          max_tokens: 2000,
          response_format: jsonMode ? { type: "json_object" } : undefined
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) return content;
      }
    } catch (error) {
      console.warn(`OpenRouter model ${model} failed:`, error);
    }
  }

  return null;
}
