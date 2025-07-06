// src/routes/authRoutes.js
const express = require('express');
const { signup, login, requestOtp, verifyOtp  } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

// New OTP endpoints
router.post('/request-otp', requestOtp);
router.post('/verify-otp', verifyOtp);

module.exports = router;
