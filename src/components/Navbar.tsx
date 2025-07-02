
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Code, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/" },
    { name: "Topics", href: "/topics" },
    { name: "Analyzer", href: "/analyzer" },
    { name: "Visualizations", href: "/visualizations" },
    { name: "Roadmap", href: "/roadmap" },
    { name: "Sheets", href: "/dsa-sheets" },
    { name: "Playground", href: "/playground" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 border-b border-border/50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <Sparkles className="w-2.5 h-2.5 text-yellow-900" />
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300">
              DSA Pathfinder
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group ${
                  isActive(item.href)
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/80"
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <div className="absolute inset-0 bg-primary/10 rounded-xl animate-pulse"></div>
                )}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></div>
              </Link>
            ))}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-accent/80 transition-colors duration-200"
            >
              {isOpen ? (
                <X className="w-5 h-5 rotate-90 transition-transform duration-200" />
              ) : (
                <Menu className="w-5 h-5 transition-transform duration-200" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="space-y-2 pt-2">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 animate-fade-in ${
                    isActive(item.href)
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/80"
                  }`}
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
