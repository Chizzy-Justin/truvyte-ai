
// // src/routes/apiRoutes.js
// const express = require('express');
// const authenticate = require('../middleware/authenticate');
// const isAdmin     = require('../middleware/isAdmin');
// const verifySignature   = require('../middleware/paystackWebhookVerifier');

// const {
//   getProfile,
//   updateProfile,
//   listUsers,
// } = require('../controllers/userController');
// const auditController     = require('../controllers/auditController');
// const questionController  = require('../controllers/questionController');
// const planController      = require('../controllers/planController');
// const billingController   = require('../controllers/billingController');

// const router = express.Router();


// //non jwt authenticated routes
// router.post(
//   '/payments/webhook',
//   express.raw({ type: 'application/json' }),
//   verifySignature,
//   billingController.paystackWebhook
// );
// router.get('/payments/callback', billingController.handleCallback);


// // All /api routes require a valid JWT
// router.use(authenticate);

// /** Public user endpoints **/
// router.get('/me', getProfile);
// router.put('/me', updateProfile);

// /** Audit endpoints (user‑scoped) **/
// router.post('/audits', auditController.createAudit);
// router.get('/audits', auditController.listAudits);       // lists only req.user audits
// router.get('/audits/:id', auditController.getAudit);     // only if audit.user === req.user._id

// /** Admin‑only endpoints **/
//  // router.use(isAdmin);

// // User management
// router.get('/users', listUsers);
// // router.post('/users/:id/suspend', userController.suspendUser);

// // Compliance questions
// router
//   .route('/questions')
//   .get(questionController.listQuestions)
//   .post(questionController.createQuestion);

// router
//   .route('/questions/:id')
//   .put(questionController.updateQuestion)
//   .delete(questionController.deleteQuestion);

// // Plan management
// router.get('/plans', planController.listPlans);
// router.post('/plans', planController.createPlan);
// router.put('/plans/:id', planController.updatePlan);

// // Billing & payments
// // router.post('/payments', billingController.createPayment);
// // router.get('/invoices', billingController.listInvoices);

// router.post(
//   '/payments/initialize',
//   billingController.initializePayment
// );
// router.post('/payments/complete', billingController.createPayment);

// // // Optional webhook (no auth)
// // router.post('/payments/webhook', express.raw({ type: 'application/json' }), billingController.verifyWebhook);



// router.get('/invoices', billingController.listInvoices);
// router.get('/payment-methods', billingController.getPaymentMethods);


// module.exports = router;
const express           = require('express');
const bodyParser        = require('body-parser');  
const authenticate      = require('../middleware/authenticate');
const isAdmin           = require('../middleware/isAdmin');
const verifySignature   = require('../middleware/paystackWebhookVerifier');
const billingController = require('../controllers/billingController');
const userController    = require('../controllers/userController');
const auditController   = require('../controllers/auditController');
const questionController= require('../controllers/questionController');
const planController    = require('../controllers/planController');

const router = express.Router();

// ── Public (no JWT) ──
router.post(
  '/payments/webhook',
  verifySignature,
  billingController.paystackWebhook
);
router.get('/payments/callback', billingController.handleCallback);

// ── Require JWT ──
router.use(authenticate);

// User endpoints
router.get('/me', userController.getProfile);
router.put('/me', userController.updateProfile);

// Audit (user‑scoped)
router.post('/audits', auditController.createAudit);
router.get('/audits', auditController.listAudits);
router.get('/audits/:id', auditController.getAudit);

// Billing & payment flows
router.post('/payments/initialize', billingController.initializePayment);

router.post('/payments/downgrade', billingController.downgradeUserToFreeHandler);

//router.post('/payments/complete', billingController.createPayment);
router.get('/invoices', billingController.listInvoices);
router.get('/payment-methods', billingController.getPaymentMethods);

// ── Require Admin ──
// router.use(isAdmin);

router.get('/users', userController.listUsers);
router
  .route('/questions')
  .get(questionController.listQuestions)
  .post(questionController.createQuestion);
router
  .route('/questions/:id')
  .put(questionController.updateQuestion)
  .delete(questionController.deleteQuestion);
router.get('/plans', planController.listPlans);
router.post('/plans', planController.createPlan);
router.put('/plans/:id', planController.updatePlan);

module.exports = router;
