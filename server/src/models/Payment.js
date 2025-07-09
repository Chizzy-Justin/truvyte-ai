
// src/models/Payment.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const PaymentSchema = new Schema({ 
  user: { 
    type: String,           
    ref: 'User',
    required: true,
    lowercase: true,
    trim: true,
  },

  plan: { 
    type: String, 
    ref: 'Plan', 
    required: true 
  },

  amountCents: { 
    type: Number, 
    required: true 
  },

  currency: { 
    type: String, 
    default: 'NGN' 
  },

  method: {
    type: String,
    enum: [
      'card',
      'paypal',
      'bank_transfer',
      'paystack'          // ← allow Paystack as a method
    ],
    required: true
  },

  status: {
    type: String,
    enum: [
      'pending',  
      'succeeded', 
      'failed',
      'success'          // ← accept Paystack's "success" too
    ],
    default: 'pending'
  },

  transactionId: {
  type: String,
  unique: true,    
},

  createdAt: { 
    type: Date, 
    default: Date.now 
  }, 
   paidAt:         Date,
  gatewayResponse:String,
  fees:           Number,
  feesBreakdown:  Schema.Types.Mixed,
  customerId:     String,
  metadata:       Schema.Types.Mixed,
  paymentMethod:  { type: Schema.Types.ObjectId, ref: 'PaymentMethod' },
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);
