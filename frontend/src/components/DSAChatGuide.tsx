import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, BookOpen, Code, Lightbulb, AlertCircle, Sparkles, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  category?: 'general' | 'explanation' | 'hint' | 'code' | 'concept';
}

const DSAChatGuide = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hi! I'm your SDE learning guide. I can help you with:\n\n• Explaining DSA concepts in depth\n• Providing step-by-step progressive hints\n• Reviewing and optimizing your code complexity\n• Designing customized learning paths\n\nWhat topic should we explore today?",
      timestamp: new Date(),
      category: 'general'
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('query');
    if (query && query.trim()) {
      // Clear URL parameter so it doesn't trigger on refresh
      window.history.replaceState({}, document.title, window.location.pathname);
      sendMessage(query.trim());
    }
  }, []);

  const quickActions = [
    { text: "Explain Binary Search", category: 'explanation' },
    { text: "Help with Two Pointers technique", category: 'hint' },
    { text: "What is Dynamic Programming?", category: 'concept' },
    { text: "Review my sorting code", category: 'code' },
  ];

  const dsaResponses = {
    'binary search': {
      content: "Binary Search is an extremely efficient searching algorithm that finds a target value in a sorted array by repeatedly dividing the search interval in half.\n\n**How it works:**\n1. Compare target with the middle element\n2. If target equals middle, search is complete!\n3. If target is less than middle, search the left partition\n4. If target is greater than middle, search the right partition\n5. Repeat until found or partition is empty\n\n**Time Complexity:** O(log n)\n**Space Complexity:** O(1) for iterative, O(log n) for recursive\n\n**Best Use Case:** When working with sorted arrays or binary search spaces where decision boundaries are monotonic.",
      category: 'explanation' as const
    },
    'two pointers': {
      content: "Two Pointers is an optimized technique where you maintain two pointers traversing linear structures (like arrays or linked lists) to solve problems with reduced nested loops.\n\n**Common Patterns:**\n1. **Opposite directions:** Left starting at 0, Right at N-1, moving towards center (e.g., Two Sum on sorted array, Reverse Array, Palindrome Check)\n2. **Fast & Slow:** Slow moves 1 step, Fast moves 2 steps (e.g., Linked List Cycle detection, Finding the Middle node)\n3. **Sliding Window bounds:** Left and Right moving same direction with variable or fixed size\n\n**Why use it:** It decreases time complexity from O(n²) to O(n) without additional space requirements!",
      category: 'hint' as const
    },
    'dynamic programming': {
      content: "Dynamic Programming (DP) is a powerful algorithmic paradigm used to solve optimization problems by breaking them down into simpler, overlapping subproblems and storing their solved states.\n\n**The Two Pillars:**\n1. **Overlapping Subproblems:** The same subproblems are recalculated multiple times.\n2. **Optimal Substructure:** The optimal solution to the main problem can be constructed from optimal solutions to its subproblems.\n\n**Implementation Approaches:**\n• **Memoization (Top-Down):** Recursion + state cache lookup\n• **Tabulation (Bottom-Up):** Iterative array/matrix state table filling\n\n**DP Checklist:**\n1. Identify DP Monotonic transition\n2. Define DP State variables\n3. Formulate the Recurrence Relation\n4. Establish Base Cases\n\n**Famous Patterns:** 0/1 Knapsack, Longest Common Subsequence (LCS), Edit Distance, Coin Change",
      category: 'concept' as const
    },
    'sorting': {
      content: "Writing optimal sorting routines is foundational to coding interviews. Use this checklist:\n\n**Review Matrix:**\n✅ **Time Complexity:** Average/Worst case O(n log n) is standard. Avoid O(n²) bubble/selection in production.\n✅ **Auxiliary Space:** In-place sorts (like Quick Sort) vs. external space sorts (like Merge Sort)\n✅ **Stability:** Does it preserve the relative order of identical elements?\n\n**Common recommendations:**\n• **Quick Sort:** Great general-purpose in-place average-case sorting.\n• **Merge Sort:** Guaranteed O(n log n) stable sorting, ideal for linked structures.\n• **Heap Sort:** Guaranteed O(n log n) in-place sorting without recursive stack overhead.\n• **Counting / Radix Sort:** O(N+K) linear non-comparison sorts for bounded integer sets.",
      category: 'code' as const
    }
  };

  const generateResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [topic, response] of Object.entries(dsaResponses)) {
      if (lowerMessage.includes(topic)) {
        return {
          id: Date.now().toString(),
          type: 'bot',
          content: response.content,
          timestamp: new Date(),
          category: response.category
        };
      }
    }

    if (lowerMessage.includes('hint') || lowerMessage.includes('help')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: "I can help with SDE problems! Here's my diagnostic methodology:\n\n1. **Identify constraints:** What are input sizes? (determines target O(N) complexity)\n2. **Brute Force First:** Conceptualize the trivial O(n²) or O(n³) solution.\n3. **Optimize data structures:** Can a HashMap, Stack, or Heap cut lookup times?\n4. **Monotonic properties:** Can sorted properties unlock Binary Search or Two Pointers?\n5. **Check corner conditions:** Empty inputs, duplicates, negative numbers, numeric overflow.\n\nShare your problem description and let's work through it!",
        timestamp: new Date(),
        category: 'hint'
      };
    }

    if (lowerMessage.includes('explain') || lowerMessage.includes('what is')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: "To master complex SDE concepts, follow these milestones:\n\n• **Visualize it:** Draw node trees, array indexes, or recursion branches.\n• **Trace the stack:** Execute dry runs step-by-step with small sample inputs.\n• **Implement from scratch:** Build the helper logic without using library defaults.\n• **Optimize space/time:** Refactor recursive calls to tail recursion or iterative state variables.\n\nWhat concepts or problem patterns are you currently tackling?",
        timestamp: new Date(),
        category: 'explanation'
      };
    }

    if (lowerMessage.includes('code') || lowerMessage.includes('review')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: "I'd love to review your code! Paste your routine and I will inspect:\n\n1. **Correctness & Loops:** Ensuring zero index-out-of-bounds and proper base cases.\n2. **Asymptotic bounds:** Calculating exact Big-O profiles.\n3. **Readability:** Spotting naming inconsistencies and redundant evaluations.\n\nReady when you are!",
        timestamp: new Date(),
        category: 'code'
      };
    }

    return {
      id: Date.now().toString(),
      type: 'bot',
      content: "Fascinating query! I specialize in Data Structures and Algorithms. You can ask me about:\n\n• **Complexity Bounds:** Big-O optimizations and recursion matrices\n• **Core Structures:** Balanced Trees, Graph Adjacencies, Heaps, and Segment Trees\n• **Interview Challenges:** progressive hints and structural breakdowns\n• **Code Refactoring:** space-saving tail calculations and robust state maps\n\nWhat SDE concept or sheet problem can I explain?",
      timestamp: new Date(),
      category: 'general'
    };
  };

  const sendMessage = async (messageText?: string) => {
    const text = messageText || inputMessage;
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateResponse(text);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1200);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'explanation': return <BookOpen className="w-5 h-5 text-blue-500" />;
      case 'hint': return <Lightbulb className="w-5 h-5 text-yellow-500 animate-pulse" />;
      case 'code': return <Code className="w-5 h-5 text-emerald-500" />;
      case 'concept': return <AlertCircle className="w-5 h-5 text-purple-500" />;
      default: return <Bot className="w-5 h-5 text-indigo-500" />;
    }
  };

  const clearChatHistory = () => {
    if (window.confirm("Do you want to reset the chat session?")) {
      setMessages([
        {
          id: '1',
          type: 'bot',
          content: "Hi! I'm your SDE learning guide. What topic should we explore today?",
          timestamp: new Date(),
          category: 'general'
        }
      ]);
    }
  };

  // Animation variants
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

  return (
    <motion.div 
      className="max-w-5xl mx-auto space-y-8 pb-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Welcome Header */}
      <motion.div 
        variants={itemVariants}
        className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-600 to-pink-600 dark:from-purple-950 dark:via-indigo-950 dark:to-pink-900/60 rounded-3xl p-6 sm:p-8 md:p-10 text-white shadow-2xl border border-white/10"
      >
        <div className="absolute inset-0 bg-white/10 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold tracking-wider text-pink-200 uppercase mb-4 backdrop-blur-md border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
              SDE Mentor Suite
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 tracking-tight bg-gradient-to-r from-white via-blue-100 to-pink-100 bg-clip-text text-transparent">
              DSA Chat Guide 🤖
            </h1>
            <p className="text-blue-100 text-sm sm:text-base md:text-lg max-w-xl font-medium leading-relaxed">
              Explore dynamic SDE tutorials, complex dry-runs, progressive code optimizations, and structural checkpoints with your AI tutor.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main Column */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: Quick Actions */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-1 glass-card rounded-2xl p-6 shadow-xl border border-border/50 h-fit space-y-4"
        >
          <div className="flex items-center justify-between border-b border-border/40 pb-3">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-4.5 h-4.5 text-purple-500" />
              Quick Checkpoints
            </h2>
          </div>
          
          <div className="flex flex-col gap-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => sendMessage(action.text)}
                className="group text-left p-3.5 bg-muted/35 dark:bg-muted/10 hover:bg-primary/5 hover:border-primary/30 border border-border/40 rounded-xl transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-card border border-border/40 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                    {getCategoryIcon(action.category)}
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors truncate">{action.text}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Right column: Interactive Chat Workspace */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-2 glass-card rounded-2xl shadow-xl border border-border/50 overflow-hidden flex flex-col h-[520px]"
        >
          {/* Header toolbar */}
          <div className="bg-muted/30 dark:bg-muted/10 px-6 py-4 border-b border-border/40 flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm font-bold text-foreground">Interactive DSA AI Sandbox</span>
            </div>
            {messages.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearChatHistory}
                className="text-muted-foreground hover:text-destructive flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20"
                title="Reset Conversation"
              >
                <Trash2 className="w-4 h-4" />
                <span className="text-xs font-bold">Clear</span>
              </Button>
            )}
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/20 dark:bg-slate-950/10">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl p-4 shadow-lg ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none'
                      : 'bg-card border border-border/40 text-foreground rounded-bl-none relative overflow-hidden'
                  }`}>
                    <div className="flex items-start gap-3">
                      {message.type === 'bot' && (
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center flex-shrink-0 shadow-sm border border-border/30">
                          {getCategoryIcon(message.category)}
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <div className="text-sm leading-relaxed whitespace-pre-line font-medium">
                          {message.content.split('\n\n').map((paragraph, idx) => {
                            // Render checklists or bold items nicely
                            if (paragraph.trim().match(/^✅|^•|^[-*•]/)) {
                              return (
                                <p key={idx} className="my-1.5 leading-relaxed text-foreground/90 pl-1 font-semibold flex items-start gap-1.5">
                                  {paragraph}
                                </p>
                              );
                            }
                            
                            // Bold text formatting with **
                            const formattedText = paragraph.split(/(\*\*.*?\*\*)/).map((part, i) => {
                              if (part.startsWith('**') && part.endsWith('**')) {
                                return (
                                  <strong key={i} className={message.type === 'user' ? 'text-white font-bold' : 'text-primary font-bold'}>
                                    {part.slice(2, -2)}
                                  </strong>
                                );
                              }
                              return part;
                            });

                            return (
                              <p key={idx} className="mb-2 last:mb-0 text-foreground/90 leading-relaxed">
                                {formattedText}
                              </p>
                            );
                          })}
                        </div>
                        <div className={`text-[10px] mt-2 font-semibold ${
                          message.type === 'user' ? 'text-blue-200' : 'text-muted-foreground'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                      
                      {message.type === 'user' && (
                        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0 border border-white/10 shadow-sm">
                          <User className="w-4.5 h-4.5 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isTyping && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-card border border-border/40 rounded-2xl rounded-bl-none p-4 shadow-md flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center border border-border/30">
                    <Bot className="w-4.5 h-4.5 text-indigo-500 animate-bounce" />
                  </div>
                  <div className="flex space-x-1.5 px-2">
                    <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce"></div>
                    <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                    <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input */}
          <div className="border-t border-border/40 p-4 bg-muted/20 rounded-b-2xl">
            <div className="flex space-x-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about dynamic patterns, complexity bounds, SDE sheets..."
                className="flex-1 px-4 py-3 bg-background border-2 border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder-muted-foreground transition-all duration-300 font-semibold text-sm sm:text-base"
              />
              <Button
                onClick={() => sendMessage()}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-5 py-3 rounded-xl disabled:opacity-50 flex items-center gap-1.5 shadow-md shadow-purple-500/10"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Send</span>
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 font-semibold">
              💡 Pro Tip: Keywords like 'DP', 'Two Pointers', 'Binary Search', or 'sorting' trigger detailed algorithmic reviews!
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DSAChatGuide;
