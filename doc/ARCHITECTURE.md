# AlgoSpark System Architecture & Developer Guide

## Overview

**AlgoSpark (DSA-Ditcher)** is an enterprise-grade full-stack MERN AI-powered learning hub built with React, TypeScript, Vite, Node.js (Native ES Modules), Express 5, MongoDB Atlas, and OpenRouter AI. It features an electric violet dark mode visual system, connected SVG roadmap trackways, a browser Monaco editor with Big O complexity analysis, dynamic 3D flashcards, interactive algorithm visualizers, and a zero-crash AI fallback system.

---

## Directory Structure

```text
Dsa-Ditcher/
├── backend/                    # Express API Server (Native ES Modules)
│   ├── config/                 # Mongoose DB connection setup (db.js)
│   ├── controllers/            # Controller logic (ai, auth, chat, sheet, user)
│   ├── middleware/             # JWT auth, error handlers, rate limiters, validation
│   ├── models/                 # Mongoose schemas (User.js, Sheet.js, Chat.js)
│   ├── routes/                 # Express API routes (aiRoutes, authRoutes, chatRoutes, sheetRoutes, userRoutes)
│   ├── validations/            # Schema validation rules (aiValidation, authValidation, etc.)
│   ├── server.js               # Entrypoint & static production serving
│   └── .env                    # Environment variable configuration
├── doc/                        # Comprehensive platform documentation
│   ├── API_FLOW.md             # API catalog, middleware pipeline & fallback flow
│   ├── ARCHITECTURE.md         # System architecture & developer guide
│   ├── CASE_STUDY.md           # Engineering case studies
│   ├── DEPLOYMENT_RENDER.md    # Render backend & fullstack deployment
│   ├── DEPLOYMENT_VERCEL.md    # Vercel frontend deployment
│   ├── DEPLOYMENT_NETLIFY.md   # Netlify frontend deployment
│   ├── OPERATIONS.md           # Maintenance & operations guide
│   ├── PRODUCTION_READINESS.md # Security, performance & resilience audit
│   └── PROJECT_DEEP_DIVE.md    # Feature mechanics & implementation details
├── frontend/                   # React Client SPA (Vite + TypeScript)
│   ├── src/
│   │   ├── components/         # Feature components (Dashboard, Roadmap, ProblemAnalyzer, Visualizations, etc.)
│   │   ├── config.ts           # Dynamic API base URL resolver
│   │   ├── index.css           # HSL Electric Violet theme design tokens & animations
│   │   └── pages/              # Index router & auth views (Login, Signup, NotFound)
│   ├── index.html              # HTML shell with SEO metadata
│   └── package.json            # Client dependencies
├── algospark_banner.png        # Official project visual banner
└── README.md                   # Repository landing README
```

---

## Architecture Principles

### 1. Native ES Modules (ESM) Backend Architecture
The backend is structured natively with `import` / `export` statements rather than legacy `require` / `module.exports`:
- **Absolute Environment Resolution**: `dotenv.config({ path: path.join(__dirname, '.env'), override: true })` ensures environment configurations load cleanly regardless of current working directory execution.
- **Frontend-Backend Parity**: Identical module syntax across React and Node.js codebases eliminates developer context switching.
- **Boot Performance**: Static ES import loading enables engine-level pre-parsing for faster bootstrap times.

### 2. Dual-Engine AI Architecture (100% Uptime Guarantee)
Every AI feature request (problem analysis, chat guide, complexity detection) is routed through a resilient gateway loop:
- **Primary Tier (OpenRouter API)**: Cascading fallback models (`google/gemini-2.0-flash`, `google/gemini-flash-1.5`, `meta-llama/llama-3.3-70b-instruct:free`).
- **Secondary Tier (Local AST & Mentoring Sandbox)**: Native regex AST parser (`localComplexityAnalysis`) and static rule engine (`localChatFallback`) intercept API timeouts (12s+), expired keys (401/403), or quota exhaustion, guaranteeing zero 500 server crashes.

### 3. Electric Violet HSL Visual System & Micro-Animations
The UI implements an electric violet glassmorphic design system in `frontend/src/index.css`:
- **HSL Tokens**: Tailored color variables (`--background`, `--card`, `--primary`, `--ring`, `--violet-glow`) providing deep cosmic-purple luxury aesthetic.
- **Glassmorphism**: Translucent container backdrops with multi-layer background blur and glowing hover borders.
- **Interactive Micro-Animations**: Smooth 3D card flips for learning flashcards, spring entrance physics, dynamic glow badges, and SVG bezier connectors.

### 4. Full-Stack & Guest Active Streak Tracking
Streak data is managed seamlessly across guest and logged-in states:
- **Database Persistence**: `User` Mongoose model tracks `streak` and `lastActiveDate`.
- **Automatic Recalculation**: Controller logic evaluates active date thresholds on user actions, advancing consecutive daily streaks and resetting missed days.
- **Guest Fallback**: `localStorage` computation allows offline guests to maintain active practice streaks immediately without forcing login barriers.

### 5. Unified Production Serving Architecture
In production mode (`NODE_ENV=production`), `server.js` serves static compiled client bundles directly from `frontend/dist`:
- **Single Port Delivery**: Eliminates CORS configurations in production.
- **SPA Routing Fallback**: Non-API GET routes rewrite automatically to `index.html`.

---

## Deployment Summary

| Component | Target Platform | Build Command | Output Path / Entry |
|---|---|---|---|
| Full-Stack MERN | Render / Heroku / AWS | `cd frontend && npm install && npm run build && cd ../backend && npm install` | `backend/server.js` |
| Frontend SPA | Vercel / Netlify | `npm run build` | `frontend/dist` |
| Backend API | Render / Railway / Fly.io | `npm install` | `backend/server.js` |
