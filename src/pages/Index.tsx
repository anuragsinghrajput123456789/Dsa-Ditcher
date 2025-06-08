
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import TopicExplorer from "../components/TopicExplorer";
import ProblemAnalyzer from "../components/ProblemAnalyzer";
import Visualizations from "../components/Visualizations";
import Chatbot from "../components/Chatbot";
import Roadmap from "../components/Roadmap";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/topics" element={<TopicExplorer />} />
          <Route path="/analyzer" element={<ProblemAnalyzer />} />
          <Route path="/visualizations" element={<Visualizations />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Chatbot />
    </div>
  );
};

export default Index;
