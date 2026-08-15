import { NextRequest, NextResponse } from 'next/server';
import { callOpenRouterAPI, localChatFallback } from '@/server/services/aiService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history } = body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { message: 'Please provide a valid message' },
        { status: 400 }
      );
    }

    const systemPrompt = `You are AlgoSpark DSA Mentor, an elite Data Structures & Algorithms coach. 
Answer concisely using formatted Markdown with step-by-step guidance, code snippets where applicable, and Big-O time/space complexity notes.`;

    let fullPrompt = `${systemPrompt}\n\n`;

    if (Array.isArray(history) && history.length > 0) {
      const formattedHistory = history
        .slice(-6)
        .map((h: any) => `${h.role === 'user' ? 'User' : 'Mentor'}: ${h.content}`)
        .join('\n');
      fullPrompt += `Recent Conversation Context:\n${formattedHistory}\n\n`;
    }

    fullPrompt += `User Question: ${message}`;

    const customApiKey = req.headers.get('x-openrouter-key') || undefined;
    const aiResponseText = await callOpenRouterAPI(fullPrompt, false, customApiKey);

    if (aiResponseText) {
      return NextResponse.json({ response: aiResponseText, text: aiResponseText });
    }

    // Local mentor rule fallback
    const fallback = localChatFallback(message);
    return NextResponse.json({ response: fallback.text, text: fallback.text });
  } catch (error: any) {
    console.error('AI Chat Error:', error);
    const fallback = localChatFallback('general');
    return NextResponse.json({ response: fallback.text, text: fallback.text });
  }
}
