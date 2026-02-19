/**
 * Vercel serverless: /api/* requests only. Static files served by Vercel from project root.
 */
const app = require('../server');

module.exports = (req, res) => app(req, res);
