import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Menu, X, Code, Sparkles, Flame, 
  Library, BrainCircuit, Activity, Map, 
  FileSpreadsheet, Terminal, ArrowRight, User 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { API_BASE_URL } from "@/config";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; token?: string } | null>(null);
  const [streak, setStreak] = useState<number>(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      // Fetch dynamic profile to get current real-time streak
      const fetchProfile = async () => {
        try {
          const res = await fetch(`${API_BASE_URL}/api/users/profile`, {
            headers: { Authorization: `Bearer ${parsedUser.token}` },
          });
          if (res.ok) {
            const data = await res.json();
            setStreak(data.streak || 0);
          } else if (res.status === 401) {
            // Token has invalid signature or is expired - gracefully clear session
            handleLogout();
          }
        } catch (error) {
          console.error("Failed to fetch streak", error);
        }
      };
      fetchProfile();
    } else {
      // Local/Guest streak logic
      const todayStr = new Date().toDateString();
      const lastActive = localStorage.getItem("guest-last-active");
      const currentStreak = parseInt(localStorage.getItem("guest-streak") || "0");
      if (lastActive) {
        const lastActiveDate = new Date(lastActive);
        const todayDate = new Date(todayStr);
        const diffTime = todayDate.getTime() - lastActiveDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          const newStreak = currentStreak + 1;
          localStorage.setItem("guest-streak", newStreak.toString());
          localStorage.setItem("guest-last-active", todayStr);
          setStreak(newStreak);
        } else if (diffDays > 1) {
          localStorage.setItem("guest-streak", "1");
          localStorage.setItem("guest-last-active", todayStr);
          setStreak(1);
        } else {
          setStreak(currentStreak || 1);
        }
      } else {
        localStorage.setItem("guest-streak", "1");
        localStorage.setItem("guest-last-active", todayStr);
        setStreak(1);
      }
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setStreak(0);
    navigate("/login");
  };

  const navigation = [
    { name: "Topics", href: "/topics", icon: Library, color: "text-purple-500", hoverColor: "group-hover:text-purple-400 group-hover:rotate-6", desc: "Browse Tracks" },
    { name: "Analyzer", href: "/analyzer", icon: BrainCircuit, color: "text-emerald-500", hoverColor: "group-hover:text-emerald-400 group-hover:scale-110", desc: "Analyze Code" },
    { name: "Visualizations", href: "/visualizations", icon: Activity, color: "text-blue-500", hoverColor: "group-hover:text-blue-400 group-hover:scale-110", desc: "Interactive Demos" },
    { name: "Roadmap", href: "/roadmap", icon: Map, color: "text-amber-500", hoverColor: "group-hover:text-amber-400 group-hover:-translate-y-0.5", desc: "Learning Path" },
    { name: "Sheets", href: "/dsa-sheets", icon: FileSpreadsheet, color: "text-pink-500", hoverColor: "group-hover:text-pink-400 group-hover:translate-x-0.5", desc: "SDE Sheets" },
    { name: "Playground", href: "/playground", icon: Terminal, color: "text-cyan-500", hoverColor: "group-hover:text-cyan-400", desc: "Compiler" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40 border-b border-border/40 shadow-md">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-18">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group relative">
            <div className="relative">
              {/* Outer Glow Ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 via-purple-600 to-blue-500 rounded-xl blur opacity-25 group-hover:opacity-70 transition duration-500 group-hover:duration-200 animate-pulse-slow"></div>
              
              <div className="relative w-10.5 h-10.5 bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 dark:from-indigo-900 dark:via-purple-950 dark:to-slate-900 rounded-xl flex items-center justify-center border border-white/10 shadow-lg group-hover:scale-105 transition-all duration-300 overflow-hidden">
                {/* Slow spinning background grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:10px_10px] animate-spin-slow"></div>
                <Code className="w-5.5 h-5.5 text-cyan-400 group-hover:text-purple-400 group-hover:rotate-12 transition-all duration-300" />
              </div>
              <div className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-amber-400 dark:bg-amber-500 rounded-full flex items-center justify-center shadow-md animate-bounce">
                <Sparkles className="w-3 h-3 text-amber-950" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-cyan-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent group-hover:from-cyan-400 group-hover:to-fuchsia-400 transition-all duration-300 tracking-tight leading-none">
                AlgoSpark
              </span>
              <span className="text-[9px] font-bold text-muted-foreground/75 tracking-wider uppercase leading-none mt-0.5">
                DSA CO-PILOT
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 group flex items-center gap-2 ${
                    active
                      ? "bg-primary/10 text-primary border border-primary/20 shadow-inner scale-105"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/40 hover:scale-105"
                  }`}
                >
                  <Icon className={`w-4.5 h-4.5 transition-all duration-300 ${item.color} ${item.hoverColor} ${active ? "animate-pulse glow-text" : ""}`} />
                  <span>{item.name}</span>
                  {active && (
                    <div className="absolute inset-0 bg-primary/5 rounded-xl border border-primary/10 pointer-events-none"></div>
                  )}
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></div>
                </Link>
              );
            })}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-3">
            {streak > 0 && (
              <div className="flex items-center gap-2 text-xs font-black text-amber-600 dark:text-amber-400 bg-amber-100/60 dark:bg-amber-950/20 px-3.5 py-1.5 rounded-full border border-amber-200 dark:border-amber-900/60 shadow-sm backdrop-blur-md">
                <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-bounce" />
                <span>{streak}d Streak</span>
              </div>
            )}
            <ThemeToggle />
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-accent/40 border border-border/30">
                  <User className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold hidden lg:inline-block">Hi, {user.name}</span>
                </div>
                <Button variant="destructive" size="sm" onClick={handleLogout} className="rounded-xl font-semibold shadow-sm shadow-destructive/10 hover:shadow-destructive/20 hover:scale-[1.02] transition-transform">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="font-semibold text-sm hover:bg-accent/50 rounded-xl px-4">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="font-semibold text-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 dark:from-indigo-600 dark:to-purple-600 dark:hover:from-indigo-500 dark:hover:to-purple-500 text-white rounded-xl px-4.5 shadow-md shadow-purple-500/10 hover:shadow-purple-500/25 hover:scale-[1.03] transition-all duration-300">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {streak > 0 && (
              <div className="flex items-center gap-1 text-xs font-black text-amber-600 dark:text-amber-400 bg-amber-100/60 dark:bg-amber-950/20 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-900/60 shadow-sm">
                <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{streak}d</span>
              </div>
            )}
            <ThemeToggle />
            {user ? (
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-destructive rounded-xl p-2 hover:bg-destructive/10">
                <span className="sr-only">Logout</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
              </Button>
            ) : null}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-accent/80 transition-colors duration-200 rounded-xl"
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
          <div className="md:hidden pb-4 border-t border-border/30 mt-2">
            <div className="space-y-1.5 pt-3">
              {navigation.map((item, index) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 ${
                      active
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                    }`}
                    style={{
                      animation: "fadeIn 0.4s ease-out both",
                      animationDelay: `${index * 0.05}s`
                    }}
                  >
                    <Icon className={`w-5 h-5 ${active ? "text-white" : item.color}`} />
                    <div className="flex flex-col">
                      <span className="leading-tight">{item.name}</span>
                      <span className={`text-[10px] ${active ? "text-white/70" : "text-muted-foreground/75 font-medium"}`}>{item.desc}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
