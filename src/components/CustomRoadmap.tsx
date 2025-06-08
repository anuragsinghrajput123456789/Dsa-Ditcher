
import { useState } from "react";
import { Plus, Trash2, Edit, Save, X, Calendar, Target, Clock } from "lucide-react";

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
  const [editingStep, setEditingStep] = useState<string | null>(null);

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

      setRoadmaps(prev => [...prev, roadmap]);
      setNewRoadmap({ title: "", description: "", steps: [] });
      setIsCreating(false);
    }
  };

  const toggleStepCompletion = (roadmapId: string, stepId: string) => {
    setRoadmaps(prev => prev.map(roadmap => 
      roadmap.id === roadmapId 
        ? {
            ...roadmap,
            steps: roadmap.steps.map(step =>
              step.id === stepId ? { ...step, completed: !step.completed } : step
            )
          }
        : roadmap
    ));
  };

  const deleteRoadmap = (roadmapId: string) => {
    setRoadmaps(prev => prev.filter(roadmap => roadmap.id !== roadmapId));
    if (selectedRoadmap === roadmapId) {
      setSelectedRoadmap(null);
    }
  };

  const getCompletionPercentage = (roadmap: CustomRoadmapType) => {
    const completed = roadmap.steps.filter(step => step.completed).length;
    return Math.round((completed / roadmap.steps.length) * 100);
  };

  if (selectedRoadmap) {
    const roadmap = roadmaps.find(r => r.id === selectedRoadmap);
    if (!roadmap) return null;

    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedRoadmap(null)}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Back to Roadmaps
        </button>

        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">{roadmap.title}</h1>
          <p className="text-purple-100 mb-4">{roadmap.description}</p>
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {roadmap.totalDays} days
            </div>
            <div className="flex items-center">
              <Target className="w-4 h-4 mr-1" />
              {roadmap.steps.filter(s => s.completed).length}/{roadmap.steps.length} completed
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {getCompletionPercentage(roadmap)}% progress
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Learning Steps</h2>
          <div className="space-y-4">
            {roadmap.steps.map((step, index) => (
              <div
                key={step.id}
                className={`p-6 rounded-lg border-2 transition-all duration-200 ${
                  step.completed 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <button
                        onClick={() => toggleStepCompletion(roadmap.id, step.id)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                          step.completed
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'border-gray-300 hover:border-green-500'
                        }`}
                      >
                        {step.completed && <span className="text-xs">✓</span>}
                      </button>
                      <h3 className={`text-lg font-semibold ${
                        step.completed ? 'text-green-800' : 'text-gray-800'
                      }`}>
                        Step {index + 1}: {step.title}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {step.estimatedDays} day{step.estimatedDays !== 1 ? 's' : ''}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    
                    {step.resources.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Resources:</h4>
                        <ul className="space-y-1">
                          {step.resources.map((resource, resourceIndex) => (
                            <li key={resourceIndex} className="text-sm text-blue-600 hover:text-blue-700">
                              <a href={resource} target="_blank" rel="noopener noreferrer">
                                • {resource}
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

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-700">Overall Progress</span>
              <span className="text-gray-600">{getCompletionPercentage(roadmap)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${getCompletionPercentage(roadmap)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isCreating) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Create Custom Roadmap</h1>
          <button
            onClick={() => setIsCreating(false)}
            className="text-gray-600 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Roadmap Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={newRoadmap.title}
                onChange={(e) => setNewRoadmap(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Master Dynamic Programming in 30 Days"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={newRoadmap.description}
                onChange={(e) => setNewRoadmap(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your learning goals and what you'll achieve..."
                rows={3}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Add Learning Steps</h2>
          
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Step Title</label>
                <input
                  type="text"
                  value={newStep.title}
                  onChange={(e) => setNewStep(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Learn Basic DP Concepts"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Days</label>
                <input
                  type="number"
                  min="1"
                  value={newStep.estimatedDays}
                  onChange={(e) => setNewStep(prev => ({ ...prev, estimatedDays: parseInt(e.target.value) || 1 }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newStep.description}
                  onChange={(e) => setNewStep(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="What will you learn in this step?"
                  rows={2}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Resources</label>
              {newStep.resources.map((resource, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="url"
                    value={resource}
                    onChange={(e) => updateResource(index, e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/resource"
                  />
                  <button
                    onClick={() => removeResource(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={addResource}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                + Add Resource
              </button>
            </div>

            <button
              onClick={addStep}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Step</span>
            </button>
          </div>

          {newRoadmap.steps.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Added Steps ({newRoadmap.steps.length})</h3>
              <div className="space-y-2">
                {newRoadmap.steps.map((step, index) => (
                  <div key={step.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-medium">{index + 1}. {step.title}</span>
                      <span className="text-sm text-gray-500 ml-2">({step.estimatedDays} days)</span>
                    </div>
                    <button
                      onClick={() => removeStep(step.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setIsCreating(false)}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={saveRoadmap}
            disabled={!newRoadmap.title || !newRoadmap.description || newRoadmap.steps.length === 0}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Roadmap</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Custom Roadmaps</h1>
          <p className="text-gray-600 mt-2">Create and track your personalized learning paths</p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Create Roadmap</span>
        </button>
      </div>

      {roadmaps.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Target className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No custom roadmaps yet</h3>
          <p className="text-gray-600 mb-6">Create your first personalized learning path to get started</p>
          <button
            onClick={() => setIsCreating(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Your First Roadmap
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roadmaps.map((roadmap) => (
            <div key={roadmap.id} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">{roadmap.title}</h3>
                <button
                  onClick={() => deleteRoadmap(roadmap.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <p className="text-gray-600 mb-4">{roadmap.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="text-gray-600">{getCompletionPercentage(roadmap)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${getCompletionPercentage(roadmap)}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <span>{roadmap.totalDays} days</span>
                <span>{roadmap.steps.length} steps</span>
                <span>Created {roadmap.created}</span>
              </div>
              
              <button
                onClick={() => setSelectedRoadmap(roadmap.id)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue Learning
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomRoadmap;
