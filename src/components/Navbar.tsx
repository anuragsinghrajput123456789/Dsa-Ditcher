
import { Link, useLocation } from "react-router-dom";
import { Book, Home, Search, BookOpen, TrendingUp } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Dashboard" },
    { path: "/topics", icon: Book, label: "Topics" },
    { path: "/analyzer", icon: Search, label: "Analyzer" },
    { path: "/visualizations", icon: BookOpen, label: "Visualizations" },
    { path: "/roadmap", icon: TrendingUp, label: "Roadmap" },
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-blue-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DSA Pathfinder
            </Link>
            <div className="hidden md:flex space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
