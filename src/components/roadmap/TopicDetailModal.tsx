'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, BookOpen, Code, CheckCircle, Circle, PlayCircle } from "lucide-react";
import { topicDataMap, getDefaultTopicData } from "@/data/topicData";

interface TopicDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  topicId: string | null;
  topicTitle: string;
  isCompleted: boolean;
  onToggleComplete: (topicId: string) => void;
}

export default function TopicDetailModal({
  isOpen,
  onClose,
  topicId,
  topicTitle,
  isCompleted,
  onToggleComplete
}: TopicDetailModalProps) {
  if (!topicId) return null;

  const topicData = topicDataMap[topicId] || getDefaultTopicData(topicId, topicTitle);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "medium": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "hard": return "bg-rose-500/20 text-rose-400 border-rose-500/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "video": return <PlayCircle className="w-4 h-4 text-rose-400" />;
      case "article": return <BookOpen className="w-4 h-4 text-violet-400" />;
      case "practice": return <Code className="w-4 h-4 text-emerald-400" />;
      default: return <ExternalLink className="w-4 h-4 text-indigo-400" />;
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
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
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
          <div className="p-4 rounded-xl bg-muted/50 border border-border">
            <p className="text-sm text-muted-foreground leading-relaxed">{topicData.description}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-violet-400" />
              Learning Resources
            </h3>
            <div className="space-y-2">
              {topicData.resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-secondary/40 hover:bg-secondary/80 transition-colors border border-border/60 group text-xs"
                >
                  <div className="flex items-center gap-3">
                    {getResourceIcon(resource.type)}
                    <span className="text-foreground group-hover:text-violet-400 font-medium transition-colors">{resource.title}</span>
                  </div>
                  <Badge variant="outline" className="capitalize">{resource.type}</Badge>
                </a>
              ))}
            </div>
          </div>

          {topicData.practiceProblems && topicData.practiceProblems.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Code className="w-4 h-4 text-emerald-400" />
                Practice Problems
              </h3>
              <div className="space-y-2">
                {topicData.practiceProblems.map((problem, index) => (
                  <a
                    key={index}
                    href={problem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-secondary/40 hover:bg-secondary/80 transition-colors border border-border/60 group text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="font-medium text-foreground group-hover:text-emerald-400 transition-colors">{problem.title}</span>
                      <span className="text-muted-foreground text-[10px]">({problem.platform})</span>
                    </div>
                    <Badge className={getDifficultyColor(problem.difficulty)}>{problem.difficulty}</Badge>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
