/**
 * Vercel serverless catch-all: /Mnk3ys → strip base path, serve static + index directly, rest to Express.
 */
const fs = require('fs');
const path = require('path');
const app = require('../server');

const BASE = '/Mnk3ys';
const ROOT = path.join(__dirname, '..');

const MIME = {
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

function serveStatic(res, filePath, ext) {
  try {
    const body = ext === '.css' || ext === '.js' || ext === '.json'
      ? fs.readFileSync(filePath, 'utf8')
      : fs.readFileSync(filePath);
    res.setHeader('Content-Type', MIME[ext] || 'application/octet-stream');
    return res.status(200).send(body);
  } catch (e) {
    return res.status(404).end();
  }
}

module.exports = (req, res) => {
  let u = (req.url || '').split('?')[0];
  const q = (req.url || '').includes('?') ? '?' + (req.url || '').split('?').slice(1).join('?') : '';
  if (u === BASE || u === BASE + '/') {
    u = '/';
  } else if (u.startsWith(BASE + '/')) {
    u = u.slice(BASE.length) || '/';
  }

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

  // Serve css/, js/, assets/ with correct MIME so browser doesn't get text/html
  if (u.startsWith('/css/') || u.startsWith('/js/') || u.startsWith('/assets/')) {
    const ext = path.extname(u);
    if (MIME[ext]) {
      const filePath = path.resolve(ROOT, u.replace(/^\/+/, ''));
      if (!filePath.startsWith(ROOT)) return res.status(404).end();
      return serveStatic(res, filePath, ext);
    }
  }

  req.url = (u || '/') + q;
  return app(req, res);
};
