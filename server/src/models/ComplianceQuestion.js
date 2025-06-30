// src/models/ComplianceQuestion.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ComplianceQuestionSchema = new Schema({
  text:           { type: String, required: true },
  jurisdictions:  [{ type: String, required: true }],   // e.g. ['US','EU','UK']
  answerType:     { type: String, enum: ['MANUAL','AUTO'], required: true },
  topic:          { type: String, required: true },     // e.g. 'Data Protection'
  planTiers:      [{ type: Schema.Types.ObjectId, ref: 'Plan' }], // which tiers see this
  active:         { type: Boolean, default: true },
  order:          { type: Number, default: 0 },
  createdAt:      { type: Date, default: Date.now },
  updatedAt:      { type: Date, default: Date.now },
});

module.exports = mongoose.model('ComplianceQuestion', ComplianceQuestionSchema);
