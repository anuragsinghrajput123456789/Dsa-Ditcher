import { Target } from "lucide-react";

interface SidebarProps {
  savedSnippets: any[];
  onLoadSnippet: (snippet: any) => void;
  onCodeChange: (code: string) => void;
}

const Sidebar = ({ savedSnippets, onLoadSnippet, onCodeChange }: SidebarProps) => {
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

  return (
    <div className="space-y-6">
      {/* Common Snippets */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Common Snippets</h3>
        <div className="space-y-2">
          {commonSnippets.map((snippet, index) => (
            <button
              key={index}
              onClick={() => onCodeChange(snippet.code)}
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
                    onClick={() => onLoadSnippet(snippet)}
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

      {/* Quick Reference sections */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Complexity Reference</h3>
        <div className="space-y-3 text-sm">
          <div className="border-l-4 border-green-500 pl-3">
            <div className="font-medium text-green-700">O(1) - Constant</div>
            <div className="text-gray-600">Hash table lookup, array access</div>
          </div>
          <div className="border-l-4 border-blue-500 pl-3">
            <div className="font-medium text-blue-700">O(log n) - Logarithmic</div>
            <div className="text-gray-600">Binary search, balanced trees</div>
          </div>
          <div className="border-l-4 border-yellow-500 pl-3">
            <div className="font-medium text-yellow-700">O(n) - Linear</div>
            <div className="text-gray-600">Single loop, array traversal</div>
          </div>
          <div className="border-l-4 border-orange-500 pl-3">
            <div className="font-medium text-orange-700">O(n log n) - Log-linear</div>
            <div className="text-gray-600">Merge sort, heap sort</div>
          </div>
          <div className="border-l-4 border-red-500 pl-3">
            <div className="font-medium text-red-700">O(n²) - Quadratic</div>
            <div className="text-gray-600">Nested loops, bubble sort</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Tips</h3>
        <div className="space-y-3 text-sm text-gray-600">
          <div>• Use meaningful variable names</div>
          <div>• Comment your complex logic</div>
          <div>• Test with edge cases</div>
          <div>• Consider time & space complexity</div>
          <div>• Practice regularly</div>
          <div>• Use hash maps for O(1) lookups</div>
          <div>• Two pointers for sorted arrays</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
