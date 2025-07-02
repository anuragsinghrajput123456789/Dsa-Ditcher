
import { Calendar, Clock, Star, CheckCircle, Target } from "lucide-react";

interface RoadmapCardProps {
  roadmap: {
    id: string;
    title: string;
    description: string;
    duration: string;
    difficulty: string;
    xpReward: number;
    color: string;
    icon: string;
    completed: number;
    total: number;
  };
  onSelect: (id: string) => void;
}

const RoadmapCard = ({ roadmap, onSelect }: RoadmapCardProps) => {
  const progressPercentage = (roadmap.completed / roadmap.total) * 100;

  return (
    <div
      onClick={() => onSelect(roadmap.id)}
      className="bg-card rounded-xl p-6 shadow-lg border border-border hover:shadow-xl hover:border-primary/50 transition-all duration-200 cursor-pointer hover:-translate-y-1 group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-16 h-16 bg-gradient-to-r ${roadmap.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-md`}>
          <span className="text-2xl">{roadmap.icon}</span>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">{roadmap.completed}/{roadmap.total} completed</div>
          <div className="w-20 bg-border rounded-full h-2 mt-1">
            <div 
              className={`bg-gradient-to-r ${roadmap.color} h-2 rounded-full transition-all duration-500`}
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors">
        {roadmap.title}
      </h3>
      <p className="text-muted-foreground mb-4 line-clamp-2">{roadmap.description}</p>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {roadmap.duration}
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 mr-1" />
            {roadmap.xpReward} XP
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          roadmap.difficulty === 'Beginner' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
          roadmap.difficulty === 'Intermediate' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
          'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
        }`}>
          {roadmap.difficulty}
        </span>
      </div>

      {/* Progress indicator */}
      {roadmap.completed > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium text-card-foreground">{Math.round(progressPercentage)}%</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoadmapCard;
