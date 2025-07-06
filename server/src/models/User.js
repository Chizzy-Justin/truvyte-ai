
// src/models/User.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

// List your plan names here:
const PLAN_NAMES = ['Free', 'Pro', 'Enterprise'];

const UserSchema = new Schema(
  {
    // Use email as the primary key
    _id: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/.+@.+\..+/, 'Please enter a valid email'],
      alias: 'email',
    },

    firstName:     { type: String, required: true },
    lastName:      { type: String, required: true },
    passwordHash:  { type: String, required: true },

    oauth: {
      googleId:   { type: String },
      githubId:   { type: String },
    },

    isAdmin:      { type: Boolean, default: false },

    // Now a simple string, not an ObjectId
    plan: {
      type: String,
      enum: PLAN_NAMES,
      default: 'Free',      // <— every new user starts on Free
      required: true,
    },

    planStartDate: { type: Date, default: Date.now },
    planEndDate:   { type: Date },

    billingStatus:{ type: String, enum: ['active','past_due','canceled'], default: 'active' },

    payments:     [{ type: Schema.Types.ObjectId, ref: 'Payment' }],
    invoices:     [{ type: Schema.Types.ObjectId, ref: 'Invoice' }],

    complianceScore:      { type: Number, default: 0 },
    lastComplianceDate:   { type: Date },
    complianceValidUntil: { type: Date },

    audits:       [{ type: Schema.Types.ObjectId, ref: 'Audit' }],
  },
  {
    _id: false,    // we declare _id above
    timestamps: true,  // adds createdAt & updatedAt
  }
);

// Virtual so .id returns the email
UserSchema.virtual('id').get(function () {
  return this._id;
});

UserSchema.set('toJSON',   { virtuals: true });
UserSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('User', UserSchema);
