// src/models/Audit.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const AuditAnswerSchema = new Schema({
  question:      { type: Schema.Types.ObjectId, ref: 'ComplianceQuestion', required: true },
  answer:        { type: Schema.Types.Mixed },  // boolean (for MANUAL) or AI output JSON/text
  passed:        { type: Boolean },
  notes:         { type: String },
});

const AuditSchema = new Schema({
  user:          { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type:          { type: String, enum: ['TEXT','URL'], required: true },
  inputData:     { type: String },     // raw text or URL
  status:        { type: String, enum: ['PENDING','IN_PROGRESS','COMPLETE','ERROR'], default: 'PENDING' },
  score:         { type: Number, default: 0 },
  answers:       [AuditAnswerSchema],
  createdAt:     { type: Date, default: Date.now },
  updatedAt:     { type: Date, default: Date.now },
});

module.exports = mongoose.model('Audit', AuditSchema);
