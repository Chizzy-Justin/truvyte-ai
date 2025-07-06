// src/controllers/authController.js

const bcrypt = require('bcryptjs');
const User   = require('../models/User');
const Plan   = require('../models/Plan');
const Otp    = require('../models/Otp');
const { signToken }   = require('../utils/jwt');
const { sendOtpEmail } = require('../config/mailer');

exports.signup = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, planId } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'firstName, lastName, email & password are required.' });
    }

    // Check for existing user
    const existing = await User.findOne({ _id: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ error: 'Email already registered.' });
    }

    // Hash password
    const hash = await bcrypt.hash(password, 12);

    // Determine plan (fall back to Free if none provided)
    let plan = null;
    if (planId) {
      plan = await Plan.findById(planId);
      if (!plan) {
        return res.status(400).json({ error: 'Invalid planId.' });
      }
    } else {
      plan = await Plan.findOne({ name: 'Free' });
    }

    // Create user
    const now = new Date();
    const user = await User.create({
      _id: email.toLowerCase().trim(),  // email-as-_id
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      passwordHash: hash,
      plan: plan._id,
      planStartDate: now,
      planEndDate:   new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000), // 30d free trial
      billingStatus: 'active',
    });

    // Issue JWT
    const token = signToken(user);

    res.status(201).json({
      token,
      user: {
        id:        user._id,
        email:     user._id,
        firstName: user.firstName,
        lastName:  user.lastName,
        plan:      plan.name,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ _id: email }).select('+passwordHash');
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = signToken(user);
    res.json({ token, user: { id: user._id, email: user._id, firstName: user.firstName, lastName: user.lastName } });
  } catch (err) {
    next(err);
  }
};




// … existing signup & login …

/**
 * Step 1: Generate OTP, save it, and email to the user.
 */
exports.requestOtp = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    // Check if email already registered
    if (await User.findOne({ email })) {
      return res.status(409).json({ error: 'Email already in use.' });
    }
    const passwordHash = await bcrypt.hash(password, 12);
// Generate 6‑digit numeric code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await Otp.create({
      email,
      code,
      payload: {
        firstName,
        lastName,
        passwordHash,
      },
    });

    

    // Send email
    await sendOtpEmail(email, code);

    res.json({ message: 'Verification code sent.' });
  } catch (err) {
    next(err);
  }
};

/**
 * Step 2: Verify OTP and create the user.
 */
exports.verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ error: 'Email and OTP are required.' });
    }

    // Find matching OTP record
    const record = await Otp.findOne({ email: email.toLowerCase().trim(), code: otp });
    if (!record) {
      return res.status(400).json({ error: 'Invalid or expired OTP.' });
    }

    // Destructure signup data from record.payload
    const { firstName, lastName, passwordHash } = record.payload;
    if (!firstName || !lastName || !passwordHash) {
      return res.status(500).json({ error: 'Malformed OTP record.' });
    }

    // Prevent reuse: delete this and any others for safety
    await Otp.deleteMany({ email: email.toLowerCase().trim() });

    // Guard against race-condition duplicate signup
    const existing = await User.findById(email.toLowerCase().trim());
    if (existing) {
      return res.status(409).json({ error: 'Email already registered.' });
    }

    // Determine default plan (“Free”)
    const defaultPlan = await Plan.findOne({ name: 'Free' });
    if (!defaultPlan) {
      return res.status(500).json({ error: 'Default plan not configured.' });
    }

    // Create the user with plan and billing fields
    const now = new Date();
    const planEnd = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    const user = await User.create({
      _id:             email.toLowerCase().trim(),  // email-as-_id
      firstName:       firstName.trim(),
      lastName:        lastName.trim(),
      passwordHash,                              // already hashed
      plan:            defaultPlan._id,
      planStartDate:   now,
      planEndDate:     planEnd,
      billingStatus:   'active',
    });

    // Issue JWT
    const token = signToken(user);

    res.status(201).json({
      token,
      user: {
        id:        user._id,
        email:     user._id,
        firstName: user.firstName,
        lastName:  user.lastName,
        plan:      defaultPlan.name,
      },
    });
  } catch (err) {
    next(err);
  }
};
