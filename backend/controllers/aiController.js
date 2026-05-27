const analyzeProblem = async (req, res, next) => {
  const { problemText } = req.body;
  if (!problemText) {
    return res.status(400).json({ message: "Please provide problemText" });
  }

  try {
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    const prompt = `Analyze the following DSA problem and provide a detailed explanation with:
1. Simple summary for beginners
2. Input/Output examples with explanation
3. Two approaches (brute force and optimal) with time/space complexity
4. Edge cases to consider
5. Similar problems

Additionally, provide 3-5 progressive hints to solve the problem. Each hint should be on a new line and must start with the prefix "HINT:".

Problem: ${problemText}`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://localhost:5000",
        "X-Title": "DSA Ditcher"
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "user", content: prompt }
        ],
        max_tokens: 2000
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ message: `OpenRouter API error: ${errorText}` });
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || "Sorry, I couldn't analyze your problem.";
    res.json({ text: answer });
  } catch (error) {
    next(error);
  }
};

const chatWithAI = async (req, res, next) => {
  const { message, prompt: customPrompt } = req.body;
  
  try {
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    
    let prompt = customPrompt;
    if (!prompt) {
      if (!message) {
        return res.status(400).json({ message: "Please provide message or prompt" });
      }
      prompt = `You are an expert DSA mentor specializing in Data Structures and Algorithms. Help the user understand concepts step by step with clear explanations. 

User question: ${message}

Please provide:
1. A clear explanation of the concept
2. Step-by-step approach if it's a problem
3. Time and space complexity analysis
4. Related concepts or patterns
5. Practical examples when helpful

Keep your response educational and engaging.`;
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://localhost:5000",
        "X-Title": "DSA Ditcher"
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "user", content: prompt }
        ],
        max_tokens: 2000
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ message: `OpenRouter API error: ${errorText}` });
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || "Sorry, I couldn't process your request.";
    res.json({ text: answer });
  } catch (error) {
    next(error);
  }
};

const analyzeComplexity = async (req, res, next) => {
  const { code, language } = req.body;
  if (!code || !language) {
    return res.status(400).json({ message: "Please provide code and language" });
  }

  try {
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    const prompt = `Analyze the time and space complexity of the following ${language} code. Provide your answer in a valid JSON format. The JSON object must have the following keys: "timeComplexity" (e.g., "O(n^2)"), "spaceComplexity" (e.g., "O(n)"), "explanation" (a brief one-liner), "details" (an array of strings explaining the analysis), "optimizations" (an array of strings with suggestions), and "confidence" (a string which must be one of 'high', 'medium', or 'low').

Code:
\`\`\`${language}
${code}
\`\`\`

Your response must be only the JSON object, without any surrounding text or markdown formatting like \`\`\`json.`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://localhost:5000",
        "X-Title": "DSA Ditcher"
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "user", content: prompt }
        ],
        response_format: {
          type: "json_object"
        },
        max_tokens: 2000
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ message: `OpenRouter API error: ${errorText}` });
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || "";
    
    // Robust cleaning to extract pure JSON
    let cleanContent = answer.trim();
    if (cleanContent.startsWith("```json")) {
      cleanContent = cleanContent.substring(7);
    } else if (cleanContent.startsWith("```")) {
      cleanContent = cleanContent.substring(3);
    }
    if (cleanContent.endsWith("```")) {
      cleanContent = cleanContent.substring(0, cleanContent.length - 3);
    }
    cleanContent = cleanContent.trim();

    res.json(JSON.parse(cleanContent));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  analyzeProblem,
  chatWithAI,
  analyzeComplexity,
};
