
import { useState } from "react";
import { Plus, Edit, Trash2, Save, X, Calendar, Target, CheckCircle } from "lucide-react";

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  topics: string[];
  completed: boolean;
  createdAt: string;
}

const RoadmapCRUD = () => {
  const [roadmaps, setRoadmaps] = useState<RoadmapItem[]>([
    {
      id: '1',
      title: 'Arrays & Strings Mastery',
      description: 'Master fundamental array and string manipulation techniques',
      difficulty: 'Beginner',
      duration: '2 weeks',
      topics: ['Two Pointers', 'Sliding Window', 'String Matching'],
      completed: false,
      createdAt: new Date().toISOString()
    }
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: 'Beginner' as 'Beginner' | 'Intermediate' | 'Advanced',
    duration: '',
    topics: ['']
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      difficulty: 'Beginner',
      duration: '',
      topics: ['']
    });
  };

  const handleCreate = () => {
    if (formData.title && formData.description) {
      const newRoadmap: RoadmapItem = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        difficulty: formData.difficulty,
        duration: formData.duration,
        topics: formData.topics.filter(topic => topic.trim() !== ''),
        completed: false,
        createdAt: new Date().toISOString()
      };
      setRoadmaps(prev => [...prev, newRoadmap]);
      resetForm();
      setIsCreating(false);
    }
  };

  const handleUpdate = () => {
    if (editingId && formData.title && formData.description) {
      setRoadmaps(prev => prev.map(roadmap => 
        roadmap.id === editingId 
          ? {
              ...roadmap,
              title: formData.title,
              description: formData.description,
              difficulty: formData.difficulty,
              duration: formData.duration,
              topics: formData.topics.filter(topic => topic.trim() !== '')
            }
          : roadmap
      ));
      resetForm();
      setEditingId(null);
    }
  };

  const handleDelete = (id: string) => {
    setRoadmaps(prev => prev.filter(roadmap => roadmap.id !== id));
  };

  const startEdit = (roadmap: RoadmapItem) => {
    setFormData({
      title: roadmap.title,
      description: roadmap.description,
      difficulty: roadmap.difficulty,
      duration: roadmap.duration,
      topics: roadmap.topics.length > 0 ? roadmap.topics : ['']
    });
    setEditingId(roadmap.id);
  };

  const toggleComplete = (id: string) => {
    setRoadmaps(prev => prev.map(roadmap =>
      roadmap.id === id ? { ...roadmap, completed: !roadmap.completed } : roadmap
    ));
  };

  const addTopic = () => {
    setFormData(prev => ({
      ...prev,
      topics: [...prev.topics, '']
    }));
  };

  const updateTopic = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      topics: prev.topics.map((topic, i) => i === index ? value : topic)
    }));
  };

  const removeTopic = (index: number) => {
    setFormData(prev => ({
      ...prev,
      topics: prev.topics.filter((_, i) => i !== index)
    }));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Roadmap Management</h2>
          <p className="text-gray-600">Create, edit, and track your learning roadmaps</p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Create Roadmap</span>
        </button>
      </div>

      {/* Create/Edit Form */}
      {(isCreating || editingId) && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-lg border border-blue-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">
              {editingId ? 'Edit Roadmap' : 'Create New Roadmap'}
            </h3>
            <button
              onClick={() => {
                setIsCreating(false);
                setEditingId(null);
                resetForm();
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Dynamic Programming Mastery"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 3 weeks"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Describe the learning objectives and outcomes..."
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
            <select
              value={formData.difficulty}
              onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value as 'Beginner' | 'Intermediate' | 'Advanced' }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Topics</label>
            {formData.topics.map((topic, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => updateTopic(index, e.target.value)}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter topic"
                />
                <button
                  onClick={() => removeTopic(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              onClick={addTopic}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              + Add Topic
            </button>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setIsCreating(false);
                setEditingId(null);
                resetForm();
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={editingId ? handleUpdate : handleCreate}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{editingId ? 'Update' : 'Create'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Roadmaps List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roadmaps.map((roadmap) => (
          <div key={roadmap.id} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{roadmap.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{roadmap.description}</p>
              </div>
              <button
                onClick={() => toggleComplete(roadmap.id)}
                className={`ml-2 ${roadmap.completed ? 'text-green-600' : 'text-gray-400'}`}
              >
                <CheckCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(roadmap.difficulty)}`}>
                {roadmap.difficulty}
              </span>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                {roadmap.duration}
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm font-medium text-gray-700 mb-2">Topics:</div>
              <div className="flex flex-wrap gap-1">
                {roadmap.topics.map((topic, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">
                Created {new Date(roadmap.createdAt).toLocaleDateString()}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => startEdit(roadmap)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(roadmap.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapCRUD;
