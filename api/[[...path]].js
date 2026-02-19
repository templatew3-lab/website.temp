/**
 * Vercel serverless catch-all: all requests rewritten here. Restore original path for Express.
 */
const app = require('../server');

module.exports = (req, res) => {
  // Rewrite "/(.*)" → "/api/[[...path]]" so we get req.url like /api, /api/css/x, /api/api/collections. Restore original path.
  let u = (req.url || '').split('?')[0];
  const q = (req.url || '').includes('?') ? '?' + (req.url || '').split('?').slice(1).join('?') : '';
  if (u.startsWith('/api/')) {
    u = u.slice(4) || '/';  // /api/ → /, /api/css/x → /css/x, /api/api/collections → /api/collections
  } else if (u === '/api') {
    u = '/';
  }
  req.url = (u || '/') + q;
  return app(req, res);
};
