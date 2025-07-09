// src/middleware/paystackWebhookVerifier.js
const crypto = require('crypto');

module.exports = (req, res, next) => {
  // Paystack sends this header
  
  const signature = req.headers['x-paystack-signature'];
  if (!signature) {
    return res.status(400).send('Missing Paystack signature');
  }
  // Raw body is a Buffer if you used express.raw({ type: 'application/json' })
  const payload = req.body; 
  if (!Buffer.isBuffer(payload)) {
    return res.status(400).send('Expected raw body buffer');
  }
  // Compute HMAC SHA512 with your secret key
  const secret = process.env.PAYSTACK_SECRET_KEY;
  const hash = crypto
    .createHmac('sha512', secret)
    .update(payload)
    .digest('hex');
  // Compare digest to header
  if (hash !== signature) {
    return res.status(400).send('Invalid signature');
  }
  // Verified!
  next();
};
