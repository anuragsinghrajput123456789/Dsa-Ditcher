'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ToolType, DiagramToolbar } from './DiagramToolbar';
import { IWorkbenchData } from '@/types';
import { Button } from '@/components/ui/button';
import { Download, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface DiagramCanvasProps {
  data: IWorkbenchData;
  updateData: (updater: Partial<IWorkbenchData>) => void;
  onReviewDiagram?: (diagramSummary: string) => void;
}

export interface Shape {
  id: string;
  type: ToolType | 'stroke';
  x: number;
  y: number;
  width?: number;
  height?: number;
  points?: { x: number; y: number }[];
  label?: string;
  color?: string;
}

export function DiagramCanvas({ data, updateData, onReviewDiagram }: DiagramCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [activeTool, setActiveTool] = useState<ToolType>('pen');
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentStroke, setCurrentStroke] = useState<{ x: number; y: number }[]>([]);
  const [zoom, setZoom] = useState(1);

  // Load existing diagramData from state
  useEffect(() => {
    if (data.diagramData && Array.isArray(data.diagramData.shapes)) {
      setShapes(data.diagramData.shapes);
    } else {
      // Default initial DSA whiteboard elements
      const defaultShapes: Shape[] = [
        { id: '1', type: 'dsa-array', x: 80, y: 80, width: 280, height: 60, label: 'nums = [2, 7, 11, 15]' },
        { id: '2', type: 'dsa-linked-list', x: 80, y: 180, width: 320, height: 50, label: '[10] -> [20] -> [30] -> NULL' },
      ];
      setShapes(defaultShapes);
    }
  }, []);

  // Save shapes to workbench state
  const syncDiagramData = useCallback((newShapes: Shape[]) => {
    setShapes(newShapes);
    
    // Generate compact AI-readable summary
    const compactNodes = newShapes.map((s) => ({
      type: s.type,
      label: s.label || s.type,
      x: Math.round(s.x),
      y: Math.round(s.y),
    }));

    updateData({
      diagramData: {
        shapes: newShapes,
        nodes: compactNodes,
        summary: `Diagram contains ${newShapes.length} elements: ` + compactNodes.map(n => `${n.label} (${n.type})`).join(', ')
      }
    });
  }, [updateData]);

  // Render Canvas 2D Loop
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply Zoom
    ctx.scale(zoom, zoom);

    // Draw background grid
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.05)';
    ctx.lineWidth = 1;
    const gridSize = 25;
    for (let x = 0; x < canvas.width / zoom; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height / zoom);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height / zoom; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width / zoom, y);
      ctx.stroke();
    }

    // Draw Saved Shapes
    shapes.forEach((s) => {
      const isSelected = s.id === selectedShapeId;
      ctx.strokeStyle = isSelected ? '#D946EF' : '#8B5CF6';
      ctx.fillStyle = isSelected ? 'rgba(217, 70, 239, 0.15)' : 'rgba(139, 92, 246, 0.1)';
      ctx.lineWidth = isSelected ? 2.5 : 2;

      if (s.type === 'stroke' && s.points && s.points.length > 0) {
        ctx.beginPath();
        ctx.moveTo(s.points[0].x, s.points[0].y);
        s.points.forEach((p) => ctx.lineTo(p.x, p.y));
        ctx.stroke();
      } else if (s.type === 'rectangle' || s.type === 'dsa-array' || s.type === 'dsa-stack' || s.type === 'dsa-queue') {
        const w = s.width || 120;
        const h = s.height || 60;
        ctx.beginPath();
        ctx.roundRect(s.x, s.y, w, h, 8);
        ctx.fill();
        ctx.stroke();

        // Label
        if (s.label) {
          ctx.font = '12px Fira Code, monospace';
          ctx.fillStyle = '#F5F3FF';
          ctx.textAlign = 'center';
          ctx.fillText(s.label, s.x + w / 2, s.y + h / 2 + 4);
        }
      } else if (s.type === 'circle' || s.type === 'dsa-tree') {
        const r = (s.width || 60) / 2;
        ctx.beginPath();
        ctx.arc(s.x + r, s.y + r, r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        if (s.label) {
          ctx.font = '12px Fira Code, monospace';
          ctx.fillStyle = '#22D3EE';
          ctx.textAlign = 'center';
          ctx.fillText(s.label, s.x + r, s.y + r + 4);
        }
      } else if (s.type === 'dsa-linked-list') {
        const w = s.width || 240;
        const h = s.height || 50;
        ctx.beginPath();
        ctx.roundRect(s.x, s.y, w, h, 8);
        ctx.fillStyle = 'rgba(34, 211, 238, 0.12)';
        ctx.fill();
        ctx.stroke();

        ctx.font = '12px Fira Code, monospace';
        ctx.fillStyle = '#22D3EE';
        ctx.textAlign = 'center';
        ctx.fillText(s.label || '[Node] -> [Next]', s.x + w / 2, s.y + h / 2 + 4);
      } else if (s.type === 'arrow' || s.type === 'line' || s.type === 'dsa-pointer') {
        const w = s.width || 100;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + w, s.y);
        ctx.stroke();

        // Draw Arrowhead
        ctx.beginPath();
        ctx.moveTo(s.x + w - 8, s.y - 5);
        ctx.lineTo(s.x + w, s.y);
        ctx.lineTo(s.x + w - 8, s.y + 5);
        ctx.stroke();

        if (s.label) {
          ctx.font = '10px Fira Code, monospace';
          ctx.fillStyle = '#A855F7';
          ctx.fillText(s.label, s.x + 10, s.y - 6);
        }
      }
    });

    // Draw active live stroke
    if (currentStroke.length > 0) {
      ctx.strokeStyle = '#D946EF';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(currentStroke[0].x, currentStroke[0].y);
      currentStroke.forEach((p) => ctx.lineTo(p.x, p.y));
      ctx.stroke();
    }

    ctx.restore();
  }, [shapes, selectedShapeId, currentStroke, zoom]);

  useEffect(() => {
    redrawCanvas();
  }, [redrawCanvas]);

  // Adjust Canvas Resolution on Resize
  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (container && canvas) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        redrawCanvas();
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [redrawCanvas]);

  // Pointer Event Handlers (Mouse, Trackpad, Touchscreen, Stylus)
  const getCanvasPoint = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) / zoom,
      y: (e.clientY - rect.top) / zoom,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    const pt = getCanvasPoint(e);

    if (activeTool === 'select') {
      const clicked = [...shapes].reverse().find((s) => {
        const w = s.width || 60;
        const h = s.height || 60;
        return pt.x >= s.x && pt.x <= s.x + w && pt.y >= s.y && pt.y <= s.y + h;
      });
      setSelectedShapeId(clicked ? clicked.id : null);
    } else if (activeTool === 'pen') {
      setIsDrawing(true);
      setCurrentStroke([pt]);
    } else if (activeTool === 'eraser') {
      const filtered = shapes.filter((s) => {
        const w = s.width || 60;
        const h = s.height || 60;
        return !(pt.x >= s.x && pt.x <= s.x + w && pt.y >= s.y && pt.y <= s.y + h);
      });
      syncDiagramData(filtered);
    } else {
      // Add custom shape at clicked point
      const newShape: Shape = {
        id: Date.now().toString(),
        type: activeTool,
        x: pt.x,
        y: pt.y,
        width: 140,
        height: 60,
        label: activeTool.replace('dsa-', '').toUpperCase(),
      };
      syncDiagramData([...shapes, newShape]);
      setSelectedShapeId(newShape.id);
      setActiveTool('select');
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const pt = getCanvasPoint(e);

    if (isDrawing && activeTool === 'pen') {
      setCurrentStroke((prev) => [...prev, pt]);
    } else if (selectedShapeId && activeTool === 'select' && (e.buttons === 1 || e.pointerType === 'touch')) {
      const updated = shapes.map((s) => (s.id === selectedShapeId ? { ...s, x: pt.x - (s.width || 60) / 2, y: pt.y - (s.height || 60) / 2 } : s));
      setShapes(updated);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch (err) {}

    if (isDrawing && currentStroke.length > 0) {
      const strokeShape: Shape = {
        id: Date.now().toString(),
        type: 'stroke',
        x: currentStroke[0].x,
        y: currentStroke[0].y,
        points: currentStroke,
      };
      syncDiagramData([...shapes, strokeShape]);
      setCurrentStroke([]);
    }
    setIsDrawing(false);
  };

  const handleAddDsaPreset = (tool: ToolType) => {
    let label = 'Preset';
    let width = 200;
    if (tool === 'dsa-array') label = '[2 | 7 | 11 | 15]';
    if (tool === 'dsa-linked-list') label = '[10] -> [20] -> [30]';
    if (tool === 'dsa-tree') { label = 'Binary Tree (Root)'; width = 160; }

    const newShape: Shape = {
      id: Date.now().toString(),
      type: tool,
      x: 100 + Math.random() * 50,
      y: 100 + Math.random() * 50,
      width,
      height: 60,
      label,
    };
    syncDiagramData([...shapes, newShape]);
    setSelectedShapeId(newShape.id);
    setActiveTool('select');
    toast.success(`Added ${label} to whiteboard`);
  };

  const handleExportPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `dsa-diagram-${Date.now()}.png`;
    link.href = image;
    link.click();
    toast.success("Whiteboard exported as PNG!");
  };

  return (
    <div className="glass-panel rounded-2xl p-4 border border-violet-500/20 shadow-2xl flex flex-col h-full space-y-3 overflow-hidden animate-fade-in">
      
      {/* Top Toolbar */}
      <DiagramToolbar
        activeTool={activeTool}
        setActiveTool={setActiveTool}
        onAddDsaShape={handleAddDsaPreset}
        onUndo={() => {}}
        onRedo={() => {}}
        onClear={() => syncDiagramData([])}
        onZoomIn={() => setZoom((z) => Math.min(2, z + 0.15))}
        onZoomOut={() => setZoom((z) => Math.max(0.5, z - 0.15))}
        onResetZoom={() => setZoom(1)}
      />

      {/* Canvas Workspace Container */}
      <div ref={containerRef} className="relative flex-1 rounded-xl bg-[#05030D] border border-violet-500/30 overflow-hidden shadow-inner">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="w-full h-full cursor-crosshair touch-none"
          style={{ touchAction: 'none' }}
        />

        {/* Selected Shape Label Editor Overlay */}
        {selectedShapeId && (
          <div className="absolute top-3 left-3 bg-[#0E0A1F]/90 backdrop-blur-md p-2.5 rounded-xl border border-magenta-500/30 flex items-center space-x-2 text-xs shadow-lg">
            <span className="text-[#B8B1CC] font-bold">Edit Label:</span>
            <input
              type="text"
              value={shapes.find((s) => s.id === selectedShapeId)?.label || ''}
              onChange={(e) => {
                const val = e.target.value;
                syncDiagramData(shapes.map((s) => (s.id === selectedShapeId ? { ...s, label: val } : s)));
              }}
              className="px-2 py-1 bg-[#05030D] border border-violet-500/30 rounded-lg text-white font-mono outline-none text-xs"
            />
          </div>
        )}
      </div>

      {/* Footer Controls */}
      <div className="flex items-center justify-between pt-1 text-xs">
        <div className="text-[10px] font-mono text-[#77708D]">
          Touch / Mouse Pointer Enabled • Canvas Zoom: {Math.round(zoom * 100)}%
        </div>

        <div className="flex items-center space-x-2">
          {onReviewDiagram && (
            <Button
              size="sm"
              onClick={() => onReviewDiagram(data.diagramData?.summary || 'Diagram visual structure')}
              className="bg-magenta-600 hover:bg-magenta-500 text-white font-bold text-xs h-8 px-3 rounded-xl gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Review Diagram</span>
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={handleExportPng}
            className="border-violet-500/20 text-xs h-8 text-[#B8B1CC] hover:text-white gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export PNG</span>
          </Button>
        </div>
      </div>

    </div>
  );
}
export default DiagramCanvas;
