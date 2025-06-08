
import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, BookOpen, Code, Lightbulb, AlertCircle } from "lucide-react";

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
      content: "Hi! I'm your DSA learning guide. I can help you with:\n\n• Explaining DSA concepts\n• Providing hints for problems\n• Code review and optimization\n• Learning path guidance\n\nWhat would you like to learn today?",
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

  const quickActions = [
    { text: "Explain Binary Search", category: 'explanation' },
    { text: "Help with Two Pointers technique", category: 'hint' },
    { text: "What is Dynamic Programming?", category: 'concept' },
    { text: "Review my sorting code", category: 'code' },
  ];

  const dsaResponses = {
    'binary search': {
      content: "Binary Search is a searching algorithm that finds a target value in a sorted array by repeatedly dividing the search interval in half.\n\n**How it works:**\n1. Compare target with middle element\n2. If target equals middle, we're done\n3. If target is less than middle, search left half\n4. If target is greater than middle, search right half\n5. Repeat until found or array is empty\n\n**Time Complexity:** O(log n)\n**Space Complexity:** O(1) for iterative, O(log n) for recursive\n\n**When to use:** When you have a sorted array and need to find an element efficiently.",
      category: 'explanation' as const
    },
    'two pointers': {
      content: "Two Pointers is a technique where you use two pointers to traverse an array, usually from opposite ends or at different speeds.\n\n**Common patterns:**\n1. **Opposite ends:** Start from beginning and end, move towards center\n2. **Fast & Slow:** One pointer moves faster than the other\n3. **Same direction:** Both move in same direction at different speeds\n\n**Use cases:**\n• Finding pairs with target sum\n• Removing duplicates\n• Palindrome checking\n• Cycle detection in linked lists\n\n**Tip:** Great for reducing O(n²) solutions to O(n)!",
      category: 'hint' as const
    },
    'dynamic programming': {
      content: "Dynamic Programming (DP) is an optimization technique that solves complex problems by breaking them into simpler subproblems.\n\n**Key concepts:**\n1. **Overlapping subproblems:** Same subproblems solved multiple times\n2. **Optimal substructure:** Optimal solution contains optimal solutions of subproblems\n\n**Two approaches:**\n• **Memoization (Top-down):** Recursion + caching\n• **Tabulation (Bottom-up):** Iterative approach filling table\n\n**Steps to solve DP:**\n1. Identify if it's a DP problem\n2. Define the state\n3. Write recurrence relation\n4. Decide base cases\n5. Implement and optimize\n\n**Common patterns:** Fibonacci, Knapsack, LCS, Edit Distance",
      category: 'concept' as const
    },
    'sorting': {
      content: "Here are some tips for writing efficient sorting algorithms:\n\n**Quick Review Checklist:**\n✅ **Time Complexity:** Is it optimal for your use case?\n✅ **Space Complexity:** Are you using extra space efficiently?\n✅ **Stability:** Does order of equal elements matter?\n✅ **In-place:** Can you sort without extra space?\n\n**Common optimizations:**\n• Use built-in sort for most cases (O(n log n))\n• Consider Counting Sort for small range integers (O(n+k))\n• Quick Sort for average case performance\n• Merge Sort for guaranteed O(n log n) and stability\n\n**Code review tip:** Focus on edge cases like empty arrays, single elements, and duplicate values.",
      category: 'code' as const
    }
  };

  const generateResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for specific DSA topics
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

    // Generic responses based on keywords
    if (lowerMessage.includes('hint') || lowerMessage.includes('help')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: "I'd be happy to help! Here's a general approach:\n\n1. **Understand the problem:** Read carefully and identify input/output\n2. **Think of brute force:** What's the simplest solution?\n3. **Optimize:** Can you reduce time/space complexity?\n4. **Consider patterns:** Does this fit any common DSA patterns?\n5. **Test edge cases:** Empty inputs, single elements, etc.\n\nCan you share more details about the specific problem you're working on?",
        timestamp: new Date(),
        category: 'hint'
      };
    }

    if (lowerMessage.includes('explain') || lowerMessage.includes('what is')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: "I'd love to explain! DSA concepts can be tricky, but breaking them down helps:\n\n• **Start with the basics:** Understand the core idea\n• **Visualize:** Draw diagrams or trace through examples\n• **Practice:** Implement the concept in code\n• **Apply:** Solve related problems\n\nWhat specific concept would you like me to explain in detail?",
        timestamp: new Date(),
        category: 'explanation'
      };
    }

    if (lowerMessage.includes('code') || lowerMessage.includes('review')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: "Code review is crucial for learning! Here's what I look for:\n\n**Correctness:**\n• Does it handle all test cases?\n• Are edge cases covered?\n\n**Efficiency:**\n• Is the time complexity optimal?\n• Can space usage be improved?\n\n**Readability:**\n• Clear variable names\n• Proper comments\n• Consistent formatting\n\nFeel free to share your code and I'll provide specific feedback!",
        timestamp: new Date(),
        category: 'code'
      };
    }

    // Default response
    return {
      id: Date.now().toString(),
      type: 'bot',
      content: "That's a great question! I specialize in DSA topics like:\n\n• **Data Structures:** Arrays, Linked Lists, Trees, Graphs, etc.\n• **Algorithms:** Sorting, Searching, DP, Greedy, etc.\n• **Problem Solving:** Hints, approaches, and optimizations\n• **Code Review:** Best practices and improvements\n\nCould you be more specific about what you'd like to learn or need help with?",
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

    // Simulate thinking time
    setTimeout(() => {
      const botResponse = generateResponse(text);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'explanation': return <BookOpen className="w-4 h-4 text-blue-500" />;
      case 'hint': return <Lightbulb className="w-4 h-4 text-yellow-500" />;
      case 'code': return <Code className="w-4 h-4 text-green-500" />;
      case 'concept': return <AlertCircle className="w-4 h-4 text-purple-500" />;
      default: return <Bot className="w-4 h-4 text-blue-600" />;
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'explanation': return 'border-blue-200 bg-blue-50';
      case 'hint': return 'border-yellow-200 bg-yellow-50';
      case 'code': return 'border-green-200 bg-green-50';
      case 'concept': return 'border-purple-200 bg-purple-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">DSA Learning Guide</h1>
        <p className="text-gray-600 text-lg">Your personal AI tutor for Data Structures and Algorithms</p>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => sendMessage(action.text)}
              className="text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-2">
                {getCategoryIcon(action.category)}
                <span className="text-sm text-gray-700">{action.text}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Interface */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Messages */}
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white rounded-lg rounded-br-sm'
                  : `border-2 rounded-lg rounded-bl-sm ${getCategoryColor(message.category)}`
              } p-4`}>
                <div className="flex items-start space-x-2">
                  {message.type === 'bot' && (
                    <div className="flex-shrink-0 mt-1">
                      {getCategoryIcon(message.category)}
                    </div>
                  )}
                  <div className="flex-1">
                    <p className={`text-sm whitespace-pre-line ${
                      message.type === 'user' ? 'text-white' : 'text-gray-800'
                    }`}>
                      {message.content}
                    </p>
                    <p className={`text-xs mt-2 ${
                      message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  {message.type === 'user' && (
                    <User className="w-4 h-4 mt-1 flex-shrink-0" />
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="border-2 border-gray-200 bg-gray-50 rounded-lg rounded-bl-sm p-4">
                <div className="flex items-center space-x-2">
                  <Bot className="w-4 h-4 text-blue-600" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex space-x-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about DSA..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!inputMessage.trim()}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Ask about algorithms, data structures, problem-solving techniques, or code review
          </p>
        </div>
      </div>
    </div>
  );
};

export default DSAChatGuide;
