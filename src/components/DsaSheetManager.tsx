'use client';

import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { ISheet } from "@/types";
import { Plus, BookOpen, Sparkles, Trash2, FileSpreadsheet, CheckCircle2 } from "lucide-react";
import { prewrittenDsaSheets } from "@/data/prewritten-dsa-sheets";

export function DsaSheetManager() {
  const [sheets, setSheets] = useState<ISheet[]>([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [problems, setProblems] = useState("");

  const fetchSheets = async () => {
    setLoading(true);
    try {
      const data = await api.get<ISheet[]>('/api/sheets');
      if (Array.isArray(data)) {
        setSheets(data);
      }
    } catch (err) {
      console.warn("Using offline sheet storage:", err);
      const local = localStorage.getItem('algospark_custom_sheets');
      if (local) setSheets(JSON.parse(local));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSheets();
  }, []);

  const handleCreateSheet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      toast.error("Title and description are required.");
      return;
    }

    try {
      const newSheet = await api.post<ISheet>('/api/sheets', {
        title,
        description,
        problems,
      });

      setSheets((prev) => [newSheet, ...prev]);
      setTitle("");
      setDescription("");
      setProblems("");
      toast.success("DSA Sheet created successfully!");
    } catch (err) {
      // Fallback local creation
      const localSheet: ISheet = {
        _id: Date.now().toString(),
        user: "guest",
        title,
        description,
        problems,
      };
      const updated = [localSheet, ...sheets];
      setSheets(updated);
      localStorage.setItem('algospark_custom_sheets', JSON.stringify(updated));
      setTitle("");
      setDescription("");
      setProblems("");
      toast.success("Sheet saved locally.");
    }
  };

  const handleDeleteSheet = async (id: string) => {
    try {
      await api.delete(`/api/sheets/${id}`);
      setSheets((prev) => prev.filter((s) => s._id !== id));
      toast.success("Sheet deleted");
    } catch (err) {
      const updated = sheets.filter((s) => s._id !== id);
      setSheets(updated);
      localStorage.setItem('algospark_custom_sheets', JSON.stringify(updated));
      toast.success("Sheet deleted");
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Title Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-semibold">
          <FileSpreadsheet className="w-3.5 h-3.5 text-violet-400" />
          <span>CURATED SDE PROBLEM TEMPLATES</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          DSA Problem Sheet Manager
        </h1>
        <p className="text-xs text-[#B8B1CC] max-w-2xl mx-auto">
          Manage custom problem lists or track Striver 75, Blind 75, and NeetCode 150 templates.
        </p>
      </div>

      <Tabs defaultValue="custom" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto bg-[#0E0A1F] border border-violet-500/20 rounded-xl p-1">
          <TabsTrigger value="custom" className="data-[state=active]:bg-violet-600 data-[state=active]:text-white text-xs font-bold rounded-lg transition-colors">
            My Custom Sheets
          </TabsTrigger>
          <TabsTrigger value="prewritten" className="data-[state=active]:bg-violet-600 data-[state=active]:text-white text-xs font-bold rounded-lg transition-colors">
            Curated SDE Sheets
          </TabsTrigger>
        </TabsList>

        {/* Custom Sheets Tab */}
        <TabsContent value="custom" className="space-y-6 pt-4">
          <div className="glass-panel p-6 rounded-2xl border border-violet-500/20 shadow-2xl space-y-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-violet-400" />
              Create Custom Sheet
            </h3>

            <form onSubmit={handleCreateSheet} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-[#B8B1CC] font-semibold">Sheet Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Striver Graph Questions"
                  className="w-full h-9 px-3 rounded-xl bg-[#05030D] border border-violet-500/30 text-white focus:ring-1 focus:ring-violet-500 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#B8B1CC] font-semibold">Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Targeting BFS/DFS patterns for FAANG interviews"
                  className="w-full h-9 px-3 rounded-xl bg-[#05030D] border border-violet-500/30 text-white focus:ring-1 focus:ring-violet-500 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#B8B1CC] font-semibold">Problems (One per line)</label>
                <textarea
                  value={problems}
                  onChange={(e) => setProblems(e.target.value)}
                  placeholder="1. Number of Islands&#10;2. Course Schedule&#10;3. Rotting Oranges"
                  className="w-full h-28 p-3 rounded-xl bg-[#05030D] border border-violet-500/30 font-mono text-white focus:ring-1 focus:ring-violet-500 outline-none resize-none"
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold text-xs h-9 px-4 rounded-xl shadow-[0_0_12px_rgba(139,92,246,0.3)] gap-1">
                  <Plus className="w-4 h-4" />
                  <span>Save Sheet</span>
                </Button>
              </div>
            </form>
          </div>

          {/* Custom Sheet Cards List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sheets.map((sheet) => (
              <div key={sheet._id} className="glass-panel p-5 rounded-2xl border border-violet-500/20 hover:border-violet-500/40 transition-colors space-y-3 shadow-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-white">{sheet.title}</h4>
                    <p className="text-xs text-[#B8B1CC]">{sheet.description}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteSheet(sheet._id)}
                    className="text-[#77708D] hover:text-red-400 p-1 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="bg-[#05030D] p-3 rounded-xl border border-violet-500/20 font-mono text-[11px] text-violet-300/90 max-h-28 overflow-y-auto whitespace-pre-wrap">
                  {sheet.problems}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Curated SDE Sheets Tab */}
        <TabsContent value="prewritten" className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {prewrittenDsaSheets.map((curated, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-2xl border border-violet-500/20 hover:border-violet-500/40 transition-all space-y-4 shadow-xl">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-violet-400" />
                <h3 className="font-bold text-base text-white">{curated.title}</h3>
              </div>
              <p className="text-xs text-[#B8B1CC] leading-relaxed">{curated.description}</p>
              <div className="bg-[#05030D] p-3 rounded-xl border border-violet-500/20 font-mono text-[11px] text-violet-300 max-h-32 overflow-y-auto whitespace-pre-wrap">
                {curated.problems}
              </div>
              {curated.url && (
                <a
                  href={curated.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs text-violet-300 font-semibold hover:underline"
                >
                  <BookOpen className="w-4 h-4 text-violet-400" />
                  <span>Open Resource Guide</span>
                </a>
              )}
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
export default DsaSheetManager;
