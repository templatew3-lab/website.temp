/**
 * Vercel serverless catch-all: /Mnk3ys → strip base path, serve root/favicon directly, rest to Express.
 */
const fs = require('fs');
const path = require('path');
const app = require('../server');

const BASE = '/Mnk3ys';
const ROOT = path.join(__dirname, '..');

module.exports = (req, res) => {
  let u = (req.url || '').split('?')[0];
  const q = (req.url || '').includes('?') ? '?' + (req.url || '').split('?').slice(1).join('?') : '';
  if (u === BASE || u === BASE + '/') {
    u = '/';
  } else if (u.startsWith(BASE + '/')) {
    u = u.slice(BASE.length) || '/';
  }

  // Serve index.html and favicon directly so we don't rely on static in serverless bundle
  if (u === '/' || u === '/index.html') {
    try {
      const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(200).send(html);
    } catch (e) {
      return res.status(500).send('index.html not found');
    }
  }
  if (u === '/favicon.ico') {
    return res.status(204).end();
  }

  req.url = (u || '/') + q;
  return app(req, res);
};
