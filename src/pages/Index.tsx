
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import TopicExplorer from "../components/TopicExplorer";
import ProblemAnalyzer from "../components/ProblemAnalyzer";
import EnhancedVisualizations from "../components/EnhancedVisualizations";
import Chatbot from "../components/Chatbot";
import Roadmap from "../components/Roadmap";
import CustomRoadmap from "../components/CustomRoadmap";
import DSAChatGuide from "../components/DSAChatGuide";
import QuestionExplainer from "../components/QuestionExplainer";
import CodePlayground from "../components/CodePlayground";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/topics" element={<TopicExplorer />} />
          <Route path="/analyzer" element={<ProblemAnalyzer />} />
          <Route path="/visualizations" element={<EnhancedVisualizations />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/custom-roadmap" element={<CustomRoadmap />} />
          <Route path="/chat-guide" element={<DSAChatGuide />} />
          <Route path="/question-explainer" element={<QuestionExplainer />} />
          <Route path="/playground" element={<CodePlayground />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Chatbot />
    </div>
  );
};

export default Index;
