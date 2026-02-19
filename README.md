# Mnk3ys

NFT + Token site with wallet connect and **Discord login**.

## Run with Discord login

1. **Install and configure**

   ```bash
   cd Mnk3ys
   npm install
   cp .env.example .env
   ```

2. **Discord application**

   - Go to [Discord Developer Portal](https://discord.com/developers/applications) → New Application.
   - **OAuth2 → Redirects**: add:
     - Local: `http://localhost:3000/api/discord/callback`
     - Production: `https://yourdomain.com/api/discord/callback`
   - Copy **Application ID** → `DISCORD_CLIENT_ID` in `.env`.
   - **OAuth2 → General**: reset **Client Secret** and copy → `DISCORD_CLIENT_SECRET` in `.env`.

3. **Environment (`.env`)**

   - `BASE_URL` = your app URL (e.g. `http://localhost:3000` or `https://mnk3ys.example.com`).
   - `SESSION_SECRET` = long random string (e.g. 32+ chars).

4. **Start server**

   ```bash
   npm start
   ```

   Open `http://localhost:3000`. Use **Connect Discord** to sign in; after callback the button shows **Log out (username)**.

## Deploy to Vercel

1. Push the repo to GitHub (e.g. `templatew3-lab/website.temp`).
2. In [Vercel](https://vercel.com), **Add New Project** → Import the repo.
3. **Framework Preset**: set to **Other** (so Vercel serves static files from root; do not use Express).
4. **Root Directory**: leave default (project root).
5. **Environment Variables** (Project Settings → Environment Variables): add the same vars as in `.env`:
   - `BASE_URL` = your Vercel URL, e.g. `https://website-temp-xxx.vercel.app` (or your custom domain). Required for Discord OAuth redirect.
   - `SESSION_SECRET` = long random string.
   - `DISCORD_CLIENT_ID`, `DISCORD_CLIENT_SECRET` (if using Discord login).
   - `HELIUS_API_KEY`, `BLUNA_TOKEN_MINT`, `MNK3YS_COLLECTION_MINT`, `ZMB3YS_COLLECTION_MINT` (for collections/holders/verify).
   - `BIRDEYE_API_KEY` (optional, for BLUNANA 15m chart).
   - `DISCORD_BOT_TOKEN` (optional, for **Team** section: fetches Discord username and avatar by ID). Create a Bot in your Discord app, copy token.
6. In Discord Developer Portal, add the production redirect: `https://<your-vercel-url>/api/discord/callback`.
7. Deploy. The app runs at **/** (static from root + serverless `/api/*`). `/Mnk3ys` and `/Mnk3ys/` redirect to `/`.

## Team section

Edit `js/config.js` and set `team` to an array of objects:

- **xProfileUrl** — X (Twitter) profile URL (e.g. `https://x.com/username`). Used for the link and to show the handle (e.g. @username).
- **discordId** — Discord user ID (numeric string). The site fetches username and avatar from Discord (requires `DISCORD_BOT_TOKEN` in env).
- **description** — Short role or bio (plain text).

Example: `team: [ { xProfileUrl: 'https://x.com/jane', discordId: '123456789012345678', description: 'Lead dev' } ]`

## Run without backend (static only)

Serve the folder with any static server (e.g. `python3 -m http.server 8080`). Discord login will be disabled unless you set `discordConnectUrl` in `js/config.js` to an external OAuth URL.

## Discord flow

- **Connect Discord** → `GET /api/discord/auth` → redirects to Discord → user authorizes → `GET /api/discord/callback` → session set → redirect to `/?discord=connected`.
- **Log out** → button click sends `POST /api/discord/logout` and clears session.
- **On load** → frontend calls `GET /api/discord/me` (with cookies) to show connected state.
