// src/controllers/userController.js
const User = require('../models/User');
const Audit = require('../models/Audit');
const ComplianceQuestion = require('../models/ComplianceQuestion');


exports.getProfile = async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'Authentication required.' });

    const user = await User.findById(req.user._id)
      .select('-passwordHash')
      .populate('plan', 'name priceCents currency auditLimit')
      .populate({
        path: 'audits',
        options: { sort: { createdAt: -1 }, limit: 10 },
        select: 'status score createdAt',
      });

    if (!user) return res.status(404).json({ error: 'User not found.' });

    // Safely handle missing plan
    // const planData = user.plan
    //   ? {
    //       id:         user.plan._id,
    //       name:       user.plan.name,
    //       priceCents: user.plan.priceCents,
    //       currency:   user.plan.currency,
    //       auditLimit: user.plan.auditLimit,
    //     }
    //   : null;

    const profile = {
      email:                user._id,
      firstName:            user.firstName,
      lastName:             user.lastName,
      complianceScore:      user.complianceScore,
      plan:                 user.plan,
      planStartDate:        user.planStartDate,
      planEndDate:          user.planEndDate,
      billingStatus:        user.billingStatus,
      complianceValidUntil: user.complianceValidUntil,
      recentAudits:         user.audits,
      createdAt:            user.createdAt,
      updatedAt:            user.updatedAt,
    };

    res.json(profile);
  } catch (err) {
    next(err);
  }
};



exports.updateProfile = async (req, res, next) => {
  try {
    const updates = (({ firstName, lastName, email }) => ({ firstName, lastName, email }))(req.body);
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.listUsers = async (req, res, next) => {
  try {
    const users = await User.find().select(
      '_id firstName lastName email plan planEndDate billingStatus payments complianceScore createdAt updatedAt'
    );
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// other user/admin actions: suspendUser, changePlan, etc.
