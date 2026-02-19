# Using this repo as a template for another project

This codebase is a **config-driven template**. The same HTML/CSS/JS and server run for any project; project-specific content comes from **`js/config.js`** (and server env).

## You don’t lose Mnk3ys

- **Full Mnk3ys config** is saved in **`presets/mnk3ys/`**. To restore or copy from it, merge `presets/mnk3ys/config.mnk3ys.js` into `js/config.js` (and use the same assets).
- With the default `js/config.js` (Mnk3ys values), the site looks and behaves exactly as your current Mnk3ys site.

## To spin up a new project

1. **Copy the repo** (or use this repo as the starting point).

2. **Set project config**  
   Edit **`js/config.js`** and replace values for:
   - `projectName`, `tagline`, `logoUrl`
   - `social.x`, `social.discord`
   - `token` (name, symbol, logoUrl, priceLabel, chartLabel, summaryText)
   - `hero` (title, tagline, subtitle; optionally backgroundImage paths)
   - `footerCopy`
   - `partnersLead`, `partnersPlaceholder`
   - `holdingsLabels`, `holdersLead`, `holdersSortOptions` (match your token + collection names/slugs)
   - `team` (array of `{ xProfileUrl, discordId, description }`)
   - `tokenMint`, `collections` (and any holder portal URLs if you use them)

   Or start from **`presets/template/config.template.js`**: copy its contents into `js/config.js` and then edit.

3. **Replace assets**
   - `assets/logo.png` — project logo (sidebar, footer, nav).
   - `assets/hero-bg.png` and `assets/hero-bg-portrait.png` — hero backgrounds (or point `hero.backgroundImage` / `hero.backgroundImagePortrait` to your paths and ensure they’re served).
   - Token logo: set `token.logoUrl` in config (e.g. `assets/token.png` or an IPFS URL).

4. **Server / env**
   - `.env`: set `TOKEN_MINT` (or `BLUNA_TOKEN_MINT`), `DISCORD_CLIENT_ID`, `DISCORD_CLIENT_SECRET`, `SESSION_SECRET`, `BASE_URL`, and optionally `HELIUS_API_KEY`, `BIRDEYE_API_KEY`, collection mints for your collections.
   - In **`server.js`**, the list of collections (slugs and names) is built from env or you can change the `COLLECTIONS` array to match your project (same keys as in config `holdingsLabels` / `holdersSortOptions` so labels stay in sync).

5. **Optional**
   - **Shop link:** If you use a shop URL, add e.g. `shopUrl: 'https://...'` to config and in `applyProjectConfig()` show the Shop nav link and set its `href`.
   - **Utilities section:** Content is still in HTML; you can later drive it from config (e.g. `utilities: [{ title, description, url }]`) or leave as-is and edit the HTML per project.

## Config fields reference

| Field | Purpose |
|-------|--------|
| `projectName` | Site title, sidebar brand, footer, hero |
| `tagline` | Hero tagline |
| `logoUrl` | Logo image (sidebar, footer, collections nav) |
| `social.x`, `social.discord` | Sticky + footer social links |
| `token.*` | Token name, symbol, logo, price/chart labels, summary text |
| `hero.*` | Hero title, tagline, subtitle, background images |
| `footerCopy` | Footer text next to logo |
| `partnersLead`, `partnersPlaceholder` | Partners section copy |
| `holdingsLabels` | Labels for token + each collection in “Your holdings” and holders table |
| `holdersLead`, `holdersSortOptions` | Holders section lead and sort dropdown labels |
| `team` | Team cards (xProfileUrl, discordId, description) |
| `tokenMint`, `collections` | Verification / API (and server env) |

The app calls **`applyProjectConfig()`** on load and fills the page from this config.
