// scripts/seedPlans.js

require('dotenv').config();
const mongoose = require('mongoose');
const Plan = require('../src/models/Plan');

async function seedPlans() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🗄️  Connected to MongoDB');

    // Define your plans
    const plans = [
      {
        _id: 'Free',
        name:       'Free',
        priceCents: 0,
        currency:   'USD',
        auditLimit: 5,
        features: [
          'Basic Compliance Audit',
          'Community Support',
        ],
      },
      {
        _id: 'Pro',
        name:       'Pro',
        priceCents: 2999, // $29.99/month
        currency:   'USD',
        auditLimit: 50,
        features: [
          'All Free features',
          'AI‑powered checks',
          'Priority email support',
          'Detailed failed rule reports',
        ],
      },
      {
        _id: 'Enterprise',
        name:       'Enterprise',
        priceCents: 9999, // $99.99/month
        currency:   'USD',
        auditLimit: 1000,
        features: [
          'All Pro features',
          'Dedicated account manager',
          'SLA-backed uptime',
          'Expert review badge',
          'Custom compliance questionnaires',
        ],
      },
    ];

    // Upsert each plan (create if missing, update if exists)
    for (const p of plans) {
      const result = await Plan.findOneAndUpdate(
        { name: p.name },
        { $set: p },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      console.log(`✅ Plan “${result.name}” seeded/updated.`);
    }

    console.log('🎉 All plans seeded successfully.');
  } catch (err) {
    console.error('❌ Error seeding plans:', err);
  } finally {
    await mongoose.disconnect();
    console.log('🗄️  Disconnected from MongoDB');
  }
}

seedPlans();
