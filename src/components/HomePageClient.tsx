'use client';

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Dashboard } from '@/components/Dashboard';
import { FlowchartRoadmap } from '@/components/roadmap/FlowchartRoadmap';
import { ProblemAnalyzerEnhanced } from '@/components/ProblemAnalyzerEnhanced';
import { CodePlayground } from '@/components/CodePlayground';
import { VisualizationsFixed } from '@/components/VisualizationsFixed';
import { DsaCheatSheet } from '@/components/DsaCheatSheet';
import { DsaSheetManager } from '@/components/DsaSheetManager';

export default function HomePageClient() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard setActiveTab={setActiveTab} />}
        {activeTab === 'roadmap' && <FlowchartRoadmap />}
        {activeTab === 'analyzer' && <ProblemAnalyzerEnhanced />}
        {activeTab === 'playground' && <CodePlayground />}
        {activeTab === 'visualizer' && <VisualizationsFixed />}
        {activeTab === 'cheat-sheet' && <DsaCheatSheet />}
        {activeTab === 'sheet-manager' && <DsaSheetManager />}
      </main>

      <Footer />
    </div>
  );
}
