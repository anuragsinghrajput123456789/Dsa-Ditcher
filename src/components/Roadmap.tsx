import { useState } from "react";
import RoadmapCard from "./roadmap/RoadmapCard";
import RoadmapProgress from "./roadmap/RoadmapProgress";
import RoadmapDetails from "./roadmap/RoadmapDetails";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import CustomRoadmap from "./CustomRoadmap";
import { useSimulatedUser } from "./roadmap/useSimulatedUser";
import { roadmaps, roadmapDetails } from "./roadmap/roadmapData";

const Roadmap = () => {
  const { user, updateXP } = useSimulatedUser();
  const [selectedRoadmap, setSelectedRoadmap] = useState<string | null>(null);

  const completeStep = (roadmapId: string, stepId: number) => {
    const roadmapData = roadmapDetails[roadmapId as keyof typeof roadmapDetails];
    const step = roadmapData?.steps.find(s => s.id === stepId);
    if (step && !step.completed) {
      step.completed = true;
      updateXP(step.xp);
    }
  };

  if (selectedRoadmap) {
    const roadmapData = roadmapDetails[selectedRoadmap as keyof typeof roadmapDetails];
    const selectedRoadmapInfo = roadmaps.find(r => r.id === selectedRoadmap);

    if (!roadmapData || !selectedRoadmapInfo) return null;

    return (
      <RoadmapDetails
        roadmapData={roadmapData}
        selectedRoadmapInfo={selectedRoadmapInfo}
        onStepComplete={(stepId) => completeStep(selectedRoadmap, stepId)}
        onBack={() => setSelectedRoadmap(null)}
      />
    );
  }

  return (
    <Tabs defaultValue="pre-written" className="w-full">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Learning Roadmaps</h1>
        <p className="text-gray-600 text-lg">Follow structured paths or create your own to master DSA concepts.</p>
      </div>

      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="pre-written">Pre-written Roadmaps</TabsTrigger>
        <TabsTrigger value="custom">Custom Roadmaps</TabsTrigger>
      </TabsList>

      <TabsContent value="pre-written" className="mt-6">
        <div className="space-y-6">
          <RoadmapProgress userLevel={user.level} />

          {/* Roadmap Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roadmaps.map((roadmap) => (
              <RoadmapCard
                key={roadmap.id}
                roadmap={roadmap}
                onSelect={setSelectedRoadmap}
              />
            ))}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="custom" className="mt-6">
        <CustomRoadmap />
      </TabsContent>
    </Tabs>
  );
};

export default Roadmap;
