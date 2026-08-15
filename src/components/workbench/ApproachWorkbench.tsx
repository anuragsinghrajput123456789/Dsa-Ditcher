'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useWorkbench } from '@/hooks/useWorkbench';
import { ProblemPanel } from './ProblemPanel';
import { ApproachEditor } from './ApproachEditor';
import { AlgorithmSteps } from './AlgorithmSteps';
import { PseudocodeEditor } from './PseudocodeEditor';
import { DiagramCanvas } from './DiagramCanvas';
import { AIDebugPanel } from './AIDebugPanel';
import { ComplexityPanel } from './ComplexityPanel';
import { CodeConversionPanel } from './CodeConversionPanel';
import { WorkbenchToolbar } from './WorkbenchToolbar';
import { Brain, Sparkles, PenTool, ListOrdered, Code2, Grid, Cpu, HelpCircle, Download, X } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '@/lib/api';

export function ApproachWorkbench() {
  const {
    data,
    updateData,
    saveStatus,
    activeTab,
    setActiveTab,
    isAiLoading,
    setIsAiLoading,
    handleUndo,
    handleRedo,
    handleManualSave,
    handleReset,
  } = useWorkbench();

  const [showShortcutsModal, setShowShortcutsModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // AI Review Request
  const handleRequestReview = async () => {
    setIsAiLoading(true);
    setActiveTab('ai');
    try {
      const openrouterKey = typeof window !== 'undefined' ? localStorage.getItem('openrouter_api_key') || '' : '';
      const res = await fetch('/api/workbench/ai/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-openrouter-key': openrouterKey,
        },
        body: JSON.stringify({
          problemTitle: data.problemTitle,
          problemDescription: data.problemDescription,
          approachText: data.approachText,
          algorithmSteps: data.algorithmSteps,
          pseudocode: data.pseudocode,
          diagramSummary: data.diagramData?.summary || '',
        }),
      });

      const json = await res.json();
      updateData({ aiReview: json });
      toast.success("AI Mentor review generated!");
    } catch (e) {
      toast.error("Failed to generate AI review.");
    } finally {
      setIsAiLoading(false);
    }
  };

  // Complexity Analysis Request
  const handleAnalyzeComplexity = async () => {
    setIsAiLoading(true);
    setActiveTab('complexity');
    try {
      const openrouterKey = typeof window !== 'undefined' ? localStorage.getItem('openrouter_api_key') || '' : '';
      const res = await fetch('/api/ai/complexity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-openrouter-key': openrouterKey,
        },
        body: JSON.stringify({
          code: data.pseudocode || data.approachText,
          language: 'pseudocode',
        }),
      });

      const json = await res.json();
      updateData({ complexityAnalysis: json });
      toast.success("Complexity bounds calculated!");
    } catch (e) {
      toast.error("Complexity calculation issue.");
    } finally {
      setIsAiLoading(false);
    }
  };

  // Code Generation Request
  const handleGenerateCode = async (targetLang: string) => {
    setIsAiLoading(true);
    setActiveTab('code');
    try {
      const openrouterKey = typeof window !== 'undefined' ? localStorage.getItem('openrouter_api_key') || '' : '';
      const res = await fetch('/api/workbench/ai/generate-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-openrouter-key': openrouterKey,
        },
        body: JSON.stringify({
          targetLanguage: targetLang,
          problemTitle: data.problemTitle,
          problemDescription: data.problemDescription,
          approachText: data.approachText,
          algorithmSteps: data.algorithmSteps,
          pseudocode: data.pseudocode,
        }),
      });

      const json = await res.json();
      updateData({ generatedCode: json });
      toast.success(`Generated implementation code in ${targetLang}!`);
    } catch (e) {
      toast.error("Failed to generate implementation code.");
    } finally {
      setIsAiLoading(false);
    }
  };

  // Global Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;
      if (isCmdOrCtrl && e.key.toLowerCase() === 's') {
        e.preventDefault();
        handleManualSave();
      } else if (isCmdOrCtrl && e.key.toLowerCase() === 'z' && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      } else if (isCmdOrCtrl && e.key.toLowerCase() === 'z' && e.shiftKey) {
        e.preventDefault();
        handleRedo();
      } else if (isCmdOrCtrl && e.key === 'Enter') {
        e.preventDefault();
        handleRequestReview();
      } else if (e.key === 'Escape') {
        setShowShortcutsModal(false);
        setShowExportModal(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleManualSave, handleUndo, handleRedo, handleRequestReview]);

  // Export Markdown File Download
  const handleExportMarkdown = () => {
    const stepsText = (data.algorithmSteps || []).map((s) => `### Step ${s.stepNumber}: ${s.title}\n${s.explanation}`).join('\n\n');
    const mdContent = `# ${data.problemTitle} - Solution Strategy

## 🎯 Problem Statement
${data.problemDescription}

---

## 🧠 Approach & Reasoning
${data.approachText}

---

## 📋 Algorithm Steps
${stepsText}

---

## 💻 Pseudocode
\`\`\`
${data.pseudocode}
\`\`\`

---

## ⏱️ Big-O Complexity
- Time: ${data.complexityAnalysis?.timeComplexity?.value || 'O(n)'}
- Space: ${data.complexityAnalysis?.spaceComplexity?.value || 'O(n)'}
`;

    const blob = new Blob([mdContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.problemTitle.replace(/\s+/g, '-').toLowerCase()}-workbench.md`;
    a.click();
    toast.success("Exported Workbench as Markdown!");
    setShowExportModal(false);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Title Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-semibold">
          <Brain className="w-3.5 h-3.5 text-violet-400" />
          <span>SDE THINKING & VISUALIZATION WORKBENCH</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Approach & Algorithm Workbench
        </h1>
        <p className="text-xs text-[#B8B1CC] max-w-2xl mx-auto">
          Deconstruct DSA problems, draft natural language strategies, structure steps, draw data structures on an interactive whiteboard, and get AI mentor feedback.
        </p>
      </div>

      {/* Top Workspace Navigation Tabs Bar */}
      <div className="glass-panel rounded-2xl p-2 border border-violet-500/20 shadow-xl flex items-center justify-between overflow-x-auto">
        <nav className="flex space-x-2">
          {[
            { id: 'approach', label: 'Approach', icon: PenTool },
            { id: 'algorithm', label: 'Algorithm', icon: ListOrdered },
            { id: 'pseudocode', label: 'Pseudocode', icon: Code2 },
            { id: 'diagram', label: 'Visualize Diagram', icon: Grid },
            { id: 'code', label: 'Convert to Code', icon: Code2 },
            { id: 'ai', label: 'AI Review', icon: Sparkles },
            { id: 'complexity', label: 'Complexity', icon: Cpu },
          ].map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-4 py-2 rounded-xl font-semibold text-xs transition-all flex items-center space-x-2 whitespace-nowrap ${
                  isActive
                    ? "bg-violet-600 text-white shadow-[0_0_12px_rgba(139,92,246,0.4)]"
                    : "text-[#B8B1CC] hover:text-white hover:bg-violet-500/10"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* 3-Panel Main Workbench Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[640px]">
        
        {/* Left Problem Panel */}
        <div className="lg:col-span-3 h-full">
          <ProblemPanel
            data={data}
            updateData={updateData}
            onStartThinking={() => setActiveTab('approach')}
          />
        </div>

        {/* Center Main Workbench Workspace */}
        <div className="lg:col-span-6 h-full">
          {activeTab === 'approach' && <ApproachEditor data={data} updateData={updateData} />}
          {activeTab === 'algorithm' && <AlgorithmSteps data={data} updateData={updateData} />}
          {activeTab === 'pseudocode' && <PseudocodeEditor data={data} updateData={updateData} />}
          {activeTab === 'diagram' && (
            <DiagramCanvas
              data={data}
              updateData={updateData}
              onReviewDiagram={() => handleRequestReview()}
            />
          )}
          {activeTab === 'code' && (
            <CodeConversionPanel
              generatedCode={data.generatedCode || null}
              isLoading={isAiLoading}
              onGenerateCode={handleGenerateCode}
            />
          )}
          {activeTab === 'ai' && (
            <AIDebugPanel
              aiReview={data.aiReview || null}
              isLoading={isAiLoading}
              onRequestReview={handleRequestReview}
            />
          )}
          {activeTab === 'complexity' && (
            <ComplexityPanel
              complexity={data.complexityAnalysis}
              isLoading={isAiLoading}
              onAnalyzeComplexity={handleAnalyzeComplexity}
            />
          )}
        </div>

        {/* Right AI & Insights Panel */}
        <div className="lg:col-span-3 h-full">
          <AIDebugPanel
            aiReview={data.aiReview || null}
            isLoading={isAiLoading}
            onRequestReview={handleRequestReview}
          />
        </div>

      </div>

      {/* Bottom Workbench Action Toolbar */}
      <WorkbenchToolbar
        saveStatus={saveStatus}
        onSave={handleManualSave}
        onRequestReview={handleRequestReview}
        onAnalyzeComplexity={handleAnalyzeComplexity}
        onConvertCode={() => handleGenerateCode('javascript')}
        onExport={() => setShowExportModal(true)}
        onReset={handleReset}
        onOpenShortcuts={() => setShowShortcutsModal(true)}
      />

      {/* Shortcuts Modal */}
      {showShortcutsModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-2xl border border-violet-500/30 w-full max-w-md space-y-4 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between border-b border-violet-500/20 pb-3">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-violet-400" />
                Workbench Keyboard Shortcuts
              </h3>
              <button onClick={() => setShowShortcutsModal(false)} className="text-[#B8B1CC] hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between p-2 rounded-lg bg-[#05030D]">
                <span className="text-[#B8B1CC]">Ctrl/Cmd + S</span>
                <span className="text-violet-300 font-bold">Save Workbench</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-[#05030D]">
                <span className="text-[#B8B1CC]">Ctrl/Cmd + Z</span>
                <span className="text-violet-300 font-bold">Undo Action</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-[#05030D]">
                <span className="text-[#B8B1CC]">Ctrl/Cmd + Shift + Z</span>
                <span className="text-violet-300 font-bold">Redo Action</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-[#05030D]">
                <span className="text-[#B8B1CC]">Ctrl/Cmd + Enter</span>
                <span className="text-violet-300 font-bold">Request AI Review</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-[#05030D]">
                <span className="text-[#B8B1CC]">Escape</span>
                <span className="text-violet-300 font-bold">Close Modals</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-2xl border border-violet-500/30 w-full max-w-md space-y-4 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between border-b border-violet-500/20 pb-3">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Download className="w-4 h-4 text-violet-400" />
                Export Solution Strategy
              </h3>
              <button onClick={() => setShowExportModal(false)} className="text-[#B8B1CC] hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <button
                onClick={handleExportMarkdown}
                className="w-full p-3 rounded-xl bg-[#05030D] border border-violet-500/30 text-left text-xs font-semibold text-white hover:border-violet-500/60 transition-colors flex items-center justify-between"
              >
                <span>Export Complete Strategy (.md)</span>
                <Download className="w-4 h-4 text-violet-400" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
export default ApproachWorkbench;
