// src/controllers/authController.js
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { signToken } = require('../utils/jwt');

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, planId } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    const hash = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email,
      passwordHash: hash,
      plan: planId,
    });
    const token = signToken(user);
    res.status(201).json({ token, user: { id: user._id, email: user.email, name: user.name } });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+passwordHash');
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = signToken(user);
    res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
  } catch (err) {
    next(err);
  }
};
