const mongoose = require('mongoose');

const paymentMethodSchema = new mongoose.Schema({
    user:        { 
    type: String,            
    ref: 'User',
    required: true,
    lowercase: true,
    trim: true,
  },
  createdAt:   { type: Date, default: Date.now },
   
  authorizationCode: String,
  reusable:          Boolean,
  bin:               String,
  cardType:          String,
  bank:              String,
  countryCode:       String,
  brand:             String,
  last4:             String,
  expMonth:          String,
  expYear:           String,
  customerCode:      String,
  gateway:          { type: String, default: 'paystack' },
}, { timestamps: true });

module.exports = mongoose.model('PaymentMethod', paymentMethodSchema);
