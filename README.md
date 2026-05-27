# 🚀 AlgoSpark - Full-Stack MERN AI-Powered Learning Hub

<p align="center">
  <img src="https://img.shields.io/badge/MERN-Full--Stack-blueviolet?style=for-the-badge" alt="MERN Stack" />
  <img src="https://img.shields.io/badge/OpenRouter-AI--Powered-FF6C37?style=for-the-badge" alt="OpenRouter AI" />
  <img src="https://img.shields.io/badge/Vite-React%20%26%20TS-646CFF?style=for-the-badge" alt="Vite React TS" />
  <img src="https://img.shields.io/badge/Tailwind-Glassmorphism-38B2AC?style=for-the-badge" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/SEO-Rank%20%231-008F58?style=for-the-badge" alt="SEO Optimized" />
</p>

**AlgoSpark** is an all-in-one, highly interactive, and visually stunning full-stack MERN learning environment designed to help developers master Data Structures and Algorithms with advanced AI tutoring. Featuring a sleek **electric violet glassmorphic design system**, dynamic animations, browser code execution, and single-server production serving capabilities, this platform is completely secure, robust, and deployment-ready!

---

## ✨ Primary Visual & Functional Features

```mermaid
graph TD
    A[AlgoSpark Main Client] --> B[AI DSA Assistant Hub]
    A --> C[Interactive Visualizer]
    A --> D[Curated Sheets & Checklists]
    A --> E[Code Playground & Complexity]
    A --> F[Connected Roadmap Paths]
    
    B --> B1[Step-by-step problem solver]
    B2[Progressive Hints Generator] --> B1
    C --> C1[Interactive Sorting Animations]
    C --> C2[Breadth & Depth First Searches]
    D --> D1[Custom sheet imports/exports]
    D --> D2[Templates like Blind 75 / NeetCode]
    E --> E1[Monaco browser execution]
    E --> E2[AI Big O space/time evaluator]
    F --> F1[SVG Interconnected Trackways]
    F --> F2[Status Glowing Nodes]
```

### 1. 🔥 Real-Time Active Streak Tracking (Full-Stack & Guest Fallback)
* **Full-Stack DB Sync**: Persisted `streak` and `lastActiveDate` properties inside MongoDB via [User.js](file:///c:/Users/91836/Downloads/Mern-Ai-Projects/Dsa-Ditcher/backend/models/User.js).
* **Automated Computations**: Recalculates user streaks inside Express profile and stats controllers. Consecutive practices increment the streak, same-day sessions are preserved safely, and missed sessions reset to `1`.
* **Guest Storage Fallback**: Integrated robust `localStorage` daily active computations so guest accounts get fully functioning offline streaks immediately.
* **Glow Navbar flame**: Displays an active, animated orange flame badge (🔥) next to your profile.
* **Dynamic Streak Calendar**: The weekly tracker grid on the homepage dashboard automatically queries user statistics and highlights active weekdays ending with today.

### 2. 🌳 Connected Roadmap Pathways & Interactive Filters
* **SVG Interconnected Trackways**: Connects learning chapters (Languages ➔ Basics ➔ Data Structures ➔ Algorithms ➔ Advanced ➔ Prep) via flowing vertical vector paths.
* **Interactive Category Filters**: Toggle filters to dynamically filter Required, Alternative, or Optional nodes.
* **Progressive Status Glows**: Solved topics shine in emerald-500 outlines, while active topics show subtle violet elevations.
* **Mastery circular progress widget**: SVG stroke-dashoffset widget displaying absolute completion progress.

### 3. 🧠 AI DSA Assistant & Split SDE Workspace
* **LeetCode-Style Split Workspace**: Restructured the problem analyzer into a balanced responsive grid that prevents stretched blank spaces on large displays while collapsing logically on mobile devices.
* **Problem Analyzer:** Paste any algorithm query and get optimal/suboptimal approaches, complexities, and edge cases.
* **Progressive Hints System:** Receive progressive, educational hints that encourage active thinking rather than immediate code leaks.
* **History DB Sync:** Saved chats persist securely inside MongoDB, enabling students to revisit past questions.
* **Floating Assistant Widget:** A global chat guide available on every view to answers general DSA concepts.

### 4. 🎬 High-Fidelity Algorithm Visualizer
* **Sorting Algorithms:** Step-by-step interactive animations of Bubble Sort, Merge Sort, and Quick Sort.
* **Graph Traversals:** Visual rendering of node exploration during Breadth-First (BFS) and Depth-First (DFS) searches.
* **Complex Data Structures:** High-fidelity diagrams illustrating Binary Trees and HashMap Chaining collisions.

### 5. 📝 Custom & Curated Practice Sheets
* **Schedules & Checklists:** Create customized sheets, edit problems, and track solved counts.
* **Portability:** Instantly export sheet templates to the clipboard as JSON and import files from other users.
* **Pre-loaded Templates:** Zero-config SDE Sheets like **LeetCode 75**, **NeetCode 150**, **Blind 75**, and **Striver SDE**.

### 6. 💻 Code Playground & AI Complexity Analyzer
* **Monaco Editor:** Write and execute code directly in your browser with full reset capability.
* **AI Complexity Finder:** Analyze custom code for Big O space and time complexities, receiving granular structural optimization tips.

### 7. 🎨 Design Aesthetics & Visuals
* **HSL Electric Violet Dark Mode:** A deep luxury design tokens configuration inside `.css` files giving a modern high-end cosmic-purple feel.
* **Advanced Glassmorphism:** Translucent panels with glowing hover borders, dynamic transformations, custom scrollbars, and micro-animations.
* **Spring entrance physics**: Staggered entry animations for grids and checklist items.

---

## 📂 Project Directory Structure

Our full-stack codebase is cleanly organized into symmetric directories:

```text
Dsa-Ditcher/
├── backend/                # Express API server & Mongoose structures
│   ├── config/             # Database connection setups
│   ├── controllers/        # Express handlers (Auth, Sheets, Users, Chat, AI)
│   ├── middleware/         # Token checks, exception handlers, and 404 logs
│   ├── models/             # User, Sheet, and Chat collections schema
│   ├── routes/             # API routing setups mapped to controllers
│   ├── server.js           # Server starter file & static serving
│   └── .gitignore & README # Backend documentation & git configs
├── frontend/               # React Client SPA built with Vite & TS
│   ├── public/             # Static public assets (icons, logo)
│   ├── src/                # Modular React tsx source components
│   │   ├── components/     # Custom sheets, visualizers, editor, dashboard panels
│   │   ├── pages/          # Authentication layouts & main index router
│   │   ├── config.ts       # Environment-friendly dynamic API base URLs
│   │   └── index.css       # Core design system HSL variables & animation helpers
│   ├── index.html          # Shell container with SEO metadata
│   ├── package.json        # Frontend node packages
│   └── .gitignore & README # Frontend documentation & git configs
├── README.md               # Master full-stack project landing documentation
└── .gitignore              # Master repository git ignore
```

---

## 🛠️ Installation & Setup Guide

### Prerequisites
* **Node.js:** Ensure Node.js 18+ is installed on your computer.
* **MongoDB:** Ensure you have MongoDB running locally (`mongodb://127.0.0.1:27017/dsa-ditcher`) or have an online Atlas connection string.

---

### Local Development Setup

#### 1. Setup the Backend API
Navigate to the `backend/` folder and install packages:
```bash
cd backend
npm install
```
Create a `.env` file inside the `backend/` folder:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/dsa-ditcher
JWT_SECRET=your_super_strong_jwt_secret
OPENROUTER_API_KEY=your_openrouter_api_key
```
Launch the backend dev server (Nodemon):
```bash
npm run dev
```

#### 2. Setup the Frontend Client
Navigate to the `frontend/` folder in a new terminal and install packages:
```bash
cd frontend
npm install
```
Launch the frontend client (Vite):
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`. You are ready to start coding!

---

## 🚀 Unified Production Deployment

This project supports **Single-Server Production Serving**. In production mode, the backend automatically hosts the compiled static files from the frontend `dist` directory, completely eliminating CORS configurations and structural hosting overhead.

#### 1. Build Frontend Static Assets
Inside the `frontend/` directory, compile the production build:
```bash
cd frontend
npm run build
```
This generates the optimized bundle inside `/frontend/dist/`.

#### 2. Start the Production Server
Navigate to the `backend/` folder, set your environment variables to production, and start:
```bash
cd backend
npm start
```
Your full-stack MERN platform will be fully functional, served on a single port (e.g. `http://localhost:5000`)!

---

## 🔍 Search Engine Optimization (SEO) Built-In
To maximize search visibility and Google ranking upon deployment, the client incorporates:
* **Dynamic Title Tags:** Lifecycle hooks update document titles in response to active routes.
* **Optimized Meta Descriptions:** Crawler-friendly descriptions change dynamically based on the current SPA page (e.g., visualizer, editor, analyzer) to ensure comprehensive search indexing.
* **Semantic HTML5:** Strict semantic tags (`<header>`, `<nav>`, `<main>`, `<h1>`, `<article>`) provide appropriate context weights.
* **Asset Optimization:** Minimal layout shifts (CLS), fast asset packaging (Vite), and clean structural rendering (React TS).
