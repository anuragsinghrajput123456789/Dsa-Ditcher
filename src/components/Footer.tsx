import Link from "next/link";
import { Code, Github, Sparkles, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/40 bg-background/80 backdrop-blur-xl py-8 sm:py-12 mt-12 transition-all duration-300">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
        {/* Brand Column */}
        <div className="md:col-span-2 space-y-4">
          <Link href="/" className="flex items-center space-x-3 group w-fit">
            <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
              AlgoSpark
            </span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
            Master Data Structures and Algorithms with interactive step-by-step visualizations, Monaco browser execution, and personalized AI mentoring.
          </p>
          <div className="flex items-center space-x-4 pt-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-muted hover:bg-violet-600 hover:text-white rounded-lg transition-all duration-300 hover:-translate-y-1 text-muted-foreground"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Features Column */}
        <div>
          <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-violet-400 animate-pulse" /> Features
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/" className="text-muted-foreground hover:text-violet-400 transition-all duration-200">
                AI Problem Solver
              </Link>
            </li>
            <li>
              <Link href="/" className="text-muted-foreground hover:text-violet-400 transition-all duration-200">
                Interactive Visualizer
              </Link>
            </li>
            <li>
              <Link href="/" className="text-muted-foreground hover:text-violet-400 transition-all duration-200">
                Code Playground
              </Link>
            </li>
            <li>
              <Link href="/" className="text-muted-foreground hover:text-violet-400 transition-all duration-200">
                DSA Templates & Sheets
              </Link>
            </li>
          </ul>
        </div>

        {/* Info Column */}
        <div>
          <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">Resources</h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/" className="text-muted-foreground hover:text-violet-400 transition-all duration-200">
                Algorithm Roadmaps
              </Link>
            </li>
            <li>
              <Link href="/" className="text-muted-foreground hover:text-violet-400 transition-all duration-200">
                Concept Explorer
              </Link>
            </li>
            <li>
              <Link href="/" className="text-muted-foreground hover:text-violet-400 transition-all duration-200">
                DSA Chatbot Guide
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 border-t border-border/40 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <p>© {currentYear} AlgoSpark. All rights reserved.</p>
        <p className="flex items-center gap-1.5">
          Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for developers worldwide
        </p>
      </div>
    </footer>
  );
}
export default Footer;
