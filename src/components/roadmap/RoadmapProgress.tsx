
import { Calendar, Target, TrendingUp } from "lucide-react";

interface RoadmapProgressProps {
  userLevel: number;
}

const RoadmapProgress = ({ userLevel }: RoadmapProgressProps) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Your Learning Progress</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-6 h-6" />
            <span className="text-2xl font-bold">1</span>
          </div>
          <p className="text-sm">Active Roadmaps</p>
        </div>
        <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-6 h-6" />
            <span className="text-2xl font-bold">2</span>
          </div>
          <p className="text-sm">Steps Completed</p>
        </div>
        <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-6 h-6" />
            <span className="text-2xl font-bold">{Math.round(((userLevel || 1) - 1) * 25)}%</span>
          </div>
          <p className="text-sm">Overall Progress</p>
        </div>
      </div>
    </div>
  );
};

export default RoadmapProgress;
