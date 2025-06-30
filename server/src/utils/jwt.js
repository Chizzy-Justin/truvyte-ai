// src/utils/jwt.js
const jwt = require('jsonwebtoken');

const signToken = (user) => {
  const payload = {
    sub: user._id,
    iat: Date.now(),
  };
  // expiresIn can be configured via env or passed in
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded);
    });
  });

module.exports = { signToken, verifyToken };
