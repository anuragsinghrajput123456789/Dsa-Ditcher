import React, { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import CustomSheetList from "./dsa-sheet/CustomSheetList";
import PrewrittenSheetList from "./dsa-sheet/PrewrittenSheetList";
import DsaSheetForm from "./dsa-sheet/DsaSheetForm";
import { PrewrittenDsaSheet } from "@/data/prewritten-dsa-sheets";
import { Button } from "@/components/ui/button";

type DsaSheet = {
  id: string;
  title: string;
  description: string;
  problems: string;
};

const DsaSheetManager = () => {
  const [sheets, setSheets] = useState<DsaSheet[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSheet, setEditingSheet] = useState<DsaSheet | null>(null);

  const [sheetToImport, setSheetToImport] = useState("");
  const [isImporting, setIsImporting] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    const fetchSheets = async () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const { token } = JSON.parse(storedUser);
        try {
          const res = await fetch("http://localhost:5000/api/sheets", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
            const data = await res.json();
            // Map _id to id for frontend compatibility
            const mappedData = data.map((item: any) => ({ ...item, id: item._id }));
            setSheets(mappedData);
          } else {
             // Fallback or error handling
             console.error("Failed to fetch sheets");
          }
        } catch (error) {
          console.error("Error fetching sheets:", error);
          toast({ title: "Error", description: "Could not sync with backend.", variant: "destructive" });
        }
      } else {
        // Fallback to local storage if not logged in
        try {
          const savedSheets = localStorage.getItem("dsa-sheets");
          if (savedSheets) {
            setSheets(JSON.parse(savedSheets));
          }
        } catch (error) {
          console.error("Failed to load sheets from localStorage", error);
        }
      }
    };
    fetchSheets();
  }, [toast]);

  // Sync to local storage only if NOT logged in (or optional: keep local backup?)
  // For now, removing the auto-save to localStorage effect to avoid conflicts if we want backend-first source of truth.
  // Instead, we will handle persistence in the save/delete functions directly.

  const handleOpenForm = (sheet: DsaSheet | null) => {
    setEditingSheet(sheet);
    setIsFormOpen(true);
  };

  const handleSaveSheet = async (formData: Omit<DsaSheet, "id">) => {
    const storedUser = localStorage.getItem("user");
    let token = null;
    if (storedUser) {
       token = JSON.parse(storedUser).token;
    }

    if (editingSheet) {
      // Update logic
      if (token) {
        try {
          const res = await fetch(`http://localhost:5000/api/sheets/${editingSheet.id}`, {
            method: "PUT",
            headers: { 
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}` 
            },
            body: JSON.stringify(formData),
          });
          if (res.ok) {
            const updatedSheet = await res.json();
             setSheets((sheets) =>
              sheets.map((s) =>
                s.id === editingSheet.id ? { ...updatedSheet, id: updatedSheet._id } : s
              )
            );
            toast({ title: "Success", description: "Sheet updated in backend." });
          } else {
             throw new Error("Failed to update");
          }
        } catch (err) {
           toast({ title: "Error", description: "Failed to save to backend.", variant: "destructive" });
        }
      } else {
         // Local update
          setSheets((sheets) =>
            sheets.map((s) =>
              s.id === editingSheet.id ? { ...editingSheet, ...formData } : s
            )
          );
          // Manually update local storage since we removed the effect
          const updatedSheets = sheets.map(s => s.id === editingSheet.id ? { ...editingSheet, ...formData } : s);
          localStorage.setItem("dsa-sheets", JSON.stringify(updatedSheets));
          toast({ title: "Success", description: "Sheet updated locally." });
      }
    } else {
      // Create logic
      if (token) {
        try {
          const res = await fetch("http://localhost:5000/api/sheets", {
             method: "POST",
             headers: { 
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}` 
             },
             body: JSON.stringify(formData),
          });
          if (res.ok) {
             const newSheet = await res.json();
             setSheets((sheets) => [{ ...newSheet, id: newSheet._id }, ...sheets]);
             toast({ title: "Success", description: "Sheet created in backend." });
          } else {
             throw new Error("Failed to create");
          }
        } catch (err) {
           toast({ title: "Error", description: "Failed to save to backend.", variant: "destructive" });
        }
      } else {
        // Local create
        const newSheet: DsaSheet = {
          ...formData,
          id: Date.now().toString(),
        };
        setSheets((sheets) => {
           const updated = [newSheet, ...sheets];
           localStorage.setItem("dsa-sheets", JSON.stringify(updated));
           return updated;
        });
        toast({ title: "Success", description: "Sheet created locally." });
      }
    }
    setIsFormOpen(false);
    setEditingSheet(null);
  };

  const handleDeleteSheet = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this sheet?")) {
      const storedUser = localStorage.getItem("user");
      let token = null;
      if (storedUser) {
         token = JSON.parse(storedUser).token;
      }

      if (token) {
        try {
          const res = await fetch(`http://localhost:5000/api/sheets/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
             setSheets((sheets) => sheets.filter((s) => s.id !== id));
             toast({ title: "Success", description: "Sheet deleted from backend." });
          } else {
             toast({ title: "Error", description: "Failed to delete from backend.", variant: "destructive" });
          }
        } catch (err) {
            toast({ title: "Error", description: "Failed to delete from backend.", variant: "destructive" });
        }
      } else {
        setSheets((sheets) => {
           const updated = sheets.filter((s) => s.id !== id);
           localStorage.setItem("dsa-sheets", JSON.stringify(updated));
           return updated;
        });
        toast({ title: "Success", description: "Sheet deleted locally." });
      }
    }
  };

  const handleExportSheet = (sheet: DsaSheet) => {
    navigator.clipboard.writeText(JSON.stringify(sheet, null, 2));
    toast({
      title: "Copied to clipboard",
      description: "Sheet data has been copied.",
    });
  };

  const handleImportSheet = () => {
    try {
      const parsedSheet = JSON.parse(sheetToImport);
      if (
        parsedSheet.title &&
        parsedSheet.description &&
        typeof parsedSheet.problems !== "undefined"
      ) {
        const newSheet = {
          ...parsedSheet,
          id: Date.now().toString(),
        };
        setSheets((sheets) => [newSheet, ...sheets]);
        toast({
          title: "Success",
          description: "Sheet imported successfully.",
        });
        setSheetToImport("");
        setIsImporting(false);
      } else {
        throw new Error("Invalid sheet format.");
      }
    } catch (error) {
      toast({
        title: "Import failed",
        description: "Invalid JSON or sheet format.",
        variant: "destructive",
      });
    }
  };

  // Dummy function for compatibility - not used anymore
  const handleAddPrewrittenSheet = (sheetData: PrewrittenDsaSheet) => {
    // This function is no longer used since we redirect to external URLs
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">DSA Sheets</h1>
          <p className="text-muted-foreground">
            Create, manage, and explore DSA practice sheets.
          </p>
        </div>
      </div>
      <Tabs defaultValue="my-sheets" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-muted">
          <TabsTrigger value="my-sheets" className="data-[state=active]:bg-background">My Sheets</TabsTrigger>
          <TabsTrigger value="popular-sheets" className="data-[state=active]:bg-background">Popular Sheets</TabsTrigger>
        </TabsList>
        <TabsContent value="my-sheets" className="mt-6">
          <CustomSheetList
            sheets={sheets}
            onEdit={(sheet) => handleOpenForm(sheet)}
            onDelete={handleDeleteSheet}
            onExport={handleExportSheet}
            onOpenForm={() => handleOpenForm(null)}
            isImporting={isImporting}
            onSetIsImporting={setIsImporting}
          />
          {isImporting && (
            <div className="space-y-4 p-4 border rounded-lg mb-6 bg-card">
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
                <Button
                  onClick={() => setIsImporting(false)}
                  variant="ghost"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sheets.map((sheet) => (
              <div
                key={sheet.id}
                className="border rounded-lg p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow bg-card"
              >
                <div>
                  <h2 className="text-xl font-semibold mb-2 text-card-foreground">{sheet.title}</h2>
                  <p className="text-muted-foreground text-sm mb-4">
                    {sheet.description}
                  </p>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleOpenForm(sheet)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeleteSheet(sheet.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleExportSheet(sheet)}
                  >
                    Export
                  </Button>
                </div>
              </div>
            ))}
            {sheets.length === 0 && !isImporting && (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">
                  No sheets yet. Create your first one or check out the
                  'Popular Sheets' tab!
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="popular-sheets" className="mt-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold">Popular Sheets</h2>
              <p className="text-muted-foreground">
                Well-known DSA sheets from the community to kickstart your
                practice.
              </p>
            </div>
          </div>
          <PrewrittenSheetList onAddPrewritten={handleAddPrewrittenSheet} />
        </TabsContent>
      </Tabs>
      <Sheet open={isFormOpen} onOpenChange={setIsFormOpen}>
        <SheetContent className="bg-card">
          <SheetHeader>
            <SheetTitle className="text-card-foreground">
              {editingSheet ? "Edit Sheet" : "Create New Sheet"}
            </SheetTitle>
            <SheetDescription>
              {editingSheet
                ? "Update the details of your sheet."
                : "Fill in the details for your new DSA sheet."}
            </SheetDescription>
          </SheetHeader>
          <DsaSheetForm
            onSubmit={handleSaveSheet}
            initialData={
              editingSheet
                ? {
                    title: editingSheet.title,
                    description: editingSheet.description,
                    problems: editingSheet.problems,
                  }
                : null
            }
            onClose={() => setIsFormOpen(false)}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default DsaSheetManager;
