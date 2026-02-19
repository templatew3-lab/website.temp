/**
 * Mnk3ys preset — full project config. Copy into js/config.js (merge into window.MNK3YS_CONFIG / project) to restore Mnk3ys site.
 */
module.exports = {
  // ——— Brand ———
  projectName: 'MNK3YLABS',
  tagline: 'STRONGER TOGETHER',
  logoUrl: 'assets/logo.png',

  // ——— Social ———
  social: {
    x: 'https://x.com/mnk3ylabs',
    discord: 'https://discord.gg/sKeVmR3',
  },
  shopUrl: 'https://mnk3ylabs.printify.me/',

  // ——— Token (project token) ———
  token: {
    name: 'Blunana',
    symbol: 'BLUNANA',
    logoUrl: 'https://ipfs.io/ipfs/QmTKRAZEcTfDeVDt8hebrCv27DctYghtdfXRMc9FRA6NU3',
    priceLabel: 'Blunana (BLUNANA / USD)',
    chartLabel: 'BLUNANA / USD — 15m',
    summaryText: 'MNK3YLABS project token. Verify holdings in the dashboard.',
  },

  // ——— Hero ———
  hero: {
    title: 'MNK3YLABS',
    tagline: 'STRONGER TOGETHER',
    subtitle: 'Make NFTs Ape Again. NFT collections & project token on Solana.',
    backgroundImage: 'assets/hero-bg.png',
    backgroundImagePortrait: 'assets/hero-bg-portrait.png',
  },

  // ——— Footer ———
  footerCopy: 'MNK3YLABS · Make NFTs Ape Again.',

  // ——— Partners ———
  partnersLead: 'Platforms and tools integrated with MNK3YLABS.',
  partnersPlaceholder: 'Adding soon',

  // ——— Holders (labels for token + collections; order must match server collections) ———
  holdingsLabels: {
    token: 'Blunana',
    mnk3ys: 'MNK3YS',
    zmb3ys: 'ZMB3YS',
    totalNfts: 'Total NFTs',
  },
  holdersLead: 'Top holders by Blunana token and NFT collections.',
  holdersSortToken: 'Blunana token',
  holdersSortMnk3ys: 'MNK3YS NFTs',
  holdersSortZmb3ys: 'ZMB3YS NFTs',

  // ——— Holder portal & API ———
  holderPortalUrl: '',
  endpoints: { holdings: '/api/holdings', discordAuth: '/api/discord/auth' },
  discordConnectUrl: '',
  tokenMint: 'KMNo3nJsBXfcpJTVhZcXLW7RmTwTt4GVFE7suUBo9sS',
  collections: {
    mnk3ys: 'https://magiceden.io/marketplace/mnk3ys',
    zmb3ys: 'https://magiceden.io/marketplace/zmb3ys',
  },

  // ——— Team ———
  team: [
    { xProfileUrl: 'https://x.com/deano_sol', discordId: '890995564949434468', description: 'Founder & artist' },
    { xProfileUrl: 'https://x.com/GrandFracton', discordId: '978993938318897203', description: 'Community manager' },
  ],
};
