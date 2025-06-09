
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import TopicExplorer from "../components/TopicExplorer";
import ProblemAnalyzerEnhanced from "../components/ProblemAnalyzerEnhanced";
import VisualizationsFixed from "../components/VisualizationsFixed";
import Chatbot from "../components/Chatbot";
import Roadmap from "../components/Roadmap";
import CustomRoadmap from "../components/CustomRoadmap";
import DSAChatGuide from "../components/DSAChatGuide";
import QuestionExplainer from "../components/QuestionExplainer";
import CodePlayground from "../components/CodePlayground";
import ComplexityFinder from "../components/playground/ComplexityFinder";
import RoadmapCRUD from "../components/roadmap/RoadmapCRUD";
import ResourceManager from "../components/resources/ResourceManager";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/topics" element={<TopicExplorer />} />
          <Route path="/analyzer" element={<ProblemAnalyzerEnhanced />} />
          <Route path="/visualizations" element={<VisualizationsFixed />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/roadmap-crud" element={<RoadmapCRUD />} />
          <Route path="/custom-roadmap" element={<CustomRoadmap />} />
          <Route path="/chat-guide" element={<DSAChatGuide />} />
          <Route path="/question-explainer" element={<QuestionExplainer />} />
          <Route path="/playground" element={<CodePlayground />} />
          <Route path="/complexity-finder" element={<ComplexityFinder code="" language="python" />} />
          <Route path="/resources" element={<ResourceManager topic="general" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Chatbot />
    </div>
  );
};

export default Index;
