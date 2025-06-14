
import { useState } from "react";
import { Bot, User, Send } from "lucide-react";

const GEMINI_API_KEY = "AIzaSyAFn4XlGGFr2KGpfIQolxPPFjKbI7pG52o";

const QuestionAnalyzer = () => {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState<{ type: "user" | "ai"; message: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const sendQuestion = async () => {
    if (!input.trim()) return;
    setChat((prev) => [...prev, { type: "user", message: input }]);
    setLoading(true);
    setInput("");
    // Gemini API call
    try {
      const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Analyze the following DSA question and suggest the best approach step by step with reasoning and relevant DSA concepts. Always be detailed.\n${input}` }] }],
        }),
      });
      const data = await res.json();
      const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't analyze your question.";
      setChat((prev) => [...prev, { type: "ai", message: answer }]);
    } catch {
      setChat((prev) => [...prev, { type: "ai", message: "Error: Could not fetch analysis." }]);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6 mt-8 mb-10">
      <h2 className="text-2xl font-bold mb-4 text-indigo-800 flex items-center gap-2">
        <Bot className="w-6 h-6 text-indigo-600" />
        Question Analyzer (AI)
      </h2>
      <div className="h-64 overflow-y-auto flex flex-col gap-4 mb-4 border rounded p-4 bg-slate-50">
        {chat.length === 0 && (
          <div className="text-slate-400 text-center py-10">Ask your DSA question and get a step-by-step analysis with examples!</div>
        )}
        {chat.map((item, idx) => (
          <div
            key={idx}
            className={`flex ${item.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`flex items-center gap-2 max-w-[80%] ${item.type === "user" ? "bg-indigo-600 text-white" : "bg-indigo-50 text-indigo-900"} p-3 rounded-md`}>
              {item.type === "ai"
                ? <Bot className="w-4 h-4" />
                : <User className="w-4 h-4" />}
              <div className="whitespace-pre-wrap">{item.message}</div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-2 items-center text-slate-400">
            <Bot className="w-4 h-4 animate-bounce" /> Typing...
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border border-indigo-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") sendQuestion(); }}
          placeholder="Type your DSA question here..."
        />
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded transition"
          onClick={sendQuestion}
          disabled={loading}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default QuestionAnalyzer;
