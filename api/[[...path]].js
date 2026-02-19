/**
 * Vercel serverless catch-all: forwards all /api/* requests to the Express app.
 */
const app = require('../server');

module.exports = (req, res) => app(req, res);
