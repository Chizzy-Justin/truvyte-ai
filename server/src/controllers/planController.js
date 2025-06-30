// src/controllers/planController.js
const Plan = require('../models/Plan');

/**
 * List all plans
 */
exports.listPlans = async (req, res, next) => {
  try {
    const plans = await Plan.find().sort({ priceCents: 1 });
    res.json(plans);
  } catch (err) {
    next(err);
  }
};

/**
 * Create a new plan
 * Expects body: { name, priceCents, currency, auditLimit, features: [] }
 */
exports.createPlan = async (req, res, next) => {
  try {
    const {
      name,
      priceCents,
      currency = 'USD',
      auditLimit = 0,
      features = [],
    } = req.body;

    if (!name || priceCents == null) {
      return res
        .status(400)
        .json({ error: 'Missing required fields: name, priceCents' });
    }

    const existing = await Plan.findOne({ name });
    if (existing) {
      return res.status(409).json({ error: 'Plan name already exists' });
    }

    const plan = new Plan({ name, priceCents, currency, auditLimit, features });
    await plan.save();
    res.status(201).json(plan);
  } catch (err) {
    next(err);
  }
};

/**
 * Update an existing plan
 * :id in URL, body same as create
 */
exports.updatePlan = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = {};
    const allowed = ['name', 'priceCents', 'currency', 'auditLimit', 'features'];

    allowed.forEach((key) => {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    });

    const plan = await Plan.findByIdAndUpdate(id, updates, { new: true });
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }
    res.json(plan);
  } catch (err) {
    next(err);
  }
};
