
import { Calendar, Clock, Star, CheckCircle, Circle, Target } from "lucide-react";

interface RoadmapStep {
  id: number;
  title: string;
  completed: boolean;
  xp: number;
}

interface RoadmapDetailsProps {
  roadmapData: {
    title: string;
    description: string;
    duration: string;
    xpReward: number;
    steps: RoadmapStep[];
  };
  selectedRoadmapInfo: {
    color: string;
  };
  onStepComplete: (stepId: number) => void;
  onBack: () => void;
}

const RoadmapDetails = ({ roadmapData, selectedRoadmapInfo, onStepComplete, onBack }: RoadmapDetailsProps) => {
  const completedSteps = roadmapData.steps.filter(step => step.completed).length;
  const progressPercentage = Math.round((completedSteps / roadmapData.steps.length) * 100);

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="mb-6 text-blue-600 hover:text-blue-700 font-medium"
      >
        ← Back to Roadmaps
      </button>

      {/* Roadmap Header */}
      <div className={`bg-gradient-to-r ${selectedRoadmapInfo.color} rounded-xl p-8 text-white mb-6`}>
        <h1 className="text-3xl font-bold mb-2">{roadmapData.title}</h1>
        <p className="text-blue-100 mb-4">{roadmapData.description}</p>
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {roadmapData.duration}
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 mr-1" />
            {roadmapData.xpReward} XP Total
          </div>
          <div className="flex items-center">
            <Target className="w-4 h-4 mr-1" />
            {completedSteps}/{roadmapData.steps.length} Completed
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Learning Steps</h2>
        <div className="space-y-4">
          {roadmapData.steps.map((step, index) => (
            <div key={step.id} className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <button
                onClick={() => onStepComplete(step.id)}
                className="flex-shrink-0"
              >
                {step.completed ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-400 hover:text-green-500" />
                )}
              </button>
              
              <div className="flex-1">
                <h3 className={`font-semibold ${step.completed ? 'text-green-800' : 'text-gray-800'}`}>
                  Step {step.id}: {step.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {step.completed ? 'Completed! Great job!' : 'Click to mark as complete'}
                </p>
              </div>
              
              <div className="text-right">
                <div className="text-sm font-medium text-gray-800">{step.xp} XP</div>
                {step.completed && (
                  <div className="text-xs text-green-600">✓ Earned</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm text-gray-600">{progressPercentage}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`bg-gradient-to-r ${selectedRoadmapInfo.color} h-3 rounded-full transition-all duration-500`} 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapDetails;
