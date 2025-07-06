// src/models/Otp.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const OtpSchema = new Schema({
  email:      { type: String, required: true, index: true },
  code:       { type: String, required: true },
   payload:      {
    firstName: { type: String, required: true },
    lastName:  { type: String, required: true },
    passwordHash: { type: String, required: true },
  },
  createdAt:  { type: Date, default: Date.now, index: { expires: '1h' } }
});

// The TTL index on `createdAt` ensures expired OTP docs are auto-removed after 1 hour.
module.exports = mongoose.model('Otp', OtpSchema);
