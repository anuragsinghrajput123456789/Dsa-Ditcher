
import { useState, useEffect } from "react";
import { Plus, Search, Filter } from "lucide-react";
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
      setResources(JSON.parse(savedResources));
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
          id: "1",
          title: "Array Data Structure - Complete Guide",
          url: "https://www.geeksforgeeks.org/array-data-structure/",
          description: "Comprehensive guide covering array basics, operations, and common problems",
          type: "Article" as const,
          difficulty: "Beginner" as const,
          rating: 4.5,
          topic: topicName,
          author: "GeeksforGeeks",
          dateAdded: new Date().toISOString(),
        },
        {
          id: "2",
          title: "Two Pointers Technique Explained",
          url: "https://www.youtube.com/watch?v=example",
          description: "Learn the powerful two pointers technique for solving array problems efficiently",
          type: "Video" as const,
          difficulty: "Intermediate" as const,
          rating: 4.8,
          topic: topicName,
          author: "NeetCode",
          dateAdded: new Date().toISOString(),
        }
      ],
      linkedlists: [
        {
          id: "3",
          title: "Linked List Implementation and Problems",
          url: "https://leetcode.com/explore/learn/card/linked-list/",
          description: "LeetCode's comprehensive linked list learning path",
          type: "Course" as const,
          difficulty: "Beginner" as const,
          rating: 4.6,
          topic: topicName,
          author: "LeetCode",
          dateAdded: new Date().toISOString(),
        }
      ]
    };

    return baseResources[topicName as keyof typeof baseResources] || [];
  };

  const handleAddResource = (resourceData: Omit<Resource, 'id' | 'dateAdded' | 'rating'>) => {
    const newResource: Resource = {
      ...resourceData,
      id: Date.now().toString(),
      rating: 0,
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-2xl font-bold">Learning Resources</h3>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Resource
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
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
          <SelectTrigger className="w-full sm:w-[180px]">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <div className="text-center py-12">
          <p className="text-muted-foreground">No resources found. Add your first resource!</p>
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
