export interface PrewrittenDsaSheet {
  title: string;
  description: string;
  problems: string;
  url?: string;
}

export const prewrittenDsaSheets: PrewrittenDsaSheet[] = [
  {
    title: "Striver's SDE Sheet",
    description: "Most popular DSA sheet with 191 problems covering all important topics for software engineering interviews.",
    problems: `Arrays:
1. Set Matrix Zero
2. Pascal Triangle
3. Next Permutation
4. Maximum Subarray
5. Sort 0s 1s and 2s

Linked List:
1. Reverse Linked List
2. Middle of Linked List
3. Merge Two Sorted Lists
4. Remove Nth Node
5. Add Two Numbers

Dynamic Programming:
1. Climbing Stairs
2. Frog Jump
3. House Robber
4. Coin Change
5. Longest Common Subsequence

And many more...`,
    url: "https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/"
  },
  {
    title: "Blind 75",
    description: "Curated list of 75 essential LeetCode problems that cover the most important patterns for coding interviews.",
    problems: `Array:
1. Two Sum
2. Best Time to Buy and Sell Stock
3. Contains Duplicate
4. Product of Array Except Self
5. Maximum Subarray

String:
1. Valid Anagram
2. Valid Parentheses
3. Valid Palindrome
4. Longest Substring Without Repeating Characters
5. Longest Palindromic Substring

Linked List:
1. Reverse Linked List
2. Detect Cycle in Linked List
3. Merge Two Sorted Lists
4. Merge k Sorted Lists
5. Remove Nth Node From End

Tree:
1. Maximum Depth of Binary Tree
2. Same Tree
3. Invert Binary Tree
4. Binary Tree Maximum Path Sum
5. Serialize and Deserialize Binary Tree

And 55 more problems...`,
    url: "https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions"
  },
  {
    title: "NeetCode 150",
    description: "Extended version of Blind 75 with 150 problems, organized by patterns with video explanations.",
    problems: `Arrays & Hashing:
1. Contains Duplicate
2. Valid Anagram
3. Two Sum
4. Group Anagrams
5. Top K Frequent Elements

Two Pointers:
1. Valid Palindrome
2. Two Sum II
3. 3Sum
4. Container With Most Water
5. Trapping Rain Water

Sliding Window:
1. Best Time to Buy and Sell Stock
2. Longest Substring Without Repeating Characters
3. Longest Repeating Character Replacement
4. Permutation in String
5. Minimum Window Substring

Stack:
1. Valid Parentheses
2. Min Stack
3. Evaluate Reverse Polish Notation
4. Generate Parentheses
5. Daily Temperatures

And 130 more problems...`,
    url: "https://neetcode.io/practice"
  },
  {
    title: "Love Babbar 450",
    description: "Comprehensive DSA sheet with 450 problems covering all data structures and algorithms for placement preparation.",
    problems: `Array:
1. Reverse the array
2. Find maximum and minimum element
3. Kth smallest element
4. Sort 0s, 1s and 2s
5. Move negative numbers to one side

String:
1. Reverse a string
2. Check palindrome
3. Find duplicate characters
4. Check rotation
5. Longest palindrome

Searching & Sorting:
1. Binary Search
2. Search in rotated sorted array
3. Square root using binary search
4. Bubble Sort
5. Selection Sort

Linked List:
1. Reverse linked list
2. Detect loop
3. Find middle element
4. Merge sorted lists
5. Add two numbers

And 430 more problems...`,
    url: "https://www.geeksforgeeks.org/dsa-sheet-by-love-babbar/"
  },
  {
    title: "LeetCode Top Interview Questions",
    description: "LeetCode's official collection of most frequently asked interview questions from top tech companies.",
    problems: `Easy Collection:
1. Two Sum
2. Reverse Integer
3. Palindrome Number
4. Roman to Integer
5. Longest Common Prefix

Medium Collection:
1. Add Two Numbers
2. Longest Substring Without Repeating Characters
3. Longest Palindromic Substring
4. ZigZag Conversion
5. Reverse Integer

Hard Collection:
1. Median of Two Sorted Arrays
2. Regular Expression Matching
3. Merge k Sorted Lists
4. Reverse Nodes in k-Group
5. Substring with Concatenation of All Words

Plus many more categorized by difficulty...`,
    url: "https://leetcode.com/explore/interview/card/top-interview-questions-easy/"
  },
  {
    title: "Company-Wise Questions",
    description: "Problems frequently asked by specific companies like Google, Amazon, Microsoft, Facebook, and more.",
    problems: `Google:
1. Two Sum
2. Longest Substring Without Repeating Characters
3. Median of Two Sorted Arrays
4. Trapping Rain Water
5. Valid Parentheses

Amazon:
1. Two Sum
2. Add Two Numbers
3. Longest Palindromic Substring
4. ZigZag Conversion
5. Reverse Integer

Microsoft:
1. Reverse Integer
2. Palindrome Number
3. Roman to Integer
4. Longest Common Prefix
5. Valid Parentheses

Facebook:
1. Two Sum
2. Add Two Numbers
3. Longest Substring Without Repeating Characters
4. Median of Two Sorted Arrays
5. Longest Palindromic Substring

And many more from other top companies...`,
    url: "https://leetcode.com/explore/interview/"
  },
  {
    title: "Data Structures Fundamentals",
    description: "Essential problems to master fundamental data structures like arrays, linked lists, stacks, queues, trees, and graphs.",
    problems: `Arrays:
1. Linear Search
2. Binary Search
3. Insertion Sort
4. Selection Sort
5. Bubble Sort

Linked Lists:
1. Singly Linked List Implementation
2. Doubly Linked List Implementation
3. Circular Linked List
4. Stack using Linked List
5. Queue using Linked List

Stacks:
1. Stack Implementation using Array
2. Balanced Parentheses
3. Infix to Postfix
4. Next Greater Element
5. Largest Rectangle in Histogram

Queues:
1. Queue Implementation using Array
2. Circular Queue
3. Priority Queue
4. Deque Implementation
5. Queue using Stacks

Trees:
1. Binary Tree Implementation
2. Binary Search Tree
3. Tree Traversals (Inorder, Preorder, Postorder)
4. Level Order Traversal
5. Height of Binary Tree

Graphs:
1. Graph Representation
2. BFS Traversal
3. DFS Traversal
4. Shortest Path Algorithms
5. Minimum Spanning Tree

And many more fundamental problems...`,
    url: "https://www.geeksforgeeks.org/data-structures/"
  }
];
