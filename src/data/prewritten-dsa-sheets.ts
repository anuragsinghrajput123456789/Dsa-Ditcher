
export interface PrewrittenDsaSheet {
  title: string;
  description: string;
  problems: string;
}

export const prewrittenDsaSheets: PrewrittenDsaSheet[] = [
  {
    title: "Striver's SDE Sheet",
    description: "A curated list of problems to prepare for software development engineer roles, created by Striver.",
    problems: `Arrays Part-I
Set Matrix Zeroes
Pascal's Triangle
Next Permutation
Kadane's Algorithm
Sort an array of 0's 1's and 2's
Stock Buy and Sell

Arrays Part-II
Rotate Matrix
Merge Overlapping Subintervals
Merge two sorted Arrays without extra space
Find the duplicate in an array of N+1 integers.
Repeat and Missing Number
Inversion of Array (Pre-req: Merge Sort)

Arrays Part-III
Search in a 2d Matrix
Pow(X,n)
Majority Element (>N/2 times)
Majority Element (>N/3 times)
Grid Unique Paths
Reverse Pairs (Hard)`
  },
  {
    title: "LeetCode 150",
    description: "A collection of 150 most common interview questions from LeetCode.",
    problems: `Two Sum
Valid Anagram
Contains Duplicate
Group Anagrams
Top K Frequent Elements
Product of Array Except Self
Valid Sudoku
Encode and Decode Strings
Longest Consecutive Sequence
Valid Palindrome
Two Sum II - Input Array Is Sorted
3Sum
Container With Most Water
Trapping Rain Water
Best Time to Buy and Sell Stock
Longest Substring Without Repeating Characters`
  }
];
