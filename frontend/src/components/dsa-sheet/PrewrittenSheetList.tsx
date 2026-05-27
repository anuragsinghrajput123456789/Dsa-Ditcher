import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Sparkles } from "lucide-react";
import { prewrittenDsaSheets } from "@/data/prewritten-dsa-sheets";

interface PrewrittenSheetListProps {
  onAddPrewritten: (sheet: any) => void;
  onPracticeSheet?: (sheet: { id: string; title: string; description: string; problems: string }) => void;
}

const PrewrittenSheetList: React.FC<PrewrittenSheetListProps> = ({
  onAddPrewritten,
  onPracticeSheet,
}) => {
  const handleOpenSheet = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
      {prewrittenDsaSheets.map((sheet, index) => (
        <div
          key={index}
          className="group border border-border rounded-2xl p-6 flex flex-col justify-between shadow-lg hover:shadow-xl hover:border-primary/45 transition-all duration-300 bg-card/65"
        >
          <div>
            <h2 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
              {sheet.title}
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-4">
              {sheet.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5 mt-4">
            {onPracticeSheet && (
              <Button 
                size="sm" 
                onClick={() => onPracticeSheet({
                  id: `prewritten-${index}-${sheet.title.replace(/\s+/g, '-').toLowerCase()}`,
                  title: sheet.title,
                  description: sheet.description,
                  problems: sheet.problems
                })}
                className="flex items-center gap-1.5 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl"
              >
                <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
                Practice Roadmap
              </Button>
            )}
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleOpenSheet(sheet.url || '#')}
              className="flex items-center gap-1.5 border-border rounded-xl font-semibold"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Source Website
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PrewrittenSheetList;
