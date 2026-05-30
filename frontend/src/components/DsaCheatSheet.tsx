import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, Layers, ShieldCheck, Compass, Code, 
  HelpCircle, ChevronRight, Eye, RefreshCw, Zap
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Flashcard {
  id: string;
  patternName: string;
  trigger: string;
  summary: string;
  timeComplexity: string;
  spaceComplexity: string;
  cheatCode: string;
  snippet: string;
  problems: { title: string; url: string }[];
}

const DsaCheatSheet = () => {
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);

  const complexities = [
    { name: "Array", access: "O(1)", search: "O(n)", insert: "O(n)", delete: "O(n)", space: "O(n)" },
    { name: "Singly Linked List", access: "O(n)", search: "O(n)", insert: "O(1)", delete: "O(1)", space: "O(n)" },
    { name: "Doubly Linked List", access: "O(n)", search: "O(n)", insert: "O(1)", delete: "O(1)", space: "O(n)" },
    { name: "Stack", access: "O(n)", search: "O(n)", insert: "O(1)", delete: "O(1)", space: "O(n)" },
    { name: "Queue", access: "O(n)", search: "O(n)", insert: "O(1)", delete: "O(1)", space: "O(n)" },
    { name: "Hash Table", access: "N/A", search: "O(1)", insert: "O(1)", delete: "O(1)", space: "O(n)" },
    { name: "Binary Search Tree", access: "O(log n)", search: "O(log n)", insert: "O(log n)", delete: "O(log n)", space: "O(n)" },
    { name: "AVL Tree", access: "O(log n)", search: "O(log n)", insert: "O(log n)", delete: "O(log n)", space: "O(n)" },
    { name: "Min/Max Heap", access: "N/A", search: "O(n)", insert: "O(log n)", delete: "O(log n)", space: "O(n)" },
  ];

  const flashcards: Flashcard[] = [
    {
      id: "sliding-window",
      patternName: "Sliding Window",
      trigger: "Input is a linear data structure (array, list, string) and you're asked to find a subarray/substring satisfying a size or constraint requirement.",
      summary: "Maintains a subset of elements (window) and dynamically grows or shrinks it using two boundaries (left and right pointer) to avoid recalculating the sum or features from scratch.",
      timeComplexity: "O(N)",
      spaceComplexity: "O(1) / O(K)",
      cheatCode: "Slide the right boundary to expand the window. Shrink from the left as soon as the constraint is violated.",
      snippet: `// Finding max sum subarray of size k
let maxSum = 0, windowSum = 0;
for (let i = 0; i < arr.length; i++) {
  windowSum += arr[i];
  if (i >= k - 1) {
    maxSum = Math.max(maxSum, windowSum);
    windowSum -= arr[i - (k - 1)]; // Shrink window
  }
}`,
      problems: [
        { title: "Longest Substring Without Repeating Characters", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
        { title: "Minimum Size Subarray Sum", url: "https://leetcode.com/problems/minimum-size-subarray-sum/" }
      ]
    },
    {
      id: "two-pointers",
      patternName: "Two Pointers",
      trigger: "Array or list is sorted and you need to find a pair, triplet, or search elements that satisfy a targeted formula.",
      summary: "Two reference pointers traverse the dataset in parallel (either starting from both ends inwards, or side-by-side) to eliminate unnecessary checks.",
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      cheatCode: "If sorted, move pointers closer based on whether the current sum is smaller or larger than target.",
      snippet: `// Target sum pair in sorted array
let left = 0, right = arr.length - 1;
while (left < right) {
  const currentSum = arr[left] + arr[right];
  if (currentSum === target) return [left, right];
  currentSum < target ? left++ : right--;
}`,
      problems: [
        { title: "Two Sum II - Input Array Is Sorted", url: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/" },
        { title: "Container With Most Water", url: "https://leetcode.com/problems/container-with-most-water/" }
      ]
    },
    {
      id: "fast-slow",
      patternName: "Fast & Slow Pointers",
      trigger: "Cyclic structure check needed in linked list, array index loop or checking matching patterns in loops.",
      summary: "Two pointers move at different speeds (slow moves 1 step, fast moves 2 steps). If a cycle exists, they are guaranteed to meet eventually.",
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      cheatCode: "Also known as Floyd's Tortoise and Hare algorithm. Highly useful for finding the middle node or cycle start.",
      snippet: `// Cycle detection
let slow = head, fast = head;
while (fast && fast.next) {
  slow = slow.next;
  fast = fast.next.next;
  if (slow === fast) return true; // Cycle found!
}
return false;`,
      problems: [
        { title: "Linked List Cycle", url: "https://leetcode.com/problems/linked-list-cycle/" },
        { title: "Find the Duplicate Number", url: "https://leetcode.com/problems/find-the-duplicate-number/" }
      ]
    },
    {
      id: "merge-intervals",
      patternName: "Merge Intervals",
      trigger: "Dealing with overlapping intervals, calendar scheduling, timeline merges, or scheduling tasks.",
      summary: "Sort intervals by their start times, then loop through to check if the current interval overlaps with the last merged one, merging them if needed.",
      timeComplexity: "O(N log N)",
      spaceComplexity: "O(N)",
      cheatCode: "Overlap happens if currentStart <= lastMergedEnd. Set end to max(lastMergedEnd, currentEnd).",
      snippet: `// Merging overlapping intervals
intervals.sort((a, b) => a[0] - b[0]);
const merged = [intervals[0]];
for (let i = 1; i < intervals.length; i++) {
  const last = merged[merged.length - 1];
  const curr = intervals[i];
  if (curr[0] <= last[1]) {
    last[1] = Math.max(last[1], curr[1]); // Merge
  } else {
    merged.push(curr);
  }
}`,
      problems: [
        { title: "Merge Intervals", url: "https://leetcode.com/problems/merge-intervals/" },
        { title: "Insert Interval", url: "https://leetcode.com/problems/insert-interval/" }
      ]
    },
    {
      id: "bfs",
      patternName: "Breadth First Search (BFS)",
      trigger: "Find shortest path in an unweighted graph, level-by-level traversal of trees, or flood fill operations.",
      summary: "Explores all vertices/nodes at the current level before moving to the next. Uses a Queue to store expanding node tracks.",
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V)",
      cheatCode: "Always use a Queue. Maintain a Set of visited nodes to avoid processing the same node infinitely.",
      snippet: `// Queue-based BFS
const queue = [root];
const visited = new Set([root]);
while (queue.length > 0) {
  const node = queue.shift();
  for (let neighbor of adj[node]) {
    if (!visited.has(neighbor)) {
      visited.add(neighbor);
      queue.push(neighbor);
    }
  }
}`,
      problems: [
        { title: "Binary Tree Level Order Traversal", url: "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
        { title: "Rotting Oranges", url: "https://leetcode.com/problems/rotting-oranges/" }
      ]
    },
    {
      id: "dfs",
      patternName: "Depth First Search (DFS)",
      trigger: "Need to visit every path/node, generate all permutations/combinations, solve maze/backtracking paths.",
      summary: "Explores as deep as possible along each branch before backtracking. Typically implemented via Recursion (Call Stack).",
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V)",
      cheatCode: "Define base cases first. Recursively call for children/neighbors, and backtrack by reverting state.",
      snippet: `// Recursive DFS
const visited = new Set();
function dfs(node) {
  if (visited.has(node)) return;
  visited.add(node);
  // Do operation...
  for (let neighbor of adj[node]) {
    dfs(neighbor);
  }
}`,
      problems: [
        { title: "Number of Islands", url: "https://leetcode.com/problems/number-of-islands/" },
        { title: "Permutations", url: "https://leetcode.com/problems/permutations/" }
      ]
    }
  ];

  const getBadgeColor = (complexity: string) => {
    if (complexity.includes("O(1)")) return "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30";
    if (complexity.includes("log")) return "bg-sky-500/20 text-sky-600 dark:text-sky-400 border-sky-500/30";
    if (complexity.includes("O(n)")) return "bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30";
    return "bg-slate-500/20 text-slate-600 dark:text-slate-400 border-slate-500/30";
  };

  const handleCardClick = (cardId: string) => {
    setFlippedCardId(flippedCardId === cardId ? null : cardId);
  };

  return (
    <div className="space-y-10">
      
      {/* SECTION 1: COMPLEXITIES CHEAT SHEET */}
      <Card className="glass-card border border-border/50 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full filter blur-3xl"></div>
        <CardHeader className="pb-3 border-b border-border/20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <CardTitle className="text-xl sm:text-2xl font-black flex items-center gap-2">
                <Zap className="w-5.5 h-5.5 text-cyan-400" />
                Big-O Complexity Matrix
              </CardTitle>
              <CardDescription className="text-sm font-medium mt-1">
                Average-case performance metrics of standard structures at a glance.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">Excellent</span>
              <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded bg-sky-500/15 text-sky-600 dark:text-sky-400">Good</span>
              <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400">Fair</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-muted/40 dark:bg-muted/10 border-b border-border/20 text-muted-foreground font-semibold">
                <th className="p-4 font-bold">Data Structure</th>
                <th className="p-4">Access</th>
                <th className="p-4">Search</th>
                <th className="p-4">Insertion</th>
                <th className="p-4">Deletion</th>
                <th className="p-4">Space Complexity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/10">
              {complexities.map((row, idx) => (
                <tr 
                  key={idx} 
                  className="hover:bg-muted/20 dark:hover:bg-muted/5 transition-colors group"
                >
                  <td className="p-4 font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60"></span>
                    {row.name}
                  </td>
                  <td className="p-4">
                    <Badge variant="outline" className={`font-mono font-bold ${getBadgeColor(row.access)}`}>
                      {row.access}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline" className={`font-mono font-bold ${getBadgeColor(row.search)}`}>
                      {row.search}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline" className={`font-mono font-bold ${getBadgeColor(row.insert)}`}>
                      {row.insert}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline" className={`font-mono font-bold ${getBadgeColor(row.delete)}`}>
                      {row.delete}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline" className={`font-mono font-semibold ${getBadgeColor(row.space)}`}>
                      {row.space}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* SECTION 2: 3D FLASHCARDS DECK */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl sm:text-2xl font-black flex items-center gap-2">
              <Layers className="w-5.5 h-5.5 text-purple-400" />
              SDE Interview Patterns Flashcards
            </h3>
            <p className="text-sm font-medium text-muted-foreground mt-0.5">
              Click on a card to flip it and access cheat codes, templates, and problems.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-full">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>Click to Flip Card</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flashcards.map((card) => {
            const isFlipped = flippedCardId === card.id;
            return (
              <div 
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className="h-[380px] w-full perspective-1000 cursor-pointer group"
              >
                <div 
                  className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
                    isFlipped ? "rotate-y-180" : ""
                  }`}
                >
                  
                  {/* CARD FRONT CONTAINER */}
                  <Card className="absolute inset-0 w-full h-full backface-hidden glass-card hover:border-primary/50 transition-all duration-300 shadow-lg flex flex-col justify-between overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge variant="outline" className="border-primary/30 text-primary font-bold bg-primary/5">
                          Pattern Track
                        </Badge>
                        <Zap className="w-5 h-5 text-yellow-500 opacity-60 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <CardTitle className="text-lg sm:text-xl font-extrabold mt-2 group-hover:text-primary transition-colors">
                        {card.patternName}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 flex-grow flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Trigger Context:</span>
                        <p className="text-xs text-foreground/85 leading-relaxed bg-muted/30 p-2.5 rounded-lg border border-border/30 line-clamp-3">
                          {card.trigger}
                        </p>
                      </div>
                      
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Description:</span>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                          {card.summary}
                        </p>
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-border/20 mt-auto">
                        <div className="flex gap-2">
                          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 font-mono text-[10px] font-bold">
                            Time: {card.timeComplexity}
                          </Badge>
                          <Badge variant="outline" className="bg-sky-500/10 text-sky-500 font-mono text-[10px] font-bold">
                            Space: {card.spaceComplexity}
                          </Badge>
                        </div>
                        <span className="text-xs text-primary font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform duration-200">
                          Reveal Template
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* CARD BACK CONTAINER */}
                  <Card className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-slate-900 border border-purple-500/40 text-slate-100 shadow-2xl flex flex-col justify-between overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                    <CardHeader className="pb-1 pt-4 px-4 flex flex-row justify-between items-center">
                      <CardTitle className="text-base font-extrabold text-purple-300">
                        {card.patternName} Code Template
                      </CardTitle>
                      <Badge className="bg-purple-600/35 border-purple-400/35 text-[10px] uppercase font-bold tracking-wider">
                        Cheat Sheet
                      </Badge>
                    </CardHeader>
                    <CardContent className="px-4 pb-4 pt-1 space-y-3 flex-grow flex flex-col justify-between overflow-y-auto">
                      
                      {/* Code Snippet Box */}
                      <div className="relative">
                        <div className="absolute top-2 right-2 text-[9px] uppercase tracking-widest font-black text-muted-foreground/60 select-none">JS Snippet</div>
                        <pre className="text-[10px] font-mono leading-relaxed bg-black/50 p-2.5 rounded-lg border border-border/10 overflow-x-auto text-cyan-300 max-h-[140px] shadow-inner select-all">
                          <code>{card.snippet}</code>
                        </pre>
                      </div>

                      {/* Cheat code message */}
                      <div className="bg-purple-950/30 p-2 rounded-lg border border-purple-500/20">
                        <span className="text-[9px] font-black text-purple-300 uppercase tracking-widest block">Pro Tip / Cheat Code:</span>
                        <p className="text-[11px] text-purple-100 mt-0.5 leading-snug">{card.cheatCode}</p>
                      </div>

                      {/* Problems to practice */}
                      <div className="space-y-1.5 mt-auto">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">Core LeetCode Problems:</span>
                        <div className="flex flex-col gap-1">
                          {card.problems.map((prob, pIdx) => (
                            <a
                              key={pIdx}
                              href={prob.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()} // Stop flip!
                              className="text-xs text-sky-400 hover:text-sky-300 hover:underline flex items-center justify-between p-1 px-2 bg-slate-950 rounded border border-border/5 group/link transition-colors"
                            >
                              <span className="truncate max-w-[200px] font-medium">{prob.title}</span>
                              <Code className="w-3 h-3 shrink-0 opacity-60 group-hover/link:opacity-100" />
                            </a>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default DsaCheatSheet;
