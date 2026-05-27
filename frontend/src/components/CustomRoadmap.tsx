import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Plus, Trash2, Edit, Save, X, Calendar, Target, Clock, 
  BookOpen, PlusCircle, CheckCircle, ChevronRight, Info, Sparkles 
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  estimatedDays: number;
  resources: string[];
  completed: boolean;
}

interface CustomRoadmapType {
  id: string;
  title: string;
  description: string;
  totalDays: number;
  steps: RoadmapStep[];
  created: string;
}

const CustomRoadmap = () => {
  const [roadmaps, setRoadmaps] = useState<CustomRoadmapType[]>([]);
  const [selectedRoadmap, setSelectedRoadmap] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    try {
      const savedRoadmaps = localStorage.getItem("dsa-custom-roadmaps");
      if (savedRoadmaps) {
        setRoadmaps(JSON.parse(savedRoadmaps));
      }
    } catch (e) {
      console.error("Failed to load custom roadmaps", e);
    }
  }, []);

  const saveToLocalStorage = (data: CustomRoadmapType[]) => {
    localStorage.setItem("dsa-custom-roadmaps", JSON.stringify(data));
  };

  const [newRoadmap, setNewRoadmap] = useState({
    title: "",
    description: "",
    steps: [] as RoadmapStep[]
  });

  const [newStep, setNewStep] = useState({
    title: "",
    description: "",
    estimatedDays: 1,
    resources: [""]
  });

  const addResource = () => {
    setNewStep(prev => ({
      ...prev,
      resources: [...prev.resources, ""]
    }));
  };

  const updateResource = (index: number, value: string) => {
    setNewStep(prev => ({
      ...prev,
      resources: prev.resources.map((resource, i) => i === index ? value : resource)
    }));
  };

  const removeResource = (index: number) => {
    setNewStep(prev => ({
      ...prev,
      resources: prev.resources.filter((_, i) => i !== index)
    }));
  };

  const addStep = () => {
    if (newStep.title && newStep.description) {
      const step: RoadmapStep = {
        id: Date.now().toString(),
        title: newStep.title,
        description: newStep.description,
        estimatedDays: newStep.estimatedDays,
        resources: newStep.resources.filter(r => r.trim() !== ""),
        completed: false
      };

      setNewRoadmap(prev => ({
        ...prev,
        steps: [...prev.steps, step]
      }));

      setNewStep({
        title: "",
        description: "",
        estimatedDays: 1,
        resources: [""]
      });
    }
  };

  const removeStep = (stepId: string) => {
    setNewRoadmap(prev => ({
      ...prev,
      steps: prev.steps.filter(step => step.id !== stepId)
    }));
  };

  const saveRoadmap = () => {
    if (newRoadmap.title && newRoadmap.description && newRoadmap.steps.length > 0) {
      const roadmap: CustomRoadmapType = {
        id: Date.now().toString(),
        title: newRoadmap.title,
        description: newRoadmap.description,
        totalDays: newRoadmap.steps.reduce((sum, step) => sum + step.estimatedDays, 0),
        steps: newRoadmap.steps,
        created: new Date().toLocaleDateString()
      };

      const updated = [...roadmaps, roadmap];
      setRoadmaps(updated);
      saveToLocalStorage(updated);
      setNewRoadmap({ title: "", description: "", steps: [] });
      setIsCreating(false);
    }
  };

  const toggleStepCompletion = (roadmapId: string, stepId: string) => {
    const updated = roadmaps.map(roadmap => 
      roadmap.id === roadmapId 
        ? {
            ...roadmap,
            steps: roadmap.steps.map(step =>
              step.id === stepId ? { ...step, completed: !step.completed } : step
            )
          }
        : roadmap
    );
    setRoadmaps(updated);
    saveToLocalStorage(updated);
  };

  const deleteRoadmap = (roadmapId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this custom roadmap?")) {
      const updated = roadmaps.filter(roadmap => roadmap.id !== roadmapId);
      setRoadmaps(updated);
      saveToLocalStorage(updated);
      if (selectedRoadmap === roadmapId) {
        setSelectedRoadmap(null);
      }
    }
  };

  const getCompletionPercentage = (roadmap: CustomRoadmapType) => {
    if (!roadmap.steps || roadmap.steps.length === 0) return 0;
    const completed = roadmap.steps.filter(step => step.completed).length;
    return Math.round((completed / roadmap.steps.length) * 100);
  };

  if (selectedRoadmap) {
    const roadmap = roadmaps.find(r => r.id === selectedRoadmap);
    if (!roadmap) return null;

    const completedCount = roadmap.steps.filter(s => s.completed).length;
    const progressPercent = getCompletionPercentage(roadmap);

    return (
      <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
        <Button
          onClick={() => setSelectedRoadmap(null)}
          variant="ghost"
          className="text-primary hover:text-primary/80 hover:bg-primary/10 transition-all duration-200"
        >
          ← Back to Custom Roadmaps
        </Button>

        {/* Dynamic header card matching RoadmapDetails.tsx style */}
        <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:20px_20px]"></div>
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-2 tracking-tight">{roadmap.title}</h1>
          <p className="text-pink-100 text-sm sm:text-base mb-4 leading-relaxed max-w-2xl">{roadmap.description}</p>
          <div className="flex flex-wrap items-center gap-6 text-sm font-semibold">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-pink-200" />
              {roadmap.totalDays} Days Goal
            </div>
            <div className="flex items-center gap-1.5">
              <Target className="w-4 h-4 text-purple-200" />
              {completedCount}/{roadmap.steps.length} Completed
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-indigo-200" />
              {progressPercent}% Done
            </div>
          </div>
        </div>

        {/* Steps display list */}
        <div className="glass-card rounded-2xl p-6 shadow-xl border border-border/50">
          <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-border/40">
            <BookOpen className="w-5.5 h-5.5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Interactive Learning Checklist</h2>
          </div>
          
          <div className="space-y-4">
            {roadmap.steps.map((step, index) => (
              <div
                key={step.id}
                className={`p-5 rounded-xl border transition-all duration-300 ${
                  step.completed 
                    ? 'border-emerald-500/30 bg-emerald-50/20 dark:bg-emerald-950/10 shadow-sm' 
                    : 'border-border bg-muted/10 hover:border-primary/30 hover:bg-muted/20'
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleStepCompletion(roadmap.id, step.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      step.completed
                        ? 'bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/20'
                        : 'border-muted-foreground/45 hover:border-emerald-500'
                    }`}
                  >
                    {step.completed && <span className="text-xs font-black">✓</span>}
                  </button>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                      <h3 className={`text-base sm:text-lg font-bold truncate ${
                        step.completed ? 'text-emerald-600 dark:text-emerald-400 line-through opacity-80' : 'text-foreground'
                      }`}>
                        Step {index + 1}: {step.title}
                      </h3>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
                        {step.estimatedDays} Day{step.estimatedDays !== 1 ? 's' : ''}
                      </span>
                    </div>
                    
                    <p className={`text-sm leading-relaxed mb-4 ${step.completed ? 'text-muted-foreground/60' : 'text-muted-foreground'}`}>
                      {step.description}
                    </p>
                    
                    {step.resources && step.resources.length > 0 && (
                      <div className="bg-muted/30 dark:bg-black/25 p-3 rounded-lg border border-border/30">
                        <h4 className="font-bold text-xs text-foreground mb-1.5 uppercase tracking-wider">Reference Resources:</h4>
                        <ul className="space-y-1.5">
                          {step.resources.map((resource, resourceIndex) => (
                            <li key={resourceIndex} className="text-xs font-semibold text-primary hover:underline flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                              <a href={resource} target="_blank" rel="noopener noreferrer">
                                {resource}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-5 bg-muted/40 dark:bg-muted/15 rounded-xl border border-border/50">
            <div className="flex justify-between items-center mb-2.5 text-sm font-bold">
              <span className="text-foreground">Overall Mastery Progress</span>
              <span className="text-primary">{progressPercent}%</span>
            </div>
            <div className="w-full bg-muted dark:bg-muted/20 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isCreating) {
    return (
      <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">Create Custom Roadmap</h1>
          <Button
            onClick={() => setIsCreating(false)}
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        <div className="glass-card rounded-2xl p-6 shadow-xl border border-border/50 space-y-4">
          <h2 className="text-lg font-bold text-foreground">Roadmap Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-muted-foreground mb-2">Roadmap Title</label>
              <input
                type="text"
                value={newRoadmap.title}
                onChange={(e) => setNewRoadmap(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 bg-background text-foreground border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="e.g., Master Dynamic Programming in 30 Days"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-muted-foreground mb-2">Description</label>
              <textarea
                value={newRoadmap.description}
                onChange={(e) => setNewRoadmap(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-3 bg-background text-foreground border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Describe your learning goals and what you'll achieve..."
                rows={3}
              />
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 shadow-xl border border-border/50 space-y-6">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-5.5 h-5.5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Add Steps & Milestones</h2>
          </div>
          
          <div className="space-y-4 bg-muted/20 dark:bg-muted/10 p-5 rounded-xl border border-border/40">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Step Title</label>
                <input
                  type="text"
                  value={newStep.title}
                  onChange={(e) => setNewStep(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 bg-background text-foreground border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., Learn Basic DP Concepts"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Estimated Days</label>
                <input
                  type="number"
                  min="1"
                  value={newStep.estimatedDays}
                  onChange={(e) => setNewStep(prev => ({ ...prev, estimatedDays: parseInt(e.target.value) || 1 }))}
                  className="w-full px-3 py-2 bg-background text-foreground border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Description</label>
              <textarea
                value={newStep.description}
                onChange={(e) => setNewStep(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 bg-background text-foreground border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="What will you learn in this step?"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">Helpful Resources</label>
              {newStep.resources.map((resource, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="url"
                    value={resource}
                    onChange={(e) => updateResource(index, e.target.value)}
                    className="flex-1 px-3 py-2 bg-background text-foreground border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="https://example.com/resource"
                  />
                  <Button
                    onClick={() => removeResource(index)}
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-600 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                onClick={addResource}
                variant="ghost"
                size="sm"
                className="text-primary hover:bg-primary/5 hover:text-primary font-bold text-xs"
              >
                + Add Resource URL
              </Button>
            </div>

            <Button
              onClick={addStep}
              className="bg-primary text-primary-foreground hover:bg-primary/95 font-bold text-xs rounded-lg py-2 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Step to List</span>
            </Button>
          </div>

          {newRoadmap.steps.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-bold text-sm text-foreground">Added Steps ({newRoadmap.steps.length})</h3>
              <div className="space-y-2">
                {newRoadmap.steps.map((step, index) => (
                  <div key={step.id} className="flex items-center justify-between p-3.5 bg-muted/40 dark:bg-muted/15 rounded-xl border border-border/40">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </span>
                      <span className="font-semibold text-foreground text-sm">{step.title}</span>
                      <span className="text-xs text-muted-foreground font-medium">({step.estimatedDays} days)</span>
                    </div>
                    <Button
                      onClick={() => removeStep(step.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-600 p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button
            onClick={() => setIsCreating(false)}
            variant="outline"
            className="px-6 py-2 rounded-xl"
          >
            Cancel
          </Button>
          <Button
            onClick={saveRoadmap}
            disabled={!newRoadmap.title || !newRoadmap.description || newRoadmap.steps.length === 0}
            className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-2 rounded-xl disabled:opacity-50 flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save & Initialize</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border/40 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Custom Roadmaps</h1>
          <p className="text-muted-foreground mt-1">Design, configure, and monitor your custom learning trajectories</p>
        </div>
        <Button
          onClick={() => setIsCreating(true)}
          className="bg-primary hover:bg-primary/95 text-white font-bold px-6 py-5 rounded-xl shadow-lg shadow-purple-500/10 flex items-center gap-2 hover:scale-[1.02] transition-transform duration-200"
        >
          <Plus className="w-5 h-5" />
          <span>Create Custom Roadmap</span>
        </Button>
      </div>

      {roadmaps.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center border border-border/50 max-w-2xl mx-auto space-y-6">
          <div className="w-16 h-16 bg-muted/40 rounded-2xl flex items-center justify-center mx-auto border border-border">
            <Target className="w-8 h-8 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-foreground">No Custom Roadmaps Yet</h3>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto">
              Create a bespoke learning journey tailored to your career goals. Add resource links, milestones, and daily tracking.
            </p>
          </div>
          <Button
            onClick={() => setIsCreating(true)}
            className="bg-primary hover:bg-primary/95 font-bold rounded-xl"
          >
            Create Your First Roadmap
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roadmaps.map((roadmap) => {
            const completionPercent = getCompletionPercentage(roadmap);
            return (
              <div 
                key={roadmap.id} 
                onClick={() => setSelectedRoadmap(roadmap.id)}
                className="group glass-card glass-card-hover rounded-2xl p-6 shadow-lg border border-border/40 hover:border-primary/45 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {roadmap.title}
                    </h3>
                    <Button
                      onClick={(e) => deleteRoadmap(roadmap.id, e)}
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-600 p-2 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <p className="text-xs sm:text-sm text-muted-foreground mb-5 line-clamp-2 leading-relaxed">
                    {roadmap.description}
                  </p>
                  
                  <div className="space-y-2 mb-5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-muted-foreground">Solved Progress</span>
                      <span className="text-primary">{completionPercent}%</span>
                    </div>
                    <div className="w-full bg-muted dark:bg-muted/20 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-pink-500 to-indigo-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${completionPercent}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-border/40 pt-4 flex flex-col gap-4 mt-auto">
                  <div className="flex justify-between items-center text-[10px] sm:text-xs font-semibold text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {roadmap.totalDays} Days
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      {roadmap.steps.length} Steps
                    </div>
                    <span className="bg-muted px-2 py-0.5 rounded">
                      {roadmap.created}
                    </span>
                  </div>
                  
                  <Button
                    className="w-full bg-primary hover:bg-primary/95 text-white font-bold rounded-xl py-2 flex items-center justify-center gap-1"
                  >
                    <span>Continue Roadmap</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomRoadmap;
