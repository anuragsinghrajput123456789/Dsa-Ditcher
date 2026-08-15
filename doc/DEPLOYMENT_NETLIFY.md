# Deploying AlgoSpark Frontend to Netlify

## Overview
This guide details deploying the **AlgoSpark** React SPA frontend to [Netlify](https://www.netlify.com/) with build optimizations and dynamic redirect handling.

---

## Step-by-Step Deployment Instructions

### 1. Create Netlify Site
1. Log in to your [Netlify App Dashboard](https://app.netlify.com/).
2. Click **Add new site** → **Import an existing project**.
3. Authenticate with GitHub and select your repository.

### 2. Configure Build Settings
- **Base directory**: `frontend`
- **Build command**: `npm run build`
- **Publish directory**: `frontend/dist`

---

### 3. SPA Client Redirect Rules (`_redirects` / `netlify.toml`)

Netlify requires SPA redirect configuration to route all incoming HTTP requests to `index.html`.

#### Option A: `frontend/public/_redirects` File
Create a file named `_redirects` inside `frontend/public/`:
```text
/*    /index.html   200
```

#### Option B: `frontend/netlify.toml` File
Create `netlify.toml` in `frontend/`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### 4. Environment Variables Configuration

In Netlify Site Configuration → **Environment variables**:

| Key | Value |
|---|---|
| `VITE_API_URL` | `https://your-algospark-backend.onrender.com/api` |

---

### 5. Trigger Deployment
1. Click **Deploy site**.
2. Monitor build progress under **Deploys**.
3. Verify live URL and test SPA navigation across problem sheets, custom roadmaps, and Monaco editor playgrounds.
