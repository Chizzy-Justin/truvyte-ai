

// src/controllers/billingController.js
const axios    = require('axios');
const Payment  = require('../models/Payment');
const Invoice  = require('../models/Invoice');
const Plan     = require('../models/Plan');
const User     = require('../models/User');
const PaymentMethod = require('../models/PaymentMethod');
const nextInvoiceNumber = require('../utils/invoiceNumber');

// Paystack config
const PAYSTACK_INIT_URL    = 'https://api.paystack.co/transaction/initialize';
const PAYSTACK_VERIFY_URL  = 'https://api.paystack.co/transaction/verify';
const CALLBACK_URL         = process.env.PAYSTACK_CALLBACK_URL;
const PAYSTACK_SECRET_KEY  = process.env.PAYSTACK_SECRET_KEY;

/**
 * 1️⃣ Initialize a Paystack payment.
 *    Expects: { planName, email }
 *    Returns: { authorization_url, reference }
 */
exports.initializePayment = async (req, res, next) => {
  try {
    const { planName, email, first_name, last_name } = req.body;
    if (!planName || !email || !first_name || !last_name  ) {
      return res.status(400).json({ error: 'planName, email, and full name are required.' });
    }

    // 1. Lookup plan
    const plan = await Plan.findOne({ name: planName });
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found.' });
    }

    // 2. Call Paystack
    const { data } = await axios.post(
      PAYSTACK_INIT_URL,
      {
        email,
        amount: plan.priceCents,
        callback_url: CALLBACK_URL,
        metadata: { planId: plan._id.toString(), planName, first_name, last_name },
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const { authorization_url, reference } = data.data;
    return res.json({ authorization_url, reference });
  } catch (err) {
    if (err.response?.data) {
      return res.status(err.response.status).json({ error: err.response.data.message });
    }
    next(err);
  }
};

/**
 * Core: verify the transaction and record it in your DB
 */
async function verifyAndRecordPayment(reference) {
    // if its already existing, skip
     const existing = await Payment.findOne({ transactionId: reference });
  if (existing) return { payment: existing };

  // 1. Verify with Paystack
  console.log("called verify and record function: ", reference)
  const { data: { data: payData } } = await axios.get(
    `${PAYSTACK_VERIFY_URL}/${reference}`,
    { headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` } }
  );
  if (payData.status !== 'success') {
    const err = new Error('Payment not successful');
    err.status = 400;
    throw err;
  }

  // 2. Extract planId from metadata (no need to pass it in manually)
  const planId = payData.metadata.planId;
  const plan   = await Plan.findById(planId);
  if (!plan) {
    const err = new Error('Plan not found');
    err.status = 404;
    throw err;
  }



  // 3. Record Payment
  const payment = await Payment.create({
    user:          payData.customer.email,   // assuming you also store user.email as _id
    plan:          planId,
    amountCents:   payData.amount,
    currency:      payData.currency,
    method:        'paystack',
    status:        payData.status,
    transactionId: payData.reference,
    paidAt:        new Date(payData.paid_at),
  });

  // 4. Update User subscription
  const now = new Date();
  const nextPeriod = new Date(now);
  nextPeriod.setMonth(nextPeriod.getMonth() + 1);
  await User.findByIdAndUpdate(payData.customer.email, {
    plan:           planId,
    planStartDate:  now,
    planEndDate:    nextPeriod,
    billingStatus:  'active',
    $push: { payments: payment._id },
  });

  // Example defaults:
const lineItems = [
  { description: plan.name, unitPriceCents: plan.priceCents, quantity: 1, totalCents: plan.priceCents }
];
const taxCents      = 0;
const discountCents = 0;
const subtotalCents = lineItems.reduce((sum, i) => sum + i.totalCents, 0);
const totalCents    = subtotalCents + taxCents - discountCents;

  // 5. Create Invoice
  const invoice = await Invoice.create({
    
  invoiceNumber: await nextInvoiceNumber(),
    user:        payData.customer.email,
    userFirstName:  payData.metadata.first_name,
    userLastName:  payData.metadata.last_name,
    customerEmail: payData.customer.email,
    payment:     payment._id,
    invoiceUrl:  '',
    status: payData.status,
    issuedAt:        now,
    amountCents: payData.amount,
    currency:    payData.currency,
    items:           lineItems,
    subtotalCents,
    taxCents,
    discountCents,
    totalCents,
    dueAt: nextPeriod,
  });
 
  await User.findByIdAndUpdate(payData.customer.email, { $push: { invoices: invoice._id } });


    const auth = payData.authorization;
if (auth.reusable) {
  // upsert so you don’t create duplicates
  await PaymentMethod.findOneAndUpdate(
    { user: payData.customer.email, last4: auth.last4 },
    {
      brand:    auth.brand,
      last4:    auth.last4,
      expMonth: auth.exp_month,
      expYear:  auth.exp_year,
      gateway:  'paystack',
      authorizationCode:  auth.authorization_code,
    },
    { upsert: true, new: true }
  );
}

  return { payment, invoice };
}


exports.verifyAndRecordPayment = verifyAndRecordPayment;
/**
 * 2️⃣ Create a Payment record, update the user, and generate an Invoice.
 *    Expects: { reference, planId, method } (method e.g. 'Paystack')
 *    Typically called after verifying the payment.
 */


/**
 * 3️⃣ List Invoices for the current user or all (admin).
 */
exports.listInvoices = async (req, res, next) => {
  try {
    const filter = {};
    if (!req.user.isAdmin) {
      filter.user = req.user._id;
    }
    const invoices = await Invoice.find(filter)
      .sort({ issuedAt: -1 })
      .populate('user', 'firstName lastName email')
      .populate({
        path: 'payment',
        select: 'amountCents currency method status transactionId paidAt',
      });
    return res.json(invoices);
  } catch (err) {
    next(err);
  }
};

/**
 * 4️⃣ (Optional) Handle Paystack webhooks for async events.
 *     Mount this at /api/payments/webhook, with raw body parsing and secret verification.
 */

exports.paystackWebhook = async (req, res) => {
    console.log('webhook reached');
      let event;
  try {
    const text = req.body.toString('utf8');
    event = JSON.parse(text);
    console.log('webhook payload:', event);
  } catch (err) {
    console.error('🔴 Failed to parse webhook JSON:', err);
    return res.status(400).send('Invalid JSON');
  };

 // Now event.event will be available
  if (event.event === 'charge.success') {
    try {
      const { reference } = event.data;
      console.log('webhook charge.success reference:', reference);

      const result = await verifyAndRecordPayment(reference);
      console.log('Recorded via webhook:', result);
    } catch (err) {
      console.error('Webhook payment record failed:', err);
    }
  } else {
    console.log('Ignoring event type:', event.event);
  };

  // Always acknowledge receipt
  res.sendStatus(200);
};

/**
 * Redirect callback handler—verifies & then redirects user to billing page
 */
exports.handleCallback = async (req, res) => {
  const { reference } = req.query;
  try {
    await verifyAndRecordPayment(reference);
    // After recording, send user back to dashboard
    return res.redirect('/dashboard/billing?status=success');
  } catch (err) {
    console.error('Callback verification failed:', err);
    return res.redirect('/dashboard/billing?status=error');
  }
};
/**
 * Downgrade a user to Free, generate a zero‑dollar invoice, and attach it.
 *
 * @param {String} userId  – the email/_id of the user to downgrade
 * @returns {Promise<Invoice>} the invoice that was created
 */
async function downgradeUserToFree(userId) {
 
    
    const user   = await User.findById(userId);
 if (!user) throw new Error(`User not found: ${userId}`);

    // 1️⃣ Downgrade the user
    user.plan          = 'Free';
    user.billingStatus = 'canceled';
    user.planStartDate = new Date();
    user.planEndDate   = null;
    await user.save();

    // 2️⃣ Build a zero‑dollar invoice
    const now = new Date();
    const lineItems = [
      {
        description:    'Free Plan Subscription',
        unitPriceCents: 0,
        quantity:       1,
        totalCents:     0,
      },
    ];
    const subtotalCents = 0;
    const taxCents      = 0;
    const discountCents = 0;
    const totalCents    = 0;

    // 3️⃣ Create the invoice
    const invoice = await Invoice.create({
      invoiceNumber: await nextInvoiceNumber(),
      user:          user._id,
      userFirstName: user.firstName,
      userLastName:  user.lastName,
      customerEmail: user._id,

      payment:       null,          // no payment record for free tier
      items:         lineItems,
      currency:      'NGN',
      amountCents:   0,
      subtotalCents,
      taxCents,
      discountCents,
      totalCents,

      issuedAt:      now,
      dueAt:         now,           // immediate “due”
      status:        'success',        // consider free as already “paid”
      invoiceUrl:    '',            // no PDF or you could generate a “Free Plan” stub
    });

    // 4️⃣ Attach invoice to user
   user.invoices.push(invoice._id);
  await user.save();

  return invoice;

};
exports.downgradeUserToFree = downgradeUserToFree;

exports.downgradeUserToFreeHandler = async (req, res, next) => {
  try {
    const invoice = await downgradeUserToFree(req.user._id);
    res.json({
      message: 'Downgraded to Free and zero‑dollar invoice generated.',
      invoice,
    });
  } catch (err) {
    next(err);
  }
};

exports.getPaymentMethods = async (req, res, next) => {
  try {
    const methods = await PaymentMethod.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(methods);
  } catch (err) {
    next(err);
  }
};
