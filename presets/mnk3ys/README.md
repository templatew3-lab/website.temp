# Mnk3ys preset

This folder preserves the full Mnk3ys project configuration so you can restore or copy from it.

**To restore the site to Mnk3ys branding:** copy `config.mnk3ys.js` into the project root as `js/config.js` (merge or replace the existing `window.MNK3YS_CONFIG` / project config so it matches this preset).

**Assets used by this preset:**
- `assets/logo.png` — project logo (sidebar, footer, nav)
- `assets/hero-bg.png` — hero background (desktop/landscape)
- `assets/hero-bg-portrait.png` — hero background (mobile portrait)
- Token logo: IPFS URL in config (`token.logoUrl`)

**Server (.env):** set `TOKEN_MINT`, `BLUNA_TOKEN_MINT`, collection mints, Discord, etc. as needed for Mnk3ys.
