import { NextRequest, NextResponse } from 'next/server';
import { callOpenRouterAPI, localComplexityAnalysis } from '@/server/services/aiService';

export async function POST(req: NextRequest) {
  let body: any = {};
  try {
    body = await req.json();
    const { code, language = 'javascript' } = body;

    if (!code || typeof code !== 'string' || !code.trim()) {
      return NextResponse.json(
        { message: 'Code snippet cannot be empty' },
        { status: 400 }
      );
    }

    if (code.length > 20000) {
      return NextResponse.json(
        { message: 'Code size exceeds maximum limit of 20,000 characters' },
        { status: 400 }
      );
    }

    const prompt = `Analyze the Big O Time and Space complexity of the following ${language} code. 
Return ONLY a valid JSON object matching this exact structure:
{
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "explanation": "Detailed explanation of runtime scanning...",
  "details": ["Step 1 detail", "Step 2 detail"],
  "optimizations": ["Optimization tip 1", "Optimization tip 2"],
  "confidence": "high"
}

Code:
${code}`;

    const customApiKey = req.headers.get('x-openrouter-key') || undefined;
    const rawResponse = await callOpenRouterAPI(prompt, true, customApiKey);

    if (rawResponse) {
      try {
        const cleanedJson = rawResponse.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleanedJson);
        if (parsed.timeComplexity && parsed.spaceComplexity) {
          return NextResponse.json(parsed);
        }
      } catch (parseErr) {
        console.warn('JSON parsing failed for AI complexity output, using local AST fallback:', parseErr);
      }
    }

    // AST Regex fallback
    const localResult = localComplexityAnalysis(code, language);
    return NextResponse.json(localResult);
  } catch (error: any) {
    console.error('Complexity Endpoint Error:', error);
    const localResult = localComplexityAnalysis(body?.code || '', body?.language || 'javascript');
    return NextResponse.json(localResult);
  }
}
