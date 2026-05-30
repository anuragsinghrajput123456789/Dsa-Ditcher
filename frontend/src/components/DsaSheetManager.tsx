import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import CustomSheetList from "./dsa-sheet/CustomSheetList";
import PrewrittenSheetList from "./dsa-sheet/PrewrittenSheetList";
import DsaSheetForm from "./dsa-sheet/DsaSheetForm";
import SheetRoadmapViewer from "./dsa-sheet/SheetRoadmapViewer";
import { PrewrittenDsaSheet } from "@/data/prewritten-dsa-sheets";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { API_BASE_URL } from "@/config";
import { Plus, Upload, BookOpen, Sparkles, Trash2, Edit2, Share2, Award } from "lucide-react";

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

  // Practice sheet natively as interactive roadmap
  const [selectedSheetForRoadmap, setSelectedSheetForRoadmap] = useState<DsaSheet | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    document.title = "DSA Practice Sheets - Custom & Curated Checklists | AlgoSpark";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Create, customize, import, and export curated Data Structures & Algorithms sheets. Track solved problems, study popular templates like Blind 75 and NeetCode 150, and ace your coding interviews on AlgoSpark.");
    }

    const fetchSheets = async () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const { token } = JSON.parse(storedUser);
        try {
          const res = await fetch(`${API_BASE_URL}/api/sheets`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
            const data = await res.json();
            const mappedData = data.map((item: any) => ({ ...item, id: item._id }));
            setSheets(mappedData);
          } else {
             console.error("Failed to fetch sheets");
          }
        } catch (error) {
          console.error("Error fetching sheets:", error);
          toast({ title: "Error", description: "Could not sync with backend.", variant: "destructive" });
        }
      } else {
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
      if (token) {
        try {
          const res = await fetch(`${API_BASE_URL}/api/sheets/${editingSheet.id}`, {
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
          const updatedSheets = sheets.map(s => s.id === editingSheet.id ? { ...editingSheet, ...formData } : s);
          setSheets(updatedSheets);
          localStorage.setItem("dsa-sheets", JSON.stringify(updatedSheets));
          toast({ title: "Success", description: "Sheet updated locally." });
      }
    } else {
      if (token) {
        try {
          const res = await fetch(`${API_BASE_URL}/api/sheets`, {
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

  const handleDeleteSheet = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this sheet?")) {
      const storedUser = localStorage.getItem("user");
      let token = null;
      if (storedUser) {
         token = JSON.parse(storedUser).token;
      }

      if (token) {
        try {
          const res = await fetch(`${API_BASE_URL}/api/sheets/${id}`, {
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

  const handleExportSheet = (sheet: DsaSheet, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(JSON.stringify(sheet, null, 2));
    toast({
      title: "Copied to clipboard",
      description: "Sheet data has been copied to clipboard.",
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
        setSheets((sheets) => {
          const updated = [newSheet, ...sheets];
          localStorage.setItem("dsa-sheets", JSON.stringify(updated));
          return updated;
        });
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

  const handlePracticeSheet = (sheet: DsaSheet) => {
    setSelectedSheetForRoadmap(sheet);
  };

  // Animations variants matching dashboard
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  if (selectedSheetForRoadmap) {
    return (
      <motion.div 
        className="container mx-auto p-4 sm:p-6"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <SheetRoadmapViewer 
          sheet={selectedSheetForRoadmap} 
          onBack={() => setSelectedSheetForRoadmap(null)} 
        />
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="container mx-auto p-4 sm:p-6 space-y-8 max-w-6xl"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Welcome Banner */}
      <motion.div 
        variants={itemVariants}
        className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-950 dark:via-purple-900 dark:to-pink-900/60 rounded-3xl p-6 sm:p-8 md:p-10 text-white shadow-2xl border border-white/10 dark:border-white/5"
      >
        <div className="absolute inset-0 bg-white/10 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold tracking-wider text-pink-200 uppercase mb-4 backdrop-blur-md border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
              SDE Practice Suites
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 tracking-tight bg-gradient-to-r from-white via-blue-100 to-pink-100 bg-clip-text text-transparent">
              DSA Practice Sheets 📝
            </h1>
            <p className="text-blue-100 text-sm sm:text-base md:text-lg max-w-xl font-medium leading-relaxed">
              Build custom problem checklists, import external JSON templates, and evaluate popular pre-written tracks natively as interactive roadmaps.
            </p>
          </div>
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="my-sheets" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-muted/65 p-1 rounded-xl">
            <TabsTrigger value="my-sheets" className="data-[state=active]:bg-background rounded-lg font-bold text-sm sm:text-base">
              My Custom Sheets
            </TabsTrigger>
            <TabsTrigger value="popular-sheets" className="data-[state=active]:bg-background rounded-lg font-bold text-sm sm:text-base">
              Curated Sheets
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="my-sheets" className="mt-6 space-y-6">
            <CustomSheetList
              sheets={sheets}
              onEdit={(sheet) => handleOpenForm(sheet)}
              onDelete={(id) => {}} 
              onExport={(sheet) => {}} 
              onOpenForm={() => handleOpenForm(null)}
              isImporting={isImporting}
              onSetIsImporting={setIsImporting}
            />
            
            {isImporting && (
              <div className="space-y-4 p-6 border border-border/40 rounded-2xl mb-6 bg-card shadow-xl animate-fade-in">
                <Label htmlFor="import-area" className="font-bold text-foreground text-sm uppercase tracking-wider text-muted-foreground">Paste Sheet JSON metadata</Label>
                <Textarea
                  id="import-area"
                  value={sheetToImport}
                  onChange={(e) => setSheetToImport(e.target.value)}
                  placeholder='{ "title": "My Custom Blind 75", "description": "Important questions", "problems": "Arrays:\n1. Two Sum..." }'
                  rows={5}
                  className="bg-background border-input focus:ring-2 focus:ring-primary rounded-xl font-semibold text-sm leading-relaxed p-4"
                />
                <div className="flex gap-2">
                  <Button onClick={handleImportSheet} className="bg-primary hover:bg-primary/95 text-white font-bold rounded-xl shadow-md">
                    Import Sheet
                  </Button>
                  <Button
                    onClick={() => setIsImporting(false)}
                    variant="ghost"
                    className="rounded-xl border hover:bg-muted/50"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
            
            <motion.div 
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {sheets.map((sheet) => (
                <motion.div
                  key={sheet.id}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Card
                    onClick={() => handlePracticeSheet(sheet)}
                    className="glass-card hover:shadow-xl transition-all duration-300 cursor-pointer border hover:border-primary/30 flex flex-col justify-between h-full group p-6"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-4 mb-3">
                        <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                          {sheet.title}
                        </h2>
                        <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenForm(sheet);
                            }}
                            className="p-2 h-8 w-8 text-indigo-500 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-950/20"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => handleDeleteSheet(sheet.id, e)}
                            className="p-2 h-8 w-8 text-red-500 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-6 line-clamp-2">
                        {sheet.description}
                      </p>
                    </div>
                    
                    <div className="border-t border-border/40 pt-4 flex gap-2.5 mt-auto">
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold rounded-xl shadow-md"
                      >
                        <Sparkles className="mr-1.5 h-3.5 w-3.5 text-yellow-300 animate-pulse" />
                        Practice Roadmap
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => handleExportSheet(sheet, e)}
                        className="border-border rounded-xl font-semibold p-2 h-9"
                        title="Export Sheet JSON"
                      >
                        <Share2 className="h-4.5 w-4.5 text-muted-foreground" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
              
              {sheets.length === 0 && !isImporting && (
                <div className="col-span-full text-center py-12 glass-card rounded-2xl border border-border/50 max-w-xl mx-auto space-y-4 shadow-xl">
                  <Award className="w-12 h-12 text-primary mx-auto opacity-75 animate-bounce" />
                  <div>
                    <p className="font-black text-foreground text-lg">No Custom Sheets Yet</p>
                    <p className="text-muted-foreground text-sm max-w-xs mx-auto mt-1 leading-relaxed font-semibold">
                      Create your first bespoke practice lists or navigate to the "Curated Sheets" tab to start practicing instantly.
                    </p>
                  </div>
                  <Button onClick={() => handleOpenForm(null)} className="bg-primary hover:bg-primary/95 font-bold rounded-xl mt-2 px-6">
                    Create First Sheet
                  </Button>
                </div>
              )}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="popular-sheets" className="mt-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Curated Sheets</h2>
                <p className="text-muted-foreground">
                  Master SDE templates, Blind 75, NeetCode 150, and popular interview trackers.
                </p>
              </div>
            </div>
            <PrewrittenSheetList 
              onAddPrewritten={() => {}} 
              onPracticeSheet={handlePracticeSheet}
            />
          </TabsContent>
        </Tabs>
      </motion.div>
      
      <Sheet open={isFormOpen} onOpenChange={setIsFormOpen}>
        <SheetContent className="bg-card w-full sm:max-w-md border-l border-border/55">
          <SheetHeader className="border-b border-border/45 pb-4 mb-6">
            <SheetTitle className="text-card-foreground text-2xl font-extrabold tracking-tight">
              {editingSheet ? "Edit Sheet Details" : "Create New Sheet"}
            </SheetTitle>
            <SheetDescription className="font-semibold">
              {editingSheet
                ? "Update the details and problem lists of your custom SDE sheet."
                : "Fill in the metadata to create your personal DSA practice checklist."}
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
    </motion.div>
  );
};

export default DsaSheetManager;
