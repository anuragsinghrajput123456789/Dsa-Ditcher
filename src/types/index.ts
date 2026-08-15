export interface IUser {
  _id: string;
  name: string;
  email: string;
  level?: string;
  problemsSolved?: number;
  streak?: number;
  lastActiveDate?: string | Date | null;
  token?: string;
}

export interface ISheet {
  _id: string;
  user: string;
  title: string;
  description: string;
  problems: string;
  difficulty?: string;
  tags?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IChat {
  _id: string;
  user: string;
  role: 'user' | 'ai';
  content: string;
  createdAt?: string;
}

export interface ComplexityResponse {
  timeComplexity: string;
  spaceComplexity: string;
  explanation: string;
  details?: string[];
  optimizations?: string[];
  confidence?: string;
  error?: string;
}

export interface ProblemAnalysisResponse {
  title?: string;
  summary?: string;
  suboptimalApproach?: string;
  optimalApproach?: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  edgeCases?: string[];
  codeSnippet?: string;
  hints?: string[];
  rawResponse?: string;
}

export interface RoadmapNode {
  id: string;
  title: string;
  category: 'Language' | 'Basics' | 'Data Structure' | 'Algorithm' | 'Advanced' | 'Prep';
  status: 'solved' | 'active' | 'locked';
  type: 'required' | 'alternative' | 'optional';
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedHours: number;
  prerequisites: string[];
  leetcodeCount: number;
}
