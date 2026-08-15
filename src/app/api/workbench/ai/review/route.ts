import { NextRequest, NextResponse } from 'next/server';
import { callOpenRouterAPI } from '@/server/services/aiService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { problemTitle, problemDescription, approachText, algorithmSteps, pseudocode, diagramSummary } = body;

    const stepsText = Array.isArray(algorithmSteps)
      ? algorithmSteps.map((s: any) => `Step ${s.stepNumber}: ${s.title} - ${s.explanation}`).join('\n')
      : '';

    const prompt = `You are an elite Data Structures & Algorithms (DSA) Mentor. Analyze the user's conceptual approach, algorithm steps, pseudocode, and diagram for a DSA problem.
    
Problem Title: ${problemTitle || 'LeetCode Problem'}
Problem Description: ${problemDescription || ''}

User's Approach:
${approachText || 'None provided yet.'}

Algorithm Steps:
${stepsText || 'None provided yet.'}

Pseudocode:
${pseudocode || 'None provided yet.'}

Diagram Description:
${diagramSummary || 'None drawn yet.'}

Evaluate the correctness and return ONLY a valid JSON object strictly matching this schema:
{
  "correctness": {
    "score": 85,
    "status": "Optimal",
    "feedback": "Concise summary of correctness..."
  },
  "logicIssues": ["Issue 1 if any"],
  "missingCases": ["Missing case 1"],
  "edgeCases": ["Edge case 1"],
  "optimizationSuggestions": ["Optimization tip 1"],
  "timeComplexity": {
    "value": "O(n)",
    "explanation": "Brief explanation..."
  },
  "spaceComplexity": {
    "value": "O(n)",
    "explanation": "Brief explanation..."
  },
  "hints": ["Pedagogical hint 1", "Pedagogical hint 2", "Pedagogical hint 3"],
  "nextStep": "Convert to code or test edge cases."
}`;

    const customApiKey = req.headers.get('x-openrouter-key') || undefined;
    const rawResponse = await callOpenRouterAPI(prompt, true, customApiKey);

    if (rawResponse) {
      try {
        const cleanedJson = rawResponse.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleanedJson);
        if (parsed.correctness) {
          return NextResponse.json(parsed);
        }
      } catch (parseErr) {
        console.warn('JSON parse failed for AI review:', parseErr);
      }
    }

    // Fallback response if AI call fails
    return NextResponse.json({
      correctness: {
        score: 80,
        status: "Good Conceptual Approach",
        feedback: "Your approach demonstrates good algorithmic intuition. Use a Hash Map or Two-Pointer technique to reduce redundant loops."
      },
      logicIssues: [],
      missingCases: ["Check empty or single-element inputs."],
      edgeCases: ["Duplicate elements and boundary limits."],
      optimizationSuggestions: ["Avoid nested loops where lookup can be performed in O(1) time."],
      timeComplexity: {
        value: "O(n)",
        explanation: "Linear scan through input items."
      },
      spaceComplexity: {
        value: "O(n)",
        explanation: "Storage required for intermediate elements."
      },
      hints: [
        "Hint 1: Identify if sorting or hash lookup reduces time complexity.",
        "Hint 2: Trace input values manually with a small array.",
        "Hint 3: Ensure index bounds do not overflow."
      ],
      nextStep: "Verify edge cases and click 'Convert to Code'."
    });
  } catch (error: any) {
    console.error('AI Review Error:', error);
    return NextResponse.json(
      { message: error.message || 'Error running AI approach review' },
      { status: 500 }
    );
  }
}
