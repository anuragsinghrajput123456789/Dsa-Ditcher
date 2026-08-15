'use client';

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export function DSAChatGuide() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hi! I'm your AlgoSpark SDE learning guide. Ask me any Data Structures & Algorithms question, concept, or code optimization tip!",
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || isTyping) return;

    const userText = inputMessage;
    setInputMessage("");

    const userMsg: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: userText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      const data = await res.json();
      const botReplyText = data.response || data.text || "I am your DSA Guide!";

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botReplyText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Guide Error:", err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="bg-card rounded-2xl border border-border/80 p-6 shadow-xl space-y-4 flex flex-col h-[550px]">
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5 text-violet-400" />
          <h2 className="font-bold text-base">AlgoSpark DSA Chatbot Guide</h2>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setMessages([])} className="text-xs text-muted-foreground">
          <Trash2 className="w-3.5 h-3.5 mr-1" />
          Clear
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2 text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex space-x-2 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                msg.type === 'user'
                  ? 'bg-violet-600 text-white rounded-tr-none'
                  : 'bg-muted/80 text-foreground border border-border rounded-tl-none whitespace-pre-wrap'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center space-x-2 text-violet-400 text-xs">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>Guide is writing response...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="flex space-x-2 pt-2 border-t border-border/60">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask a question (e.g. Explain Sliding Window)..."
          className="flex-1 h-9 px-3 rounded-xl bg-background border border-input text-xs focus:ring-1 focus:ring-violet-500 outline-none"
        />
        <Button type="submit" size="sm" variant="gradient" disabled={isTyping} className="h-9 px-4">
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}
export default DSAChatGuide;
