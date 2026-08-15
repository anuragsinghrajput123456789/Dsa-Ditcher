'use client';

import { useState } from "react";
import { 
  Sparkles, Layers, ShieldCheck, Code, 
  RefreshCw, Zap
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

export function DsaCheatSheet() {
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
      trigger: "Input is a linear structure (array, string) asking for subarray/substring satisfying a size constraint.",
      summary: "Maintains a subset window using two boundaries (left and right) to eliminate redundant recalculations.",
      timeComplexity: "O(N)",
      spaceComplexity: "O(1) / O(K)",
      cheatCode: "Expand right boundary to grow. Shrink left boundary as soon as constraint is violated.",
      snippet: `let windowSum = 0, maxSum = 0;
for (let i = 0; i < arr.length; i++) {
  windowSum += arr[i];
  if (i >= k - 1) {
    maxSum = Math.max(maxSum, windowSum);
    windowSum -= arr[i - (k - 1)];
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
      trigger: "Sorted array asking for pairs, triplets, or search values matching target formula.",
      summary: "Two reference pointers move inwards or in parallel to bypass $O(N^2)$ brute force loops.",
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      cheatCode: "If current sum < target move left pointer right; if current sum > target move right pointer left.",
      snippet: `let left = 0, right = arr.length - 1;
while (left < right) {
  const sum = arr[left] + arr[right];
  if (sum === target) return [left, right];
  sum < target ? left++ : right--;
}`,
      problems: [
        { title: "Two Sum II - Sorted", url: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/" },
        { title: "Container With Most Water", url: "https://leetcode.com/problems/container-with-most-water/" }
      ]
    },
    {
      id: "fast-slow",
      patternName: "Fast & Slow Pointers",
      trigger: "Linked list cycle detection, middle node calculation, or cyclic sequence loops.",
      summary: "Floyd's Tortoise and Hare algorithm: slow moves 1 step, fast moves 2 steps.",
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      cheatCode: "If a loop exists, fast will eventually overlap slow pointer.",
      snippet: `let slow = head, fast = head;
while (fast && fast.next) {
  slow = slow.next;
  fast = fast.next.next;
  if (slow === fast) return true;
}`,
      problems: [
        { title: "Linked List Cycle", url: "https://leetcode.com/problems/linked-list-cycle/" },
        { title: "Find the Duplicate Number", url: "https://leetcode.com/problems/find-the-duplicate-number/" }
      ]
    }
  ];

  return (
    <div className="space-y-10">
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white via-violet-200 to-violet-400 bg-clip-text text-transparent">
          Premium SDE Revision Hub & 3D Flashcards
        </h1>
        <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
          Interactive 3D pattern flashcards and Big-O space/time complexity matrices for interview prep.
        </p>
      </div>

      {/* 3D Flashcards Deck */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Layers className="w-5 h-5 text-violet-400" />
          <h2 className="text-xl font-bold">3D Pattern Flashcard Deck</h2>
          <span className="text-xs text-muted-foreground">(Click any card to flip and reveal cheat code & template)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {flashcards.map((card) => {
            const isFlipped = flippedCardId === card.id;

            return (
              <div
                key={card.id}
                onClick={() => setFlippedCardId(isFlipped ? null : card.id)}
                className="h-80 perspective-1000 cursor-pointer group"
              >
                <div className={`relative w-full h-full duration-700 transform-style-3d transition-transform ${isFlipped ? "rotate-y-180" : ""}`}>
                  
                  {/* Front Side */}
                  <div className="absolute inset-0 w-full h-full rounded-2xl bg-card border border-border/80 p-6 flex flex-col justify-between backface-hidden shadow-xl group-hover:border-violet-500/50 transition-colors">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="violet">{card.patternName}</Badge>
                        <RefreshCw className="w-4 h-4 text-muted-foreground group-hover:rotate-180 transition-transform duration-500" />
                      </div>
                      <h3 className="font-bold text-lg">{card.patternName}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{card.trigger}</p>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-4 border-t border-border/60">
                      <span className="text-emerald-400 font-mono">Time: {card.timeComplexity}</span>
                      <span className="text-violet-400 font-mono">Space: {card.spaceComplexity}</span>
                    </div>
                  </div>

                  {/* Back Side */}
                  <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-violet-950/90 to-indigo-950/90 border border-violet-500/40 p-6 flex flex-col justify-between rotate-y-180 backface-hidden shadow-2xl text-xs space-y-3">
                    <div>
                      <div className="flex items-center space-x-1.5 text-amber-400 font-bold mb-1">
                        <Zap className="w-4 h-4" />
                        <span>Cheat Strategy</span>
                      </div>
                      <p className="text-violet-200 text-[11px] leading-relaxed">{card.cheatCode}</p>
                    </div>

                    <div className="bg-black/60 p-2.5 rounded-xl border border-white/10 font-mono text-[10px] text-emerald-300 overflow-x-auto">
                      <pre>{card.snippet}</pre>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Complexity Matrix Table */}
      <div className="bg-card rounded-2xl p-6 border border-border/80 shadow-xl space-y-4">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-indigo-400" />
          <h2 className="text-xl font-bold">Big-O Complexity Matrix</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border/80 text-muted-foreground uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Data Structure</th>
                <th className="py-3 px-4">Access</th>
                <th className="py-3 px-4">Search</th>
                <th className="py-3 px-4">Insertion</th>
                <th className="py-3 px-4">Deletion</th>
                <th className="py-3 px-4">Space</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {complexities.map((row, idx) => (
                <tr key={idx} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-4 font-semibold text-foreground">{row.name}</td>
                  <td className="py-3 px-4 font-mono text-emerald-400">{row.access}</td>
                  <td className="py-3 px-4 font-mono text-amber-400">{row.search}</td>
                  <td className="py-3 px-4 font-mono text-indigo-400">{row.insert}</td>
                  <td className="py-3 px-4 font-mono text-rose-400">{row.delete}</td>
                  <td className="py-3 px-4 font-mono text-violet-400">{row.space}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default DsaCheatSheet;
