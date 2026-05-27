
import { Calendar, Clock, Star, CheckCircle, Circle, Target, ArrowLeft, BookOpen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RoadmapStep {
  id: number;
  title: string;
  completed: boolean;
  xp: number;
  description?: string;
  prerequisites?: string;
  topics?: string[];
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
    <div className="max-w-5xl mx-auto">
      <Button
        onClick={onBack}
        variant="ghost"
        className="mb-6 text-primary hover:text-primary/80 hover:bg-primary/10 transition-all duration-200"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Roadmaps
      </Button>

      {/* Roadmap Header */}
      <div className={`bg-gradient-to-r ${selectedRoadmapInfo.color} rounded-xl p-8 text-white mb-6 shadow-lg`}>
        <h1 className="text-3xl font-bold mb-2">{roadmapData.title}</h1>
        <p className="text-blue-100 mb-4">{roadmapData.description}</p>
        <div className="flex flex-wrap items-center gap-6 text-sm">
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

      {/* Learning Path Steps */}
      <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
        <div className="flex items-center mb-6">
          <BookOpen className="w-6 h-6 text-primary mr-3" />
          <h2 className="text-xl font-bold text-card-foreground">Step-by-Step Learning Path</h2>
        </div>
        
        <div className="space-y-6">
          {roadmapData.steps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Step Number Badge */}
              <div className="absolute -left-4 top-6 z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-lg ${
                  step.completed 
                    ? 'bg-green-500 text-white animate-pulse' 
                    : index === 0 || roadmapData.steps[index - 1]?.completed
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {step.completed ? '✓' : index + 1}
                </div>
              </div>
              
              {/* Connection Line */}
              {index < roadmapData.steps.length - 1 && (
                <div className={`absolute left-0 top-16 w-0.5 h-12 ${
                  step.completed ? 'bg-green-500' : 'bg-border'
                }`}></div>
              )}

              <div className={`ml-8 p-6 rounded-lg border transition-all duration-200 ${
                step.completed 
                  ? 'border-green-500/50 bg-green-50 dark:bg-green-950/20' 
                  : index === 0 || roadmapData.steps[index - 1]?.completed
                  ? 'border-primary/50 bg-primary/5 hover:border-primary hover:shadow-md'
                  : 'border-border bg-muted/20'
              }`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <button
                        onClick={() => onStepComplete(step.id)}
                        className="flex-shrink-0 mr-4"
                        disabled={!step.completed && index > 0 && !roadmapData.steps[index - 1]?.completed}
                      >
                        {step.completed ? (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        ) : (
                          <Circle className={`w-6 h-6 transition-colors ${
                            index === 0 || roadmapData.steps[index - 1]?.completed
                              ? 'text-primary hover:text-green-500 cursor-pointer'
                              : 'text-muted-foreground cursor-not-allowed'
                          }`} />
                        )}
                      </button>
                      <h3 className={`font-semibold text-lg ${
                        step.completed 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-card-foreground'
                      }`}>
                        Step {index + 1}: {step.title}
                      </h3>
                    </div>
                    
                    {step.description && (
                      <p className="text-muted-foreground mb-3 ml-10">{step.description}</p>
                    )}
                    
                    {step.prerequisites && (
                      <div className="ml-10 mb-3">
                        <span className="text-sm font-medium text-primary">Prerequisites: </span>
                        <span className="text-sm text-muted-foreground">{step.prerequisites}</span>
                      </div>
                    )}
                    
                    {step.topics && step.topics.length > 0 && (
                      <div className="ml-10 flex flex-wrap gap-2">
                        {step.topics.map((topic, topicIndex) => (
                          <span 
                            key={topicIndex}
                            className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-md"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-medium text-card-foreground">{step.xp} XP</div>
                    {step.completed && (
                      <div className="text-xs text-green-600 dark:text-green-400">✓ Earned</div>
                    )}
                  </div>
                </div>
                
                {!step.completed && index > 0 && !roadmapData.steps[index - 1]?.completed && (
                  <div className="ml-10 text-sm text-muted-foreground bg-muted/50 p-2 rounded">
                    🔒 Complete the previous step to unlock this one
                  </div>
                )}
                
                {step.completed && (
                  <div className="ml-10 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/20 p-2 rounded">
                    🎉 Completed! Great progress on your learning journey!
                  </div>
                )}
                
                {!step.completed && (index === 0 || roadmapData.steps[index - 1]?.completed) && (
                  <div className="ml-10 text-sm text-primary bg-primary/10 p-2 rounded">
                    👆 Click the circle above to mark as complete when you finish this step
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Progress Summary */}
        <div className="mt-8 p-6 bg-gradient-to-r from-muted/50 to-muted/30 rounded-lg border border-border">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-foreground">Overall Progress</span>
            <span className="text-sm text-muted-foreground">{progressPercentage}% Complete</span>
          </div>
          <div className="w-full bg-border rounded-full h-3 mb-4">
            <div 
              className={`bg-gradient-to-r ${selectedRoadmapInfo.color} h-3 rounded-full transition-all duration-500 shadow-sm`} 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          
          {progressPercentage === 100 ? (
            <div className="text-center">
              <div className="text-4xl mb-2">🎉🏆🎉</div>
              <p className="text-green-600 dark:text-green-400 font-semibold text-lg">
                Congratulations! You've mastered this roadmap!
              </p>
              <p className="text-muted-foreground text-sm mt-1">
                You've earned {roadmapData.xpReward} XP and gained valuable skills!
              </p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-muted-foreground text-sm">
                Keep going! You're {completedSteps} steps closer to mastering {roadmapData.title}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoadmapDetails;
