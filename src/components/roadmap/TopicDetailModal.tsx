import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, BookOpen, Code, CheckCircle, Circle, PlayCircle } from "lucide-react";

interface TopicResource {
  title: string;
  type: "article" | "video" | "practice" | "documentation";
  url: string;
  difficulty?: "easy" | "medium" | "hard";
}

interface TopicData {
  id: string;
  title: string;
  description: string;
  resources: TopicResource[];
  practiceProblems: {
    title: string;
    platform: string;
    url: string;
    difficulty: "easy" | "medium" | "hard";
  }[];
}

// Topic data mapping
const topicDataMap: Record<string, TopicData> = {
  "arrays": {
    id: "arrays",
    title: "Arrays",
    description: "Arrays are fundamental data structures that store elements in contiguous memory locations. They provide O(1) access time and are the building blocks for many other data structures.",
    resources: [
      { title: "Arrays - GeeksforGeeks", type: "article", url: "https://www.geeksforgeeks.org/array-data-structure/" },
      { title: "Array Methods in JavaScript", type: "documentation", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array" },
      { title: "Arrays Explained - Video", type: "video", url: "https://www.youtube.com/watch?v=QJNwK2uJyGs" },
    ],
    practiceProblems: [
      { title: "Two Sum", platform: "LeetCode", url: "https://leetcode.com/problems/two-sum/", difficulty: "easy" },
      { title: "Best Time to Buy and Sell Stock", platform: "LeetCode", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", difficulty: "easy" },
      { title: "Contains Duplicate", platform: "LeetCode", url: "https://leetcode.com/problems/contains-duplicate/", difficulty: "easy" },
      { title: "Maximum Subarray", platform: "LeetCode", url: "https://leetcode.com/problems/maximum-subarray/", difficulty: "medium" },
    ]
  },
  "linked-lists": {
    id: "linked-lists",
    title: "Linked Lists",
    description: "Linked lists are linear data structures where elements are stored in nodes connected via pointers. They provide efficient insertion and deletion operations.",
    resources: [
      { title: "Linked List - GeeksforGeeks", type: "article", url: "https://www.geeksforgeeks.org/linked-list-set-1-introduction/" },
      { title: "Linked Lists Visualized", type: "video", url: "https://www.youtube.com/watch?v=njTh_OwMljA" },
    ],
    practiceProblems: [
      { title: "Reverse Linked List", platform: "LeetCode", url: "https://leetcode.com/problems/reverse-linked-list/", difficulty: "easy" },
      { title: "Merge Two Sorted Lists", platform: "LeetCode", url: "https://leetcode.com/problems/merge-two-sorted-lists/", difficulty: "easy" },
      { title: "Linked List Cycle", platform: "LeetCode", url: "https://leetcode.com/problems/linked-list-cycle/", difficulty: "easy" },
    ]
  },
  "stacks": {
    id: "stacks",
    title: "Stacks",
    description: "Stacks follow LIFO (Last In First Out) principle. Common operations include push, pop, and peek with O(1) time complexity.",
    resources: [
      { title: "Stack Data Structure", type: "article", url: "https://www.geeksforgeeks.org/stack-data-structure/" },
      { title: "Stacks - Video Tutorial", type: "video", url: "https://www.youtube.com/watch?v=KcT3aVgrrpU" },
    ],
    practiceProblems: [
      { title: "Valid Parentheses", platform: "LeetCode", url: "https://leetcode.com/problems/valid-parentheses/", difficulty: "easy" },
      { title: "Min Stack", platform: "LeetCode", url: "https://leetcode.com/problems/min-stack/", difficulty: "medium" },
    ]
  },
  "queues": {
    id: "queues",
    title: "Queues",
    description: "Queues follow FIFO (First In First Out) principle. Used in BFS, scheduling, and buffering operations.",
    resources: [
      { title: "Queue Data Structure", type: "article", url: "https://www.geeksforgeeks.org/queue-data-structure/" },
    ],
    practiceProblems: [
      { title: "Implement Queue using Stacks", platform: "LeetCode", url: "https://leetcode.com/problems/implement-queue-using-stacks/", difficulty: "easy" },
    ]
  },
  "trees": {
    id: "trees",
    title: "Trees",
    description: "Trees are hierarchical data structures with a root node and child nodes. Binary trees, BSTs, and balanced trees are common variants.",
    resources: [
      { title: "Binary Tree - GeeksforGeeks", type: "article", url: "https://www.geeksforgeeks.org/binary-tree-data-structure/" },
      { title: "Tree Traversals Explained", type: "video", url: "https://www.youtube.com/watch?v=9RHO6jU--GU" },
    ],
    practiceProblems: [
      { title: "Maximum Depth of Binary Tree", platform: "LeetCode", url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/", difficulty: "easy" },
      { title: "Invert Binary Tree", platform: "LeetCode", url: "https://leetcode.com/problems/invert-binary-tree/", difficulty: "easy" },
      { title: "Validate BST", platform: "LeetCode", url: "https://leetcode.com/problems/validate-binary-search-tree/", difficulty: "medium" },
    ]
  },
  "graphs": {
    id: "graphs",
    title: "Graphs",
    description: "Graphs consist of vertices connected by edges. They model networks, relationships, and many real-world problems.",
    resources: [
      { title: "Graph Data Structure", type: "article", url: "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/" },
    ],
    practiceProblems: [
      { title: "Number of Islands", platform: "LeetCode", url: "https://leetcode.com/problems/number-of-islands/", difficulty: "medium" },
      { title: "Clone Graph", platform: "LeetCode", url: "https://leetcode.com/problems/clone-graph/", difficulty: "medium" },
    ]
  },
  "sorting": {
    id: "sorting",
    title: "Sorting Algorithms",
    description: "Sorting algorithms arrange elements in a specific order. Understanding their time and space complexities is crucial for optimization.",
    resources: [
      { title: "Sorting Algorithms - GeeksforGeeks", type: "article", url: "https://www.geeksforgeeks.org/sorting-algorithms/" },
      { title: "Sorting Visualized", type: "video", url: "https://www.youtube.com/watch?v=kPRA0W1kECg" },
    ],
    practiceProblems: [
      { title: "Sort Colors", platform: "LeetCode", url: "https://leetcode.com/problems/sort-colors/", difficulty: "medium" },
      { title: "Merge Intervals", platform: "LeetCode", url: "https://leetcode.com/problems/merge-intervals/", difficulty: "medium" },
    ]
  },
  "dynamic-prog": {
    id: "dynamic-prog",
    title: "Dynamic Programming",
    description: "Dynamic Programming optimizes recursive solutions by storing subproblem results. Master memoization and tabulation techniques.",
    resources: [
      { title: "DP - GeeksforGeeks", type: "article", url: "https://www.geeksforgeeks.org/dynamic-programming/" },
      { title: "DP Patterns", type: "video", url: "https://www.youtube.com/watch?v=oBt53YbR9Kk" },
    ],
    practiceProblems: [
      { title: "Climbing Stairs", platform: "LeetCode", url: "https://leetcode.com/problems/climbing-stairs/", difficulty: "easy" },
      { title: "House Robber", platform: "LeetCode", url: "https://leetcode.com/problems/house-robber/", difficulty: "medium" },
      { title: "Coin Change", platform: "LeetCode", url: "https://leetcode.com/problems/coin-change/", difficulty: "medium" },
    ]
  },
};

// Default topic data for topics not in the map
const getDefaultTopicData = (id: string, title: string): TopicData => ({
  id,
  title,
  description: `Learn about ${title} - an important concept in Data Structures and Algorithms.`,
  resources: [
    { title: `${title} - GeeksforGeeks`, type: "article", url: `https://www.geeksforgeeks.org/${id.replace(/-/g, '-')}/` },
  ],
  practiceProblems: []
});

interface TopicDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  topicId: string | null;
  topicTitle: string;
  isCompleted: boolean;
  onToggleComplete: (topicId: string) => void;
}

const TopicDetailModal = ({
  isOpen,
  onClose,
  topicId,
  topicTitle,
  isCompleted,
  onToggleComplete
}: TopicDetailModalProps) => {
  if (!topicId) return null;

  const topicData = topicDataMap[topicId] || getDefaultTopicData(topicId, topicTitle);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "hard": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "video": return <PlayCircle className="w-4 h-4" />;
      case "article": return <BookOpen className="w-4 h-4" />;
      case "practice": return <Code className="w-4 h-4" />;
      default: return <ExternalLink className="w-4 h-4" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-foreground">{topicData.title}</DialogTitle>
            <Button
              variant={isCompleted ? "default" : "outline"}
              size="sm"
              onClick={() => onToggleComplete(topicId)}
              className="gap-2"
            >
              {isCompleted ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Completed
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4" />
                  Mark Complete
                </>
              )}
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Description */}
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-muted-foreground">{topicData.description}</p>
          </div>

          {/* Learning Resources */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Learning Resources
            </h3>
            <div className="space-y-2">
              {topicData.resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors border border-border group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground">{getResourceIcon(resource.type)}</span>
                    <span className="text-foreground group-hover:text-primary transition-colors">{resource.title}</span>
                  </div>
                  <Badge variant="outline" className="capitalize">{resource.type}</Badge>
                </a>
              ))}
            </div>
          </div>

          {/* Practice Problems */}
          {topicData.practiceProblems.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <Code className="w-5 h-5 text-primary" />
                Practice Problems
              </h3>
              <div className="space-y-2">
                {topicData.practiceProblems.map((problem, index) => (
                  <a
                    key={index}
                    href={problem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors border border-border group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-foreground group-hover:text-primary transition-colors">{problem.title}</span>
                      <Badge variant="outline" className="text-xs">{problem.platform}</Badge>
                    </div>
                    <Badge className={`${getDifficultyColor(problem.difficulty)} capitalize border`}>
                      {problem.difficulty}
                    </Badge>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TopicDetailModal;
