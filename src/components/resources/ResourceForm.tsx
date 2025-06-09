
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Resource {
  id: string;
  title: string;
  url: string;
  description: string;
  type: "Video" | "Article" | "Course" | "Book" | "Practice";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  topic: string;
  author?: string;
  dateAdded: string;
}

interface ResourceFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (resource: Omit<Resource, 'id' | 'dateAdded' | 'rating'>) => void;
  editingResource?: Resource | null;
  currentTopic: string;
}

const ResourceForm = ({ isOpen, onClose, onSubmit, editingResource, currentTopic }: ResourceFormProps) => {
  const [formData, setFormData] = useState({
    title: editingResource?.title || "",
    url: editingResource?.url || "",
    description: editingResource?.description || "",
    type: editingResource?.type || "Article" as const,
    difficulty: editingResource?.difficulty || "Beginner" as const,
    topic: editingResource?.topic || currentTopic,
    author: editingResource?.author || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: "",
      url: "",
      description: "",
      type: "Article",
      difficulty: "Beginner",
      topic: currentTopic,
      author: "",
    });
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {editingResource ? "Edit Resource" : "Add New Resource"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Resource title"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              type="url"
              value={formData.url}
              onChange={(e) => handleChange("url", e.target.value)}
              placeholder="https://..."
              required
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Brief description of the resource"
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="author">Author (Optional)</Label>
            <Input
              id="author"
              value={formData.author}
              onChange={(e) => handleChange("author", e.target.value)}
              placeholder="Author name"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">Type</Label>
              <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Video">Video</SelectItem>
                  <SelectItem value="Article">Article</SelectItem>
                  <SelectItem value="Course">Course</SelectItem>
                  <SelectItem value="Book">Book</SelectItem>
                  <SelectItem value="Practice">Practice</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select value={formData.difficulty} onValueChange={(value) => handleChange("difficulty", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {editingResource ? "Update" : "Add"} Resource
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ResourceForm;
