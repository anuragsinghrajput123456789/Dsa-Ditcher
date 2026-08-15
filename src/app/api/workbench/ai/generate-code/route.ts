import { NextRequest, NextResponse } from 'next/server';
import { callOpenRouterAPI } from '@/server/services/aiService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { targetLanguage = 'javascript', problemTitle, problemDescription, approachText, algorithmSteps, pseudocode } = body;

    const stepsText = Array.isArray(algorithmSteps)
      ? algorithmSteps.map((s: any) => `Step ${s.stepNumber}: ${s.title} - ${s.explanation}`).join('\n')
      : '';

    const prompt = `Convert the following DSA solution design into clean, well-commented ${targetLanguage} code.

Problem: ${problemTitle || 'DSA Problem'}
Description: ${problemDescription || ''}

User's Approach:
${approachText || ''}

Algorithm Steps:
${stepsText || ''}

Pseudocode:
${pseudocode || ''}

Provide ONLY the production-ready ${targetLanguage} code snippet with clear comments explaining each section. Do NOT add conversational intro text.`;

    const customApiKey = req.headers.get('x-openrouter-key') || undefined;
    const rawResponse = await callOpenRouterAPI(prompt, false, customApiKey);

    if (rawResponse) {
      const codeSnippet = rawResponse.replace(/```[a-z]*/g, '').replace(/```/g, '').trim();
      return NextResponse.json({ language: targetLanguage, code: codeSnippet });
    }

    // Fallback code generation
    let fallbackCode = `// ${targetLanguage} implementation based on approach\nfunction solution() {\n  // Implement approach here\n}`;
    if (targetLanguage === 'python') {
      fallbackCode = `# ${targetLanguage} implementation\ndef solution(nums, target):\n    # Hash map lookup approach\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    return []`;
    } else if (targetLanguage === 'cpp') {
      fallbackCode = `// C++ implementation\n#include <unordered_map>\n#include <vector>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    unordered_map<int, int> seen;\n    for (int i = 0; i < nums.size(); i++) {\n        int comp = target - nums[i];\n        if (seen.count(comp)) return {seen[comp], i};\n        seen[nums[i]] = i;\n    }\n    return {};\n}`;
    }

    return NextResponse.json({ language: targetLanguage, code: fallbackCode });
  } catch (error: any) {
    console.error('Code Generation Error:', error);
    return NextResponse.json(
      { message: error.message || 'Error generating implementation code' },
      { status: 500 }
    );
  }
}
