
// src/models/ComplianceQuestion.js
const mongoose = require('mongoose');
const { Schema } = mongoose;


const PLAN_NAMES = ['Free','Pro','Enterprise'];
const ComplianceQuestionSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    jurisdictions: {
      type: [String],
      required: true,
      validate: {
        validator: (arr) => arr.length > 0,
        message: 'At least one jurisdiction is required.',
      },
    },
    // e.g. YES_NO for manual yes/no, AI for auto-generated analysis
    answerType: {
      type: String,
      enum: ['YES_NO', 'AI'],
      required: true,
    },
    topic: {
      type: String,
      required: true,
      trim: true,
    },
        planTiers: {
      type: [String],
      required: true,
      enum: PLAN_NAMES,
      validate: {
        validator: (arr) => arr.length > 0,
        message: 'At least one plan tier must be specified.',
      },
    },
    // planTiers: {
    //   type: [{ type: Schema.Types.ObjectId, ref: 'Plan' }],
    //   required: true,
    //   validate: {
    //     validator: (arr) => arr.length > 0,
    //     message: 'At least one plan tier must be specified.',
    //   },
    // },
    // Optional helper text for admins to explain the question
    helpText: {
      type: String,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // auto-manage createdAt & updatedAt
  }
);

// Indexes for faster queries by plan and jurisdiction
ComplianceQuestionSchema.index({ 'planTiers': 1 });
ComplianceQuestionSchema.index({ 'jurisdictions': 1 });

module.exports = mongoose.model(
  'ComplianceQuestion',
  ComplianceQuestionSchema
);
