
import { Link, useLocation } from "react-router-dom";
import { Book, Home, Search, BookOpen, TrendingUp, Code, MessageSquare, Lightbulb, Map } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Dashboard" },
    { path: "/topics", icon: Book, label: "Topics" },
    { path: "/analyzer", icon: Search, label: "Analyzer" },
    { path: "/visualizations", icon: BookOpen, label: "Visualizations" },
    { path: "/roadmap", icon: TrendingUp, label: "Roadmap" },
    { path: "/custom-roadmap", icon: Map, label: "Custom Roadmap" },
    { path: "/chat-guide", icon: MessageSquare, label: "DSA Guide" },
    { path: "/question-explainer", icon: Lightbulb, label: "Question Explainer" },
    { path: "/playground", icon: Code, label: "Code Playground" },
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-blue-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DSA Pathfinder
            </Link>
            <div className="hidden lg:flex space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                      isActive
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="lg:hidden border-t border-gray-200 bg-white">
        <div className="grid grid-cols-3 gap-1 p-2">
          {navItems.slice(0, 9).map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                <Icon size={16} />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
