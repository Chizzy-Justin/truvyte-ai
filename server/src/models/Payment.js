// src/models/Payment.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const PaymentSchema = new Schema({
  user:           { type: Schema.Types.ObjectId, ref: 'User', required: true },
  plan:           { type: Schema.Types.ObjectId, ref: 'Plan', required: true },
  amountCents:    { type: Number, required: true },
  currency:       { type: String, default: 'USD' },
  method:         { type: String, enum: ['card','paypal','bank_transfer'], required: true },
  status:         { type: String, enum: ['succeeded','failed','pending'], default: 'pending' },
  transactionId:  { type: String },
  createdAt:      { type: Date, default: Date.now },
});

module.exports = mongoose.model('Payment', PaymentSchema);
