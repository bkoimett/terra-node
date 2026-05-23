# Hosting TerraNode

You have **three parts** to host:

| Part | What it is | Recommended service |
|------|------------|---------------------|
| **Database** | MongoDB | [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier) |
| **API** | Express on port 5000 | [Render](https://render.com), [Railway](https://railway.app), or [Fly.io](https://fly.io) |
| **Frontend** | React static files | Same server as API **or** Vercel / Netlify / Render Static Site |

For a **hackathon demo**, the fastest path is **Atlas + one Render web service** (API serves the built React app). No CORS headaches.

---

## Recommended: Atlas + Render (single URL)

One live link like `https://terranode.onrender.com` for judges.

### Step 1 — MongoDB Atlas (10 min)

1. Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).
2. Create a **free M0 cluster** (any cloud region close to you).
3. **Database Access** → Add user (username + password). Save the password.
4. **Network Access** → **Add IP Address** → **Allow Access from Anywhere** (`0.0.0.0/0`) for demos. Tighten this later for production.
5. **Database** → **Connect** → **Drivers** → copy the connection string.  
   Example:  
   `mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/terranode?retryWrites=true&w=majority`  
   Replace `USER`, `PASSWORD`, and ensure the database name is `terranode`.

### Step 2 — Push code to GitHub

```bash
cd terra-node
git add .
git commit -m "Prepare for deployment"
git push origin main
```

Render deploys from GitHub (or GitLab).

### Step 3 — Deploy on Render

1. [dashboard.render.com](https://dashboard.render.com) → **New** → **Web Service**.
2. Connect your `terra-node` repo.
3. Settings:

| Field | Value |
|-------|--------|
| **Name** | `terranode` |
| **Region** | Same as Atlas if possible |
| **Branch** | `main` |
| **Runtime** | Node |
| **Build Command** | `npm run install:all && npm run build:prod` |
| **Start Command** | `npm run start:prod` |
| **Plan** | Free |

4. **Environment variables** (Environment → Add):

| Key | Value |
|-----|--------|
| `NODE_ENV` | `production` |
| `SERVE_CLIENT` | `true` |
| `MONGODB_URI` | Your Atlas connection string |
| `CLIENT_URL` | `https://YOUR-SERVICE.onrender.com` (set after first deploy, then redeploy) |

5. **Create Web Service**. First deploy takes ~5–10 minutes.

6. Copy your public URL (e.g. `https://terranode-xxxx.onrender.com`), set `CLIENT_URL` to that exact URL (no trailing slash), **Save** and **Manual Deploy** once.

7. Open `https://YOUR-URL.onrender.com/api/health` — should return `{"status":"ok",...}`.

8. Open `https://YOUR-URL.onrender.com` — landing page with projects.

Projects auto-seed on first boot if the database is empty.

**Optional:** Or use the repo’s `render.yaml` → Render **New** → **Blueprint** and paste env vars when prompted.

### Step 4 — Free tier caveats

- Render free services **spin down after ~15 min idle**; first visit may take 30–60 seconds.
- In-memory MongoDB is **disabled** in production — Atlas is required.
- For a live demo, open the site once before presenting to wake it up.

---

## Alternative: Split frontend + API (two URLs)

Use this if you want the UI on Vercel and the API on Render.

### API (Render)

| Field | Value |
|-------|--------|
| Root Directory | `server` |
| Build Command | `npm install` |
| Start Command | `npm start` |

Env:

```
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
CLIENT_URL=https://your-app.vercel.app
```

Do **not** set `SERVE_CLIENT`.

### Frontend (Vercel or Netlify)

| Field | Value |
|-------|--------|
| Root Directory | `client` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

Env:

```
VITE_API_URL=https://your-api.onrender.com/api
```

Redeploy the frontend after the API URL is final.  
Set `CLIENT_URL` on the API to your Vercel URL exactly.

---

## Other hosts (quick notes)

| Host | Approach |
|------|----------|
| **Railway** | New project → deploy repo → set same env vars as Render → start command `npm run start:prod` with monolith build, or two services. |
| **Fly.io** | Dockerfile or `fly launch` in `server/`; attach Atlas URI. |
| **VPS (DigitalOcean, etc.)** | Install Node 18+, MongoDB or Atlas, `npm run build:prod`, run with `pm2` and nginx reverse proxy. |

---

## Environment variable reference

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | Yes (production) | Atlas connection string |
| `PORT` | Auto on Render | Host port (Render sets this) |
| `NODE_ENV` | `production` | Enables strict DB, no in-memory fallback |
| `SERVE_CLIENT` | `true` for single deploy | Serves `client/dist` from Express |
| `CLIENT_URL` | Yes | Frontend origin(s), comma-separated for multiple |
| `VITE_API_URL` | Split deploy only | Full API base, e.g. `https://api.example.com/api` |

---

## Verify after deploy

```bash
curl https://YOUR-URL.onrender.com/api/health
curl https://YOUR-URL.onrender.com/api/stats
```

In the browser:

1. Landing page loads with hero image.
2. Calculator returns numbers.
3. Projects list shows 8 Kenya projects.
4. Fund flow completes (simulated).

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Blank page, API works | Rebuild with `SERVE_CLIENT=true`; ensure `client/dist` exists after build. |
| CORS errors | `CLIENT_URL` must match the browser URL exactly (https, no trailing `/`). |
| `MongoDB required in production` | Set `MONGODB_URI`; check Atlas IP allowlist and password encoding (`@` → `%40`). |
| Data resets | You’re on in-memory DB locally — use Atlas in production. |
| Slow first load | Render free tier cold start — hit the site before your pitch. |

---

## Checklist before sharing the link

- [ ] Atlas cluster running, `MONGODB_URI` set
- [ ] `CLIENT_URL` matches live frontend URL
- [ ] `/api/health` returns OK
- [ ] Calculator + projects work in browser
- [ ] Open site once before demo (wake cold start)

For pitch talking points, see [PITCH.md](./PITCH.md).
