// src/config/mailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false, // use TLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendOtpEmail(to, code) {
  await transporter.sendMail({
    from: `"Truvyte Support" <${process.env.SMTP_FROM}>`,
    to,
    subject: 'Your Truvyte Verification Code',
    text: `Your verification code is: ${code}. It will expire in 1 hour.`,
    html: `<p>Your verification code is: <strong>${code}</strong>.</p><p>It will expire in 1 hour.</p>`,
  });
}

module.exports = { sendOtpEmail };
