/**
 * Vercel: all requests hit this handler. Serve static from project root, /api/* to Express.
 */
const fs = require('fs');
const path = require('path');
const app = require('../server');

const staticDir = path.join(__dirname, 'static');
const ROOT = fs.existsSync(staticDir) ? path.resolve(staticDir) : path.resolve(path.join(__dirname, '..'));

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
  let raw = (req.url || req.path || '').split('?')[0];
  if (raw.startsWith('http')) {
    try {
      raw = new URL(raw).pathname;
    } catch (_) {}
  }
  const q = (req.url || '').includes('?') ? '?' + (req.url || '').split('?').slice(1).join('?') : '';

  if (raw.startsWith('/api/') && raw.length > 5) {
    req.url = raw + q;
    return app(req, res);
  }

  let u = raw;
  if (u.startsWith('/api/')) u = u.slice(4) || '/';
  else if (u === '/api') u = '/';
  if (u === '/Mnk3ys' || u === '/Mnk3ys/') u = '/';
  else if (u.startsWith('/Mnk3ys/')) u = u.slice(8) || '/';
  u = (u || '/').trim().replace(/\/+/g, '/').replace(/\/$/, '') || '/';

  if (u === '/favicon.ico') return res.status(204).end();

  const isRoot = u === '' || u === '/' || u === '/index.html';
  const filePath = isRoot ? path.join(ROOT, 'index.html') : path.resolve(ROOT, u.replace(/^\/+/, ''));
  if (!isRoot && !filePath.startsWith(ROOT)) return res.status(404).end();
  const ext = path.extname(isRoot ? 'index.html' : u);
  if (isRoot || u.startsWith('/css/') || u.startsWith('/js/') || u.startsWith('/assets/')) {
    try {
      const body = ['.css', '.js', '.json', '.html'].includes(ext)
        ? fs.readFileSync(filePath, 'utf8')
        : fs.readFileSync(filePath);
      res.setHeader('Content-Type', isRoot ? 'text/html; charset=utf-8' : (MIME[ext] || 'application/octet-stream'));
      return res.status(200).send(body);
    } catch (e) {
      if (isRoot) return res.status(500).send('index not found');
      return res.status(404).end();
    }
  }

  req.url = raw + q;
  return app(req, res);
};
