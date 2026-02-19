/**
 * Project config — edit this file for your project.
 * All site copy, logos, and URLs are driven from here.
 */
window.MNK3YS_CONFIG = {
  projectName: 'Your Project',
  tagline: 'Your Tagline',
  logoUrl: 'assets/logo.png',

  social: {
    x: 'https://x.com/yourproject',
    discord: 'https://discord.gg/yourserver',
  },
  shopUrl: '',

  token: {
    name: 'Your Token',
    symbol: 'TKN',
    logoUrl: 'assets/token.png',
    priceLabel: 'Your Token (TKN / USD)',
    chartLabel: 'TKN / USD — 15m',
    summaryText: 'Your project token. Verify holdings in the dashboard.',
  },

  hero: {
    title: 'Your Project',
    tagline: 'Your Tagline',
    subtitle: 'Short description. NFT collections & project token on Solana.',
    backgroundImage: 'assets/hero-bg.png',
    backgroundImagePortrait: 'assets/hero-bg-portrait.png',
  },

  footerCopy: 'Your Project · Your tagline.',
  partnersLead: 'Platforms and tools integrated with this project.',
  partnersPlaceholder: 'Adding soon',

  holdingsLabels: {
    token: 'Token',
    mnk3ys: 'Collection 1',
    zmb3ys: 'Collection 2',
    totalNfts: 'Total NFTs',
  },
  holdersLead: 'Top holders by token and NFT collections.',
  holdersSortOptions: {
    token: 'Token',
    mnk3ys: 'Collection 1 NFTs',
    zmb3ys: 'Collection 2 NFTs',
  },

  holderPortalUrl: '',
  endpoints: { holdings: '/api/holdings', discordAuth: '/api/discord/auth' },
  discordConnectUrl: '',
  tokenMint: '',
  collections: {},

  team: [],
};
