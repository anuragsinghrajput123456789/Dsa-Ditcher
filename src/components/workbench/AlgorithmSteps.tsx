'use client';

import React from 'react';
import { ListOrdered, Plus, Trash2, ArrowUp, ArrowDown, Copy, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IWorkbenchData, IAlgorithmStep } from '@/types';
import { toast } from 'sonner';

interface AlgorithmStepsProps {
  data: IWorkbenchData;
  updateData: (updater: Partial<IWorkbenchData>) => void;
}

export function AlgorithmSteps({ data, updateData }: AlgorithmStepsProps) {
  const steps = data.algorithmSteps || [];

  const handleAddStep = () => {
    const newStep: IAlgorithmStep = {
      id: Date.now().toString(),
      stepNumber: steps.length + 1,
      title: `Step ${steps.length + 1}`,
      explanation: 'Describe what operations are performed in this step.',
    };
    updateData({ algorithmSteps: [...steps, newStep] });
    toast.success("Algorithm step added!");
  };

  const handleUpdateStep = (id: string, field: keyof IAlgorithmStep, value: any) => {
    const updated = steps.map((s) => (s.id === id ? { ...s, [field]: value } : s));
    updateData({ algorithmSteps: updated });
  };

  const handleDeleteStep = (id: string) => {
    const filtered = steps.filter((s) => s.id !== id).map((s, idx) => ({ ...s, stepNumber: idx + 1 }));
    updateData({ algorithmSteps: filtered });
    toast.info("Step deleted");
  };

  const handleMoveStep = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === steps.length - 1)) return;
    const newSteps = [...steps];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const temp = newSteps[index];
    newSteps[index] = newSteps[targetIdx];
    newSteps[targetIdx] = temp;
    
    // Re-index step numbers
    const reindexed = newSteps.map((s, idx) => ({ ...s, stepNumber: idx + 1 }));
    updateData({ algorithmSteps: reindexed });
  };

  const handleDuplicateStep = (step: IAlgorithmStep) => {
    const dup: IAlgorithmStep = {
      ...step,
      id: Date.now().toString(),
      stepNumber: steps.length + 1,
      title: `${step.title} (Copy)`,
    };
    updateData({ algorithmSteps: [...steps, dup] });
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border border-violet-500/20 shadow-xl space-y-4 flex flex-col h-full overflow-hidden animate-fade-in">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-violet-500/15 pb-3">
        <div className="flex items-center space-x-2">
          <ListOrdered className="w-4 h-4 text-violet-400" />
          <h3 className="font-bold text-sm text-white">Step-by-Step Structured Algorithm</h3>
        </div>

        <Button
          onClick={handleAddStep}
          size="sm"
          className="bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs h-8 px-3 rounded-xl gap-1"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Step</span>
        </Button>
      </div>

      {/* Steps List */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
        {steps.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#77708D] space-y-2">
            <ListOrdered className="w-8 h-8 text-violet-400/50" />
            <p className="text-white font-semibold">No steps added yet.</p>
            <p className="text-[11px]">Break down your approach into ordered execution steps.</p>
          </div>
        ) : (
          steps.map((step, idx) => (
            <div
              key={step.id}
              className="p-4 rounded-xl bg-[#05030D] border border-violet-500/25 space-y-3 shadow-md hover:border-violet-500/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-lg bg-violet-500/20 border border-violet-500/30 text-violet-300 font-mono font-bold text-xs flex items-center justify-center">
                    {step.stepNumber}
                  </span>
                  <input
                    type="text"
                    value={step.title}
                    onChange={(e) => handleUpdateStep(step.id, 'title', e.target.value)}
                    className="font-bold text-xs text-white bg-transparent border-b border-violet-500/20 focus:border-violet-500 outline-none w-48 font-sans"
                  />
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleMoveStep(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1 text-[#B8B1CC] hover:text-white disabled:opacity-30 rounded-md hover:bg-white/5"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleMoveStep(idx, 'down')}
                    disabled={idx === steps.length - 1}
                    className="p-1 text-[#B8B1CC] hover:text-white disabled:opacity-30 rounded-md hover:bg-white/5"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDuplicateStep(step)}
                    className="p-1 text-[#B8B1CC] hover:text-white rounded-md hover:bg-white/5"
                    title="Duplicate Step"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteStep(step.id)}
                    className="p-1 text-[#B8B1CC] hover:text-red-400 rounded-md hover:bg-white/5"
                    title="Delete Step"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <textarea
                value={step.explanation}
                onChange={(e) => handleUpdateStep(step.id, 'explanation', e.target.value)}
                placeholder="Explain what operations occur in this step..."
                className="w-full h-16 p-2.5 rounded-lg bg-[#0E0A1F] border border-violet-500/20 font-mono text-[11px] text-[#F5F3FF] focus:ring-1 focus:ring-violet-500 outline-none resize-none"
              />
            </div>
          ))
        )}
      </div>

    </div>
  );
}
export default AlgorithmSteps;
