// src/models/Invoice.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const InvoiceSchema = new Schema({
  user:         { type: Schema.Types.ObjectId, ref: 'User', required: true },
  payment:      { type: Schema.Types.ObjectId, ref: 'Payment' },
  invoiceUrl:   { type: String },     // link to PDF or hosted invoice
  date:         { type: Date, default: Date.now },
  amountCents:  { type: Number, required: true },
  currency:     { type: String, default: 'USD' },
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
