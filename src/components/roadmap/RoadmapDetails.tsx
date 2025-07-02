
import { Calendar, Clock, Star, CheckCircle, Circle, Target, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      <Button
        onClick={onBack}
        variant="ghost"
        className="mb-6 text-primary hover:text-primary/80"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Roadmaps
      </Button>

      {/* Roadmap Header */}
      <div className={`bg-gradient-to-r ${selectedRoadmapInfo.color} rounded-xl p-8 text-white mb-6 shadow-lg`}>
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
      <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
        <h2 className="text-xl font-bold text-card-foreground mb-6">Learning Steps</h2>
        <div className="space-y-4">
          {roadmapData.steps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Step Number Badge */}
              <div className="absolute -left-4 top-4 z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step.completed 
                    ? 'bg-green-500 text-white' 
                    : 'bg-primary text-primary-foreground'
                }`}>
                  {index + 1}
                </div>
              </div>
              
              {/* Connection Line */}
              {index < roadmapData.steps.length - 1 && (
                <div className="absolute left-0 top-12 w-0.5 h-6 bg-border"></div>
              )}

              <div className="flex items-center space-x-4 p-4 pl-8 rounded-lg border border-border hover:border-primary/50 transition-colors bg-card">
                <button
                  onClick={() => onStepComplete(step.id)}
                  className="flex-shrink-0"
                >
                  {step.completed ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <Circle className="w-6 h-6 text-muted-foreground hover:text-green-500 transition-colors" />
                  )}
                </button>
                
                <div className="flex-1">
                  <h3 className={`font-semibold text-lg ${step.completed ? 'text-green-600 dark:text-green-400' : 'text-card-foreground'}`}>
                    Step {index + 1}: {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {step.completed ? 'Completed! Great job! 🎉' : 'Click the circle to mark as complete'}
                  </p>
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-medium text-card-foreground">{step.xp} XP</div>
                  {step.completed && (
                    <div className="text-xs text-green-600 dark:text-green-400">✓ Earned</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-8 p-6 bg-muted rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-foreground">Overall Progress</span>
            <span className="text-sm text-muted-foreground">{progressPercentage}% Complete</span>
          </div>
          <div className="w-full bg-border rounded-full h-3">
            <div 
              className={`bg-gradient-to-r ${selectedRoadmapInfo.color} h-3 rounded-full transition-all duration-500`} 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          {progressPercentage === 100 && (
            <div className="text-center mt-4">
              <span className="text-2xl">🎉</span>
              <p className="text-green-600 dark:text-green-400 font-semibold mt-2">
                Congratulations! You've completed this roadmap!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoadmapDetails;
