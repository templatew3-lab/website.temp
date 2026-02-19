/**
 * Mnk3ys — Holder portal & project config
 * Set your holder portal base URL and endpoints here.
 */

window.MNK3YS_CONFIG = {
  // Holder portal API base URL (no trailing slash). Leave empty to use mock data.
  holderPortalUrl: '',

  // Endpoints (relative to holderPortalUrl). Portal should return { nfts: number, token: string|number }.
  endpoints: {
    holdings: '/api/holdings',
    discordAuth: '/api/discord/auth',
  },

  // Discord login: leave empty to use same-origin /api/discord/auth (run server.js). Or set full URL to an external OAuth provider.
  discordConnectUrl: '',

  // Token contract (Solana mint address) — for verification / balance checks
  tokenMint: 'KMNo3nJsBXfcpJTVhZcXLW7RmTwTt4GVFE7suUBo9sS',

  // Collection addresses (optional — for NFT verification). Add first-creator or verified collection mints if your portal needs them.
  collections: {
    mnk3ys: 'https://magiceden.io/marketplace/mnk3ys',
    zmb3ys: 'https://magiceden.io/marketplace/zmb3ys',
  },
};
