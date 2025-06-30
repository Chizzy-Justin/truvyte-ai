// src/controllers/questionController.js
const ComplianceQuestion = require('../models/ComplianceQuestion');
const Plan = require('../models/Plan');

/**
 * List all compliance questions, with optional filtering:
 *  - jurisdiction (e.g. ?jurisdiction=US)
 *  - active (e.g. ?active=true)
 *  - planTier (Plan ObjectId or name)
 */
exports.listQuestions = async (req, res, next) => {
  try {
    const { jurisdiction, active, planTier } = req.query;
    const filter = {};

    if (jurisdiction) {
      filter.jurisdictions = jurisdiction;
    }
    if (typeof active !== 'undefined') {
      filter.active = active === 'true';
    }
    if (planTier) {
      // allow passing plan name or ID
      const plan = await Plan.findOne(
        mongoose.isValidObjectId(planTier)
          ? { _id: planTier }
          : { name: planTier }
      );
      if (plan) filter.planTiers = plan._id;
      else return res.status(400).json({ error: 'Invalid planTier' });
    }

    const questions = await ComplianceQuestion.find(filter).sort({ order: 1 });
    res.json(questions);
  } catch (err) {
    next(err);
  }
};

/**
 * Create a new compliance question
 * Expects body: { text, jurisdictions[], answerType, topic, planTiers[], active, order }
 */
exports.createQuestion = async (req, res, next) => {
  try {
    const {
      text,
      jurisdictions,
      answerType,
      topic,
      planTiers,
      active = true,
      order = 0,
    } = req.body;

    // Basic validation
    if (!text || !Array.isArray(jurisdictions) || !answerType || !topic) {
      return res
        .status(400)
        .json({ error: 'Missing required fields: text, jurisdictions, answerType, topic' });
    }

    const question = new ComplianceQuestion({
      text,
      jurisdictions,
      answerType,
      topic,
      planTiers,
      active,
      order,
    });

    await question.save();
    res.status(201).json(question);
  } catch (err) {
    next(err);
  }
};

/**
 * Update an existing question
 * :id in URL, body same as create
 */
exports.updateQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = {};
    const allowed = [
      'text',
      'jurisdictions',
      'answerType',
      'topic',
      'planTiers',
      'active',
      'order',
    ];

    allowed.forEach((key) => {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    });

    const question = await ComplianceQuestion.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json(question);
  } catch (err) {
    next(err);
  }
};

/**
 * Delete a question by :id
 */
exports.deleteQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const question = await ComplianceQuestion.findByIdAndDelete(id);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json({ message: 'Question deleted' });
  } catch (err) {
    next(err);
  }
};
