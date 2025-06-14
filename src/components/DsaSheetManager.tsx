
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Edit, Trash2, Download, Upload, ClipboardCopy } from 'lucide-react';

interface DsaSheet {
  id: string;
  title: string;
  description: string;
  problems: string; // Newline-separated list of problems
}

const DsaSheetManager = () => {
  const [sheets, setSheets] = useState<DsaSheet[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSheet, setEditingSheet] = useState<DsaSheet | null>(null);
  const [sheetToImport, setSheetToImport] = useState('');
  const [isImporting, setIsImporting] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    try {
      const savedSheets = localStorage.getItem('dsa-sheets');
      if (savedSheets) {
        setSheets(JSON.parse(savedSheets));
      }
    } catch (error) {
      console.error("Failed to load sheets from localStorage", error);
      toast({ title: "Error", description: "Could not load your DSA sheets.", variant: "destructive" });
    }
  }, [toast]);

  useEffect(() => {
    try {
      localStorage.setItem('dsa-sheets', JSON.stringify(sheets));
    } catch (error) {
      console.error("Failed to save sheets to localStorage", error);
      toast({ title: "Error", description: "Could not save your DSA sheets.", variant: "destructive" });
    }
  }, [sheets, toast]);
  
  const handleOpenForm = (sheet: DsaSheet | null) => {
    setEditingSheet(sheet);
    setIsFormOpen(true);
  };

  const handleSaveSheet = (formData: Omit<DsaSheet, 'id'>) => {
    if (editingSheet) {
      setSheets(sheets.map(s => s.id === editingSheet.id ? { ...editingSheet, ...formData } : s));
      toast({ title: "Success", description: "Sheet updated successfully." });
    } else {
      const newSheet: DsaSheet = { ...formData, id: Date.now().toString() };
      setSheets([newSheet, ...sheets]);
      toast({ title: "Success", description: "Sheet created successfully." });
    }
    setIsFormOpen(false);
    setEditingSheet(null);
  };
  
  const handleDeleteSheet = (id: string) => {
    if (window.confirm("Are you sure you want to delete this sheet?")) {
      setSheets(sheets.filter(s => s.id !== id));
      toast({ title: "Success", description: "Sheet deleted." });
    }
  };

  const handleExportSheet = (sheet: DsaSheet) => {
    navigator.clipboard.writeText(JSON.stringify(sheet, null, 2));
    toast({ title: "Copied to clipboard", description: "Sheet data has been copied." });
  };

  const handleImportSheet = () => {
    try {
      const parsedSheet = JSON.parse(sheetToImport);
      // Basic validation
      if (parsedSheet.title && parsedSheet.description && typeof parsedSheet.problems !== 'undefined') {
        const newSheet = { ...parsedSheet, id: Date.now().toString() };
        setSheets([newSheet, ...sheets]);
        toast({ title: "Success", description: "Sheet imported successfully." });
        setSheetToImport('');
        setIsImporting(false);
      } else {
        throw new Error("Invalid sheet format.");
      }
    } catch (error) {
      toast({ title: "Import failed", description: "Invalid JSON or sheet format.", variant: "destructive" });
    }
  };
  
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">My DSA Sheets</h1>
          <p className="text-muted-foreground">Create and manage your personalized DSA practice sheets.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setIsImporting(s => !s)} variant="outline"><Upload className="mr-2 h-4 w-4" /> Import</Button>
          <Button onClick={() => handleOpenForm(null)}><Plus className="mr-2 h-4 w-4" /> Create Sheet</Button>
        </div>
      </div>
      
      {isImporting && (
        <div className="space-y-4 p-4 border rounded-lg">
          <Label htmlFor="import-area">Paste sheet JSON here</Label>
          <Textarea 
            id="import-area"
            value={sheetToImport}
            onChange={(e) => setSheetToImport(e.target.value)}
            placeholder='{ "title": "My Sheet", ... }'
            rows={5}
          />
          <div className="flex gap-2">
            <Button onClick={handleImportSheet}>Import Sheet</Button>
            <Button onClick={() => setIsImporting(false)} variant="ghost">Cancel</Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sheets.map(sheet => (
          <div key={sheet.id} className="border rounded-lg p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div>
              <h2 className="text-xl font-semibold mb-2">{sheet.title}</h2>
              <p className="text-muted-foreground text-sm mb-4">{sheet.description}</p>
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline" onClick={() => handleOpenForm(sheet)}><Edit className="h-3 w-3 mr-1" /> Edit</Button>
              <Button size="sm" variant="destructive" onClick={() => handleDeleteSheet(sheet.id)}><Trash2 className="h-3 w-3 mr-1" /> Delete</Button>
              <Button size="sm" variant="secondary" onClick={() => handleExportSheet(sheet)}><ClipboardCopy className="h-3 w-3 mr-1" /> Export</Button>
            </div>
          </div>
        ))}
         {sheets.length === 0 && !isImporting && (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No sheets yet. Create your first one!</p>
          </div>
        )}
      </div>

      <Sheet open={isFormOpen} onOpenChange={setIsFormOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{editingSheet ? 'Edit Sheet' : 'Create New Sheet'}</SheetTitle>
            <SheetDescription>
              {editingSheet ? 'Update the details of your sheet.' : 'Fill in the details for your new DSA sheet.'}
            </SheetDescription>
          </SheetHeader>
          <DsaSheetForm
            onSubmit={handleSaveSheet}
            initialData={editingSheet}
            onClose={() => setIsFormOpen(false)}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};

interface DsaSheetFormProps {
  onSubmit: (data: Omit<DsaSheet, 'id'>) => void;
  initialData: DsaSheet | null;
  onClose: () => void;
}

const DsaSheetForm = ({ onSubmit, initialData, onClose }: DsaSheetFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    problems: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        problems: initialData.problems,
      });
    } else {
      setFormData({ title: '', description: '', problems: '' });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      alert("Title is required.");
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="title">Sheet Title</Label>
        <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" value={formData.description} onChange={handleChange} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="problems">Problems</Label>
        <Textarea id="problems" name="problems" value={formData.problems} onChange={handleChange} rows={10} placeholder="Add one problem link per line." />
      </div>
      <SheetFooter>
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit">Save Sheet</Button>
      </SheetFooter>
    </form>
  );
};

export default DsaSheetManager;
