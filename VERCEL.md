# Deploy TerraNode on Vercel

One Vercel project hosts **both** the React app and the Express API:

| Path | Served by |
|------|-----------|
| `/` | Static React (`client/dist`) |
| `/api/*` | Serverless Express (`api/index.js`) |

You still need **MongoDB Atlas** (Vercel does not run a database).

---

## Quick deploy (5 steps)

### 1. MongoDB Atlas

1. Create a free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).
2. Add a DB user and allow network access (`0.0.0.0/0` for demos).
3. Copy the connection string:  
   `mongodb+srv://USER:PASS@cluster0.xxx.mongodb.net/terranode?retryWrites=true&w=majority`

### 2. Push to GitHub

Ensure `vercel.json`, `api/index.js`, and `server/src/app.js` are committed.

### 3. Import on Vercel

1. [vercel.com/new](https://vercel.com/new) → import your repo.
2. Vercel should detect settings from `vercel.json` automatically:
   - **Build Command:** `npm run build:vercel`
   - **Output Directory:** `client/dist`
   - **Install Command:** `npm run install:all`
3. Do **not** override the framework preset to Next.js — this is a Vite + API project.

### 4. Environment variables

In **Project → Settings → Environment Variables**, add (all environments: Production, Preview, Development):

| Name | Value |
|------|--------|
| `MONGODB_URI` | Your Atlas connection string |
| `CLIENT_URL` | `https://YOUR-PROJECT.vercel.app` (update after first deploy) |
| `NODE_ENV` | `production` |

`VITE_API_URL=/api` is set in `vercel.json` at build time — no extra step needed.

### 5. Deploy and verify

1. Deploy → copy your URL.
2. Set `CLIENT_URL` to `https://that-exact-url.vercel.app` (no trailing `/`).
3. **Redeploy** (Deployments → ⋯ → Redeploy).
4. Test:
   - `https://YOUR-URL.vercel.app/api/health`
   - `https://YOUR-URL.vercel.app` (landing + projects)

First API call may take a few seconds (cold start + DB connect). Projects auto-seed if the database is empty.

---

## Local Vercel simulation

```bash
npm i -g vercel
npm run install:all
# Add MONGODB_URI to server/.env or pull env from Vercel:
vercel env pull .env.local
vercel dev
```

Open the URL shown by `vercel dev` (usually `http://localhost:3000`).

---

## Project files for Vercel

| File | Purpose |
|------|---------|
| `vercel.json` | Build, rewrites, API function config |
| `api/index.js` | Serverless wrapper around Express |
| `server/src/app.js` | Express app + DB init (shared with local server) |
| `.env.vercel.example` | Env var template |

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| 404 on `/api/health` | Confirm `api/index.js` exists; check Deployment logs for build errors. |
| 500 on API | Set `MONGODB_URI`; check Atlas IP allowlist; URL-encode special chars in password. |
| CORS errors | With Vercel, UI and API share one domain — use `VITE_API_URL=/api`. Clear cache. |
| Blank page | Check build logs; ensure `client/dist` is produced. |
| `FUNCTION_INVOCATION_FAILED` | Atlas unreachable or cold start timeout; retry; check Function logs. |
| Preview branch broken | Set `CLIENT_URL` to include preview URL or rely on auto `VERCEL_URL` in CORS. |

---

## Limits (free tier)

- Serverless function **max duration** 30s (configured in `vercel.json`).
- Cold starts on first request after idle.
- MongoDB Atlas M0 free tier is sufficient for demos.

For Render monolith hosting instead, see [DEPLOY.md](./DEPLOY.md).
