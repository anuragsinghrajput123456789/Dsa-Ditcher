'use client';

import { useState } from "react";
import { Library, Sparkles, RefreshCw, ChevronRight, CheckCircle2, Code2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DsaCheatSheet() {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleFlip = (id: number) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const flashcards = [
    {
      id: 1,
      pattern: "Two Pointers",
      category: "Array / String",
      problem: "Two Sum II / Container With Most Water",
      template: "left = 0, right = arr.length - 1; while(left < right)",
      explanation: "Iterate from both ends of a sorted sequence towards the center to solve pair-matching or target bounds in O(n) time.",
      leetcode: "LeetCode #11, #167"
    },
    {
      id: 2,
      pattern: "Sliding Window",
      category: "Array / Substring",
      problem: "Minimum Size Subarray Sum",
      template: "for(right = 0; right < n; right++) { expand; while(invalid) shrink; }",
      explanation: "Maintain a dynamic window boundary over a continuous subsegment to compute running totals or maximum constraints in linear time.",
      leetcode: "LeetCode #209, #3"
    },
    {
      id: 3,
      pattern: "Fast & Slow Pointers",
      category: "Linked List",
      problem: "Linked List Cycle Detection",
      template: "slow = head, fast = head; while(fast && fast.next) slow = slow.next, fast = fast.next.next",
      explanation: "Advance one pointer twice as fast as the other to detect linked list loops (Floyd's Tortoise and Hare algorithm).",
      leetcode: "LeetCode #141, #142"
    },
    {
      id: 4,
      pattern: "BFS Traversal",
      category: "Graph / Tree",
      problem: "Binary Tree Level Order Traversal",
      template: "queue = [root]; while(queue.length) { level = []; node = queue.shift(); }",
      explanation: "Explore all neighbor nodes level-by-level using a FIFO queue. Guarantees finding the shortest unweighted path.",
      leetcode: "LeetCode #102, #200"
    },
    {
      id: 5,
      pattern: "Top-Down Dynamic Programming",
      category: "Dynamic Programming",
      problem: "Climbing Stairs / Coin Change",
      template: "dp = {}; memo(n) => if(n in dp) return dp[n]; dp[n] = solve(n-1)+solve(n-2)",
      explanation: "Combine recursion with memoization tables to cache overlapping subproblems and transform O(2^n) complexity into linear O(n).",
      leetcode: "LeetCode #70, #322"
    },
    {
      id: 6,
      pattern: "Prefix Sum",
      category: "Array Range Queries",
      problem: "Subarray Sum Equals K",
      template: "prefix[i] = prefix[i-1] + arr[i]; rangeSum(l,r) = prefix[r] - prefix[l-1]",
      explanation: "Precompute cumulative totals to evaluate any arbitrary subarray sum range in O(1) constant time.",
      leetcode: "LeetCode #560, #303"
    }
  ];

  const complexityData = [
    { name: "Array", access: "O(1)", search: "O(n)", insertion: "O(n)", deletion: "O(n)", space: "O(n)" },
    { name: "Singly Linked List", access: "O(n)", search: "O(n)", insertion: "O(1)", deletion: "O(1)", space: "O(n)" },
    { name: "Hash Table", access: "N/A", search: "O(1)", insertion: "O(1)", deletion: "O(1)", space: "O(n)" },
    { name: "Binary Search Tree", access: "O(log n)", search: "O(log n)", insertion: "O(log n)", deletion: "O(log n)", space: "O(n)" },
    { name: "Heap (Priority Queue)", access: "N/A", search: "O(n)", insertion: "O(log n)", deletion: "O(log n)", space: "O(n)" },
  ];

  return (
    <div className="space-y-10 animate-fade-in">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-semibold">
          <Library className="w-3.5 h-3.5 text-violet-400" />
          <span>SDE REVISION KNOWLEDGE HUB</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          DSA Revision Matrix & 3D Flashcards
        </h1>
        <p className="text-xs text-[#B8B1CC] max-w-2xl mx-auto">
          Study essential interview patterns with 3D interactive flipping flashcards and quick Big-O complexity references.
        </p>
      </div>

      {/* 3D Flashcards Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span>Interactive 3D Pattern Flashcard Deck</span>
          </h2>
          <span className="text-xs text-[#77708D] italic">Click any card to flip and reveal technical details</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flashcards.map((card) => {
            const isFlipped = flippedCards[card.id];
            return (
              <div
                key={card.id}
                onClick={() => toggleFlip(card.id)}
                className="h-64 cursor-pointer perspective-1000 group"
              >
                <div
                  className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
                    isFlipped ? "rotate-y-180" : ""
                  }`}
                >
                  {/* Front Side */}
                  <div className="absolute inset-0 glass-panel glass-panel-hover p-6 rounded-2xl border border-violet-500/25 flex flex-col justify-between backface-hidden shadow-xl">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-violet-300 bg-violet-500/15 border border-violet-500/30 px-2.5 py-0.5 rounded-md">
                          {card.category}
                        </span>
                        <RefreshCw className="w-4 h-4 text-[#77708D] group-hover:text-violet-400 transition-colors" />
                      </div>
                      <h3 className="text-lg font-bold text-white pt-2">{card.pattern}</h3>
                      <p className="text-xs text-[#B8B1CC] line-clamp-2">{card.explanation}</p>
                    </div>

                    <div className="pt-4 border-t border-violet-500/15 flex items-center justify-between text-xs text-violet-400 font-semibold">
                      <span>Click to reveal template</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Back Side */}
                  <div className="absolute inset-0 bg-[#0E0A1F] p-6 rounded-2xl border border-magenta-500/30 flex flex-col justify-between backface-hidden rotate-y-180 shadow-2xl space-y-2">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between border-b border-magenta-500/20 pb-2">
                        <span className="text-xs font-bold text-magenta-300">{card.pattern} Template</span>
                        <span className="text-[10px] font-mono text-cyan-400">{card.leetcode}</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#05030D] border border-violet-500/30 font-mono text-[10px] text-violet-300 leading-relaxed overflow-x-auto">
                        {card.template}
                      </div>
                      <p className="text-[11px] text-[#B8B1CC] leading-tight">{card.problem}</p>
                    </div>

                    <div className="text-[10px] text-[#77708D] text-right italic">
                      Click to flip back
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Big-O Complexity Matrix Table */}
      <div className="glass-panel rounded-2xl p-6 border border-violet-500/20 shadow-2xl space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-violet-400" />
          <span>Data Structure Complexity Matrix</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-violet-500/20 text-violet-300 bg-[#05030D]/60">
                <th className="p-3">Data Structure</th>
                <th className="p-3">Access</th>
                <th className="p-3">Search</th>
                <th className="p-3">Insertion</th>
                <th className="p-3">Deletion</th>
                <th className="p-3">Space Worst</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-violet-500/10 text-[#F5F3FF]">
              {complexityData.map((row, idx) => (
                <tr key={idx} className="hover:bg-violet-500/5 transition-colors">
                  <td className="p-3 font-bold text-white font-sans">{row.name}</td>
                  <td className="p-3 text-emerald-400">{row.access}</td>
                  <td className="p-3 text-amber-400">{row.search}</td>
                  <td className="p-3 text-violet-300">{row.insertion}</td>
                  <td className="p-3 text-magenta-400">{row.deletion}</td>
                  <td className="p-3 text-cyan-300">{row.space}</td>
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
