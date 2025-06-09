import { useState } from "react";
import { Search, BookOpen, Clock, CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ResourceManager from "./resources/ResourceManager";

const TopicExplorer = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);

  const topics = [
    {
      id: "arrays",
      name: "Arrays",
      description: "Linear data structure storing elements in contiguous memory",
      difficulty: "Beginner",
      color: "from-blue-500 to-blue-600",
      icon: "📊",
      concepts: ["Basic Operations", "Two Pointers", "Sliding Window", "Sorting"],
      estimatedTime: "3-5 days",
      prerequisites: ["Basic Programming"],
    },
    {
      id: "linkedlists",
      name: "Linked Lists",
      description: "Dynamic data structure with nodes connected via pointers",
      difficulty: "Beginner",
      color: "from-green-500 to-green-600",
      icon: "🔗",
      concepts: ["Singly Linked", "Doubly Linked", "Circular", "Operations"],
      estimatedTime: "4-6 days",
      prerequisites: ["Arrays", "Pointers"],
    },
    {
      id: "stacks",
      name: "Stacks",
      description: "LIFO data structure for managing data in last-in-first-out order",
      difficulty: "Beginner",
      color: "from-purple-500 to-purple-600",
      icon: "📚",
      concepts: ["Push/Pop", "Applications", "Implementation", "Problems"],
      estimatedTime: "2-3 days",
      prerequisites: ["Arrays"],
    },
    {
      id: "queues",
      name: "Queues",
      description: "FIFO data structure for managing data in first-in-first-out order",
      difficulty: "Beginner",
      color: "from-yellow-500 to-yellow-600",
      icon: "🚶",
      concepts: ["Enqueue/Dequeue", "Circular Queue", "Priority Queue", "Applications"],
      estimatedTime: "2-3 days",
      prerequisites: ["Arrays"],
    },
    {
      id: "trees",
      name: "Trees",
      description: "Hierarchical data structure with parent-child relationships",
      difficulty: "Intermediate",
      color: "from-red-500 to-red-600",
      icon: "🌳",
      concepts: ["Binary Trees", "BST", "AVL", "Traversals"],
      estimatedTime: "7-10 days",
      prerequisites: ["Linked Lists", "Recursion"],
    },
    {
      id: "graphs",
      name: "Graphs",
      description: "Non-linear data structure with vertices and edges",
      difficulty: "Advanced",
      color: "from-indigo-500 to-indigo-600",
      icon: "🕸️",
      concepts: ["BFS", "DFS", "Shortest Path", "MST"],
      estimatedTime: "10-14 days",
      prerequisites: ["Trees", "Queues", "Stacks"],
    },
  ];

  const filteredTopics = topics.filter(topic =>
    topic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId);
  };

  const toggleTopicCompletion = (topicId: string) => {
    setCompletedTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  if (selectedTopic) {
    const topic = topics.find(t => t.id === selectedTopic);
    return (
      <div className="space-y-6">
        <Button
          variant="ghost"
          onClick={() => setSelectedTopic(null)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Topics
        </Button>
        
        {topic && (
          <div className="space-y-6">
            {/* Topic Header */}
            <Card className="overflow-hidden">
              <div className={`bg-gradient-to-r ${topic.color} p-6 sm:p-8 text-white`}>
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <span className="text-4xl mr-4">{topic.icon}</span>
                      <div>
                        <h1 className="text-2xl sm:text-3xl font-bold mb-2">{topic.name}</h1>
                        <p className="text-blue-100 mb-4">{topic.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {topic.estimatedTime}
                      </span>
                      <span className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-1" />
                        {topic.concepts.length} concepts
                      </span>
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        {topic.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    onClick={() => toggleTopicCompletion(topic.id)}
                    variant={completedTopics.includes(topic.id) ? "default" : "secondary"}
                    className="shrink-0"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {completedTopics.includes(topic.id) ? "Completed" : "Mark Complete"}
                  </Button>
                </div>
              </div>
            </Card>

            {/* Concepts */}
            <Card>
              <CardHeader>
                <CardTitle>Key Concepts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {topic.concepts.map((concept, index) => (
                    <Badge key={index} variant="outline" className="justify-center p-2">
                      {concept}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Resource Manager */}
            <ResourceManager topic={selectedTopic} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">DSA Topic Explorer</h1>
        <p className="text-muted-foreground text-base sm:text-lg mb-6">
          Master data structures and algorithms with comprehensive learning resources
        </p>
        
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="Search topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Progress Overview */}
      <Card>
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white rounded-t-lg">
          <h2 className="text-xl font-bold mb-4">Your Progress</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/20 rounded-lg p-4">
              <div className="text-2xl font-bold">{completedTopics.length}</div>
              <div className="text-sm">Topics Completed</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <div className="text-2xl font-bold">{topics.length}</div>
              <div className="text-sm">Total Topics</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <div className="text-2xl font-bold">{Math.round((completedTopics.length / topics.length) * 100)}%</div>
              <div className="text-sm">Progress</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTopics.map((topic) => (
          <Card
            key={topic.id}
            className="hover:shadow-lg transition-all duration-200 cursor-pointer hover:-translate-y-1 group"
          >
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${topic.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                  <span className="text-xl sm:text-2xl">{topic.icon}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleTopicCompletion(topic.id);
                  }}
                  className={`p-1 rounded-full transition-colors ${
                    completedTopics.includes(topic.id) 
                      ? 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400' 
                      : 'text-muted-foreground hover:text-green-600'
                  }`}
                >
                  <CheckCircle className="w-5 h-5" />
                </Button>
              </div>
              
              <CardTitle className="text-lg sm:text-xl">{topic.name}</CardTitle>
              <p className="text-muted-foreground text-sm">{topic.description}</p>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="w-3 h-3 mr-1" />
                  {topic.estimatedTime}
                </div>
                <div className="text-xs text-muted-foreground">
                  Prerequisites: {topic.prerequisites.join(", ")}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Badge
                  variant={
                    topic.difficulty === 'Beginner' ? 'default' :
                    topic.difficulty === 'Intermediate' ? 'secondary' : 'destructive'
                  }
                  className="text-xs"
                >
                  {topic.difficulty}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleTopicSelect(topic.id)}
                  className="text-primary hover:text-primary/80"
                >
                  Learn More →
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TopicExplorer;
