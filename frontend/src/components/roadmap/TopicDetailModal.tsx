import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, BookOpen, Code, CheckCircle, Circle, PlayCircle, Youtube } from "lucide-react";
import { topicDataMap, getDefaultTopicData } from "@/data/topicData";

interface TopicDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  topicId: string | null;
  topicTitle: string;
  isCompleted: boolean;
  onToggleComplete: (topicId: string) => void;
}

const TopicDetailModal = ({
  isOpen,
  onClose,
  topicId,
  topicTitle,
  isCompleted,
  onToggleComplete
}: TopicDetailModalProps) => {
  if (!topicId) return null;

  const topicData = topicDataMap[topicId] || getDefaultTopicData(topicId, topicTitle);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "hard": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "video": return <PlayCircle className="w-4 h-4" />;
      case "article": return <BookOpen className="w-4 h-4" />;
      case "practice": return <Code className="w-4 h-4" />;
      default: return <ExternalLink className="w-4 h-4" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-foreground">{topicData.title}</DialogTitle>
            <Button
              variant={isCompleted ? "default" : "outline"}
              size="sm"
              onClick={() => onToggleComplete(topicId)}
              className="gap-2"
            >
              {isCompleted ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Completed
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4" />
                  Mark Complete
                </>
              )}
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Description */}
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-muted-foreground">{topicData.description}</p>
          </div>

          {/* Learning Resources */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Learning Resources
            </h3>
            <div className="space-y-2">
              {topicData.resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors border border-border group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground">{getResourceIcon(resource.type)}</span>
                    <span className="text-foreground group-hover:text-primary transition-colors">{resource.title}</span>
                  </div>
                  <Badge variant="outline" className="capitalize">{resource.type}</Badge>
                </a>
              ))}
            </div>
          </div>

          {/* Practice Problems */}
          {topicData.practiceProblems.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <Code className="w-5 h-5 text-primary" />
                Practice Problems
              </h3>
              <div className="space-y-2">
                {topicData.practiceProblems.map((problem, index) => (
                  <a
                    key={index}
                    href={problem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors border border-border group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-foreground group-hover:text-primary transition-colors">{problem.title}</span>
                      <Badge variant="outline" className="text-xs">{problem.platform}</Badge>
                    </div>
                    <Badge className={`${getDifficultyColor(problem.difficulty)} capitalize border`}>
                      {problem.difficulty}
                    </Badge>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TopicDetailModal;
