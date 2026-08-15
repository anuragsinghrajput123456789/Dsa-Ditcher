# Deploying AlgoSpark Backend & Full-Stack to Render

## Overview
This guide details deploying **AlgoSpark (DSA-Ditcher)** to [Render](https://render.com/) Web Services with MongoDB Atlas database integration.

---

## Step-by-Step Deployment Instructions

### 1. Create Render Web Service
1. Log in to your [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** → **Web Service**.
3. Connect your GitHub repository (`anuragsinghrajput123456789/algo-spark-guide` or your repository fork).

### 2. Service Settings

#### Option A: Unified Full-Stack Deployment (Recommended)
Builds frontend static assets and serves them directly from Express:
- **Name**: `algospark-fullstack`
- **Root Directory**: Leave blank (repo root)
- **Environment**: `Node`
- **Region**: Select the region closest to your users.
- **Branch**: `main`
- **Build Command**: `cd frontend && npm install && npm run build && cd ../backend && npm install`
- **Start Command**: `cd backend && npm start`

#### Option B: Backend API Only Deployment
Serves API endpoints to a separate frontend host (Vercel/Netlify):
- **Name**: `algospark-backend`
- **Root Directory**: `backend`
- **Environment**: `Node`
- **Region**: Select region closest to your users.
- **Branch**: `main`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

---

### 3. Environment Variables Configuration

Configure the following variables in the **Environment** tab:

| Variable | Description / Recommended Value |
|---|---|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `MONGO_URI` | `mongodb+srv://user:pass@cluster0.mongodb.net/dsa-ditcher?retryWrites=true&w=majority` |
| `JWT_SECRET` | Secret key (minimum 32 random characters) |
| `OPENROUTER_API_KEY` | `sk-or-v1-...` (Optional: AI sandbox fallback activates if omitted) |
| `ALLOWED_ORIGINS` | `https://your-app.vercel.app,https://your-app.netlify.app` |

---

### 4. Health Check Configuration
In **Advanced Settings**:
- **Health Check Path**: `/` (or `/api/auth/login` health probe)

---

### 5. Deployment Verification
1. Click **Create Web Service**.
2. Monitor build logs in Render console.
3. Once live, open your service URL (`https://algospark.onrender.com/`).
