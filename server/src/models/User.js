// src/models/User.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  // Basic identity & auth
  name:           { type: String, required: true },
  email:          { type: String, required: true, unique: true },
  passwordHash:   { type: String, required: true },
  oauth: {
    googleId:     { type: String },
    githubId:     { type: String },
  },

  // Role control
  isAdmin:        { type: Boolean, default: false },

  // Subscription & billing
  plan:           { type: Schema.Types.ObjectId, ref: 'Plan', required: true },
  planStartDate:  { type: Date,   default: Date.now },
  planEndDate:    { type: Date },              // when current plan expires
  billingStatus:  { type: String, enum: ['active','past_due','canceled'], default: 'active' },
  payments:       [{ type: Schema.Types.ObjectId, ref: 'Payment' }],
  invoices:       [{ type: Schema.Types.ObjectId, ref: 'Invoice' }],

  // Compliance tracking
  complianceScore:      { type: Number, default: 0 },
  lastComplianceDate:   { type: Date },
  complianceValidUntil: { type: Date },    // e.g. one year from last pass

  // Audit history
  audits:              [{ type: Schema.Types.ObjectId, ref: 'Audit' }],

  // Timestamps
  createdAt:   { type: Date, default: Date.now },
  updatedAt:   { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
