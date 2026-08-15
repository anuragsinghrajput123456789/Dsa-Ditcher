'use client';

import React from 'react';
import { 
  MousePointer, PenTool, Eraser, Type, Minus, ArrowUpRight, 
  Square, Circle, StickyNote, Grid, GitCommit, Layers, 
  Database, Network, Hash, Tag, RotateCcw, ZoomIn, ZoomOut, Maximize2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export type ToolType = 
  | 'select' | 'pen' | 'eraser' | 'text' | 'line' | 'arrow' | 'rectangle' | 'circle' | 'sticky'
  | 'dsa-array' | 'dsa-linked-list' | 'dsa-stack' | 'dsa-queue' | 'dsa-tree' | 'dsa-graph' | 'dsa-hashmap' | 'dsa-pointer';

interface DiagramToolbarProps {
  activeTool: ToolType;
  setActiveTool: (tool: ToolType) => void;
  onAddDsaShape: (type: ToolType) => void;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
}

export function DiagramToolbar({
  activeTool,
  setActiveTool,
  onAddDsaShape,
  onUndo,
  onRedo,
  onClear,
  onZoomIn,
  onZoomOut,
  onResetZoom,
}: DiagramToolbarProps) {
  const drawingTools: { id: ToolType; label: string; icon: any }[] = [
    { id: 'select', label: 'Select / Move', icon: MousePointer },
    { id: 'pen', label: 'Freehand Pen', icon: PenTool },
    { id: 'eraser', label: 'Eraser', icon: Eraser },
    { id: 'text', label: 'Text Label', icon: Type },
    { id: 'arrow', label: 'Pointer Arrow', icon: ArrowUpRight },
    { id: 'line', label: 'Connection Line', icon: Minus },
    { id: 'rectangle', label: 'Rectangle Box', icon: Square },
    { id: 'circle', label: 'Circle Node', icon: Circle },
    { id: 'sticky', label: 'Sticky Note', icon: StickyNote },
  ];

  const dsaTools: { id: ToolType; label: string; icon: any }[] = [
    { id: 'dsa-array', label: 'Array [2|7|11|15]', icon: Grid },
    { id: 'dsa-linked-list', label: 'Linked List [10]->[20]', icon: GitCommit },
    { id: 'dsa-stack', label: 'Stack Container', icon: Layers },
    { id: 'dsa-queue', label: 'Queue Buffer', icon: Layers },
    { id: 'dsa-tree', label: 'Binary Tree Node', icon: Network },
    { id: 'dsa-graph', label: 'Graph Edge', icon: Network },
    { id: 'dsa-hashmap', label: 'Hash Table Bucket', icon: Hash },
    { id: 'dsa-pointer', label: 'Node Pointer', icon: Tag },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-[#05030D] border border-violet-500/30 text-xs">
      
      {/* General Drawing Tools */}
      <div className="flex items-center space-x-1 flex-wrap">
        <span className="text-[10px] font-bold text-[#77708D] uppercase tracking-wider mr-1">Tools:</span>
        {drawingTools.map((t) => {
          const Icon = t.icon;
          const isActive = activeTool === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTool(t.id)}
              className={`p-1.5 rounded-lg border transition-all ${
                isActive
                  ? "bg-violet-600 text-white border-violet-400 shadow-[0_0_10px_rgba(139,92,246,0.4)]"
                  : "bg-[#0E0A1F] border-violet-500/20 text-[#B8B1CC] hover:text-white hover:bg-violet-500/10"
              }`}
              title={t.label}
            >
              <Icon className="w-3.5 h-3.5" />
            </button>
          );
        })}
      </div>

      {/* DSA Data Structure Presets */}
      <div className="flex items-center space-x-1 flex-wrap">
        <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider mr-1">DSA Presets:</span>
        {dsaTools.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => onAddDsaShape(t.id)}
              className="px-2 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 hover:text-white font-mono text-[11px] flex items-center space-x-1 transition-all"
              title={`Add ${t.label}`}
            >
              <Icon className="w-3 h-3" />
              <span>{t.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Canvas View Actions */}
      <div className="flex items-center space-x-1">
        <button
          onClick={onZoomIn}
          className="p-1.5 rounded-lg bg-[#0E0A1F] border border-violet-500/20 text-[#B8B1CC] hover:text-white"
          title="Zoom In"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={onZoomOut}
          className="p-1.5 rounded-lg bg-[#0E0A1F] border border-violet-500/20 text-[#B8B1CC] hover:text-white"
          title="Zoom Out"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={onResetZoom}
          className="p-1.5 rounded-lg bg-[#0E0A1F] border border-violet-500/20 text-[#B8B1CC] hover:text-white"
          title="Reset Zoom"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={onClear}
          className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 hover:bg-red-500/20"
          title="Clear Whiteboard"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
export default DiagramToolbar;
