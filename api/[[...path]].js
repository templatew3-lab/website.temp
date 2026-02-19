/**
 * Vercel: all requests hit this handler. Serve static from project root, /api/* to Express.
 */
const fs = require('fs');
const path = require('path');
const app = require('../server');

const ROOT = path.resolve(path.join(__dirname, '..'));

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

function sendFile(res, filePath, ext) {
  try {
    const body = ['.css', '.js', '.json'].includes(ext)
      ? fs.readFileSync(filePath, 'utf8')
      : fs.readFileSync(filePath);
    res.setHeader('Content-Type', MIME[ext] || 'application/octet-stream');
    return res.status(200).send(body);
  } catch (e) {
    return res.status(404).end();
  }
}

module.exports = (req, res) => {
  let u = (req.url || req.path || '').split('?')[0];
  if (u.startsWith('http')) {
    try {
      u = new URL(u).pathname;
    } catch (_) {}
  }
  const q = (req.url || '').includes('?') ? '?' + (req.url || '').split('?').slice(1).join('?') : '';
  if (u.startsWith('/api/')) {
    u = u.slice(4) || '/';
  } else if (u === '/api') {
    u = '/';
  }
  if (u === '/Mnk3ys' || u === '/Mnk3ys/') {
    u = '/';
  } else if (u.startsWith('/Mnk3ys/')) {
    u = u.slice(8) || '/';
  }
  u = u || '/';

  const isRoot = u === '/' || u === '/index.html' || u === '';
  if (isRoot) {
    const indexPath = path.join(ROOT, 'index.html');
    try {
      const html = fs.readFileSync(indexPath, 'utf8');
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(200).send(html);
    } catch (e) {
      res.setHeader('Content-Type', 'text/plain');
      return res.status(500).send('index not found');
    }
  }
  if (u === '/favicon.ico') {
    return res.status(204).end();
  }

  if (u.startsWith('/css/') || u.startsWith('/js/') || u.startsWith('/assets/')) {
    const ext = path.extname(u);
    if (MIME[ext]) {
      const filePath = path.resolve(ROOT, u.replace(/^\/+/, ''));
      if (!filePath.startsWith(ROOT)) return res.status(404).end();
      return sendFile(res, filePath, ext);
    }
  }

  req.url = (u || '/') + q;
  return app(req, res);
};
