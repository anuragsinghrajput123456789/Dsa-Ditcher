
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
  return (
    <div
      onClick={() => onSelect(roadmap.id)}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 cursor-pointer hover:-translate-y-1 group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-16 h-16 bg-gradient-to-r ${roadmap.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
          <span className="text-2xl">{roadmap.icon}</span>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">{roadmap.completed}/{roadmap.total} completed</div>
          <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
            <div 
              className={`bg-gradient-to-r ${roadmap.color} h-2 rounded-full transition-all duration-500`}
              style={{ width: `${(roadmap.completed / roadmap.total) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-800 mb-2">{roadmap.title}</h3>
      <p className="text-gray-600 mb-4">{roadmap.description}</p>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
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
          roadmap.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
          roadmap.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {roadmap.difficulty}
        </span>
      </div>
    </div>
  );
};

export default RoadmapCard;
