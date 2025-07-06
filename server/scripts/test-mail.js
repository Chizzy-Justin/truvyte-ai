// test-mail.js
require('dotenv').config();
const { sendOtpEmail } = require('../src/config/mailer');

(async () => {
  try {
    await sendOtpEmail('nnabugwuchizitelu@gmail.com', '123456');
    console.log('Email sent!');
  } catch (err) {
    console.error('Mail error:', err);
  }
})();
