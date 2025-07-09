// src/models/Plan.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlanSchema = new Schema({
  _id: {type: String, required: true},
  name:           { type: String, required: true, unique: true },   // e.g. Free, Pro, Enterprise
  priceCents:     { type: Number, required: true },                 // in cents
  currency:       { type: String, default: 'NGN' },
  auditLimit:     { type: Number, default: 0 },                     // number of audits per month/year
  features:       [{ type: String }],                               // list of enabled features
  createdAt:      { type: Date, default: Date.now },
  updatedAt:      { type: Date, default: Date.now },
});

module.exports = mongoose.model('Plan', PlanSchema);
