// src/controllers/auditController.js
const mongoose = require('mongoose');
const Audit = require('../models/Audit');

/**
 * Create a new audit
 * Expects body: { type: 'TEXT'|'URL', inputData: string }
 */
exports.createAudit = async (req, res, next) => {
  try {
    const { type, inputData } = req.body;
    if (!type || !inputData) {
      return res
        .status(400)
        .json({ error: 'Missing required fields: type, inputData' });
    }

    const audit = new Audit({
      user: req.user._id,
      type,
      inputData,
      status: 'PENDING',
    });

    await audit.save();
    // TODO: enqueue AI processing job, update status and answers later
    res.status(201).json(audit);
  } catch (err) {
    next(err);
  }
};

/**
 * List audits
 * - Admins see all
 * - Regular users see only their own
 * Supports optional query filters: status, date range
 */
exports.listAudits = async (req, res, next) => {
  try {
    const { status, from, to } = req.query;
    const filter = {};

    if (!req.user.isAdmin) {
      filter.user = req.user._id;
    }
    if (status) {
      filter.status = status;
    }
    if (from || to) {
      filter.createdAt = {};
      if (from) filter.createdAt.$gte = new Date(from);
      if (to)   filter.createdAt.$lte = new Date(to);
    }

    const audits = await Audit.find(filter)
      .sort({ createdAt: -1 })
      .limit(req.user.isAdmin ? 100 : 50);
    res.json(audits);
  } catch (err) {
    next(err);
  }
};

/**
 * Get a single audit by ID
 * - Regular users can only fetch their own
 */
exports.getAudit = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid audit ID' });
    }

    const audit = await Audit.findById(id).populate({
      path: 'answers.question',
      select: 'text jurisdictions answerType topic',
    });
    if (!audit) {
      return res.status(404).json({ error: 'Audit not found' });
    }
    if (!req.user.isAdmin && audit.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(audit);
  } catch (err) {
    next(err);
  }
};
