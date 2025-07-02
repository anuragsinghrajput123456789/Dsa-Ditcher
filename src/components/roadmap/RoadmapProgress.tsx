
import { Calendar, Target, TrendingUp } from "lucide-react";

interface RoadmapProgressProps {
  userLevel: number;
}

const RoadmapProgress = ({ userLevel }: RoadmapProgressProps) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 rounded-xl p-6 text-white shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Your Learning Progress</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-6 h-6" />
            <span className="text-2xl font-bold">1</span>
          </div>
          <p className="text-sm text-white/90">Active Roadmaps</p>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-6 h-6" />
            <span className="text-2xl font-bold">2</span>
          </div>
          <p className="text-sm text-white/90">Steps Completed</p>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-6 h-6" />
            <span className="text-2xl font-bold">{Math.round(((userLevel || 1) - 1) * 25)}%</span>
          </div>
          <p className="text-sm text-white/90">Overall Progress</p>
        </div>
      </div>
    </div>
  );
};

export default RoadmapProgress;
