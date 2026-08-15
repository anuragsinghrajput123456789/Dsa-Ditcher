import { NextRequest, NextResponse } from 'next/server';
import { callOpenRouterAPI, localProblemFallback } from '@/server/services/aiService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const problemText = body.problemText || body.problemDescription;

    if (!problemText || typeof problemText !== 'string' || !problemText.trim()) {
      return NextResponse.json(
        { message: 'Please provide a valid problem text to analyze' },
        { status: 400 }
      );
    }

    const prompt = `Analyze the following DSA problem and provide a detailed explanation with:
1. Simple summary for beginners
2. Input/Output examples with explanation
3. Two approaches (brute force and optimal) with time/space complexity
4. Edge cases to consider
5. Similar problems

Additionally, provide 3-5 progressive hints to solve the problem. Each hint should be on a new line and must start with the prefix "HINT:".

Problem: ${problemText}`;

    const customApiKey = req.headers.get('x-openrouter-key') || undefined;
    const aiResponseText = await callOpenRouterAPI(prompt, false, customApiKey);

    if (aiResponseText) {
      return NextResponse.json({ text: aiResponseText });
    }

    // Fallback to offline rule engine sandbox if API key is not configured or fails
    const fallbackResponse = localProblemFallback(problemText);
    return NextResponse.json(fallbackResponse);
  } catch (error: any) {
    console.error('AI Problem Analysis Error:', error);
    return NextResponse.json(
      localProblemFallback('Failed to reach AI service'),
      { status: 200 }
    );
  }
}
