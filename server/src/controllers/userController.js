// src/controllers/userController.js
const User = require('../models/User');
const Audit = require('../models/Audit');
const ComplianceQuestion = require('../models/ComplianceQuestion');

exports.getProfile = async (req, res, next) => {
  // req.user injected by passport
  try {
    const user = await User.findById(req.user._id)
      .populate('plan', 'name priceCents currency')
      .populate({ path: 'audits', options: { sort: { createdAt: -1 }, limit: 10 } });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const updates = (({ name, email }) => ({ name, email }))(req.body);
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.listUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('name email plan billingStatus createdAt');
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// other user/admin actions: suspendUser, changePlan, etc.
