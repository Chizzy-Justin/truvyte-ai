
// src/jobs/renewSubscriptions.js
const cron = require('node-cron');
const axios = require('axios');
const User = require('../models/User');
const Plan = require('../models/Plan');
const PaymentMethod = require('../models/PaymentMethod');
const {
  verifyAndRecordPayment,
  downgradeUserToFree,
} = require('../controllers/billingController');
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

function scheduleRenewals() {
  // Every day at 1:00 AM
  cron.schedule('* * * * *', async () => {
    const now = new Date();
    const expiring = await User.find({
      planEndDate: { $lte: now },
      plan: { $ne: 'Free' },
      billingStatus: 'active',
    });

    for (let user of expiring) {
      try {
        // 1️⃣ Find the plan record to get price
        const plan = await Plan.findOne({ name: user.plan });
        if (!plan) {
          console.warn(`Plan not found for user ${user._id}:`, user.plan);
          await downgradeUserToFree(user._id);
          continue;
        }

        // 2️⃣ Get the most‐recent stored payment method
        const pm = await PaymentMethod
          .findOne({ user: user._id })
          .sort({ createdAt: -1 });

        if (!pm) {
          // No card on file → downgrade to Free
          await downgradeUserToFree(user._id);
          continue;
        }
        if (!pm.authorizationCode) {
          console.warn('No authorization code for user', user._id);
          await downgradeUserToFree(user._id);
          continue;
        }
        console.log("almost charged");
        // 3️⃣ Attempt to charge the stored authorization
        const response = await axios.post(
          'https://api.paystack.co/transaction/charge_authorization',
          {
            authorization_code: pm.authorizationCode,
            email: user._id,
            amount: plan.priceCents,    // use the plan’s price
            metadata: {
             planId: plan._id,       
             first_name: user.firstName,
             last_name:  user.lastName,
             },
          },
          {
            headers: {
              Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );
console.log("charged");
        const { status, data } = response.data;
        if (status === 'success' && data?.status === 'success') {
          // 4️⃣ On success, record & extend subscription
          await verifyAndRecordPayment(data.reference);
        } else {
          // 5️⃣ On any failure, downgrade to Free
          await downgradeUserToFree(user._id);
        }
      } catch (err) {
        console.error(`Auto‑renew failed for ${user._id}:`, err);
      }
    }
  });
}

module.exports = scheduleRenewals;
