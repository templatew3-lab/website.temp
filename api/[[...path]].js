/**
 * Vercel serverless catch-all: forwards /api/* to Express. If a rewrite sent / here, serve index.
 */
const path = require('path');
const app = require('../server');

module.exports = (req, res) => {
  const u = (req.url || '').split('?')[0];
  // When Express preset rewrites GET / to this function, req.url can be / or /api — serve index.html
  if (u === '/' || u === '' || u === '/api') {
    req.url = '/';
  }
  return app(req, res);
};
