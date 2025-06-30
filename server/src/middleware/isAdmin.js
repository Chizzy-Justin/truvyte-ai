// src/middleware/isAdmin.js
module.exports = (req, res, next) => {
  // passport has already set req.user
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(403).json({ error: 'Admin privileges required.' });
};
