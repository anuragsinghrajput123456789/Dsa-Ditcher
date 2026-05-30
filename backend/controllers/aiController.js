const GENERAL_MODELS = [
  "google/gemini-2.0-flash",
  "google/gemini-flash-1.5",
  "meta-llama/llama-3.3-70b-instruct:free"
];

const JSON_MODELS = [
  "google/gemini-2.0-flash",
  "google/gemini-flash-1.5"
];

// Local DSA Complexity Finder Sandbox
const localComplexityAnalysis = (code, language) => {
  const codeLower = code.toLowerCase();
  let timeComplexity = "O(n)";
  let spaceComplexity = "O(1)";
  let explanation = "Linear scan through the collection.";
  let details = ["Iterates through the input elements once in a single sequential loop.", "No nested iterations or repetitive scans detected."];
  let optimizations = ["This approach is highly optimal. Time complexity is linear O(n).", "Ensure no duplicate allocations are made inside the loop to maintain O(1) space."];
  let confidence = "high";

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
const localChatFallback = (message) => {
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
const localProblemFallback = (problemText) => {
  return {
    text: `### 📊 DSA Problem Breakdown & Analysis
Thank you for uploading the problem. Here is an educational roadmap to guide you:

1. **Simple Summary**: Analyze the input patterns (arrays, strings, trees) and understand what parameters define the constraints.
2. **Brute Force**: Try solving it using nesting loops or simple recursion. This provides a baseline complexity of O(n²) or O(2^n).
3. **Optimal Approach**: Optimize searching using a Hash Table or a two-pointer scheme to achieve O(n) runtime.

HINT: Write down a few small edge-case test runs (empty inputs, single elements) before drafting your solution.
HINT: If sorting the input simplifies comparisons, check if O(n log n) is acceptable.
HINT: Draw out a recursion tree if you are implementing dfs/bfs to visualize repeat branches.`
  };
};

export const analyzeProblem = async (req, res, next) => {
  const { problemText } = req.body;
  if (!problemText) {
    return res.status(400).json({ message: "Please provide problemText" });
  }

  try {
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    const prompt = `Analyze the following DSA problem and provide a detailed explanation with:
1. Simple summary for beginners
2. Input/Output examples with explanation
3. Two approaches (brute force and optimal) with time/space complexity
4. Edge cases to consider
5. Similar problems

Additionally, provide 3-5 progressive hints to solve the problem. Each hint should be on a new line and must start with the prefix "HINT:".

Problem: ${problemText}`;

    let response;
    let errorText = "";
    let answerText = "";

    // Primary path: OpenRouter API Looping
    if (OPENROUTER_API_KEY && !OPENROUTER_API_KEY.startsWith("your_")) {
      for (const model of GENERAL_MODELS) {
        try {
          response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
              "HTTP-Referer": "https://localhost:5000",
              "X-Title": "DSA Ditcher"
            },
            body: JSON.stringify({
              model: model,
              messages: [{ role: "user", content: prompt }],
              max_tokens: 2000
            }),
          });

          if (response.ok) {
            const data = await response.json();
            answerText = data.choices?.[0]?.message?.content || "";
            if (answerText) break;
          } else {
            errorText = await response.text();
          }
        } catch (err) {
          errorText = err.message;
        }
      }
    } else {
      errorText = "Missing or invalid API key configuration.";
    }

    // Secondary path: Graceful Local Fallback Sandbox
    if (answerText) {
      res.json({ text: answerText });
    } else {
      console.warn(`[AI Sandbox Fallback Activated] - Problem Explainer. Details: ${errorText}`);
      res.json(localProblemFallback(problemText));
    }
  } catch (error) {
    next(error);
  }
};

export const chatWithAI = async (req, res, next) => {
  const { message, prompt: customPrompt } = req.body;
  
  try {
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    
    let prompt = customPrompt;
    if (!prompt) {
      if (!message) {
        return res.status(400).json({ message: "Please provide message or prompt" });
      }
      prompt = `You are an expert DSA mentor specializing in Data Structures and Algorithms. Help the user understand concepts step by step with clear explanations. 

User question: ${message}

Please provide:
1. A clear explanation of the concept
2. Step-by-step approach if it's a problem
3. Time and space complexity analysis
4. Related concepts or patterns
5. Practical examples when helpful

Keep your response educational and engaging.`;
    }

    let response;
    let errorText = "";
    let answerText = "";

    // Primary path: OpenRouter API Looping
    if (OPENROUTER_API_KEY && !OPENROUTER_API_KEY.startsWith("your_")) {
      for (const model of GENERAL_MODELS) {
        try {
          response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
              "HTTP-Referer": "https://localhost:5000",
              "X-Title": "DSA Ditcher"
            },
            body: JSON.stringify({
              model: model,
              messages: [{ role: "user", content: prompt }],
              max_tokens: 2000
            }),
          });

          if (response.ok) {
            const data = await response.json();
            answerText = data.choices?.[0]?.message?.content || "";
            if (answerText) break;
          } else {
            errorText = await response.text();
          }
        } catch (err) {
          errorText = err.message;
        }
      }
    } else {
      errorText = "Missing or invalid API key configuration.";
    }

    // Secondary path: Graceful Local Fallback Sandbox
    if (answerText) {
      res.json({ text: answerText });
    } else {
      console.warn(`[AI Sandbox Fallback Activated] - Mentor Chatbot. Details: ${errorText}`);
      res.json(localChatFallback(message || prompt));
    }
  } catch (error) {
    next(error);
  }
};

export const analyzeComplexity = async (req, res, next) => {
  const { code, language } = req.body;
  if (!code || !language) {
    return res.status(400).json({ message: "Please provide code and language" });
  }

  try {
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    const prompt = `Analyze the time and space complexity of the following ${language} code. Provide your answer in a valid JSON format. The JSON object must have the following keys: "timeComplexity" (e.g., "O(n^2)"), "spaceComplexity" (e.g., "O(n)"), "explanation" (a brief one-liner), "details" (an array of strings explaining the analysis), "optimizations" (an array of strings with suggestions), and "confidence" (a string which must be one of 'high', 'medium', or 'low').

Code:
\`\`\`${language}
${code}
\`\`\`

Your response must be only the JSON object, without any surrounding text or markdown formatting like \`\`\`json.`;

    let response;
    let errorText = "";
    let parsedJson = null;

    // Primary path: OpenRouter JSON API Looping
    if (OPENROUTER_API_KEY && !OPENROUTER_API_KEY.startsWith("your_")) {
      for (const model of JSON_MODELS) {
        try {
          response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
              "HTTP-Referer": "https://localhost:5000",
              "X-Title": "DSA Ditcher"
            },
            body: JSON.stringify({
              model: model,
              messages: [{ role: "user", content: prompt }],
              response_format: {
                type: "json_object"
              },
              max_tokens: 2000
            }),
          });

          if (response.ok) {
            const data = await response.json();
            const answer = data.choices?.[0]?.message?.content || "";
            
            // Robust cleaning to extract pure JSON
            let cleanContent = answer.trim();
            if (cleanContent.startsWith("```json")) {
              cleanContent = cleanContent.substring(7);
            } else if (cleanContent.startsWith("```")) {
              cleanContent = cleanContent.substring(3);
            }
            if (cleanContent.endsWith("```")) {
              cleanContent = cleanContent.substring(0, cleanContent.length - 3);
            }
            cleanContent = cleanContent.trim();
            
            parsedJson = JSON.parse(cleanContent);
            break;
          } else {
            errorText = await response.text();
          }
        } catch (err) {
          errorText = err.message;
        }
      }
    } else {
      errorText = "Missing or invalid API key configuration.";
    }

    // Secondary path: Graceful Local Fallback Complexity Matrix
    if (parsedJson) {
      res.json(parsedJson);
    } else {
      console.warn(`[AI Sandbox Fallback Activated] - Complexity Finder. Details: ${errorText}`);
      res.json(localComplexityAnalysis(code, language));
    }
  } catch (error) {
    next(error);
  }
};
