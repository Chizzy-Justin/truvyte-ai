


// src/utils/invoiceNumber.js
const Counter = require('../models/Counter');

async function nextInvoiceNumber() {
  const ret = await Counter.findByIdAndUpdate(
    'invoice',
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  const num = String(ret.seq).padStart(6, '0');
  return `INV-${new Date().getFullYear()}-${num}`;
}

module.exports = nextInvoiceNumber;
