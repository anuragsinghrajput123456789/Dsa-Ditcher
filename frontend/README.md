# 🎨 DSA Ditcher - React/TypeScript Frontend Client

This is the interactive frontend client of the full-stack MERN application, **DSA Ditcher**. It provides an engaging, beautiful, responsive, and fully animated single-page application (SPA) layout for mastering Data Structures and Algorithms with AI assistance.

---

## 🚀 Key Technologies & Visual Ecosystem
* **Vite & React (TypeScript):** Modern, strict type-safe modular structures with high-speed compilation.
* **Luxury Dark Theme & Glassmorphism:** Overhauled design token system inside `src/index.css` supporting electric violet glow filters, backdrop blur modifiers, and dynamic hover cards.
* **Lucide Icons:** Clean, consistent, and beautiful micro-animations using standard modern visual indicators.
* **Monaco Editor:** Integrated advanced code editing playground supporting styling, resetting, and executing code.
* **Recharts:** High-performance, fully responsive charts for progress visualizations.
* **Dynamic SPA SEO Engine:** Integrated dynamic document title and description hooks targeting bots and crawlers for high Google search visibility.

---

## 📂 Frontend File Architecture
```text
frontend/
├── public/                 # Static public assets (icons, images)
├── src/
│   ├── components/         # Modular interface components
│   │   ├── ui/             # shadcn reusable basic UI components
│   │   ├── dsa-sheet/      # Sheet form, listing, and templates
│   │   ├── playground/     # Monaco editors, complexity finds, output boxes
│   │   ├── resources/      # Resource listings & forms
│   │   ├── roadmap/        # Timeline flows, CRUD panels, progress bars
│   │   ├── Chatbot.tsx     # Global floating assistant widget
│   │   ├── Dashboard.tsx   # Dashboard welcome cards, timer, & achievements
│   │   ├── DsaSheetManager.tsx # Main Custom & Curated sheets controller
│   │   ├── ProblemAnalyzerEnhanced.tsx # Core problem explanation panel
│   │   └── VisualizationsFixed.tsx # Sorting/Searching interactive loops
│   ├── data/               # Curated templates & roadmap structures
│   ├── hooks/              # toast hooks and reactive utilities
│   ├── integrations/       # API configuration helpers
│   ├── lib/                # tailwind-merge & clsx style utilities
│   ├── pages/              # Main routing views (Login, Signup, NotFound)
│   ├── config.ts           # Centralized environment API config
│   ├── main.tsx            # Main root compiler mounting
│   ├── index.css           # Global custom classes & HSL design tokens
│   └── App.tsx             # Theme and query router wrappers
├── index.html              # HTML shell & master meta headers
├── package.json            # Client packages & dependency lists
└── [configs...]            # Vite, Tailwind, ESList, TS configurations
```

---

## ⚡ Setup & Run

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Launch dev environment (with hot-reload):**
   ```bash
   npm run dev
   ```
3. **Compile production build:**
   ```bash
   npm run build
   ```
   This generates optimized, production-ready static assets inside the `dist/` directory, ready to be hosted or served directly by your Express backend!
