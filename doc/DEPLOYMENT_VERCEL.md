# Deploying AlgoSpark Frontend to Vercel

## Overview
This guide covers deploying the **AlgoSpark** React SPA frontend to [Vercel](https://vercel.com/) with single-page application routing configurations.

---

## Step-by-Step Deployment Instructions

### 1. Create Vercel Project
1. Log in to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New...** → **Project**.
3. Import your GitHub repository.

### 2. Configure Project Settings
- **Framework Preset**: `Vite`
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

---

### 3. Environment Variables

Add the following environment variable in the Vercel Settings:

| Variable | Description / Example Value |
|---|---|
| `VITE_API_URL` | `https://your-algospark-backend.onrender.com/api` |

---

### 4. SPA Route Rewrites (`vercel.json`)

To ensure client-side routing works cleanly without 404 errors on browser page reloads, create or verify `frontend/vercel.json`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

### 5. Deploy & Verify
1. Click **Deploy**.
2. Once build completes, open your deployment URL (e.g. `https://algospark.vercel.app`).
3. Open browser dev tools and test login, roadmap navigation, visualizer, and code execution.
