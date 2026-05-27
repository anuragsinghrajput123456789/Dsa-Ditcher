import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, BookOpen, Clock, CheckCircle, ArrowLeft, ChevronRight, Sparkles } from "lucide-react";
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
      color: "from-blue-500 to-indigo-600",
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
      color: "from-emerald-500 to-teal-600",
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
      color: "from-purple-500 to-indigo-600",
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
      color: "from-amber-500 to-orange-600",
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
      color: "from-rose-500 to-pink-600",
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
      color: "from-violet-600 to-fuchsia-600",
      icon: "🕸️",
      concepts: ["BFS", "DFS", "Shortest Path", "MST"],
      estimatedTime: "10-14 days",
      prerequisites: ["Trees", "Queues", "Stacks"],
    },
    {
      id: "hashing",
      name: "Hash Tables",
      description: "Efficient data retrieval using key-value pairs and hash functions.",
      difficulty: "Intermediate",
      color: "from-pink-500 to-rose-600",
      icon: "🔑",
      concepts: ["Hashing Functions", "Collision Resolution", "HashMap", "HashSet"],
      estimatedTime: "4-6 days",
      prerequisites: ["Arrays"],
    },
    {
      id: "heaps",
      name: "Heaps & Priority Queues",
      description: "Tree-based structure for efficient min/max element retrieval.",
      difficulty: "Intermediate",
      color: "from-orange-500 to-amber-600",
      icon: "🔺",
      concepts: ["Min-Heap", "Max-Heap", "Heapify", "Applications"],
      estimatedTime: "3-5 days",
      prerequisites: ["Trees"],
    },
    {
      id: "recursion",
      name: "Recursion & Backtracking",
      description: "Solving problems by exploring all possible solutions recursively.",
      difficulty: "Intermediate",
      color: "from-teal-500 to-emerald-600",
      icon: "🔄",
      concepts: ["Base Case", "Recursive Step", "State-space tree", "Pruning"],
      estimatedTime: "5-7 days",
      prerequisites: ["Stacks", "Basic Programming"],
    },
    {
      id: "dp",
      name: "Dynamic Programming",
      description: "Solving complex problems by breaking them into simpler subproblems.",
      difficulty: "Advanced",
      color: "from-sky-500 to-indigo-600",
      icon: "🧩",
      concepts: ["Memoization", "Tabulation", "Optimal Substructure", "Overlapping Subproblems"],
      estimatedTime: "12-18 days",
      prerequisites: ["Recursion", "Arrays"],
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

  // Animations variants matching dashboard
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  if (selectedTopic) {
    const topic = topics.find(t => t.id === selectedTopic);
    return (
      <motion.div 
        className="space-y-6 max-w-5xl mx-auto pb-12"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <Button
          variant="ghost"
          onClick={() => setSelectedTopic(null)}
          className="mb-4 text-primary hover:text-primary/80 hover:bg-primary/10 transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Topics
        </Button>
        
        {topic && (
          <div className="space-y-6">
            {/* Topic Header Card */}
            <Card className="overflow-hidden border border-border/50 shadow-xl">
              <div className={`bg-gradient-to-r ${topic.color} p-6 sm:p-8 text-white relative overflow-hidden`}>
                <div className="absolute inset-0 bg-white/10 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                
                <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <span className="text-4xl sm:text-5xl mr-4">{topic.icon}</span>
                      <div>
                        <h1 className="text-2xl sm:text-4xl font-black mb-2 tracking-tight">{topic.name}</h1>
                        <p className="text-pink-100 text-sm sm:text-base max-w-xl font-medium leading-relaxed">{topic.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-semibold">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4.5 h-4.5" />
                        {topic.estimatedTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4.5 h-4.5" />
                        {topic.concepts.length} concepts
                      </span>
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/25">
                        {topic.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    onClick={() => toggleTopicCompletion(topic.id)}
                    variant={completedTopics.includes(topic.id) ? "default" : "secondary"}
                    className="shrink-0 font-bold rounded-xl hover:scale-[1.02] transition-transform"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {completedTopics.includes(topic.id) ? "Completed" : "Mark Complete"}
                  </Button>
                </div>
              </div>
            </Card>

            {/* Concepts List Card */}
            <Card className="glass-card border border-border/50 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  Key Concepts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {topic.concepts.map((concept, index) => (
                    <Badge key={index} variant="outline" className="justify-center py-2 px-4 rounded-xl font-semibold bg-muted/20 border-border hover:bg-muted/40 transition-colors">
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
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="space-y-8 pb-12 max-w-6xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Dynamic Header Block */}
      <motion.div 
        variants={itemVariants}
        className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-950 dark:via-indigo-900 dark:to-purple-900/60 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-white/10 dark:border-white/5"
      >
        <div className="absolute inset-0 bg-white/10 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold tracking-wider text-blue-200 uppercase mb-4 backdrop-blur-md border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
              Comprehensive Index
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 tracking-tight bg-gradient-to-r from-white via-blue-100 to-pink-100 bg-clip-text text-transparent">
              DSA Topic Explorer 📊
            </h1>
            <p className="text-blue-100 text-sm sm:text-base md:text-lg max-w-xl font-medium leading-relaxed">
              Unlock a structural approach to data structures and algorithms. Master individual concept tracks, curated resources, and SDE sheets.
            </p>
          </div>

          {/* Search bar inside header block */}
          <div className="relative w-full md:w-80 backdrop-blur-sm bg-white/10 dark:bg-black/25 p-1 rounded-2xl border border-white/20 shadow-lg">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-100 w-5 h-5 opacity-70" />
            <Input
              type="text"
              placeholder="Filter topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 bg-transparent border-none text-white placeholder-blue-200/65 focus-visible:ring-0 focus-visible:ring-offset-0 h-11 text-base font-semibold"
            />
          </div>
        </div>
      </motion.div>

      {/* Progress Card */}
      <motion.div variants={itemVariants}>
        <Card className="glass-card border border-border/50 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full filter blur-2xl"></div>
          
          <div className="p-6">
            <h2 className="text-lg font-bold text-foreground mb-4 uppercase tracking-wider text-muted-foreground">Your Progress Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-muted/30 dark:bg-muted/10 p-5 rounded-2xl border border-border/30 shadow-sm">
                <div className="text-3xl font-black text-foreground">{completedTopics.length}</div>
                <div className="text-xs text-muted-foreground font-semibold mt-1">Concepts Completed</div>
              </div>
              <div className="bg-muted/30 dark:bg-muted/10 p-5 rounded-2xl border border-border/30 shadow-sm">
                <div className="text-3xl font-black text-foreground">{topics.length}</div>
                <div className="text-xs text-muted-foreground font-semibold mt-1">Total Available Tracks</div>
              </div>
              <div className="bg-muted/30 dark:bg-muted/10 p-5 rounded-2xl border border-border/30 shadow-sm">
                <div className="text-3xl font-black text-primary">{Math.round((completedTopics.length / topics.length) * 100)}%</div>
                <div className="text-xs text-muted-foreground font-semibold mt-1">Mastery Progress</div>
              </div>
            </div>
            
            <div className="mt-5 w-full bg-muted dark:bg-muted/20 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${(completedTopics.length / topics.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Grid listing */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredTopics.map((topic) => (
          <motion.div
            key={topic.id}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Card
              className="glass-card hover:shadow-xl transition-all duration-300 cursor-pointer border hover:border-primary/30 overflow-hidden flex flex-col justify-between h-full group"
              onClick={() => handleTopicSelect(topic.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${topic.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-2xl">{topic.icon}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTopicCompletion(topic.id);
                    }}
                    className={`p-2 h-9 w-9 rounded-full transition-all duration-200 ${
                      completedTopics.includes(topic.id) 
                        ? 'text-green-600 bg-green-100 dark:bg-green-950/40 dark:text-green-400 scale-110' 
                        : 'text-muted-foreground hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-950/20'
                    }`}
                  >
                    <CheckCircle className="w-5.5 h-5.5" />
                  </Button>
                </div>
                
                <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-200 mb-1.5">{topic.name}</CardTitle>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{topic.description}</p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-2.5 mb-5 border-t border-border/40 pt-4">
                  <div className="flex items-center text-xs font-semibold text-muted-foreground">
                    <Clock className="w-4 h-4 mr-1.5 text-indigo-500" />
                    Estimated Time: {topic.estimatedTime}
                  </div>
                  <div className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    Prerequisites: {topic.prerequisites.join(", ")}
                  </div>
                </div>

                <div className="flex justify-between items-center mt-auto">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    topic.difficulty === 'Beginner' ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300' :
                    topic.difficulty === 'Intermediate' ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300' :
                    'bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                  }`}>
                    {topic.difficulty}
                  </span>
                  <div className="text-primary hover:text-primary/80 text-sm font-bold group-hover:translate-x-0.5 transition-transform duration-200 flex items-center gap-0.5">
                    Explore Track
                    <ChevronRight className="w-4.5 h-4.5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default TopicExplorer;
