
import { Calculator, Clock, Database } from "lucide-react";

interface ComplexityAnalysisProps {
  analysis: {
    timeComplexity: string;
    spaceComplexity: string;
    explanation: string;
    optimizations: string[];
  };
  roadmapColor: string;
}

const ComplexityAnalysis = ({ analysis, roadmapColor }: ComplexityAnalysisProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
        <Calculator className="w-5 h-5 mr-2" />
        Complexity Analysis
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Clock className="w-4 h-4 mr-2 text-blue-600" />
            <span className="font-semibold text-blue-800">Time Complexity</span>
          </div>
          <div className="text-2xl font-bold text-blue-600 mb-1">{analysis.timeComplexity}</div>
          <p className="text-sm text-blue-700">{analysis.explanation}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Database className="w-4 h-4 mr-2 text-green-600" />
            <span className="font-semibold text-green-800">Space Complexity</span>
          </div>
          <div className="text-2xl font-bold text-green-600 mb-1">{analysis.spaceComplexity}</div>
          <p className="text-sm text-green-700">Additional space used</p>
        </div>
      </div>
      
      {analysis.optimizations.length > 0 && (
        <div className="mt-4 bg-yellow-50 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-800 mb-2">Optimization Suggestions:</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            {analysis.optimizations.map((opt, index) => (
              <li key={index}>• {opt}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ComplexityAnalysis;
