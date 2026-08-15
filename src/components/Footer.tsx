import Link from "next/link";
import { Code2, Github, Sparkles, Heart, Cpu } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[rgba(139,92,246,0.18)] bg-[#05030D]/90 backdrop-blur-xl py-10 mt-16 text-xs text-[#B8B1CC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Column */}
        <div className="md:col-span-2 space-y-3">
          <Link href="/" className="flex items-center space-x-3 group w-fit">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 via-purple-600 to-magenta-500 p-0.5 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              <div className="w-full h-full bg-[#0E0A1F] rounded-[10px] flex items-center justify-center">
                <Code2 className="w-4 h-4 text-violet-400" />
              </div>
            </div>
            <span className="text-base font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-200 to-purple-400">
              AlgoSpark Laboratory
            </span>
          </Link>
          <p className="text-xs text-[#B8B1CC] leading-relaxed max-w-sm">
            An advanced AI-powered DSA learning laboratory. Master data structures, visualize step-by-step state machine algorithms, and practice interview patterns.
          </p>
          <div className="flex items-center space-x-3 pt-1">
            <a
              href="https://github.com/anuragsinghrajput123456789/algo-spark-guide"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-[#0E0A1F] border border-violet-500/20 hover:border-violet-500/50 hover:text-white rounded-xl transition-all text-[#B8B1CC]"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Features Column */}
        <div>
          <h3 className="text-xs font-bold text-white tracking-wider uppercase mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" /> Modules
          </h3>
          <ul className="space-y-2">
            <li className="hover:text-violet-300 transition-colors">AI Problem Workbench</li>
            <li className="hover:text-violet-300 transition-colors">Algorithm Visualizers</li>
            <li className="hover:text-violet-300 transition-colors">Monaco Code Playground</li>
            <li className="hover:text-violet-300 transition-colors">Curated SDE Sheets</li>
          </ul>
        </div>

        {/* Info Column */}
        <div>
          <h3 className="text-xs font-bold text-white tracking-wider uppercase mb-3 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Architecture
          </h3>
          <ul className="space-y-2">
            <li className="hover:text-violet-300 transition-colors">Connected SVG Roadmap</li>
            <li className="hover:text-violet-300 transition-colors">3D Flashcard Deck</li>
            <li className="hover:text-violet-300 transition-colors">OpenRouter Multi-AI Cascade</li>
            <li className="hover:text-violet-300 transition-colors">Vercel Serverless Connection</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-violet-500/15 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#77708D]">
        <p>© {currentYear} AlgoSpark AI Laboratory. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Crafted with <Heart className="w-3 h-3 text-magenta-500 fill-magenta-500" /> for developers worldwide
        </p>
      </div>
    </footer>
  );
}
export default Footer;
