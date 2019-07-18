const logger = require('../services/logger.service')

async function requireAuth(req, res, next) {
  if (!req.session || !req.session.user) {
    res.status(401).end('Unauthorized, you must be logged in.');
    return;
  }
  next();
} 

async function requireAdmin(req, res, next) {
  if (!req.session.user.isAdmin) {
    res.status(401).end('Unauthorized, you must be an admin to delete a user.');
    return;
  }
  next();
}

module.exports = requireAuth
