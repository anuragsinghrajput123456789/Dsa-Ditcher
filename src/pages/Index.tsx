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
import CodePlayground from "../components/CodePlayground";
import ComplexityFinder from "../components/playground/ComplexityFinder";
import RoadmapCRUD from "../components/roadmap/RoadmapCRUD";
import ResourceManager from "../components/resources/ResourceManager";
import DsaSheetManager from "../components/DsaSheetManager";
import AuthPage from "@/components/auth/AuthPage";
import { SupabaseAuthProvider, useSupabaseAuth } from "@/hooks/useSupabaseAuth";

// Add Account page placeholder
function AccountPage() {
  const { user, profile, loading, signOut } = useSupabaseAuth();
  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!user) return <div className="p-10 text-center">Not logged in.</div>;

  return (
    <div className="max-w-lg mx-auto mt-12 p-8 bg-card rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-2">My Profile</h2>
      <div className="border rounded-lg p-5 bg-background mb-4">
        <div className="mb-2"><span className="font-semibold">Email:</span> {user.email}</div>
        <div className="mb-2"><span className="font-semibold">Username:</span> {profile?.username || <span className="text-muted-foreground">Not set</span>}</div>
        <div className="mb-2"><span className="font-semibold">Website:</span> {profile?.website || <span className="text-muted-foreground">Not set</span>}</div>
      </div>
      <Button onClick={signOut} className="w-full bg-destructive hover:bg-destructive/90 text-white">
        <LogOut className="w-4 h-4 mr-2" />
        Log out
      </Button>
    </div>
  );
}

const Index = () => {
  return (
    <SupabaseAuthProvider>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/account" element={<AccountPage />} />
        {/* Protected Routes: check auth in child components */}
        <Route path="/*" element={
          <>
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
                  <Route path="/playground" element={<CodePlayground />} />
                  <Route path="/complexity-finder" element={<ComplexityFinder code="" language="python" />} />
                  <Route path="/resources" element={<ResourceManager topic="general" />} />
                  <Route path="/dsa-sheets" element={<DsaSheetManager />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </div>
              <Chatbot />
            </div>
          </>
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </SupabaseAuthProvider>
  );
};

export default Index;
