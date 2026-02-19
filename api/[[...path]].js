/**
 * Vercel serverless catch-all: requests under /Mnk3ys are rewritten here. Strip base path for Express.
 */
const app = require('../server');

const BASE = '/Mnk3ys';

module.exports = (req, res) => {
  let u = (req.url || '').split('?')[0];
  const q = (req.url || '').includes('?') ? '?' + (req.url || '').split('?').slice(1).join('?') : '';
  // Vercel rewrites /Mnk3ys and /Mnk3ys/xxx → this function; req.url may be /Mnk3ys, /Mnk3ys/, /Mnk3ys/api/...
  if (u === BASE || u === BASE + '/') {
    u = '/';
  } else if (u.startsWith(BASE + '/')) {
    u = u.slice(BASE.length) || '/';
  }
  req.url = (u || '/') + q;
  return app(req, res);
};
