// src/models/Invoice.js

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const LineItemSchema = new Schema({
  description:    { type: String, required: true },
  unitPriceCents: { type: Number, required: true },
  quantity:       { type: Number, required: true, min: 1 },
  totalCents:     { type: Number, required: true },
});

const InvoiceSchema = new Schema({
  invoiceNumber: { type: String, required: true, unique: true },

  user: {
    type: String,    // email-as-_id
    ref: 'User',
    required: true,
    lowercase: true,
    trim: true,
  },

  // Snapshot of the user’s name/email at billing time:
   userFirstName:   { type: String, required: true },
    userLastName:   { type: String, required: true },
  customerEmail: { type: String, required: true },

  payment: { type: Schema.Types.ObjectId, ref: 'Payment' },

  items:         { type: [LineItemSchema], validate: items => items.length > 0 },

  currency:      { type: String, default: 'NGN', required: true },
  amountCents: { type: Number, required: true },
  subtotalCents: { type: Number, required: true },
  taxCents:      { type: Number, default: 0 },
  discountCents: { type: Number, default: 0 },
  totalCents:    { type: Number, required: true },

  issuedAt:      { type: Date, default: Date.now },
  dueAt:         { type: Date },
  status: {
    type: String,
    enum: ['success', 'abandoned', 'failed', 'ongoing', 'pending', 'processing', 'queued', 'reversed', 'unpaid','overdue','refunded','cancelled'],
    default: 'unpaid',
  },
  invoiceUrl:    { type: String },
},
{
  timestamps: true,
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
