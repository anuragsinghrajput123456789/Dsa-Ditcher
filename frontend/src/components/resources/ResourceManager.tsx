import { useState, useEffect } from "react";
import { Plus, Search, RefreshCw, Trash2, Edit3, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ResourceCard from "./ResourceCard";
import ResourceForm from "./ResourceForm";
import { useToast } from "@/hooks/use-toast";

interface Resource {
  id: string;
  title: string;
  url: string;
  description: string;
  type: "Video" | "Article" | "Course" | "Book" | "Practice";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  topic: string;
  author?: string;
  dateAdded: string;
}

interface ResourceManagerProps {
  topic: string;
}

const ResourceManager = ({ topic }: ResourceManagerProps) => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const { toast } = useToast();

  // Load resources from localStorage on component mount
  useEffect(() => {
    const savedResources = localStorage.getItem(`resources-${topic}`);
    if (savedResources) {
      const parsed = JSON.parse(savedResources);
      if (parsed.length === 0) {
        const defaultResources = getDefaultResources(topic);
        setResources(defaultResources);
        localStorage.setItem(`resources-${topic}`, JSON.stringify(defaultResources));
      } else {
        setResources(parsed);
      }
    } else {
      // Set default resources for the topic
      const defaultResources = getDefaultResources(topic);
      setResources(defaultResources);
      localStorage.setItem(`resources-${topic}`, JSON.stringify(defaultResources));
    }
  }, [topic]);

  // Save resources to localStorage whenever resources change
  useEffect(() => {
    localStorage.setItem(`resources-${topic}`, JSON.stringify(resources));
  }, [resources, topic]);

  const getDefaultResources = (topicName: string): Resource[] => {
    const baseResources = {
      arrays: [
        {
          id: "arr-1",
          title: "Array Data Structure - Complete Guide",
          url: "https://www.geeksforgeeks.org/array-data-structure/",
          description: "Comprehensive guide covering array basics, operations, memory allocation, and common interview challenges.",
          type: "Article" as const,
          difficulty: "Beginner" as const,
          rating: 4.7,
          topic: topicName,
          author: "GeeksforGeeks",
          dateAdded: new Date().toISOString(),
        },
        {
          id: "arr-2",
          title: "Array Core Interview Playlist",
          url: "https://www.youtube.com/watch?v=37E9ckMDdTk",
          description: "Striver's masterclass on arrays covering beginner searches up to hard segment rotations and subsegment sums.",
          type: "Video" as const,
          difficulty: "Intermediate" as const,
          rating: 4.9,
          topic: topicName,
          author: "take U forward",
          dateAdded: new Date().toISOString(),
        },
        {
          id: "arr-3",
          title: "LeetCode Array Explore Deck",
          url: "https://leetcode.com/explore/learn/card/fun-with-arrays/",
          description: "Structured practice track on LeetCode covering basic operations, dynamic resizing, and double traversal patterns.",
          type: "Practice" as const,
          difficulty: "Beginner" as const,
          rating: 4.6,
          topic: topicName,
          author: "LeetCode Explore",
          dateAdded: new Date().toISOString(),
        }
      ],
      linkedlists: [
        {
          id: "ll-1",
          title: "Linked List Implementation & Tracing",
          url: "https://leetcode.com/explore/learn/card/linked-list/",
          description: "LeetCode's comprehensive linked list learn path. Learn pointer tracking, reversal, and cycle detections.",
          type: "Course" as const,
          difficulty: "Beginner" as const,
          rating: 4.8,
          topic: topicName,
          author: "LeetCode",
          dateAdded: new Date().toISOString(),
        },
        {
          id: "ll-2",
          title: "Linked Lists Complete Lectures",
          url: "https://www.youtube.com/watch?v=Nq7ok-OyEpg",
          description: "In-depth video tutorials covering Singly, Doubly, and Circular Linked Lists with standard interview questions.",
          type: "Video" as const,
          difficulty: "Intermediate" as const,
          rating: 4.9,
          topic: topicName,
          author: "take U forward",
          dateAdded: new Date().toISOString(),
        }
      ],
      stacks: [
        {
          id: "st-1",
          title: "Stack Data Structure - GFG Guide",
          url: "https://www.geeksforgeeks.org/stack-data-structure/",
          description: "Understanding LIFO principles, array/list implementations, and evaluation of postfix expressions.",
          type: "Article" as const,
          difficulty: "Beginner" as const,
          rating: 4.5,
          topic: topicName,
          author: "GeeksforGeeks",
          dateAdded: new Date().toISOString(),
        },
        {
          id: "st-2",
          title: "Stacks Interview Questions Explained",
          url: "https://www.youtube.com/watch?v=bxRVz8zklWM",
          description: "Deep dive into stacks: parenthesis matching, next greater element, min stack, and largest histogram area.",
          type: "Video" as const,
          difficulty: "Intermediate" as const,
          rating: 4.8,
          topic: topicName,
          author: "Striver",
          dateAdded: new Date().toISOString(),
        }
      ],
      queues: [
        {
          id: "q-1",
          title: "Queue Basics & Operations",
          url: "https://www.geeksforgeeks.org/queue-data-structure/",
          description: "FIFO concepts, Simple Queue, Circular Queue, and Double-Ended Queue (Deque) implementation steps.",
          type: "Article" as const,
          difficulty: "Beginner" as const,
          rating: 4.4,
          topic: topicName,
          author: "GeeksforGeeks",
          dateAdded: new Date().toISOString(),
        },
        {
          id: "q-2",
          title: "Circular Queue & Priority Queue",
          url: "https://www.youtube.com/watch?v=dn01XST9-bI",
          description: "Abdul Bari teaches memory optimization using circular buffers and introduces heap-based priority queues.",
          type: "Video" as const,
          difficulty: "Intermediate" as const,
          rating: 4.9,
          topic: topicName,
          author: "Abdul Bari",
          dateAdded: new Date().toISOString(),
        }
      ],
      trees: [
        {
          id: "tr-1",
          title: "Binary Tree & BST Tracing Guide",
          url: "https://www.geeksforgeeks.org/binary-tree-data-structure/",
          description: "Hierarchy models, pre-order, in-order, post-order traversals, and Binary Search Trees features.",
          type: "Article" as const,
          difficulty: "Intermediate" as const,
          rating: 4.6,
          topic: topicName,
          author: "GeeksforGeeks",
          dateAdded: new Date().toISOString(),
        },
        {
          id: "tr-2",
          title: "Tree Complete Interview Prep",
          url: "https://www.youtube.com/watch?v=_ANrF3FJm7I",
          description: "A comprehensive playlist covering every Tree question from simple traversals to AVL balancing and LCA.",
          type: "Video" as const,
          difficulty: "Advanced" as const,
          rating: 4.9,
          topic: topicName,
          author: "take U forward",
          dateAdded: new Date().toISOString(),
        }
      ],
      graphs: [
        {
          id: "gr-1",
          title: "Graph Algorithms & BFS/DFS",
          url: "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/",
          description: "Adjacency matrix, adjacency list representations, traversals (BFS, DFS), cycle check, and topological sorting.",
          type: "Article" as const,
          difficulty: "Advanced" as const,
          rating: 4.7,
          topic: topicName,
          author: "GeeksforGeeks",
          dateAdded: new Date().toISOString(),
        },
        {
          id: "gr-2",
          title: "Graph Series - BFS, DFS & Shortest Paths",
          url: "https://www.youtube.com/watch?v=YTtpfjGlH2M",
          description: "Comprehensive 50+ video series covering BFS, DFS, Dijkstra, Bellman-Ford, Prim's, and Kruskal's algorithms.",
          type: "Video" as const,
          difficulty: "Advanced" as const,
          rating: 4.9,
          topic: topicName,
          author: "Striver takeUforward",
          dateAdded: new Date().toISOString(),
        }
      ],
      hashing: [
        {
          id: "hs-1",
          title: "Hashing Functions & Collisions",
          url: "https://www.geeksforgeeks.org/hashing-data-structure/",
          description: "Learn how hash tables achieve O(1) searches. Covers open addressing, chaining, and hash function properties.",
          type: "Article" as const,
          difficulty: "Intermediate" as const,
          rating: 4.5,
          topic: topicName,
          author: "GeeksforGeeks",
          dateAdded: new Date().toISOString(),
        },
        {
          id: "hs-2",
          title: "Hashing & HashMap Core Analysis",
          url: "https://www.youtube.com/watch?v=KEs5UyBJ39g",
          description: "HashMap internals, dynamic bucket resizing, frequency counts, and solving LeetCode Two Sum using HashMaps.",
          type: "Video" as const,
          difficulty: "Beginner" as const,
          rating: 4.8,
          topic: topicName,
          author: "take U forward",
          dateAdded: new Date().toISOString(),
        }
      ],
      heaps: [
        {
          id: "hp-1",
          title: "Heaps & Heapify Implementation",
          url: "https://www.geeksforgeeks.org/heap-data-structure/",
          description: "Understanding complete binary trees, Min-Heap, Max-Heap, heapify operations, and heap sort rules.",
          type: "Article" as const,
          difficulty: "Intermediate" as const,
          rating: 4.6,
          topic: topicName,
          author: "GeeksforGeeks",
          dateAdded: new Date().toISOString(),
        },
        {
          id: "hp-2",
          title: "Heap & Priority Queue Lectures",
          url: "https://www.youtube.com/watch?v=HqPJF2L5h9U",
          description: "Abdul Bari's legendary explanation of Heaps, insertion, deletion, heapify complexity, and applications.",
          type: "Video" as const,
          difficulty: "Advanced" as const,
          rating: 4.9,
          topic: topicName,
          author: "Abdul Bari",
          dateAdded: new Date().toISOString(),
        }
      ],
      recursion: [
        {
          id: "rc-1",
          title: "Recursion & Call Stack Basics",
          url: "https://www.geeksforgeeks.org/recursion/",
          description: "Understand the base case, recurrence relation, call stack tracing, and standard recursive mathematical series.",
          type: "Article" as const,
          difficulty: "Beginner" as const,
          rating: 4.5,
          topic: topicName,
          author: "GeeksforGeeks",
          dateAdded: new Date().toISOString(),
        },
        {
          id: "rc-2",
          title: "Recursion & Backtracking Masterclass",
          url: "https://www.youtube.com/watch?v=yVdKa8dnKiE",
          description: "Striver teaches recursion from simple count operations up to backtracking masteries like N-Queens and Sudoku Solver.",
          type: "Video" as const,
          difficulty: "Advanced" as const,
          rating: 4.9,
          topic: topicName,
          author: "take U forward",
          dateAdded: new Date().toISOString(),
        }
      ],
      dp: [
        {
          id: "dp-1",
          title: "Introduction to Dynamic Programming",
          url: "https://www.geeksforgeeks.org/dynamic-programming/",
          description: "Familiarize yourself with optimal substructure, overlapping subproblems, memoization (top-down), and tabulation (bottom-up).",
          type: "Article" as const,
          difficulty: "Advanced" as const,
          rating: 4.7,
          topic: topicName,
          author: "GeeksforGeeks",
          dateAdded: new Date().toISOString(),
        },
        {
          id: "dp-2",
          title: "Dynamic Programming Playlist",
          url: "https://www.youtube.com/watch?v=nqowUJzG-iM",
          description: "Striver's masterpiece playlist covering 1D DP, 2D grid DP, subsets, stocks, sequences, and MCM patterns.",
          type: "Video" as const,
          difficulty: "Advanced" as const,
          rating: 4.9,
          topic: topicName,
          author: "Striver takeUforward",
          dateAdded: new Date().toISOString(),
        }
      ]
    };

    return baseResources[topicName as keyof typeof baseResources] || [];
  };

  const handleRestoreDefaults = () => {
    if (window.confirm("Are you sure you want to restore curated default resources? This will merge them with your current resources, ensuring no duplicate URLs are added.")) {
      const defaults = getDefaultResources(topic);
      setResources(prev => {
        const existingUrls = new Set(prev.map(r => r.url.toLowerCase().trim()));
        const newDefaults = defaults.filter(d => !existingUrls.has(d.url.toLowerCase().trim()));
        const updated = [...newDefaults, ...prev];
        localStorage.setItem(`resources-${topic}`, JSON.stringify(updated));
        return updated;
      });
      toast({
        title: "Curated resources restored",
        description: "Premium pre-populated learning materials have been merged onto your shelf.",
      });
    }
  };

  const handleAddResource = (resourceData: Omit<Resource, 'id' | 'dateAdded' | 'rating'>) => {
    const newResource: Resource = {
      ...resourceData,
      id: Date.now().toString(),
      rating: 4.0,
      dateAdded: new Date().toISOString(),
    };
    setResources(prev => [newResource, ...prev]);
    toast({
      title: "Resource added",
      description: "Your resource has been successfully added.",
    });
  };

  const handleEditResource = (resource: Resource) => {
    setEditingResource(resource);
    setIsFormOpen(true);
  };

  const handleUpdateResource = (resourceData: Omit<Resource, 'id' | 'dateAdded' | 'rating'>) => {
    if (editingResource) {
      setResources(prev =>
        prev.map(r =>
          r.id === editingResource.id
            ? { ...r, ...resourceData }
            : r
        )
      );
      setEditingResource(null);
      toast({
        title: "Resource updated",
        description: "Your resource has been successfully updated.",
      });
    }
  };

  const handleDeleteResource = (id: string) => {
    setResources(prev => prev.filter(r => r.id !== id));
    toast({
      title: "Resource deleted",
      description: "The resource has been removed.",
    });
  };

  const handleRateResource = (id: string, rating: number) => {
    setResources(prev =>
      prev.map(r =>
        r.id === id ? { ...r, rating } : r
      )
    );
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || resource.type === typeFilter;
    const matchesDifficulty = difficultyFilter === "all" || resource.difficulty === difficultyFilter;
    
    return matchesSearch && matchesType && matchesDifficulty;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border/20 pb-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-black">Interactive Resources</h3>
          <p className="text-xs sm:text-sm text-muted-foreground font-semibold">
            Curated list of premium materials. Add your own or restore structured presets!
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button 
            variant="outline" 
            onClick={handleRestoreDefaults}
            className="border-primary/20 hover:bg-primary/5 text-primary text-xs sm:text-sm font-semibold rounded-xl"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Restore Presets
          </Button>
          <Button onClick={() => setIsFormOpen(true)} className="rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-primary/10">
            <Plus className="w-4 h-4 mr-2" />
            Add Resource
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Filter shelf materials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-xl"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-[180px] rounded-xl font-semibold">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Video">Video</SelectItem>
            <SelectItem value="Article">Article</SelectItem>
            <SelectItem value="Course">Course</SelectItem>
            <SelectItem value="Book">Book</SelectItem>
            <SelectItem value="Practice">Practice</SelectItem>
          </SelectContent>
        </Select>
        <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
          <SelectTrigger className="w-full sm:w-[180px] rounded-xl font-semibold">
            <SelectValue placeholder="Filter by difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Resources Grid */}
      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {filteredResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onEdit={handleEditResource}
              onDelete={handleDeleteResource}
              onRate={handleRateResource}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-muted/20 dark:bg-muted/5 rounded-2xl border border-dashed border-border/60">
          <p className="text-muted-foreground font-semibold">No active resources found in this filter.</p>
          <Button variant="ghost" onClick={handleRestoreDefaults} className="mt-3 text-primary hover:text-primary/80 font-bold">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reload Curated Defaults
          </Button>
        </div>
      )}

      <ResourceForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingResource(null);
        }}
        onSubmit={editingResource ? handleUpdateResource : handleAddResource}
        editingResource={editingResource}
        currentTopic={topic}
      />
    </div>
  );
};

export default ResourceManager;
