// src/controllers/billingController.js
const Payment = require('../models/Payment');
const Invoice = require('../models/Invoice');
const Plan    = require('../models/Plan');
const User    = require('../models/User');

/**
 * Create a payment record, update the user's plan dates, and generate an invoice.
 * Expects req.body: { planId, method, transactionId }
 * Uses plan price/Currency from the Plan model.
 */
exports.createPayment = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { planId, method, transactionId } = req.body;

    if (!planId || !method || !transactionId) {
      return res.status(400).json({ error: 'planId, method, and transactionId are required.' });
    }

    // Fetch plan to get price and currency
    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found.' });
    }

    // Create the Payment record
    const payment = await Payment.create({
      user: userId,
      plan: planId,
      amountCents: plan.priceCents,
      currency: plan.currency,
      method,
      status: 'succeeded',    // assume success; adjust if you handle async payments
      transactionId,
    });

    // Update the user's plan and billing dates
    const now = new Date();
    const nextPeriod = new Date(now);
    nextPeriod.setMonth(nextPeriod.getMonth() + 1);  // 1‑month subscription

    await User.findByIdAndUpdate(userId, {
      plan: planId,
      planStartDate: now,
      planEndDate: nextPeriod,
      billingStatus: 'active',
      $push: { payments: payment._id },
    });

    // Create an Invoice
    const invoice = await Invoice.create({
      user: userId,
      payment: payment._id,
      invoiceUrl: '',            // you could generate a PDF/url here
      date: now,
      amountCents: plan.priceCents,
      currency: plan.currency,
    });

    // Attach invoice to user
    await User.findByIdAndUpdate(userId, { $push: { invoices: invoice._id } });

    res.status(201).json({ payment, invoice });
  } catch (err) {
    next(err);
  }
};

/**
 * List invoices.
 * - If admin: returns all invoices with user details
 * - Otherwise: returns only the current user's invoices
 */
exports.listInvoices = async (req, res, next) => {
  try {
    let filter = {};
    if (!req.user.isAdmin) {
      filter.user = req.user._id;
    }

    const invoices = await Invoice.find(filter)
      .sort({ date: -1 })
      .populate('user', 'name email')
      .populate({
        path: 'payment',
        select: 'amountCents currency method status transactionId date',
      });

    res.json(invoices);
  } catch (err) {
    next(err);
  }
};
