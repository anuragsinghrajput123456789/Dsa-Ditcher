
import { useState } from "react";
import { ExternalLink, Edit2, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

interface ResourceCardProps {
  resource: Resource;
  onEdit: (resource: Resource) => void;
  onDelete: (id: string) => void;
  onRate: (id: string, rating: number) => void;
}

const ResourceCard = ({ resource, onEdit, onDelete, onRate }: ResourceCardProps) => {
  const [userRating, setUserRating] = useState(0);

  const handleRating = (rating: number) => {
    setUserRating(rating);
    onRate(resource.id, rating);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Intermediate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Advanced": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Video": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Article": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "Course": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "Book": return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200";
      case "Practice": return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
          <div className="flex space-x-1 ml-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(resource)}
              className="h-8 w-8 p-0"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(resource.id)}
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge className={getDifficultyColor(resource.difficulty)}>
            {resource.difficulty}
          </Badge>
          <Badge className={getTypeColor(resource.type)}>
            {resource.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {resource.description}
        </p>
        
        {resource.author && (
          <p className="text-xs text-muted-foreground mb-2">
            By {resource.author}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRating(star)}
                className="focus:outline-none"
              >
                <Star
                  className={`h-4 w-4 ${
                    star <= (userRating || resource.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
            <span className="text-xs text-muted-foreground ml-1">
              ({resource.rating.toFixed(1)})
            </span>
          </div>
          
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Open <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceCard;
