
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, ClipboardCopy, Upload, Plus } from "lucide-react";

type DsaSheet = {
  id: string;
  title: string;
  description: string;
  problems: string;
};

interface CustomSheetListProps {
  sheets: DsaSheet[];
  onEdit: (sheet: DsaSheet) => void;
  onDelete: (id: string) => void;
  onExport: (sheet: DsaSheet) => void;
  onOpenForm: () => void;
  isImporting: boolean;
  onSetIsImporting: (v: boolean) => void;
}

export default function CustomSheetList({
  sheets,
  onEdit,
  onDelete,
  onExport,
  onOpenForm,
  isImporting,
  onSetIsImporting,
}: CustomSheetListProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h2 className="text-2xl font-bold">My Custom Sheets</h2>
        <p className="text-muted-foreground">
          Your personal collection of DSA sheets.
        </p>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={() => onSetIsImporting(!isImporting)}
          variant="outline"
        >
          <Upload className="mr-2 h-4 w-4" /> Import
        </Button>
        <Button onClick={onOpenForm}>
          <Plus className="mr-2 h-4 w-4" /> Create Sheet
        </Button>
      </div>
    </div>
  );
}
