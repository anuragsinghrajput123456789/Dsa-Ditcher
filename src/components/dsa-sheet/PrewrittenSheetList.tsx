
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { prewrittenDsaSheets, PrewrittenDsaSheet } from "@/data/prewritten-dsa-sheets";

interface PrewrittenSheetListProps {
  onAddPrewritten: (sheet: PrewrittenDsaSheet) => void;
}

const PrewrittenSheetList: React.FC<PrewrittenSheetListProps> = ({
  onAddPrewritten,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {prewrittenDsaSheets.map((sheet, index) => (
        <div
          key={index}
          className="border rounded-lg p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
        >
          <div>
            <h2 className="text-xl font-semibold mb-2">{sheet.title}</h2>
            <p className="text-muted-foreground text-sm mb-4">
              {sheet.description}
            </p>
          </div>
          <div className="flex gap-2 mt-4">
            <Button size="sm" onClick={() => onAddPrewritten(sheet)}>
              <Plus className="h-3 w-3 mr-1" /> Add to My Sheets
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PrewrittenSheetList;
